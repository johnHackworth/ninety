class KitUpgradeEvent {
  static weight = 1;

  constructor() {
    this.title = 'Kit Upgrade';
    this.description =
      'The kit man presents a box of brand-new boots from a sponsorship deal. "Lighter, faster — but untested on match day," he says. The players eye them nervously.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const starters = (team.currentPlayers || []).filter((p) => p.position !== 'GK');
    const riskTarget = starters.length > 0
      ? starters[Math.floor(Math.random() * starters.length)]
      : null;

    return [
      {
        label: 'Wear them — +1 speed to all players next match',
        description:
          'The squad laces up the new boots. They feel lighter on their feet — but there\'s a risk the untested design causes problems.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { speed: 1, turns: 1 };
          if (riskTarget && Math.random() < 0.2) {
            if (!wcPlayerDebuffs) wcPlayerDebuffs = {};
            if (!wcPlayerDebuffs[teamName]) wcPlayerDebuffs[teamName] = {};
            wcPlayerDebuffs[teamName][riskTarget.name] = { effect: 'eventDebuff', turns: 1 };
          }
        },
      },
      {
        label: 'Sell them — gain a random tactical card',
        description:
          'You sell the boots to a local shop and use the money to hire a tactical analyst. A new play enters your deck.',
        execute: () => {
          const pool = CARD_TYPES.filter((Ctor) => {
            if (typeof Ctor !== 'function') return false;
            try {
              const inst = new Ctor();
              return inst.rarity >= 1 && inst.rarity <= 2 && inst.category === 'tactical';
            } catch {
              return false;
            }
          });
          if (pool.length > 0) {
            const card = new pool[Math.floor(Math.random() * pool.length)]();
            if (!wcTrainingCards) wcTrainingCards = {};
            if (!wcTrainingCards[teamName]) wcTrainingCards[teamName] = [];
            wcTrainingCards[teamName].push(card);
          }
        },
      },
      {
        label: 'Keep them in the box — nothing happens',
        description:
          'You close the box and shove it under a bench. Maybe someday someone will be brave enough to try them.',
        execute: () => {},
      },
    ];
  }
}
