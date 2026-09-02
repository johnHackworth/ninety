class TacklingMadnessAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Tackling madness',
      description:
        'Add three Expert tackle cards to your playable cards deck. Exhausted after use.',
      cost: [3],
      category: 'effect',
      exhaust: true,
      ephemeral: true,
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
    for (let i = 0; i < 3; i++) team.availableActions.push(new ExpertTackleAction());
    game.recordEvent({ type: 'tacklingMadness', team: team.name });
    logMatch(team.name, 'Tackling madness! Three Expert tackle cards are added to your playable deck.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
