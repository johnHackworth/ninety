class LateWhistleEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Late Whistle',
      description:
        'The referee lets stoppage time run long: both teams have +1 action point each turn.',
      char: '⏱️',
    });
  }

  apply() {}
  revoke() {}
}
