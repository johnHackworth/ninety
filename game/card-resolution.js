function isOwnDefensiveZone(team, x) {
  return team.side === 'left' ? x <= 3 : x >= WIDTH - 1 - 3;
}

function foulTargetForBall(team) {
  const onPitch = team.currentPlayers;

  const bestByPassing = (pool) => pool.reduce((a, b) => (b.passing > a.passing ? b : a));

  // Fault in the fouled team's own defensive zone (its columns 0-3) -> DF with highest passing.
  if (isOwnDefensiveZone(team, ball.x)) {
    const dfs = onPitch.filter((p) => p.position === 'DF');
    if (dfs.length) return bestByPassing(dfs);
  }
  // Rest of the columns -> MF with highest passing.
  const mfs = onPitch.filter((p) => p.position === 'MF');
  if (mfs.length) return bestByPassing(mfs);

  const dfs = onPitch.filter((p) => p.position === 'DF');
  if (dfs.length) return bestByPassing(dfs);
  return null;
}

function closestEmptyCell(x, y, predicate) {
  let best = null;
  let bestDist = Infinity;
  for (let cx = 0; cx < WIDTH; cx++) {
    for (let cy = 0; cy < HEIGHT; cy++) {
      if (board.getPlayersAt(cx, cy).length > 0) continue;
      if (predicate && !predicate(cx, cy)) continue;
      const d = Math.abs(cx - x) + Math.abs(cy - y);
      if (d < bestDist) {
        bestDist = d;
        best = [cx, cy];
      }
    }
  }
  return best;
}

function placePlayerOn(player, x, y) {
  const el = tokenElForPlayer(player);
  if (el) moveTokenToCell(el, x, y);
}

function bestShooterOnPitch(team) {
  return team.currentPlayers.reduce((a, b) => (b.shooting > a.shooting ? b : a), team.currentPlayers[0]);
}

function grantPenaltyShootCard(team) {
  const card = new ShootAction({ ephemeral: true, exhaust: true, free: true });
  game.inPlay[team.name].push(card);
  game.markFree(card);
  logMatch(team.name, `Penalty for ${team.name}! A free Shoot card is added to the hand.`);
}

function moveFoulerBack(committer) {
  if (!committer) return;
  const c = getPlayerCell(committer);
  if (!c) return;
  if (c.x < 0 || c.x >= WIDTH || c.y < 0 || c.y >= HEIGHT) return;
  const backDir = TEAMS[committer.team].side === 'left' ? -1 : 1;
  for (let d = 1; ; d++) {
    const x = c.x + backDir * d;
    if (x < 0 || x >= WIDTH) break;
    if (board.getPlayersAt(x, c.y).length === 0) {
      placePlayerOn(committer, x, c.y);
      logMatch(committer.team, `${committer.name} is pushed back after the foul.`);
      return;
    }
  }
  const empty = [];
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      if (board.getPlayersAt(x, y).length === 0) empty.push([x, y]);
    }
  }
  if (empty.length) {
    const [x, y] = empty[Math.floor(Math.random() * empty.length)];
    placePlayerOn(committer, x, y);
    logMatch(committer.team, `${committer.name} is pushed back after the foul.`);
  }
}

function moveHolderAside(holder) {
  const c = getPlayerCell(holder);
  if (!c) return;
  const empty = closestEmptyCell(c.x, c.y);
  if (empty) placePlayerOn(holder, empty[0], empty[1]);
}

function resolvePenalty(team, holder) {
  const opponent = board.getOpponent(team);
  const attackingRight = team.side === 'left';
  const shooterX = attackingRight ? 7 : 1;
  const shooterY = 3;
  const gkX = attackingRight ? 8 : 0;
  const gkY = 3;

  // Determine which players to move: everyone except the kicker and goalkeepers.
  const shooter = bestShooterOnPitch(team);
  const chosen = getPlayerCell(shooter) ? shooter : holder;
  const teamGk = team.currentGoalkeeper || team.currentPlayers.find((p) => p.position === 'GK');
  const opponentGk = opponent.currentGoalkeeper || opponent.currentPlayers.find((p) => p.position === 'GK');

  // Move all players behind the penalty mark column (real football rules).
  // Attacking right: penalty mark at x=7, players must be at x < 7.
  // Attacking left:  penalty mark at x=1, players must be at x > 1.
  for (const t of Object.values(TEAMS)) {
    for (const p of [...t.currentPlayers]) {
      if (p === chosen || p === teamGk || p === opponentGk) continue;
      const c = getPlayerCell(p);
      if (!c) continue;
      const behind = attackingRight ? c.x < shooterX : c.x > shooterX;
      if (behind) continue;
      const free = closestEmptyCell(c.x, c.y, (cx, cy) => {
        return attackingRight ? cx < shooterX : cx > shooterX;
      });
      if (free) placePlayerOn(p, free[0], free[1]);
    }
  }

  // Place the kicker at the penalty mark.
  placePlayerOn(chosen, shooterX, shooterY);

  // Place the opposition goalkeeper in front of goal.
  if (opponentGk) {
    const currentGkCell = getPlayerCell(opponentGk);
    if (currentGkCell) {
      placePlayerOn(opponentGk, gkX, gkY);
    }
  }

  matchState.possession = tokenElForPlayer(chosen) || tokenElForPlayer(holder);
  moveBall(shooterX, shooterY);
  game.pendingPenalty = team.name;
  logMatch(team.name, `Penalty! ${chosen.name} steps up to take it.`, 'penalty');
  substitutionWindowOpen = true;
  humanNotice('PENALTY!');
}

function resolveFault(holder, committer) {
  const foulTeam = TEAMS[committer.team];
  if (foulTeam) game.recordFoul(foulTeam, committer);
  if (holder && game && game.matchEffect && game.matchEffect instanceof HeavyRainEffect) {
    if (!holder.injured && !holder.sentOff) {
      holder.addEffect('injured', Infinity);
      logMatch(holder.team, `${holder.name} is injured by the heavy rain mistake!`, 'injury');
      humanNotice('INJURY!');
    }
  }
  resetPositions();
  logMatch('', 'The referee calls the fault — all players return to their positions.');
  const team = TEAMS[holder.team];
  const opponent = board.getOpponent(team);

  if (board.inPenaltyBox(ball.x, ball.y, opponent.side)) {
    resolvePenalty(team, holder);
    return true;
  }

  const choice = foulTargetForBall(team) || holder;
  const chosen = getPlayerCell(choice) ? choice : holder;
  const el = tokenElForPlayer(chosen);
  if (el) {
    moveTokenToCell(el, ball.x, ball.y);
    matchState.possession = el;
  } else {
    const replacement = board
      .getPlayersAt(ball.x, ball.y)
      .find((p) => p.team === holder.team);
    matchState.possession = replacement ? tokenElForPlayer(replacement) : null;
  }
  updatePossession();

  game.freeKickProtection = {
    teamName: team.name,
    opponentName: opponent.name,
    x: ball.x,
    y: ball.y,
    turn: game.turn,
  };
  logMatch(
    team.name,
    `${team.name} must pass or move the ball out of this cell before the end of the turn — ${opponent.name} cannot enter it until then.`
  );

  substitutionWindowOpen = true;
  return false;
}

function enforceFreeKickProtection() {
  const prot = game.freeKickProtection;
  if (!prot) return;
  if (prot.turn === game.turn) return;
  game.freeKickProtection = null;
  if (ball.x !== prot.x || ball.y !== prot.y) return;

  const offender = board.getPlayersAt(prot.x, prot.y).find((p) => p.team === prot.teamName);
  if (!offender) return;

  const team = TEAMS[offender.team];
  const victimTeam = board.getOpponent(team);
  const card = game.refereeCard(offender);
  game.recordEvent({
    type: card === 'red' ? 'red' : 'yellow',
    team: team.name,
    player: offender.name,
  });
  logMatch(
    team.name,
    card === 'red'
      ? `RED CARD for ${offender.name}! ${team.name} failed to play the ball out of the free kick cell and he was already booked.`
      : `Yellow card for ${offender.name} — ${team.name} failed to play the ball out of the free kick cell.`,
    'card'
  );
  humanNotice(card === 'red' ? 'RED CARD!' : 'YELLOW CARD');
  if (card === 'red') {
    removeFromPitchAndSquad(team, offender);
    if (offender === team.currentGoalkeeper) onTeamLosesGoalkeeper(team, offender);
  }

  game.recordFoul(team, offender);

  if (board.inPenaltyBox(ball.x, ball.y, TEAMS[offender.team].side)) {
    resolvePenalty(victimTeam, offender);
    grantPenaltyShootCard(victimTeam);
    game.pendingPenalty = victimTeam.name;
    game.freeKickProtection = null;
    game.currentTeam = victimTeam;
    return;
  }

  resetPositions();
  logMatch('', 'The referee calls the fault — all players return to their positions.');
  const choice = foulTargetForBall(victimTeam);
  const chosen =
    choice && getPlayerCell(choice)
      ? choice
      : victimTeam.currentPlayers.find((p) => getPlayerCell(p));
  if (chosen) {
    const chosenEl = tokenElForPlayer(chosen);
    if (chosenEl) {
      moveTokenToCell(chosenEl, ball.x, ball.y);
      matchState.possession = chosenEl;
    }
  }
  updatePossession();

  grantFreeKickCards(victimTeam, { x: ball.x, y: ball.y });
  game.freeKickProtection = {
    teamName: victimTeam.name,
    opponentName: team.name,
    x: ball.x,
    y: ball.y,
    turn: game.turn,
  };
  game.currentTeam = victimTeam;
}

function grantFreeKickCards(team, ballPos) {
  const nearTouchline = ballPos && (ballPos.y === 0 || ballPos.y === HEIGHT - 1);
  const firstCard = nearTouchline
    ? new CrossAction({ ephemeral: true, exhaust: true, free: true })
    : new LongShotAction({ ephemeral: true, exhaust: true, free: true });
  const cards = [
    firstCard,
    new ShootAction({ ephemeral: true, exhaust: true, free: true }),
    new PassAction({ ephemeral: true, exhaust: true, free: true }),
  ];
  for (const card of cards) {
    game.inPlay[team.name].push(card);
    game.markFree(card);
  }
  const label = nearTouchline ? 'Cross' : 'Long shot';
  logMatch(team.name, `Free kick for ${team.name} — ephemeral ${label}, Shoot and Pass cards are added to the hand.`);
  humanNotice('FREE KICK');
}
function cellsAroundGoal(attackingRight) {
  const goalX = attackingRight ? WIDTH - 1 : 0;
  const goalY = Math.floor(HEIGHT / 2);
  const frontX = attackingRight ? goalX - 1 : goalX + 1;
  const cells = [];
  for (let dy = -1; dy <= 1; dy++) {
    cells.push([goalX, goalY + dy]);
    cells.push([frontX, goalY + dy]);
  }
  return cells;
}

