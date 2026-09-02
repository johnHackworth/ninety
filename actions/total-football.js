class TotalFootballAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Total football',
      description:
        'For 3 turns, the whole team gains +1 dribbling, +1 shooting and +1 passing — defenders join the attack.',
      cost: [2],
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
    if (team.hasTeamEffect('totalFootball')) {
      logAlert('Total football is already active.');
      renderGame();
      return;
    }
    team.addTeamEffect('totalFootball');
    game.recordEvent({ type: 'totalFootball', team: team.name });
    logMatch(team.name, 'Total football! The whole team gains +1 dribbling, +1 shooting and +1 passing for 3 turns.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
