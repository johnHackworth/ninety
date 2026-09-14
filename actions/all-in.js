class AllInAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'All-in',
      description:
        'Discard your whole hand. At the start of your next turn, gain 1 action point for every card discarded. Exhausts after use.',
      cost: [0],
      category: 'effect',
      exhaust: true,
    });
  }

  play({ team }) {
    if (!game || !game.inPlay || !game.inPlay[team.name]) {
      return { success: false, reason: 'no hand in play' };
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

    const hand = game.inPlay[team.name] || [];
    if (hand.length === 0) {
      logAlert('Your hand is empty.');
      renderGame();
      return;
    }

    const handCards = hand.slice();
    const discarded = handCards.length;
    for (const card of handCards) {
      if (card !== this) team.discardedActions.push(card);
    }
    if (game.heldCards && game.heldCards[team.name]) {
      game.heldCards[team.name] = game.heldCards[team.name].filter(
        (c) => !handCards.includes(c)
      );
      if (game.heldCards[team.name].length === 0) delete game.heldCards[team.name];
    }
    hand.length = 0;
    team.syncHeadsInTheClouds(hand);

    game.pendingApBonus[team.name] = (game.pendingApBonus[team.name] || 0) + discarded;
    game.recordEvent({ type: 'allIn', team: team.name, detail: discarded });
    logMatch(
      team.name,
      `All-in! Discarded ${discarded} card${discarded > 1 ? 's' : ''} — gain ${discarded} action point${discarded > 1 ? 's' : ''} next turn.`
    );

    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}