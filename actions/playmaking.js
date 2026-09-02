class PlaymakingAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Playmaking',
      description: 'Add another three cards from your deck to the playable cards of this turn.',
      cost: [0],
      category: 'effect',
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
    const drawn = game.drawCards(team, 3);
    if (drawn.length === 0) {
      logAlert('No cards left in the deck to draw.');
      renderGame();
      return;
    }
    logMatch(team.name, `Playmaking: draws 3 new cards (${drawn.map((a) => a.name).join(', ')}).`);
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
