class BigMatchMentalityAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Big match mentality',
      description:
        'Permanent: in knockout matches, all your players gain +1 to all attributes. Exhausts after use.',
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
    const isKnockout = (typeof worldCup !== 'undefined' && worldCup && worldCup.phase === 'knockout') ||
      (typeof tournament !== 'undefined' && tournament);
    if (!isKnockout) {
      logAlert('Big match mentality only works in knockout matches');
      renderGame();
      return;
    }
    for (const p of team.currentPlayers) {
      p.addEffect('compactShape', Infinity);
      for (const stat of ['speed', 'marking', 'tackling', 'shooting', 'passing', 'dribbling', 'tacticalThinking', 'heading', 'goalkeeping']) {
        p[stat] = (p[stat] || 0) + 1;
      }
    }
    game.recordEvent({ type: 'bigMatchMentality', team: team.name });
    logMatch(team.name, 'Big match mentality! All players gain +1 to all attributes for the rest of the match.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
