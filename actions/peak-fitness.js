class PeakFitnessAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Peak fitness',
      description:
        'Every player currently on the pitch gains +1 to all attributes for the rest of the match. Exhausts after use.',
      cost: [3],
      category: 'effect',
      exhaust: true,
    });
  }

  play({ team }) {
    if (team.currentPlayers.length === 0) {
      return { success: false, reason: 'no players on the pitch' };
    }
    return { success: true, team };
  }

  resolve(team) {
    const result = this.play({ team });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }
    for (const p of team.currentPlayers) {
      for (const attr of BOOSTABLE_STATS) p[attr] += 1;
    }
    game.recordEvent({ type: 'peakFitness', team: team.name });
    logMatch(team.name, 'Peak fitness! Everyone on the pitch gains +1 to all attributes for the rest of the match.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
