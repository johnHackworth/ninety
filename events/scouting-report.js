class ScoutingReportEvent {
  static weight = 1;

  constructor() {
    this.title = 'Scouting Report';
    this.description = 'Your analysts have compiled detailed intelligence on your next opponent. How do you use it?';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    return [
      {
        label: 'Study it deeply — +2 tactical thinking next match',
        description: 'You pore over every detail. Your tactical preparation gives your team a clear edge in the next match.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { tacticalThinking: 2, turns: 1 };
        },
      },
      {
        label: 'Share with the squad — gain a random card for your deck',
        description: 'You brief the players directly. The shared knowledge inspires a new tactical card to be added to your deck.',
        execute: () => {
          const pool = CARD_TYPES.filter((Ctor) => {
            if (typeof Ctor !== 'function') return false;
            try {
              const inst = new Ctor();
              return inst.rarity >= 1 && inst.rarity <= 2 && inst.category !== 'penalty';
            } catch { return false; }
          });
          if (pool.length > 0) {
            const card = new pool[Math.floor(Math.random() * pool.length)]();
            if (!wcTrainingCards[teamName]) wcTrainingCards[teamName] = [];
            wcTrainingCards[teamName].push(card);
          }
        },
      },
      {
        label: 'File it away — no immediate effect',
        description: 'You stash the report for later. Maybe it\'ll be useful someday, but for now it gathers dust.',
        execute: () => {},
      },
    ];
  }
}
