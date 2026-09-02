class LongShotAction extends Action {
  static rarity = 1;
  constructor(options = {}) {
    super({
      name: 'Long shot',
      description:
        'Shooter needs shooting 7+. From your 5th or 6th column, three central rows. Shooting faces goalkeeping directly - no distance, box or positioning modifiers - but -3 if marked.',
      cost: [1],
      category: 'offense',
      exhaust: options.exhaust || false,
      ephemeral: options.ephemeral || false,
      free: options.free || false,
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
    if (shooter.shooting < 7) {
      return { success: false, reason: 'the shooter needs a shooting attribute of at least 7' };
    }

    const shooterCell = board.getPlayerCell(shooter);
    if (!shooterCell) {
      return { success: false, reason: 'shooter is not on the pitch' };
    }

    const fifthColumn = team.side === 'left' ? 4 : 3;
    const inColumn = shooterCell.x >= fifthColumn && shooterCell.x <= fifthColumn + 1;
    const inCentralRows = shooterCell.y >= 2 && shooterCell.y <= 4;
    if (!inColumn || !inCentralRows) {
      return {
        success: false,
        reason: 'the shooter must be in the 5th or 6th column of your half and in the three central rows',
      };
    }

    const opponent = board.getOpponent(team);
    const goalkeeper = opponent.currentGoalkeeper;
    if (!goalkeeper) {
      return { success: false, reason: 'no goalkeeper is currently on the pitch' };
    }

    const marked = board
      .getPlayersAt(shooterCell.x, shooterCell.y)
      .some((p) => p.team !== team.name);
    let shooting = shooter.shooting;
    if (marked) shooting -= 3;

    let goalkeeping = goalkeeper.goalkeeping;
    if (goalkeepingCard && goalkeepingCard.goalkeeperBonus) {
      goalkeeping += goalkeepingCard.goalkeeperBonus;
    }

    const ironGloveMargin =
      opponent.hasTeamEffect && opponent.hasTeamEffect('ironGlove') ? 1 : 0;
    const scored =
      shooting > goalkeeping + ironGloveMargin && !(goalkeepingCard && goalkeepingCard.hitPost);

    const result = {
      success: true,
      scored,
      hitPost: Boolean(goalkeepingCard && goalkeepingCard.hitPost),
      shooter,
      goalkeeper,
      shooting,
      goalkeeping,
      baseShooting: shooter.shooting,
      shootingCardBonus: 0,
      baseGoalkeeping: goalkeeper.goalkeeping,
      distance: 0,
      marked,
      markedModifier: 3,
      defenders: 0,
      attackers: 0,
      goalkeeperOffPosition: false,
      goalkeepingCard,
    };
    if (
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
