class HighMobilityAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'High mobility',
      description:
        'For the rest of the match, your team gets 3 extra Move cards and all Sprints cost 0. Exhausted after use.',
      cost: [2],
      category: 'effect',
      exhaust: true,
      ephemeral: true,
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
    team.addTeamEffect('highMobility', Infinity);
    game.recordEvent({ type: 'highMobility', team: team.name });
    logMatch(team.name, 'High mobility! Three extra Move cards added; all Sprints now cost 0.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
