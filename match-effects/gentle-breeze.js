class GentleBreezeEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Gentle Breeze',
      description:
        'A mild, steady breeze: all goalkeepers have +1 goalkeeping.',
      char: '🌬️',
    });
  }

  apply() {
    for (const p of MatchEffect.allPlayers()) {
      if (p.position === 'GK') p.goalkeeping += 1;
    }
  }

  revoke() {
    for (const p of MatchEffect.allPlayers()) {
      if (p.position === 'GK') p.goalkeeping -= 1;
    }
  }
}
