// Use Browser Logs' native console capture, including Error objects and stacks.
// RUM has no logger API; its automatic error capture remains separate.
(function () {
  const telemetry = window.NinetyTelemetry;
  if (!telemetry) return;
  telemetry.loadSdk('DD_LOGS', 'datadog-logs.js');
  window.DD_LOGS.onReady(function () {
    try {
      window.DD_LOGS.init({
        ...telemetry.config,
        sessionSampleRate: 100,
        forwardErrorsToLogs: true,
        forwardConsoleLogs: ['log', 'info', 'warn', 'error'],
      });
    } catch (_) { /* Observability must not interrupt the game. */ }
  });
})();
