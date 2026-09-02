class HeadsInTheCloudsAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Heads in the clouds',
      description:
        'While in your hand, all your players suffer -3 to all attributes. Exhausted after use.',
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
    logMatch(
      team.name,
      'Heads in the clouds: the fog lifts! Players return to normal.'
    );
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
