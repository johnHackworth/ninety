class UnderlapAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Underlap',
      description:
        'Choose a player on the touchline (top or bottom row). The teammate directly behind them sprints two cells forward along that line.',
      cost: [1],
      category: 'offense',
    });
  }

  play({ team, player, board }) {
    const cell = board.getPlayerCell(player);
    if (!cell) {
      return { success: false, reason: 'player is not on the pitch' };
    }

    const onTopFlank = cell.y === 0;
    const onBottomFlank = cell.y === board.height - 1;
    if (!onTopFlank && !onBottomFlank) {
      return { success: false, reason: 'player must be on the touchline (top or bottom row)' };
    }

    const attackingRight = team.side === 'left';
    const forward = attackingRight ? 1 : -1;

    const behindX = cell.x - forward;
    if (behindX < 0 || behindX >= board.width) {
      return { success: false, reason: 'no teammate can be behind the player' };
    }

    const teammate = board.getPlayersAt(behindX, cell.y).find((p) => p.team === team.name && p !== player);
    if (!teammate) {
      return { success: false, reason: 'no teammate directly behind' };
    }

    const sprintTargetX = cell.x + 2 * forward;
    if (sprintTargetX < 0 || sprintTargetX >= board.width) {
      return { success: false, reason: 'no room to sprint forward' };
    }

    if (!board.canOccupy(sprintTargetX, cell.y, [teammate])) {
      return { success: false, reason: 'target cell is occupied' };
    }

    return {
      success: true,
      player,
      other: teammate,
      target: { x: sprintTargetX, y: cell.y },
      follow: false,
      marker: null,
    };
  }
}
