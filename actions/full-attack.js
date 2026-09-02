class FullAttackAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Full Attack!',
      description: 'Adds a Shoot, a Cross and a Finish card to your hand.',
      cost: [2],
      category: 'offense',
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
    game.inPlay[team.name].push(new ShootAction());
    game.inPlay[team.name].push(new CrossAction());
    game.inPlay[team.name].push(new FinishAction());
    game.recordEvent({ type: 'fullAttack', team: team.name });
    logMatch(team.name, 'Full Attack! Gained Shoot, Cross, and Finish cards.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
