class GullsEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Seagulls',
      description:
        'A hungry flock of seagulls swoops at long punts: every shot has -15% accuracy, while goalkeepers are on high alert with +2 goalkeeping.',
      char: '🐦',
    });
  }

  apply() {
    for (const p of MatchEffect.allPlayers()) {
      if (p.position === 'GK') p.goalkeeping += 2;
    }
  }

  revoke() {
    for (const p of MatchEffect.allPlayers()) {
      if (p.position === 'GK') p.goalkeeping -= 2;
    }
  }
}
