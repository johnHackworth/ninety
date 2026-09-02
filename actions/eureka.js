class EurekaAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Eureka',
      description:
        'Add a random effect card to your hand.',
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
    const card = randomEffectCard();
    game.inPlay[team.name].push(card);
    game.recordEvent({ type: 'eureka', team: team.name, card: card.name });
    logMatch(team.name, `Eureka! Got ${card.name}.`);
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
