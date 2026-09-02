class TheScoutEvent {
  static weight = 1;

  constructor() {
    this.title = 'The Scout';
    this.description =
      'Your head scout presents a dossier on your squad. "I\'ve identified one player whose signature move could define this tournament — if we lock it in for every match."';
  }

  options(teamName) {
    const team = TEAMS[teamName];
    if (!team) return [];

    const allCards = [...new Set(team.actions.map((a) => a.name))];
    if (allCards.length === 0) return [];

    const options = allCards.map((cardName) => ({
      label: `Hold "${cardName}" permanently`,
      description: `${cardName} will stay in your hand at the start of every future match and never be discarded.`,
      execute: () => {
        if (!wcPermanentHolds) wcPermanentHolds = {};
        if (!wcPermanentHolds[teamName]) wcPermanentHolds[teamName] = [];
        if (!wcPermanentHolds[teamName].includes(cardName)) {
          wcPermanentHolds[teamName].push(cardName);
        }
      },
    }));

    options.push({
      label: 'Decline — the dossier stays in the drawer',
      description: 'No card is permanently held.',
      execute: () => {},
    });

    return options;
  }
}
