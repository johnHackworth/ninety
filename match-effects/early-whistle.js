class EarlyWhistleEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Early Whistle',
      description:
        'The referee stops play early: both teams have -1 action point each turn.',
      char: '📢',
    });
  }

  apply() {}
  revoke() {}
}
