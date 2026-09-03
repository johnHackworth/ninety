class WetPitchPuddlesEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Wet Pitch Puddles',
      description:
        'Rains have left puddles across the middle third: a dribble that starts in the middle third has a 10% chance to slip and drop the ball straight to the opponent.',
      char: '💧',
    });
  }

  apply() {}
  revoke() {}
}
