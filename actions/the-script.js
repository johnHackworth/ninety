class TheScriptAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'The script',
      description:
        'Search your deck for any card and add it to your hand. Exhausts after use.',
      cost: [1],
      category: 'tactical',
      exhaust: true,
    });
  }

  play({ team }) {
    if (!team.availableActions || team.availableActions.length === 0) {
      return { success: false, reason: 'your deck is empty' };
    }
    return { success: true, team };
  }
}
