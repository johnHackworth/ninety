class ComingHomeAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Coming home',
      description:
        'Activate a permanent team effect: while your team is trailing, gain +2 action points every turn.',
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
    if (team.hasTeamEffect('comingHome')) {
      logAlert('Coming home is already active.');
      renderGame();
      return;
    }
    team.addTeamEffect('comingHome');
    game.recordEvent({ type: 'comingHome', team: team.name });
    logMatch(team.name, 'Coming home! While trailing, your team gains +2 action points every turn.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
