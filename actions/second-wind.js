class SecondWindAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Second wind',
      description:
        'Exhaust every non-offense card in your hand and gain 1 action point for each card exhausted this way.',
      cost: [1],
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
    const hand = game.inPlay[team.name];
    const toExhaust = hand.filter((c) => c !== this && c.category !== 'offense');
    for (const card of toExhaust) {
      hand.splice(hand.indexOf(card), 1);
      team.exhaustedActions.push(card);
    }
    game.actionPoints[team.name] += toExhaust.length;
    game.recordEvent({ type: 'secondWind', team: team.name });
    logMatch(
      team.name,
      toExhaust.length > 0
        ? `Second wind! ${toExhaust.map((c) => c.name).join(', ')} exhausted for +${toExhaust.length} action point(s).`
        : 'Second wind fizzles — no non-offense cards to exhaust.'
    );
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
