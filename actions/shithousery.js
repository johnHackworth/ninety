class ShithouseryAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Shithousery',
      description:
        'Force the opponent to discard 1 card of your choice from their hand. Exhausts after use.',
      cost: [0],
      category: 'effect',
      exhaust: true,
    });
  }

  play({ team }) {
    return { success: true, team };
  }
}
