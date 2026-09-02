class InspirationAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Inspiration',
      description:
        'This turn, all the attributes of all the players of your team get a +2 for all actions.',
      cost: [0],
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
    for (const player of team.currentPlayers) player.addEffect('inspired', 1);
    game.recordEvent({ type: 'inspiration', team: team.name });
    logMatch(team.name, 'Inspiration! All players get +2 to every attribute this turn.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
