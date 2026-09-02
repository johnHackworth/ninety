class WeatherWarningEvent {
  static weight = 1;

  constructor() {
    this.title = 'Weather Warning';
    this.description = 'A storm is forecast for your next match. Heavy rain and strong winds could change everything.';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    return [
      {
        label: 'Train in the rain — +2 tackling, -2 passing next match',
        description: 'You embrace the conditions and train your squad for physical battles. Tackling improves but passing accuracy drops.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { tackling: 2, passing: -2, turns: 1 };
        },
      },
      {
        label: 'Request a schedule change — lose your next training session',
        description: 'You petition the organizers for a postponement. The request is denied, but the distraction costs you a training session.',
        execute: () => {
          if (wcTrainingQueue) {
            const idx = wcTrainingQueue.findIndex((e) => e.teamName === teamName);
            if (idx >= 0) wcTrainingQueue.splice(idx, 1);
          }
        },
      },
      {
        label: 'Ignore it — random stat debuff next match',
        description: 'You carry on as normal. The weather hits unpredictably — one of your team\'s key stats will suffer.',
        execute: () => {
          const stats = ['speed', 'dribbling', 'passing', 'shooting', 'tackling', 'marking'];
          const debuffed = stats[Math.floor(Math.random() * stats.length)];
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { [debuffed]: -2, turns: 1 };
        },
      },
    ];
  }
}
