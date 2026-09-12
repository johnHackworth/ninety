// Card playability validation — extracted from app.js

function opponentInCell(x, y, team) {
  return board.getPlayersAt(x, y).find((p) => p.team !== team.name) || null;
}

function frozenDefenseInHand(team) {
  return game.inPlay[team.name]?.some((c) => c instanceof FrozenDefenseAction) || false;
}

function isBacklinePosition(player) {
  return player.position === 'DF' || player.position === 'GK';
}

function isShotEndingAction(action) {
  return (
    action instanceof ShootAction ||
    action instanceof VolleyAction ||
    action instanceof LongShotAction ||
    action instanceof HeaderFinishAction ||
    action instanceof SecondBallHeaderAction ||
    action instanceof KnockdownFinishAction ||
    action instanceof RabonaAction
  );
}

function canPlayAction(team, action) {
  if (noticeOverlayActive) return false;
  if (deferredPlayActive) return false;
  if (game.finished) return false;
  if (team !== game.currentTeam) return false;
  if (game.effectiveCost(team, action) > game.actionPoints[team.name]) return false;

  if (game.pendingPenalty === team.name && !isShotEndingAction(action)) return false;

  const ghostHolderEl = matchState && matchState.possession ? matchState.possession : null;
  const ghostHolder = ghostHolderEl && ghostHolderEl._token ? ghostHolderEl._token.player : null;
  if (
    ghostHolder &&
    ghostHolder.team !== team.name &&
    game.ghostRun &&
    game.ghostRun[ghostHolder.team] &&
    (action instanceof TackleAction ||
      action instanceof RiskyTackleAction ||
      action instanceof ExpertTackleAction ||
      action instanceof HardTackleAction ||
      action instanceof PressAction ||
      action instanceof ForcedPressAction ||
      action instanceof MarkingAction ||
      action instanceof DirtyTricksAction)
  ) {
    return false;
  }

  if (game.inPlay[team.name].some((c) => c instanceof BrokenDefenseAction)) {
    if (
      action instanceof MarkingAction ||
      action instanceof PressAction ||
      action instanceof ForcedPressAction ||
      action instanceof TackleAction ||
      action instanceof RiskyTackleAction
    ) {
      return false;
    }
  }

  if (game.inPlay[team.name].some((c) => c instanceof LostDressingRoomAction)) {
    if (
      action instanceof FullPressureAction ||
      action instanceof ArgentoPrideAction ||
      action instanceof PepStyleAction ||
      action instanceof TriggerManMarkingAction ||
      action instanceof GameManagementAction ||
      action instanceof TempoControlAction ||
      action instanceof ComingHomeAction ||
      action instanceof UnderdogBiteAction ||
      action instanceof TotalFootballAction ||
      action instanceof AtlasWallAction ||
      action instanceof GarraCharruaAction ||
      action instanceof BrittleLittleBonesAction
    ) {
      return false;
    }
  }

  if (game.inPlay[team.name].some((c) => c instanceof TacticalConfusionAction)) {
    if (action instanceof PassAction || action instanceof ThroughBallAction) {
      return false;
    }
  }

  if (game.inPlay[team.name].some((c) => c instanceof CaptainsMutinyAction)) {
    if (action instanceof InspirationAction || action instanceof BigMatchMentalityAction) {
      return false;
    }
  }

  const frozenDefense = frozenDefenseInHand(team);

  if (action instanceof PassAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    if (holderEl._token.player.team !== team.name) return false;
  }

  if (action instanceof LongPassAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    if (holderEl._token.player.team !== team.name) return false;
  }

  if (action instanceof LongBallAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    if (holderEl._token.player.team !== team.name) return false;
    if (holderEl._token.player.passing < 3) return false;
    const minCol = team.side === 'left' ? 0 : WIDTH - 5;
    const maxCol = team.side === 'left' ? WIDTH - 5 : WIDTH - 1;
    if (ball.x < minCol || ball.x > maxCol) return false;
  }

  if (action instanceof ShootAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    if (holderEl._token.player.team !== team.name) return false;
    const c = getPlayerCell(holderEl._token.player);
    if (!c) return false;
    if (team.side === 'left') {
      if (c.x < WIDTH - 3) return false;
    } else if (c.x > 2) return false;
  }

  if (action instanceof LongShotAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const holder = holderEl._token.player;
    if (holder.team !== team.name) return false;
    if (holder.shooting < 7) return false;
    const c = getPlayerCell(holder);
    if (!c) return false;
    if (c.y < 2 || c.y > 4) return false;
    const fifthColumn = team.side === 'left' ? 4 : 3;
    if (c.x < fifthColumn || c.x > fifthColumn + 1) return false;
  }

  if (action instanceof ExpertTackleAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    if (holderEl._token.player.team === team.name) return false;
    return team.currentPlayers.some((player) => {
      const playerCell = getPlayerCell(player);
      if (!playerCell) return false;
      const distance = Math.max(Math.abs(ball.x - playerCell.x), Math.abs(ball.y - playerCell.y));
      if (distance === 0) return true;
      return distance === 1 && board.canOccupy(ball.x, ball.y, [player]);
    });
  }

  if (action instanceof CannonballAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const holder = holderEl._token.player;
    if (holder.team !== team.name) return false;
    const c = getPlayerCell(holder);
    if (!c) return false;
    if (c.y < 2 || c.y > HEIGHT - 2) return false;
    if (team.side === 'left') {
      if (c.x < WIDTH - 3) return false;
    } else if (c.x > 2) return false;
  }

  if (action instanceof TacklingMadnessAction) return true;
  if (action instanceof HighMobilityAction) return true;
  if (action instanceof BrittleLittleBonesAction) return true;
  if (action instanceof ComboAction) return true;

  if (action instanceof RunAndCrossAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const winger = holderEl._token.player;
    if (winger.team !== team.name) return false;
    const c = getPlayerCell(winger);
    if (!c) return false;
    const ballCell = board.ballCell();
    if (!ballCell || ballCell.x !== c.x || ballCell.y !== c.y) return false;
    const attackingRight = team.side === 'left';
    const inOppositionHalf = attackingRight ? c.x >= 5 : c.x <= 3;
    if (!inOppositionHalf) return false;
    if (!(c.y === 0 || c.y === 1 || c.y === 6)) return false;
    const inc = attackingRight ? 1 : -1;
    for (let i = 1; i <= 2; i++) {
      const x = c.x + inc * i;
      if (x < 0 || x >= WIDTH) return false;
      if (board.getPlayersAt(x, c.y).some((p) => p.team === team.name)) return false;
    }
    const marker =
      board.getPlayersAt(c.x, c.y).find((p) => p.team !== team.name) || null;
    if (marker && !(winger.speed > marker.speed)) return false;
    const destX = c.x + inc * 2;
    if (destX < 0 || destX >= WIDTH) return false;
    if (!board.canOccupy(destX, c.y, [winger])) return false;
    const opponent = board.getOpponent(team);
    const antepenultimate = attackingRight ? WIDTH - 3 : 2;
    return team.currentPlayers.some((player) => {
      const pc = getPlayerCell(player);
      if (!pc) return false;
      const inBox = board.inPenaltyBox(pc.x, pc.y, opponent.side);
      const inCentralAntepenultimate = pc.x === antepenultimate && pc.y >= 2 && pc.y <= HEIGHT - 3;
      return inBox || inCentralAntepenultimate;
    });
  }

  if (action instanceof MarkingAction) {
    const moved = matchState.lastBallMove;
    if (!moved || moved.x !== ball.x || moved.y !== ball.y) return false;
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    if (holderEl._token.player.team === team.name) return false;
    const holderCell = getPlayerCell(holderEl._token.player);
    if (!holderCell) return false;
    return team.currentPlayers.some((player) => {
      const playerCell = getPlayerCell(player);
      if (!playerCell) return false;
      return playerCell.x === holderCell.x && playerCell.y === holderCell.y;
    });
  }

  if (action instanceof PressAction || action instanceof ForcedPressAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    if (holderEl._token.player.team === team.name) return false;
    const holderCell = getPlayerCell(holderEl._token.player);
    if (!holderCell) return false;
    return team.currentPlayers.some((player) => {
      const playerCell = getPlayerCell(player);
      if (!playerCell) return false;
      return playerCell.x === holderCell.x && playerCell.y === holderCell.y;
    });
  }

  if (action instanceof TackleAction || action instanceof RiskyTackleAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    if (holderEl._token.player.team === team.name) return false;
    return team.currentPlayers.some((player) => {
      const playerCell = getPlayerCell(player);
      if (!playerCell) return false;
      const distance = Math.max(Math.abs(ball.x - playerCell.x), Math.abs(ball.y - playerCell.y));
      return distance === 1 && board.canOccupy(ball.x, ball.y, [player]);
    });
  }

  if (action instanceof MoveAction) {
    return team.currentPlayers.some((player) => {
      if (frozenDefense && isBacklinePosition(player)) return false;
      const c = getPlayerCell(player);
      if (!c) return false;
      const range = player.position === 'GK' && team.hasTeamEffect('lastDefender') ? 2 : 1;
      return candidatesFrom(c.x, c.y, range).some(([nx, ny]) =>
        moveTargetLegal(player, nx, ny)
      );
    });
  }

  if (action instanceof SlipAction) {
    const slipHolder = matchState.possession && matchState.possession._token.player;
    return team.currentPlayers.some((player) => {
      if (player === slipHolder) return false;
      if (frozenDefense && isBacklinePosition(player)) return false;
      const c = getPlayerCell(player);
      if (!c || c.x < 0 || c.y < 0 || c.x >= WIDTH || c.y >= HEIGHT) return false;
      return candidatesFrom(c.x, c.y, 1).some(([nx, ny]) =>
        action.play({ team, player, board, target: { x: nx, y: ny } }).success
      );
    });
  }

  if (action instanceof OffBallPlayAction) {
    const holder = matchState.possession && matchState.possession._token.player;
    return team.currentPlayers.some((player) => {
      if (player === holder) return false;
      if (frozenDefense && isBacklinePosition(player)) return false;
      const c = getPlayerCell(player);
      if (!c) return false;
      const marker = opponentInCell(c.x, c.y, team) || null;
      const follow = Boolean(marker);
      return candidatesFrom(c.x, c.y, 1).some(([nx, ny]) =>
        board.canOccupy(nx, ny, follow ? [player, marker] : [player])
      );
    });
  }

  if (action instanceof DribblingAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const holder = holderEl._token.player;
    if (holder.team !== team.name) return false;
    if (frozenDefense && isBacklinePosition(holder)) return false;
    const c = getPlayerCell(holder);
    if (!c) return false;
    return board.getPlayersAt(c.x, c.y).some((p) => p.team !== team.name);
  }

  if (action instanceof FeintTurnAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const holder = holderEl._token.player;
    if (holder.team !== team.name) return false;
    if (frozenDefense && isBacklinePosition(holder)) return false;
    const c = getPlayerCell(holder);
    if (!c) return false;
    return board.getPlayersAt(c.x, c.y).some((p) => p.team !== team.name);
  }

  if (action instanceof CoachInstructionsAction) {
    return game.inPlay[team.name].length > 1;
  }

  if (action instanceof SprintAction) {
    const holder = matchState.possession && matchState.possession._token.player;
    return team.currentPlayers.some((player) => {
      if (frozenDefense && isBacklinePosition(player)) return false;
      const c = getPlayerCell(player);
      if (!c) return false;
      const marked = board.getPlayersAt(c.x, c.y).some((p) => p.team !== team.name);
      if (player === holder && marked) return false;
      const marker =
        board.getPlayersAt(c.x, c.y).find((p) => p.team !== team.name) || null;
      const follow = Boolean(
        marker &&
          !(board.isCramped && board.isCramped(marker)) &&
          Action.markerFollows(marker, player, team)
      );
      return candidatesFrom(c.x, c.y, 2).some(([nx, ny]) =>
        board.canOccupy(nx, ny, follow ? [player, marker] : [player])
      );
    });
  }

  if (action instanceof ShortSprintAction) {
    const holder = matchState.possession && matchState.possession._token.player;
    return team.currentPlayers.some((player) => {
      if (frozenDefense && isBacklinePosition(player)) return false;
      const c = getPlayerCell(player);
      if (!c) return false;
      const marked = board.getPlayersAt(c.x, c.y).some((p) => p.team !== team.name);
      if (player === holder && marked) return false;
      const marker =
        board.getPlayersAt(c.x, c.y).find((p) => p.team !== team.name) || null;
      const follow = Boolean(
        marker &&
          !(board.isCramped && board.isCramped(marker)) &&
          Action.markerFollows(marker, player, team)
      );
      return [1, 2].some((d) =>
        candidatesFrom(c.x, c.y, d).some(([nx, ny]) =>
          board.canOccupy(nx, ny, follow ? [player, marker] : [player])
        )
      );
    });
  }

  if (action instanceof OverlapAction) {
    return team.currentPlayers.some((player) => {
      if (frozenDefense && isBacklinePosition(player)) return false;
      return action.play({ team, player, board }).success;
    });
  }

  if (action instanceof SideAttackAction) {
    return ['top', 'bottom'].some((side) => {
      const result = action.play({ team, board, side });
      if (!result.success) return false;
      if (frozenDefense && result.moves.some((m) => isBacklinePosition(m.player))) return false;
      return true;
    });
  }

  if (action instanceof FinishAction) {
    if (!board.inPenaltyBox(ball.x, ball.y, board.getOpponent(team).side)) return false;
    const finishHolder = matchState.possession && matchState.possession._token.player;
    if (finishHolder && finishHolder.team !== team.name) return false;
    return team.currentPlayers.some((player) => {
      if (board.isCramped(player)) return false;
      const c = getPlayerCell(player);
      if (!c) return false;
      const distance = Math.max(Math.abs(ball.x - c.x), Math.abs(ball.y - c.y));
      if (distance !== 1) return false;
      const marker =
        board.getPlayersAt(c.x, c.y).find((p) => p.team !== team.name) || null;
      const follow = Boolean(marker && marker.marking > player.tacticalThinking);
      return board.canOccupy(ball.x, ball.y, follow ? [player, marker] : [player]);
    });
  }

  if (action instanceof HeaderFinishAction || action instanceof KnockdownFinishAction) {
    if (!board.inPenaltyBox(ball.x, ball.y, board.getOpponent(team).side)) return false;
    const finishHolder = matchState.possession && matchState.possession._token.player;
    if (finishHolder && finishHolder.team !== team.name) return false;
    return team.currentPlayers.some((player) => {
      if (board.isCramped(player)) return false;
      const c = getPlayerCell(player);
      if (!c) return false;
      const distance = Math.max(Math.abs(ball.x - c.x), Math.abs(ball.y - c.y));
      if (distance !== 1) return false;
      const marker =
        board.getPlayersAt(c.x, c.y).find((p) => p.team !== team.name) || null;
      const follow = Boolean(marker && marker.marking > player.tacticalThinking);
      return board.canOccupy(ball.x, ball.y, follow ? [player, marker] : [player]);
    });
  }

  if (action instanceof SecondBallHeaderAction) {
    if (!matchState.lastShotSave) return false;
    if (!matchState.possession) return false;
    if (matchState.possession._token.player.team !== team.name) return false;
    if (!board.inPenaltyBox(ball.x, ball.y, board.getOpponent(team).side)) return false;
    return team.currentPlayers.some((player) => {
      if (board.isCramped(player)) return false;
      const c = getPlayerCell(player);
      if (!c) return false;
      const distance = Math.max(Math.abs(ball.x - c.x), Math.abs(ball.y - c.y));
      if (distance !== 1) return false;
      return true;
    });
  }

  if (action instanceof RunAndCrossFlankAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const winger = holderEl._token.player;
    if (winger.team !== team.name) return false;
    const c = getPlayerCell(winger);
    if (!c) return false;
    if (board.getPlayersAt(c.x, c.y).some((p) => p.team !== team.name)) return false;
    const attackingRight = team.side === 'left';
    const inc = attackingRight ? 1 : -1;
    const destX = c.x + inc;
    if (destX < 0 || destX >= WIDTH) return false;
    if (!board.canOccupy(destX, c.y, [winger])) return false;
    const opponent = board.getOpponent(team);
    const antepenultimate = attackingRight ? WIDTH - 3 : 2;
    return team.currentPlayers.some((player) => {
      const pc = getPlayerCell(player);
      if (!pc) return false;
      const inBox = board.inPenaltyBox(pc.x, pc.y, opponent.side);
      const inCentralAntepenultimate = pc.x === antepenultimate && pc.y >= 2 && pc.y <= HEIGHT - 3;
      return inBox || inCentralAntepenultimate;
    });
  }

  if (action instanceof DribbleAndCrossAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const winger = holderEl._token.player;
    if (winger.team !== team.name) return false;
    const c = getPlayerCell(winger);
    if (!c) return false;
    const marker = board.getPlayersAt(c.x, c.y).find((p) => p.team !== team.name) || null;
    if (!marker) return false;
    const attackingRight = team.side === 'left';
    const inc = attackingRight ? 1 : -1;
    const destX = c.x + inc;
    if (destX < 0 || destX >= WIDTH) return false;
    if (winger.dribbling > marker.marking && !board.canOccupy(destX, c.y, [winger])) return false;
    const opponent = board.getOpponent(team);
    const antepenultimate = attackingRight ? WIDTH - 3 : 2;
    return team.currentPlayers.some((player) => {
      const pc = getPlayerCell(player);
      if (!pc) return false;
      const inBox = board.inPenaltyBox(pc.x, pc.y, opponent.side);
      const inCentralAntepenultimate = pc.x === antepenultimate && pc.y >= 2 && pc.y <= HEIGHT - 3;
      return inBox || inCentralAntepenultimate;
    });
  }

  if (action instanceof CrossAction) {
    const opponent = board.getOpponent(team);
    const attackingRight = team.side === 'left';
    const wideX = attackingRight ? ball.x >= WIDTH - 3 : ball.x <= 2;
    const wideY = ball.y <= 1 || ball.y >= HEIGHT - 2;
    if (!wideX || !wideY) return false;
    const crossHolder = matchState.possession && matchState.possession._token.player;
    if (!crossHolder || crossHolder.team !== team.name) return false;
    return team.currentPlayers.some((player) => {
      if (board.isCramped(player)) return false;
      const c = getPlayerCell(player);
      if (!c) return false;
      const inBox = board.inPenaltyBox(c.x, c.y, opponent.side);
      const antepenultimate = attackingRight ? WIDTH - 3 : 2;
      const inCentralAntepenultimate =
        c.x === antepenultimate && c.y >= 2 && c.y <= HEIGHT - 3;
      return inBox || inCentralAntepenultimate;
    });
  }

  if (action instanceof OffsideTrapAction) {
    if (!matchState.lastBallMove) return false;
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    if (holderEl._token.player.team === team.name) return false;
    const receiverCell = getPlayerCell(holderEl._token.player);
    if (!receiverCell) return false;
    const deepest = team.currentPlayers.reduce((best, p) => {
      if (p.position === 'GK') return best;
      const c = getPlayerCell(p);
      if (!c) return best;
      if (!best) return c.x;
      const deeper = team.side === 'left' ? c.x < best : c.x > best;
      return deeper ? c.x : best;
    }, null);
    if (deepest === null) return false;
    return deepest === receiverCell.x;
  }

  if (action instanceof TacticalFaultAction) {
    const dribbled = matchState.lastDribbledPlayer;
    if (!dribbled || !team.currentPlayers.includes(dribbled)) return false;
    const holder = matchState.possession && matchState.possession._token.player;
    if (holder && holder.team === team.name) return false;
    return true;
  }

  if (action instanceof HardTackleAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const holder = holderEl._token.player;
    if (holder.team === team.name) return false;
    const holderCell = getPlayerCell(holder);
    if (!holderCell) return false;
    const holderAlone = board.getPlayersAt(holderCell.x, holderCell.y).length <= 1;
    return team.currentPlayers.some((player) => {
      const c = getPlayerCell(player);
      if (!c) return false;
      const sameCell = c.x === holderCell.x && c.y === holderCell.y;
      const adjacent =
        Math.max(Math.abs(c.x - holderCell.x), Math.abs(c.y - holderCell.y)) === 1;
      return sameCell || (adjacent && holderAlone);
    });
  }

  if (action instanceof FallbackAction) {
    if (frozenDefense) return false;
    return true;
  }
  if (action instanceof CounterAttackAction) {
    if (frozenDefense) {
      return action.play({ team, board }).moves.every((m) => !isBacklinePosition(m.player));
    }
    return true;
  }
  if (action instanceof MarkThemUpAction) {
    const result = action.play({ team, board });
    if (!result.success) return false;
    if (frozenDefense) {
      return result.moves.every((m) => !isBacklinePosition(m.player));
    }
    return result.moves.length > 0;
  }
  if (action instanceof DirtyTricksAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const holder = holderEl._token.player;
    if (holder.team === team.name) return false;
    const holderCell = getPlayerCell(holder);
    if (!holderCell) return false;
    return team.currentPlayers.some(
      (p) => p.position !== 'GK' && getPlayerCell(p) && getPlayerCell(p).x === holderCell.x && getPlayerCell(p).y === holderCell.y
    );
  }
  if (action instanceof IntensityAction) return true;
  if (action instanceof FlairAction) return true;
  if (action instanceof HandOfGodAction) return true;
  if (action instanceof ParkTheBusAction) return true;
  if (action instanceof PossessionAction) return true;
  if (action instanceof TikiTakaAction) return true;
  if (action instanceof InspirationAction) return true;
  if (action instanceof CrampAction) {
    return board.getOpponent(team).currentPlayers.some((player) => {
      const c = getPlayerCell(player);
      return Boolean(c) && !board.isCramped(player);
    });
  }
  if (action instanceof PlaymakingAction) return true;
  if (action instanceof FullPressureAction) {
    return !team.hasTeamEffect('fullPressure');
  }
  if (action instanceof ArgentoPrideAction) {
    return !team.hasTeamEffect('argentoPride');
  }
  if (action instanceof PepStyleAction) {
    return !team.hasTeamEffect('pepStyle');
  }
  if (action instanceof ComingHomeAction) {
    return !team.hasTeamEffect('comingHome');
  }
  if (action instanceof UnderdogBiteAction) {
    return !team.hasTeamEffect('underdogBite');
  }
  if (action instanceof TotalFootballAction) {
    return !team.hasTeamEffect('totalFootball');
  }
  if (action instanceof AtlasWallAction) {
    return !team.hasTeamEffect('atlasWall');
  }
  if (action instanceof GarraCharruaAction) {
    return !team.hasTeamEffect('garraCharrua');
  }
  if (action instanceof EurekaAction) return true;

  if (action instanceof JogaBonitoAction) {
    const h = matchState.possession && matchState.possession._token.player;
    return Boolean(h && h.team === team.name);
  }
  if (action instanceof NordicHammerAction) {
    const h = matchState.possession && matchState.possession._token.player;
    return Boolean(h && h.team === team.name);
  }
  if (action instanceof TerangaRoarAction) {
    const h = matchState.possession && matchState.possession._token.player;
    return Boolean(h && h.team === team.name);
  }
  if (action instanceof FullDefenseAction) return true;
  if (action instanceof FullAttackAction) return true;
  if (action instanceof LastDitchBlockAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const holder = holderEl._token.player;
    if (holder.team === team.name) return false;
    const holderCell = getPlayerCell(holder);
    if (!holderCell) return false;
    return team.currentPlayers.some((p) => {
      const c = getPlayerCell(p);
      if (!c) return false;
      const dist = Math.max(Math.abs(c.x - holderCell.x), Math.abs(c.y - holderCell.y));
      return dist <= 1;
    });
  }
  if (action instanceof ClearanceAction) {
    const holderEl = matchState.possession;
    if (holderEl) {
      const holder = holderEl._token.player;
      if (holder.team !== team.name) return false;
      return (holder.position === 'DF' || holder.position === 'GK');
    }
    const ballCell = board.ballCell();
    return team.currentPlayers.some((p) => {
      if (p.position !== 'DF' && p.position !== 'GK') return false;
      const c = getPlayerCell(p);
      if (!c) return false;
      const dist = Math.max(Math.abs(c.x - ballCell.x), Math.abs(c.y - ballCell.y));
      return dist === 1;
    });
  }
  if (action instanceof CompactShapeAction) {
    return team.currentPlayers.some((p) => p.position === 'DF');
  }
  if (action instanceof DefensiveWallAction) {
    const defsInBox = team.currentPlayers.filter((p) => {
      if (p.position !== 'DF') return false;
      const c = getPlayerCell(p);
      if (!c) return false;
      return team.side === 'left' ? c.x <= 3 : c.x >= WIDTH - 4;
    });
    return defsInBox.length >= 1;
  }
  if (action instanceof GermanEfficiencyAction) {
    return Object.values(TEAMS).some((t) =>
      t.currentPlayers.some((p) => p.effects.length > 0)
    );
  }
  if (action instanceof SunInTheirEyesAction) return true;

  if (action instanceof OuchAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const holder = holderEl._token.player;
    if (holder.team !== team.name) return false;
    const c = getPlayerCell(holder);
    if (!c) return false;
    return board.getPlayersAt(c.x, c.y).some((p) => p.team !== team.name);
  }

  if (action instanceof HoldAction) {
    const hand = game.inPlay[team.name] || [];
    return hand.some((c) => c !== action);
  }

  if (action instanceof GrowingMenaceAction) return !team.hasTeamEffect('growingMenace');
  if (action instanceof NoPainNoGainAction) return !team.hasTeamEffect('noPainNoGain');
  if (action instanceof AlwaysMovingAction) return !team.hasTeamEffect('alwaysMoving');
  if (action instanceof PeakFitnessAction) return true;
  if (action instanceof FortressMentalityAction) return true;
  if (action instanceof SwitchGearsAction) return true;
  if (action instanceof DoOrDieAction) return !game.doOrDie[team.name];
  if (action instanceof GhostRunAction) {
    const holderEl = matchState.possession;
    if (!holderEl || !holderEl._token) return false;
    return holderEl._token.player.team === team.name;
  }
  if (action instanceof TheScriptAction) {
    return (team.availableActions || []).length > 0;
  }
  if (action instanceof VideoSessionAction) {
    return (team.discardedActions || []).length > 0;
  }

  if (action instanceof DrawFoulAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const holder = holderEl._token.player;
    if (holder.team === team.name) return false;
    const c = getPlayerCell(holder);
    if (!c) return false;
    return board.getPlayersAt(c.x, c.y).some((p) => p.team === team.name);
  }

  if (action instanceof TouchOfMagicAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const player = holderEl._token.player;
    if (player.team !== team.name) return false;
    if (player.dribbling <= 7 || player.speed <= 7 || player.shooting <= 7) return false;
    const c = getPlayerCell(player);
    if (!c) return false;
    const halfX = Math.floor(WIDTH / 2);
    const inOppositionHalf = team.side === 'left' ? c.x >= halfX : c.x < Math.ceil(WIDTH / 2);
    return inOppositionHalf;
  }

  if (action instanceof SiiiiuAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const player = holderEl._token.player;
    if (player.team !== team.name) return false;
    const c = getPlayerCell(player);
    if (!c) return false;
    return candidatesFrom(c.x, c.y, 2).some(
      ([nx, ny]) => action.play({ team, player, board, target: { x: nx, y: ny } }).success
    );
  }

  if (action instanceof ThroughBallAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const passer = holderEl._token.player;
    if (passer.team !== team.name) return false;
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        if (action.play({ passer, team, target: { x, y }, board }).success) return true;
      }
    }
    return false;
  }

  if (action instanceof OneTwoAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const passer = holderEl._token.player;
    if (passer.team !== team.name) return false;
    const c = getPlayerCell(passer);
    if (!c) return false;
    const attackingRight = team.side === 'left';
    const forward = attackingRight ? 1 : -1;
    for (let dy = -1; dy <= 1; dy++) {
      const nx = c.x + forward;
      const ny = c.y + dy;
      if (nx < 0 || nx >= WIDTH || ny < 0 || ny >= HEIGHT) continue;
      if (action.play({ passer, team, target: { x: nx, y: ny }, board }).success) return true;
    }
    return false;
  }

  if (action instanceof VolleyAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const shooter = holderEl._token.player;
    if (shooter.team !== team.name) return false;
    const c = getPlayerCell(shooter);
    if (!c) return false;
    const attackingRight = team.side === 'left';
    const inFinalThird = attackingRight ? c.x >= board.width - 3 : c.x <= 2;
    return inFinalThird;
  }

  if (action instanceof SwitchPlayAction) {
    const h = matchState.possession && matchState.possession._token.player;
    if (!h || h.team !== team.name) return false;
    const cell = getPlayerCell(h);
    if (!cell) return false;
    return cell.y === 0 || cell.y === HEIGHT - 1;
  }

  if (action instanceof UnderlapAction) {
    return team.currentPlayers.some((player) => action.play({ team, player, board }).success);
  }

  if (action instanceof OverloadAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    return holderEl._token.player.team === team.name;
  }
  if (action instanceof TriggerPressAction) {
    return team.currentPlayers.some((p) => p.position === 'DF');
  }
  if (action instanceof TacticalSubAction) {
    if (team.subsRemaining <= 0) return false;
    const outfield = team.currentPlayers.filter((p) => p.position !== 'GK');
    const bench = team.availableSubstitutes();
    return outfield.length > 0 && bench.length > 0;
  }
  if (action instanceof TriggerManMarkingAction) {
    return !team.hasTeamEffect('triggerManMarking');
  }
  if (action instanceof ParkTheMidfieldAction) {
    return team.currentPlayers.some((p) => p.position === 'MF');
  }

  if (action instanceof DesperationAction) {
    const opponent = board.getOpponent(team);
    return Boolean(opponent && game.score[opponent.name] > game.score[team.name]);
  }
  if (action instanceof GameManagementAction) {
    const opponent = board.getOpponent(team);
    return Boolean(opponent && game.score[team.name] > game.score[opponent.name]);
  }
  if (action instanceof TimeWastingAction) {
    const opponent = board.getOpponent(team);
    return Boolean(opponent && game.score[team.name] > game.score[opponent.name]);
  }
  if (action instanceof TempoControlAction) {
    return !team.hasTeamEffect('tempoControl');
  }
  if (action instanceof ShithouseryAction) {
    const opponent = board.getOpponent(team);
    return Boolean(opponent && game.inPlay[opponent.name] && game.inPlay[opponent.name].length > 0);
  }
  if (action instanceof BigMatchMentalityAction) {
    const isKnockout = (typeof worldCup !== 'undefined' && worldCup && worldCup.phase === 'knockout') ||
      (typeof tournament !== 'undefined' && tournament);
    return isKnockout;
  }
  if (action instanceof ExtraTimeAction) {
    return true;
  }

  if (action instanceof OneTwoWallAction) {
    return team.discardedActions.some((c) => c instanceof PassAction);
  }
  if (action instanceof MuscleMemoryAction) return true;
  if (action instanceof SecondWindAction) {
    return game.inPlay[team.name].some((c) => c !== action && c.category !== 'offense');
  }
  if (action instanceof TimeWallAction) return true;
  if (action instanceof VeteranBenchAction) {
    return team.exhaustedActions.length >= 3;
  }
  if (action instanceof YellowCardAction) {
    const opponent = board.getOpponent(team);
    return Boolean(
      opponent &&
        opponent.currentPlayers.some(
          (p) => getPlayerCell(p) && !p.hasEffect('scaredToTackle')
        )
    );
  }
  if (action instanceof RabonaAction) {
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    const shooter = holderEl._token.player;
    if (shooter.team !== team.name) return false;
    const opponent = board.getOpponent(team);
    const goalkeeper = opponent && opponent.currentGoalkeeper;
    if (!goalkeeper) return false;
    const shooterCell = getPlayerCell(shooter);
    const gkCell = getPlayerCell(goalkeeper);
    if (!shooterCell || !gkCell) return false;
    return (
      Math.max(Math.abs(shooterCell.x - gkCell.x), Math.abs(shooterCell.y - gkCell.y)) === 1
    );
  }
  if (action instanceof HatTrickHeroAction) {
    if (!game.score[team.name]) return false;
    const holderEl = matchState.possession;
    if (!holderEl) return false;
    if (holderEl._token.player.team !== team.name) return false;
    const c = getPlayerCell(holderEl._token.player);
    if (!c) return false;
    if (team.side === 'left') {
      if (c.x < WIDTH - 3) return false;
    } else if (c.x > 2) return false;
    return true;
  }

  return true;
}

