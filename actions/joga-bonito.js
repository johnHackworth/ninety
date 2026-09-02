class JogaBonitoAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Joga bonito',
      description:
        'Add 2 action points, a Dribbling card, a Move card, and a Feint card to your hand. Exhausted after use.',
      cost: [0],
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
    game.actionPoints[team.name] += 2;
    game.inPlay[team.name].push(new DribblingAction());
    game.inPlay[team.name].push(new MoveAction());
    game.inPlay[team.name].push(new FeintTurnAction());
    game.recordEvent({ type: 'jogaBonito', team: team.name });
    logMatch(team.name, 'Joga bonito! +2 action points, gained Dribbling, Move, and Feint cards.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
