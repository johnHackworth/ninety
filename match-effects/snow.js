class SnowEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Snow',
      description:
        'Snow covers the pitch: all movement cards (Move, Sprint, Short Sprint, Dribbling, Feint) cost +1 action point.',
      char: '❄️',
    });
  }

  apply() {}
  revoke() {}
}
