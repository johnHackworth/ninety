class InjuryRiskAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Injury risk',
      description:
        'When discarded, injures a random teammate. Exhausts after use. Costs 2 action points.',
      cost: [2],
      category: 'penalty',
      exhaust: true,
    });
  }

  play() {
    return { success: true };
  }
  resolve(team) {
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    logMatch(team.name, 'Injury risk played — a teammate will be injured when the card is discarded.');
    renderGame();
  }
}
