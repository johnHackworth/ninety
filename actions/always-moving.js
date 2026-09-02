class AlwaysMovingAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Always Moving',
      description:
        'For the rest of the match, if your team does not draw a Move card at the start of a turn, add a Move card (ephemeral, exhausts after use) to your hand. Exhausted after use.',
      cost: [2],
      category: 'effect',
      exhaust: true,
      ephemeral: true,
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
    team.addTeamEffect('alwaysMoving', Infinity);
    game.recordEvent({ type: 'alwaysMoving', team: team.name });
    logMatch(team.name, 'Always Moving! You draw a free Move card each turn if you did not get one.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
