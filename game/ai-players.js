function countOutfieldersInOwnThird(team, columns) {
  let count = 0;
  for (const player of team.currentPlayers) {
    if (player.position === 'GK') continue;
    const c = getPlayerCell(player);
    if (!c) continue;
    if (team.side === 'left' ? c.x < columns : c.x >= WIDTH - columns) count++;
  }
  return count;
}

function aiForwardOf(team, x, fromX) {
  return team.side === 'left' ? x > fromX : x < fromX;
}

function aiFrozenDefenseInHand(team) {
  return game.inPlay[team.name].some((c) => c instanceof FrozenDefenseAction);
}

function aiIsMarkingOpponent(team, player) {
  const pc = getPlayerCell(player);
  if (!pc) return false;
  return board.getPlayersAt(pc.x, pc.y).some((p) => p.team !== team.name);
}

function aiBacklineMoveBlocked(team, player) {
  return aiFrozenDefenseInHand(team) && (player.position === 'DF' || player.position === 'GK');
}

function aiSideAttackLegal(team, action, side) {
  const r = action.play({ team, board, side });
  if (!r.success) return false;
  if (aiFrozenDefenseInHand(team)) {
    return r.moves.every((m) => !(m.player.position === 'DF' || m.player.position === 'GK'));
  }
  return true;
}

function aiInShootPosition(team, x) {
  return team.side === 'left' ? x >= WIDTH - 3 : x <= 2;
}

function aiBestFinishCandidate(team) {
  const opponent = board.getOpponent(team);
  if (!board.inPenaltyBox(ball.x, ball.y, opponent.side)) return null;
  let best = null;
  let bestDepth = -Infinity;
  for (const player of team.currentPlayers) {
    if (board.isCramped(player)) continue;
    const c = getPlayerCell(player);
    if (!c) continue;
    if (Math.max(Math.abs(ball.x - c.x), Math.abs(ball.y - c.y)) !== 1) continue;
    const marker =
      board.getPlayersAt(c.x, c.y).find((p) => p.team !== team.name) || null;
    const follow = Boolean(marker && marker.marking > player.tacticalThinking);
    if (!board.canOccupy(ball.x, ball.y, follow ? [player, marker] : [player])) continue;
    const depth = team.side === 'left' ? c.x : -c.x;
    if (depth > bestDepth) {
      bestDepth = depth;
      best = player;
    }
  }
  return best;
}

function aiBestCrossCandidate(team) {
  const opponent = board.getOpponent(team);
  const attackingRight = team.side === 'left';
  const antepenultimate = attackingRight ? WIDTH - 3 : 2;
  let best = null;
  let bestHeading = -Infinity;
  for (const player of team.currentPlayers) {
    if (board.isCramped(player)) continue;
    const c = getPlayerCell(player);
    if (!c) continue;
    const inBox = board.inPenaltyBox(c.x, c.y, opponent.side);
    const inCentralAntepenultimate = c.x === antepenultimate && c.y >= 2 && c.y <= HEIGHT - 3;
    if (!inBox && !inCentralAntepenultimate) continue;
    if (player.heading > bestHeading) {
      bestHeading = player.heading;
      best = player;
    }
  }
  return best;
}

function aiBestOverlapCandidate(team, overlap) {
  let best = null;
  let bestDepth = -Infinity;
  for (const player of team.currentPlayers) {
    if (aiBacklineMoveBlocked(team, player)) continue;
    const r = overlap.play({ team, player, board });
    if (!r.success) continue;
    const depth = team.side === 'left' ? r.target.x : -r.target.x;
    if (depth > bestDepth) {
      bestDepth = depth;
      best = player;
    }
  }
  return best;
}

function aiBestSideAttackFlank(team, holder) {
  const c = getPlayerCell(holder);
  if (!c) return null;
  if (c.y === 0) return 'top';
  if (c.y === HEIGHT - 1) return 'bottom';
  return null;
}

function aiCountFlankPlayers(team, side) {
  const row = side === 'top' ? 0 : HEIGHT - 1;
  let count = 0;
  for (const player of team.currentPlayers) {
    const c = getPlayerCell(player);
    if (c && c.y === row) count++;
  }
  return count;
}

