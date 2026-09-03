class TackleAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Tackle',
      description:
        'Challenge the carrier from one cell away: your player moves onto the ball\'s cell. If their tackling +5 beats the carrier\'s dribbling, you win possession.',
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
    if (distance !== 1) {
      return { success: false, reason: 'tackler must be one cell away from the ball' };
    }

    const holder = board.getBallHolder();
    if (!holder) {
      return { success: false, reason: 'nobody has possession of the ball' };
    }

    if (!board.canOccupy(ballCell.x, ballCell.y, [tackler])) {
      return {
        success: false,
        reason: 'the ball cell already has a teammate; two players of the same team cannot share a cell',
      };
    }

    let won = tackler.tackling + 5 > holder.dribbling;
    let forcedFault = false;

    if (beesActive() && beesInOuterRegion(tacklerCell, board)) {
      won = tackler.tackling - 3 + 5 > holder.dribbling;
    }

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
