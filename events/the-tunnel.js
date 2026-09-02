class TheTunnelEvent {
  static weight = 1;

  constructor() {
    this.title = 'The Tunnel';
    this.description =
      'Walking through the tunnel before kickoff, the opposition captain slows to match your pace. "Routine win for us today," he says, just loud enough for your players to hear. A few of your squad glance at you, waiting.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    return [
      {
        label: 'Confront him — +1 to all stats next match, but a penalty card joins your deck',
        description:
          'You step between your player and the captain and let him know exactly what you think. Your squad fires up — but the confrontation draws official attention, and an aggressive playstyle creeps into your deck.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          const buff = { turns: 1 };
          for (const s of BOOSTABLE_STATS) buff[s] = 1;
          wcTeamBuffs[teamName] = buff;
          const allPenaltyCards = CARD_TYPES.filter((Ctor) => {
            if (typeof Ctor !== 'function') return false;
            try {
              return new Ctor().category === 'penalty';
            } catch {
              return false;
            }
          });
          if (allPenaltyCards.length > 0) {
            const penalty =
              new allPenaltyCards[Math.floor(Math.random() * allPenaltyCards.length)]();
            if (!wcTrainingCards) wcTrainingCards = {};
            if (!wcTrainingCards[teamName]) wcTrainingCards[teamName] = [];
            wcTrainingCards[teamName].push(penalty);
          }
        },
      },
      {
        label: 'Ignore him — +1 morale next match',
        description:
          'You keep walking without breaking stride. Your players exchange quiet glances — they\'re focused, not rattled. The opposition captain gets nothing.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { teamMoraleBoost: true, turns: 1 };
        },
      },
      {
        label: 'Laugh it off — nothing happens',
        description:
          'You chuckle and pat him on the shoulder. He looks confused. The moment passes.',
        execute: () => {},
      },
    ];
  }
}
