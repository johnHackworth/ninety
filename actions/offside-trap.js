class OffsideTrapAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Offside trap',
      description:
        "If an opponent pass lands on your deepest outfield defender's column, your players there step up 1 cell. When every defender there has higher tactical thinking than every attacker: offside foul, attacker pushed back, free kick.",
      cost: [2],
      category: 'defense',
    });
  }

  play({ team, board }) {
    const opponent = board.getOpponent(team);
    const ballCell = board.ballCell();
    const column = ballCell.x;

    const backwardsDefender = team.currentPlayers
      .filter((p) => p.position !== 'GK')
      .reduce((best, p) => {
        const c = board.getPlayerCell(p);
        if (!c) return best;
        if (!best) return { player: p, cell: c };
        const deeper = team.side === 'left' ? c.x < best.cell.x : c.x > best.cell.x;
        return deeper ? { player: p, cell: c } : best;
      }, null);

    if (!backwardsDefender || backwardsDefender.cell.x !== column) {
      return {
        success: false,
        reason: 'the receiver must be on the same column as your deepest outfield defender',
      };
    }

    const defendersInColumn = team.currentPlayers.filter((p) => {
      const c = board.getPlayerCell(p);
      return Boolean(c && c.x === column);
    });
    const attackersInColumn = opponent.currentPlayers.filter((p) => {
      const c = board.getPlayerCell(p);
      return Boolean(c && c.x === column);
    });

    if (attackersInColumn.length === 0) {
      return { success: false, reason: 'no attacker is on that column' };
    }

    const forward = team.side === 'left' ? 1 : -1;
    const moves = [];
    for (const p of defendersInColumn) {
      const c = board.getPlayerCell(p);
      const nx = c.x + forward;
      if (nx >= 0 && nx < board.width && board.canOccupy(nx, c.y, [p])) {
        moves.push({ player: p, target: { x: nx, y: c.y } });
      }
    }

    const offside = defendersInColumn.every((p) =>
      attackersInColumn.every((a) => p.tacticalThinking > a.tacticalThinking)
    );

    return { success: true, offside, moves, column, ballCell };
  }
  resolve(team) {
    matchState.lastDribbledPlayer = null;
    const result = this.play({ team, board });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }

    if (result.offside) {
      const opponent = board.getOpponent(team);
      let offsideAttacker = null;
      let closestDist = Infinity;
      for (const p of opponent.currentPlayers) {
        const c = board.getPlayerCell(p);
        if (!c) continue;
        const d = Math.max(Math.abs(c.x - result.ballCell.x), Math.abs(c.y - result.ballCell.y));
        if (d < closestDist) {
          closestDist = d;
          offsideAttacker = p;
        }
      }
      if (offsideAttacker) {
        game.recordFoul(opponent, offsideAttacker);
        moveFoulerBack(offsideAttacker);
      }
      logMatch(
        team.name,
        `Offside! ${offsideAttacker ? offsideAttacker.name + ' is caught offside' : 'The move is ruled offside'} — foul on ${opponent.name}.`
      );
      humanNotice('OFFSIDE!');
      ball.moveTo(result.ballCell.x, result.ballCell.y);
      const choice = foulTargetForBall(team);
      const chosen = choice && getPlayerCell(choice) ? choice : null;
      if (chosen) {
        const el = tokenElForPlayer(chosen);
        if (el) {
          moveTokenToCell(el, result.ballCell.x, result.ballCell.y);
          matchState.possession = el;
        }
      } else {
        resetForRestart(team);
      }
      updatePossession();
      game.clearLastPass();
      const playResult = game.playAction(team, this, { endTurn: true, nextTeam: team });
      if (!playResult.success) logAlert(playResult.reason);
      grantFreeKickCards(team, result.ballCell);
    } else {
      for (const { player, target } of result.moves) {
        const el = tokenElForPlayer(player);
        if (el) moveTokenToCell(el, target.x, target.y);
      }
      updatePossession();
      logMatch(team.name, 'Offside trap: the line pushes up, no offside given.');
      const playResult = game.playAction(team, this, { endTurn: true, nextTeam: board.getOpponent(team) });
      if (!playResult.success) logAlert(playResult.reason);
    }
    renderGame();
  }

}
