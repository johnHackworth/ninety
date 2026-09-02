class TheBenefactorEvent {
  static weight = 1;

  static ELITE_EFFECTS = [
    'sonicSurge',
    'shadowLock',
    'steelTackle',
    'thunderstrike',
    'metronome',
    'silkTouch',
    'grandmasterEye',
    'aerialDominion',
    'relentlessMomentum',
    'clinicalFinish',
    'counterPress',
  ];

  constructor() {
    this.title = 'The Benefactor';
    this.description =
      'A mysterious wealthy fan has offered to fund your club with bottomless generosity. "No strings attached," he smiles. His eyes say otherwise.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    return [
      {
        label: "Take the money — gain an elite coach, but a penalty card haunts your deck every match",
        description:
          'The funds arrive instantly and a world-class coach follows. But strange "sponsorship obligations" keep creeping into your match plans: a random penalty card is added to your deck before every match, for the rest of the tournament.',
        execute: () => {
          const pool = wcUnusedCoaches(teamName);
          if (pool.length > 0) {
            const elite = pool.filter((c) =>
              c.effects.some((e) => TheBenefactorEvent.ELITE_EFFECTS.includes(e))
            );
            const candidates = elite.length > 0 ? elite : pool;
            const coach = candidates[Math.floor(Math.random() * candidates.length)];
            if (!wcPendingCoaches) wcPendingCoaches = {};
            wcPendingCoaches[teamName] = coach;
            if (!wcOwnedCoaches) wcOwnedCoaches = {};
            if (!wcOwnedCoaches[teamName]) wcOwnedCoaches[teamName] = [];
            wcOwnedCoaches[teamName].push(coach);
          }
          if (!wcRecurringPenalties) wcRecurringPenalties = {};
          wcRecurringPenalties[teamName] = (wcRecurringPenalties[teamName] || 0) + 1;
        },
      },
      {
        label: 'Decline politely — +1 to all stats next match',
        description:
          'You thank him and close the door. Something about the deal felt wrong, and your players respect the integrity. They play with extra heart in the next match.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          const buff = { turns: 1 };
          for (const s of BOOSTABLE_STATS) buff[s] = 1;
          wcTeamBuffs[teamName] = buff;
        },
      },
    ];
  }
}
