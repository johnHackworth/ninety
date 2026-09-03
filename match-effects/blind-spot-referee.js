class BlindSpotRefereeEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Blind Spot Referee',
      description:
        'The referee has a blind spot in the far flank: when a tackle fails, there is a 50% chance the foul is never called and play just continues without a free kick.',
      char: '🧭',
    });
  }

  apply() {}
  revoke() {}
}