function goalFrontCell(team) {
  return {
    x: team.side === 'left' ? 0 : WIDTH - 1,
    y: Math.floor(HEIGHT / 2),
  };
}

function aroundOwnGoalCells(team) {
  const goalX = team.side === 'left' ? 0 : WIDTH - 1;
  const frontX = team.side === 'left' ? 1 : WIDTH - 2;
  const goalY = Math.floor(HEIGHT / 2);
  const cells = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (const x of [goalX, frontX]) {
      if (x === goalX && goalY + dy === goalY) continue;
      cells.push([x, goalY + dy]);
    }
  }
  return cells;
}

function penaltyBoxCells(side) {
  const goalX = side === 'left' ? 0 : WIDTH - 1;
  const goalY = Math.floor(HEIGHT / 2);
  const frontX = side === 'left' ? goalX + 1 : goalX - 1;
  const cells = [];
  for (let dy = -1; dy <= 1; dy++) {
    cells.push([goalX, goalY + dy]);
    cells.push([frontX, goalY + dy]);
  }
  return cells;
}

function hitPostBounce(team) {
  const goalSide = team.side === 'left' ? 'right' : 'left';
  const cells = penaltyBoxCells(goalSide);
  const [x, y] = cells[Math.floor(Math.random() * cells.length)];
  ball.moveTo(x, y);

  const tokenEls = getTokensInCell(x, y);
  if (tokenEls.length === 2) {
    const [ta, tb] = tokenEls;
    const a = ta._token.player;
    const b = tb._token.player;
    const winner =
      a.tacticalThinking === b.tacticalThinking
        ? a.team === team.name
          ? ta
          : tb
        : a.tacticalThinking > b.tacticalThinking
          ? ta
          : tb;
    matchState.possession = winner;
    updatePossession();
    return winner._token.player;
  }

  updatePossession();
  return null;
}

function grantGkPassCard(gkTeam, goalkeeper) {
  const card = new PassAction({ ephemeral: true, exhaust: true, free: true });
  game.inPlay[gkTeam.name].push(card);
  game.markFree(card);
  matchState.gkHoldFrom = { player: goalkeeper, x: ball.x, y: ball.y };
  logMatch(
    gkTeam.name,
    `${goalkeeper.name} gathers the ball — ${gkTeam.name} gain an ephemeral Pass card to clear it.`
  );
}

async function afterShotModal({ team, action, result, goalkeepingCard, opponent }) {
  matchState.lastDribbledPlayer = null;
  game.recordShot(team, result.shooter);

  const { shootParts, gkParts } = buildShotFormulaParts(result);
  const formula = `${shootParts.join(' ')} = ${result.shooting} vs ${gkParts.join(' ')} = ${result.goalkeeping}`;

  if (result.scored) {
    const goalResult = game.recordGoal(
      team,
      result.shooter,
      result.handOfGod ? 'Hand of God' : undefined
    );
    game.recordEvent({
      type: 'goal',
      team: team.name,
      player: result.shooter.name,
      assist: goalResult.assist,
    });
    logMatch(
      team.name,
      result.handOfGod
        ? `GOAL! ${result.shooter.name} scores with the Hand of God for ${team.name}. (${formula})`
        : `GOAL! ${result.shooter.name} scores for ${team.name}. (${formula})`,
      'goal'
    );
    resetForRestart(opponent);
    substitutionWindowOpen = true;
  } else if (result.hitPost) {
    logMatch(team.name, `${result.shooter.name} hits the post! (${formula})`);
    const winner = hitPostBounce(team);
    if (winner && winner === result.goalkeeper) {
      grantGkPassCard(opponent, result.goalkeeper);
    }
  } else if (goalkeepingCard && goalkeepingCard.looseBall) {
    logMatch(team.name, `${result.shooter.name} shoots — loose ball! (${formula})`);
    const empty = cellsAroundGoal(team.side === 'left').filter(
      ([x, y]) => getTokensInCell(x, y).length === 0
    );
    if (empty.length > 0) {
      const [bx, by] = empty[Math.floor(Math.random() * empty.length)];
      moveBall(bx, by);
    } else {
      const gkEl = tokenElForPlayer(result.goalkeeper);
      const gkCell = getPlayerCell(result.goalkeeper);
      if (gkEl && gkCell) {
        ball.moveTo(gkCell.x, gkCell.y);
        matchState.possession = gkEl;
        updatePossession();
        grantGkPassCard(opponent, result.goalkeeper);
      }
    }
  } else {
    game.recordSave(opponent, result.goalkeeper);
    logMatch(
      team.name,
      `${result.shooter.name} shoots — ${result.goalkeeper.name} saves. (${formula})`
    );
    const gkEl = tokenElForPlayer(result.goalkeeper);
    const gkCell = getPlayerCell(result.goalkeeper);
    if (gkEl && gkCell) {
      ball.moveTo(gkCell.x, gkCell.y);
      matchState.possession = gkEl;
      updatePossession();
      grantGkPassCard(opponent, result.goalkeeper);
    }
  }

  if (goalkeepingCard) opponent.discardGoalkeeping(goalkeepingCard);

  const playResult = game.playAction(
    team,
    action,
    result.scored ? { endTurn: true, nextTeam: opponent } : {}
  );
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}

function resolveShoot(team, action) {
  const shooterEl = matchState.possession;
  if (!shooterEl) return;
  const shooter = shooterEl._token.player;
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const opponent = board.getOpponent(team);
  const goalkeepingCard = opponent.drawGoalkeepingCard();

  const result = action.play({ team, shooter, board, goalkeepingCard });

  if (!result.success && result.reason) {
    if (goalkeepingCard) opponent.availableGoalkeeping.push(goalkeepingCard);
    logAlert(result.reason);
    renderGame();
    return;
  }

  showShotResultModal({
    result,
    attackerCard: action,
    goalkeepingCard,
    onClose: () => afterShotModal({ team, action, result, goalkeepingCard, opponent }),
  });
}

function beginRunAndCrossTargeting(team, action) {
  cancelPending();
  const wingerEl = matchState.possession;
  if (!wingerEl) return;
  const winger = wingerEl._token.player;
  if (winger.team !== team.name) return;
  const opponent = board.getOpponent(team);
  const attackingRight = team.side === 'left';
  const antepenultimate = attackingRight ? WIDTH - 3 : 2;
  const candidates = team.currentPlayers.filter((player) => {
    if (board.isCramped(player)) return false;
    const c = getPlayerCell(player);
    if (!c) return false;
    const inBox = board.inPenaltyBox(c.x, c.y, opponent.side);
    const inCentralAntepenultimate = c.x === antepenultimate && c.y >= 2 && c.y <= HEIGHT - 3;
    return inBox || inCentralAntepenultimate;
  });
  pendingRunAndCross = { team, action, candidates, winger };

  for (const player of candidates) {
    const el = tokenElForPlayer(player);
    if (el) el.classList.add('cross-target');
  }

  renderInPlay();
  renderHint();
}

function resolveRunAndCross(target) {
  const pending = pendingRunAndCross;
  if (!pending) return;
  const { team, action } = pending;
  const winger = pending.winger;
  const wingerEl = tokenElForPlayer(winger);
  cancelPendingRunAndCross();
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const result = action.play({ team, board, winger, target });
  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  if (wingerEl) moveTokenToCell(wingerEl, result.to.x, result.to.y);
  moveBall(result.to.x, result.to.y);
  if (action instanceof DribbleAndCrossAction) {
    logMatch(team.name, `${winger.name} dribbles past the marker and runs forward with Dribble and cross!`);
  } else if (action instanceof RunAndCrossFlankAction) {
    logMatch(team.name, `${winger.name} runs one cell forward on the flank with Flank!`);
  } else {
    logMatch(team.name, `${winger.name} runs two cells forward on the flank with Run and cross!`);
  }

  if (result.forward) {
    const el = tokenElForPlayer(target);
    if (el) moveTokenToCell(el, result.forward.x, result.forward.y);
  }
  const targetCell = result.forward || result.targetCell;
  moveBall(targetCell.x, targetCell.y);

  const opponent = board.getOpponent(team);
  const goalkeepingCard = opponent.drawGoalkeepingCard();
  const shot = resolveShot({
    team,
    shooter: target,
    board,
    goalkeepingCard,
    shootingBonus: 0,
    useHeading: true,
  });

  if (!shot.success && shot.reason) {
    if (goalkeepingCard) opponent.availableGoalkeeping.push(goalkeepingCard);
    logAlert(shot.reason);
    renderGame();
    return;
  }
  if (game.handOfGod && game.handOfGod[team.name] > 0) {
    shot.scored = true;
    shot.hitPost = false;
    shot.handOfGod = true;
  }

  showShotResultModal({
    result: shot,
    attackerCard: action,
    goalkeepingCard,
    onClose: () => afterShotModal({ team, action, result: shot, goalkeepingCard, opponent }),
  });
}

function playShoot(team, action) {
  const holderEl = matchState.possession;
  if (!holderEl) return;
  resolveShoot(team, action);
}

function removeFromPitchAndSquad(team, player) {
  const el = tokenElForPlayer(player);
  if (el) el.remove();
  const index = team.currentPlayers.indexOf(player);
  if (index !== -1) team.currentPlayers.splice(index, 1);
}

