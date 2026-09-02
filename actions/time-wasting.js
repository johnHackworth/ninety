class TimeWastingAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Time wasting',
      description:
        'If leading: the opponent\'s next turn is skipped. Exhausts after use.',
      cost: [0],
      category: 'tactical',
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
    const opponent = board.getOpponent(team);
    game.skipOpponentNextTurn[opponent.name] = true;
    game.recordEvent({ type: 'timeWasting', team: team.name });
    logMatch(team.name, 'Time wasting! The opponent\'s next turn is skipped.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
