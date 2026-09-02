class DrawFoulAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Draw foul',
      description:
        'When one of your players marks the ball carrier, the pressure forces a foul. The opponent is shown a yellow card. Exhausted after use.',
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
    if (holder.team === team.name) {
      return { success: false, reason: 'your team has possession — use Ouch instead' };
    }
    const holderCell = board.getPlayerCell(holder);
    if (!holderCell) {
      return { success: false, reason: 'the ball carrier is not on the pitch' };
    }
    const marker = board
      .getPlayersAt(holderCell.x, holderCell.y)
      .find((p) => p.team === team.name);
    if (!marker) {
      return { success: false, reason: 'you are not marking the ball carrier' };
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
    const card = game.refereeCard(holder);
    game.recordEvent({
      type: card === 'red' ? 'red' : 'yellow',
      team: holder.team,
      player: holder.name,
    });
    logMatch(
      team.name,
      `${marker.name} pressures ${holder.name} into a foul! Referee shows a yellow card to ${holder.name}.${card === 'red' ? ' RED CARD!' : ''}`,
      'card'
    );
    humanNotice(card === 'red' ? 'RED CARD!' : 'YELLOW CARD');
    const opponent = board.getOpponent(team);
    if (card === 'red') {
      removeFromPitchAndSquad(opponent, holder);
      if (holder === opponent.currentGoalkeeper) onTeamLosesGoalkeeper(opponent, holder);
    }
    const wasPenalty = resolveFault(marker, holder);
    const playResult = game.playAction(team, this, {
      endTurn: true,
      nextTeam: team,
    });
    if (!playResult.success) logAlert(playResult.reason);
    if (wasPenalty) grantPenaltyShootCard(team);
    else grantFreeKickCards(team, ball);
    renderGame();
  }

}
