class DesperationAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Desperation',
      description:
        'If trailing: gain +1 action point per goal behind (max +3) this turn, and all your players get +1 shooting for this turn. Exhausts after use.',
      cost: [0],
      category: 'effect',
      exhaust: true,
    });
  }

  play({ team }) {
    return { success: true, team };
  }

  resolve(team) {
    const result = this.play({ team });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }
    const opponent = board.getOpponent(team);
    const goalsBehind = Math.max(0, game.score[opponent.name] - game.score[team.name]);
    if (goalsBehind <= 0) {
      logAlert('Desperation requires trailing');
      renderGame();
      return;
    }
    const apGain = Math.min(goalsBehind, 3);
    game.actionPoints[team.name] += apGain;
    for (const p of team.currentPlayers) {
      p.addEffect('compactShape', 1);
      p.shooting = (p.shooting || 0) + 1;
    }
    game.recordEvent({ type: 'desperation', team: team.name });
    logMatch(team.name, `Desperation! +${apGain} action point(s) (${goalsBehind} goal(s) behind) and +1 shooting for all players this turn.`);
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
