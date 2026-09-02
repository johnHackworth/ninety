class IntensityAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Intensity',
      description:
        'This turn, every action of your team that costs more than one action point costs only 1. Exhausted after use.',
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
    game.intensity[team.name] = true;
    logMatch(team.name, `Intensity! Next card costs ${Math.max(1, Math.min(...this.cost))} point(s) (min 1).`);
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
