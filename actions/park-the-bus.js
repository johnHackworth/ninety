class ParkTheBusAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Park the Bus',
      description:
        'All defenders gain Cohesive defense (+2 tackling, +1 marking); defenders and midfielders gain Defense focus (cannot move past the 4th column - stragglers are pulled back).',
      cost: [2],
      category: 'defense',
      exhaust: true,
    });
  }

  play({ team }) {
    return { success: true, team };
  }
  resolve(team) {
    matchState.lastBallMove = null;
    matchState.lastDribbledPlayer = null;
    const result = this.play({ team });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }
    let defs = 0;
    let focus = 0;
    let moved = 0;
    for (const p of team.currentPlayers) {
      const defender = p.position === 'DF';
      if (defender) {
        p.addEffect('cohesiveDefense', Infinity);
        defs++;
      }
      if (defender || p.position === 'MF') {
        p.addEffect('defenseFocus', Infinity);
        focus++;
      }
      if (!p.hasEffect('defenseFocus')) continue;
      const cell = parkReposition(team, p);
      if (cell) {
        const el = tokenElForPlayer(p);
        if (el) moveTokenToCell(el, cell.x, cell.y);
        moved++;
      }
    }
    game.recordEvent({ type: 'parkTheBus', team: team.name });
    logMatch(
      team.name,
      `Park the Bus! ${defs} defender(s) gain Cohesive defense, ${focus} defender/midfielder(s) gain Defense focus. ${moved} player(s) pulled back inside the 4th column.`
    );
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
