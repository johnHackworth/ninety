class TheTrainingGroundEvent {
  static weight = 1;

  constructor() {
    this.title = 'The Training Ground';
    this.description =
      'Between matches, you stumble upon a private training facility tucked behind the stadium. The pitches are immaculate, the equipment pristine. A groundskeeper nods: "Use it if you like. Just be gone by morning."';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const injuredPlayers = (team.currentPlayers || []).filter((p) => p.injured);
    const trainingCards = (wcTrainingCards && wcTrainingCards[teamName]) || [];
    const upgradeable = trainingCards.filter(
      (card) => card.rarity === 0 || card.rarity === 1
    );

    return [
      {
        label:
          injuredPlayers.length > 0
            ? `Rest the squad — heal ${injuredPlayers.map((p) => p.name).join(', ')}`
            : 'Rest the squad — no one is injured, but the recovery session still helps (+1 to a random stat next match)',
        description:
          injuredPlayers.length > 0
            ? `You put the squad through a gentle recovery session. ${injuredPlayers.map((p) => p.name).join(', ')} shake off their knocks and return to full fitness.`
            : 'Nobody is hurt, but the extra rest still leaves the squad feeling sharp.',
        execute: () => {
          for (const p of injuredPlayers) {
            p.removeEffect('injured');
          }
          if (injuredPlayers.length === 0 && team.currentPlayers && team.currentPlayers.length > 0) {
            const randomStat = BOOSTABLE_STATS[Math.floor(Math.random() * BOOSTABLE_STATS.length)];
            if (!wcTeamBuffs) wcTeamBuffs = {};
            wcTeamBuffs[teamName] = { [randomStat]: 1, turns: 1 };
          }
        },
      },
      {
        label:
          upgradeable.length > 0
            ? 'Upgrade a card — swap a random basic card for a rare one'
            : 'Upgrade a card — nothing to upgrade, but the session still helps (+1 to a random stat next match)',
        description:
          upgradeable.length > 0
            ? 'You run the squad through advanced drills. One basic play is replaced with something far more sophisticated.'
            : 'There are no basic plays to upgrade, but the intensive session sharpens the squad anyway.',
        execute: () => {
          if (upgradeable.length > 0) {
            const victim = upgradeable[Math.floor(Math.random() * upgradeable.length)];
            const idx = wcTrainingCards[teamName].indexOf(victim);
            if (idx >= 0) wcTrainingCards[teamName].splice(idx, 1);

            const pool = CARD_TYPES.filter((Ctor) => {
              if (typeof Ctor !== 'function') return false;
              try {
                const inst = new Ctor();
                return inst.rarity === 2 && inst.category !== 'penalty';
              } catch {
                return false;
              }
            });
            if (pool.length > 0) {
              const upgraded = new pool[Math.floor(Math.random() * pool.length)]();
              wcTrainingCards[teamName].push(upgraded);
            }
          } else {
            const randomStat = BOOSTABLE_STATS[Math.floor(Math.random() * BOOSTABLE_STATS.length)];
            if (!wcTeamBuffs) wcTeamBuffs = {};
            wcTeamBuffs[teamName] = { [randomStat]: 1, turns: 1 };
          }
        },
      },
      {
        label: 'Move on — nothing happens',
        description:
          'You close the gate behind you. The facility stays empty, waiting for the next wanderer.',
        execute: () => {},
      },
    ];
  }
}
