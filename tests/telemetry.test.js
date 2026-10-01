const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

function run(file, context) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context);
}

function perfHarness({ search = '', supported = ['long-animation-frame', 'longtask'], rejectLoaf = false } = {}) {
  const actions = [], observed = [], observers = [], queued = [];
  let scans = 0;
  class Element {
    getBoundingClientRect() { return { width: 20 }; }
    getClientRects() { return []; }
  }
  class HTMLElement extends Element {}
  const getter = function () { return 20; };
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { get: getter, configurable: true });
  const document = {
    querySelectorAll() { scans++; return []; }, head: null, body: null,
    documentElement: { children: [], querySelectorAll() { scans++; return []; } },
  };
  class PerformanceObserver {
    static supportedEntryTypes = supported;
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe({ type }) { observed.push(type); if (rejectLoaf && type === 'long-animation-frame') throw new Error('unsupported'); }
    disconnect() { this.disconnected = true; }
  }
  const window = {
    getComputedStyle: () => ({ display: 'block' }),
    DD_RUM: { onReady: callback => queued.push(callback) },
  };
  const context = vm.createContext({ window, location: { search }, URLSearchParams, document, Element, HTMLElement, PerformanceObserver, performance: { now: () => 0 }, console: { log() {} } });
  run('game/perf.js', context);
  return {
    window, Element, HTMLElement, getter, observed, observers, scans: () => scans,
    flush() {
      window.DD_RUM = { onReady: callback => callback(), addAction: (...args) => actions.push(args) };
      queued.splice(0).forEach(callback => callback());
      return actions;
    },
  };
}

test('early actions wait for SDK readiness and retain their context', () => {
  const h = perfHarness();
  h.window.Perf.rum('perf.hot', { ms: 75 });
  const actions = h.flush();
  assert.equal(actions.length, 1);
  assert.equal(actions[0][0], 'perf.hot');
  assert.equal(actions[0][1].ms, 75);
});

test('disable cancels queued actions, including across re-enable', () => {
  const h = perfHarness();
  h.window.Perf.rum('old');
  h.window.Perf.setEnabled(false);
  h.window.Perf.setEnabled(true);
  h.window.Perf.rum('new');
  assert.deepEqual(h.flush().map(action => action[0]), ['new']);
});

test('blocked SDK cannot accumulate an unbounded diagnostic action queue', () => {
  const h = perfHarness();
  for (let i = 0; i < 500; i++) h.window.Perf.rum('pending', { i });
  assert.equal(h.flush().length, 100);
});

test('selects one supported observer and start is idempotent', () => {
  const h = perfHarness();
  h.window.Perf.start();
  h.window.Perf.wire();
  assert.deepEqual(h.observed, ['long-animation-frame']);
});

test('uses longtask when LoAF is unsupported or registration throws', () => {
  const unsupported = perfHarness({ supported: ['longtask'] });
  unsupported.window.Perf.start();
  assert.deepEqual(unsupported.observed, ['longtask']);
  const throwing = perfHarness({ rejectLoaf: true });
  throwing.window.Perf.start();
  assert.deepEqual(throwing.observed, ['long-animation-frame', 'longtask']);
  assert.equal(throwing.observers[0].disconnected, true);
});

test('counts native layout APIs and restores their descriptors on disable', () => {
  const h = perfHarness();
  const originalRect = h.Element.prototype.getBoundingClientRect;
  const originalStyle = h.window.getComputedStyle;
  const originalGetter = Object.getOwnPropertyDescriptor(h.HTMLElement.prototype, 'offsetWidth');
  h.window.Perf.start();
  const element = new h.HTMLElement();
  assert.equal(element.offsetWidth, 20);
  assert.equal(element.getBoundingClientRect().width, 20);
  h.window.getComputedStyle(element);
  assert.equal(h.window.Perf.takeLayoutReads(), 3);
  h.window.Perf.setEnabled(false);
  assert.equal(h.Element.prototype.getBoundingClientRect, originalRect);
  assert.equal(h.window.getComputedStyle, originalStyle);
  assert.deepEqual(Object.getOwnPropertyDescriptor(h.HTMLElement.prototype, 'offsetWidth'), originalGetter);
  assert.equal(h.observers[0].disconnected, true);
  element.getBoundingClientRect();
  h.window.Perf.reportCounts('disabled');
  h.observers[0].callback({ getEntries: () => [{ duration: 75 }] });
  assert.equal(h.window.Perf.takeLayoutReads(), 0);
  assert.equal(h.scans(), 0);
  assert.equal(h.flush().length, 0);
  h.window.Perf.setEnabled(true);
  element.getBoundingClientRect();
  assert.equal(h.window.Perf.takeLayoutReads(), 1);
});

test('query opt-outs stop automatic scans and match whole parameters', () => {
  for (const search of ['?perf=0', '?noperf']) {
    const h = perfHarness({ search });
    h.window.Perf.wire();
    h.window.Perf.reportCounts('disabled');
    assert.equal(h.scans(), 0);
    assert.equal(h.observers.length, 0);
  }
  assert.equal(perfHarness({ search: '?other=noperf&perf=01' }).window.Perf.enabled, true);
});

