class FatigueAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Fatigue',
      description:
        'When discarded, a random teammate becomes exhausted for 3 turns. Costs 1 action point.',
      cost: [1],
      category: 'penalty',
      exhaust: true,
    });
  }

  play() {
    return { success: true };
  }
  resolve(team) {
    const result = this.play({ team });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    const fatiguedPlayer = team.currentPlayers.find((p) => p.hasEffect && p.hasEffect('fatigued'));
    if (fatiguedPlayer) {
      logMatch(team.name, `Fatigue: ${fatiguedPlayer.name} is exhausted for 3 turns!`);
    } else {
      logMatch(team.name, 'Fatigue: a player is exhausted for 3 turns!');
    }
    renderGame();
  }
}
