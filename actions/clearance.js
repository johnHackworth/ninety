class ClearanceAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Clear!',
      description:
        'A defender kicks the ball far upfield. Can be played if a defender has the ball, or if the ball is alone in an adjacent cell. The ball is cleared 3-4 columns forward into the opponent\'s half.',
      cost: [0],
      category: 'defense',
    });
  }

  play({ team, player, board }) {
    const ballCell = board.ballCell();
    const playerCell = board.getPlayerCell(player);
    if (!playerCell) {
      return { success: false, reason: 'player is not on the pitch' };
    }

    const holder = board.getBallHolder();
    if (holder) {
      if (holder.team === team.name && player !== holder) {
        return { success: false, reason: 'only the ball carrier can clear' };
      }
      if (holder.team !== team.name) {
        return { success: false, reason: 'you do not have possession' };
      }
      if (player.position !== 'DF' && player.position !== 'GK') {
        return { success: false, reason: 'only defenders and goalkeepers can clear' };
      }
    } else {
      if (player.position !== 'DF' && player.position !== 'GK') {
        return { success: false, reason: 'only defenders and goalkeepers can clear' };
      }
      const dx = ballCell.x - playerCell.x;
      const dy = ballCell.y - playerCell.y;
      const distance = Math.max(Math.abs(dx), Math.abs(dy));
      if (distance !== 1) {
        return { success: false, reason: 'player must be adjacent to the ball to clear it' };
      }
    }

    const forward = team.side === 'left' ? 1 : -1;
    const clearDist = 3 + Math.floor(Math.random() * 2);
    const targetX = Math.max(0, Math.min(board.width - 1, ballCell.x + forward * clearDist));
    const targetY = ballCell.y;

    return { success: true, player, target: { x: targetX, y: targetY } };
  }
}
