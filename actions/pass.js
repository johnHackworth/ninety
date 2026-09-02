class PassAction extends Action {
  static rarity = 0;
  constructor(options = {}) {
    super({
      name: 'Pass',
      description:
        'Pass to any cell of the current column or up to 2 columns either way. Into a mark: receiver tactical + your passing must beat the marker\'s marking, or possession goes to the other team.',
      cost: [1],
      category: 'offense',
      exhaust: options.exhaust || false,
      ephemeral: options.ephemeral || false,
      free: options.free || false,
    });
  }

  play({ passer, team, target, board, maxRange = 2 }) {
    const ballCell = board.ballCell();
    const dx = target.x - ballCell.x;

    if (Math.abs(dx) > maxRange) {
      return { success: false, reason: 'target out of range' };
    }

    const playersAtTarget = board.getPlayersAt(target.x, target.y);
    const receivers = playersAtTarget.filter((player) => player.team === team.name);
    const markers = playersAtTarget.filter((player) => player.team !== team.name);
    const receiver = receivers[0];

    if (markers.length > 0 && receiver) {
      const bestMarker = markers.reduce((a, b) => (a.marking >= b.marking ? a : b));
      if (Action.interceptionBlocked(team)) {
        return { success: true, receiver, intercepted: false };
      }
      if (receiver.tacticalThinking + passer.passing > bestMarker.marking) {
        return { success: true, receiver, intercepted: false };
      }
      return { success: false, intercepted: true, interceptor: bestMarker };
    }

    return { success: true, receiver: receiver || null, intercepted: false };
  }
}
