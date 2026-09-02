class LongBallAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Long ball',
      description:
        'Pass the ball to any empty position within your passing range (passing + 1 horizontal/vertical moves). Your range is reduced by 2 if you are marked. The ball becomes loose when there is nobody to receive it.',
      cost: [1],
      category: 'offense',
    });
  }

  play({ team, passer, target, board }) {
    if (!passer || passer.passing < 3) {
      return { success: false, reason: 'the passer needs a passing attribute of at least 3' };
    }

    const playersAtTarget = board.getPlayersAt(target.x, target.y);
    if (playersAtTarget.length > 0) {
      return { success: false, reason: 'target cell is occupied' };
    }

    const ballCell = board.ballCell();
    const minCol = team.side === 'left' ? 0 : board.width - 5;
    const maxCol = team.side === 'left' ? board.width - 5 : board.width - 1;
    if (ballCell.x < minCol || ballCell.x > maxCol) {
      return { success: false, reason: 'ball must be in your own first 5 columns to play a long ball' };
    }

    const passerCell = board.getPlayerCell(passer);
    const marked = passerCell
      ? board.getPlayersAt(passerCell.x, passerCell.y).some((p) => p.team !== team.name)
      : false;

    const range = passer.passing + 1 - (marked ? 2 : 0);
    const distance = Math.abs(target.x - ballCell.x) + Math.abs(target.y - ballCell.y);
    if (distance > range) {
      return { success: false, reason: `target is beyond the passing range of ${passer.name} (${range})` };
    }

    return { success: true };
  }
}
