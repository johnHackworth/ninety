class BackwardsPassAction extends PassAction {
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
  }

  play({ passer, team, target, board, maxRange = 2 }) {
    const ballCell = board.ballCell();
    const dx = target.x - ballCell.x;
    const isBackwards = (team.side === 'left' && dx < 0) || (team.side === 'right' && dx > 0);

    const result = super.play({ passer, team, target, board, maxRange });

    if (result.success && isBackwards && result.receiver) {
      result.receiver._backwardsPassBonus = 5;
      result.backwardsPass = true;
    }

    return result;
  }
}
