class MoraleCollapseAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Morale collapse',
      description:
        'While in your hand, all your players suffer -3 tactical thinking. Exhausted after use.',
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
    logMatch(team.name, 'Morale collapse: spirits lift! Players regain their tactical thinking.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
