class LostDressingRoomAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Lost the dressing room',
      description:
        "While in your hand, you can't play any Team Effect cards. Exhausted after use.",
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
    logMatch(team.name, 'Lost the dressing room: harmony is restored! Team effect cards are available again.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
