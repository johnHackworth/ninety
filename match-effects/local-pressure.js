class LocalPressureEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Local Pressure',
      description:
        'A raucous home crowd: the team on the left (home) gets +1 to all attributes.',
      char: '📣',
    });
  }

  apply() {
    const home = this.homeTeam();
    if (!home) return;
    for (const p of home.squad || []) {
      for (const attr of BOOSTABLE_STATS) {
        p[attr] += 1;
      }
    }
  }

  revoke() {
    const home = this.homeTeam();
    if (!home) return;
    for (const p of home.squad || []) {
      for (const attr of BOOSTABLE_STATS) {
        p[attr] -= 1;
      }
    }
  }
}