function onTeamLosesGoalkeeper(team, gk) {
  if (!team.gkFormationSlot) {
    const slot = (team.formation || {})[gk.name];
    team.gkFormationSlot = slot ? { x: slot[0], y: slot[1] } : goalFrontCell(team);
  }
  team.currentGoalkeeper = null;
  const realGk = team.currentPlayers.find((p) => p.position === 'GK');
  if (realGk) {
    team.currentGoalkeeper = realGk;
    return;
  }
  const aiControlled =
    simulationMode || !team.controller || team.controller.type === 'ai';
  if (aiControlled) {
    const subGk = team.availableSubstitutes().find((p) => p.position === 'GK');
    if (subGk) {
      bringOnSubstituteGoalkeeper(team, subGk);
      return;
    }
  }
  const candidates = team.currentPlayers.filter((p) => !p.injured && !p.sentOff);
  if (candidates.length === 1) {
    assignActingGoalkeeper(team, candidates[0]);
  } else if (candidates.length > 1) {
    if (aiControlled) {
      const chosen = candidates[Math.floor(Math.random() * candidates.length)];
      assignActingGoalkeeper(team, chosen);
    } else {
      showActingGoalkeeperModal(team, candidates);
    }
  }
}

function bringOnSubstituteGoalkeeper(team, subGk) {
  const slot = team.gkFormationSlot || goalFrontCell(team);
  team.currentPlayers.push(subGk);
  team.currentGoalkeeper = subGk;
  team.formation[subGk.name] = [slot.x, slot.y];
  new PlayerToken({ player: subGk, teamColor: team.primaryColor, shorts: PlayerToken.shortsFor(team) }).placeIn(
    cell(slot.x, slot.y),
    team.side === 'left' ? 'left' : 'right'
  );
  logMatch(team.name, `${subGk.name} comes on as goalkeeper.`, 'sub');
  renderGame();
}

function assignActingGoalkeeper(team, chosen) {
  team.currentGoalkeeper = chosen;
  chosen.position = 'GK';
  const el = tokenElForPlayer(chosen);
  const front = goalFrontCell(team);
  if (el && board.canOccupy(front.x, front.y, [chosen])) {
    moveTokenToCell(el, front.x, front.y);
  }
  logMatch(team.name, `${chosen.name} takes over as goalkeeper.`, 'sub');
  renderGame();
}


function beginFinishTargeting(team, action) {
  cancelPending();
  const candidates = team.currentPlayers.filter((player) => {
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
  pendingFinish = { team, action, candidates };

  for (const player of candidates) {
    const el = tokenElForPlayer(player);
    if (el) el.classList.add('finish-player-target');
  }

  renderInPlay();
  renderHint();
}

function resolveFinish(player) {
  const pending = pendingFinish;
  if (!pending) return;
  const { team, action } = pending;
  cancelPendingFinish();
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const result = action.play({ team, player, board });
  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  const el = tokenElForPlayer(player);
  if (el) moveTokenToCell(el, result.target.x, result.target.y);
  if (result.follow && result.marker) {
    const markerEl = tokenElForPlayer(result.marker);
    if (markerEl) moveTokenToCell(markerEl, result.target.x, result.target.y);
  }
  moveBall(result.target.x, result.target.y);
  if (el) {
    matchState.possession = el;
    updatePossession();
  }

  const opponent = board.getOpponent(team);
  const goalkeepingCard = opponent.drawGoalkeepingCard();
  const isHeading = action instanceof HeaderFinishAction || action instanceof KnockdownFinishAction || action instanceof SecondBallHeaderAction;
  const shotBonus = action instanceof SecondBallHeaderAction ? 2 : 4;
  const shot = resolveShot({
    team,
    shooter: player,
    board,
    goalkeepingCard,
    shootingBonus: shotBonus,
    ...(isHeading ? { useHeading: true } : {}),
  });

  if (!shot.success && shot.reason) {
    if (goalkeepingCard) opponent.availableGoalkeeping.push(goalkeepingCard);
    logAlert(shot.reason);
    renderGame();
    return;
  }
  if (game.handOfGod && game.handOfGod[team.name] > 0) {
    shot.scored = true;
    shot.hitPost = false;
    shot.handOfGod = true;
  }

  showShotResultModal({
    result: shot,
    attackerCard: action,
    goalkeepingCard,
    onClose: () => afterShotModal({ team, action, result: shot, goalkeepingCard, opponent }),
  });
}

function resetPositions() {
  for (const teamName of Object.keys(TEAMS)) {
    for (const player of TEAMS[teamName].currentPlayers) {
      let pos;
      if (player === TEAMS[teamName].currentGoalkeeper && TEAMS[teamName].gkFormationSlot) {
        pos = TEAMS[teamName].gkFormationSlot;
      } else {
        pos = TEAMS[teamName].formation[player.name];
      }
      if (!pos) continue;
      const x = Array.isArray(pos) ? pos[0] : pos.x;
      const y = Array.isArray(pos) ? pos[1] : pos.y;
      const el = tokenElForPlayer(player);
      if (el) moveTokenToCell(el, x, y);
    }
  }
}

function kickoffTarget(team) {
  const centerX = 4;
  const centerY = Math.floor(HEIGHT / 2);
  const ownSide = team.side === 'left'
    ? (x) => x <= centerX
    : (x) => x >= centerX;

  let bestSameCol = null;
  let bestSameColDist = Infinity;
  let bestBehind = null;
  let bestBehindDist = Infinity;

  for (const player of team.currentPlayers) {
    const c = getPlayerCell(player);
    if (!c) continue;
    if (!ownSide(c.x)) continue;
    const dist = Math.abs(c.y - centerY);
    if (c.x === centerX && dist < bestSameColDist) {
      bestSameColDist = dist;
      bestSameCol = player;
    }
    const behindDist = Math.abs(c.x - centerX) + dist;
    if (behindDist < bestBehindDist) {
      bestBehindDist = behindDist;
      bestBehind = player;
    }
  }
  return bestSameCol || bestBehind;
}

function resetForRestart(possessionTeam) {
  resetPositions();

  const centerX = 4;
  const centerY = Math.floor(HEIGHT / 2);
  matchState.lastBallMove = null;

  ball.moveTo(centerX, centerY);

  const holder = board.getPlayersAt(centerX, centerY)
    .find((p) => p.team === possessionTeam.name);

  if (holder) {
    matchState.possession = tokenElForPlayer(holder);
    updatePossession();
    return;
  }

  const target = kickoffTarget(possessionTeam);
  if (!target) {
    matchState.possession = null;
    updatePossession();
    return;
  }

  matchState.possession = tokenElForPlayer(target);

  const tc = getPlayerCell(target);
  setTimeout(() => {
    ball.moveTo(tc.x, tc.y);
    updatePossession();
  }, 1000);
}


function beginCrossTargeting(team, action) {
  cancelPending();
  const opponent = board.getOpponent(team);
  const attackingRight = team.side === 'left';
  const antepenultimate = attackingRight ? WIDTH - 3 : 2;
  const candidates = team.currentPlayers.filter((player) => {
    if (board.isCramped(player)) return false;
    const c = getPlayerCell(player);
    if (!c) return false;
    const inBox = board.inPenaltyBox(c.x, c.y, opponent.side);
    const inCentralAntepenultimate =
      c.x === antepenultimate && c.y >= 2 && c.y <= HEIGHT - 3;
    return inBox || inCentralAntepenultimate;
  });
  pendingCross = { team, action, candidates };

  for (const player of candidates) {
    const el = tokenElForPlayer(player);
    if (el) el.classList.add('cross-target');
  }

  renderInPlay();
  renderHint();
}

function resolveCross(target) {
  const pending = pendingCross;
  if (!pending) return;
  const { team, action } = pending;
  const crosser = matchState.possession && matchState.possession._token.player;
  cancelPendingCross();
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const result = action.play({ team, board, target });
  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  if (crosser) game.recordPass(team, crosser);

  if (result.forward) {
    const el = tokenElForPlayer(target);
    if (el) moveTokenToCell(el, result.forward.x, result.forward.y);
  }
  const targetCell = result.forward || result.targetCell;
  moveBall(targetCell.x, targetCell.y);

  const opponent = board.getOpponent(team);
  const goalkeepingCard = opponent.drawGoalkeepingCard();
  const shot = resolveShot({
    team,
    shooter: target,
    board,
    goalkeepingCard,
    shootingBonus: 0,
    useHeading: true,
  });

  if (!shot.success && shot.reason) {
    if (goalkeepingCard) opponent.availableGoalkeeping.push(goalkeepingCard);
    logAlert(shot.reason);
    renderGame();
    return;
  }
  if (game.handOfGod && game.handOfGod[team.name] > 0) {
    shot.scored = true;
    shot.hitPost = false;
    shot.handOfGod = true;
  }

  showShotResultModal({
    result: shot,
    attackerCard: action,
    goalkeepingCard,
    onClose: () => afterShotModal({ team, action, result: shot, goalkeepingCard, opponent }),
  });
}

function beginCrampTargeting(team, action) {
  cancelPending();
  const opponent = board.getOpponent(team);
  const candidates = opponent.currentPlayers.filter((player) => {
    if (board.isCramped(player)) return false;
    return Boolean(getPlayerCell(player));
  });
  pendingCramp = { team, action, candidates };

  for (const player of candidates) {
    const el = tokenElForPlayer(player);
    if (el) el.classList.add('cramp-target');
  }

  renderInPlay();
  renderHint();
}

function resolveCramp(target) {
  const pending = pendingCramp;
  if (!pending) return;
  const { team, action } = pending;
  cancelPendingCramp();
  matchState.lastDribbledPlayer = null;

  const result = action.play({ team, board, target });
  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  target.addEffect('cramped', 1);
  game.recordEvent({ type: 'cramp', team: team.name, player: target.name });
  logMatch(team.name, `Cramp! ${target.name} is cramped for 1 turn.`);

  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);
  renderGame();
}

function flairActiveAgainst(team) {
  const defender = board.getOpponent(team);
  return Boolean(defender && game.flair && game.flair[defender.name]);
}




function parkReposition(team, player) {
  const c = getPlayerCell(player);
  if (!c) return null;
  const left = team.side === 'left';
  const limit = left ? 3 : WIDTH - 1 - 3;
  const past = left ? c.x > limit : c.x < limit;
  if (!past) return null;
  const maxInward = left ? limit : WIDTH - 1 - limit;
  const columns = [];
  for (let i = 0; i <= maxInward; i++) columns.push(limit + (left ? -i : i));
  for (const x of columns) {
    if (x < 0 || x >= WIDTH) continue;
    const yCands = [];
    for (let dy = 0; dy < HEIGHT; dy++) yCands.push(c.y + dy, c.y - dy);
    for (const y of yCands) {
      if (y < 0 || y >= HEIGHT) continue;
      if (board.canOccupy(x, y, [player])) return { x, y };
    }
  }
  return null;
}






function effectCardTypes() {
  const types = [];
  for (const Ctor of Object.values(StartingDeck.cardClass)) {
    if (typeof Ctor !== 'function' || Ctor === EurekaAction) continue;
    if (new Ctor().category === 'effect') types.push(Ctor);
  }
  return types;
}

function randomEffectCard() {
  const types = effectCardTypes();
  const Ctor = types[Math.floor(Math.random() * types.length)];
  return new Ctor();
}





let pendingLastDitchBlock = null;

function beginLastDitchBlockTargeting(team, action) {
  cancelPending();
  const holderEl = matchState.possession;
  if (!holderEl) return;
  const holder = holderEl._token.player;
  if (holder.team === team.name) return;
  const holderCell = getPlayerCell(holder);
  if (!holderCell) return;
  const candidates = team.currentPlayers.filter((p) => {
    const c = getPlayerCell(p);
    if (!c) return false;
    const dist = Math.max(Math.abs(c.x - holderCell.x), Math.abs(c.y - holderCell.y));
    return dist <= 1;
  });
  if (candidates.length === 0) return;
  pendingLastDitchBlock = { team, action, holder, candidates };
  for (const player of candidates) {
    const el = tokenElForPlayer(player);
    if (el) el.classList.add('tackle-target');
  }
  renderInPlay();
  renderHint();
}

function resolveLastDitchBlock(player) {
  const pending = pendingLastDitchBlock;
  if (!pending) return;
  const { team, action, holder } = pending;
  cancelPending();
  const result = action.play({ team, defender: player, board });
  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }
  const playResult = game.playAction(team, action);
  if (!playResult.success) {
    logAlert(playResult.reason);
    renderGame();
    return;
  }
  if (result.won) {
    const holderCell = getPlayerCell(holder);
    if (holderCell) {
      const emptyCells = [];
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = holderCell.x + dx;
          const ny = holderCell.y + dy;
          if (nx < 0 || nx >= WIDTH || ny < 0 || ny >= HEIGHT) continue;
          if (board.canOccupy(nx, ny, [])) emptyCells.push({ x: nx, y: ny });
        }
      }
      if (emptyCells.length > 0) {
        const target = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        moveBall(target.x, target.y);
      }
    }
    game.recordEvent({ type: 'lastDitchBlock', team: team.name, success: true });
    logMatch(team.name, `Last-Ditch Block! ${player.name} blocks the ball from ${holder.name}!`);
  } else {
    game.recordEvent({ type: 'lastDitchBlock', team: team.name, success: false });
    logMatch(team.name, `Last-Ditch Block! ${player.name} fails to block ${holder.name}.`);
  }
  renderGame();
}

