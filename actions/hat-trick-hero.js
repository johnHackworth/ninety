class HatTrickHeroAction extends Action {
  static rarity = 3;
  constructor() {
    super({
      name: 'Hat-trick hero',
      description:
        'Only playable if your team has scored at least one goal this match. A clinical strike from the last three columns with +3 shooting.',
      cost: [0],
      category: 'offense',
      exhaust: true,
    });
  }

  play({ team, shooter, board, goalkeepingCard }) {
    return resolveShot({ team, shooter, board, goalkeepingCard, shootingBonus: 3 });
  }
}