test('reports LoAF script attribution and measured forced layout duration', () => {
  const h = perfHarness();
  h.window.Perf.start();
  h.observers[0].callback({ getEntries: () => [{
    entryType: 'long-animation-frame', duration: 75,
    scripts: [{ sourceURL: 'game.js', sourceCharPosition: 10, forcedStyleAndLayoutDuration: 3 }, { forcedStyleAndLayoutDuration: 2 }],
  }] });
  const attrs = h.flush()[0][1];
  assert.equal(attrs.where, 'game.js:10');
  assert.equal(attrs.forcedStyleAndLayoutDurationMs, 5);
  assert.equal(attrs.entryType, 'long-animation-frame');
  assert.equal('reflowCapture' in attrs, false);
});

function telemetryHarness({ hostname = 'localhost', env = '', version = '' } = {}) {
  const scripts = [], configs = {}, views = [], watchers = [], listeners = {};
  const elements = Object.fromEntries(['menu-screen', 'friendly-setup-screen', 'board', 'team-sheet-screen', 'world-cup-screen', 'training-phase-screen'].map(id => [id, {
    hidden: id !== 'menu-screen',
    classList: { contains() { return elements[id].hidden; } },
  }]));
  const window = {};
  const document = {
    querySelector(selector) { return { content: selector.includes('version') ? version : env }; },
    createElement() { return {}; }, head: { appendChild: script => scripts.push(script) },
    getElementById: id => elements[id],
    addEventListener: (event, callback) => { listeners[event] = callback; },
  };
  class MutationObserver {
    constructor(callback) { this.callback = callback; watchers.push(this); }
    observe(element, options) { this.options = options; }
  }
  const console = { log() {}, info() {}, warn() {}, error() {} };
  const context = vm.createContext({ window, document, location: { hostname, protocol: 'https:' }, MutationObserver, console });
  run('game/telemetry.js', context);
  return {
    window, scripts, configs, views, elements, watchers, context, console,
    startScreens() { listeners.DOMContentLoaded(); },
    update() { watchers[0].callback(); },
    ready() {
      for (const name of ['DD_RUM']) {
        const queued = window[name].q;
        window[name] = { init: config => { configs[name] = config; }, onReady: callback => callback(), startView: view => views.push(view.name) };
        queued.forEach(callback => callback());
      }
    },
  };
}

test('loads only RUM with deployment tags and 20 percent replay sampling', () => {
  const h = telemetryHarness({ hostname: 'staging.example.com', env: 'staging', version: 'abc123' });
  h.ready();
  for (const config of Object.values(h.configs)) {
    assert.equal(config.env, 'staging');
    assert.equal(config.version, 'abc123');
    assert.equal(config.service, 'ninety-web');
  }
  assert.equal(h.configs.DD_RUM.sessionReplaySampleRate, 20);
  assert.equal(h.configs.DD_RUM.trackViewsManually, true);
  assert.equal(h.window.DD_LOGS, undefined);
  assert.equal(h.scripts.length, 1);
  assert.equal(h.scripts[0].async, true);
  assert.equal(h.scripts[0].src, 'https://www.datadoghq-browser-agent.com/us1/v7/datadog-rum.js');
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.equal(html.includes('game/logger.js'), false);
});

test('defaults local environment to dev, hosted environment to prod, omits unknown version', () => {
  for (const [hostname, env] of [['localhost', 'dev'], ['[::1]', 'dev'], ['ninety.example.com', 'prod']]) {
    const h = telemetryHarness({ hostname });
    h.ready();
    assert.equal(h.configs.DD_RUM.env, env);
    assert.equal('version' in h.configs.DD_RUM, false);
  }
});

test('screen views queue before SDK readiness, deduplicate and restore underlying views', () => {
  const h = telemetryHarness();
  h.startScreens();
  h.elements['menu-screen'].hidden = true;
  h.elements['friendly-setup-screen'].hidden = false;
  h.update();
  h.update();
  h.ready();
  assert.deepEqual(h.views, ['menu', 'match-setup']);
  h.elements['friendly-setup-screen'].hidden = true;
  h.elements.board.hidden = false;
  h.update();
  h.elements['team-sheet-screen'].hidden = false;
  h.update();
  h.elements['team-sheet-screen'].hidden = true;
  h.update();
  h.elements.board.hidden = true;
  h.elements['world-cup-screen'].hidden = false;
  h.update();
  h.elements['training-phase-screen'].hidden = false;
  h.update();
  h.elements['training-phase-screen'].hidden = true;
  h.update();
  assert.deepEqual(h.views, ['menu', 'match-setup', 'match', 'team-sheet', 'match', 'world-cup', 'world-cup-training', 'world-cup']);
  assert.equal(h.watchers[0].options.subtree, undefined);
});

test('bootstrap does not patch console or require SDKs to load for screen navigation', () => {
  const h = telemetryHarness();
  const originalError = h.console.error;
  h.startScreens();
  h.window.NinetyTelemetry.trackView('rules');
  assert.equal(h.console.error, originalError);
  assert.deepEqual(h.views, []);
});