let pendingClearance = null;

function beginClearanceTargeting(team, action) {
  cancelPending();
  const holderEl = matchState.possession;
  if (holderEl) {
    const holder = holderEl._token.player;
    if (holder.team === team.name && (holder.position === 'DF' || holder.position === 'GK')) {
      pendingClearance = { team, action, player: holder };
      executeAction(team, action, () => resolveClearance(holder));
      return;
    }
  }
  const ballCell = board.ballCell();
  const candidates = team.currentPlayers.filter((p) => {
    if (p.position !== 'DF' && p.position !== 'GK') return false;
    const c = getPlayerCell(p);
    if (!c) return false;
    const dist = Math.max(Math.abs(c.x - ballCell.x), Math.abs(c.y - ballCell.y));
    return dist === 1;
  });
  if (candidates.length === 0) return;
  pendingClearance = { team, action, candidates };
  for (const player of candidates) {
    const el = tokenElForPlayer(player);
    if (el) el.classList.add('tackle-target');
  }
  renderInPlay();
  renderHint();
}

function resolveClearance(player) {
  const pending = pendingClearance;
  if (!pending) return;
  const { team, action } = pending;
  cancelPending();
  const result = action.play({ team, player, board });
  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }
  const playResult = game.playAction(team, action);
  if (!playResult.success) {
    logAlert(playResult.reason);
    renderGame();
    return;
  }
  moveBall(result.target.x, result.target.y);
  game.recordEvent({ type: 'clearance', team: team.name });
  logMatch(team.name, `${player.name} clears the ball upfield!`);
  renderGame();
}





let pendingTacticalSub = null;

function beginTacticalSubTargeting(team, action) {
  cancelPending();
  pendingTacticalSub = { team, action };
  const outfield = team.currentPlayers.filter((p) => p.position !== 'GK');
  for (const player of outfield) {
    const el = tokenElForPlayer(player);
    if (el) el.classList.add('side-attack-player');
  }
  renderInPlay();
  renderHint('Select an outfield player to sub off · Esc to cancel');
}

function resolveTacticalSub(player) {
  const p = pendingTacticalSub;
  if (!p) return;
  pendingTacticalSub = null;
  const { team, action } = p;
  cancelPending();

  const result = action.play({ team, player, board });
  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  const replacement = result.replacement;
  const slot = team.formation && team.formation[player.name] ? { ...team.formation[player.name] } : null;
  team.substitute(player, replacement);
  if (slot) {
    team.formation[replacement.name] = slot;
    delete team.formation[player.name];
  }
  replacement.addEffect('wellRest', Infinity);
  const oldEl = tokenElForPlayer(player);
  if (oldEl) oldEl.remove();
  if (slot) placeTokenOnBoard(replacement, slot.x, slot.y);
  updatePossession();
  game.recordEvent({ type: 'sub', team: team.name, detail: `${player.name} → ${replacement.name}` });
  logMatch(team.name, `Tactical sub: ${player.name} off, ${replacement.name} on (well-rested: +2 all attributes).`);
  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);
  renderGame();
}



function showCardPickModal(title, subtitle, choices, onPick) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  const modal = document.createElement('div');
  modal.className = 'shot-modal halftime-modal card-pick-modal deck-pick-modal';
  const content = document.createElement('div');
  content.className = 'shot-modal-content halftime-content';
  const titleEl = document.createElement('div');
  titleEl.className = 'halftime-title';
  titleEl.textContent = title;
  content.appendChild(titleEl);
  const descEl = document.createElement('div');
  descEl.className = 'halftime-kickoff';
  descEl.textContent = subtitle;
  content.appendChild(descEl);
  const optionsWrap = document.createElement('div');
  optionsWrap.className = 'event-phase-options';
  for (const choice of choices) {
    const btn = document.createElement('button');
    btn.className = 'event-phase-option';
    btn.innerHTML =
      `<div class="event-option-label">${choice.label}</div>` +
      `<div class="event-option-desc">${choice.description || ''}</div>`;
    btn.addEventListener('click', () => {
      overlay.remove();
      onPick(choice.value);
    });
    optionsWrap.appendChild(btn);
  }
  content.appendChild(optionsWrap);
  modal.appendChild(content);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function beginTheScriptTargeting(team, action) {
  const seen = new Set();
  const choices = [];
  for (const card of team.availableActions) {
    if (seen.has(card.name)) continue;
    seen.add(card.name);
    choices.push({ label: card.name, description: card.description || '', value: card });
  }
  if (choices.length === 0) return;
  showCardPickModal(
    'THE SCRIPT',
    'Search your deck — pick any card to add to your hand:',
    choices,
    (cardObj) => resolveTheScript(team, action, cardObj)
  );
}

function resolveTheScript(team, action, cardObj) {
  const index = team.availableActions.indexOf(cardObj);
  if (index !== -1) {
    team.availableActions.splice(index, 1);
    game.inPlay[team.name].push(cardObj);
    logMatch(team.name, `The script unfolds: ${cardObj.name} is pulled straight from the deck into the hand.`);
  }
  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);
  renderGame();
}

function beginVideoSessionTargeting(team, action) {
  const seen = new Set();
  const choices = [];
  for (const card of team.discardedActions) {
    if (seen.has(card.name)) continue;
    seen.add(card.name);
    choices.push({
      label: card.name,
      description: card.description || '',
      value: card.constructor,
    });
  }
  if (choices.length === 0) return;
  showCardPickModal(
    'VIDEO SESSION',
    'Study the footage — pick a discarded card. Two copies arrive next turn:',
    choices,
    (Ctor) => resolveVideoSession(team, action, Ctor)
  );
}

function resolveVideoSession(team, action, Ctor) {
  game.videoSession[team.name] = Ctor;
  logMatch(team.name, `Video session booked: two copies of ${new Ctor().name} arrive next turn.`);
  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);
  renderGame();
}

function aiScriptScore(card) {
  const offensive = ['Shoot', 'Finish', 'Header finish', 'Long shot', 'Cross', 'Volley'];
  if (offensive.includes(card.name)) return 100;
  return (card.constructor && card.constructor.rarity) || 0;
}

function aiPickScriptCard(team) {
  const hand = game.inPlay[team.name] || [];
  const candidates = (team.availableActions || []).filter(
    (c) => !hand.some((h) => h.name === c.name)
  );
  if (candidates.length === 0) return null;
  return candidates.reduce((a, b) => (aiScriptScore(b) > aiScriptScore(a) ? b : a));
}

function aiPickVideoSessionCard(team) {
  const seen = new Set();
  const candidates = [];
  for (const card of team.discardedActions || []) {
    if (seen.has(card.name)) continue;
    seen.add(card.name);
    candidates.push(card);
  }
  if (candidates.length === 0) return null;
  return candidates.reduce((a, b) => (aiScriptScore(b) >= aiScriptScore(a) ? b : a)).constructor;
}

function aiPickHoldTarget(team, action) {
  const hand = game.inPlay[team.name] || [];
  let best = null;
  let bestScore = -1;
  for (const card of hand) {
    if (card instanceof HoldAction) continue;
    const score = (card.constructor && card.constructor.rarity) || 0;
    if (score > bestScore) {
      bestScore = score;
      best = card;
    }
  }
  return bestScore >= 2 ? best : null;
}

function beginShithouseryTargeting(team, action) {
  cancelPending();
  const opponent = board.getOpponent(team);
  const oppHand = opponent && game.inPlay[opponent.name];
  if (!oppHand || oppHand.length === 0) {
    logAlert('Opponent has no cards to discard');
    renderGame();
    return;
  }
  pendingShithousery = { team, action };
  renderInPlay();
  renderHint();
}

