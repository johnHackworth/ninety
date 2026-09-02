class OneTwoWallAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'One-two wall',
      description:
        'Take a Pass card from your discard pile back into your hand. It is free to use this turn and Exhausts after use.',
      cost: [1],
      category: 'tactical',
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
    const discard = team.discardedActions;
    const index = discard.findIndex((c) => c instanceof PassAction);
    if (index === -1) {
      logAlert('No Pass card in your discard pile');
      renderGame();
      return;
    }
    const pass = discard.splice(index, 1)[0];
    pass.exhaust = true;
    game.inPlay[team.name].push(pass);
    game.markFree(pass);
    game.recordEvent({ type: 'oneTwoWall', team: team.name });
    logMatch(
      team.name,
      `One-two wall! A Pass card is recovered from the discard pile — free to use this turn, exhausts after use.`
    );
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
