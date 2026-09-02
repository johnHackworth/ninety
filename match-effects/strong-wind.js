class StrongWindEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Strong Wind',
      description:
        'A howling wind: passes made beyond 2 columns have -2 passing accuracy.',
      char: '💨',
    });
  }

  apply() {}
  revoke() {}
}
