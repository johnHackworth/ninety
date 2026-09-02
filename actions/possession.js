class PossessionAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Possession',
      description: 'Gain two extra action points this turn.',
      cost: [0],
      category: 'tactical',
    });
  }

  play({ team }) {
    return { success: true, team };
  }
  resolve(team) {
    const result = this.play({ team });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }
    game.actionPoints[team.name] += 2;
    game.recordEvent({ type: 'possession', team: team.name });
    logMatch(team.name, 'Possession! +2 action points this turn.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
