class DribblingAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Dribbling',
      description:
        'If the player with possession is marked, compare your dribbling against the marking of the defender. If your dribbling is higher, the player moves, alone, to one adjacent cell you pick.',
      cost: [1],
      category: 'offense',
    });
  }

  play({ team, player, board, target }) {
    const playerCell = board.getPlayerCell(player);
    if (!playerCell) {
      return { success: false, reason: 'player is not on the pitch' };
    }

    const holder = board.getBallHolder();
    if (holder !== player) {
      return { success: false, reason: 'only the player with possession can dribble' };
    }

    if (board.isCramped && board.isCramped(player)) {
      return { success: false, reason: 'that player is cramped and cannot move' };
    }

    const marker = board
      .getPlayersAt(playerCell.x, playerCell.y)
      .find((p) => p.team !== team.name);
    if (!marker) {
      return { success: false, reason: 'the player with possession is not marked' };
    }

    const won = player.dribbling > marker.marking;
    if (!won) {
      return { success: true, dribbled: false, marker };
    }

    const dx = Math.abs(target.x - playerCell.x);
    const dy = Math.abs(target.y - playerCell.y);
    if (Math.max(dx, dy) !== 1) {
      return { success: false, reason: 'target must be one cell away (orthogonally or diagonally)' };
    }

    if (!board.canOccupy(target.x, target.y, [player])) {
      return {
        success: false,
        reason: 'that move would leave two players of the same team on a single cell',
      };
    }

    return { success: true, dribbled: true, marker, target };
  }
}
