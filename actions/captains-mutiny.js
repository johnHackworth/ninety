class CaptainsMutinyAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: "Captain's mutiny",
      description:
        "While in your hand, you can't play any Inspiration or Big Match Mentality cards. Exhausted after use.",
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
    logMatch(team.name, "Captain's mutiny: the captain regains control! Inspiration and Big Match Mentality cards are available again.");
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
