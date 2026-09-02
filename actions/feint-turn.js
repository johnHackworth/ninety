class FeintTurnAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Feint and turn',
      description:
        'If marked, beat the marker\'s tactical thinking with dribbling: move aside or diagonally and they mirror you toward the far touchline. From the touchline they back toward their goal instead (or hold if blocked).',
      cost: [1],
      category: 'offense',
    });
  }

  play({ team, player, board, target }) {
    const playerCell = board.getPlayerCell(player);
    if (!playerCell) {
      return { success: false, reason: 'player is not on the pitch' };
    }

    const holder = board.getBallHolder();
    if (holder !== player) {
      return { success: false, reason: 'only the player with possession can feint' };
    }

    if (board.isCramped && board.isCramped(player)) {
      return { success: false, reason: 'that player is cramped and cannot move' };
    }

    const marker = board
      .getPlayersAt(playerCell.x, playerCell.y)
      .find((p) => p.team !== team.name);
    if (!marker) {
      return { success: false, reason: 'the player with possession is not marked' };
    }

    const won = player.dribbling > marker.tacticalThinking;
    if (!won) {
      return { success: true, feinted: false, marker };
    }

    const dx = target.x - playerCell.x;
    const dy = target.y - playerCell.y;
    if (Math.abs(dy) !== 1 || Math.abs(dx) > 1) {
      return {
        success: false,
        reason: 'target must be one side cell away (lateral or diagonal)',
      };
    }

    if (!board.canOccupy(target.x, target.y, [player])) {
      return {
        success: false,
        reason: 'that move would leave two players of the same team on a single cell',
      };
    }

    const onTouchline = playerCell.y === 0 || playerCell.y === board.height - 1;
    if (onTouchline) {
      const forward = team.side === 'left' ? 1 : -1;
      const backX = playerCell.x + forward;
      const backOk =
        backX >= 0 &&
        backX < board.width &&
        board.canOccupy(backX, playerCell.y, [marker]);
      return {
        success: true,
        feinted: true,
        touchline: true,
        marker,
        target,
        markerTarget: backOk
          ? { x: backX, y: playerCell.y }
          : { x: playerCell.x, y: playerCell.y },
        markerStays: !backOk,
      };
    }

    const markerX = playerCell.x + dx;
    const markerY = playerCell.y - dy;
    if (markerX < 0 || markerX >= board.width || markerY < 0 || markerY >= board.height) {
      return {
        success: false,
        reason: 'the marker cannot be pushed towards the other touchline',
      };
    }

    if (!board.canOccupy(markerX, markerY, [marker])) {
      return { success: false, reason: 'the marker has nowhere to go' };
    }

    return {
      success: true,
      feinted: true,
      marker,
      target,
      markerTarget: { x: markerX, y: markerY },
    };
  }
}
