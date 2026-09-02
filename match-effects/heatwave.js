class HeatwaveEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Heatwave',
      description:
        'A scorching heatwave: players get worn out (exhausted) after half as many cards as usual.',
      char: '🥵',
    });
  }

  apply() {}
  revoke() {}
}
