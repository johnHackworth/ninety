class WinningStreakRoarEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Winning Streak Roar',
      description:
        'The crowd lift the current leaders: the team with more goals gets +1 to all attributes, the trailing team -1.',
      char: '🦁',
    });
    this._favored = null;
  }

  apply() {
    const teams = MatchEffect.allTeams();
    if (teams.length < 2) return;
    let [leading, trailing] = teams;
    const scoreOf = (t) => (game && game.score ? game.score[t.name] || 0 : 0);
    if (scoreOf(trailing) > scoreOf(leading)) {
      [leading, trailing] = [trailing, leading];
    }
    // Snapshot: whoever is ahead when the effect takes hold stays favored.
    this._favored = leading.name;
    this._applyTo(leading, +1);
    this._applyTo(trailing, -1);
  }

  _applyTo(team, delta) {
    for (const p of team.squad || []) {
      for (const attr of BOOSTABLE_STATS) {
        p[attr] += delta;
      }
    }
  }

  revoke() {
    const teams = MatchEffect.allTeams();
    const leading = teams.find((t) => t.name === this._favored);
    const trailing = teams.find((t) => t.name !== this._favored);
    if (leading) this._applyTo(leading, -1);
    if (trailing) this._applyTo(trailing, +1);
  }
}
