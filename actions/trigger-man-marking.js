class TriggerManMarkingAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Trigger man marking',
      description:
        'Activate a permanent team effect: your defenders use the higher of marking or tackling when deciding whether to follow a marked player during movement.',
      cost: [2],
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
    if (team.hasTeamEffect('triggerManMarking')) {
      logAlert('Trigger man marking is already active.');
      renderGame();
      return;
    }
    team.addTeamEffect('triggerManMarking');
    game.recordEvent({ type: 'triggerManMarking', team: team.name });
    logMatch(team.name, 'Trigger man marking! Defenders now use the higher of marking or tackling when following.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
