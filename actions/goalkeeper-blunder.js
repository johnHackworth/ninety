class GoalkeeperBlunderAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Goalkeeper blunder',
      description:
        'While in your hand, your goalkeeper suffers -4 to all shot-stopping rolls. Exhausted after use.',
      cost: [2],
      category: 'penalty',
      exhaust: true,
    });
  }

  play() {
    return { success: true };
  }
  resolve(team) {
    const result = this.play({ team });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }
    logMatch(team.name, 'Goalkeeper blunder: the keeper refocuses! Shot-stopping returns to normal.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
