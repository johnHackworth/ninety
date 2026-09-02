class TikiTakaAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Tiki-taka',
      description:
        'Gain 3 extra Pass cards that are free to use this turn. Exhausted after use.',
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
    for (let i = 0; i < 3; i++) {
      const pass = new PassAction({ free: true });
      game.inPlay[team.name].push(pass);
      game.markFree(pass);
    }
    game.recordEvent({ type: 'tikiTaka', team: team.name });
    logMatch(team.name, 'Tiki-taka! +3 free Pass cards added to the hand.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
