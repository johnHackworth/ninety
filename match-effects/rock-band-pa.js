class RockBandEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Full-Metal Rock Band PA',
      description:
        'A deafening full-metal PA system rattles the stands: both teams lose coordination with -2 passing and -1 tackling for all players.',
      char: '🎸',
    });
  }

  apply() {
    for (const p of MatchEffect.allPlayers()) {
      p.passing -= 2;
      p.tackling -= 1;
    }
  }

  revoke() {
    for (const p of MatchEffect.allPlayers()) {
      p.passing += 2;
      p.tackling += 1;
    }
  }
}
