// Deployment tags and RUM lifecycle for this static application.
(function () {
  function meta(name) {
    const element = document.querySelector('meta[name="' + name + '"]');
    return element ? element.content.trim() : '';
  }

  const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:';
  const config = {
    clientToken: 'pub83536f3da3bed2913e475de9e185406a',
    site: 'datadoghq.com',
    service: 'ninety-web',
    env: meta('datadog-env') || (local ? 'dev' : 'prod'),
  };
  const version = meta('datadog-version');
  if (version) config.version = version;

  function loadSdk() {
    window.DD_RUM = window.DD_RUM || {
      q: [],
      onReady(callback) { this.q.push(callback); },
    };
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = '';
    script.src = 'https://www.datadoghq-browser-agent.com/us1/v7/datadog-rum.js';
    document.head.appendChild(script);
  }

  let currentView = 'menu';
  function trackView(name) {
    if (!name || name === currentView) return;
    currentView = name;
    try {
      window.DD_RUM.onReady(function () {
        try { window.DD_RUM.startView({ name }); } catch (_) {}
      });
    } catch (_) {}
  }

  window.NinetyTelemetry = { trackView };
  loadSdk();
  window.DD_RUM.onReady(function () {
    try {
      window.DD_RUM.init({
        ...config,
        applicationId: 'df3f2e88-77f1-4435-869f-40158dbf8d3b',
        remoteConfiguration: { id: 'ff8c4e84-418d-49df-98c8-0fd8e6fa1cfc' },
        sessionSampleRate: 100,
        sessionReplaySampleRate: 20,
        trackResources: true,
        trackUserInteractions: true,
        trackLongTasks: true,
        trackViewsManually: true,
      });
      window.DD_RUM.startView({ name: 'menu' });
    } catch (_) { /* Observability must not interrupt the game. */ }
  });

  function watchScreens() {
    // Phase screens cover the underlying match or World Cup screen, so check
    // them first. Observe only screen classes, never the changing game DOM.
    const screens = [
      ['team-sheet-screen', 'team-sheet'],
      ['event-phase-screen', 'world-cup-event'],
      ['training-phase-screen', 'world-cup-training'],
      ['staff-picks-screen', 'world-cup-staff'],
      ['wc-setup-screen', 'world-cup-setup'],
      ['menu-screen', 'menu'],
      ['rules-screen', 'rules'],
      ['friendly-setup-screen', 'match-setup'],
      ['sim-setup-screen', 'simulation-setup'],
      ['tournament-setup-screen', 'tournament-setup'],
      ['tournament-screen', 'tournament'],
      ['world-cup-screen', 'world-cup'],
      ['board', 'match'],
    ].map(([id, name]) => ({ element: document.getElementById(id), name }))
      .filter(({ element }) => element);
    function update() {
      const visible = screens.find(({ element }) => !element.classList.contains('hidden'));
      if (visible) trackView(visible.name);
    }
    update();
    if (typeof MutationObserver === 'undefined') return;
    const observer = new MutationObserver(update);
    screens.forEach(({ element }) => observer.observe(element, {
      attributes: true,
      attributeFilter: ['class'],
    }));
  }
  document.addEventListener('DOMContentLoaded', watchScreens, { once: true });
})();
