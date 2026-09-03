class DogOnFieldEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Dog on the Field',
      description:
        'A stray dog bounds across the pitch: once per turn, the first live action has a 10% chance to be interrupted as the dog chases the ball — the card is used up but the team keeps possession.',
      char: '🐕',
    });
  }

  apply() {}
  revoke() {}
}
