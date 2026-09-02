class ExtraTimeAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Extra time',
      description:
        'Gain +5 action points this turn, but all your players get Exhausted (-2 to all attributes) for 2 turns. Exhausts after use.',
      cost: [3],
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
    game.actionPoints[team.name] += 5;
    for (const p of team.currentPlayers) {
      p.addEffect('exhausted', 2);
    }
    game.recordEvent({ type: 'extraTime', team: team.name });
    logMatch(team.name, 'Extra time! +5 action points this turn, but all players are exhausted for 2 turns.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
