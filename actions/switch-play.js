class SwitchPlayAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Switch play',
      description:
        'Only playable when the ball is on a touchline (top or bottom row). Launch a cross-field pass to the opposite row — choose any cell on it. If an opponent in the target cell is strong enough, the pass is intercepted.',
      cost: [1],
      category: 'offense',
    });
  }

  play({ team, board, target }) {
    const holder = board.getBallHolder();
    if (!holder) {
      return { success: false, reason: 'nobody has possession of the ball' };
    }

    const cell = board.getPlayerCell(holder);
    if (!cell) {
      return { success: false, reason: 'ball holder is not on the pitch' };
    }

    const onTopRow = cell.y === 0;
    const onBottomRow = cell.y === board.height - 1;

    if (!onTopRow && !onBottomRow) {
      return { success: false, reason: 'the ball must be on a touchline (top or bottom row) to switch play' };
    }

    const targetY = onTopRow ? board.height - 1 : 0;
    if (!target || target.y !== targetY) {
      return { success: false, reason: 'the switch must land on the opposite row' };
    }

    const opponents = board.getPlayersAt(target.x, targetY).filter((p) => p.team !== team.name);
    let intercepted = false;
    let interceptor = null;
    if (opponents.length > 0 && !Action.interceptionBlocked(team)) {
      const interceptorCandidate = opponents.find((o) => o.marking + o.tacticalThinking >= holder.passing + 3);
      if (interceptorCandidate) {
        intercepted = true;
        interceptor = interceptorCandidate;
      }
    }

    return {
      success: true,
      target: { x: target.x, y: targetY },
      intercepted,
      interceptor,
    };
  }
}
