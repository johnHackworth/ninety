class SocialMediaStormEvent {
  static weight = 1;

  constructor() {
    this.title = 'Social Media Storm';
    this.description = 'One of your players posted a controversial tweet that has gone viral. Fans and pundits are divided. The situation is escalating fast.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const squad = team.squad || team.currentPlayers || [];
    if (squad.length === 0) return [];

    const player = squad[Math.floor(Math.random() * squad.length)];

    return [
      {
        label: 'Delete it — player gets -1 morale, no other effect',
        description: `You force ${player.name} to delete the tweet and issue an apology. The player feels stifled, but the controversy dies down quickly.`,
        execute: () => {
          if (!wcPlayerDebuffs) wcPlayerDebuffs = {};
          if (!wcPlayerDebuffs[teamName]) wcPlayerDebuffs[teamName] = {};
          wcPlayerDebuffs[teamName][player.name] = { effect: 'captainUnhappy', turns: 1 };
        },
      },
      {
        label: `Stand by it — ${player.name} gets +3 shooting, but team gets -1 tactical thinking`,
        description: `You back ${player.name}'s right to speak freely. They play with extra fire and confidence, but the media circus distracts the whole squad.`,
        execute: () => {
          if (!wcPlayerBuffs) wcPlayerBuffs = {};
          if (!wcPlayerBuffs[teamName]) wcPlayerBuffs[teamName] = {};
          wcPlayerBuffs[teamName][player.name] = { turns: 1 };
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { tacticalThinking: -1, turns: 1 };
        },
      },
      {
        label: 'Fine the player — player gets -2 all stats, but team gets +1 morale',
        description: `You make an example of ${player.name}. The discipline sends a message to the whole squad about standards.`,
        execute: () => {
          if (!wcPlayerDebuffs) wcPlayerDebuffs = {};
          if (!wcPlayerDebuffs[teamName]) wcPlayerDebuffs[teamName] = {};
          wcPlayerDebuffs[teamName][player.name] = { effect: 'eventDebuff', turns: 1 };
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { teamMoraleBoost: true, turns: 1 };
        },
      },
    ];
  }
}
