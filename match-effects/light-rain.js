class LightRainEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Light Rain',
      description: 'A light drizzle: all players have -1 passing.',
      char: '🌦️',
    });
  }

  apply() {
    for (const p of MatchEffect.allPlayers()) {
      p.passing -= 1;
    }
  }

  revoke() {
    for (const p of MatchEffect.allPlayers()) {
      p.passing += 1;
    }
  }
}
