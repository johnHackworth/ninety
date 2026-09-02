class TacticalFaultAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Tactical fault',
      description:
        'Right after your defender has been dribbled, force a fault in the cell where the defender is. A free kick restarts play for the other team.',
      cost: [0],
      category: 'defense',
    });
  }

  play({ team, board }) {
    const holder = board.getBallHolder();
    if (holder && holder.team === team.name) {
      return { success: false, reason: 'a fault can only be forced when the opposition has the ball' };
    }
    return { success: true, team };
  }
  resolve(team) {
    const dribbled = matchState.lastDribbledPlayer;
    if (!dribbled || !team.currentPlayers.includes(dribbled)) {
      logAlert('Tactical fault can only be played right after one of your defenders has been dribbled.');
      renderGame();
      return;
    }
    const holder = board.getBallHolder();
    if (holder && holder.team === team.name) {
      logAlert('A fault can only be forced when the opposition has the ball.');
      renderGame();
      return;
    }
    const result = this.play({ team, board });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }
    matchState.lastDribbledPlayer = null;
    resetForRestart(board.getOpponent(team));
    game.recordFoul(team, dribbled);
    logMatch(
      team.name,
      `Tactical fault by ${dribbled.name}! Free kick for ${board.getOpponent(team).name}.`
    );
    const playResult = game.playAction(team, this, { endTurn: true, nextTeam: board.getOpponent(team) });
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