function resolveShithousery(targetCard) {
  const pending = pendingShithousery;
  if (!pending) return;
  const { team, action } = pending;
  cancelPendingShithousery();
  const opponent = board.getOpponent(team);
  const oppHand = game.inPlay[opponent.name];
  if (!oppHand || !oppHand.includes(targetCard)) {
    logAlert('Target card is no longer in opponent\'s hand');
    renderGame();
    return;
  }
  oppHand.splice(oppHand.indexOf(targetCard), 1);
  opponent.useAction(targetCard);
  game.recordEvent({ type: 'shithousery', team: team.name, card: targetCard.name });
  logMatch(team.name, `Shithousery! ${opponent.name} discards ${targetCard.name}.`);
  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);
  renderGame();
}

function beginHoldTargeting(team, action) {
  cancelPending();
  const hand = game.inPlay[team.name];
  if (!hand || hand.filter((c) => c !== action).length === 0) {
    logAlert('No other cards in hand to hold');
    renderGame();
    return;
  }
  pendingHold = { team, action };
  renderInPlay();
  renderHint();
}

function resolveHold(targetCard) {
  const pending = pendingHold;
  if (!pending) return;
  const { team, action } = pending;
  cancelPendingHold();
  const hand = game.inPlay[team.name];
  if (!hand || !hand.includes(targetCard)) {
    logAlert('Target card is no longer in your hand');
    renderGame();
    return;
  }
  if (!game.heldCards[team.name]) game.heldCards[team.name] = [];
  if (!game.heldCards[team.name].includes(targetCard)) {
    game.heldCards[team.name].push(targetCard);
  }
  targetCard.hold = true;
  game.recordEvent({ type: 'hold', team: team.name, card: targetCard.name });
  logMatch(team.name, `${targetCard.name} is held — it stays in hand until played.`);
  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);
  renderGame();
}








function beginYellowCardTargeting(team, action) {
  cancelPending();
  const opponent = board.getOpponent(team);
  const candidates = opponent.currentPlayers.filter((player) => {
    if (player.hasEffect('scaredToTackle')) return false;
    return Boolean(getPlayerCell(player));
  });
  pendingYellowCard = { team, action, candidates };

  for (const player of candidates) {
    const el = tokenElForPlayer(player);
    if (el) el.classList.add('yellowcard-target');
  }

  renderInPlay();
  renderHint();
}

function resolveYellowCard(target) {
  const pending = pendingYellowCard;
  if (!pending) return;
  const { team, action } = pending;
  cancelPendingYellowCard();

  const result = action.play({ team, board, target });
  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  target.addEffect('scaredToTackle', Infinity);
  game.recordEvent({ type: 'yellowCard', team: team.name, player: target.name });
  logMatch(
    team.name,
    `Yellow card! ${target.name} is booked — their next tackle attempt will automatically fail.`
  );

  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);
  renderGame();
}


















function beginHardTackleTargeting(team, action) {
  cancelPending();
  const holderEl = matchState.possession;
  if (!holderEl) return;
  const holder = holderEl._token.player;
  const holderCell = getPlayerCell(holder);
  if (!holderCell) return;
  const holderAlone = board.getPlayersAt(holderCell.x, holderCell.y).length <= 1;

  const tacklers = team.currentPlayers.filter((player) => {
    const c = getPlayerCell(player);
    if (!c) return false;
    const sameCell = c.x === holderCell.x && c.y === holderCell.y;
    const adjacent =
      Math.max(Math.abs(c.x - holderCell.x), Math.abs(c.y - holderCell.y)) === 1;
    return sameCell || (adjacent && holderAlone);
  });
  pendingHardTackle = { team, action, tacklers };

  for (const player of tacklers) {
    const el = tokenElForPlayer(player);
    if (el) el.classList.add('hard-tackle-target');
  }

  renderInPlay();
  renderHint();
}

function resolveHardTackle(tacklerEl) {
  const pending = pendingHardTackle;
  if (!pending) return;
  const { team, action } = pending;
  const tackler = tacklerEl._token.player;
  cancelPendingHardTackle();
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const holder = board.getBallHolder();
  const result = action.play({ team, tackler, holder, board });
  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  showHardTackleModal({ team, action, tackler, holder, result });
}


function resolveMove(x, y) {
  const pending = pendingMove;
  if (!pending) return;

  const { team, action, player } = pending;
  cancelPendingMove();
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const result = action.play({ team, player, target: { x, y }, board });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  const playerEl = tokenElForPlayer(player);
  const ballWasLoose = !matchState.possession;
  if (playerEl) moveTokenToCell(playerEl, x, y);

  if (result.follow && result.marker) {
    const markerEl = tokenElForPlayer(result.marker);
    if (markerEl) moveTokenToCell(markerEl, x, y);
  }

  const holder = matchState.possession && matchState.possession._token.player;
  if (holder === player || (result.follow && holder === result.marker)) {
    moveBall(x, y);
  } else {
    updatePossession();
  }

  const collectsLooseBall =
    ballWasLoose &&
    player.position === 'GK' &&
    ball.x === x &&
    ball.y === y &&
    aroundOwnGoalCells(team).some(([cx, cy]) => cx === x && cy === y) &&
    getTokensInCell(x, y).filter((el) => el._token.player !== player).length === 0;
  if (collectsLooseBall) {
    matchState.gkCollectReturn = { team: team.name };
    logMatch(team.name, `${player.name} comes off his line to collect the loose ball.`);
  }

  logMatch(
    team.name,
    `${player.name} moves to (${x},${y}).${result.follow ? ` ${result.marker.name} follows.` : ''}`
  );

  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}

function resolveSlip(x, y) {
  const pending = pendingSlip;
  if (!pending) return;

  const { team, action, player } = pending;
  cancelPendingSlip();
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const result = action.play({ team, player, target: { x, y }, board });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  const playerEl = tokenElForPlayer(player);
  if (playerEl) moveTokenToCell(playerEl, x, y);
  updatePossession();

  logMatch(
    team.name,
    `${player.name} slips away to (${x},${y}) and the marker holds position.`
  );

  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}

function resolveLongBall(x, y) {
  const pending = pendingLongBall;
  if (!pending) return;

  const { team, action } = pending;
  cancelPendingLongBall();
  matchState.lastDribbledPlayer = null;

  const result = action.play({
    team,
    passer: matchState.possession ? matchState.possession._token.player : null,
    target: { x, y },
    board,
  });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  moveBall(x, y);
  matchState.lastBallMove = { x, y };

  const passer = matchState.possession ? matchState.possession._token.player : null;
  const receiverTokens = getTokensInCell(x, y).filter(
    (el) => el._token.player.team === team.name
  );
  if (receiverTokens.length > 0 && passer) game.recordPass(team, passer);
  logMatch(
    team.name,
    receiverTokens.length > 0
      ? `Long ball from ${passer ? passer.name : '?'} finds ${receiverTokens[0]._token.player.name} at (${x},${y}).`
      : `Long ball from ${passer ? passer.name : '?'} to (${x},${y}) — no one receives it, loose ball.`
  );

  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}


function resolvePass(x, y) {
  const pending = pendingPass;
  if (!pending) return;

  const { team, action, passer } = pending;
  cancelPendingPass();
  matchState.lastDribbledPlayer = null;

  const maxRange = game.pepStyle && game.pepStyle[team.name] > 0 ? 3 : 2;
  const result = action.play({ passer, team, target: { x, y }, board, maxRange });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  moveBall(x, y);
  matchState.lastBallMove = { x, y };

  if (result.intercepted && result.interceptor) {
    shakeScreen();
    const el = tokenElForPlayer(result.interceptor);
    if (el) {
      matchState.possession = el;
      updatePossession();
    }
    game.clearLastPass();
  } else {
    game.recordPass(team, passer);
  }

  logMatch(
    team.name,
    result.intercepted && result.interceptor
      ? `Pass from ${passer.name} is intercepted by ${result.interceptor.name}!`
      : `Pass from ${passer.name} to (${x},${y}).`
  );

  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}

function resolveLongPassCell(x, y) {
  const pending = pendingLongPass;
  if (!pending) return;

  const { team, action, passer } = pending;
  cancelPendingLongPass();
  matchState.lastDribbledPlayer = null;

  const result = action.play({ passer, team, target: { x, y }, board });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  moveBall(x, y);
  matchState.lastBallMove = { x, y };

  if (result.intercepted && result.interceptor) {
    shakeScreen();
    const el = tokenElForPlayer(result.interceptor);
    if (el) {
      matchState.possession = el;
      updatePossession();
    }
    game.clearLastPass();
  } else {
    game.recordPass(team, passer);
  }

  logMatch(
    team.name,
    result.intercepted && result.interceptor
      ? `Long pass from ${passer.name} is intercepted by ${result.interceptor.name}!`
      : `Long pass from ${passer.name} to (${x},${y}).`
  );

  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}
