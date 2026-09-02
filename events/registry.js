const EVENT_FILES = [
  'player-rumble.js',
  'fast-track-staff.js',
  'fan-protest.js',
  'rival-taunt.js',
  'weather-warning.js',
  'scouting-report.js',
  'captains-demand.js',
  'media-frenzy.js',
  'referee-complaint.js',
  'injury-scare.js',
  'dressing-room-leak.js',
  'formation-dilemma.js',
  'rival-scout.js',
  'fan-tifo.js',
  'social-media-storm.js',
  'pundit-trash-talk.js',
  'the-benefactor.js',
  'team-bonding-barbecue.js',
  'the-old-physio.js',
  'federation-prize-draw.js',
  'kit-mans-cooler.js',
  'the-card-merchant.js',
  'the-mad-professor.js',
  'the-pundits-skull.js',
  'the-vision.js',
  'the-strange-catering.js',
  'the-finishing-school.js',
  'the-training-ground.js',
  'the-tunnel.js',
  'kit-upgrade.js',
  'the-scout.js',
];

function loadAllEvents() {
  const events = [];
  for (const file of EVENT_FILES) {
    const className = file.replace('.js', '').replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const pascalName = className.charAt(0).toUpperCase() + className.slice(1) + 'Event';
    const ClassRef = eval(pascalName);
    if (ClassRef) {
      events.push(new ClassRef());
    }
  }
  return events;
}

function pickRandomEvent() {
  const events = loadAllEvents();
  if (events.length === 0) return null;

  const totalWeight = events.reduce((sum, e) => sum + (e.constructor.weight || 1), 0);
  let roll = Math.random() * totalWeight;
  for (const event of events) {
    roll -= event.constructor.weight || 1;
    if (roll <= 0) return event;
  }
  return events[events.length - 1];
}
