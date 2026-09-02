class PepStyleAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Pep Style',
      description:
        'For 3 turns, all the Pass cards can move the ball 3 columns instead of 2. Exhausted after use.',
      cost: [1],
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
    if (team.hasTeamEffect('pepStyle')) {
      if (game.pepStyle[team.name] && game.pepStyle[team.name] > 3) {
        logAlert('Pep Style is already active for the entire match.');
      } else {
        logAlert('Pep Style is already active.');
      }
      renderGame();
      return;
    }
    game.pepStyle[team.name] = 3;
    team.addTeamEffect('pepStyle');
    game.recordEvent({ type: 'pepStyle', team: team.name });
    logMatch(team.name, 'Pep Style! Pass cards can move the ball 3 columns instead of 2 for 3 turns.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