function aiDribbleShootTarget(team, holder) {
  const c = getPlayerCell(holder);
  if (!c) return null;
  const marker = opponentInCell(c.x, c.y, team);
  if (!marker) return null;
  if (!(holder.dribbling > marker.marking)) return null;
  const targets = candidatesFrom(c.x, c.y, 1).filter(
    ([nx, ny]) => board.canOccupy(nx, ny, [holder]) && aiInShootPosition(team, nx)
  );
  if (targets.length === 0) return null;
  targets.sort((a, b) => (team.side === 'left' ? b[0] - a[0] : a[0] - b[0]));
  return { x: targets[0][0], y: targets[0][1] };
}

function aiTouchOfMagicTarget(team, holder) {
  const c = getPlayerCell(holder);
  if (!c) return null;
  const forward = team.side === 'left' ? 1 : -1;
  const goalX = team.side === 'left' ? WIDTH - 1 : 0;
  const goalY = Math.floor(HEIGHT / 2);
  const targets = candidatesFrom(c.x, c.y, 2)
    .filter(([nx, ny]) => {
      if (nx === c.x && ny === c.y) return false;
      const dist = Math.max(Math.abs(nx - c.x), Math.abs(ny - c.y));
      return dist >= 1 && dist <= 2 && board.canOccupy(nx, ny, [holder]) && aiInShootPosition(team, nx);
    })
    .map(([nx, ny]) => ({ x: nx, y: ny }));
  if (targets.length === 0) return null;
  targets.sort((a, b) => {
    const scoredA = a.x === goalX && a.y === goalY ? -100 : 0;
    const scoredB = b.x === goalX && b.y === goalY ? -100 : 0;
    const depthA = forward * (a.x - c.x);
    const depthB = forward * (b.x - c.x);
    return scoredA + Math.abs(a.y - goalY) - (depthA * 2) - (scoredB + Math.abs(b.y - goalY) - (depthB * 2));
  });
  return targets[0];
}

function aiSiiiiuTarget(team, siiiiu, holder) {
  const c = getPlayerCell(holder);
  if (!c) return null;
  const forward = team.side === 'left' ? 1 : -1;
  const goalY = Math.floor(HEIGHT / 2);
  const targets = candidatesFrom(c.x, c.y, 2)
    .filter(([nx, ny]) => siiiiu.play({ team, player: holder, board, target: { x: nx, y: ny } }).success)
    .map(([nx, ny]) => ({ x: nx, y: ny }));
  if (targets.length === 0) return null;
  targets.sort((a, b) => {
    const depthA = forward * (a.x - c.x);
    const depthB = forward * (b.x - c.x);
    return Math.abs(a.y - goalY) - depthA * 2 - (Math.abs(b.y - goalY) - depthB * 2);
  });
  return targets[0];
}

function aiForwardSprintTarget(team, sprint, holder) {
  if (!holder || holder.position === 'GK') return null;
  const c = getPlayerCell(holder);
  const marked = board.getPlayersAt(c.x, c.y).some((p) => p.team !== team.name);
  if (marked) return null;
  let best = null;
  let bestScore = -Infinity;
  const midY = (HEIGHT - 1) / 2;
  for (const [nx, ny] of candidatesFrom(c.x, c.y, 2)) {
    if (!sprint.play({ team, player: holder, board, target: { x: nx, y: ny } }).success) continue;
    if (!aiForwardOf(team, nx, c.x)) continue;
    const forwardProg = team.side === 'left' ? nx : -nx;
    const central = 1 - Math.abs(ny - midY) / midY;
    const score = forwardProg + central * 2;
    if (!best || score > bestScore) {
      best = { x: nx, y: ny };
      bestScore = score;
    }
  }
  return best;
}

// When on the touchline, the AI avoids shooting unless the ball has been
// static in that cell for more than one turn.
function aiAvoidTouchlineShot(ctx) {
  if (typeof ball === 'undefined' || !ball) return false;
  if (ball.y !== 0 && ball.y !== HEIGHT - 1) return false;
  return (ctx.ballStasisTurns || 0) <= 1;
}


