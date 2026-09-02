class ThePunditsSkullEvent {
  static weight = 1;

  constructor() {
    this.title = "The Pundit's Skull";
    this.description =
      'A legendary former referee, now retired and mysterious, invites you to a dim back room. "I know every trick of the trade," he rasps. "For the right price, I\'ll tell you exactly what your next opponent is planning. My price? Your players\' condition. Nobody knows why."';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const starters = team.currentPlayers || [];
    const victim = starters.length > 0
      ? starters[Math.floor(Math.random() * starters.length)]
      : null;

    return [
      {
        label: victim
          ? `Pay the price — ${victim.name} plays hungover next match, but you gain +2 tactical thinking`
          : 'Pay the price — gain +2 tactical thinking next match',
        description: victim
          ? `The price is paid in a long night of "negotiations". ${victim.name} stumbles into the next match worse for wear — but you know the opponent's exact starting XI, their formation, even their throw-in routines.`
          : 'The price is paid in a long night of "negotiations" — but with no squad to speak of, only you suffer. At least you know everything about the opponent now.',
        execute: () => {
          if (victim) {
            if (!wcPlayerDebuffs) wcPlayerDebuffs = {};
            if (!wcPlayerDebuffs[teamName]) wcPlayerDebuffs[teamName] = {};
            wcPlayerDebuffs[teamName][victim.name] = { effect: 'eventDebuff', turns: 1 };
          }
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { tacticalThinking: 2, turns: 1 };
        },
      },
      {
        label: 'Refuse the deal — nothing happens',
        description:
          'You leave the back room without a word. Some knowledge is not worth the hangover.',
        execute: () => {},
      },
    ];
  }
}
