const MATCH_EFFECTS = [
  HeavyRainEffect,
  LightRainEffect,
  LocalPressureEffect,
  ShiningSunEffect,
  ThunderstormEffect,
  FogEffect,
  HeatwaveEffect,
  SnowEffect,
  StrongWindEffect,
  HostileCrowdEffect,
  WinningStreakRoarEffect,
  StrictRefereeEffect,
  PermissiveRefereeEffect,
  EarlyWhistleEffect,
  LateWhistleEffect,
  LocalScornEffect,
  GentleBreezeEffect,
];

const MATCH_EFFECTS_INDEX = {};
for (const Ctor of MATCH_EFFECTS) {
  const instance = new Ctor();
  MATCH_EFFECTS_INDEX[instance.name.toLowerCase()] = Ctor;
}

function resolveMatchEffect(name) {
  if (!name) return null;
  if (typeof name !== 'string') return name;
  const Ctor = MATCH_EFFECTS_INDEX[String(name).trim().toLowerCase()];
  return Ctor ? new Ctor() : null;
}

function randomMatchEffect() {
  const Ctor = MATCH_EFFECTS[Math.floor(Math.random() * MATCH_EFFECTS.length)];
  return new Ctor();
}
