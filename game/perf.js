// game/perf.js — Lightweight in-match performance diagnostics.
// Reports via console (forwarded to Datadog RUM by logger.js) and, when
// available, RUM custom actions. All hooks are guarded and never throw.
(function () {
  const q = (typeof location !== 'undefined' && location.search) ? location.search : '';
  const off = /noperf|\bperf=0\b/i.test(q);
  const Perf = window.Perf = {
    enabled: !off,
    _stats: {},
  };

  function setEnabled(v) {
    Perf.enabled = !!v;
    return Perf.enabled;
  }
  Perf.setEnabled = setEnabled;

  // ---- Helpers ---------------------------------------------------------

  function now() { return performance.now(); }

  function rum(name, attrs) {
    if (typeof window === 'undefined' || !window.DD_RUM) return;
    try { window.DD_RUM.addAction(name || 'perf', attrs || {}); } catch (_) {}
  }

  function log(msg) {
    try {
      // eslint-disable-next-line no-console
      console.log('[perf] ' + msg);
    } catch (_) {}
  }

  function nodesIn(root) {
    return (root || document).querySelectorAll('*').length;
  }

  // ---- 4. Forced-reflow detector --------------------------------------
  // Wraps the read APIs that trigger synchronous layout. Counts reads and
  // flags write-read interleavings within a single render as layout thrash.

  let reflowReads = 0;
  let reflowFlagged = false;
  let reflowCapture = '';

  function wrapRead(obj, prop, key) {
    const orig = obj[prop];
    if (typeof orig !== 'function') return;
    if (obj[prop].__perfWrapped) return;
    obj[prop] = function () {
      reflowReads += 1;
      if (!reflowFlagged) {
        reflowFlagged = true;
        try {
          reflowCapture = new Error().stack || '';
        } catch (_) { reflowCapture = ''; }
      }
      const r = orig.apply(this, arguments);
      return r;
    };
    obj[prop].__perfWrapped = true;
    void key;
  }

  function installReflowProbe() {
    if (typeof Element === 'undefined') return;
    const proto = Element.prototype;
    wrapRead(proto, 'getBoundingClientRect', 'getBoundingClientRect');
    wrapRead(proto, 'getClientRects', 'getClientRects');
    wrapRead(proto, 'getComputedStyle', 'getComputedStyle');
    const readOnlyProps = ['offsetWidth', 'offsetHeight', 'offsetTop', 'offsetLeft', 'clientWidth', 'clientHeight', 'clientTop', 'clientLeft', 'scrollWidth', 'scrollHeight'];
    for (const p of readOnlyProps) {
      const desc = Object.getOwnPropertyDescriptor(proto, p);
      if (!desc || !desc.get || desc.get.__perfWrapped) continue;
      const g = desc.get;
      const wrappedGet = function () {
        reflowReads += 1;
        if (!reflowFlagged) {
          reflowFlagged = true;
          try {
            reflowCapture = new Error().stack || '';
          } catch (_) { reflowCapture = ''; }
        }
        return g.call(this);
      };
      wrappedGet.__perfWrapped = true;
      try { Object.defineProperty(proto, p, { get: wrappedGet, configurable: true }); } catch (_) {}
    }
  }

  function takeReflowReads() {
    const n = reflowReads;
    reflowReads = 0;
    return n;
  }

  function takeReflowFlag() {
    const f = reflowFlagged;
    reflowFlagged = false;
    const capture = f ? reflowCapture : '';
    reflowCapture = '';
    return { flagged: f, capture };
  }

  // ---- 2. Long-task / long-animation-frame observer --------------------
  // Reports the slow frame: duration, invoker script line, and how many
  // layout reads happened inside it.

  function installTaskObservers() {
    if (typeof PerformanceObserver === 'undefined') return;
    try {
      const cb = (list) => {
        for (const e of list.getEntries()) {
          const threshold = typeof e.duration === 'number' ? Math.round(e.duration) : 0;
          let where = '';
          const attr = (e.attribution && e.attribution[0]) || null;
          if (attr && attr.containerType) {
            const name = attr.containerName || attr.containerId || attr.containerSrc || '';
            where = (name ? name + ' ' : '') + (attr.containerScript && attr.containerScript.name ? attr.containerScript.name : '') +
              (attr.containerScript && attr.containerScript.startCol ? (':' + attr.containerScript.startLine + ':' + attr.containerScript.startCol) : '');
          }
          const reads = takeReflowReads();
          const flag = takeReflowFlag();
          const snap = snapshotCounts();
          log('longframe ' + threshold + 'ms' + (where ? ' @ ' + where : '') + ' reads=' + reads + ' | ' + summarize(snap));
          const attrs = { durationMs: threshold, where, reads, ...snap };
          if (flag.flagged) {
            attrs.reflowCapture = String(flag.capture).split('\n').slice(0, 6).join(' | ');
          }
          rum('perf.longframe', attrs);
        }
      };
      const obs = new PerformanceObserver(cb);
      obs.observe({ type: 'long-animation-frame', buffered: false });
      // Fall back to longtask where LoAF is unavailable.
      let legacy = null;
      try {
        legacy = new PerformanceObserver(cb);
        legacy.observe({ type: 'longtask', buffered: false });
      } catch (_) {}
      window.__perfObservers = [obs, legacy].filter(Boolean);
    } catch (_) {}
  }

  // ---- DOM-leak census --------------------------------------------------

  function snapshotCounts() {
    const counts = {};
    const sel = {
      tooltips: '.player-tooltip',
      tokens: '.player-token',
      chips: '.effect-chips',
      toasts: '[class*="toast"]',
      overlays: 'body > .modal-overlay, body > .shot-modal',
      cards: '.action-card',
      logRows: '#match-log > *',
      players: '.player-token-name',
      benchSlots: '.bench-slot',
      cellElements: '.cell > *',
    };
    const root = document;
    for (const k in sel) {
      try { counts[k] = root.querySelectorAll(sel[k]).length; } catch (_) { counts[k] = -1; }
    }
    counts.total = nodesIn(root);
    return counts;
  }

  let lastCounts = null;
  let countLogTicks = 0;

  function reportCounts(label) {
    const counts = snapshotCounts();
    countLogTicks += 1;
    if (!lastCounts) {
      lastCounts = counts;
      if (countLogTicks === 1) log('census ' + label + ' | ' + summarize(counts));
      return;
    }
    const deltas = {};
    let changed = false;
    for (const k in counts) {
      const d = counts[k] - lastCounts[k];
      deltas[k] = d;
      if (d !== 0) changed = true;
    }
    lastCounts = counts;
    if (changed && countLogTicks % 5 === 1) {
      log('census ' + label + ' Δ' + summarizeDeltas(deltas));
    }
  }

  function summarize(c) {
    return ['tooltips', 'tokens', 'toasts', 'overlays', 'logRows', 'total']
      .map((k) => k + '=' + c[k])
      .join(' ');
  }

  function summarizeDeltas(d) {
    return ['tooltips', 'tokens', 'toasts', 'overlays', 'logRows', 'total']
      .filter((k) => d[k] !== 0)
      .map((k) => (d[k] > 0 ? '+' : '') + d[k] + k)
      .join(' ');
  }

  // ---- 1. Timing wrappers around hot paths -----------------------------

  function time(fn, name) {
    return function () {
      if (!Perf.enabled) return fn.apply(this, arguments);
      const t0 = now();
      const r = fn.apply(this, arguments);
      const ms = now() - t0;
      if (ms > 1) {
        const reads = takeReflowReads();
        if (ms >= 50 || reads >= 50) {
          const snap = snapshotCounts();
          const label = name + ' ' + ms.toFixed(1) + 'ms reads=' + reads + ' | ' + summarize(snap);
          log(label);
          rum('perf.hot', { fn: name, ms: Math.round(ms * 10) / 10, reads, ...snap });
        }
        Perf._stats[name] = { ms, reads };
      }
      return r;
    };
  }

  function start() {
    if (!Perf.enabled) return;
    installReflowProbe();
    installTaskObservers();
    log('instrumentation active');
  }

  // ---- Public API ------------------------------------------------------

  function wire() {
    if (!Perf.enabled) { log('disabled'); return; }
    start();
    const w = window;
    const map = {
      renderGame: 'renderGame',
      executeAction: 'executeAction',
      runAiTurn: 'runAiTurn',
      tickAi: 'tickAi',
      saveGameState: 'saveGameState',
      renderInPlay: 'renderInPlay',
      renderPlayerEffects: 'renderPlayerEffects',
      renderDecks: 'renderDecks',
      renderBench: 'renderBench',
      renderScoreboard: 'renderScoreboard',
      logMatch: 'logMatch',
      playShoot: 'playShoot',
      playMarking: 'playMarking',
      resolveShot: 'resolveShot',
      resolveMove: 'resolveMove',
    };
    for (const key of Object.keys(map)) {
      const fn = w[key];
      if (typeof fn !== 'function') continue;
      const name = map[key];
      if (fn.__perfWrapped) continue;
      const wrapped = time(fn, name);
      wrapped.__perfWrapped = true;
      w[key] = wrapped;
    }
  }

  Perf.wire = wire;
  Perf.time = time;
  Perf.takeReflowReads = takeReflowReads;
  Perf.takeReflowFlag = takeReflowFlag;
  Perf.reportCounts = reportCounts;
  Perf.snapshotCounts = snapshotCounts;
  Perf.start = start;
  Perf.rum = rum;
  Perf.log = log;
})();