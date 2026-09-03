class GiantTifoEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Giant Tifo',
      description:
        'The home crowd unveil a giant tifo and get behind the team: while the home (left) team is chasing the score, their attackers have +1 to attacking attributes.',
      char: '🎨',
    });
    this._boostApplied = false;
    this.ATTACK_STATS = ['shooting', 'dribbling', 'passing', 'heading', 'tacticalThinking'];
  }

  _home() {
    return this.homeTeam();
  }

  _away() {
    return (
      MatchEffect.allTeams().find((t) => t.side === 'right') ||
      MatchEffect.allTeams()[1] ||
      null
    );
  }

  _homeTrailing() {
    const home = this._home();
    const away = this._away();
    if (!home || !away) return false;
    const score = game && game.score ? game.score : {};
    return (score[away.name] || 0) > (score[home.name] || 0);
  }

  _applyBoost() {
    const home = this._home();
    if (!home) return;
    for (const p of home.squad || []) {
      for (const attr of this.ATTACK_STATS) p[attr] += 1;
    }
    this._boostApplied = true;
  }

  _removeBoost() {
    const home = this._home();
    if (!home) return;
    for (const p of home.squad || []) {
      for (const attr of this.ATTACK_STATS) p[attr] -= 1;
    }
    this._boostApplied = false;
  }

  syncBoost() {
    const home = this._home();
    if (!home) return;
    const shouldBoost = this._homeTrailing();
    if (shouldBoost && !this._boostApplied) this._applyBoost();
    else if (!shouldBoost && this._boostApplied) this._removeBoost();
  }

  apply() {
    this.syncBoost();
  }

  revoke() {
    if (this._boostApplied) this._removeBoost();
  }
}
