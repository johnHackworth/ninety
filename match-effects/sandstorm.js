class SandstormEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Sandstorm',
      description:
        'A swirling sandstorm bites at your eyes: all goalkeepers have -4 goalkeeping, and every movement card costs +1 action point.',
      char: '🌀',
    });
  }

  apply() {
    for (const p of MatchEffect.allPlayers()) {
      if (p.position === 'GK') p.goalkeeping -= 4;
    }
  }

  revoke() {
    for (const p of MatchEffect.allPlayers()) {
      if (p.position === 'GK') p.goalkeeping += 4;
    }
  }
}
