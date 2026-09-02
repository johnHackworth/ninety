class RedMistAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Red mist',
      description:
        'While in your hand, all your players suffer -2 marking and -2 tackling. Exhausted after use.',
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
    logMatch(team.name, 'Red mist: the anger subs! Players regain their marking and tackling.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
