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
    } catch (_) { /* Observability must not interrupt the game. */ }
  });

  // game/rum-views.js owns manual view tracking after the screen DOM loads.
})();
