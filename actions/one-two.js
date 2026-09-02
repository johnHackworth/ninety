class OneTwoAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'One-two',
      description:
        'A quick interchange: pass to an adjacent teammate, then the passer sprints two cells forward. The marker follows only if their speed plus marking exceeds the passer\'s speed plus tactical thinking.',
      cost: [1],
      category: 'offense',
    });
  }

  play({ passer, team, target, board }) {
    const holder = board.getBallHolder();
    if (!holder) {
      return { success: false, reason: 'nobody has possession of the ball' };
    }
    if (holder !== passer) {
      return { success: false, reason: 'only the player with the ball can play a one-two' };
    }

    const passerCell = board.getPlayerCell(passer);
    if (!passerCell) {
      return { success: false, reason: 'passer is not on the pitch' };
    }

    const dx = Math.abs(target.x - passerCell.x);
    const dy = Math.abs(target.y - passerCell.y);
    if (Math.max(dx, dy) !== 1) {
      return { success: false, reason: 'target must be exactly one cell away (adjacent)' };
    }

    const receiver = board.getPlayersAt(target.x, target.y).find((p) => p.team === team.name);
    if (!receiver) {
      return { success: false, reason: 'no teammate at that position' };
    }
    if (receiver === passer) {
      return { success: false, reason: 'cannot pass to yourself' };
    }

    const attackingRight = team.side === 'left';
    const forward = attackingRight ? target.x >= passerCell.x : target.x <= passerCell.x;
    if (!forward) {
      return { success: false, reason: 'the pass must go toward the opponent goal' };
    }

    const sprintDir = attackingRight ? 1 : -1;
    const sprintTarget = { x: passerCell.x + 2 * sprintDir, y: passerCell.y };
    if (sprintTarget.x < 0 || sprintTarget.x >= board.width) {
      return { success: false, reason: 'no room to sprint forward after the pass' };
    }

    let intercepted = false;
    let interceptor = null;
    const opponents = board.getPlayersAt(target.x, target.y).filter((p) => p.team !== team.name);
    if (!Action.interceptionBlocked(team)) {
      const blocked = opponents.find((m) => m.marking + m.tacticalThinking >= passer.passing + receiver.speed);
      if (blocked) {
        intercepted = true;
        interceptor = blocked;
      }
    }

    const marker = board.getPlayersAt(passerCell.x, passerCell.y).find((p) => p.team !== team.name);
    const follows =
      marker &&
      !(board.isCramped && board.isCramped(marker)) &&
      marker.speed + marker.marking >= passer.speed + passer.tacticalThinking;

    return {
      success: true,
      passer,
      receiver,
      passTarget: { x: target.x, y: target.y },
      sprintTarget,
      marker: follows ? marker : null,
      intercepted,
      interceptor,
    };
  }
}
