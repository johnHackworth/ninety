class OverloadAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Overload',
      description:
        'Move 2 off-ball players to the same flank as the ball carrier to create numerical superiority. If a player is marked, the marker follows when the marker\'s speed plus marking exceeds the player\'s speed plus tactical thinking.',
      cost: [1],
      category: 'tactical',
      exhaust: true,
    });
  }

  play({ team, board }) {
    const holder = board.getBallHolder();
    if (!holder || holder.team !== team.name) {
      return { success: false, reason: 'your team must have possession' };
    }
    const holderCell = board.getPlayerCell(holder);
    if (!holderCell) {
      return { success: false, reason: 'ball holder is not on the pitch' };
    }

    const flank = holderCell.y <= Math.floor(board.height / 2) ? 'top' : 'bottom';
    const flankRow = flank === 'top' ? 0 : board.height - 1;
    const moves = [];

    const candidates = team.currentPlayers.filter((p) => {
      if (p === holder) return false;
      const c = board.getPlayerCell(p);
      if (!c) return false;
      if (c.y === flankRow) return false;
      if (board.isCramped && board.isCramped(p)) return false;
      return true;
    });

    const dir = flank === 'top' ? -1 : 1;
    for (const player of candidates) {
      if (moves.length >= 2) break;
      const c = board.getPlayerCell(player);
      const ny = c.y + dir;
      if (ny < 0 || ny >= board.height) continue;
      const marker =
        board.getPlayersAt(c.x, c.y).find((p) => p.team !== team.name) || null;
      const follows =
        marker &&
        !(board.isCramped && board.isCramped(marker)) &&
        Action.markerFollows(marker, player, team);
      const moving = follows ? [player, marker] : [player];
      if (board.canOccupy(c.x, ny, moving)) {
        moves.push({ player, marker: follows ? marker : null, target: { x: c.x, y: ny } });
      }
    }

    if (moves.length < 2) {
      return { success: false, reason: 'not enough players can move to that flank' };
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
    for (const { player, marker, target } of result.moves) {
      const el = tokenElForPlayer(player);
      if (el) moveTokenToCell(el, target.x, target.y);
      if (marker) {
        const markerEl = tokenElForPlayer(marker);
        if (markerEl) moveTokenToCell(markerEl, target.x, target.y);
      }
    }
    const holder = matchState.possession && matchState.possession._token.player;
    const holderMove = result.moves.find((m) => m.player === holder);
    const markerMove = result.moves.find((m) => m.marker === holder);
    if (holderMove) {
      moveBall(holderMove.target.x, holderMove.target.y);
    } else if (markerMove) {
      moveBall(markerMove.target.x, markerMove.target.y);
    } else {
      updatePossession();
    }
    logMatch(team.name, `Overload! ${result.moves.map((m) => m.player.name).join(', ')} shift to the flank.`);
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
