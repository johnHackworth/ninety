class TheCardMerchantEvent {
  static weight = 1;

  constructor() {
    this.title = 'The Card Merchant';
    this.description =
      'A sharp-suited man has set up a van behind the training ground. Inside: "certified tactical dossiers" from leagues far and wide. He only accepts payment in training time.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const loseSessions = (count) => {
      for (let i = 0; i < count; i++) {
        if (!wcTrainingQueue) break;
        const idx = wcTrainingQueue.findIndex((e) => e.teamName === teamName);
        if (idx >= 0) wcTrainingQueue.splice(idx, 1);
      }
    };

    const gainRareCard = () => {
      const pool = CARD_TYPES.filter((Ctor) => {
        if (typeof Ctor !== 'function') return false;
        try {
          const inst = new Ctor();
          return inst.rarity === 2 && inst.category !== 'penalty';
        } catch {
          return false;
        }
      });
      if (pool.length === 0) return null;
      const card = new pool[Math.floor(Math.random() * pool.length)]();
      if (!wcTrainingCards) wcTrainingCards = {};
      if (!wcTrainingCards[teamName]) wcTrainingCards[teamName] = [];
      wcTrainingCards[teamName].push(card);
      return card;
    };

    return [
      {
        label: 'Buy one dossier — lose 1 training session, gain a rare card',
        description:
          'You hand over a morning of tactical preparation. In exchange, a sleek dossier reveals a powerful new play your squad can absorb instantly.',
        execute: () => {
          loseSessions(1);
          gainRareCard();
        },
      },
      {
        label: 'Buy the whole briefcase — lose 3 training sessions, gain 3 rare cards',
        description:
          'You empty his van of every dossier. Three powerful plays at once — but three mornings of preparation are gone, and the squad will enter the next match undertrained.',
        execute: () => {
          loseSessions(3);
          gainRareCard();
          gainRareCard();
          gainRareCard();
        },
      },
      {
        label: 'Walk away — nothing happens',
        description:
          'Nobody trusts a man selling tactics out of a van. You drive off before he can finish his sales pitch.',
        execute: () => {},
      },
    ];
  }
}
