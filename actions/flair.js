class FlairAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Flair',
      description:
        'This turn, all Press and Marking actions against your team always fail.',
      cost: [1],
      category: 'offense',
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
    game.flair[team.name] = true;
    logMatch(
      team.name,
      'Flair! Until the end of this turn, all Press and Marking actions against the team always fail.'
    );
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