function aiForwardPassTarget(team, passer, touchlineOnly) {
  const forward = team.side === 'left' ? 1 : -1;
  const maxCols = team.hasTeamEffect('pepStyle') ? 3 : 2;
  const byColumn = {};
  for (let dx = 1; dx <= maxCols; dx++) {
    const x = ball.x + forward * dx;
    if (x < 0 || x >= WIDTH) continue;
    for (let y = 0; y < HEIGHT; y++) {
      const receivers = board.getPlayersAt(x, y).filter((p) => p.team === team.name);
      if (receivers.length === 0) continue;
      if (touchlineOnly && y !== 0 && y !== HEIGHT - 1) continue;
      const marked = board.getPlayersAt(x, y).some((p) => p.team !== team.name);
      (byColumn[x] = byColumn[x] || []).push({ receiver: receivers[0], y, marked });
    }
  }
  const columns = Object.keys(byColumn)
    .map(Number)
    .sort((a, b) => (forward === 1 ? b - a : a - b));
  if (columns.length === 0) return null;
  const col = columns[0];
  const candidates = byColumn[col];
  const unmarked = candidates.filter((c) => !c.marked);
  const pool = unmarked.length > 0 ? unmarked : candidates;
  pool.sort((a, b) => b.receiver.tacticalThinking - a.receiver.tacticalThinking);
  return { x: col, y: pool[0].y };
}

function aiLongBallTarget(team, passer) {
  const passerCell = getPlayerCell(passer);
  const marked = passerCell
    ? board.getPlayersAt(passerCell.x, passerCell.y).some((p) => p.team !== team.name)
    : false;
  const range = passer.passing + 1 - (marked ? 2 : 0);
  const forward = team.side === 'left' ? 1 : -1;
  let best = null;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if (x === ball.x && y === ball.y) continue;
      if (getTokensInCell(x, y).length > 0) continue;
      if (Math.abs(x - ball.x) + Math.abs(y - ball.y) > range) continue;
      if (!aiForwardOf(team, x, ball.x)) continue;
      const collectible = team.currentPlayers.some((p) => {
        if (p === passer) return false;
        const pc = getPlayerCell(p);
        if (!pc) return false;
        if (!aiForwardOf(team, x, pc.x)) return false;
        return (
          Math.max(Math.abs(x - pc.x), Math.abs(y - pc.y)) === 1 &&
          moveTargetLegal(p, x, y)
        );
      });
      if (!collectible) continue;
      if (!best || (forward === 1 ? x > best.x : x < best.x)) best = { x, y };
    }
  }
  return best;
}

function aiSlipMove(team, pick) {
  const slip = pick(SlipAction);
  if (!slip) return null;
  const h = matchState.possession ? matchState.possession._token.player : null;
  for (const player of team.currentPlayers) {
    if (player === h) continue;
    if (aiBacklineMoveBlocked(team, player)) continue;
    const c = getPlayerCell(player);
    if (!c) continue;
    const marked = board.getPlayersAt(c.x, c.y).some((p) => p.team !== team.name);
    if (!marked) continue;
    for (const [nx, ny] of candidatesFrom(c.x, c.y, 1)) {
      if (slip.play({ team, player, board, target: { x: nx, y: ny } }).success) {
        return { play: slip, player, target: { x: nx, y: ny } };
      }
    }
  }
  return null;
}

function aiLooseBallGain(team, pick) {
  const move = pick(MoveAction);
  if (move) {
    for (const player of team.currentPlayers) {
      if (aiBacklineMoveBlocked(team, player)) continue;
      const c = getPlayerCell(player);
      if (!c) continue;
      if (Math.max(Math.abs(ball.x - c.x), Math.abs(ball.y - c.y)) !== 1) continue;
      if (
        move.play({ team, player, board, target: { x: ball.x, y: ball.y } }).success
      ) {
        return { play: move, player, target: { x: ball.x, y: ball.y } };
      }
    }
  }
  const sprint = pick(SprintAction);
  if (sprint) {
    for (const player of team.currentPlayers) {
      if (player.position === 'GK') continue;
      if (aiBacklineMoveBlocked(team, player)) continue;
      const c = getPlayerCell(player);
      if (!c) continue;
      if (Math.max(Math.abs(ball.x - c.x), Math.abs(ball.y - c.y)) !== 2) continue;
      if (
        sprint.play({ team, player, board, target: { x: ball.x, y: ball.y } }).success
      ) {
        return { play: sprint, player, target: { x: ball.x, y: ball.y } };
      }
    }
  }
  const shortSprint = pick(ShortSprintAction);
  if (shortSprint) {
    for (const player of team.currentPlayers) {
      if (aiBacklineMoveBlocked(team, player)) continue;
      const c = getPlayerCell(player);
      if (!c) continue;
      const distance = Math.max(Math.abs(ball.x - c.x), Math.abs(ball.y - c.y));
      if (distance < 1 || distance > 2) continue;
      if (
        shortSprint.play({ team, player, board, target: { x: ball.x, y: ball.y } }).success
      ) {
        return { play: shortSprint, player, target: { x: ball.x, y: ball.y } };
      }
    }
  }
  return null;
}

