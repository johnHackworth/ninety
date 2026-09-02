class SlipAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Slip',
      description:
        'Move a player not with the ball a single cell. If the player is marked, the marker won\u2019t follow.',
      cost: [1],
      category: 'offense',
    });
  }

  play({ team, player, target, board }) {
    const playerCell = board.getPlayerCell(player);
    if (!playerCell || playerCell.x < 0 || playerCell.y < 0) {
      return { success: false, reason: 'player is not on the pitch' };
    }

    if (board.isCramped && board.isCramped(player)) {
      return { success: false, reason: 'that player is cramped and cannot move' };
    }

    if (board.getBallHolder() === player) {
      return { success: false, reason: 'only a player not with the ball can slip' };
    }

    const dx = Math.abs(target.x - playerCell.x);
    const dy = Math.abs(target.y - playerCell.y);
    if (Math.max(dx, dy) !== 1) {
      return { success: false, reason: 'target must be one cell away (orthogonally or diagonally)' };
    }

    if (!board.canOccupy(target.x, target.y, [player])) {
      return {
        success: false,
        reason: 'that move would leave two players of the same team on a single cell',
      };
    }

    return { success: true, player, target, follow: false };
  }
}
