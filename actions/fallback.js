class FallbackAction extends Action {
  static rarity = 0;
  constructor() {
    super({
      name: 'Fallback',
      description: 'All the players of your team go back to their original positions.',
      cost: [3],
      category: 'tactical',
    });
  }

  play({ team, board }) {
    return { success: true, team };
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
    for (const player of team.currentPlayers) {
      const pos = team.formation[player.name];
      if (!pos) continue;
      const el = tokenElForPlayer(player);
      if (!el) continue;
      moveTokenToCell(el, pos[0], pos[1]);
    }
    if (holder && team.currentPlayers.includes(holder)) {
      const hc = getPlayerCell(holder);
      if (hc) moveBall(hc.x, hc.y);
    } else {
      updatePossession();
    }
    logMatch(team.name, 'Fallback: the whole team drops back to formation.');
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
