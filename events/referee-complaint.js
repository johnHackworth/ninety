class RefereeComplaintEvent {
  static weight = 1;

  constructor() {
    this.title = 'Referee Complaint';
    this.description = 'Your federation has filed a formal complaint about biased refereeing in your last match. The football world is watching how you handle this.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const squad = team.squad || team.currentPlayers || [];
    const starPlayers = squad.filter((p) => p.isStar);
    const randomStar = starPlayers.length > 0
      ? starPlayers[Math.floor(Math.random() * starPlayers.length)]
      : squad[Math.floor(Math.random() * squad.length)];

    return [
      {
        label: 'Back the federation — lose a training session, but referee is lenient next match',
        description: 'You publicly support the complaint. It costs you preparation time, but referees will be more sympathetic in your next match.',
        execute: () => {
          if (wcTrainingQueue) {
            const idx = wcTrainingQueue.findIndex((e) => e.teamName === teamName);
            if (idx >= 0) wcTrainingQueue.splice(idx, 1);
          }
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { tackling: 1, marking: 1, turns: 1 };
        },
      },
      {
        label: `Distance yourself — ${randomStar?.name || 'a player'} loses morale`,
        description: 'You publicly dissociate from the complaint to stay neutral. The players feel unsupported by your lack of backing.',
        execute: () => {
          if (randomStar) {
            if (!wcPlayerDebuffs) wcPlayerDebuffs = {};
            if (!wcPlayerDebuffs[teamName]) wcPlayerDebuffs[teamName] = {};
            wcPlayerDebuffs[teamName][randomStar.name] = { effect: 'captainUnhappy', turns: 1 };
          }
        },
      },
      {
        label: 'Request referee change — risk a penalty card if it fails',
        description: 'You demand a different referee for the next match. It\'s a bold move that could backfire.',
        execute: () => {
          if (Math.random() < 0.5) {
            if (!wcTeamBuffs) wcTeamBuffs = {};
            wcTeamBuffs[teamName] = { tacticalThinking: 1, turns: 1 };
          } else {
            const allPenaltyCards = CARD_TYPES.filter((Ctor) => {
              if (typeof Ctor !== 'function') return false;
              try { return new Ctor().category === 'penalty'; } catch { return false; }
            });
            if (allPenaltyCards.length > 0) {
              const penalty = new allPenaltyCards[Math.floor(Math.random() * allPenaltyCards.length)]();
              if (!wcPendingPenalties) wcPendingPenalties = {};
              if (!wcPendingPenalties[teamName]) wcPendingPenalties[teamName] = [];
              wcPendingPenalties[teamName].push(penalty);
            }
          }
        },
      },
    ];
  }
}
