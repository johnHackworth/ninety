class StreakerEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Streaker',
      description:
        'A streaker sprints across the pitch: every player gains +2 dribbling, but shots taken from the central column lose focus with -2 shooting.',
      char: '🏃',
    });
  }

  apply() {
    for (const p of MatchEffect.allPlayers()) {
      p.dribbling += 2;
    }
  }

  revoke() {
    for (const p of MatchEffect.allPlayers()) {
      p.dribbling -= 2;
    }
  }
}
