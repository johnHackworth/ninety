class GhostRunAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Ghost run',
      description:
        'Your ball carrier becomes unmarkable: tackle, press, marking and dirty tricks cards against them fail until the start of your next turn. Exhausts after use.',
      cost: [1],
      category: 'defense',
      exhaust: true,
    });
  }

  play({ team, board }) {
    const holder = board.getBallHolder();
    if (!holder) {
      return { success: false, reason: 'nobody has possession of the ball' };
    }
    if (holder.team !== team.name) {
      return { success: false, reason: 'the ball carrier is not yours' };
    }
    return { success: true, holder };
  }

  resolve(team) {
    const result = this.play({ team, board });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }
    game.ghostRun[team.name] = true;
    game.recordEvent({ type: 'ghostRun', team: team.name });
    logMatch(
      team.name,
      `${result.holder.name} ghosts past everyone — tackle, press and marking cards against them fail until your next turn.`,
      'goal'
    );
    humanNotice('GHOST RUN');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
