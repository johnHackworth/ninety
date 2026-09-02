class MediaFrenzyEvent {
  static weight = 1;

  constructor() {
    this.title = 'Media Frenzy';
    this.description = 'A controversial moment from your last match has gone viral. The press is demanding answers. How do you handle it?';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const allPenaltyCards = CARD_TYPES.filter((Ctor) => {
      if (typeof Ctor !== 'function') return false;
      try { return new Ctor().category === 'penalty'; } catch { return false; }
    });

    const randomPenalty = () =>
      allPenaltyCards.length > 0
        ? new allPenaltyCards[Math.floor(Math.random() * allPenaltyCards.length)]()
        : null;

    return [
      {
        label: 'Apologize publicly — team morale boost, but lose tactical focus',
        description: 'You hold a sincere press conference and take responsibility. Your players feel supported by your leadership (+1 to all stats), but the media scrutiny distracts them (-2 tactical thinking next match).',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { mediaFrenzyMorale: true, tacticalThinking: -2, turns: 1 };
        },
      },
      {
        label: 'Ignore it — a penalty card creeps into your next match',
        description: 'You refuse to engage with the media circus. The story eventually dies down, but the lingering negative atmosphere creates tension in the squad.',
        execute: () => {
          const penalty = randomPenalty();
          if (penalty) {
            if (!wcPendingPenalties) wcPendingPenalties = {};
            if (!wcPendingPenalties[teamName]) wcPendingPenalties[teamName] = [];
            wcPendingPenalties[teamName].push(penalty);
          }
        },
      },
      {
        label: 'Sue the press — gain a powerful card permanently, but lose a training session',
        description: 'You take legal action against the outlets reporting the story. Your team rallies behind you and a new tactical card is added to your deck permanently, but lawyers and PR teams eat up your training time.',
        execute: () => {
          const pool = CARD_TYPES.filter((Ctor) => {
            if (typeof Ctor !== 'function') return false;
            try {
              const inst = new Ctor();
              return inst.rarity === 2 && inst.category !== 'penalty';
            } catch { return false; }
          });
          if (pool.length > 0) {
            const card = new pool[Math.floor(Math.random() * pool.length)]();
            if (!wcTrainingCards[teamName]) wcTrainingCards[teamName] = [];
            wcTrainingCards[teamName].push(card);
          }
          if (wcTrainingQueue) {
            const idx = wcTrainingQueue.findIndex((e) => e.teamName === teamName);
            if (idx >= 0) wcTrainingQueue.splice(idx, 1);
          }
        },
      },
    ];
  }
}
