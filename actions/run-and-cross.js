class RunAndCrossAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Run and cross!',
      description:
        'In the opposition half, from rows 0, 1 or 6, your ball carrier runs two cells forward and crosses when no teammate is in the next two cells in their row and they are faster than their marker (or unmarked). Pick an attacker in the box or the central antepenultimate cells; they shoot with their heading.',
      cost: [3],
      category: 'offense',
    });
  }

  play({ team, board, winger, target }) {
    const ballCell = board.ballCell();
    const opponent = board.getOpponent(team);
    const attackingRight = team.side === 'left';

    const inOppositionHalf = attackingRight ? ballCell.x >= 5 : ballCell.x <= 3;
    if (!inOppositionHalf) {
      return { success: false, reason: 'the ball must be in the opposition half' };
    }
    if (!(ballCell.y === 0 || ballCell.y === 1 || ballCell.y === 6)) {
      return { success: false, reason: 'the ball must be in rows 0, 1 or 6' };
    }

    if (board.getBallHolder() !== winger) {
      return { success: false, reason: 'the runner must be in possession of the ball' };
    }
    const wingerCell = board.getPlayerCell(winger);
    if (!wingerCell || wingerCell.x !== ballCell.x || wingerCell.y !== ballCell.y) {
      return { success: false, reason: 'the runner must be where the ball is' };
    }

    const inc = attackingRight ? 1 : -1;
    for (let i = 1; i <= 2; i++) {
      const x = ballCell.x + inc * i;
      if (x < 0 || x >= board.width) {
        return { success: false, reason: 'there is no room to run two cells forward' };
      }
      if (board.getPlayersAt(x, ballCell.y).some((p) => p.team === team.name)) {
        return { success: false, reason: 'a teammate blocks the run in this row' };
      }
    }

    const marker = board.getPlayersAt(ballCell.x, ballCell.y).find((p) => p.team !== team.name) || null;
    if (marker && !(winger.speed > marker.speed)) {
      return { success: false, reason: 'the runner is not faster than their marker' };
    }

    const destX = ballCell.x + inc * 2;
    if (!board.canOccupy(destX, ballCell.y, [winger])) {
      return { success: false, reason: 'cannot move forward two cells' };
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