class TacticalSubAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Tactical sub',
      description:
        'Replace one of your outfield players with a fresh substitute from the bench. The substitute enters with the well-rested effect: +2 to all attributes for the rest of the match.',
      cost: [2],
      category: 'tactical',
      exhaust: true,
    });
  }

  play({ team, player, board }) {
    if (!player) {
      return { success: false, reason: 'no player selected' };
    }
    if (player.position === 'GK') {
      return { success: false, reason: 'cannot sub the goalkeeper with this card' };
    }
    if (!team.currentPlayers.includes(player)) {
      return { success: false, reason: 'selected player is not on the pitch' };
    }

    const bench = team.availableSubstitutes();
    const replacement =
      bench.find((b) => b.position === player.position) ||
      bench.slice().sort((a, b) => Team.rating(b) - Team.rating(a))[0];
    if (!replacement) {
      return { success: false, reason: 'no available substitute' };
    }

    return { success: true, player, replacement };
  }
}
