class CrampAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Cramp',
      description:
        'Pick one player of the opposite team. That player cannot move from its current cell for the rest of this turn. Exhausted after use.',
      cost: [1],
      category: 'effect',
      exhaust: true,
    });
  }

  play({ team, board, target }) {
    if (!target) {
      return { success: false, reason: 'a target player is required' };
    }
    if (target.team === team.name) {
      return { success: false, reason: 'the target must belong to the opposite team' };
    }
    const targetCell = board.getPlayerCell(target);
    if (!targetCell) {
      return { success: false, reason: 'the target is not on the pitch' };
    }
    return { success: true, target, targetCell };
  }
}
