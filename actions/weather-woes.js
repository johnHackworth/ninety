class WeatherWoesAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Weather woes',
      description:
        'While in your hand, all movement cards cost +1 action point. Exhausted after use.',
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
    logMatch(team.name, 'Weather woes: the weather clears! Movement cards return to normal cost.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
