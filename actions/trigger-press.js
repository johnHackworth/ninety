class TriggerPressAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Trigger press',
      description:
        'All your defenders push one cell forward toward the ball. Any defender that ends up adjacent to the ball holder forces a tackle.',
      cost: [2],
      category: 'tactical',
    });
  }

  play({ team, board }) {
    const holder = board.getBallHolder();
    const holderCell = holder ? board.getPlayerCell(holder) : null;
    const forward = team.side === 'left' ? 1 : -1;
    const moves = [];

    for (const p of team.currentPlayers) {
      if (p.position !== 'DF') continue;
      if (board.isCramped && board.isCramped(p)) continue;
      const c = board.getPlayerCell(p);
      if (!c) continue;

      let nx, ny;
      if (holderCell) {
        const dx = Math.sign(holderCell.x - c.x);
        const dy = Math.sign(holderCell.y - c.y);
        if (dx !== 0) {
          nx = c.x + dx;
          ny = c.y;
        } else if (dy !== 0) {
          nx = c.x;
          ny = c.y + dy;
        } else {
          nx = c.x + forward;
          ny = c.y;
        }
      } else {
        nx = c.x + forward;
        ny = c.y;
      }

      if (nx < 0 || nx >= board.width || ny < 0 || ny >= board.height) continue;
      if (!board.canOccupy(nx, ny, [p])) continue;
      moves.push({ player: p, target: { x: nx, y: ny } });
    }

    if (moves.length === 0) {
      return { success: false, reason: 'no defenders can move' };
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
    const holder = matchState.possession && matchState.possession._token.player;
    let tackleForced = false;
    if (holder && holder.team !== team.name) {
      const holderCell = getPlayerCell(holder);
      if (holderCell) {
        for (const { target } of result.moves) {
          if (target.x === holderCell.x && target.y === holderCell.y) {
            tackleForced = true;
            break;
          }
          if (Math.max(Math.abs(target.x - holderCell.x), Math.abs(target.y - holderCell.y)) === 1) {
            tackleForced = true;
            break;
          }
        }
      }
    }
    logMatch(
      team.name,
      `Trigger press! Defenders push up.${tackleForced ? ' A tackle is forced on the ball carrier!' : ''}`
    );
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
