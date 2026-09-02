class ComboAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Combo!',
      description:
        'Play two more cards in a row without your opponent having a turn in between.',
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
    game.recordEvent({ type: 'combo', team: team.name });
    logMatch(team.name, 'Combo! You can play two more cards right now, before your opponent takes a turn.');
    game.comboExtraPlays[team.name] = (game.comboExtraPlays[team.name] || 0) + 2;
    const playResult = game.playAction(team, this, { noSwitch: true });
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
