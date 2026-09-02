class CrossAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Cross',
      description:
        'Playable with the ball in the last three columns and in the first or last two rows. Pick an attacker inside the penalty box or in the three central cells of the antepenultimate column; they move one cell forward when possible, receive the ball and shoot using their heading (markers use their heading too).',
      cost: [2],
      category: 'offense',
    });
  }

  play({ team, board, target }) {
    const holder = board.getBallHolder();
    if (!holder || holder.team !== team.name) {
      return { success: false, reason: 'one of your players must have possession of the ball' };
    }

    const ballCell = board.ballCell();
    const opponent = board.getOpponent(team);
    const attackingRight = team.side === 'left';

    const wideX = attackingRight ? ballCell.x >= board.width - 3 : ballCell.x <= 2;
    const wideY = ballCell.y <= 1 || ballCell.y >= board.height - 2;
    if (!wideX || !wideY) {
      return {
        success: false,
        reason: 'the ball must be in the last three columns and in the first or last two rows',
      };
    }

    const targetCell = board.getPlayerCell(target);
    if (!targetCell) {
      return { success: false, reason: 'the target is not on the pitch' };
    }

    if (board.isCramped && board.isCramped(target)) {
      return { success: false, reason: 'that player is cramped and cannot move' };
    }

    const inBox = board.inPenaltyBox(targetCell.x, targetCell.y, opponent.side);
    const antepenultimate = attackingRight ? board.width - 3 : 2;
    const inCentralAntepenultimate =
      targetCell.x === antepenultimate &&
      targetCell.y >= 2 &&
      targetCell.y <= board.height - 3;
    if (!inBox && !inCentralAntepenultimate) {
      return {
        success: false,
        reason: 'the target must be inside the penalty box or in the central cells of the antepenultimate column',
      };
    }

    const forwardX = attackingRight ? targetCell.x + 1 : targetCell.x - 1;
    const canForward =
      forwardX >= 0 &&
      forwardX < board.width &&
      board.canOccupy(forwardX, targetCell.y, [target]);

    return {
      success: true,
      target,
      targetCell,
      forward: canForward ? { x: forwardX, y: targetCell.y } : null,
    };
  }
}
