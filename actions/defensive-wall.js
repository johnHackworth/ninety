class DefensiveWallAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Defensive Wall',
      description:
        'For this turn, if the opponent shoots from outside the penalty box while you have 2 or more defenders in your penalty box or in the three cells in front of it, reduce the shot\'s shooting value by 3.',
      cost: [1],
      category: 'defense',
    });
  }

  play({ team, board }) {
    const opponent = board.getOpponent(team);
    const boxPlayers = [];
    for (const p of team.currentPlayers) {
      if (p.position !== 'DF') continue;
      const c = board.getPlayerCell(p);
      if (c && (team.side === 'left' ? c.x <= 6 : c.x >= (board.width || WIDTH) - 7)) {
        boxPlayers.push(p);
      }
    }
    if (boxPlayers.length < 1) {
      return { success: false, reason: 'you need at least 1 defender in your defensive zone' };
    }
    return { success: true, team, defendersInBox: boxPlayers.length };
  }
  resolve(team) {
    const result = this.play({ team, board });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }
    game.defensiveWall[team.name] = true;
    game.recordEvent({ type: 'defensiveWall', team: team.name });
    logMatch(team.name, `Defensive Wall! ${result.defendersInBox} defender(s) in the box — opponent shots from outside will suffer -3.`);
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
