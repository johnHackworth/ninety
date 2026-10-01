// game/perf.js — Lightweight in-match performance diagnostics.
// Reports via console (forwarded to Browser Logs by logger.js) and, when
// available, RUM custom actions. All hooks are guarded and never throw.
(function () {
  const q = (typeof location !== 'undefined' && location.search) ? location.search : '';
  const params = new URLSearchParams(q);
  const off = params.has('noperf') || params.get('perf') === '0';
  const Perf = window.Perf = {
    enabled: !off,
    _stats: {},
  };

  let active = false;
  let generation = 0;
  let pendingActions = [];
  let waitingForRum = false;
  const restoreProbes = [];
  function setEnabled(v) {
    Perf.enabled = !!v;
    if (Perf.enabled) wire();
    else stop();
    return Perf.enabled;
  }
  Perf.setEnabled = setEnabled;

  // ---- Helpers ---------------------------------------------------------

  function now() { return performance.now(); }

  function rum(name, attrs) {
    if (!Perf.enabled || !window.DD_RUM) return;
    // Bound retained context if the CDN is blocked or never becomes ready.
    if (pendingActions.length >= 100) return;
    pendingActions.push({ name: name || 'perf', attrs: attrs || {}, epoch: generation });
    if (waitingForRum) return;
    waitingForRum = true;
    try {
      window.DD_RUM.onReady(function () {
        waitingForRum = false;
        const queued = pendingActions;
        pendingActions = [];
        for (const action of queued) {
          if (!Perf.enabled || action.epoch !== generation) continue;
          try { window.DD_RUM.addAction(action.name, action.attrs); } catch (_) {}
        }
      });
    } catch (_) {
      waitingForRum = false;
      pendingActions = [];
    }
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

  // ---- Layout-read diagnostics ---------------------------------------
  // A layout read can cause synchronous layout, but does not prove a reflow.
  // Capture one stack per reporting interval and preserve native descriptors.

  let layoutReads = 0;
  let layoutReadStack = '';

  function recordRead() {
    if (!Perf.enabled) return;
    layoutReads += 1;
    if (!layoutReadStack) {
      try { layoutReadStack = new Error().stack || ''; } catch (_) {}
    }
  }

  function wrapRead(obj, prop) {
    const desc = Object.getOwnPropertyDescriptor(obj, prop);
    if (!desc || typeof desc.value !== 'function') return;
    const original = desc.value;
    const wrapped = function () {
      recordRead();
      return original.apply(this, arguments);
    };
    try {
      Object.defineProperty(obj, prop, { ...desc, value: wrapped });
      restoreProbes.push(() => {
        if (obj[prop] === wrapped) Object.defineProperty(obj, prop, desc);
      });
    } catch (_) {}
  }

  function installLayoutProbe() {
    if (typeof Element === 'undefined') return;
    wrapRead(Element.prototype, 'getBoundingClientRect');
    wrapRead(Element.prototype, 'getClientRects');
    wrapRead(window, 'getComputedStyle');
    const props = ['offsetWidth', 'offsetHeight', 'offsetTop', 'offsetLeft', 'clientWidth', 'clientHeight', 'clientTop', 'clientLeft', 'scrollWidth', 'scrollHeight'];
    for (const p of props) {
      let owner = typeof HTMLElement === 'undefined' ? Element.prototype : HTMLElement.prototype;
      while (owner && !Object.getOwnPropertyDescriptor(owner, p)) owner = Object.getPrototypeOf(owner);
      if (!owner) continue;
      const desc = Object.getOwnPropertyDescriptor(owner, p);
      if (!desc.get) continue;
      const wrappedGet = function () {
        recordRead();
        return desc.get.call(this);
      };
      try {
        Object.defineProperty(owner, p, { ...desc, get: wrappedGet });
        restoreProbes.push(() => {
          if (Object.getOwnPropertyDescriptor(owner, p).get === wrappedGet) {
            Object.defineProperty(owner, p, desc);
          }
        });
      } catch (_) {}
    }
  }

  function takeLayoutReads() {
    const n = layoutReads;
    layoutReads = 0;
    return n;
  }

  function takeLayoutStack() {
    const capture = layoutReadStack;
    layoutReadStack = '';
    return { flagged: !!capture, capture };
  }

  // ---- Long-task / long-animation-frame observer ----------------------

  function installTaskObservers() {
    if (typeof PerformanceObserver === 'undefined') return;
    const cb = (list) => {
      if (!Perf.enabled) return;
      for (const e of list.getEntries()) {
        const durationMs = Math.round(e.duration || 0);
        const script = e.scripts && e.scripts[0];
        const attribution = e.attribution && e.attribution[0];
        const where = script
          ? (script.sourceURL || script.invoker || '') + ':' + (script.sourceCharPosition || 0)
          : (attribution && (attribution.containerSrc || attribution.containerName || attribution.containerId)) || '';
        const reads = takeLayoutReads();
        const stack = takeLayoutStack();
        const snap = snapshotCounts();
        log('longframe ' + durationMs + 'ms' + (where ? ' @ ' + where : '') + ' layoutReads=' + reads + ' | ' + summarize(snap));
        const attrs = { durationMs, entryType: e.entryType, where, layoutReads: reads, ...snap };
        if (script) {
          attrs.forcedStyleAndLayoutDurationMs = (e.scripts || []).reduce((sum, item) => sum + (item.forcedStyleAndLayoutDuration || 0), 0);
        }
        if (stack.flagged) attrs.layoutReadStack = String(stack.capture).split('\n').slice(0, 6).join(' | ');
        rum('perf.longframe', attrs);
      }
    };
    const supported = PerformanceObserver.supportedEntryTypes;
    for (const type of ['long-animation-frame', 'longtask']) {
      if (supported && !supported.includes(type)) continue;
      let observer;
      try {
        observer = new PerformanceObserver(cb);
        observer.observe({ type, buffered: false });
        window.__perfObservers = [observer];
        return;
      } catch (_) {
        if (observer) observer.disconnect();
      }
    }
  }

  // ---- DOM-leak census --------------------------------------------------

  function snapshotCounts() {
    const counts = {};
    counts.cBodyChildren = document.body ? document.body.children.length : 0;
    counts.cHead = (document.head || null) ? document.head.querySelectorAll('*').length : 0;
    counts.cHtml = document.documentElement ? document.documentElement.querySelectorAll('*').length : 0;
    const sel = {
      playerTooltips: '.player-tooltip',
      actionTooltips: '.action-card-tooltip',
      teamTooltips: '.team-effect-tooltip',
      tokens: '.player-token',
      chips: '.effect-chips',
      toasts: '[class*="toast"]',
      overlays: 'body > .modal-overlay, body > .shot-modal',
      cards: '.action-card',
      logRows: '#match-log > *',
      players: '.player-token-name',
      benchSlots: '.bench-slot',
      cellElements: '.cell > *',
      // Container-level subtrees of the main board, to locate the leak.
      cHands: '#hands-area *',
      cBenches: '#benches *',
      cPitch: '#pitch *',
      cRail: '#right-rail *',
      cScore: '#scoreboard *',
      cRailControls: '#rail-controls *',
      cMatchLog: '#match-log *',
      cBoard: '#board *',
    };
    const root = document;
    for (const k in sel) {
      try { counts[k] = root.querySelectorAll(sel[k]).length; } catch (_) { counts[k] = -1; }
    }
    // Top-level body children: the WC-screen is a sibling of #board and was
    // the UNTRACKED culprit — count every direct child of <body>, keyed by
    // id (or first class when no id) so the census names the exact screen.
    // Also scan <html> children (head, body, and anything appended to the
    // document root directly, which escapes body>*/body.children).
    counts.topScreens = 0;
    counts.topOther = 0;
    counts.topByKeyHtml = {};
    const topByKey = {};
    try {
      for (const el of root.querySelectorAll('body > *')) {
        const n = nodesIn(el);
        const key = el.id || (el.className && typeof el.className === 'string' && el.className.split(/\s+/)[0]) || el.tagName.toLowerCase();
        topByKey[key] = (topByKey[key] || 0) + n;
        if (el.id) {
          counts['top#' + el.id] = n;
          counts.topScreens += n;
        } else {
          counts.topOther += n;
        }
      }
      for (const el of document.documentElement.children) {
        const key = el.id || (el.className && typeof el.className === 'string' && el.className.split(/\s+/)[0]) || el.tagName.toLowerCase();
        counts.topByKeyHtml[key] = (counts.topByKeyHtml[key] || 0) + nodesIn(el) + 1;
      }
    } catch (_) {}
    const biggest = Object.keys(topByKey)
      .sort((a, b) => topByKey[b] - topByKey[a])
      .slice(0, 3);
    counts.topBig = biggest.map((k) => `${k}:${topByKey[k]}`).join(' ');
    counts.total = nodesIn(root);
    counts.unacc = counts.cHtml - (counts.topScreens + counts.topOther);
    return counts;
  }

  let lastCounts = null;
  let countLogTicks = 0;

  function reportCounts(label) {
    if (!Perf.enabled) return;
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
      if (typeof counts[k] !== 'number' || typeof lastCounts[k] !== 'number') continue;
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
    return cKeys()
      .filter((k) => k !== 'total')
      .map((k) => k + '=' + c[k])
      .filter((s) => !s.endsWith('topOther=0') && !s.endsWith('topScreens=0'))
      .concat(Object.keys(c).filter((k) => k.startsWith('top#') && c[k] > 0).map((k) => k + '=' + c[k]))
      .concat('html=[' + Object.keys(c.topByKeyHtml || {}).map((k) => `${k}:${c.topByKeyHtml[k]}`).join(' ') + ']')
      .concat('big=[' + (c.topBig || '') + ']')
      .concat('total=' + c.total)
      .join(' ');
  }

  function summarizeDeltas(d) {
    return cKeys()
      .concat(Object.keys(d).filter((k) => k.startsWith('top#') && d[k] !== 0).sort())
      .filter((k) => d[k] !== 0)
      .map((k) => (d[k] > 0 ? '+' : '') + d[k] + k)
      .join(' ');
  }

  function cKeys() {
    return [
      'playerTooltips',
      'actionTooltips',
      'teamTooltips',
      'tokens',
      'chips',
      'toasts',
      'overlays',
      'cards',
      'logRows',
      'benchSlots',
      'cellElements',
      'cHands',
      'cBenches',
      'cPitch',
      'cRail',
      'cScore',
      'cRailControls',
      'cMatchLog',
      'cBoard',
      'topScreens',
      'topOther',
      'cBodyChildren',
      'cHead',
      'cHtml',
      'unacc',
    ];
  }

  // ---- 1. Timing wrappers around hot paths -----------------------------

  function time(fn, name) {
    return function () {
      if (!Perf.enabled) return fn.apply(this, arguments);
      const t0 = now();
      const r = fn.apply(this, arguments);
      const ms = now() - t0;
      if (ms > 1) {
        const reads = takeLayoutReads();
        if (ms >= 50 || reads >= 50) {
          const snap = snapshotCounts();
          const label = name + ' ' + ms.toFixed(1) + 'ms layoutReads=' + reads + ' | ' + summarize(snap);
          log(label);
          rum('perf.hot', { fn: name, ms: Math.round(ms * 10) / 10, layoutReads: reads, ...snap });
        }
        Perf._stats[name] = { ms, reads };
      }
      return r;
    };
  }

  function start() {
    if (!Perf.enabled || active) return;
    active = true;
    installLayoutProbe();
    installTaskObservers();
    log('instrumentation active');
  }

  function stop() {
    generation += 1;
    pendingActions = [];
    active = false;
    for (const observer of window.__perfObservers || []) {
      try { observer.disconnect(); } catch (_) {}
    }
    window.__perfObservers = [];
    while (restoreProbes.length) {
      try { restoreProbes.pop()(); } catch (_) {}
    }
    layoutReads = 0;
    layoutReadStack = '';
    lastCounts = null;
    countLogTicks = 0;
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
  Perf.takeLayoutReads = takeLayoutReads;
  Perf.takeReflowReads = takeLayoutReads; // Legacy diagnostic API.
  Perf.takeLayoutStack = takeLayoutStack;
  Perf.takeReflowFlag = takeLayoutStack; // Legacy diagnostic API.
  Perf.reportCounts = reportCounts;
  Perf.snapshotCounts = snapshotCounts;
  Perf.start = start;
  Perf.stop = () => setEnabled(false);
  Perf.rum = rum;
  Perf.log = log;
})();
