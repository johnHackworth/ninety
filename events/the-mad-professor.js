class TheMadProfessorEvent {
  static weight = 1;

  constructor() {
    this.title = 'The Mad Professor';
    this.description =
      'An eccentric man in a lab coat intercepts you at the training centre gate. "Give me one of your tactics," he cackles, "and I shall return it... improved." His equipment looks like it was built from goalpost scrap.';
  }

  static transformCard(teamName) {
    if (!wcTrainingCards || !wcTrainingCards[teamName]) return false;
    const candidates = wcTrainingCards[teamName].filter(
      (card) => card.category !== 'penalty'
    );
    if (candidates.length === 0) return false;

    const victim = candidates[Math.floor(Math.random() * candidates.length)];
    const sourceRarity = victim.rarity || 0;
    const targetRarity = Math.min(3, sourceRarity + 1);

    let pool = CARD_TYPES.filter((Ctor) => {
      if (typeof Ctor !== 'function') return false;
      try {
        const inst = new Ctor();
        return (
          inst.rarity === targetRarity &&
          inst.category !== 'penalty' &&
          inst.name !== victim.name
        );
      } catch {
        return false;
      }
    });
    if (pool.length === 0 && targetRarity < 3) {
      pool = CARD_TYPES.filter((Ctor) => {
        if (typeof Ctor !== 'function') return false;
        try {
          const inst = new Ctor();
          return inst.rarity === 3 && inst.category !== 'penalty';
        } catch {
          return false;
        }
      });
    }

    const idx = wcTrainingCards[teamName].indexOf(victim);
    if (idx >= 0) wcTrainingCards[teamName].splice(idx, 1);
    if (pool.length === 0) return false;
    const replacement = new pool[Math.floor(Math.random() * pool.length)]();
    wcTrainingCards[teamName].push(replacement);
    return {
      from: victim.name,
      to: replacement.name,
      transformed: [{ fromCard: victim, toCard: replacement }],
    };
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const hasCards =
      wcTrainingCards && wcTrainingCards[teamName] &&
      wcTrainingCards[teamName].some((card) => card.category !== 'penalty');

    return [
      {
        label: hasCards
          ? 'Submit a card — a random acquired card is transformed into one of higher rarity'
          : 'Submit a card — you have no acquired cards to transform',
        description: hasCards
          ? 'You hand over one of your acquired tactical cards. Sparks fly, strange noises follow — and what comes back is unlike anything you handed over.'
          : 'The Professor rummages through your folder, finds nothing worth transmuting, and throws his hands up in disgust.',
        execute: () => {
          TheMadProfessorEvent.transformCard(teamName);
        },
      },
      {
        label: 'Decline — +1 passing next match',
        description:
          'You keep your tactics away from the madman. The squad rehearses its passing patterns with renewed appreciation for sanity.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { passing: 1, turns: 1 };
        },
      },
    ];
  }
}
