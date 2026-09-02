class RunAndCrossFlankAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Flank',
      description:
        'Your ball carrier runs one cell forward if unmarked, then crosses to a teammate in the box or central antepenultimate cells. The target heads the ball towards goal.',
      cost: [1],
      category: 'offense',
    });
  }

  play({ team, board, winger, target }) {
    const ballCell = board.ballCell();
    const opponent = board.getOpponent(team);
    const attackingRight = team.side === 'left';

    if (board.getBallHolder() !== winger) {
      return { success: false, reason: 'the runner must be in possession of the ball' };
    }

    const wingerCell = board.getPlayerCell(winger);
    if (!wingerCell || wingerCell.x !== ballCell.x || wingerCell.y !== ballCell.y) {
      return { success: false, reason: 'the runner must be where the ball is' };
    }

    const marker = board.getPlayersAt(ballCell.x, ballCell.y).find((p) => p.team !== team.name) || null;
    if (marker) {
      return { success: false, reason: 'the runner is marked and cannot run' };
    }

    const inc = attackingRight ? 1 : -1;
    const destX = ballCell.x + inc;
    if (destX < 0 || destX >= board.width) {
      return { success: false, reason: 'there is no room to run forward' };
    }

    if (!board.canOccupy(destX, ballCell.y, [winger])) {
      return { success: false, reason: 'cannot move forward' };
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
      winger,
      from: wingerCell,
      to: { x: destX, y: ballCell.y },
      target,
      targetCell,
      forward: canForward ? { x: forwardX, y: targetCell.y } : null,
    };
  }
}
