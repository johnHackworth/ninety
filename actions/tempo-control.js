class TempoControlAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Tempo control',
      description:
        'For 2 turns: your team draws 1 extra card each turn. Opponent\'s Intensity cards cost +1 extra action point. Exhausts after use.',
      cost: [0],
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
    game.tempoControl[team.name] = 2;
    team.addTeamEffect('tempoControl');
    const opponent = board.getOpponent(team);
    if (opponent) {
      game.tempoControlIntensityCost[opponent.name] = (game.tempoControlIntensityCost[opponent.name] || 0) + 1;
    }
    game.recordEvent({ type: 'tempoControl', team: team.name });
    logMatch(team.name, 'Tempo control! Draw +1 card per turn for 2 turns. Opponent\'s Intensity cards cost +1 extra.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
