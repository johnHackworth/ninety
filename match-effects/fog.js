class FogEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Fog',
      description:
        'A thick fog rolls in: all players have -1 dribbling and -1 marking as it gets harder to see the ball and the man.',
      char: '🌫️',
    });
  }

  apply() {
    for (const p of MatchEffect.allPlayers()) {
      p.dribbling -= 1;
      p.marking -= 1;
    }
  }

  revoke() {
    for (const p of MatchEffect.allPlayers()) {
      p.dribbling += 1;
      p.marking += 1;
    }
  }
}
