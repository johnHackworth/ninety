class ThunderstormEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Thunderstorm',
      description:
        'A violent thunderstorm: all goalkeepers have -3 goalkeeping, while strikers are fired up with +1 shooting.',
      char: '⛈️',
    });
  }

  apply() {
    for (const p of MatchEffect.allPlayers()) {
      if (p.position === 'GK') p.goalkeeping -= 3;
      if (p.position === 'FW') p.shooting += 1;
    }
  }

  revoke() {
    for (const p of MatchEffect.allPlayers()) {
      if (p.position === 'GK') p.goalkeeping += 3;
      if (p.position === 'FW') p.shooting -= 1;
    }
  }
}
