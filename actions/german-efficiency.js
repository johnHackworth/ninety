class GermanEfficiencyAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'German efficiency',
      description:
        'Removes all effects except yellow cards on all players of both teams.',
      cost: [1],
      category: 'effect',
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
    for (const t of Object.values(TEAMS)) {
      for (const player of t.currentPlayers) {
        for (const effect of [...player.effects]) {
          if (effect.type === 'yellow') continue;
          player.removeEffect(effect.type);
        }
      }
    }
    game.recordEvent({ type: 'germanEfficiency', team: team.name });
    logMatch(team.name, 'German efficiency! All player effects cleared (yellow cards stay).');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
