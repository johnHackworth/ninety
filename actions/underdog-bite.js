class UnderdogBiteAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Underdog bite',
      description:
        'Activate a permanent team effect: while your team is trailing by 2 or more goals, gain +3 action points every turn.',
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
    if (team.hasTeamEffect('underdogBite')) {
      logAlert('Underdog bite is already active.');
      renderGame();
      return;
    }
    team.addTeamEffect('underdogBite');
    game.recordEvent({ type: 'underdogBite', team: team.name });
    logMatch(team.name, 'Underdog bite! While trailing by 2 or more goals, your team gains +3 action points every turn.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
