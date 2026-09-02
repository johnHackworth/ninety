class ParkTheMidfieldAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Park the midfield',
      description:
        'All your midfielders move to the center 3 rows of the pitch, locking down the middle. For the next 2 turns your midfielders get +1 marking.',
      cost: [2],
      category: 'tactical',
    });
  }

  play({ team, board }) {
    const centerRows = [
      Math.floor(board.height / 2) - 1,
      Math.floor(board.height / 2),
      Math.floor(board.height / 2) + 1,
    ];
    const moves = [];

    for (const p of team.currentPlayers) {
      if (p.position !== 'MF') continue;
      if (board.isCramped && board.isCramped(p)) continue;
      const c = board.getPlayerCell(p);
      if (!c) continue;
      if (centerRows.includes(c.y)) continue;

      const targetY = centerRows.reduce((best, row) => {
        return Math.abs(row - c.y) < Math.abs(best - c.y) ? row : best;
      }, centerRows[0]);

      if (!board.canOccupy(c.x, targetY, [p])) continue;
      moves.push({ player: p, target: { x: c.x, y: targetY } });
    }

    if (moves.length === 0) {
      return { success: false, reason: 'no midfielders need repositioning' };
    }

    return { success: true, moves };
  }
  resolve(team) {
    matchState.lastDribbledPlayer = null;
    const result = this.play({ team, board });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }
    for (const { player, target } of result.moves) {
      const el = tokenElForPlayer(player);
      if (el) moveTokenToCell(el, target.x, target.y);
    }
    updatePossession();
    for (const p of team.currentPlayers) {
      if (p.position === 'MF') p.addEffect('compactShape', 2);
    }
    logMatch(team.name, `Park the midfield! ${result.moves.length} midfielder(s) lock down the center. +1 marking for 2 turns.`);
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
