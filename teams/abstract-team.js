class AbstractTeam extends Team {
  static defaultController = { type: 'ai', player: 'basic-coach' };

  static defaultStartingDeck = StartingDeck.DEFAULT;

  static buildDefaultActions(deck = AbstractTeam.defaultStartingDeck) {
    return StartingDeck.build(deck);
  }

  constructor(options = {}) {
    const deck = options.startingDeck || AbstractTeam.defaultStartingDeck;
    const extraActions = options.extraActions || {};
    const actions = AbstractTeam.buildDefaultActions(deck);
    if (options.extraActions) StartingDeck.expand(actions, options.extraActions);
    const squad = (options.squad || []).map(
      ([name, age, position, nationality, speed, marking, tackling, shooting, passing, dribbling, tacticalThinking, heading, goalkeeping]) =>
        new Player({
          name,
          age,
          position,
          team: options.name,
          nationality,
          isStar: Array.isArray(options.starPlayers) && options.starPlayers.includes(name),
          speed,
          marking,
          tackling,
          shooting,
          passing,
          dribbling,
          tacticalThinking,
          heading,
          goalkeeping,
        })
    );
    super({
      side: null,
      controller: AbstractTeam.defaultController,
      actions,
      ...options,
      squad,
    });
    this.startingDeck = deck;
    this.extraActions = extraActions;
    this.formation = {};
  }
}
