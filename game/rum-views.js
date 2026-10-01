// game/rum-views.js — Report screen changes to Datadog RUM as views.
// The app is a single page that toggles `.hidden` on screen containers, so
// RUM is initialised with trackViewsManually and this module calls
// startView whenever the top-most visible screen changes.
(function() {
  // Ordered by precedence: overlays first, then the screens beneath them.
  const SCREENS = [
    { id: 'event-phase-screen',      name: 'world-cup/event-phase' },
    { id: 'training-phase-screen',   name: 'world-cup/training' },
    { id: 'team-sheet-screen',       name: 'team-sheet' },
    { id: 'staff-picks-screen',      name: 'world-cup/staff-picks' },
    { id: 'wc-setup-screen',         name: 'world-cup/setup' },
    { id: 'board',                   name: 'match' },
    { id: 'world-cup-screen',        name: 'world-cup' },
    { id: 'tournament-screen',       name: 'tournament' },
    { id: 'tournament-setup-screen', name: 'tournament/setup' },
    { id: 'sim-setup-screen',        name: 'sim/setup' },
    { id: 'friendly-setup-screen',   name: 'friendly/setup' },
    { id: 'rules-screen',            name: 'rules' },
    { id: 'menu-screen',             name: 'menu' },
  ];

  const els = SCREENS
    .map(s => ({ ...s, el: document.getElementById(s.id) }))
    .filter(s => s.el);

  let current = null;

  function activeView() {
    const hit = els.find(s => !s.el.classList.contains('hidden'));
    return hit ? hit.name : null;
  }

  function sync() {
    const name = activeView();
    if (!name || name === current) return;
    current = name;
    if (!window.DD_RUM) return;
    window.DD_RUM.onReady(function() {
      try { window.DD_RUM.startView({ name: name }); } catch (_) { /* swallow */ }
    });
  }

  // Coalesce bursts of class toggles (screen switches flip several at once).
  let queued = false;
  const observer = new MutationObserver(function() {
    if (queued) return;
    queued = true;
    queueMicrotask(function() { queued = false; sync(); });
  });
  els.forEach(s => observer.observe(s.el, { attributes: true, attributeFilter: ['class'] }));

  sync();
})();
