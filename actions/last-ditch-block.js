class LastDitchBlockAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Last-Ditch Block',
      description:
        'A defender on the same cell or one cell away from the ball carrier attempts a last-ditch block. Compare tackling + 3 vs the carrier\'s shooting. If successful, the ball is cleared to a nearby cell.',
      cost: [1],
      category: 'defense',
    });
  }

  play({ team, defender, board }) {
    const holder = board.getBallHolder();
    if (!holder) {
      return { success: false, reason: 'nobody has possession of the ball' };
    }
    if (holder.team === team.name) {
      return { success: false, reason: 'your team has possession' };
    }

    const defenderCell = board.getPlayerCell(defender);
    const holderCell = board.getPlayerCell(holder);
    if (!defenderCell || !holderCell) {
      return { success: false, reason: 'players are not on the pitch' };
    }

    const dx = holderCell.x - defenderCell.x;
    const dy = holderCell.y - defenderCell.y;
    const distance = Math.max(Math.abs(dx), Math.abs(dy));
    if (distance > 1) {
      return { success: false, reason: 'defender must be on the same cell or one cell away from the ball carrier' };
    }

    const won = defender.tackling + 3 > holder.shooting;
    return { success: true, defender, holder, won };
  }
}
