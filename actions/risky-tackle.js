class RiskyTackleAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Risky tackle',
      description:
        'Tackle the player with the ball from one cell away, exactly like a Tackle card. Risky: on play, a Frozen defense card is added to your playable deck and another to your discard pile.',
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
