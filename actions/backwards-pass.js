class BackwardsPassAction extends Action {
  static rarity = 1;
  constructor(options = {}) {
    super({
      name: 'Backwards Pass',
      description:
        'Pass to any cell of the current column or up to 2 columns either way. If the pass goes backwards (towards your own goal), the next Shoot action by the receiver gains +5 shooting.',
      cost: [1],
      category: 'offense',
      exhaust: options.exhaust || false,
      ephemeral: options.ephemeral || false,
      free: options.free || false,
    });
    this._backwardsPassReceiver = null;
  }

  play({ passer, team, target, board, maxRange = 2 }) {
    const ballCell = board.ballCell();
    const dx = target.x - ballCell.x;

    if (Math.abs(dx) > maxRange) {
      return { success: false, reason: 'target out of range' };
    }

    const isBackwards = (team.side === 'left' && dx < 0) || (team.side === 'right' && dx > 0);

    const playersAtTarget = board.getPlayersAt(target.x, target.y);
    const receivers = playersAtTarget.filter((player) => player.team === team.name);
    const markers = playersAtTarget.filter((player) => player.team !== team.name);
    const receiver = receivers[0];

    let effectivePassing = passer.passing;
    const wind =
      typeof game !== 'undefined' &&
      game &&
      game.matchEffect &&
      typeof StrongWindEffect !== 'undefined' &&
      game.matchEffect instanceof StrongWindEffect;
    if (wind && Math.abs(dx) > 2) effectivePassing -= 2;

    if (markers.length > 0 && receiver) {
      const bestMarker = markers.reduce((a, b) => (a.marking >= b.marking ? a : b));
      if (Action.interceptionBlocked(team)) {
        return { success: true, receiver, intercepted: false };
      }
      if (receiver.tacticalThinking + effectivePassing > bestMarker.marking) {
        if (isBackwards) this._backwardsPassReceiver = receiver;
        return { success: true, receiver, intercepted: false, backwardsPass: isBackwards };
      }
      return { success: false, intercepted: true, interceptor: bestMarker };
    }

    if (isBackwards) this._backwardsPassReceiver = receiver;
    return { success: true, receiver: receiver || null, intercepted: false, backwardsPass: isBackwards };
  }

  get backwardsPassReceiver() {
    return this._backwardsPassReceiver;
  }

  clearBackwardsPass() {
    this._backwardsPassReceiver = null;
  }
}