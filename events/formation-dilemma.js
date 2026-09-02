class FormationDilemmaEvent {
  static weight = 1;

  constructor() {
    this.title = 'Formation Dilemma';
    this.description = 'Your assistant coach has been studying the data and suggests switching to a new formation mid-tournament. It could be a masterstroke — or a disaster.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    return [
      {
        label: 'Adopt new formation — reshuffle your deck, gain +2 passing',
        description: 'You commit to the new system. The fresh approach catches opponents off guard, improving your passing game.',
        execute: () => {
          wcPendingDeckReshuffle = { teamName };
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { passing: 2, turns: 1 };
        },
      },
      {
        label: 'Stick with current — players get +1 morale (stability)',
        description: 'You trust what got you here. The squad appreciates the consistency and confidence in the existing system.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { tacticalThinking: 1, turns: 1 };
        },
      },
      {
        label: 'Compromise — partial reshuffle, +1 passing, -1 tactical thinking',
        description: 'You blend old and new. The hybrid approach adds some passing creativity but creates slight confusion in decision-making.',
        execute: () => {
          wcPendingDeckReshuffle = { teamName };
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { passing: 1, tacticalThinking: -1, turns: 1 };
        },
      },
    ];
  }
}
