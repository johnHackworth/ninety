class TerangaRoarAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Teranga roar',
      description:
        'Add 2 action points, a Sprint card, a Finish card and a Dribbling card to your hand. Exhausted after use.',
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
    game.inPlay[team.name].push(new SprintAction());
    game.inPlay[team.name].push(new FinishAction());
    game.inPlay[team.name].push(new DribblingAction());
    game.recordEvent({ type: 'terangaRoar', team: team.name });
    logMatch(team.name, 'Teranga roar! +2 action points, gained Sprint, Finish, and Dribbling cards.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
