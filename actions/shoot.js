function resolveShot({
  team,
  shooter,
  board,
  goalkeepingCard,
  shootingBonus = 2,
  useHeading = false,
}) {
  const holder = board.getBallHolder();
  if (!holder) {
    return { success: false, reason: 'nobody has possession of the ball' };
  }
  if (holder !== shooter) {
    return { success: false, reason: 'only the player in possession can shoot' };
  }

  const shooterCell = board.getPlayerCell(shooter);
  if (!shooterCell) {
    return { success: false, reason: 'shooter is not on the pitch' };
  }

  const attackingRight = team.side === 'left';
  const goal = {
    x: attackingRight ? board.width - 1 : 0,
    y: Math.floor(board.height / 2),
  };

  const nearGoal = attackingRight ? shooterCell.x >= board.width - 3 : shooterCell.x <= 2;
  if (!nearGoal) {
    return { success: false, reason: 'shooter must be in the last three columns near the opposition goal' };
  }

  const opponent = board.getOpponent(team);
  const goalkeeper = opponent.currentGoalkeeper;
  if (!goalkeeper) {
    return { success: false, reason: 'no goalkeeper is currently on the pitch' };
  }
  const goalkeeperCell = board.getPlayerCell(goalkeeper);

  const shotStat = useHeading ? shooter.heading : shooter.shooting;

  let shooting = shotStat + shootingBonus;

  const distance = Math.abs(shooterCell.x - goal.x) + Math.abs(shooterCell.y - goal.y);
  shooting -= distance;

  const marker =
    board.getPlayersAt(shooterCell.x, shooterCell.y).find((p) => p.team !== team.name) || null;
  const marked = Boolean(marker);
  if (marked) {
    shooting -= useHeading ? marker.heading : 2;
  }

  const penaltyAreaX = attackingRight ? [board.width - 2, board.width - 1] : [0, 1];
  const penaltyAreaY = [goal.y - 1, goal.y, goal.y + 1];

  let defenders = 0;
  let attackers = 0;
  for (const x of penaltyAreaX) {
    for (const y of penaltyAreaY) {
      for (const player of board.getPlayersAt(x, y)) {
        if (player === goalkeeper) continue;
        if (player === shooter) continue;
        if (player.team === team.name) attackers += 1;
        else defenders += 1;
      }
    }
  }
  shooting -= defenders;
  shooting += attackers;

  const defendingTeam = board.getOpponent(team);
  if (game && game.defensiveWall && game.defensiveWall[defendingTeam.name]) {
    const inPenaltyBox = attackingRight
      ? shooterCell.x >= board.width - 2
      : shooterCell.x <= 1;
    if (!inPenaltyBox) {
      shooting -= 3;
    }
  }

  let goalkeeping = goalkeeper.goalkeeping;
  const goalkeeperOffPosition =
    goalkeeperCell && (goalkeeperCell.x !== goal.x || goalkeeperCell.y !== goal.y);
  if (goalkeeperOffPosition) goalkeeping -= 5;

  if (goalkeepingCard && goalkeepingCard.goalkeeperBonus) {
    goalkeeping += goalkeepingCard.goalkeeperBonus;
  }

  const goalkeepingMargin =
    defendingTeam.hasTeamEffect && defendingTeam.hasTeamEffect('ironGlove') ? 1 : 0;
  const scored =
    shooting > goalkeeping + goalkeepingMargin && !(goalkeepingCard && goalkeepingCard.hitPost);

  return {
    success: true,
    scored,
    hitPost: Boolean(goalkeepingCard && goalkeepingCard.hitPost),
    shooter,
    goalkeeper,
    shooting,
    goalkeeping,
    baseShooting: shotStat,
    shootingCardBonus: shootingBonus,
    baseGoalkeeping: goalkeeper.goalkeeping,
    distance,
    marked,
    markedModifier: marked ? (useHeading ? marker.heading : 2) : 0,
    defenders,
    attackers,
    goalkeeperOffPosition,
    goalkeepingCard,
    useHeading,
  };
}

class ShootAction extends Action {
  static rarity = 0;

  constructor(options = {}) {
    super({
      name: 'Shoot',
      description:
        "Shoot at the opposition goal from the last three columns. Your shooting (+2 for the shoot card, minus distance, marking, and defenders in the box, plus attackers in the box) must beat the keeper's goalkeeping.",
      cost: [0],
      category: 'offense',
      exhaust: options.exhaust || false,
      ephemeral: options.ephemeral || false,
      free: options.free || false,
    });
  }

  play({ team, shooter, board, goalkeepingCard }) {
    const result = resolveShot({ team, shooter, board, goalkeepingCard, shootingBonus: 2 });
    if (
      result.success &&
      shooter &&
      team.hasTeamEffect &&
      team.hasTeamEffect('hotStreak')
    ) {
      shooter.shooting += 1;
      if (typeof logMatch === 'function') {
        logMatch(
          team.name,
          `Hot Streak: ${shooter.name} gains +1 shooting for the rest of the match (${shooter.shooting}).`
        );
      }
    }
    return result;
  }
}
