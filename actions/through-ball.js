class ThroughBallAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Through ball',
      description:
        'Slip the ball behind the defensive line: if passer passing + receiver speed beats the nearest defender\'s marking + tactical thinking, it bypasses the first marker.',
      cost: [2],
      category: 'tactical',
    });
  }

  play({ passer, team, target, board }) {
    const holder = board.getBallHolder();
    if (!holder) {
      return { success: false, reason: 'nobody has possession of the ball' };
    }
    if (holder !== passer) {
      return { success: false, reason: 'only the player with the ball can play a through ball' };
    }

    const passerCell = board.getPlayerCell(passer);
    if (!passerCell) {
      return { success: false, reason: 'passer is not on the pitch' };
    }

    const dx = target.x - passerCell.x;
    const dy = target.y - passerCell.y;
    const dist = Math.max(Math.abs(dx), Math.abs(dy));
    if (dist < 2 || dist > 4) {
      return { success: false, reason: 'target must be between 2 and 4 cells away' };
    }

    const attackingRight = team.side === 'left';
    if (attackingRight ? dx <= 0 : dx >= 0) {
      return { success: false, reason: 'the pass must go forward toward the opponent goal' };
    }

    const receiver = board.getPlayersAt(target.x, target.y).find((p) => p.team === team.name);
    if (!receiver) {
      return { success: false, reason: 'no teammate at that position' };
    }
    if (receiver === passer) {
      return { success: false, reason: 'cannot pass to yourself' };
    }

    const opponent = board.getOpponent(team);
    const receiversForward = attackingRight
      ? target.x >= board.width - 5
      : target.x <= 4;
    const hasDefender = board.getPlayersAt(target.x, target.y).some((p) => p.team === opponent.name);
    if (!receiversForward && !hasDefender) {
      return { success: false, reason: 'target must be in the attacking third or marked by an opponent' };
    }

    let intercepted = false;
    let interceptor = null;
    const markers = board.getPlayersAt(target.x, target.y).filter((p) => p.team === opponent.name);
    if (!Action.interceptionBlocked(team)) {
      const blocked = markers.find((m) => m.marking + m.tacticalThinking >= passer.passing + receiver.speed);
      if (blocked) {
        intercepted = true;
        interceptor = blocked;
      }
    }

    return { success: true, passer, receiver, target, intercepted, interceptor };
  }
}
