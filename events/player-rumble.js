class PlayerRumbleEvent {
  static weight = 1;

  constructor() {
    this.title = 'Player Rumble';
    this.description = 'One of your team players has broken the team discipline and went on a drinking spree last night.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const squad = team.squad || team.currentPlayers || [];
    if (squad.length === 0) return [];

    const player = squad[Math.floor(Math.random() * squad.length)];

    const allPenaltyCards = CARD_TYPES.filter((Ctor) => {
      if (typeof Ctor !== 'function') return false;
      try {
        const inst = new Ctor();
        return inst.category === 'penalty';
      } catch {
        return false;
      }
    });

    const penaltyCard = allPenaltyCards.length > 0
      ? new allPenaltyCards[Math.floor(Math.random() * allPenaltyCards.length)]()
      : null;

    return [
      {
        label: `${player.name} plays next match with -3 to all attributes`,
        description: `${player.name} will show up to the next match hungover. All attributes reduced by 3 for one game.`,
        execute: () => {
          if (!wcPlayerDebuffs) wcPlayerDebuffs = {};
          if (!wcPlayerDebuffs[teamName]) wcPlayerDebuffs[teamName] = {};
          wcPlayerDebuffs[teamName][player.name] = { effect: 'eventDebuff', turns: 1 };
        },
      },
      {
        label: `${player.name} suspended — replaced by ${this.findReplacement(team, player)?.name || 'a reserve'}`,
        description: `${player.name} is suspended for the next match. A reserve player takes their place.`,
        execute: () => {
          if (!wcSuspendedPlayers) wcSuspendedPlayers = {};
          if (!wcSuspendedPlayers[teamName]) wcSuspendedPlayers[teamName] = [];
          wcSuspendedPlayers[teamName].push(player.name);
        },
      },
    ];
  }

  findReplacement(team, player) {
    const subs = team.availableSubstitutes();
    return subs.find((p) => p.position === player.position) || subs[0] || null;
  }
}
