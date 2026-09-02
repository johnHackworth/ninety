class ArgentoPrideAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Argento pride',
      description:
        'Activate a permanent team effect: if the team is losing, add +1 action point every turn for every goal behind in the score.',
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
    if (team.hasTeamEffect('argentoPride')) {
      logAlert('Argento pride is already active.');
      renderGame();
      return;
    }
    team.addTeamEffect('argentoPride');
    game.recordEvent({ type: 'argentoPride', team: team.name });
    logMatch(
      team.name,
      'Argento pride! While losing, your team gains +1 action point per turn for every goal behind.'
    );
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
