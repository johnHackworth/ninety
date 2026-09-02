class CannonballAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Cannonball!',
      description:
        'Scream! Fire a shot from any of the three last columns and the four central rows. Your shooting gets a +5 modifier.',
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
      return { success: false, reason: 'only the player in possession can shoot' };
    }
    const c = board.getPlayerCell(shooter);
    if (!c) {
      return { success: false, reason: 'shooter is not on the pitch' };
    }
    const attackingRight = team.side === 'left';
    if (attackingRight ? c.x < board.width - 3 : c.x > 2) {
      return { success: false, reason: 'shooter must be in the last three columns near the goal' };
    }
    if (c.y < 2 || c.y > board.height - 2) {
      return { success: false, reason: 'shooter must be in one of the four central rows' };
    }
    return resolveShot({ team, shooter, board, goalkeepingCard, shootingBonus: 5 });
  }
}