class TheFinishingSchoolEvent {
  static weight = 1;

  constructor() {
    this.title = 'The Finishing School';
    this.description =
      'A silver-haired man in a perfectly pressed tracksuit is waiting by your training pitch, surrounded by a crate of match balls and a stopwatch. "I am Straka," he says. "Striker maker. My method is simple: shoot, and shoot again. Every shot teaches. But be warned — my conditioning drills are brutal. Legs that follow my program are spent after one attempt."';
  }

  options(teamName) {
    if (typeof TEAMS === 'undefined' || !TEAMS) return [];
    const team = TEAMS[teamName];
    if (!team) return [];

    const straka = typeof COACHES !== 'undefined'
      ? COACHES.find((c) => c.effects && c.effects.includes('hotStreak'))
      : null;

    return [
      {
        label: 'Hire Straka — gain the Hot Streak coach and 4 Shoot cards, but all Shoot cards become Exhaust',
        description: straka
          ? 'Straka moves in immediately. His finishing drills mean every shot sharpens the shooter (+1 shooting each time a Shoot card is played, for the rest of every match), and four fresh Shoot cards join your deck. The price: his conditioning regime is savage — from now on, every Shoot card is Exhausted once played.'
          : 'Straka checks his stopwatch, mutters "full" and drives away with his crate of balls. Four fresh Shoot cards are all he leaves behind — and a training regime so brutal that every Shoot card is Exhausted once played.',
        execute: () => {
          if (straka) {
            if (!wcPendingCoaches) wcPendingCoaches = {};
            wcPendingCoaches[teamName] = straka;
            if (!wcOwnedCoaches) wcOwnedCoaches = {};
            if (!wcOwnedCoaches[teamName]) wcOwnedCoaches[teamName] = [];
            wcOwnedCoaches[teamName].push(straka);
          }
          if (!wcTrainingCards) wcTrainingCards = {};
          if (!wcTrainingCards[teamName]) wcTrainingCards[teamName] = [];
          for (let i = 0; i < 4; i++) wcTrainingCards[teamName].push(new ShootAction());
          if (!wcShootExhaust) wcShootExhaust = {};
          wcShootExhaust[teamName] = true;
        },
      },
      {
        label: 'Buy just the drill pack — gain 2 Shoot cards',
        description:
          'You take the crate of balls and a photocopied booklet of shooting drills, but decline the coach himself. Two extra Shoot cards join your deck — no strings attached.',
        execute: () => {
          if (!wcTrainingCards) wcTrainingCards = {};
          if (!wcTrainingCards[teamName]) wcTrainingCards[teamName] = [];
          wcTrainingCards[teamName].push(new ShootAction());
          wcTrainingCards[teamName].push(new ShootAction());
        },
      },
      {
        label: 'Decline — +1 shooting next match',
        description:
          '"Fundamentals can wait," you shrug. Straka raises an eyebrow and packs his stopwatch. That evening your forwards take extra volleys on their own initiative — tomorrow their boots feel a little truer.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { shooting: 1, turns: 1 };
        },
      },
    ];
  }
}
