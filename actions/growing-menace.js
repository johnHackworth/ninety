class GrowingMenaceAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Growing menace',
      description:
        'Activate a permanent team effect: every turn, for the rest of the match, all your forwards gain +1 shooting. Stacks.',
      cost: [3],
      category: 'effect',
      exhaust: true,
    });
  }

  play({ team }) {
    if (team.hasTeamEffect('growingMenace')) {
      return { success: false, reason: 'growing menace is already active' };
    }
    return { success: true, team };
  }

  resolve(team) {
    const result = this.play({ team });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }
    team.addTeamEffect('growingMenace');
    game.recordEvent({ type: 'growingMenace', team: team.name });
    logMatch(team.name, 'Growing menace! Every turn your forwards sharpen their aim (+1 shooting).');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
