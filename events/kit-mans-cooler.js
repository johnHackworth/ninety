class KitMansCoolerEvent {
  static weight = 1;

  constructor() {
    this.title = "The Kit Man's Cooler";
    this.description =
      'Your kit man slides a cooler towards you with a wink. Inside: "special" isotonic drinks, not on any approved list. "The lads will fly," he promises.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    return [
      {
        label:
          'Hand them out — +2 speed and +2 shooting next match, but 25% chance a random player is suspended',
        description:
          'The players feel invincible in the warm-up. But if the contents end up in a doping control sample, one of your squad will pay for it.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { speed: 2, shooting: 2, turns: 1 };
          if (Math.random() < 0.25) {
            const candidates = team.currentPlayers || [];
            if (candidates.length > 0) {
              const caught = candidates[Math.floor(Math.random() * candidates.length)];
              if (!wcSuspendedPlayers) wcSuspendedPlayers = {};
              if (!wcSuspendedPlayers[teamName]) wcSuspendedPlayers[teamName] = [];
              wcSuspendedPlayers[teamName].push(caught.name);
            }
          }
        },
      },
      {
        label: 'Pour them down the drain — +1 tactical thinking next match',
        description:
          'You dump the cooler while he watches. The squad trains clean and sharp, and your honest preparation shows in crisp decision-making.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { tacticalThinking: 1, turns: 1 };
        },
      },
    ];
  }
}