function aiClearProtectedBall(team) {
  const prot = game.freeKickProtection;
  if (!prot || prot.teamName !== team.name) return null;
  if (game.pendingPenalty === team.name) return null;
  if (ball.x !== prot.x || ball.y !== prot.y) return null;

  const hand = game.inPlay[team.name] || [];
  const canPlay = (c) => hand.includes(c) && canPlayAction(team, c);
  const taker = board.getPlayersAt(prot.x, prot.y).find((p) => p.team === team.name);
  if (!taker) return null;

  const pass = hand.find((c) => c instanceof PassAction && canPlay(c));
  if (pass) {
    const maxRange = game.pepStyle && game.pepStyle[team.name] > 0 ? 3 : 2;
    let best = null;
    for (let x = Math.max(0, prot.x - maxRange); x <= Math.min(WIDTH - 1, prot.x + maxRange); x++) {
      for (let y = 0; y < HEIGHT; y++) {
        if (x === prot.x && y === prot.y) continue;
        const receivers = board.getPlayersAt(x, y).filter((p) => p.team === team.name);
        if (receivers.length === 0) continue;
        const trial = pass.play({ passer: taker, team, target: { x, y }, board, maxRange });
        if (!trial.success || trial.intercepted) continue;
        const forward = team.side === 'left' ? x - prot.x : prot.x - x;
        const score = forward * 10 - Math.abs(y - Math.floor(HEIGHT / 2));
        if (!best || score > best.score) best = { target: { x, y }, score };
      }
    }
    if (best) return { play: pass, player: taker, target: best.target };
  }

  const cross = hand.find((c) => c instanceof CrossAction && canPlay(c));
  if (cross) {
    const receiver = aiBestCrossCandidate(team);
    if (receiver) return { play: cross, player: receiver };
  }

  const longPass = hand.find((c) => c instanceof LongPassAction && canPlay(c));
  if (longPass) {
    let best = null;
    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
        if (x === prot.x && y === prot.y) continue;
        const receivers = board.getPlayersAt(x, y).filter((p) => p.team === team.name);
        if (receivers.length === 0) continue;
        const trial = longPass.play({ passer: taker, team, target: { x, y }, board });
        if (!trial.success || trial.intercepted) continue;
        const forward = team.side === 'left' ? x - prot.x : prot.x - x;
        const score = forward * 10 - Math.abs(y - Math.floor(HEIGHT / 2));
        if (!best || score > best.score) best = { target: { x, y }, score };
      }
    }
    if (best) return { play: longPass, player: taker, target: best.target };
  }

  const shot =
    hand.find((c) => c instanceof ShootAction && canPlay(c)) ||
    hand.find((c) => c instanceof LongShotAction && canPlay(c)) ||
    hand.find((c) => c instanceof RabonaAction && canPlay(c));
  if (shot) return { play: shot };

  return null;
}

// ---- Shared "always play" card handling + post-turn fallbacks ----
// Used by every AI coach regardless of offense/defense style.

