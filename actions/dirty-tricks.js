class DirtyTricksAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Dirty tricks',
      description:
        "Steals the ball from the marked player and marks them as cramped for 2 turns. Exhausted after use.",
      cost: [1],
      category: 'defense',
      exhaust: true,
    });
  }

  play({ team, board }) {
    const holder = board.getBallHolder();
    if (!holder) {
      return { success: false, reason: 'nobody has possession of the ball' };
    }
    if (holder.team === team.name) {
      return { success: false, reason: 'your team already has possession' };
    }
    const holderCell = board.getPlayerCell(holder);
    if (!holderCell) {
      return { success: false, reason: 'the ball carrier is not on the pitch' };
    }
    const marker = board
      .getPlayersAt(holderCell.x, holderCell.y)
      .find((p) => p.team === team.name && p.position !== 'GK');
    if (!marker) {
      return { success: false, reason: 'no defender is marking the ball carrier' };
    }
    return { success: true, holder, marker };
  }
}