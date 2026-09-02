let pendingPass = null;
let pendingLongPass = null;
let pendingTackle = null;
let pendingMove = null;
let pendingSlip = null;
let pendingLongBall = null;
let pendingOffBall = null;
let pendingDribble = null;
let pendingSprint = null;
let pendingFinish = null;
let pendingCross = null;
  let pendingRunAndCross = null;
let pendingCramp = null;
let pendingHardTackle = null;
let pendingSideAttack = null;
let pendingOverlap = null;
let pendingFeintTurn = null;
let pendingTouchOfMagic = null;
let pendingSiiiiu = null;
let pendingThroughBall = null;
let pendingOneTwo = null;
let pendingUnderlap = null;
let pendingShithousery = null;
let pendingHold = null;
let pendingYellowCard = null;
let pendingSwitchPlay = null;

function pendingStates() {
  return [
    pendingPass,
    pendingLongPass,
    pendingTackle,
    pendingMove,
    pendingSlip,
    pendingLongBall,
    pendingOffBall,
    pendingDribble,
    pendingSprint,
    pendingFinish,
    pendingCross,
    pendingRunAndCross,
    pendingCramp,
    pendingHardTackle,
    pendingSideAttack,
    pendingOverlap,
    pendingFeintTurn,
    pendingTouchOfMagic,
    pendingSiiiiu,
    pendingThroughBall,
    pendingOneTwo,
    pendingUnderlap,
    pendingShithousery,
    pendingHold,
    pendingYellowCard,
    pendingSwitchPlay,
    pendingTacticalSub,
    pendingClearance,
    pendingLastDitchBlock,
  ];
}

function hasActivePending() {
  return pendingStates().some(Boolean);
}

function currentPending(team, action) {
  return pendingStates().find((p) => p && p.team === team && p.action === action) || null;
}


function cancelPending() {
  cancelPendingPass();
  cancelPendingLongPass();
  cancelPendingTackle();
  cancelPendingMove();
  cancelPendingSlip();
  cancelPendingLongBall();
  cancelPendingOffBall();
  cancelPendingDribble();
  cancelPendingSprint();
  cancelPendingFinish();
  cancelPendingCross();
  cancelPendingRunAndCross();
  cancelPendingCramp();
  cancelPendingHardTackle();
  cancelPendingSideAttack();
  cancelPendingOverlap();
  cancelPendingFeintTurn();
  cancelPendingTouchOfMagic();
  cancelPendingSiiiiu();
  cancelPendingThroughBall();
  cancelPendingOneTwo();
  cancelPendingUnderlap();
  cancelPendingShithousery();
  cancelPendingHold();
  cancelPendingYellowCard();
  cancelPendingSwitchPlay();
  cancelPendingTacticalSub();
  cancelPendingClearance();
  cancelPendingLastDitchBlock();
}

