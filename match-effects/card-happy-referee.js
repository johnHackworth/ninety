class CardHappyRefereeEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Card-Happy Referee',
      description:
        'The referee loves his notebook: the winner of every tackle gets a booking, and a team with two bookings skips its next turn.',
      char: '🟨',
    });
  }

  apply() {}
  revoke() {}
}
