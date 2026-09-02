class FullDefenseAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Full Defense',
      description: 'Adds a Tackle, a Press and a Marking card to your hand.',
      cost: [2],
      category: 'defense',
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
    game.inPlay[team.name].push(new TackleAction());
    game.inPlay[team.name].push(new PressAction());
    game.inPlay[team.name].push(new MarkingAction());
    game.recordEvent({ type: 'fullDefense', team: team.name });
    logMatch(team.name, 'Full Defense! Gained Tackle, Press, and Marking cards.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