function aiSharedPre(ctx) {
  const { game, team, pick, hasBall } = ctx;

  const brokenDefense = pick(BrokenDefenseAction);
  if (brokenDefense) return { play: brokenDefense };

  const headsInTheClouds = pick(HeadsInTheCloudsAction);
  if (headsInTheClouds) return { play: headsInTheClouds };

  const injuryRisk = pick(InjuryRiskAction);
  if (injuryRisk) return { play: injuryRisk };

  const redMist = pick(RedMistAction);
  if (redMist) return { play: redMist };

  const lostDressingRoom = pick(LostDressingRoomAction);
  if (lostDressingRoom) return { play: lostDressingRoom };

  const fatigue = pick(FatigueAction);
  if (fatigue) return { play: fatigue };

  const moraleCollapse = pick(MoraleCollapseAction);
  if (moraleCollapse) return { play: moraleCollapse };

  const suspensionShadow = pick(SuspensionShadowAction);
  if (suspensionShadow) return { play: suspensionShadow };

  const tacticalConfusion = pick(TacticalConfusionAction);
  if (tacticalConfusion) return { play: tacticalConfusion };

  const goalkeeperBlunder = pick(GoalkeeperBlunderAction);
  if (goalkeeperBlunder) return { play: goalkeeperBlunder };

  const captainsMutiny = pick(CaptainsMutinyAction);
  if (captainsMutiny) return { play: captainsMutiny };

  const weatherWoes = pick(WeatherWoesAction);
  if (weatherWoes) return { play: weatherWoes };

  const tacklingMadness = pick(TacklingMadnessAction);
  if (tacklingMadness) return { play: tacklingMadness };

  const highMobility = pick(HighMobilityAction);
  if (highMobility) return { play: highMobility };

  const possession = matchState.possession;
  const holder = possession ? possession._token.player : null;

  const ownership = pick(PossessionAction);
  if (ownership) return { play: ownership };

  const argentoPride = pick(ArgentoPrideAction);
  if (argentoPride) return { play: argentoPride };

  const comingHome = pick(ComingHomeAction);
  if (comingHome) return { play: comingHome };
  const underdogBite = pick(UnderdogBiteAction);
  if (underdogBite) return { play: underdogBite };

  const bigMatchMentality = pick(BigMatchMentalityAction);
  if (bigMatchMentality) return { play: bigMatchMentality };

  const tempoControl = pick(TempoControlAction);
  if (tempoControl) return { play: tempoControl };

  const desperation = pick(DesperationAction);
  if (desperation) return { play: desperation };

  const gameManagement = pick(GameManagementAction);
  if (gameManagement) return { play: gameManagement };

  const timeWasting = pick(TimeWastingAction);
  if (timeWasting) return { play: timeWasting };

  const shithousery = pick(ShithouseryAction);
  if (shithousery) return { play: shithousery };

  const timeWall = pick(TimeWallAction);
  if (timeWall && !hasBall) return { play: timeWall };

  const secondWind = pick(SecondWindAction);
  if (secondWind && game.actionPoints[team.name] <= 1) return { play: secondWind };

  const defensiveWall = pick(DefensiveWallAction);
  if (defensiveWall && !hasBall) return { play: defensiveWall };

  const frozenDefense = pick(FrozenDefenseAction);
  if (frozenDefense && !hasBall) return { play: frozenDefense };

  const brittleBones = pick(BrittleLittleBonesAction);
  if (brittleBones && !hasBall) return { play: brittleBones };

  const atlasWall = pick(AtlasWallAction);
  if (atlasWall && !hasBall) return { play: atlasWall };

  const garraCharrua = pick(GarraCharruaAction);
  if (garraCharrua && !hasBall) return { play: garraCharrua };

  const compactShape = pick(CompactShapeAction);
  if (compactShape && !hasBall) return { play: compactShape };

  if (!hasBall) {
    const scoreDiff = game.score[team.name] - game.score[board.getOpponent(team).name];
    const parkTheBus = scoreDiff > 0 ? pick(ParkTheBusAction) : null;
    if (parkTheBus) return { play: parkTheBus };
  }

  return null;
}

// Loose-ball handling: nothing on the ball, no clear carrier.
function aiSharedLoose(ctx) {
  const { team, pick } = ctx;
  const clearanceLoose = pick(ClearanceAction);
  if (clearanceLoose) {
    const bc = ball;
    const nearDefender = team.currentPlayers.some((p) => {
      if (p.position !== 'DF' && p.position !== 'GK') return false;
      const c = getPlayerCell(p);
      if (!c) return false;
      return Math.max(Math.abs(c.x - bc.x), Math.abs(c.y - bc.y)) === 1;
    });
    if (nearDefender) return { play: clearanceLoose };
  }
  const finish = pick(FinishAction);
  if (finish) {
    const finisher = aiBestFinishCandidate(team);
    if (finisher) return { play: finish, player: finisher };
  }
  const gain = aiLooseBallGain(team, pick);
  if (gain) return gain;
  return null;
}

