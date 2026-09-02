class Coach {
  constructor({ name, nationality, effects, cards }) {
    this.name = name;
    this.nationality = nationality;
    this.effects = Array.isArray(effects) ? effects : [effects];
    this.cards = Array.isArray(cards) ? cards : [];
  }

  get label() {
    return this.name;
  }

  get description() {
    const parts = this.effects
      .map((key) => {
        const spec = TEAM_EFFECTS[key];
        return spec ? spec.label : key;
      });
    for (const CardClass of this.cards) {
      const card = new CardClass();
      parts.push(`${card.name} (adds penalty card to deck)`);
    }
    return parts.join(', ');
  }

  get explanation() {
    const parts = this.effects
      .map((key) => {
        const spec = TEAM_EFFECTS[key];
        return spec ? spec.explanation : key;
      });
    for (const CardClass of this.cards) {
      const card = new CardClass();
      parts.push(`Adds "${card.name}" to your deck: ${card.description}`);
    }
    return parts.join(' ');
  }

  applyToTeam(team) {
    for (const effect of this.effects) {
      team.addTeamEffect(effect, Infinity);
    }
    for (const CardClass of this.cards) {
      const card = new CardClass();
      team.actions.push(card);
      team.availableActions.push(card);
    }
    if (!team.coaches) team.coaches = [];
    team.coaches.push(this);
  }
}
