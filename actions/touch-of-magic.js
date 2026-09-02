class TouchOfMagicAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Touch of magic',
      description:
        'If the player with possession has dribbling, speed, and shooting > 7 and the ball is in the opposition half, break free of any marking, move 1 or 2 cells, and shoot.',
      cost: [2],
      category: 'effect',
      exhaust: true,
    });
  }

  play({ team, player, board, target }) {
    const holder = board.getBallHolder();
    if (!holder) {
      return { success: false, reason: 'nobody has possession of the ball' };
    }
    if (holder !== player) {
      return { success: false, reason: 'only the player with possession can use touch of magic' };
    }

    const playerCell = board.getPlayerCell(player);
    if (!playerCell) {
      return { success: false, reason: 'player is not on the pitch' };
    }

    if (player.dribbling <= 7 || player.speed <= 7 || player.shooting <= 7) {
      return { success: false, reason: 'player needs dribbling, speed, and shooting > 7' };
    }

    const attackingRight = team.side === 'left';
    const halfX = Math.floor(board.width / 2);
    const inOppositionHalf = attackingRight ? playerCell.x >= halfX : playerCell.x < Math.ceil(board.width / 2);
    if (!inOppositionHalf) {
      return { success: false, reason: 'the ball must be in the opposition half' };
    }

    const dx = Math.abs(target.x - playerCell.x);
    const dy = Math.abs(target.y - playerCell.y);
    const dist = Math.max(dx, dy);
    if (dist < 1 || dist > 2) {
      return { success: false, reason: 'target must be 1 or 2 cells away' };
    }

    if (!board.canOccupy(target.x, target.y, [player])) {
      return { success: false, reason: 'target cell is occupied' };
    }

    return { success: true, target };
  }
}
