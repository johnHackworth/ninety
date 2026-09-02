class RabonaAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Rabona',
      description:
        'Only playable when the player with the ball is in a cell adjacent to the opposition goalkeeper. An audacious strike: -2 shooting, but marking penalties are ignored.',
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
      return { success: false, reason: 'only the player in possession can attempt a rabona' };
    }

    const shooterCell = board.getPlayerCell(shooter);
    if (!shooterCell) {
      return { success: false, reason: 'shooter is not on the pitch' };
    }

    const opponent = board.getOpponent(team);
    const goalkeeper = opponent.currentGoalkeeper;
    if (!goalkeeper) {
      return { success: false, reason: 'no goalkeeper is currently on the pitch' };
    }
    const goalkeeperCell = board.getPlayerCell(goalkeeper);
    if (!goalkeeperCell) {
      return { success: false, reason: 'the goalkeeper is not on the pitch' };
    }
    const distance = Math.max(
      Math.abs(shooterCell.x - goalkeeperCell.x),
      Math.abs(shooterCell.y - goalkeeperCell.y)
    );
    if (distance !== 1) {
      return { success: false, reason: 'the shooter must be adjacent to the opposition goalkeeper' };
    }

    const attackingRight = team.side === 'left';
    const goal = {
      x: attackingRight ? board.width - 1 : 0,
      y: Math.floor(board.height / 2),
    };

    let shooting = shooter.shooting - 2;
    const distanceToGoal = Math.abs(shooterCell.x - goal.x) + Math.abs(shooterCell.y - goal.y);
    shooting -= distanceToGoal;

    const marked = board
      .getPlayersAt(shooterCell.x, shooterCell.y)
      .some((p) => p.team !== team.name);

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

    const scored = shooting > goalkeeping && !(goalkeepingCard && goalkeepingCard.hitPost);

    return {
      success: true,
      scored,
      hitPost: Boolean(goalkeepingCard && goalkeepingCard.hitPost),
      shooter,
      goalkeeper,
      shooting,
      goalkeeping,
      baseShooting: shooter.shooting,
      shootingCardBonus: -2,
      baseGoalkeeping: goalkeeper.goalkeeping,
      distance: distanceToGoal,
      marked,
      markedModifier: 0,
      defenders,
      attackers,
      goalkeeperOffPosition,
      goalkeepingCard,
    };
  }
}
