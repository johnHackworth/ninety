class VideoSessionAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Video session',
      description:
        'Pick a card from your discard pile. At the start of your next turn, two copies of it are added to your hand. Exhausts after use.',
      cost: [1],
      category: 'effect',
      exhaust: true,
    });
  }

  play({ team }) {
    if (!team.discardedActions || team.discardedActions.length === 0) {
      return { success: false, reason: 'your discard pile is empty' };
    }
    return { success: true, team };
  }
}
