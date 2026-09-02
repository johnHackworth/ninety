class HostileCrowdEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Hostile Crowd',
      description:
        'A hostile away atmosphere: the team on the right (away) gets -1 to all attributes.',
      char: '😡',
    });
  }

  awayTeam() {
    return (
      MatchEffect.allTeams().find((t) => t.side === 'right') ||
      MatchEffect.allTeams()[1] ||
      null
    );
  }

  apply() {
    const away = this.awayTeam();
    if (!away) return;
    for (const p of away.squad || []) {
      for (const attr of BOOSTABLE_STATS) {
        p[attr] -= 1;
      }
    }
  }

  revoke() {
    const away = this.awayTeam();
    if (!away) return;
    for (const p of away.squad || []) {
      for (const attr of BOOSTABLE_STATS) {
        p[attr] += 1;
      }
    }
  }
}
