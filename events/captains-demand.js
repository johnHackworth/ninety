class CaptainsDemandEvent {
  static weight = 1;

  constructor() {
    this.title = "Captain's Demand";
    this.description = 'Your captain has approached you privately. They want more playing time in a different position — or they\'ll reconsider their future at the club.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const captain = team.currentPlayers.find((p) => p.captain) || team.currentPlayers[0];
    if (!captain) return [];

    const pool = wcUnusedCoaches(teamName);

    return [
      {
        label: `Promise ${captain.name} more minutes — captain +2 all stats, others -1 next match`,
        description: `You reassure ${captain.name} with a firm commitment. They respond with a surge of confidence, but some teammates feel sidelined.`,
        execute: () => {
          if (!wcPlayerBuffs) wcPlayerBuffs = {};
          if (!wcPlayerBuffs[teamName]) wcPlayerBuffs[teamName] = {};
          wcPlayerBuffs[teamName][captain.name] = { turns: 1 };
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { teamMoralePenalty: true, turns: 1 };
        },
      },
      {
        label: `Refuse — ${captain.name} is unhappy (-2 all stats next match)`,
        description: `You stand your ground. ${captain.name} is visibly frustrated and their performance suffers as a result.`,
        execute: () => {
          if (!wcPlayerDebuffs) wcPlayerDebuffs = {};
          if (!wcPlayerDebuffs[teamName]) wcPlayerDebuffs[teamName] = {};
          wcPlayerDebuffs[teamName][captain.name] = { effect: 'captainUnhappy', turns: 1 };
        },
      },
      {
        label: `Send ${captain.name} home — lose your captain, gain a new coach`,
        description: `You've had enough. ${captain.name} is sent home immediately. The shake-up attracts a new coach to your staff.`,
        execute: () => {
          if (pool.length > 0) {
            const coach = pool[Math.floor(Math.random() * pool.length)];
            if (!wcPendingCoaches) wcPendingCoaches = {};
            wcPendingCoaches[teamName] = coach;
            if (!wcOwnedCoaches[teamName]) wcOwnedCoaches[teamName] = [];
            wcOwnedCoaches[teamName].push(coach);
          }
          if (!wcSuspendedPlayers) wcSuspendedPlayers = {};
          if (!wcSuspendedPlayers[teamName]) wcSuspendedPlayers[teamName] = [];
          wcSuspendedPlayers[teamName].push(captain.name);
        },
      },
    ];
  }
}
