class SunInTheirEyesAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Sun in their eyes',
      description:
        'The opposite goalkeeper is blinded for a turn, reducing their goalkeeping by 4. Exhausted after use.',
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
    const opponent = board.getOpponent(team);
    const keeper = opponent.currentGoalkeeper;
    if (keeper) keeper.addEffect('blinded', 1);
    game.recordEvent({ type: 'sunInTheirEyes', team: team.name, player: keeper ? keeper.name : null });
    logMatch(team.name, `Sun in their eyes! ${keeper ? keeper.name + ' is' : 'Opponent keeper'} blinded for a turn (-4 goalkeeping).`);
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
