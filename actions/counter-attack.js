class CounterAttackAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Counter attack',
      description: 'All the players of your team, except the goalkeeper, advance one cell forward when possible.',
      cost: [2],
      category: 'tactical',
    });
  }

  play({ team, board }) {
    const forward = team.side === 'left' ? 1 : -1;
    const moves = [];
    for (const p of team.currentPlayers) {
      if (p.position === 'GK') continue;
      if (board.isCramped && board.isCramped(p)) continue;
      const c = board.getPlayerCell(p);
      if (!c) continue;
      const nx = c.x + forward;
      if (nx >= 0 && nx < board.width && board.canOccupy(nx, c.y, [p])) {
        moves.push({ player: p, target: { x: nx, y: c.y } });
      }
    }
    return { success: true, moves };
  }
  resolve(team) {
    matchState.lastDribbledPlayer = null;
    const result = this.play({ team, board });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }
    const holder = matchState.possession && matchState.possession._token.player;
    const holderMoved = result.moves.some((m) => m.player === holder);
    for (const { player, target } of result.moves) {
      const el = tokenElForPlayer(player);
      if (el) moveTokenToCell(el, target.x, target.y);
    }
    if (holderMoved) {
      const hc = getPlayerCell(holder);
      if (hc) moveBall(hc.x, hc.y);
    } else {
      updatePossession();
    }
    logMatch(
      team.name,
      `Counter-attack: ${result.moves.map((m) => m.player.name).join(', ')} surge forward.`
    );
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
