class StrictRefereeEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Strict Referee',
      description:
        'The referee is card-happy: every tackle has a 50% chance to end in a foul.',
      char: '👮',
    });
  }

  apply() {}
  revoke() {}
}
