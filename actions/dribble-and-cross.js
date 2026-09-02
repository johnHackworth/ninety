class DribbleAndCrossAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Dribble and cross',
      description:
        'If your ball carrier is marked, they dribble past the marker (dribbling vs marking). Then they run one cell forward and cross to a teammate in the box. The target heads the ball towards goal.',
      cost: [2],
      category: 'offense',
    });
  }

  play({ team, board, target }) {
    const ballCell = board.ballCell();
    const opponent = board.getOpponent(team);
    const attackingRight = team.side === 'left';

    const holder = board.getBallHolder();
    if (!holder || holder.team !== team.name) {
      return { success: false, reason: 'your team must have possession' };
    }

    const holderCell = board.getPlayerCell(holder);
    if (!holderCell) {
      return { success: false, reason: 'the ball carrier is not on the pitch' };
    }

    const marker = board.getPlayersAt(holderCell.x, holderCell.y).find((p) => p.team !== team.name) || null;
    if (!marker) {
      return { success: false, reason: 'the ball carrier is not marked' };
    }

    const dribbleWon = holder.dribbling > marker.marking;

    const inc = attackingRight ? 1 : -1;
    const runX = holderCell.x + inc;
    if (runX < 0 || runX >= board.width) {
      return { success: false, reason: 'there is no room to run forward' };
    }

    if (dribbleWon) {
      if (!board.canOccupy(runX, holderCell.y, [holder])) {
        return { success: false, reason: 'cannot move forward after dribble' };
      }
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
      holder,
      dribbleWon,
      marker,
      holderCell,
      runTo: dribbleWon ? { x: runX, y: holderCell.y } : null,
      target,
      targetCell,
      forward: canForward ? { x: forwardX, y: targetCell.y } : null,
    };
  }
}
