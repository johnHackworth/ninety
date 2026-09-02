class CompactShapeAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Compact Shape',
      description:
        'For this turn, all defenders within 2 cells of each other gain +1 tackling and +1 marking. They cannot move more than 1 cell this turn.',
      cost: [1],
      category: 'effect',
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
    let affected = 0;
    for (const p of team.currentPlayers) {
      if (p.position !== 'DF') continue;
      p.addEffect('compactShape', 1);
      affected++;
    }
    game.recordEvent({ type: 'compactShape', team: team.name });
    logMatch(team.name, `Compact Shape! ${affected} defender(s) gain +1 tackling and +1 marking for this turn.`);
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
