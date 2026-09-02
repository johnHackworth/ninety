class SuspensionShadowAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Suspension shadow',
      description:
        'While in your hand, the next Tackle card you play injures your tackler instead of the opponent. Exhausted after use.',
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
    game.suspensionShadowActive = team.name;
    logMatch(team.name, 'Suspension shadow: the threat lifts! Your next tackle is safe.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
