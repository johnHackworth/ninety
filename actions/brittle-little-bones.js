class BrittleLittleBonesAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Brittle little bones',
      description:
        'For three turns, every tackle played against you always ends in a fault in your favor.',
      cost: [1],
      category: 'effect',
    });
  }

  play() {
    return { success: true };
  }
  resolve(team) {
    const result = this.play();
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }
    game.brittleBones[team.name] = Math.max(game.brittleBones[team.name] || 0, 3);
    team.addTeamEffect('brittleBones');
    game.recordEvent({ type: 'brittleLittleBones', team: team.name });
    logMatch(
      team.name,
      'Brittle little bones! For the next three turns, every tackle played against you always ends in a fault in your favor.'
    );
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
