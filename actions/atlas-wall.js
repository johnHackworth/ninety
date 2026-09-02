class AtlasWallAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Atlas wall',
      description:
        'For 3 turns, the whole team gains +2 tackling and +2 marking — a fortress nobody gets through.',
      cost: [2],
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
    if (team.hasTeamEffect('atlasWall')) {
      logAlert('Atlas wall is already active.');
      renderGame();
      return;
    }
    team.addTeamEffect('atlasWall');
    game.recordEvent({ type: 'atlasWall', team: team.name });
    logMatch(team.name, 'Atlas wall! The whole team gains +2 tackling and +2 marking for 3 turns.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
