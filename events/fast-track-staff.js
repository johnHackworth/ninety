class FastTrackStaffEvent {
  static weight = 1;

  constructor() {
    this.title = 'Fast-track Staff';
    this.description = 'One of your junior coaches is showing potential. You could promote them, but you would miss them in their current position.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const allPenaltyCards = CARD_TYPES.filter((Ctor) => {
      if (typeof Ctor !== 'function') return false;
      try {
        const inst = new Ctor();
        return inst.category === 'penalty';
      } catch {
        return false;
      }
    });

    const randomPenalty = () =>
      allPenaltyCards.length > 0
        ? new allPenaltyCards[Math.floor(Math.random() * allPenaltyCards.length)]()
        : null;

    return [
      {
        label: 'Promote them — gain a new coach, but a penalty card joins your deck permanently',
        description: 'Your junior coach gets promoted to the first team. A penalty card is permanently added to your deck as a consequence of reshuffling responsibilities.',
        execute: () => {
          const pool = wcUnusedCoaches(teamName);
          if (pool.length > 0) {
            const coach = pool[Math.floor(Math.random() * pool.length)];
            if (!wcPendingCoaches) wcPendingCoaches = {};
            wcPendingCoaches[teamName] = coach;
            if (!wcOwnedCoaches[teamName]) wcOwnedCoaches[teamName] = [];
            wcOwnedCoaches[teamName].push(coach);
          }
          const penalty = randomPenalty();
          if (penalty) {
            if (!wcTrainingCards[teamName]) wcTrainingCards[teamName] = [];
            wcTrainingCards[teamName].push(penalty);
          }
        },
      },
      {
        label: "Don't promote — they're unhappy. A penalty card appears just for next match",
        description: 'You keep things as they are. The junior coach is disappointed, and morale takes a hit. A penalty card appears in your deck for the next match only.',
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
        label: 'Replace them with different staff — draw one less card per turn next game',
        description: 'You bring in a replacement, but the transition period disrupts your team. You will draw one fewer card per turn in the next match.',
        execute: () => {
          if (!wcTeamDebuffs) wcTeamDebuffs = {};
          wcTeamDebuffs[teamName] = { drawPenalty: 1, turns: 1 };
        },
      },
    ];
  }
}
