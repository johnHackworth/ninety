class TheVisionEvent {
  static weight = 1;

  constructor() {
    this.title = 'The Vision';
    this.description =
      'You dream of a tactic so perfect it hurts: every pass finding its man, every run met by the ball, the net rippling in slow motion. You wake at 4am with the whole shape burned into your mind — and a strange feeling that pursuing perfection always costs something.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    return [
      {
        label: 'Follow the dream — +3 to all stats next match, but a penalty card joins your deck permanently',
        description:
          'You drill the squad relentlessly in the vision\'s image. On the pitch they transcend themselves — but obsession leaves marks: an unhealthy habit creeps into your tactical deck for good.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          const buff = { turns: 1 };
          for (const s of BOOSTABLE_STATS) buff[s] = 3;
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
        label: 'Wake up — +1 tactical thinking next match',
        description:
          'It was just a dream. You note down what you remember over breakfast and move on with your feet on the ground.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { tacticalThinking: 1, turns: 1 };
        },
      },
    ];
  }
}
