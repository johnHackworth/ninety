class GambitAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Gambit',
      description:
        'Gain 3 action points immediately, but draw 3 fewer cards at the start of your next turn.',
      cost: [0],
      category: 'effect',
    });
  }

  play() {
    return { success: true };
  }

  resolve(team) {
    const result = this.play();
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }

    game.actionPoints[team.name] = (game.actionPoints[team.name] || 0) + 3;
    game.pendingDrawPenalty[team.name] = (game.pendingDrawPenalty[team.name] || 0) + 3;
    game.recordEvent({ type: 'gambit', team: team.name });
    logMatch(team.name, 'Gambit! +3 action points now, but 3 fewer cards next turn.');

    const playResult = game.playAction(team, this, { noSwitch: true });
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}