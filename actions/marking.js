class MarkingAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Marking',
      description:
        "Anticipate the pass and steal the ball. The value of 'marking' + 5 should be higher than the opposite player tactical value.",
      cost: [0],
      category: 'defense',
    });
  }

  play({ team, marker, board }) {
    const holder = board.getBallHolder();
    if (!holder) {
      return { success: false, reason: 'nobody has possession of the ball' };
    }
    if (holder.team === team.name) {
      return { success: false, reason: 'your team already has possession' };
    }

    const markerCell = board.getPlayerCell(marker);
    const holderCell = board.getPlayerCell(holder);
    if (!markerCell || !holderCell) {
      return { success: false, reason: 'players are not on the pitch' };
    }
    if (markerCell.x !== holderCell.x || markerCell.y !== holderCell.y) {
      return { success: false, reason: 'marker must be in the same cell as the ball holder' };
    }

    const won = marker.marking + 5 > holder.tacticalThinking;
    return { success: true, marker, holder, won };
  }
}
