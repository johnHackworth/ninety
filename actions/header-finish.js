class HeaderFinishAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Header finish!',
      description:
        'With the ball in the opposition box, move an adjacent player in and head it at once. If the defender\'s marking beats the player\'s tactical thinking they follow along. Shot uses heading +4.',
      cost: [1],
      category: 'offense',
    });
  }

  play({ team, player, board }) {
    const ballCell = board.ballCell();
    const opponent = board.getOpponent(team);
    if (!board.inPenaltyBox(ballCell.x, ballCell.y, opponent.side)) {
      return { success: false, reason: 'the ball must be inside the opposition penalty box' };
    }

    const playerCell = board.getPlayerCell(player);
    if (!playerCell) {
      return { success: false, reason: 'the player is not on the pitch' };
    }

    const dx = Math.abs(ballCell.x - playerCell.x);
    const dy = Math.abs(ballCell.y - playerCell.y);
    if (Math.max(dx, dy) !== 1) {
      return { success: false, reason: 'the player must be one cell away from the ball' };
    }

    if (board.isCramped && board.isCramped(player)) {
      return { success: false, reason: 'that player is cramped and cannot move' };
    }

    const marker =
      board.getPlayersAt(playerCell.x, playerCell.y).find((p) => p.team !== team.name) || null;
    const follow = Boolean(marker && marker.marking > player.tacticalThinking);

    if (!board.canOccupy(ballCell.x, ballCell.y, follow ? [player, marker] : [player])) {
      return {
        success: false,
        reason: 'the ball cell already has a teammate; two players of the same team cannot share a cell',
      };
    }

    return { success: true, player, marker, follow, target: ballCell };
  }
}
