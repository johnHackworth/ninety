class OffBallPlayAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Off ball play',
      description:
        'Move three players that do not have possession. If a player is marked, the marker always moves along with them.',
      cost: [1],
      category: 'tactical',
    });
  }

  play({ team, board, moves }) {
    if (!moves || moves.length !== 3) {
      return { success: false, reason: 'exactly three players must move' };
    }

    for (const move of moves) {
      const { player, target } = move;
      const playerCell = board.getPlayerCell(player);
      if (!playerCell) {
        return { success: false, reason: 'a selected player is not on the pitch' };
      }

      if (board.isCramped && board.isCramped(player)) {
        return { success: false, reason: 'a selected player is cramped and cannot move' };
      }

      const dx = Math.abs(target.x - playerCell.x);
      const dy = Math.abs(target.y - playerCell.y);
      if (Math.max(dx, dy) !== 1) {
        return { success: false, reason: 'each player must move exactly one cell away' };
      }

      const marker = move.marker || null;
      const follow = Boolean(marker && !(board.isCramped && board.isCramped(marker)));
      const moving = follow ? [player, marker] : [player];
      if (!board.canOccupy(target.x, target.y, moving)) {
        return {
          success: false,
          reason: 'that move would leave two players of the same team on a single cell',
        };
      }
    }

    return { success: true, moves };
  }
}