// Post-turn fallback cards when nothing in the offensive/defensive style fits.
function aiSharedPost(ctx) {
  const { game, team, pick, hand, hasBall, holder } = ctx;
  const opponent = board.getOpponent(team);

  const eureka = pick(EurekaAction);
  if (eureka) return { play: eureka };

  const growingMenace = pick(GrowingMenaceAction);
  if (growingMenace && game.turn >= 3) return { play: growingMenace };

  const alwaysMoving = pick(AlwaysMovingAction);
  if (alwaysMoving) return { play: alwaysMoving };

  const peakFitness = pick(PeakFitnessAction);
  if (peakFitness) return { play: peakFitness };

  const script = pick(TheScriptAction);
  if (script && !hand.some((c) => c !== script && canPlayAction(team, c))) return { play: script };

  const videoSession = pick(VideoSessionAction);
  if (videoSession && !hand.some((c) => c !== videoSession && canPlayAction(team, c)))
    return { play: videoSession };

  const switchGears = pick(SwitchGearsAction);
  if (
    switchGears &&
    (!hasBall
      ? game.score[team.name] >= game.score[opponent.name]
      : game.turnsLeft <= 5 && game.score[team.name] < game.score[opponent.name])
  )
    return { play: switchGears };

  const noPainNoGain = pick(NoPainNoGainAction);
  if (noPainNoGain && !hasBall) return { play: noPainNoGain };

  const fortress = pick(FortressMentalityAction);
  if (fortress && !hasBall) return { play: fortress };

  const ghostRun = pick(GhostRunAction);
  if (ghostRun && hasBall) {
    const holderCell2 = holder ? getPlayerCell(holder) : null;
    const deep = holderCell2 && (team.side === 'left' ? holderCell2.x >= WIDTH - 4 : holderCell2.x <= 3);
    if (deep) return { play: ghostRun };
  }

  const doOrDie = pick(DoOrDieAction);
  if (
    doOrDie &&
    game.turnsLeft <= 4 &&
    game.score[team.name] < game.score[opponent.name] &&
    team.currentPlayers.some((p) => p.isStar)
  )
    return { play: doOrDie };

  const veteranBench = pick(VeteranBenchAction);
  if (veteranBench) return { play: veteranBench };

  const combo = pick(ComboAction);
  if (combo && hand.some((c) => c !== combo && canPlayAction(team, c))) return { play: combo };

  const pepStyle = pick(PepStyleAction);
  if (pepStyle) return { play: pepStyle };

  const germanEfficiency = pick(GermanEfficiencyAction);
  if (germanEfficiency) return { play: germanEfficiency };

  const coach = pick(CoachInstructionsAction);
  const anyPlayable = hand.some((c) => c !== coach && canPlayAction(team, c));
  if (coach && !anyPlayable) return { play: coach };

  const hold = pick(HoldAction);
  if (hold) {
    const bestOther = hand
      .filter((c) => c !== hold)
      .sort((a, b) => (b.rarity || 0) - (a.rarity || 0))[0];
    if (bestOther && (bestOther.rarity || 0) >= 2) return { play: hold };
  }

  const extraTime = pick(ExtraTimeAction);
  if (extraTime) return { play: extraTime };

  return null;
}

// Compose an offense style + defense style into a full AI coach.
function buildAiCoach(playerName, offense, defense, description) {
  return {
    name: playerName,
    description,
    chooseAction(game, team) {
      const ctx = makeAiContext(game, team);

      const pre = aiSharedPre(ctx);
      if (pre) return pre;

      if (!ctx.holder) {
        const loose = aiSharedLoose(ctx);
        if (loose) return loose;
      }

      const clearance = ctx.pick(ClearanceAction);
      if (
        clearance &&
        ctx.hasBall &&
        ctx.holder &&
        (ctx.holder.position === 'DF' || ctx.holder.position === 'GK')
      ) {
        return { play: clearance };
      }

      const defenseStyle = DEFENSE_STYLES[defense];
      if (defenseStyle && ctx.defending) {
        const dDecision = defenseStyle(ctx);
        if (dDecision) return dDecision;
      }

      const offenseStyle = OFFENSE_STYLES[offense];
      if (offenseStyle && ctx.hasBall) {
        const oDecision = offenseStyle(ctx);
        if (oDecision) return oDecision;
      }

      const post = aiSharedPost(ctx);
      if (post) return post;

      return { skip: true };
    },
  };
}

