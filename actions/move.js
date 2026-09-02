class MoveAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Move',
      description:
        'Move one player 1 cell in any direction; a marker follows if their speed + marking beats the mover\'s speed + tactical thinking. With Last Defender the goalkeeper can move up to 2 cells.',
      cost: [0],
      category: 'tactical',
    });
  }

  play({ team, player, target, board }) {
    const playerCell = board.getPlayerCell(player);
    if (!playerCell) {
      return { success: false, reason: 'player is not on the pitch' };
    }

    if (board.isCramped && board.isCramped(player)) {
      return { success: false, reason: 'that player is cramped and cannot move' };
    }

    const dx = Math.abs(target.x - playerCell.x);
    const dy = Math.abs(target.y - playerCell.y);
    const maxRange = player.position === 'GK' && team.hasTeamEffect('lastDefender') ? 2 : 1;
    if (Math.max(dx, dy) < 1 || Math.max(dx, dy) > maxRange) {
      return { success: false, reason: `target must be between 1 and ${maxRange} cell(s) away (orthogonally or diagonally)` };
    }

    const occupants = board.getPlayersAt(playerCell.x, playerCell.y);
    const marker = occupants.find((p) => p.team !== team.name) || null;

    const isHolder = board.getBallHolder() === player;
    if (isHolder && marker) {
      const forward = team.side === 'left' ? target.x > playerCell.x : target.x < playerCell.x;
      if (forward) {
        return {
          success: false,
          reason: 'a marked player with the ball cannot move forward',
        };
      }
    }

    const follow = Boolean(
      marker &&
        !(board.isCramped && board.isCramped(marker)) &&
        Action.markerFollows(marker, player, team)
    );

    if (!board.canOccupy(target.x, target.y, follow ? [player, marker] : [player])) {
      return {
        success: false,
        reason: 'that move would leave two players of the same team on a single cell',
      };
    }

    return { success: true, player, target, marker, follow };
  }
}
