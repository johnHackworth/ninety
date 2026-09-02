class FortressMentalityAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Fortress mentality',
      description:
        'For the next 2 turns, your players\u2019 defensive effects (cohesive defense, defense focus, compact shape and similar) do not expire.',
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
    game.fortressMentality[team.name] = 2;
    game.recordEvent({ type: 'fortressMentality', team: team.name });
    logMatch(team.name, 'Fortress mentality! Defensive effects hold for 2 turns.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