function canPlayActionReason(team, action) {
  if (noticeOverlayActive) return 'Waiting for player input';
  if (deferredPlayActive) return 'Action in progress...';
  if (game.finished) return 'Game is over';
  if (team !== game.currentTeam) return 'Not your turn';
  const cost = game.effectiveCost(team, action);
  if (cost > game.actionPoints[team.name]) {
    return `Need ${cost} action point${cost !== 1 ? 's' : ''} (${game.actionPoints[team.name]} available)`;
  }

  if (game.inPlay[team.name].some((c) => c instanceof BrokenDefenseAction)) {
    if (
      action instanceof MarkingAction ||
      action instanceof PressAction ||
      action instanceof ForcedPressAction ||
      action instanceof TackleAction ||
      action instanceof RiskyTackleAction
    ) {
      return 'Blocked by Broken Defense';
    }
  }

  if (game.inPlay[team.name].some((c) => c instanceof LostDressingRoomAction)) {
    if (
      action instanceof FullPressureAction ||
      action instanceof ArgentoPrideAction ||
      action instanceof PepStyleAction ||
      action instanceof TriggerManMarkingAction ||
      action instanceof GameManagementAction ||
      action instanceof TempoControlAction ||
      action instanceof ComingHomeAction ||
      action instanceof UnderdogBiteAction ||
      action instanceof TotalFootballAction ||
      action instanceof AtlasWallAction ||
      action instanceof GarraCharruaAction ||
      action instanceof BrittleLittleBonesAction
    ) {
      return 'Blocked by Lost Dressing Room';
    }
  }

  if (game.inPlay[team.name].some((c) => c instanceof TacticalConfusionAction)) {
    if (action instanceof PassAction || action instanceof ThroughBallAction) {
      return 'Blocked by Tactical Confusion';
    }
  }

  if (game.inPlay[team.name].some((c) => c instanceof CaptainsMutinyAction)) {
    if (action instanceof InspirationAction || action instanceof BigMatchMentalityAction) {
      return "Blocked by Captain's Mutiny";
    }
  }

  const holderEl = matchState.possession;
  const hasPossession = Boolean(holderEl && holderEl._token.player.team === team.name);
  const opponentHasPossession = Boolean(holderEl && holderEl._token.player.team !== team.name);

  const possessionChecks = [PassAction, LongPassAction];
  if (possessionChecks.some((C) => action instanceof C)) {
    if (!hasPossession) return 'Your team needs the ball';
  }

  if (action instanceof LongBallAction) {
    if (!hasPossession) return 'Your team needs the ball';
    if (holderEl && holderEl._token.player.passing < 3) return 'Player needs Passing 3+';
  }

  if (action instanceof ShootAction) {
    if (!hasPossession) return 'Your team needs the ball';
    if (holderEl) {
      const c = getPlayerCell(holderEl._token.player);
      if (c) {
        if (team.side === 'left' && c.x < WIDTH - 3) return 'Player must be in the box';
        if (team.side === 'right' && c.x > 2) return 'Player must be in the box';
      }
    }
  }

  if (action instanceof LongShotAction) {
    if (!hasPossession) return 'Your team needs the ball';
    if (holderEl && holderEl._token.player.shooting < 7) return 'Player needs Shooting 7+';
  }

  if (action instanceof CannonballAction) {
    if (!hasPossession) return 'Your team needs the ball';
  }

  const tackleChecks = [TackleAction, RiskyTackleAction, ExpertTackleAction];
  if (tackleChecks.some((C) => action instanceof C)) {
    if (!opponentHasPossession) return 'Opponent needs the ball';
  }

  if (action instanceof MarkingAction) {
    if (!matchState.lastBallMove) return 'No pass to intercept';
    if (!opponentHasPossession) return 'Opponent needs the ball';
  }

  if (action instanceof PressAction || action instanceof ForcedPressAction) {
    if (!opponentHasPossession) return 'Opponent needs the ball';
  }

  if (action instanceof DribblingAction) {
    if (!hasPossession) return 'Your team needs the ball';
  }

  if (action instanceof FinishAction) {
    const opponent = board.getOpponent(team);
    if (!opponent || !board.inPenaltyBox(ball.x, ball.y, opponent.side)) return 'Ball must be in the box';
    if (!hasPossession) return 'Your team needs the ball';
  }

  if (action instanceof HeaderFinishAction || action instanceof KnockdownFinishAction) {
    const opponent = board.getOpponent(team);
    if (!opponent || !board.inPenaltyBox(ball.x, ball.y, opponent.side)) return 'Ball must be in the box';
    if (!hasPossession) return 'Your team needs the ball';
  }

  if (action instanceof SecondBallHeaderAction) {
    if (!matchState.lastShotSave) return 'No saved shot to follow up on';
    const opponent = board.getOpponent(team);
    if (!opponent || !board.inPenaltyBox(ball.x, ball.y, opponent.side)) return 'Ball must be in the box';
  }

  if (action instanceof RunAndCrossFlankAction) {
    if (!hasPossession) return 'Your team needs the ball';
    const h = holderEl ? holderEl._token.player : null;
    const c = h ? getPlayerCell(h) : null;
    if (c && board.getPlayersAt(c.x, c.y).some((p) => p.team !== team.name)) {
      return 'Ball carrier must be unmarked';
    }
  }

  if (action instanceof RunAndCrossAction) {
    if (!hasPossession) return 'Your team needs the ball';
    const h = holderEl ? holderEl._token.player : null;
    const c = h ? getPlayerCell(h) : null;
    const attackingRight = team.side === 'left';
    if (c && (attackingRight ? c.x < 5 : c.x > 3)) {
      return 'Ball carrier must be in the opposition half';
    }
  }

  if (action instanceof DribbleAndCrossAction) {
    if (!hasPossession) return 'Your team needs the ball';
    const h = holderEl ? holderEl._token.player : null;
    const c = h ? getPlayerCell(h) : null;
    if (c) {
      const marker = board.getPlayersAt(c.x, c.y).find((p) => p.team !== team.name);
      if (!marker) return 'Ball carrier must be marked';
    }
  }

  if (action instanceof CrossAction) {
    if (!hasPossession) return 'Your team needs the ball';
  }

  if (action instanceof SwitchPlayAction) {
    if (!hasPossession) return 'Your team needs the ball';
    const h = holderEl ? holderEl._token.player : null;
    const c = h ? getPlayerCell(h) : null;
    if (c && c.y !== 0 && c.y !== HEIGHT - 1) return 'Ball must be on a touchline (top or bottom row)';
  }

  const offBallChecks = [MoveAction, SlipAction, OffBallPlayAction, SprintAction, ShortSprintAction];
  if (offBallChecks.some((C) => action instanceof C)) {
    return 'No valid moves available';
  }

  if (action instanceof DesperationAction) {
    const opponent = board.getOpponent(team);
    if (!opponent || !(game.score[opponent.name] > game.score[team.name])) return 'Team must be losing';
  }

  if (action instanceof GameManagementAction) {
    const opponent = board.getOpponent(team);
    if (!opponent || !(game.score[team.name] > game.score[opponent.name])) return 'Team must be winning';
  }

  if (action instanceof TimeWastingAction) {
    const opponent = board.getOpponent(team);
    if (!opponent || !(game.score[team.name] > game.score[opponent.name])) return 'Team must be winning';
  }

  if (action instanceof BigMatchMentalityAction) {
    const isKnockout = (typeof worldCup !== 'undefined' && worldCup && worldCup.phase === 'knockout') ||
      (typeof tournament !== 'undefined' && tournament);
    if (!isKnockout) return 'Only in knockout matches';
  }

  if (action instanceof TriggerManMarkingAction) {
    if (team.hasTeamEffect('triggerManMarking')) return 'Already active';
  }

  if (action instanceof TempoControlAction) {
    if (team.hasTeamEffect('tempoControl')) return 'Already active';
  }

  if (action instanceof AlwaysMovingAction) {
    if (team.hasTeamEffect('alwaysMoving')) return 'Already active';
  }

  if (action instanceof ShithouseryAction) {
    const opponent = board.getOpponent(team);
    if (!opponent || !game.inPlay[opponent.name] || game.inPlay[opponent.name].length === 0) return 'Opponent needs in-play cards';
  }

  if (action instanceof OneTwoWallAction) {
    if (!team.discardedActions.some((c) => c instanceof PassAction)) return 'No Pass card in your discard pile';
  }

  if (action instanceof SecondWindAction) {
    const hand = game.inPlay[team.name];
    if (!hand.some((c) => c !== action && c.category !== 'offense')) return 'No non-offense cards to exhaust';
  }

  if (action instanceof VeteranBenchAction) {
    if (team.exhaustedActions.length < 3) return 'Need at least 3 cards in your exhaust pile';
  }

  if (action instanceof YellowCardAction) {
    const opponent = board.getOpponent(team);
    const hasTarget =
      opponent &&
      opponent.currentPlayers.some((p) => getPlayerCell(p) && !p.hasEffect('scaredToTackle'));
    if (!hasTarget) return 'No opposition player to book';
  }

  if (action instanceof RabonaAction) {
    if (!hasPossession) return 'Your team needs the ball';
    const opponent = board.getOpponent(team);
    const goalkeeper = opponent && opponent.currentGoalkeeper;
    if (!goalkeeper) return 'No opposition goalkeeper on the pitch';
    const holder = holderEl ? holderEl._token.player : null;
    const shooterCell = holder ? getPlayerCell(holder) : null;
    const gkCell = getPlayerCell(goalkeeper);
    if (!shooterCell || !gkCell) return 'Shooter or goalkeeper not on the pitch';
    if (Math.max(Math.abs(shooterCell.x - gkCell.x), Math.abs(shooterCell.y - gkCell.y)) !== 1) {
      return 'Must be adjacent to the opposition goalkeeper';
    }
  }

  if (action instanceof HatTrickHeroAction) {
    if (!game.score[team.name]) return 'Your team must have scored a goal first';
    if (!hasPossession) return 'Your team needs the ball';
    if (holderEl) {
      const c = getPlayerCell(holderEl._token.player);
      if (c) {
        if (team.side === 'left' && c.x < WIDTH - 3) return 'Player must be in the box';
        if (team.side === 'right' && c.x > 2) return 'Player must be in the box';
      }
    }
  }

  return null;
}
