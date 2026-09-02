class SecondBallHeaderAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Second ball header',
      description:
        'When the goalkeeper saves a shot and the ball is loose in the box, your nearest player can rush in and head it towards goal. Uses your heading with a +2 bonus. Free after a saved shot.',
      cost: [0],
      category: 'offense',
    });
  }

  play({ team, player, board }) {
    if (!board.getBallHolder()) {
      return { success: false, reason: 'nobody has possession of the ball' };
    }

    if (!matchState.lastShotSave) {
      return { success: false, reason: 'no saved shot to follow up on' };
    }

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

    return { success: true, player, target: ballCell };
  }
}
