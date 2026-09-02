class MatchEffect {
  constructor({ name, description, char }) {
    if (new.target === MatchEffect) {
      throw new Error('MatchEffect is abstract and cannot be instantiated directly.');
    }
    this.name = name;
    this.description = description;
    this.char = char;
    this.cost = [0];
    this.free = true;
    this.exhaust = false;
    this.ephemeral = false;
    this.hold = false;
    this.category = 'effect';
  }

  static allTeams() {
    if (typeof TEAMS === 'undefined' || !TEAMS) return [];
    return Object.values(TEAMS).filter((t) => t && t.name);
  }

  static allPlayers() {
    const players = [];
    for (const team of MatchEffect.allTeams()) {
      players.push(...(team.squad || []));
    }
    return players;
  }

  homeTeam() {
    return (
      MatchEffect.allTeams().find((t) => t.side === 'left') ||
      MatchEffect.allTeams()[0] ||
      null
    );
  }

  apply() {}
  revoke() {}
}
