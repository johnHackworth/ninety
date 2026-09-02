class FanTifoEvent {
  static weight = 1;

  constructor() {
    this.title = 'Fan Tifo';
    this.description = 'Your fans have created an incredible tifo display for the next match — a massive choreography covering the entire stand. The atmosphere will be electric.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    return [
      {
        label: 'Join the celebration — +2 to all stats next match',
        description: 'The players feed off the incredible atmosphere. Every attribute gets a boost from the wave of emotion.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { teamMoraleBoost: true, turns: 1 };
        },
      },
      {
        label: 'Stay focused — +1 tactical thinking, +1 passing',
        description: 'You acknowledge the support but keep the team grounded. The mental edge comes from staying disciplined.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { tacticalThinking: 1, passing: 1, turns: 1 };
        },
      },
      {
        label: 'Use it for marketing — lose a training session, gain a powerful card',
        description: 'You leverage the moment for sponsorship content. The exposure brings in resources that translate into a new tactical card.',
        execute: () => {
          if (wcTrainingQueue) {
            const idx = wcTrainingQueue.findIndex((e) => e.teamName === teamName);
            if (idx >= 0) wcTrainingQueue.splice(idx, 1);
          }
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
    ];
  }
}
