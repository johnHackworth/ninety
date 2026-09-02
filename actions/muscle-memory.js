class MuscleMemoryAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Muscle memory',
      description:
        'Until the end of the turn, your Pass, Long pass, Through ball, One-two and Switch play cards cannot be intercepted. Exhausted after use.',
      cost: [1],
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
    game.muscleMemory[team.name] = true;
    game.recordEvent({ type: 'muscleMemory', team: team.name });
    logMatch(team.name, 'Muscle memory! Passes cannot be intercepted until the end of the turn.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
