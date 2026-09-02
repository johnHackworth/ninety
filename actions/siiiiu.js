class SiiiiuAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Siiiiu!',
      description:
        'The player with the ball sprints two cells towards the opposition goal without the marker following, then shoots. Can only be played if the player in possession is in the last five columns.',
      cost: [2],
      category: 'offense',
    });
  }

  play({ team, player, board, target }) {
    const holder = board.getBallHolder();
    if (!holder) {
      return { success: false, reason: 'nobody has possession of the ball' };
    }
    if (holder !== player) {
      return { success: false, reason: 'only the player with the ball can play Siiiiu!' };
    }

    const playerCell = board.getPlayerCell(player);
    if (!playerCell) {
      return { success: false, reason: 'player is not on the pitch' };
    }

    if (board.isCramped && board.isCramped(player)) {
      return { success: false, reason: 'that player is cramped and cannot move' };
    }

    const attackingRight = team.side === 'left';
    const inLastFiveColumns = attackingRight
      ? playerCell.x >= board.width - 5
      : playerCell.x <= 4;
    if (!inLastFiveColumns) {
      return {
        success: false,
        reason: 'the player with the ball must be in the last five columns',
      };
    }

    const dx = Math.abs(target.x - playerCell.x);
    const dy = Math.abs(target.y - playerCell.y);
    if (Math.max(dx, dy) !== 2) {
      return { success: false, reason: 'target must be exactly two cells away' };
    }

    const forward = attackingRight ? target.x >= playerCell.x : target.x <= playerCell.x;
    if (!forward) {
      return { success: false, reason: 'the sprint must go towards the opposition goal' };
    }

    const inShootRange = attackingRight ? target.x >= board.width - 3 : target.x <= 2;
    if (!inShootRange) {
      return { success: false, reason: 'the sprint must end in shooting range' };
    }

    if (!board.canOccupy(target.x, target.y, [player])) {
      return { success: false, reason: 'target cell is occupied' };
    }

    return { success: true, player, target };
  }
}
