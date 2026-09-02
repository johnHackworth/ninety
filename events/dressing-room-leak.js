class DressingRoomLeakEvent {
  static weight = 1;

  constructor() {
    this.title = 'Dressing Room Leak';
    this.description = 'Your tactical plans for the next match have been leaked to the press. The opponent now knows your intended formation and key plays.';
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
        label: 'Change everything — reshuffle your deck',
        description: 'You scrap the leaked plans and rebuild from scratch. Your opponent\'s intelligence becomes useless, but you lose your rhythm.',
        execute: () => {
          wcPendingDeckReshuffle = { teamName };
        },
      },
      {
        label: 'Double bluff — gain +2 tactical thinking, but get a penalty card',
        description: 'You intentionally leaked false information. Your tactical preparation gives you an edge, but the paranoia in the dressing room creates tension.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { tacticalThinking: 2, turns: 1 };
          const penalty = randomPenalty();
          if (penalty) {
            if (!wcPendingPenalties) wcPendingPenalties = {};
            if (!wcPendingPenalties[teamName]) wcPendingPenalties[teamName] = [];
            wcPendingPenalties[teamName].push(penalty);
          }
        },
      },
      {
        label: 'Ignore it — a penalty card creeps into your deck',
        description: 'You carry on as planned. The leaked tactics create doubt and tension in the squad, manifesting as a penalty card.',
        execute: () => {
          const penalty = randomPenalty();
          if (penalty) {
            if (!wcPendingPenalties) wcPendingPenalties = {};
            if (!wcPendingPenalties[teamName]) wcPendingPenalties[teamName] = [];
            wcPendingPenalties[teamName].push(penalty);
          }
        },
      },
    ];
  }
}
