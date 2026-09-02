class TimeWallAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Time wall',
      description:
        'For the rest of the turn, all movement cards (Move, Sprint, Short sprint, Dribbling and Feint turn) cost the opposition +1 extra action point. Exhausted after use.',
      cost: [2],
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
    game.timeWall[opponent.name] = true;
    game.recordEvent({ type: 'timeWall', team: team.name });
    logMatch(team.name, `Time wall! ${opponent.name}'s movement cards cost +1 action point this turn.`);
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
