class GameManagementAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Game management',
      description:
        'If leading: all your players cannot move forward past the halfway line for 2 turns. Gain +1 action point this turn.',
      cost: [1],
      category: 'tactical',
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
    game.actionPoints[team.name] += 1;
    game.gameManagement[team.name] = 2;
    team.addTeamEffect('gameManagement');
    game.recordEvent({ type: 'gameManagement', team: team.name });
    logMatch(team.name, 'Game management! All players cannot move forward for 2 turns. +1 action point this turn.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
