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

    const pool = wcUnusedCoaches(teamName);
    const coach = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : null;
    const promotedPenalty = randomPenalty();
    const snubPenalty = randomPenalty();

    return [
      {
        label: 'Promote them — gain a new coach, but a penalty card joins your deck permanently',
        description: coach && promotedPenalty
          ? `Your junior coach gets promoted to the first team. ${coach.name} (${coach.nationality}) joins backroom staff, but ${promotedPenalty.name} is permanently added to your deck as a consequence of reshuffling responsibilities.`
          : coach
            ? `Your junior coach gets promoted to the first team. ${coach.name} (${coach.nationality}) joins backroom staff.`
            : 'Your junior coach gets promoted to the first team.',
        gain: [coach ? `Coach: ${coach.name}` : 'Coach', promotedPenalty ? `+${promotedPenalty.name}` : 'Penalty card'].join(' · '),
        execute: () => {
          if (coach) {
            if (!wcPendingCoaches) wcPendingCoaches = {};
            wcPendingCoaches[teamName] = coach;
            if (!wcOwnedCoaches[teamName]) wcOwnedCoaches[teamName] = [];
            wcOwnedCoaches[teamName].push(coach);
          }
          if (promotedPenalty) {
            if (!wcTrainingCards[teamName]) wcTrainingCards[teamName] = [];
            wcTrainingCards[teamName].push(promotedPenalty);
          }
        },
      },
      {
        label: "Don't promote — they're unhappy. A penalty card appears just for next match",
        description: snubPenalty
          ? `You keep things as they are. The junior coach is disappointed, and morale takes a hit. ${snubPenalty.name} appears in your deck for the next match only.`
          : 'You keep things as they are. The junior coach is disappointed, and morale takes a hit. A penalty card appears in your deck for the next match only.',
        lose: snubPenalty ? `+${snubPenalty.name} (next match)` : 'Penalty card (next match)',
        execute: () => {
          if (snubPenalty) {
            if (!wcPendingPenalties) wcPendingPenalties = {};
            if (!wcPendingPenalties[teamName]) wcPendingPenalties[teamName] = [];
            wcPendingPenalties[teamName].push(snubPenalty);
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
