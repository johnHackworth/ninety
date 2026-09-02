class NoPainNoGainAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'No pain, no gain',
      description:
        'Activate a permanent team effect: every time one of your players receives a yellow or red card this match, the whole squad gains +1 tackling.',
      cost: [1],
      category: 'effect',
      exhaust: true,
    });
  }

  play({ team }) {
    if (team.hasTeamEffect('noPainNoGain')) {
      return { success: false, reason: 'no pain, no gain is already active' };
    }
    return { success: true, team };
  }

  resolve(team) {
    const result = this.play({ team });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }
    team.addTeamEffect('noPainNoGain');
    game.recordEvent({ type: 'noPainNoGain', team: team.name });
    logMatch(team.name, 'No pain, no gain! Every card your players receive toughens the squad (+1 tackling).');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
