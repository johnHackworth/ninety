class MarkThemUpAction extends Action {
  static rarity = 2;
  constructor() {
    super({
      name: 'Mark them up!',
      description:
        'If there is an offensive player in the first three columns and an unmarked defender less than 2 cells away, move the defender onto the offensive player.',
      cost: [2],
      category: 'defense',
    });
  }

  play({ team, board }) {
    const opponent = board.getOpponent(team);
    if (!opponent) return { success: false, reason: 'no opponent' };

    const offensivePositions = ['FW', 'MF'];
    const firstThreeCols = [0, 1, 2];

    const targets = opponent.currentPlayers.filter((p) => {
      if (!offensivePositions.includes(p.position)) return false;
      const c = board.getPlayerCell(p);
      if (!c) return false;
      if (!firstThreeCols.includes(c.x)) return false;
      return !board.getPlayersAt(c.x, c.y).some((op) => op.team === team.name);
    });

    const moves = [];
    const usedDefenders = new Set();

    for (const target of targets) {
      const tc = board.getPlayerCell(target);
      if (!tc) continue;

      let bestDefender = null;
      let bestDist = Infinity;

      for (const df of team.currentPlayers) {
        if (df.position !== 'DF') continue;
        if (usedDefenders.has(df)) continue;
        const dc = board.getPlayerCell(df);
        if (!dc) continue;
        const dist = Math.abs(dc.x - tc.x) + Math.abs(dc.y - tc.y);
        if (dist >= 2) continue;
        if (dist < bestDist) {
          bestDist = dist;
          bestDefender = df;
        }
      }

      if (bestDefender) {
        usedDefenders.add(bestDefender);
        moves.push({ player: bestDefender, target: { x: tc.x, y: tc.y } });
      }
    }

    if (moves.length === 0) {
      return { success: false, reason: 'no defender close enough to mark' };
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
      `Mark them up: ${result.moves.map((m) => `${m.player.name} marks ${m.target.x},${m.target.y}`).join(', ')}.`
    );
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }

}
