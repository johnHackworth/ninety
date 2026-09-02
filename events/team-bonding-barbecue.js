class TeamBondingBarbecueEvent {
  static weight = 1;

  constructor() {
    this.title = 'Team Bonding Barbecue';
    this.description =
      'The squad has gathered for a barbecue. Someone suggests a ritual: throw your bad memories — and anything else — onto the flames.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const trainingCards = (wcTrainingCards && wcTrainingCards[teamName]) || [];
    const permanentPenalties = trainingCards.filter((card) => card.category === 'penalty');
    const permanentGoodCards = trainingCards.filter((card) => card.category !== 'penalty');

    const randomStat = BOOSTABLE_STATS[Math.floor(Math.random() * BOOSTABLE_STATS.length)];

    return [
      {
        label:
          'Burn the bad memories — remove permanently-added penalty cards from your deck, +1 to a random stat next match',
        description:
          permanentPenalties.length > 0
            ? `You watch the junk burn: ${permanentPenalties.map((c) => c.name).join(', ')} leave your deck forever. The squad feels lighter.`
            : 'There are no bad memories to burn — the fire crackles harmlessly, but the good vibes still give the squad a small lift.',
        execute: () => {
          if (wcTrainingCards && wcTrainingCards[teamName]) {
            wcTrainingCards[teamName] = wcTrainingCards[teamName].filter(
              (card) => card.category !== 'penalty'
            );
          }
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { [randomStat]: 1, turns: 1 };
        },
      },
      {
        label:
          'Burn the tactical notes — lose a random acquired card from your deck, +2 to all stats next match',
        description:
          permanentGoodCards.length > 0
            ? `You sacrifice ${permanentGoodCards[Math.floor(Math.random() * permanentGoodCards.length)].name} to the flames. Free from overthinking, the players play from the heart.`
            : 'You have no spare tactical notes to burn, but the gesture still fires up the squad.',
        execute: () => {
          if (wcTrainingCards && wcTrainingCards[teamName]) {
            const goodCards = wcTrainingCards[teamName].filter(
              (card) => card.category !== 'penalty'
            );
            if (goodCards.length > 0) {
              const victim = goodCards[Math.floor(Math.random() * goodCards.length)];
              const idx = wcTrainingCards[teamName].indexOf(victim);
              if (idx >= 0) wcTrainingCards[teamName].splice(idx, 1);
            }
          }
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { teamMoraleBoost: true, turns: 1 };
        },
      },
      {
        label: 'Just enjoy the food — nothing happens',
        description:
          'You keep the cards in the deck and the notes in the folder. The sausages are excellent anyway.',
        execute: () => {},
      },
    ];
  }
}