const AI_PLAYERS = {
  'basic-coach': buildAiCoach(
    'basic-coach',
    'balanced',
    'fullPitch',
    'A defensive-minded coach. When defending it always plays Marking or Pressure, then Tackle, then Offside trap, then Fallback when the back line is under-manned, and Hard tackle in close games late on, using Dirty tricks instead of Pressure whenever a defender is marking the ball carrier, and using Forced press only when no other defensive card is available, and using Risky tackle as a last resort when no other defensive card is playable. It discards Frozen defense as soon as possible whenever it does not have the ball. When nobody has the ball it finishes or moves a player onto the ball. It only uses Short sprint to reach the loose ball when neither Move nor Sprint can get a player there, accepting the 3-turn cramp. In possession it plays Siiiiu! immediately whenever the ball carrier is in the last five columns, then shoots, finishes or crosses, plays Flair when it has the ball and no shoot, cross or finishing card is playable, sprints the unmarked carrier forward, uses overlap with a touchline pass, plays Inspiration/Intensity/Playmaking, dribbles into a shooting position, passes forward (preferring unmarked, then tactical thinking) and uses long ball when it can set up a move or finish. It always plays Possession immediately when it is in hand to gain extra action points, plays Argento pride immediately as soon as it is in hand, and plays Tiki-taka as soon as it is in hand though only after any shooting, cross or finishing opportunity. It parks the bus as soon as the card is available while it does not have the ball, but only when it is leading (has scored more goals than the opposition). It plays Eureka and Pep Style as fallbacks when no other action fits. When it has the ball and no other attacking card fits it uses Slip to shake a marked teammate loose from their marker. It plays Growing Menace from turn 3 onward to start stacking forward shooting, and Peak Fitness immediately for the rest-of-match boost. It plays No Pain No Gain and Fortress Mentality whenever it does not have the ball so their defensive payoffs start early. It holds The Script and Video Session until its hand has nothing else playable, then uses them to refill with searched or recovered cards. It switches into the Defensive gear when level or leading without the ball, and into the Attacking gear when chasing a deficit in the last five turns with the ball. It plays Ghost Run only once its ball carrier is already deep in the final four columns so the untouchable run goes straight at goal. It saves Do Or Die for a losing position with four or fewer turns left and at least one star on the pitch, accepting the injury risk for the +4 shooting turn. When nothing else fits it redraws with Coach direction, otherwise it skips.'
  ),

  'own-half-marker': buildAiCoach(
    'own-half-marker',
    'balanced',
    'ownHalf',
    'A disciplined defensive coach that only marks opponents inside its own half, keeping the team compact and narrowing the play, while attacking in the usual well-rounded way. It refuses to chase runners deep in the opposition half.'
  ),

  'loose-tackler': buildAiCoach(
    'loose-tackler',
    'balanced',
    'looseTackle',
    'A physical defensive coach that marks loosely, relying on Press, Tackle and Risky Tackle to win the ball back aggressively instead of tracking every runner. In attack it plays like the balanced coach.'
  ),

  'wide-cross-coach': buildAiCoach(
    'wide-cross-coach',
    'wideCross',
    'fullPitch',
    'An attacking coach that funnels play down the touchlines, uses overlap and side attacks, and whips the ball into the box for header finishes. It defends with the usual full-pitch marking.'
  ),

  'midfield-overload': buildAiCoach(
    'midfield-overload',
    'midfieldOverload',
    'fullPitch',
    'An attacking coach that pushes midfielders into advanced positions to overload the box, using through balls and one-twos instead of relying on a lone target-man striker. It defends with full-pitch marking.'
  ),

  'wide-and-tackle': buildAiCoach(
    'wide-and-tackle',
    'wideCross',
    'looseTackle',
    'A high-energy coach that combines loose, tackle-based defending with a wide touchline-and-cross attacking approach. Presses hard and attacks down the flanks.'
  ),

  'half-overload': buildAiCoach(
    'half-overload',
    'midfieldOverload',
    'ownHalf',
    'A compact, disciplined coach that only marks in its own half while pushing midfielders forward to overload the attack. Defends deep, attacks through the middle.'
  ),
};
