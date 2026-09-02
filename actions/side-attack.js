class SideAttackAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Side attack',
      description:
        'Pick top or bottom flank: every player there advances 2 cells toward the opponent goal. Marked players are followed when the marker\'s speed + marking beats their speed + tactical thinking.',
      cost: [1],
      category: 'tactical',
    });
  }

  play({ team, board, side }) {
    if (side !== 'top' && side !== 'bottom') {
      return { success: false, reason: 'pick the top or bottom flank' };
    }

    const row = side === 'top' ? 0 : board.height - 1;
    const forward = team.side === 'left' ? 1 : -1;
    const dx = 2 * forward;

    const moves = [];
    for (const player of team.currentPlayers) {
      const c = board.getPlayerCell(player);
      if (!c || c.y !== row) continue;
      if (board.isCramped && board.isCramped(player)) continue;
      const tx = c.x + dx;
      if (tx < 0 || tx >= board.width) continue;
      const marker =
        board.getPlayersAt(c.x, c.y).find((p) => p.team !== team.name) || null;
      const follows =
        marker &&
        !(board.isCramped && board.isCramped(marker)) &&
        Action.markerFollows(marker, player, team);
      moves.push({ player, marker: follows ? marker : null, target: { x: tx, y: row } });
    }

    if (moves.length === 0) {
      return { success: false, reason: 'no players on that flank can advance' };
    }

    const movers = new Set();
    for (const m of moves) {
      movers.add(m.player);
      if (m.marker) movers.add(m.marker);
    }

    const cellTeams = {};
    const count = (x, y, p) => {
      const key = `${x},${y}`;
      cellTeams[key] = cellTeams[key] || {};
      cellTeams[key][p.team] = (cellTeams[key][p.team] || 0) + 1;
    };

    for (let x = 0; x < board.width; x++) {
      for (let y = 0; y < board.height; y++) {
        for (const p of board.getPlayersAt(x, y)) {
          if (movers.has(p)) continue;
          count(x, y, p);
        }
      }
    }

    for (const m of moves) {
      count(m.target.x, m.target.y, m.player);
      if (m.marker) count(m.target.x, m.target.y, m.marker);
    }

    for (const key of Object.keys(cellTeams)) {
      if (Object.values(cellTeams[key]).some((n) => n > 1)) {
        return {
          success: false,
          reason: 'that move would leave two players of the same team on a single cell',
        };
      }
    }

    return { success: true, side, moves };
  }
}