function resolveOffBallCell(x, y) {
  const p = pendingOffBall;
  if (!p) return;
  const player = p.currentPlayer;
  const c = getPlayerCell(player);
  const marker = opponentInCell(c.x, c.y, p.team) || null;
  p.moves.push({ player, marker, target: { x, y } });
  p.currentPlayer = null;

  for (const el of pitch.querySelectorAll('.cell.offball-cell-target')) {
    el.classList.remove('offball-cell-target');
  }

  if (p.moves.length >= 3) {
    resolveOffBallPlay();
  } else {
    highlightOffBallPlayers();
    renderInPlay();
    renderHint();
  }
}
function resolveOffBallPlay() {
  const p = pendingOffBall;
  if (!p) return;
  cancelPendingOffBall();
  matchState.lastDribbledPlayer = null;

  const result = p.action.play({ team: p.team, board, moves: p.moves });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  for (const { player, marker, target } of p.moves) {
    const el = tokenElForPlayer(player);
    if (el) moveTokenToCell(el, target.x, target.y);
    if (marker) {
      const markerEl = tokenElForPlayer(marker);
      if (markerEl) moveTokenToCell(markerEl, target.x, target.y);
    }
  }

  logMatch(
    p.team.name,
    `Off-ball play: ${p.moves.map((m) => m.player.name).join(', ')} repositioned off the ball.`
  );

  updatePossession();

  const playResult = game.playAction(p.team, p.action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}
async function resolveDribble(x, y) {
  const p = pendingDribble;
  if (!p) return;
  cancelPendingDribble();

  const result = p.action.play({ team: p.team, player: p.player, board, target: { x, y } });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  const el = tokenElForPlayer(p.player);
  if (el) moveTokenToCell(el, x, y);
  moveBall(x, y);

  const attackingRight = p.team.side === 'left';
  const goalCell = {
    x: attackingRight ? WIDTH - 1 : 0,
    y: Math.floor(HEIGHT / 2),
  };
  const scores = result.dribbled && x === goalCell.x && y === goalCell.y;

  if (!result.dribbled) {
    shakeScreen();
  } else if (!scores) {
    sparkleAt(x, y);
  }

  if (scores) {
    matchState.lastDribbledPlayer = null;
    const opponent = board.getOpponent(p.team);
    const goalResult = game.recordGoal(p.team, p.player);
    game.recordEvent({
      type: 'goal',
      team: p.team.name,
      player: p.player.name,
      assist: goalResult.assist,
    });
    logMatch(
      p.team.name,
      `GOAL! ${p.player.name} dribbles past ${result.marker.name} into the net for ${p.team.name}.`,
      'goal'
    );
    await humanNotice(`GOAL! ${p.player.name} scores for ${p.team.name}!`);
    resetForRestart(opponent);
    substitutionWindowOpen = true;
    const playResult = game.playAction(p.team, p.action, { endTurn: true, nextTeam: opponent });
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
    return;
  }

  logMatch(p.team.name, `${p.player.name} dribbles into (${x},${y}).`);

  const playResult = game.playAction(p.team, p.action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}
function resolveFeintTurn(x, y) {
  const p = pendingFeintTurn;
  if (!p) return;
  cancelPendingFeintTurn();

  const result = p.action.play({ team: p.team, player: p.player, board, target: { x, y } });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  if (!result.feinted) {
    shakeScreen();
    logMatch(
      p.team.name,
      `${p.player.name} tries to feint but ${result.marker.name} reads it — no move.`
    );
  } else {
    sparkleAt(x, y);
    const el = tokenElForPlayer(p.player);
    if (el) moveTokenToCell(el, x, y);
    moveBall(x, y);
    if (result.markerStays) {
      logMatch(
        p.team.name,
        `${p.player.name} feints to (${x},${y}) and ${result.marker.name} holds position.`
      );
    } else {
      const markerEl = tokenElForPlayer(result.marker);
      if (markerEl)
        moveTokenToCell(markerEl, result.markerTarget.x, result.markerTarget.y);
      logMatch(
        p.team.name,
        `${p.player.name} feints to (${x},${y}) and drags ${result.marker.name} to (${result.markerTarget.x},${result.markerTarget.y}).`
      );
    }
  }

  const playResult = game.playAction(p.team, p.action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}
function resolveTouchOfMagic(x, y) {
  const p = pendingTouchOfMagic;
  if (!p) return;
  cancelPendingTouchOfMagic();
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const result = p.action.play({ team: p.team, player: p.player, board, target: { x, y } });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  const el = tokenElForPlayer(p.player);
  if (el) moveTokenToCell(el, x, y);
  moveBall(x, y);
  if (el) {
    matchState.possession = el;
    updatePossession();
  }

  logMatch(p.team.name, `${p.player.name} weaves through with a touch of magic to (${x},${y}).`);

  const opponent = board.getOpponent(p.team);
  const goalkeepingCard = opponent.drawGoalkeepingCard();
  const shot = resolveShot({
    team: p.team,
    shooter: p.player,
    board,
    goalkeepingCard,
    shootingBonus: 2,
  });

  if (!shot.success && shot.reason) {
    if (goalkeepingCard) opponent.availableGoalkeeping.push(goalkeepingCard);
    logAlert(shot.reason);
    renderGame();
    return;
  }

  showShotResultModal({
    result: shot,
    attackerCard: p.action,
    goalkeepingCard,
    onClose: () => afterShotModal({ team: p.team, action: p.action, result: shot, goalkeepingCard, opponent }),
  });
}
function resolveSiiiiu(x, y) {
  const p = pendingSiiiiu;
  if (!p) return;
  cancelPendingSiiiiu();
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const result = p.action.play({ team: p.team, player: p.player, board, target: { x, y } });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  const el = tokenElForPlayer(p.player);
  if (el) moveTokenToCell(el, x, y);
  moveBall(x, y);
  if (el) {
    matchState.possession = el;
    updatePossession();
  }

  logMatch(p.team.name, `${p.player.name} shouts Siiiiu!, sprints to (${x},${y}) and shoots!`);

  const opponent = board.getOpponent(p.team);
  const goalkeepingCard = opponent.drawGoalkeepingCard();
  const shot = resolveShot({
    team: p.team,
    shooter: p.player,
    board,
    goalkeepingCard,
    shootingBonus: 2,
  });

  if (!shot.success && shot.reason) {
    if (goalkeepingCard) opponent.availableGoalkeeping.push(goalkeepingCard);
    logAlert(shot.reason);
    renderGame();
    return;
  }

  showShotResultModal({
    result: shot,
    attackerCard: p.action,
    goalkeepingCard,
    onClose: () => afterShotModal({ team: p.team, action: p.action, result: shot, goalkeepingCard, opponent }),
  });
}
function resolveThroughBall(x, y) {
  const p = pendingThroughBall;
  if (!p) return;
  cancelPendingThroughBall();
  matchState.lastDribbledPlayer = null;

  const result = p.action.play({ passer: p.passer, team: p.team, target: { x, y }, board });
  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  moveBall(x, y);
  matchState.lastBallMove = { x, y };

  if (result.intercepted && result.interceptor) {
    shakeScreen();
    const el = tokenElForPlayer(result.interceptor);
    if (el) {
      matchState.possession = el;
      updatePossession();
    }
  } else {
    game.clearLastPass();
  }

  logMatch(
    p.team.name,
    result.intercepted && result.interceptor
      ? `Through ball from ${p.passer.name} is intercepted by ${result.interceptor.name}!`
      : `Through ball from ${p.passer.name} to (${x},${y}).`
  );

  const playResult = game.playAction(p.team, p.action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}
function resolveOneTwo(x, y) {
  const p = pendingOneTwo;
  if (!p) return;
  cancelPendingOneTwo();
  matchState.lastDribbledPlayer = null;

  const result = p.action.play({ passer: p.passer, team: p.team, target: { x, y }, board });
  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  const startCell = board.getPlayerCell(p.player);
  if (
    puddlesActive() &&
    result.dribbled &&
    startCell &&
    startCell.x >= 3 &&
    startCell.x <= 5 &&
    Math.random() < 0.1
  ) {
    const marker = result.marker;
    logMatch(
      board.getOpponent(p.team).name,
      `${p.player.name} slips in a puddle and the ball squirts to ${marker ? marker.name : 'the other team'}!`
    );
    if (marker && tokenElForPlayer(marker)) {
      matchState.possession = tokenElForPlayer(marker);
      updatePossession();
    }
    const playResult = game.playAction(p.team, p.action, {
      endTurn: true,
      nextTeam: board.getOpponent(p.team),
    });
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
    return;
  }

  const el = tokenElForPlayer(p.player);
  if (el) moveTokenToCell(el, x, y);

  if (result.intercepted && result.interceptor) {
    shakeScreen();
    moveBall(x, y);
    matchState.lastBallMove = { x, y };
    const interceptorEl = tokenElForPlayer(result.interceptor);
    if (interceptorEl) {
      matchState.possession = interceptorEl;
      updatePossession();
    }
    logMatch(p.team.name, `One-two pass from ${p.passer.name} is intercepted by ${result.interceptor.name}!`);
    const playResult = game.playAction(p.team, p.action);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
    return;
  }

  moveBall(x, y);
  matchState.lastBallMove = { x, y };

  const passerEl = tokenElForPlayer(p.passer);
  if (passerEl) moveTokenToCell(passerEl, result.sprintTarget.x, result.sprintTarget.y);

  if (result.marker) {
    const markerEl = tokenElForPlayer(result.marker);
    if (markerEl) moveTokenToCell(markerEl, result.sprintTarget.x, result.sprintTarget.y);
  }

  sparkleAt(x, y);

  if (passerEl) {
    matchState.possession = passerEl;
    updatePossession();
  }

  logMatch(
    p.team.name,
    `${p.passer.name} plays a one-two with ${result.receiver.name} and sprints to (${result.sprintTarget.x},${result.sprintTarget.y}).${result.marker ? ` ${result.marker.name} follows.` : ''}`
  );

  const playResult = game.playAction(p.team, p.action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}
function resolveVolley(team, action) {
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const holderEl = matchState.possession;
  if (!holderEl) return;
  const shooter = holderEl._token.player;
  if (shooter.team !== team.name) return;

  const opponent = board.getOpponent(team);
  const goalkeepingCard = opponent.drawGoalkeepingCard();
  const shot = action.play({ team, shooter, board, goalkeepingCard });
  if (!shot.success && shot.reason) {
    if (goalkeepingCard) opponent.availableGoalkeeping.push(goalkeepingCard);
    logAlert(shot.reason);
    renderGame();
    return;
  }
  if (game.handOfGod && game.handOfGod[team.name] > 0) {
    shot.scored = true;
    shot.hitPost = false;
    shot.handOfGod = true;
  }

  showShotResultModal({
    result: shot,
    attackerCard: action,
    goalkeepingCard,
    onClose: () => afterShotModal({ team, action, result: shot, goalkeepingCard, opponent }),
  });
}
function resolveSwitchPlay(x, y) {
  const pending = pendingSwitchPlay;
  if (!pending) return;
  const { team, action } = pending;
  cancelPendingSwitchPlay();
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const result = action.play({ team, board, target: { x, y } });
  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }
  if (!result.success) {
    return;
  }

  moveBall(result.target.x, result.target.y);
  matchState.lastBallMove = { x: result.target.x, y: result.target.y };

  if (result.intercepted && result.interceptor) {
    shakeScreen();
    matchState.possession = tk(result.interceptor);
    updatePossession();
  }

  logMatch(
    team.name,
    result.intercepted && result.interceptor
      ? `Switch play is intercepted by ${result.interceptor.name}!`
      : `Switch play to (${result.target.x},${result.target.y}).`
  );

  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}
function resolveUnderlap(player) {
  const p = pendingUnderlap;
  if (!p) return;
  cancelPendingUnderlap();
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const result = p.action.play({ team: p.team, player, board });
  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  const sprintEl = tokenElForPlayer(result.other);
  if (sprintEl) moveTokenToCell(sprintEl, result.target.x, result.target.y);

  const h = matchState.possession && matchState.possession._token.player;
  if (h === result.other) {
    moveBall(result.target.x, result.target.y);
  } else {
    updatePossession();
  }

  logMatch(
    p.team.name,
    `${result.other.name} overlaps ${player.name} and runs to (${result.target.x},${result.target.y}).`
  );

  const playResult = game.playAction(p.team, p.action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}
function resolveSprint(x, y) {
  const p = pendingSprint;
  if (!p) return;
  const { team, action, player } = p;
  cancelPendingSprint();
  matchState.lastDribbledPlayer = null;

  const result = action.play({ team, player, board, target: { x, y } });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  const el = tokenElForPlayer(player);
  if (el) moveTokenToCell(el, x, y);

  if (result.follow && result.marker) {
    const markerEl = tokenElForPlayer(result.marker);
    if (markerEl) moveTokenToCell(markerEl, x, y);
  }

  const holder = matchState.possession && matchState.possession._token.player;
  if (holder === player || (result.follow && holder === result.marker)) {
    moveBall(x, y);
  } else {
    updatePossession();
  }

  const isShort = action instanceof ShortSprintAction;
  logMatch(
    team.name,
    `${player.name} ${isShort ? 'short-sprints' : 'sprints'} to (${x},${y}).${result.follow ? ` ${result.marker.name} follows.` : ''}`
  );

  if (isShort) {
    player.addEffect('cramped', 3);
    logMatch(team.name, `${player.name} is now cramped for 3 turns.`);
  }

  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}
function resolveOverlap(player) {
  const p = pendingOverlap;
  if (!p) return;
  const { team, action } = p;
  cancelPendingOverlap();
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const result = action.play({ team, player, board });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  const { target } = result;
  const el = tokenElForPlayer(player);
  if (el) moveTokenToCell(el, target.x, target.y);

  if (result.follow && result.marker) {
    const markerEl = tokenElForPlayer(result.marker);
    if (markerEl) moveTokenToCell(markerEl, target.x, target.y);
  }

  const holder = matchState.possession && matchState.possession._token.player;
  if (holder === player || (result.follow && holder === result.marker)) {
    moveBall(target.x, target.y);
  } else {
    updatePossession();
  }

  logMatch(
    team.name,
    `${player.name} overlaps ${result.other.name} and runs to (${target.x},${target.y}).${result.follow ? ` ${result.marker.name} follows.` : ''}`
  );

  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}
function resolveSideAttack(side) {
  const p = pendingSideAttack;
  if (!p) return;
  cancelPendingSideAttack();
  matchState.lastDribbledPlayer = null;

  const result = p.action.play({ team: p.team, board, side });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  for (const { player, marker, target } of result.moves) {
    const el = tokenElForPlayer(player);
    if (el) moveTokenToCell(el, target.x, target.y);
    if (marker) {
      const markerEl = tokenElForPlayer(marker);
      if (markerEl) moveTokenToCell(markerEl, target.x, target.y);
    }
  }

  const holder = matchState.possession && matchState.possession._token.player;
  const holderMove = result.moves.find((m) => m.player === holder);
  const markerMove = result.moves.find((m) => m.marker === holder);
  if (holderMove) {
    moveBall(holderMove.target.x, holderMove.target.y);
  } else if (markerMove) {
    moveBall(markerMove.target.x, markerMove.target.y);
  } else {
    updatePossession();
  }

  const label = side === 'top' ? 'top' : 'bottom';
  logMatch(p.team.name, `Side attack down the ${label} flank: ${result.moves.map((m) => m.player.name).join(', ')} advance.`);

  const playResult = game.playAction(p.team, p.action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}
function addRiskyTackleFrozenDefense(team) {
  team.availableActions.push(new FrozenDefenseAction());
  team.discardedActions.push(new FrozenDefenseAction());
}
function tryCounterPress(winnerTeam) {
  const loserTeam = board.getOpponent(winnerTeam);
  if (!loserTeam || !loserTeam.hasTeamEffect('counterPress')) return;
  const holder = board.getBallHolder();
  if (!holder) return;
  const holderCell = getPlayerCell(holder);
  if (!holderCell) return;
  const holderTeam = board.getTeam(holder.team);
  if (holder.position === 'GK' && holderTeam && board.inPenaltyBox(holderCell.x, holderCell.y, holderTeam.side)) {
    return;
  }
  let best = null;
  let bestDist = Infinity;
  for (const p of loserTeam.currentPlayers) {
    if (p.position === 'GK') continue;
    const cell = getPlayerCell(p);
    if (!cell) continue;
    const dist = Math.max(Math.abs(cell.x - holderCell.x), Math.abs(cell.y - holderCell.y));
    if (dist < bestDist) {
      bestDist = dist;
      best = p;
    }
  }
  if (!best) return;
  const tacklerEl = tokenElForPlayer(best);
  if (!tacklerEl) return;
  if (!board.canOccupy(holderCell.x, holderCell.y, [best])) return;
  logMatch(loserTeam.name, `Counter-press kicks off — ${best.name} hunts down ${holder.name} to win the ball straight back.`);
  if (!(best.tackling + 5 > holder.dribbling)) {
    logMatch(loserTeam.name, `Counter-press: ${best.name} presses to win it straight back, but ${holder.name} holds on.`);
    return;
  }
  moveTokenToCell(tacklerEl, holderCell.x, holderCell.y);
  matchState.possession = tacklerEl;
  updatePossession();
  game.recordRecovery(loserTeam, best);
  logMatch(loserTeam.name, `Counter-press! ${best.name} wins the ball straight back with a tackle.`);
}
function applyEnragedRivalTackle(team, tackler, victim) {
  const opponent = board.getOpponent(team);
  if (!opponent || !opponent.hasTeamEffect('enragedRival')) return;
  if (!victim || victim.injured || victim.sentOff) return;
  if (Math.random() >= 0.5) return;
  victim.addEffect('injured', Infinity);
  logMatch(opponent.name, `${victim.name} is injured by ${tackler.name}'s furious challenge!`, 'injury');
  humanNotice('INJURY!');
  const card = game.refereeCard(tackler);
  game.recordEvent({ type: card === 'red' ? 'red' : 'yellow', team: team.name, player: tackler.name });
  logMatch(
    team.name,
    card === 'red'
      ? `RED CARD for ${tackler.name}! The rage costs them dearly.`
      : `Yellow card for ${tackler.name} — the rage boils over.`,
    'card'
  );
  humanNotice(card === 'red' ? 'RED CARD!' : 'YELLOW CARD');
  if (card === 'red') {
    removeFromPitchAndSquad(team, tackler);
    if (tackler === team.currentGoalkeeper) onTeamLosesGoalkeeper(team, tackler);
  }
}

function resolveRiskyTackle(tacklerEl) {
  const pending = pendingTackle;
  if (!pending) return;

  const { team, action } = pending;
  const tackler = tacklerEl._token.player;
  cancelPendingTackle();
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const result = action.play({ team, tackler, board });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  addRiskyTackleFrozenDefense(team);
  logMatch(
    team.name,
    'Risky tackle pays the price — a Frozen defense card is added to the playable deck and another to the discard pile.'
  );

  forceBrittleFault(team, result);

  if (strictRefereeFoul(team, tackler, result.holder, action)) return;

  if (!result.won) {
    const wavePlayOn = permissiveRefereeActive() || blindSpotWavesOff();
    logMatch(
      team.name,
      wavePlayOn
        ? `${tackler.name}'s risky tackle fails — ${result.holder.name} keeps the ball, and ${
            permissiveRefereeActive()
              ? 'the permissive referee waves play on'
              : 'the referee misses the foul in his blind spot'
          }.`
        : `${tackler.name}'s risky tackle fails — ${result.holder.name} keeps the ball (foul / free kick).`
    );
    if (!wavePlayOn) {
      const wasPenalty = resolveFault(result.holder, tackler);
      const playResult = game.playAction(team, action, {
        endTurn: true,
        nextTeam: board.getOpponent(team),
      });
      if (!playResult.success) logAlert(playResult.reason);
      const fouledTeam = board.getOpponent(team);
      if (wasPenalty) grantPenaltyShootCard(fouledTeam);
      else grantFreeKickCards(fouledTeam, ball);
    } else {
      const playResult = game.playAction(team, action);
      if (!playResult.success) logAlert(playResult.reason);
    }
    addTackleBooking(board.getOpponent(team), result.holder);
    applyEnragedRivalTackle(team, tackler, result.holder);
    renderGame();
    return;
  }

  shakeScreen();
  moveTokenToCell(tacklerEl, ball.x, ball.y);
  matchState.possession = tacklerEl;
  updatePossession();
  game.recordRecovery(team, tackler);
  tryCounterPress(team);

  addTackleBooking(team, tackler);

  logMatch(
    team.name,
    `${tackler.name} wins the ball with a risky tackle (tackling ${tackler.tackling}).`
  );
  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);

  applyEnragedRivalTackle(team, tackler, result.holder);
  renderGame();
}
function forceBrittleFault(team, result) {
  const holder = result && result.holder;
  if (!holder) return false;
  if (!(game.brittleBones && game.brittleBones[holder.team] > 0)) return false;
  result.won = false;
  result.forcedFault = true;
  logMatch(
    board.getOpponent(team).name,
    `Brittle little bones! ${holder.name} is wrapped in cotton wool — the tackle always ends in a foul in ${board.getOpponent(team).name}'s favor.`
  );
  return true;
}

function strictRefereeActive() {
  return !!(
    game &&
    game.matchEffect &&
    typeof StrictRefereeEffect !== 'undefined' &&
    game.matchEffect instanceof StrictRefereeEffect
  );
}

function permissiveRefereeActive() {
  return !!(
    game &&
    game.matchEffect &&
    typeof PermissiveRefereeEffect !== 'undefined' &&
    game.matchEffect instanceof PermissiveRefereeEffect
  );
}

function foulFreeKick(team, holder, tackler, action) {
  logMatch(
    board.getOpponent(team).name,
    `${holder.name} keeps the ball after a foul on ${tackler.name}'s challenge (free kick).`
  );
  const wasPenalty = resolveFault(holder, tackler);
  const playResult = game.playAction(team, action, {
    endTurn: true,
    nextTeam: board.getOpponent(team),
  });
  if (!playResult.success) logAlert(playResult.reason);
  const fouledTeam = board.getOpponent(team);
  if (wasPenalty) grantPenaltyShootCard(fouledTeam);
  else grantFreeKickCards(fouledTeam, ball);
}

function strictRefereeFoul(team, tackler, holder, action) {
  if (!strictRefereeActive()) return false;
  if (!holder) return false;
  if (Math.random() >= 0.5) return false;
  logMatch(
    board.getOpponent(team).name,
    `The strict referee stops play — ${tackler.name}'s tackle on ${holder.name} is a foul.`
  );
  humanNotice('FOUL!');
  foulFreeKick(team, holder, tackler, action);
  return true;
}

function blindSpotWavesOff() {
  return !!(
    game &&
    game.matchEffect &&
    typeof BlindSpotRefereeEffect !== 'undefined' &&
    game.matchEffect instanceof BlindSpotRefereeEffect &&
    Math.random() < 0.5
  );
}

function cardHappyRefereeActive() {
  return !!(
    game &&
    game.matchEffect &&
    typeof CardHappyRefereeEffect !== 'undefined' &&
    game.matchEffect instanceof CardHappyRefereeEffect
  );
}

function addTackleBooking(team, player) {
  if (!cardHappyRefereeActive()) return;
  game.matchBookings = game.matchBookings || {};
  const n = (game.matchBookings[team.name] || 0) + 1;
  game.matchBookings[team.name] = n;
  logMatch(team.name, `${player.name} is booked after that tackle (booking #${n}).`);
  if (n >= 2) {
    logMatch(team.name, `${team.name} hit two bookings — their next turn is skipped.`);
    game.skipOpponentNextTurn[team.name] = true;
  }
}

function puddlesActive() {
  return !!(
    game &&
    game.matchEffect &&
    typeof WetPitchPuddlesEffect !== 'undefined' &&
    game.matchEffect instanceof WetPitchPuddlesEffect
  );
}
function resolveTackle(tacklerEl) {
  const pending = pendingTackle;
  if (!pending) return;
  const { team, action } = pending;
  const tackler = tacklerEl._token.player;
  cancelPendingTackle();
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const result = action.play({ team, tackler, board });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  forceBrittleFault(team, result);

  if (strictRefereeFoul(team, tackler, result.holder, action)) return;

  if (!result.won) {
    if (game.suspensionShadowActive === team.name) {
      logMatch(
        team.name,
        `${tackler.name}'s tackle fails — suspension shadow! ${tackler.name} is injured instead.`
      );
      tackler.addEffect('injured', Infinity);
      game.suspensionShadowActive = null;
      const playResult = game.playAction(team, action, {
        endTurn: true,
        nextTeam: board.getOpponent(team),
      });
      if (!playResult.success) logAlert(playResult.reason);
      if (tackler.position === 'GK') onTeamLosesGoalkeeper(team, tackler);
      renderGame();
      return;
    }
    const wavePlayOn = permissiveRefereeActive() || blindSpotWavesOff();
    logMatch(
      team.name,
      wavePlayOn
        ? `${tackler.name}'s tackle fails — ${result.holder.name} keeps the ball, and ${
            permissiveRefereeActive()
              ? 'the permissive referee waves play on'
              : 'the referee misses the foul in his blind spot'
          }.`
        : `${tackler.name}'s tackle fails — ${result.holder.name} keeps the ball (foul / free kick).`
    );
    if (!wavePlayOn) {
      const wasPenalty = resolveFault(result.holder, tackler);
      const playResult = game.playAction(team, action, {
        endTurn: true,
        nextTeam: board.getOpponent(team),
      });
      if (!playResult.success) logAlert(playResult.reason);
      const fouledTeam = board.getOpponent(team);
      if (wasPenalty) grantPenaltyShootCard(fouledTeam);
      else grantFreeKickCards(fouledTeam, ball);
    } else {
      const playResult = game.playAction(team, action);
      if (!playResult.success) logAlert(playResult.reason);
    }
    addTackleBooking(board.getOpponent(team), result.holder);
    applyEnragedRivalTackle(team, tackler, result.holder);
    renderGame();
    return;
  }

  shakeScreen();
  moveTokenToCell(tacklerEl, ball.x, ball.y);
  matchState.possession = tacklerEl;
  updatePossession();
  game.recordRecovery(team, tackler);
  tryCounterPress(team);

  addTackleBooking(team, tackler);

  logMatch(team.name, `${tackler.name} wins the ball with a tackle (tackling ${tackler.tackling}).`);

  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);

  applyEnragedRivalTackle(team, tackler, result.holder);
  renderGame();
}
function resolveExpertTackle(tacklerEl) {
  return resolveTackle(tacklerEl);
}
function resolveMarking(team, action, marker) {
  const markerEl = tokenElForPlayer(marker);
  if (!markerEl) return;
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const result = action.play({ team, marker, board });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  if (flairActiveAgainst(team)) {
    result.won = false;
    logMatch(
      board.getOpponent(team).name,
      `Flair! ${marker.name}'s marking fails — ${board.getOpponent(team).name} are playing with flair this turn.`
    );
  }

  if (result.won) {
    shakeScreen();
    matchState.possession = markerEl;
    updatePossession();
    game.recordRecovery(team, marker);
    tryCounterPress(team);
  }

  logMatch(
    team.name,
    result.won
      ? `${marker.name} marks ${result.holder.name} and wins the ball (marking ${marker.marking} vs ${result.holder.dribbling}).`
      : `${marker.name}'s marking holds ${result.holder.name} in check but couldn't win the ball.`
  );

  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}
function playMarking(team, action) {
  const holderEl = matchState.possession;
  if (!holderEl) return;
  const holderCell = getPlayerCell(holderEl._token.player);
  if (!holderCell) return;
  const marker = team.currentPlayers.find((player) => {
    const playerCell = getPlayerCell(player);
    if (!playerCell) return false;
    return playerCell.x === holderCell.x && playerCell.y === holderCell.y;
  });
  if (!marker) return;
  resolveMarking(team, action, marker);
}
function playDirtyTricks(team, action) {
  const holderEl = matchState.possession;
  if (!holderEl) return;
  const holderCell = getPlayerCell(holderEl._token.player);
  if (!holderCell) return;
  const marker = team.currentPlayers.find(
    (p) =>
      p.position !== 'GK' &&
      getPlayerCell(p) &&
      getPlayerCell(p).x === holderCell.x &&
      getPlayerCell(p).y === holderCell.y
  );
  if (!marker) return;
  resolveDirtyTricks(team, action, holderEl._token.player, marker);
}
function resolveDirtyTricks(team, action, holder, marker) {
  const markerEl = tokenElForPlayer(marker);
  if (!markerEl) return;
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const result = action.play({ team, board });
  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  matchState.possession = markerEl;
  updatePossession();
  game.clearLastPass();
  game.recordFoul(team, marker);
  holder.addEffect('cramped', 2);
  game.recordEvent({ type: 'dirtyTricks', team: team.name, player: holder.name });
  logMatch(
    team.name,
    `${marker.name} uses Dirty tricks on ${holder.name}, steals the ball and cramps them for 2 turns.`
  );

  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}
function resolvePress(team, action, presser) {
  const presserEl = tokenElForPlayer(presser);
  if (!presserEl) return;
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const result = action.play({ team, presser, board });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  if (flairActiveAgainst(team)) {
    result.won = false;
    logMatch(
      board.getOpponent(team).name,
      `Flair! ${presser.name}'s press fails — ${board.getOpponent(team).name} are playing with flair this turn.`
    );
  }

  if (result.won) {
    shakeScreen();
    matchState.possession = presserEl;
    updatePossession();
    game.recordRecovery(team, presser);
    tryCounterPress(team);
  }

  logMatch(
    team.name,
    result.won
      ? `${presser.name} presses and wins the ball (press ${presser.tackling} vs ${result.holder.dribbling}).`
      : `${presser.name} presses but ${result.holder.name} keeps the ball.`
  );

  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}
function playPress(team, action) {
  const holderEl = matchState.possession;
  if (!holderEl) return;
  const holderCell = getPlayerCell(holderEl._token.player);
  if (!holderCell) return;
  const presser = team.currentPlayers.find((player) => {
    const playerCell = getPlayerCell(player);
    if (!playerCell) return false;
    return playerCell.x === holderCell.x && playerCell.y === holderCell.y;
  });
  if (!presser) return;
  resolvePress(team, action, presser);
}
function playForcedPress(team, action) {
  const holderEl = matchState.possession;
  if (!holderEl) return;
  const holderCell = getPlayerCell(holderEl._token.player);
  if (!holderCell) return;
  const presser = team.currentPlayers.find((player) => {
    const playerCell = getPlayerCell(player);
    if (!playerCell) return false;
    return playerCell.x === holderCell.x && playerCell.y === holderCell.y;
  });
  if (!presser) return;
  resolveForcedPress(team, action, presser);
}
function resolveForcedPress(team, action, presser) {
  const presserEl = tokenElForPlayer(presser);
  if (!presserEl) return;
  matchState.lastBallMove = null;
  matchState.lastDribbledPlayer = null;

  const result = action.play({ team, presser, board });

  if (!result.success && result.reason) {
    logAlert(result.reason);
    renderGame();
    return;
  }

  if (flairActiveAgainst(team)) {
    result.won = false;
    logMatch(
      board.getOpponent(team).name,
      `Flair! ${presser.name}'s press fails — ${board.getOpponent(team).name} are playing with flair this turn.`
    );
  }

  if (result.won) {
    shakeScreen();
    matchState.possession = presserEl;
    updatePossession();
    game.recordRecovery(team, presser);
    tryCounterPress(team);
  }

  team.discardedActions.push(new BrokenDefenseAction());

  logMatch(
    team.name,
    result.won
      ? `${presser.name} forces a press and wins the ball (press ${presser.tackling} vs ${result.holder.dribbling}). A Broken defense card is added to ${team.name}'s discard pile.`
      : `${presser.name} forces a press but ${result.holder.name} keeps the ball. A Broken defense card is added to ${team.name}'s discard pile.`
  );

  const playResult = game.playAction(team, action);
  if (!playResult.success) logAlert(playResult.reason);

  renderGame();
}
function closeShotModal() {
  const btn = document.querySelector('.shot-modal-close');
  if (btn) btn.click();
}