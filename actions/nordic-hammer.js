class NordicHammerAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Nordic hammer',
      description:
        'Add 2 action points, a Finish card, a Sprint card and a Long ball card to your hand. Exhausted after use.',
      cost: [0],
      category: 'effect',
      exhaust: true,
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
    game.inPlay[team.name].push(new FinishAction());
    game.inPlay[team.name].push(new SprintAction());
    game.inPlay[team.name].push(new LongBallAction());
    game.recordEvent({ type: 'nordicHammer', team: team.name });
    logMatch(team.name, 'Nordic hammer! +2 action points, gained Finish, Sprint, and Long ball cards.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
