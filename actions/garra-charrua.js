class GarraCharruaAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Garra charrúa',
      description:
        'For 3 turns, the whole team gains +2 tackling and +1 speed — relentless Uruguayan grit.',
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
    if (team.hasTeamEffect('garraCharrua')) {
      logAlert('Garra charrúa is already active.');
      renderGame();
      return;
    }
    team.addTeamEffect('garraCharrua');
    game.recordEvent({ type: 'garraCharrua', team: team.name });
    logMatch(team.name, 'Garra charrúa! The whole team gains +2 tackling and +1 speed for 3 turns.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
