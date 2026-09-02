class TheOldPhysioEvent {
  static weight = 1;

  constructor() {
    this.title = 'The Old Physio';
    this.description =
      'A retired physio famous for miracle cures knocks on your hotel door at midnight. "I can fix anything that ails a squad," he whispers. "For a fee."';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const hasAilments =
      (wcPendingPenalties && wcPendingPenalties[teamName] && wcPendingPenalties[teamName].length > 0) ||
      (wcPlayerDebuffs && wcPlayerDebuffs[teamName] && Object.keys(wcPlayerDebuffs[teamName]).length > 0) ||
      (wcTeamDebuffs && wcTeamDebuffs[teamName]) ||
      (wcRecurringPenalties && wcRecurringPenalties[teamName] > 0);

    return [
      {
        label: 'Pay for the full treatment — cleanse all ailments queued for your next match',
        description: hasAilments
          ? 'His ancient hands work wonders. Every penalty card, knock and suspension queued against your squad mysteriously disappears before the next match.'
          : 'He pokes and prods, shrugs, and pockets his fee anyway. Nothing was wrong to begin with — but at least nothing will go wrong either.',
        execute: () => {
          if (wcPendingPenalties) delete wcPendingPenalties[teamName];
          if (wcPlayerDebuffs) delete wcPlayerDebuffs[teamName];
          if (wcTeamDebuffs) delete wcTeamDebuffs[teamName];
          if (wcRecurringPenalties) wcRecurringPenalties[teamName] = 0;
        },
      },
      {
        label: 'Send him away — your goalkeeper takes extra training instead, +2 goalkeeping next match',
        description:
          'You politely decline the back-alley medicine. Your goalkeeper, inspired by the visit to put faith in honest work, spends the night training reflexes.',
        execute: () => {
          if (!wcTeamBuffs) wcTeamBuffs = {};
          wcTeamBuffs[teamName] = { goalkeeping: 2, turns: 1 };
        },
      },
    ];
  }
}