function cancelPendingPass() {
  if (!pendingPass) return;
  pendingPass = null;
  for (const el of pitch.querySelectorAll('.cell.pass-target')) {
    el.classList.remove('pass-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingLongPass() {
  if (!pendingLongPass) return;
  pendingLongPass = null;
  for (const el of pitch.querySelectorAll('.cell.longpass-target')) {
    el.classList.remove('longpass-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingTackle() {
  if (!pendingTackle) return;
  pendingTackle = null;
  for (const el of document.querySelectorAll('.player-token.tackle-target')) {
    el.classList.remove('tackle-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingMove() {
  if (!pendingMove) return;
  pendingMove = null;
  for (const el of document.querySelectorAll('.player-token.move-player-target')) {
    el.classList.remove('move-player-target');
  }
  for (const el of pitch.querySelectorAll('.cell.move-cell-target')) {
    el.classList.remove('move-cell-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingSlip() {
  if (!pendingSlip) return;
  pendingSlip = null;
  for (const el of document.querySelectorAll('.player-token.slip-player-target')) {
    el.classList.remove('slip-player-target');
  }
  for (const el of pitch.querySelectorAll('.cell.slip-cell-target')) {
    el.classList.remove('slip-cell-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingLongBall() {
  if (!pendingLongBall) return;
  pendingLongBall = null;
  for (const el of pitch.querySelectorAll('.cell.longball-target')) {
    el.classList.remove('longball-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingOffBall() {
  if (!pendingOffBall) return;
  pendingOffBall = null;
  for (const el of document.querySelectorAll('.player-token.offball-player-target')) {
    el.classList.remove('offball-player-target');
  }
  for (const el of pitch.querySelectorAll('.cell.offball-cell-target')) {
    el.classList.remove('offball-cell-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingDribble() {
  if (!pendingDribble) return;
  pendingDribble = null;
  for (const el of pitch.querySelectorAll('.cell.dribble-target')) {
    el.classList.remove('dribble-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingSprint() {
  if (!pendingSprint) return;
  pendingSprint = null;
  for (const el of document.querySelectorAll('.player-token.sprint-player-target')) {
    el.classList.remove('sprint-player-target');
  }
  for (const el of pitch.querySelectorAll('.cell.sprint-cell-target')) {
    el.classList.remove('sprint-cell-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingFinish() {
  if (!pendingFinish) return;
  pendingFinish = null;
  for (const el of document.querySelectorAll('.player-token.finish-player-target')) {
    el.classList.remove('finish-player-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingCross() {
  if (!pendingCross) return;
  pendingCross = null;
  for (const el of document.querySelectorAll('.player-token.cross-target')) {
    el.classList.remove('cross-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingCramp() {
  if (!pendingCramp) return;
  pendingCramp = null;
  for (const el of document.querySelectorAll('.player-token.cramp-target')) {
    el.classList.remove('cramp-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingRunAndCross() {
  if (!pendingRunAndCross) return;
  pendingRunAndCross = null;
  for (const el of document.querySelectorAll('.player-token.cross-target')) {
    el.classList.remove('cross-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingHardTackle() {
  if (!pendingHardTackle) return;
  pendingHardTackle = null;
  for (const el of document.querySelectorAll('.player-token.hard-tackle-target')) {
    el.classList.remove('hard-tackle-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingSideAttack() {
  if (!pendingSideAttack) return;
  pendingSideAttack = null;
  for (const el of document.querySelectorAll('.player-token.side-attack-player')) {
    el.classList.remove('side-attack-player');
  }
  for (const el of pitch.querySelectorAll('.cell.side-attack-target')) {
    el.classList.remove('side-attack-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingOverlap() {
  if (!pendingOverlap) return;
  pendingOverlap = null;
  for (const el of document.querySelectorAll('.player-token.overlap-player-target')) {
    el.classList.remove('overlap-player-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingFeintTurn() {
  if (!pendingFeintTurn) return;
  pendingFeintTurn = null;
  for (const el of pitch.querySelectorAll('.cell.feint-target')) {
    el.classList.remove('feint-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingTouchOfMagic() {
  if (!pendingTouchOfMagic) return;
  pendingTouchOfMagic = null;
  for (const el of pitch.querySelectorAll('.cell.touch-magic-target')) {
    el.classList.remove('touch-magic-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingSiiiiu() {
  if (!pendingSiiiiu) return;
  pendingSiiiiu = null;
  for (const el of pitch.querySelectorAll('.cell.siiiiu-target')) {
    el.classList.remove('siiiiu-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingThroughBall() {
  if (!pendingThroughBall) return;
  pendingThroughBall = null;
  for (const el of pitch.querySelectorAll('.cell.throughball-target')) {
    el.classList.remove('throughball-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingOneTwo() {
  if (!pendingOneTwo) return;
  pendingOneTwo = null;
  for (const el of pitch.querySelectorAll('.cell.onetwo-target')) {
    el.classList.remove('onetwo-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingUnderlap() {
  if (!pendingUnderlap) return;
  pendingUnderlap = null;
  for (const el of document.querySelectorAll('.player-token.underlap-target')) {
    el.classList.remove('underlap-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingShithousery() {
  if (!pendingShithousery) return;
  pendingShithousery = null;
  renderInPlay();
  renderHint();
}

function cancelPendingHold() {
  if (!pendingHold) return;
  pendingHold = null;
  renderInPlay();
  renderHint();
}

function cancelPendingYellowCard() {
  if (!pendingYellowCard) return;
  pendingYellowCard = null;
  for (const el of document.querySelectorAll('.player-token.yellowcard-target')) {
    el.classList.remove('yellowcard-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingSwitchPlay() {
  if (!pendingSwitchPlay) return;
  pendingSwitchPlay = null;
  for (const el of pitch.querySelectorAll('.cell.switch-target')) {
    el.classList.remove('switch-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingTacticalSub() {
  if (!pendingTacticalSub) return;
  pendingTacticalSub = null;
  for (const el of document.querySelectorAll('.player-token.side-attack-player')) {
    el.classList.remove('side-attack-player');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingClearance() {
  if (!pendingClearance) return;
  pendingClearance = null;
  for (const el of document.querySelectorAll('.player-token.tackle-target')) {
    el.classList.remove('tackle-target');
  }
  renderInPlay();
  renderHint();
}

function cancelPendingLastDitchBlock() {
  if (!pendingLastDitchBlock) return;
  pendingLastDitchBlock = null;
  for (const el of document.querySelectorAll('.player-token.tackle-target')) {
    el.classList.remove('tackle-target');
  }
  renderInPlay();
  renderHint();
}

function beginPassTargeting(team, action) {
  cancelPending();
  pendingPass = { team, action, passer: matchState.possession._token.player };

  const maxRange = game.pepStyle && game.pepStyle[team.name] > 0 ? 3 : 2;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const dx = Math.abs(x - ball.x);
      if (dx <= maxRange && !(x === ball.x && y === ball.y)) {
        cell(x, y).classList.add('pass-target');
      }
    }
  }

  renderInPlay();
  renderHint();
}

function beginLongPassTargeting(team, action) {
  cancelPending();
  pendingLongPass = { team, action, passer: matchState.possession._token.player };

  const maxRange = 4;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const dx = Math.abs(x - ball.x);
      if (dx <= maxRange && !(x === ball.x && y === ball.y)) {
        cell(x, y).classList.add('longpass-target');
      }
    }
  }

  renderInPlay();
  renderHint();
}

function beginTackleTargeting(team, action) {
  cancelPending();
  const tacklers = team.currentPlayers.filter((player) => {
    const playerCell = getPlayerCell(player);
    if (!playerCell) return false;
    const distance = Math.max(Math.abs(ball.x - playerCell.x), Math.abs(ball.y - playerCell.y));
    return distance === 1 && board.canOccupy(ball.x, ball.y, [player]);
  });
  pendingTackle = { team, action, tacklers };

  for (const player of tacklers) {
    const el = tokenElForPlayer(player);
    if (el) el.classList.add('tackle-target');
  }

  renderInPlay();
  renderHint();
}

function beginExpertTackleTargeting(team, action) {
  cancelPending();
  const tacklers = team.currentPlayers.filter((player) => {
    const playerCell = getPlayerCell(player);
    if (!playerCell) return false;
    const distance = Math.max(Math.abs(ball.x - playerCell.x), Math.abs(ball.y - playerCell.y));
    if (distance === 0) return true;
    return distance === 1 && board.canOccupy(ball.x, ball.y, [player]);
  });
  pendingTackle = { team, action, tacklers };

  for (const player of tacklers) {
    const el = tokenElForPlayer(player);
    if (el) el.classList.add('tackle-target');
  }

  renderInPlay();
  renderHint();
}

function beginMoveTargeting(team, action) {
  cancelPending();
  pendingMove = { team, action, player: null };

  for (const player of team.currentPlayers) {
    if (frozenDefenseInHand(team) && isBacklinePosition(player)) continue;
    const el = tokenElForPlayer(player);
    if (el) el.classList.add('move-player-target');
  }

  renderInPlay();
  renderHint();
}

function moveTargetLegal(player, x, y) {
  const source = getPlayerCell(player);
  if (!source) return false;
  const marker =
    board.getPlayersAt(source.x, source.y).find((p) => p.team !== player.team) || null;
  const isHolder = matchState.possession && matchState.possession._token.player === player;
  const team = TEAMS[player.team];
  if (isHolder && marker) {
    const forward = team.side === 'left' ? x > source.x : x < source.x;
    if (forward) return false;
  }
  const follow = Boolean(
    marker && Action.markerFollows(marker, player, team)
  );
  return board.canOccupy(x, y, follow ? [player, marker] : [player]);
}

function selectMovePlayer(player) {
  const pending = pendingMove;
  if (!pending) return;
  pending.player = player;

  for (const el of document.querySelectorAll('.player-token.move-player-target')) {
    el.classList.remove('move-player-target');
  }

  const c = getPlayerCell(player);
  const range = player.position === 'GK' && pending.team.hasTeamEffect('lastDefender') ? 2 : 1;
  const candidates = candidatesFrom(c.x, c.y, range);
  for (const [nx, ny] of candidates) {
    if (nx >= 0 && nx < WIDTH && ny >= 0 && ny < HEIGHT && moveTargetLegal(player, nx, ny)) {
      cell(nx, ny).classList.add('move-cell-target');
    }
  }

  renderInPlay();
  renderHint();
}

function slipTargetLegal(player, x, y) {
  const source = getPlayerCell(player);
  if (!source || source.x < 0 || source.y < 0 || source.x >= WIDTH || source.y >= HEIGHT) return false;
  const isHolder = matchState.possession && matchState.possession._token.player === player;
  if (isHolder) return false;
  return board.canOccupy(x, y, [player]);
}

function beginSlipTargeting(team, action) {
  cancelPending();
  pendingSlip = { team, action, player: null };

  for (const player of team.currentPlayers) {
    if (frozenDefenseInHand(team) && isBacklinePosition(player)) continue;
    const c = getPlayerCell(player);
    if (!c) continue;
    const legal = candidatesFrom(c.x, c.y, 1).some(([nx, ny]) =>
      slipTargetLegal(player, nx, ny)
    );
    if (!legal) continue;
    const el = tokenElForPlayer(player);
    if (el) el.classList.add('slip-player-target');
  }

  renderInPlay();
  renderHint();
}

function selectSlipPlayer(player) {
  const pending = pendingSlip;
  if (!pending) return;
  pending.player = player;

  for (const el of document.querySelectorAll('.player-token.slip-player-target')) {
    el.classList.remove('slip-player-target');
  }

  const c = getPlayerCell(player);
  const candidates = [
    [c.x + 1, c.y],
    [c.x - 1, c.y],
    [c.x, c.y + 1],
    [c.x, c.y - 1],
    [c.x + 1, c.y + 1],
    [c.x + 1, c.y - 1],
    [c.x - 1, c.y + 1],
    [c.x - 1, c.y - 1],
  ];
  for (const [nx, ny] of candidates) {
    if (nx >= 0 && nx < WIDTH && ny >= 0 && ny < HEIGHT && slipTargetLegal(player, nx, ny)) {
      cell(nx, ny).classList.add('slip-cell-target');
    }
  }

  renderInPlay();
  renderHint();
}

function beginLongBallTargeting(team, action) {
  cancelPending();
  pendingLongBall = { team, action };

  const passer = matchState.possession && matchState.possession._token.player;
  let range = passer ? passer.passing + 1 : 1;
  if (passer) {
    const passerCell = getPlayerCell(passer);
    const marked = passerCell
      ? board.getPlayersAt(passerCell.x, passerCell.y).some((p) => p.team !== team.name)
      : false;
    if (marked) range -= 2;
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if (x === ball.x && y === ball.y) continue;
      if (getTokensInCell(x, y).length === 0) {
        if (Math.abs(x - ball.x) + Math.abs(y - ball.y) <= range) {
          cell(x, y).classList.add('longball-target');
        }
      }
    }
  }

  renderInPlay();
  renderHint();
}

function highlightOffBallPlayers() {
  const p = pendingOffBall;
  if (!p) return;
  const holder = matchState.possession && matchState.possession._token.player;
  for (const player of p.team.currentPlayers) {
    if (player === holder) continue;
    if (frozenDefenseInHand(p.team) && isBacklinePosition(player)) continue;
    if (p.moves.some((m) => m.player === player)) continue;
    const el = tokenElForPlayer(player);
    if (el) el.classList.add('offball-player-target');
  }
}

function beginOffBallTargeting(team, action) {
  cancelPending();
  pendingOffBall = { team, action, moves: [], currentPlayer: null };
  highlightOffBallPlayers();
  renderInPlay();
  renderHint();
}

function selectOffBallPlayer(player) {
  const p = pendingOffBall;
  if (!p) return;
  p.currentPlayer = player;

  for (const el of document.querySelectorAll('.player-token.offball-player-target')) {
    el.classList.remove('offball-player-target');
  }

  const c = getPlayerCell(player);
  const marker = opponentInCell(c.x, c.y, p.team) || null;
  const follow = Boolean(marker);
  for (const [nx, ny] of candidatesFrom(c.x, c.y, 1)) {
    if (board.canOccupy(nx, ny, follow ? [player, marker] : [player])) {
      cell(nx, ny).classList.add('offball-cell-target');
    }
  }

  renderInPlay();
  renderHint();
}



function beginDribblingTargeting(team, action) {
  const holderEl = matchState.possession;
  if (!holderEl) return;
  const player = holderEl._token.player;
  const c = getPlayerCell(player);
  if (!c) return;

  const marker = opponentInCell(c.x, c.y, team);
  if (!marker) return;

  const won = player.dribbling > marker.marking;
  if (!won) {
    executeAction(team, action, () => {
      logMatch(
        team.name,
        `${action.name} not allowed: ${player.name} (dribbling ${player.dribbling}) cannot beat ${marker.name} (marking ${marker.marking}) — ${marker.name} wins the ball.`,
        'denied'
      );
      const markerEl = tokenElForPlayer(marker);
      if (markerEl) matchState.possession = markerEl;
      matchState.lastDribbledPlayer = null;
      updatePossession();
      game.clearLastPass();
      game.recordRecovery(TEAMS[marker.team], marker);
      const playResult = game.playAction(team, action);
      if (!playResult.success) logAlert(playResult.reason);
      renderGame();
    });
    return;
  }

  logMatch(
    team.name,
    `${player.name} beats ${marker.name} with a dribble (dribbling ${player.dribbling} vs marking ${marker.marking}).`
  );

  matchState.lastDribbledPlayer = marker;
  cancelPending();
  pendingDribble = { team, action, player };

  for (const [nx, ny] of candidatesFrom(c.x, c.y, 1)) {
    if (board.canOccupy(nx, ny, [player])) {
      cell(nx, ny).classList.add('dribble-target');
    }
  }

  renderInPlay();
  renderHint();
}


function beginFeintTurnTargeting(team, action) {
  const holderEl = matchState.possession;
  if (!holderEl) return;
  const player = holderEl._token.player;
  const c = getPlayerCell(player);
  if (!c) return;

  const marker = opponentInCell(c.x, c.y, team);
  if (!marker) return;

  const won = player.dribbling > marker.tacticalThinking;
  if (!won) {
    executeAction(team, action, () => {
      logMatch(
        team.name,
        `${action.name} not allowed: ${player.name} (dribbling ${player.dribbling}) cannot beat ${marker.name} (tactical thinking ${marker.tacticalThinking}).`,
        'denied'
      );
      const playResult = game.playAction(team, action);
      if (!playResult.success) logAlert(playResult.reason);
      renderGame();
    });
    return;
  }

  logMatch(
    team.name,
    `${player.name} beats ${marker.name} with a feint (dribbling ${player.dribbling} vs tactical thinking ${marker.tacticalThinking}).`
  );

  cancelPending();
  pendingFeintTurn = { team, action, player, marker };

  const onTouchline = c.y === 0 || c.y === HEIGHT - 1;

  for (const [nx, ny] of candidatesFrom(c.x, c.y, 1)) {
    if (Math.abs(ny - c.y) !== 1) continue;
    if (!board.canOccupy(nx, ny, [player])) continue;
    if (onTouchline) {
      cell(nx, ny).classList.add('feint-target');
      continue;
    }
    const mirrorX = c.x + (nx - c.x);
    const mirrorY = c.y - (ny - c.y);
    if (!inBounds(mirrorX, mirrorY)) continue;
    if (!board.canOccupy(mirrorX, mirrorY, [marker])) continue;
    cell(nx, ny).classList.add('feint-target');
  }

  renderInPlay();
  renderHint();
}


function beginTouchOfMagicTargeting(team, action) {
  const holderEl = matchState.possession;
  if (!holderEl) return;
  const player = holderEl._token.player;
  if (player.team !== team.name) return;
  const c = getPlayerCell(player);
  if (!c) return;

  if (player.dribbling <= 7 || player.speed <= 7 || player.shooting <= 7) {
    executeAction(team, action, () => {
      logMatch(team.name, `${action.name} not allowed: player needs dribbling, speed, and shooting > 7`, 'denied');
      const playResult = game.playAction(team, action);
      if (!playResult.success) logAlert(playResult.reason);
      renderGame();
    });
    return;
  }

  const halfX = Math.floor(WIDTH / 2);
  const inOppositionHalf = team.side === 'left' ? c.x >= halfX : c.x < Math.ceil(WIDTH / 2);
  if (!inOppositionHalf) {
    executeAction(team, action, () => {
      logMatch(team.name, `${action.name} not allowed: the ball must be in the opposition half`, 'denied');
      const playResult = game.playAction(team, action);
      if (!playResult.success) logAlert(playResult.reason);
      renderGame();
    });
    return;
  }

  cancelPending();
  pendingTouchOfMagic = { team, action, player };

  for (const [nx, ny] of candidatesFrom(c.x, c.y, 2)) {
    if (nx === c.x && ny === c.y) continue;
    const dist = Math.max(Math.abs(nx - c.x), Math.abs(ny - c.y));
    if (dist < 1 || dist > 2) continue;
    if (!board.canOccupy(nx, ny, [player])) continue;
    cell(nx, ny).classList.add('touch-magic-target');
  }

  renderInPlay();
  renderHint();
}


function beginSiiiiuTargeting(team, action) {
  const holderEl = matchState.possession;
  if (!holderEl) return;
  const player = holderEl._token.player;
  if (player.team !== team.name) return;
  const c = getPlayerCell(player);
  if (!c) return;

  const attackingRight = team.side === 'left';
  const inLastFiveColumns = attackingRight ? c.x >= WIDTH - 5 : c.x <= 4;
  if (!inLastFiveColumns) {
    executeAction(team, action, () => {
      logMatch(team.name, `${action.name} not allowed: the player with the ball must be in the last five columns`, 'denied');
      const playResult = game.playAction(team, action);
      if (!playResult.success) logAlert(playResult.reason);
      renderGame();
    });
    return;
  }

  cancelPending();
  pendingSiiiiu = { team, action, player };

  for (const [nx, ny] of candidatesFrom(c.x, c.y, 2)) {
    if (!action.play({ team, player, board, target: { x: nx, y: ny } }).success) continue;
    cell(nx, ny).classList.add('siiiiu-target');
  }

  renderInPlay();
  renderHint();
}


function beginThroughBallTargeting(team, action) {
  cancelPending();
  const holderEl = matchState.possession;
  if (!holderEl) return;
  const passer = holderEl._token.player;
  if (passer.team !== team.name) return;
  pendingThroughBall = { team, action, passer };

  const attackingRight = team.side === 'left';
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const dx = x - ball.x;
      if (attackingRight ? dx >= 2 : dx <= -2) {
        const dist = Math.max(Math.abs(x - ball.x), Math.abs(y - ball.y));
        if (dist >= 2 && dist <= 4) {
          if (action.play({ passer, team, target: { x, y }, board }).success) {
            cell(x, y).classList.add('throughball-target');
          }
        }
      }
    }
  }

  renderInPlay();
  renderHint();
}


function beginOneTwoTargeting(team, action) {
  cancelPending();
  const holderEl = matchState.possession;
  if (!holderEl) return;
  const passer = holderEl._token.player;
  if (passer.team !== team.name) return;
  const c = getPlayerCell(passer);
  if (!c) return;

  pendingOneTwo = { team, action, passer };
  const attackingRight = team.side === 'left';
  const forward = attackingRight ? 1 : -1;

  for (let dy = -1; dy <= 1; dy++) {
    const nx = c.x + forward;
    const ny = c.y + dy;
    if (nx < 0 || nx >= WIDTH || ny < 0 || ny >= HEIGHT) continue;
    if (action.play({ passer, team, target: { x: nx, y: ny }, board }).success) {
      cell(nx, ny).classList.add('onetwo-target');
    }
  }

  renderInPlay();
  renderHint();
}




function beginUnderlapTargeting(team, action) {
  cancelPending();
  pendingUnderlap = { team, action };

  for (const player of team.currentPlayers) {
    if (action.play({ team, player, board }).success) {
      const el = tokenElForPlayer(player);
      if (el) el.classList.add('underlap-target');
    }
  }

  renderInPlay();
  renderHint();
}


function beginSwitchPlayTargeting(team, action) {
  cancelPending();
  const holder = matchState.possession && matchState.possession._token.player;
  if (!holder || holder.team !== team.name) return;
  const c = getPlayerCell(holder);
  if (!c) return;
  if (c.y !== 0 && c.y !== HEIGHT - 1) return;

  pendingSwitchPlay = { team, action };
  const targetRow = c.y === 0 ? HEIGHT - 1 : 0;
  for (let x = 0; x < WIDTH; x++) {
    cell(x, targetRow).classList.add('switch-target');
  }

  renderInPlay();
  renderHint();
}


function beginSprintTargeting(team, action) {
  cancelPending();
  pendingSprint = { team, action, player: null };
  const holder = matchState.possession && matchState.possession._token.player;

  for (const player of team.currentPlayers) {
    if (frozenDefenseInHand(team) && isBacklinePosition(player)) continue;
    const c = getPlayerCell(player);
    if (!c) continue;
    const marked = board.getPlayersAt(c.x, c.y).some((p) => p.team !== team.name);
    if (player === holder && marked) continue;
    const el = tokenElForPlayer(player);
    if (el) el.classList.add('sprint-player-target');
  }

  renderInPlay();
  renderHint();
}

function selectSprintPlayer(player) {
  const p = pendingSprint;
  if (!p) return;
  p.player = player;

  for (const el of document.querySelectorAll('.player-token.sprint-player-target')) {
    el.classList.remove('sprint-player-target');
  }

  const c = getPlayerCell(player);
  const marker =
    board.getPlayersAt(c.x, c.y).find((p) => p.team !== player.team) || null;
  const follow = Boolean(
    marker &&
      !(board.isCramped && board.isCramped(marker)) &&
      Action.markerFollows(marker, player, player.team)
  );
  const distances = p.action instanceof ShortSprintAction ? [1, 2] : [2];
  for (const d of distances) {
    for (const [nx, ny] of candidatesFrom(c.x, c.y, d)) {
      if (board.canOccupy(nx, ny, follow ? [player, marker] : [player])) {
        cell(nx, ny).classList.add('sprint-cell-target');
      }
    }
  }

  renderInPlay();
  renderHint();
}


function beginOverlapTargeting(team, action) {
  cancelPending();
  pendingOverlap = { team, action };

  for (const player of team.currentPlayers) {
    if (frozenDefenseInHand(team) && isBacklinePosition(player)) continue;
    if (action.play({ team, player, board }).success) {
      const el = tokenElForPlayer(player);
      if (el) el.classList.add('overlap-player-target');
    }
  }

  renderInPlay();
  renderHint();
}


function beginSideAttackTargeting(team, action) {
  cancelPending();
  pendingSideAttack = { team, action };

  const rows = [0, HEIGHT - 1];
  for (const y of rows) {
    const side = y === 0 ? 'top' : 'bottom';
    if (frozenDefenseInHand(team)) {
      const result = action.play({ team, board, side });
      if (!result.success) continue;
      if (result.moves.some((m) => isBacklinePosition(m.player))) continue;
    }
    for (let x = 0; x < WIDTH; x++) {
      cell(x, y).classList.add('side-attack-target');
    }
  }

  for (const player of team.currentPlayers) {
    const c = getPlayerCell(player);
    if (!c || !rows.includes(c.y)) continue;
    const el = tokenElForPlayer(player);
    if (el) el.classList.add('side-attack-player');
  }

  renderInPlay();
  renderHint();
}