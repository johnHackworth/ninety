class InjuryScareEvent {
  static weight = 1;

  constructor() {
    this.title = 'Injury Scare';
    this.description = 'Two of your starters picked up knocks in the latest training session. The medical staff says they\'re doubtful for the next match.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const starters = team.currentPlayers || [];
    if (starters.length < 2) return [];

    const shuffled = [...starters].sort(() => Math.random() - 0.5);
    const injured1 = shuffled[0];
    const injured2 = shuffled[1];

    return [
      {
        label: `Risk them — ${injured1.name} and ${injured2.name} play with -2 all stats`,
        description: `Both players start but are clearly not fit. They'll struggle with reduced attributes for the entire match.`,
        execute: () => {
          if (!wcPlayerDebuffs) wcPlayerDebuffs = {};
          if (!wcPlayerDebuffs[teamName]) wcPlayerDebuffs[teamName] = {};
          wcPlayerDebuffs[teamName][injured1.name] = { effect: 'eventDebuff', turns: 1 };
          wcPlayerDebuffs[teamName][injured2.name] = { effect: 'eventDebuff', turns: 1 };
        },
      },
      {
        label: `Rest them — two bench players start instead`,
        description: `You prioritize long-term health. ${injured1.name} and ${injured2.name} sit out, and two replacements take their places.`,
        execute: () => {
          if (!wcSuspendedPlayers) wcSuspendedPlayers = {};
          if (!wcSuspendedPlayers[teamName]) wcSuspendedPlayers[teamName] = [];
          wcSuspendedPlayers[teamName].push(injured1.name);
          wcSuspendedPlayers[teamName].push(injured2.name);
        },
      },
      {
        label: `One plays, one rests — choose who`,
        description: `You split the difference. Pick which injured player takes the risk and which one sits out.`,
        execute: () => {
          if (!wcPlayerDebuffs) wcPlayerDebuffs = {};
          if (!wcPlayerDebuffs[teamName]) wcPlayerDebuffs[teamName] = {};
          wcPlayerDebuffs[teamName][injured1.name] = { effect: 'eventDebuff', turns: 1 };
          if (!wcSuspendedPlayers) wcSuspendedPlayers = {};
          if (!wcSuspendedPlayers[teamName]) wcSuspendedPlayers[teamName] = [];
          wcSuspendedPlayers[teamName].push(injured2.name);
        },
      },
    ];
  }
}
