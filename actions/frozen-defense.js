class FrozenDefenseAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Frozen defense',
      description:
        "While on your hand, you can't play any movement card with a defender (DF) or goalkeeper (GK) player. Exhausted after use.",
      cost: [1],
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
      'Frozen defense: your movement cards involving DF or GK players are available again.'
    );
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
