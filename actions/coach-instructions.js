class CoachInstructionsAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Coach direction',
      description:
        'Discard all the cards in your current hand and draw the same number of new cards from the deck. Adds 4 Press cards to your deck. Unique: a drawn card that is already a copy of a card in your hand is discarded and a new card is drawn instead.',
      cost: [0],
      category: 'tactical',
      unique: true,
    });
  }

  play({ team }) {
    for (let i = 0; i < 4; i++) {
      team.availableActions.push(new PressAction());
    }
    return { success: true, team };
  }
  resolve(team) {
    const result = this.play({ team });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }

    const hand = game.inPlay[team.name];
    const count = hand.length;

    for (const card of hand) {
      if (card === this) continue;
      team.useAction(card);
    }
    hand.length = 0;
    hand.push(this);

    const drawn = game.drawCards(team, count, { unique: this.unique });

    logMatch(
      team.name,
      `Coach direction: discards ${count - 1} card(s) and draws ${drawn.length} new card(s). +4 Press cards added to deck.`
    );

    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
