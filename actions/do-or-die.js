class DoOrDieAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Do or die',
      description:
        'Next turn all your players gain +4 shooting\u2026 but when that turn ends, one random star player gets injured. Exhausts after use.',
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
    game.doOrDie[team.name] = { stage: 'primed', buffed: [] };
    game.recordEvent({ type: 'doOrDie', team: team.name });
    logMatch(team.name, 'Do or die! Next turn every shot gets +4 shooting… then a star player pays the price.');
    humanNotice('DO OR DIE');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
