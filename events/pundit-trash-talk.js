class PunditTrashTalkEvent {
  static weight = 1;

  constructor() {
    this.title = 'Pundit Trash Talk';
    this.description = 'A famous television pundit has publicly predicted your team will lose your next match. "They simply don\'t have the quality," they said on live TV.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const squad = team.squad || team.currentPlayers || [];
    const starPlayers = squad.filter((p) => p.isStar);
    const targetPlayer = starPlayers.length > 0
      ? starPlayers[Math.floor(Math.random() * starPlayers.length)]
      : squad[Math.floor(Math.random() * squad.length)];

    return [
      {
        label: 'Use as motivation — +2 shooting, +2 tackling next match',
        description: 'You play the clip in the dressing room. The team is fired up and ready to prove the pundit wrong.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { shooting: 2, tackling: 2, turns: 1 };
        },
      },
      {
        label: 'Ignore it — no effect',
        description: 'You refuse to give the pundit any attention. It\'s just noise.',
        execute: () => {},
      },
      {
        label: `Player responds — ${targetPlayer?.name || 'star player'} gets +3 to best stat, -1 all others`,
        description: `${targetPlayer?.name || 'Your star player'} takes it personally and goes on an emotional rant. They'll play with intense passion but clouded judgment.`,
        execute: () => {
          if (targetPlayer) {
            if (!wcPlayerBuffs) wcPlayerBuffs = {};
            if (!wcPlayerBuffs[teamName]) wcPlayerBuffs[teamName] = {};
            wcPlayerBuffs[teamName][targetPlayer.name] = { turns: 1 };
            if (!wcPlayerDebuffs) wcPlayerDebuffs = {};
            if (!wcPlayerDebuffs[teamName]) wcPlayerDebuffs[teamName] = {};
            wcPlayerDebuffs[teamName][targetPlayer.name] = { effect: 'captainUnhappy', turns: 1 };
          }
        },
      },
    ];
  }
}
