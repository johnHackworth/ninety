// game/logger.js — Intercept console output and forward to Datadog RUM
(function() {
  const origLog   = console.log.bind(console);
  const origWarn  = console.warn.bind(console);
  const origError = console.error.bind(console);
  const origInfo  = console.info.bind(console);

  function fwd(level, args) {
    if (!window.DD_RUM || !window.DD_RUM.logger) return;
    try {
      const msg = args.map(a => (typeof a === 'string') ? a : JSON.stringify(a)).join(' ');
      window.DD_RUM.logger[level](msg);
    } catch (_) { /* swallow */ }
  }

  console.log = function() { origLog.apply(console, arguments);   fwd('info',  Array.from(arguments)); };
  console.info = function() { origInfo.apply(console, arguments);  fwd('info',  Array.from(arguments)); };
  console.warn = function() { origWarn.apply(console, arguments);  fwd('warn',  Array.from(arguments)); };
  console.error = function() { origError.apply(console, arguments); fwd('error', Array.from(arguments)); };
})();
