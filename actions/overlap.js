class OverlapAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Overlap',
      description:
        'On a touchline (row 0 or 6), when two of your players are on the same touchline, the one behind runs forward until it is two cells ahead of the other player.',
      cost: [1],
      category: 'offense',
    });
  }

  play({ team, player, board }) {
    const playerCell = board.getPlayerCell(player);
    if (!playerCell) {
      return { success: false, reason: 'player is not on the pitch' };
    }

    if (playerCell.y !== 0 && playerCell.y !== board.height - 1) {
      return {
        success: false,
        reason: 'the overlapping player must be on a touchline (row 0 or 6)',
      };
    }

    if (board.isCramped && board.isCramped(player)) {
      return { success: false, reason: 'that player is cramped and cannot move' };
    }

    if (player.hasEffect && player.hasEffect('injured')) {
      return { success: false, reason: 'that player is injured and cannot run' };
    }

    const forward = team.side === 'left' ? 1 : -1;

    const teammatesAhead = [];
    for (const mate of team.currentPlayers) {
      if (mate === player) continue;
      const c = board.getPlayerCell(mate);
      if (!c || c.y !== playerCell.y) continue;
      const ahead = forward === 1 ? c.x > playerCell.x : c.x < playerCell.x;
      if (ahead) teammatesAhead.push({ mate, cell: c });
    }

    if (teammatesAhead.length === 0) {
      return { success: false, reason: 'there must be a teammate ahead on the same touchline' };
    }

    teammatesAhead.sort((a, b) =>
      forward === 1 ? a.cell.x - b.cell.x : b.cell.x - a.cell.x
    );
    const { mate, cell } = teammatesAhead[0];

    const targetX = cell.x + 2 * forward;
    if (targetX < 0 || targetX >= board.width) {
      return { success: false, reason: 'there is not enough room on the touchline to overlap' };
    }

    const marker = board
      .getPlayersAt(playerCell.x, playerCell.y)
      .find((p) => p.team !== team.name) || null;
    const follow = Boolean(
      marker &&
        !(board.isCramped && board.isCramped(marker)) &&
        Action.markerFollows(marker, player, team)
    );

    if (!board.canOccupy(targetX, playerCell.y, follow ? [player, marker] : [player])) {
      return {
        success: false,
        reason: 'that move would leave two players of the same team on a single cell',
      };
    }

    return { success: true, player, other: mate, marker, follow, target: { x: targetX, y: playerCell.y } };
  }
}
