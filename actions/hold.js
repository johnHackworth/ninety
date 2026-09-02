class HoldAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Hold',
      description:
        'Mark another card in your hand as held: it is not discarded at the end of your turn and stays in your hand until you play it. Exhausts after use.',
      cost: [2],
      category: 'effect',
      exhaust: true,
    });
  }

  play({ team }) {
    return { success: true, team };
  }
}
