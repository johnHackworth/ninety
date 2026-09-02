class HandOfGodAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Hand of God',
      description:
        'For the next 3 turns, every finishing or cross action always finishes in a successful goal. Exhausted after use.',
      cost: [3],
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
    game.handOfGod[team.name] = 3;
    game.recordEvent({ type: 'handOfGod', team: team.name });
    logMatch(
      team.name,
      'Hand of God! For the next 3 turns, every finishing or cross action always finishes in a successful goal.'
    );
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
