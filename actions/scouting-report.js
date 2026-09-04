class ScoutingReportAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Scouting report',
      description:
        'Reveal the opposition hand for the rest of the match.',
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
    const opponent = board.getOpponent(team);
    if (opponent) {
      game.revealedHand[opponent.name] = true;
    }
    game.recordEvent({ type: 'scouting-report', team: team.name });
    logMatch(team.name, `Scouting report: you can now see ${opponent ? opponent.name : 'the opposition'}'s hand.`);
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
