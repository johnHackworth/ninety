class RivalScoutEvent {
  static weight = 1;

  constructor() {
    this.title = 'Rival Scout';
    this.description = 'A coach from your next opponent has been caught spying on your training session. Your staff are furious. How do you respond?';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    return [
      {
        label: 'Confront them publicly — opponent gets -1 to all stats next match',
        description: 'You expose the spying in a press conference. The embarrassment hurts their preparation and confidence.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { shooting: 1, tackling: 1, turns: 1 };
        },
      },
      {
        label: 'Feed false info — gain +2 tactical thinking next match',
        description: 'You let them watch, but stage a fake training session with misleading tactics. Your real preparation stays hidden.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { tacticalThinking: 2, turns: 1 };
        },
      },
      {
        label: 'Ignore it — no effect',
        description: 'You brush it off. Every team spies on each other anyway. No harm done, but no advantage either.',
        execute: () => {},
      },
    ];
  }
}
