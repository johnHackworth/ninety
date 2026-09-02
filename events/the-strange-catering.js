class TheStrangeCateringEvent {
  static weight = 1;

  constructor() {
    this.title = 'The Strange Catering';
    this.description =
      'The pre-match buffet features dishes nobody can identify: a bubbling green stew, something that might still be moving, and a dessert that glows faintly. The chef insists it is "all organic".';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const starters = [...(team.currentPlayers || [])].sort(() => Math.random() - 0.5);
    const victim1 = starters[0] || null;
    const victim2 = starters[1] || null;

    return [
      {
        label: 'Feast — 50% chance of +2 to all stats next match, 50% chance of food poisoning',
        description:
          'The squad digs in with gusto. Either the exotic ingredients unlock hidden energies... or the toilets become the most popular place at the training ground.',
        execute: () => {
          if (Math.random() < 0.5) {
            if (!wcTeamBuffs) wcTeamBuffs = {};
            wcTeamBuffs[teamName] = { teamMoraleBoost: true, turns: 1 };
          } else {
            if (!wcPlayerDebuffs) wcPlayerDebuffs = {};
            if (!wcPlayerDebuffs[teamName]) wcPlayerDebuffs[teamName] = {};
            for (const v of [victim1, victim2]) {
              if (v) {
                wcPlayerDebuffs[teamName][v.name] = { effect: 'eventDebuff', turns: 1 };
              }
            }
          }
        },
      },
      {
        label: 'Stick to pasta — nothing happens',
        description:
          'Plain penne, plain tomato sauce, plain results. Nobody gets poisoned; nobody gets inspired either.',
        execute: () => {},
      },
    ];
  }
}
