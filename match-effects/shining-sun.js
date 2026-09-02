class ShiningSunEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Shining Sun',
      description: 'A blinding sun overhead: all goalkeepers have -2 goalkeeping.',
      char: '☀️',
    });
  }

  apply() {
    for (const p of MatchEffect.allPlayers()) {
      if (p.position === 'GK') p.goalkeeping -= 2;
    }
  }

  revoke() {
    for (const p of MatchEffect.allPlayers()) {
      if (p.position === 'GK') p.goalkeeping += 2;
    }
  }
}
