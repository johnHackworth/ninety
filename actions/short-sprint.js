class ShortSprintAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Short sprint',
      description:
        'Move a single player one or two cells in any direction, then that player is cramped for 3 turns.',
      cost: [0],
      category: 'tactical',
    });
  }

  play({ team, player, board, target }) {
    const playerCell = board.getPlayerCell(player);
    if (!playerCell) {
      return { success: false, reason: 'player is not on the pitch' };
    }

    if (board.isCramped && board.isCramped(player)) {
      return { success: false, reason: 'that player is cramped and cannot move' };
    }

    if (player.hasEffect && player.hasEffect('injured')) {
      return { success: false, reason: 'that player is injured and cannot sprint' };
    }

    const dx = Math.abs(target.x - playerCell.x);
    const dy = Math.abs(target.y - playerCell.y);
    const distance = Math.max(dx, dy);
    if (distance !== 1 && distance !== 2) {
      return { success: false, reason: 'target must be one or two cells away' };
    }

    const marker = board
      .getPlayersAt(playerCell.x, playerCell.y)
      .find((p) => p.team !== team.name);
    if (marker && board.getBallHolder() === player) {
      return { success: false, reason: 'a marked player with possession cannot sprint' };
    }

    const follow = Boolean(
      marker &&
        !(board.isCramped && board.isCramped(marker)) &&
        Action.markerFollows(marker, player, team)
    );

    if (!board.canOccupy(target.x, target.y, follow ? [player, marker] : [player])) {
      return {
        success: false,
        reason: 'that move would leave two players of the same team on a single cell',
      };
    }

    return { success: true, player, target, marker, follow };
  }
}
