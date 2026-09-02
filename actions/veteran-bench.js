class VeteranBenchAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Veteran bench',
      description:
        'Experience tells: every player on your pitch gains +1 shooting for the rest of the match for every 3 cards in your exhaust pile.',
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
    const bonus = Math.floor(team.exhaustedActions.length / 3);
    if (bonus === 0) {
      logAlert('Need at least 3 cards in your exhaust pile');
      renderGame();
      return;
    }
    for (const p of team.currentPlayers) {
      p.shooting += bonus;
    }
    game.recordEvent({ type: 'veteranBench', team: team.name });
    logMatch(
      team.name,
      `Veteran bench! All players on the pitch gain +${bonus} shooting for the rest of the match (${team.exhaustedActions.length} cards exhausted).`
    );
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
