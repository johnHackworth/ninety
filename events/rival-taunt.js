class RivalTauntEvent {
  static weight = 1;

  constructor() {
    this.title = 'Rival Taunt';
    this.description = 'The opposing coach has been trash-talking you in the press. "They don\'t have what it takes," they said.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const pool = wcUnusedCoaches(teamName);

    return [
      {
        label: 'Fire back — gain +2 shooting and +2 tackling for next match',
        description: 'You hit back in the press. Your team is fired up and ready to prove a point. Temporary stat boost for the next match.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { shooting: 2, tackling: 2, turns: 1 };
        },
      },
      {
        label: 'Stay professional — gain a new coach',
        description: 'You rise above the noise with class and dignity. Your measured approach attracts the attention of a quality coach.',
        execute: () => {
          if (pool.length > 0) {
            const coach = pool[Math.floor(Math.random() * pool.length)];
            if (!wcPendingCoaches) wcPendingCoaches = {};
            wcPendingCoaches[teamName] = coach;
            if (!wcOwnedCoaches[teamName]) wcOwnedCoaches[teamName] = [];
            wcOwnedCoaches[teamName].push(coach);
          }
        },
      },
      {
        label: 'Let it slide — lose team morale (penalty card next match)',
        description: 'You say nothing, but your players feel the disrespect. Morale drops and a penalty card creeps into your deck.',
        execute: () => {
          const allPenaltyCards = CARD_TYPES.filter((Ctor) => {
            if (typeof Ctor !== 'function') return false;
            try { return new Ctor().category === 'penalty'; } catch { return false; }
          });
          const penalty = allPenaltyCards.length > 0
            ? new allPenaltyCards[Math.floor(Math.random() * allPenaltyCards.length)]()
            : null;
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
