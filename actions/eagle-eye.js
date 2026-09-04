class EagleEyeAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Tactical intelligence',
      description:
        'Reveal the opposition hand for the current turn.',
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
    const opponent = board.getOpponent(team);
    if (opponent) {
      game.revealedHandTurn[opponent.name] = true;
    }
    game.recordEvent({ type: 'eagle-eye', team: team.name });
    logMatch(team.name, `Eagle eye: you can see ${opponent ? opponent.name : 'the opposition'}'s hand this turn.`);
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
