class HeavyRainEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Heavy Rain',
      description:
        'Torrential downpour: all players have -2 passing, and every tackle that ends in a foul injures the tackled player.',
      char: '🌧️',
    });
  }

  apply() {
    for (const p of MatchEffect.allPlayers()) {
      p.passing -= 2;
    }
  }

  revoke() {
    for (const p of MatchEffect.allPlayers()) {
      p.passing += 2;
    }
  }
}
