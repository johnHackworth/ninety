class HardTackleAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Hard tackle',
      description:
        "Fault by a player marking the carrier, or if the carrier is alone next to them. Victim is injured and substituted. Tackling beats dribbling: yellow; else straight red.",
      cost: [2],
      category: 'defense',
    });
  }

  play({ team, tackler, holder, board }) {
    if (!holder) {
      return { success: false, reason: 'nobody has possession of the ball' };
    }
    if (holder.team === team.name) {
      return { success: false, reason: 'your team already has possession' };
    }

    const tacklerCell = board.getPlayerCell(tackler);
    if (!tacklerCell) {
      return { success: false, reason: 'the tackler is not on the pitch' };
    }

    const holderCell = board.getPlayerCell(holder);
    if (!holderCell) {
      return { success: false, reason: 'the holder is not on the pitch' };
    }

    const sameCell = tacklerCell.x === holderCell.x && tacklerCell.y === holderCell.y;
    const adjacent = Math.max(
      Math.abs(tacklerCell.x - holderCell.x),
      Math.abs(tacklerCell.y - holderCell.y)
    ) === 1;
    const holderAlone = board.getPlayersAt(holderCell.x, holderCell.y).length <= 1;

    if (!sameCell && !(adjacent && holderAlone)) {
      return {
        success: false,
        reason: 'a tackler must be marking the holder or the holder must be alone in an adjacent cell',
      };
    }

    const yellow = tackler.tackling > holder.dribbling;
    return { success: true, tackler, holder, yellow, red: !yellow };
  }
}
