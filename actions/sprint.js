class SprintAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Sprint',
      description:
        'Move a single player exactly two cells away in any direction. The player with possession can only use this card if they are not marked.',
      cost: [1],
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
    if (Math.max(dx, dy) !== 2) {
      return { success: false, reason: 'target must be exactly two cells away' };
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
