let _cardIdCounter = 0;

class Action {
  static rarity = 0;

  constructor({ name, description, cost, category, exhaust = false, ephemeral = false, free = false, unique = false, hold = false }) {
    if (new.target === Action) {
      throw new Error('Action is abstract and cannot be instantiated directly.');
    }

    this._id = ++_cardIdCounter;
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.category = category;
    this.exhaust = exhaust;
    this.ephemeral = ephemeral;
    this.free = free;
    this.unique = unique;
    this.hold = hold;
    this.rarity = this.constructor.rarity;
  }

  static interceptionBlocked(team) {
    return (
      typeof game !== 'undefined' &&
      game &&
      game.muscleMemory &&
      Boolean(game.muscleMemory[team.name])
    );
  }

  static consumeTackleFear(tackler) {
    if (!tackler || !tackler.hasEffect || !tackler.hasEffect('scaredToTackle')) return false;
    tackler.removeEffect('scaredToTackle');
    return true;
  }

  static markerFollows(marker, player, team) {
    const markingStat = (team && team.hasTeamEffect && team.hasTeamEffect('triggerManMarking'))
      ? Math.max(marker.marking, marker.tackling)
      : marker.marking;
    return marker.speed + markingStat >= player.speed + player.tacticalThinking;
  }

  play(..._args) {
    throw new Error(`${this.constructor.name} must implement play().`);
  }
}
