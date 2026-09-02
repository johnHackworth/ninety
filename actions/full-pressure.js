class FullPressureAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Full pressure',
      description:
        'Activate a permanent team effect: your team draws 4 extra cards every turn, but each turn a random player gets Exhausted (-2 to all attributes) for the rest of the match.',
      cost: [3],
      category: 'tactical',
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
    if (team.hasTeamEffect('fullPressure')) {
      logAlert('Full pressure is already active.');
      renderGame();
      return;
    }
    team.addTeamEffect('fullPressure');
    game.recordEvent({ type: 'fullPressure', team: team.name });
    logMatch(
      team.name,
      'Full pressure! Your team draws 4 extra cards every turn, but a random player is exhausted each turn for the rest of the match.'
    );
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
