class OuchAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Ouch!',
      description:
        'When your ball carrier is marked, they dive and the referee calls a foul, showing the marker a yellow card. Exhausted after use.',
      cost: [1],
      category: 'effect',
      exhaust: true,
    });
  }

  play({ team, board }) {
    const holder = board.getBallHolder();
    if (!holder) {
      return { success: false, reason: 'nobody has possession of the ball' };
    }
    if (holder.team !== team.name) {
      return { success: false, reason: 'your team does not have possession' };
    }
    const holderCell = board.getPlayerCell(holder);
    if (!holderCell) {
      return { success: false, reason: 'the ball carrier is not on the pitch' };
    }
    const marker = board
      .getPlayersAt(holderCell.x, holderCell.y)
      .find((p) => p.team !== team.name);
    if (!marker) {
      return { success: false, reason: 'the ball carrier is not marked' };
    }
    return { success: true, holder, marker };
  }
  resolve(team) {
    const result = this.play({ team, board });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }
    const { holder, marker } = result;
    const opponent = board.getOpponent(team);
    const card = game.refereeCard(marker);
    game.recordEvent({
      type: card === 'red' ? 'red' : 'yellow',
      team: opponent.name,
      player: marker.name,
    });
    logMatch(
      team.name,
      `${holder.name} dives! Referee shows a yellow card to ${marker.name}.${card === 'red' ? ' RED CARD!' : ''}`,
      'card'
    );
    humanNotice(card === 'red' ? 'RED CARD!' : 'YELLOW CARD');
    if (card === 'red') {
      removeFromPitchAndSquad(opponent, marker);
      if (marker === opponent.currentGoalkeeper) onTeamLosesGoalkeeper(opponent, marker);
    }
    const wasPenalty = resolveFault(holder, marker);
    const playResult = game.playAction(team, this, {
      endTurn: true,
      nextTeam: team,
    });
    if (!playResult.success) logAlert(playResult.reason);
    const fouledTeam = team;
    if (wasPenalty) grantPenaltyShootCard(fouledTeam);
    else grantFreeKickCards(fouledTeam, ball);
    renderGame();
  }

}
