class FanProtestEvent {
  static weight = 1;

  constructor() {
    this.title = 'Fan Protest';
    this.description = 'Fans are unhappy with your tactical approach. Banners in the stands demand a change of style.';
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
        label: 'Change playstyle — reshuffle your deck',
        description: 'You adapt to fan demands. Your deck is rebuilt from scratch: basic cards plus your team extras, then you pick additional cards to fill it out.',
        execute: () => {
          wcPendingDeckReshuffle = { teamName };
        },
      },
      {
        label: 'Hold a press conference — lose a training session',
        description: 'You address the fans directly, but the time spent means one less training session before your next match.',
        execute: () => {
          if (wcTrainingQueue) {
            const idx = wcTrainingQueue.findIndex((e) => e.teamName === teamName);
            if (idx >= 0) wcTrainingQueue.splice(idx, 1);
          }
        },
      },
      {
        label: 'Ignore them — a penalty card appears in your next match',
        description: 'You stick to your guns. The fans turn toxic, and the negative atmosphere manifests as a penalty card in your deck.',
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
