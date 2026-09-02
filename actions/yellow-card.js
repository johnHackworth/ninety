class YellowCardAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Yellow card',
      description:
        'The referee books an opposition player. Fearing a second yellow, their next tackle attempt automatically fails. Exhausted after use.',
      cost: [1],
      category: 'effect',
      exhaust: true,
    });
  }

  play({ team, board, target }) {
    const opponent = board.getOpponent(team);
    if (!target || !opponent.currentPlayers.includes(target)) {
      return { success: false, reason: 'you must book an opposition player' };
    }
    if (!board.getPlayerCell(target)) {
      return { success: false, reason: 'that player is not on the pitch' };
    }
    if (target.hasEffect('scaredToTackle')) {
      return { success: false, reason: 'that player is already scared of a second card' };
    }
    return { success: true, target };
  }
}
