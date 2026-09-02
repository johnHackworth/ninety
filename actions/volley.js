class VolleyAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Volley',
      description:
        'Strike the ball on the volley near the opposition goal. +3 bonus if the shooter is unmarked, -2 penalty if marked. Can only be played from the last three columns of the opposition side.',
      cost: [2],
      category: 'offense',
    });
  }

  play({ team, shooter, board, goalkeepingCard }) {
    const holder = board.getBallHolder();
    if (!holder) {
      return { success: false, reason: 'nobody has possession of the ball' };
    }
    if (holder !== shooter) {
      return { success: false, reason: 'only the player in possession can volley' };
    }

    const cell = board.getPlayerCell(shooter);
    if (!cell) {
      return { success: false, reason: 'shooter is not on the pitch' };
    }

    const attackingRight = team.side === 'left';
    const inFinalThird = attackingRight
      ? cell.x >= board.width - 3
      : cell.x <= 2;
    if (!inFinalThird) {
      return { success: false, reason: 'can only volley from the last three columns of the opposition side' };
    }

    const marked = board.getPlayersAt(cell.x, cell.y).some((p) => p.team !== team.name);
    const shootingBonus = marked ? -2 : 3;

    return resolveShot({ team, shooter, board, goalkeepingCard, shootingBonus });
  }
}
