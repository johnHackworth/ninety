class ForcedPressAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Forced press',
      description:
        "High pressure on the player with the ball. The value of 'tackling' + 5 should be higher than the opposite player tactical value. On play, a Broken defense card is added to your discard pile.",
      cost: [1],
      category: 'defense',
    });
  }

  play({ team, presser, board }) {
    const holder = board.getBallHolder();
    if (!holder) {
      return { success: false, reason: 'nobody has possession of the ball' };
    }
    if (holder.team === team.name) {
      return { success: false, reason: 'your team already has possession' };
    }

    const presserCell = board.getPlayerCell(presser);
    const holderCell = board.getPlayerCell(holder);
    if (!presserCell || !holderCell) {
      return { success: false, reason: 'players are not on the pitch' };
    }
    if (presserCell.x !== holderCell.x || presserCell.y !== holderCell.y) {
      return { success: false, reason: 'presser must be in the same cell as the ball holder' };
    }

    const won = presser.tackling + 5 > holder.tacticalThinking;
    return { success: true, presser, holder, won };
  }
}
