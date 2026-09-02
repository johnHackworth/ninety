class ExpertTackleAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Expert tackle',
      description:
        'Tackle the ball carrier from an adjacent cell or their own cell. If your tackling (+2) beats the opponent\u2019s dribbling, you steal possession.',
      cost: [1],
      category: 'defense',
    });
  }

  play({ team, tackler, board }) {
    const ballCell = board.ballCell();
    const tacklerCell = board.getPlayerCell(tackler);
    if (!tacklerCell) {
      return { success: false, reason: 'tackler is not on the pitch' };
    }

    const dx = ballCell.x - tacklerCell.x;
    const dy = ballCell.y - tacklerCell.y;
    const distance = Math.max(Math.abs(dx), Math.abs(dy));
    if (distance !== 0 && distance !== 1) {
      return {
        success: false,
        reason: 'the tackler must be in the ball carrier\u2019s cell or one cell away',
      };
    }

    const holder = board.getBallHolder();
    if (!holder) {
      return { success: false, reason: 'nobody has possession of the ball' };
    }

    if (distance === 1 && !board.canOccupy(ballCell.x, ballCell.y, [tackler])) {
      return {
        success: false,
        reason: 'the ball cell already has a teammate; two players of the same team cannot share a cell',
      };
    }

    let won = tackler.tackling + 2 > holder.dribbling;
    let forcedFault = false;

    if (Action.consumeTackleFear(tackler)) {
      won = false;
    }

    if (holder.position === 'GK') {
      const holderTeam = board.getTeam(holder.team);
      const holderCell = board.getPlayerCell(holder);
      if (holderTeam && holderCell && board.inPenaltyBox(holderCell.x, holderCell.y, holderTeam.side)) {
        won = false;
        forcedFault = true;
      }
    }

    return { success: true, tackler, holder, won, forcedFault };
  }
}