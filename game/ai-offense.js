// game/ai-offense.js — Composible offensive AI styles.
//
// Each style is a function `(ctx) => decision | null` deciding what to do while
// the team HAS the ball. `ctx` comes from `makeAiContext` (ai-defense.js).
//
// Styles:
//   balanced        — the original "basic-coach" attack (exact behaviour).
//   wideCross       — attack down the touchlines and put the ball into the box.
//   midfieldOverload— push midfielders forward to attack instead of a target man.

function oForwardOf(team, x, fromX) {
  return team.side === 'left' ? x > fromX : x < fromX;
}

function oShootPosition(team, x) {
  return team.side === 'left' ? x >= WIDTH - 3 : x <= 2;
}

function oHolderCell(team) {
  const possession = matchState.possession;
  const holder = possession ? possession._token.player : null;
  return holder ? getPlayerCell(holder) : null;
}

// Marked runners — counting teammates currently next to an opponent.
function oRunnerOpen(team, player) {
  if (aiBacklineMoveBlocked(team, player)) return false;
  const c = getPlayerCell(player);
  if (!c) return false;
  return !board.getPlayersAt(c.x, c.y).some((p) => p.team !== team.name);
}

// Stronger aggression: prefer forwards nearest the goal AND in scoring position.
function oBestForwardRunner(team, pick) {
  const sprint = pick(SprintAction);
  if (!sprint) return null;
  let best = null;
  let bestScore = -Infinity;
  for (const player of team.currentPlayers) {
    if (player.position === 'GK') continue;
    if (!oRunnerOpen(team, player)) continue;
    const c = getPlayerCell(player);
    if (!c) continue;
    if (!oForwardOf(team, c.x + (team.side === 'left' ? 1 : -1), c.x)) continue;
    const depth = team.side === 'left' ? c.x : -c.x;
    const score = depth + (player.shooting || 0) * 0.3 + (player.position === 'FW' ? 2 : player.position === 'MF' ? 1 : 0);
    if (score > bestScore) { bestScore = score; best = player; }
  }
  return best;
}

// Best touchline player who is open and can receive a pass/dribble wide.
function oBestWideRunner(team, pick) {
  let best = null;
  let bestScore = -Infinity;
  for (const player of team.currentPlayers) {
    if (player.position === 'GK') continue;
    if (!oRunnerOpen(team, player)) continue;
    const c = getPlayerCell(player);
    if (!c) continue;
    if (c.y !== 0 && c.y !== HEIGHT - 1) continue;
    const depth = team.side === 'left' ? c.x : -c.x;
    const score = depth + (player.dribbling || 0) * 0.2;
    if (score > bestScore) { bestScore = score; best = player; }
  }
  return best;
}

// ---- OFFENSE STYLES ----

const OFFENSE_STYLES = {
  // Exact behaviour of the original "basic-coach" attacking block.
  balanced(ctx) {
    const { game, team, pick, hand } = ctx;
    const holder = ctx.holder;

    const yellowCard = pick(YellowCardAction);
    if (yellowCard && holder) {
      const hc = getPlayerCell(holder);
      let bestTarget = null;
      let bestDist = Infinity;
      for (const opp of board.getOpponent(team).currentPlayers) {
        if (opp.hasEffect('scaredToTackle')) continue;
        const c = getPlayerCell(opp);
        if (!c) continue;
        const dist = hc
          ? Math.max(Math.abs(c.x - hc.x), Math.abs(c.y - hc.y))
          : Math.max(Math.abs(c.x - ball.x), Math.abs(c.y - ball.y));
        if (dist < bestDist) {
          bestDist = dist;
          bestTarget = opp;
        }
      }
      if (bestTarget) return { play: yellowCard, player: bestTarget };
    }

    const muscleMemory = pick(MuscleMemoryAction);
    if (muscleMemory) return { play: muscleMemory };

    const siiiiu = pick(SiiiiuAction);
    if (siiiiu) {
      const target = aiSiiiiuTarget(team, siiiiu, holder);
      if (target) return { play: siiiiu, target };
    }

    const jogaBonito = pick(JogaBonitoAction);
    if (jogaBonito) return { play: jogaBonito };

    const totalFootball = pick(TotalFootballAction);
    if (totalFootball) return { play: totalFootball };

    const nordicHammer = pick(NordicHammerAction);
    if (nordicHammer) return { play: nordicHammer };

    const terangaRoar = pick(TerangaRoarAction);
    if (terangaRoar) return { play: terangaRoar };

    const sunInTheirEyes = pick(SunInTheirEyesAction);
    if (sunInTheirEyes) return { play: sunInTheirEyes };

    const touchOfMagic = pick(TouchOfMagicAction);
    if (touchOfMagic) {
      const target = aiTouchOfMagicTarget(team, holder);
      if (target) return { play: touchOfMagic, target };
    }

    const shoot = pick(ShootAction);
    if (shoot && !aiAvoidTouchlineShot(ctx)) return { play: shoot };

    const hatTrickHero = pick(HatTrickHeroAction);
    if (hatTrickHero) return { play: hatTrickHero };

    const cannonball = pick(CannonballAction);
    if (cannonball) return { play: cannonball };

    const rabona = pick(RabonaAction);
    if (rabona) return { play: rabona };

    const volley = pick(VolleyAction);
    if (volley && holder) {
      const c = getPlayerCell(holder);
      if (c) {
        const attackingRight = team.side === 'left';
        const inLastThree = attackingRight ? c.x >= board.width - 3 : c.x <= 2;
        if (inLastThree) return { play: volley };
      }
    }

    const finish = pick(FinishAction);
    if (finish) {
      const finisher = aiBestFinishCandidate(team);
      if (finisher) return { play: finish, player: finisher };
    }

    const headerFinish = pick(HeaderFinishAction);
    if (headerFinish) {
      const finisher = aiBestFinishCandidate(team);
      if (finisher) return { play: headerFinish, player: finisher };
    }

    const knockdownFinish = pick(KnockdownFinishAction);
    if (knockdownFinish) {
      const finisher = aiBestFinishCandidate(team);
      if (finisher) return { play: knockdownFinish, player: finisher };
    }

    const secondBallHeader = pick(SecondBallHeaderAction);
    if (secondBallHeader && matchState.lastShotSave) {
      const finisher = aiBestFinishCandidate(team);
      if (finisher) return { play: secondBallHeader, player: finisher };
    }

    const cross = pick(CrossAction);
    if (cross) {
      const target = aiBestCrossCandidate(team);
      if (target) return { play: cross, player: target };
    }

    const runAndCross = pick(RunAndCrossAction);
    if (runAndCross) {
      const target = aiBestCrossCandidate(team);
      if (target) return { play: runAndCross, player: target };
    }

    const runAndCrossFlank = pick(RunAndCrossFlankAction);
    if (runAndCrossFlank) {
      const target = aiBestCrossCandidate(team);
      if (target) return { play: runAndCrossFlank, player: target };
    }

    const dribbleAndCross = pick(DribbleAndCrossAction);
    if (dribbleAndCross) {
      const target = aiBestCrossCandidate(team);
      if (target) return { play: dribbleAndCross, player: target };
    }

    const overlap = pick(OverlapAction);
    if (overlap) {
      const bestOverlap = aiBestOverlapCandidate(team, overlap);
      if (bestOverlap) return { play: overlap, player: bestOverlap };
    }

    const underlap = pick(UnderlapAction);
    if (underlap) {
      const touchlinePlayer = team.currentPlayers.find((p) => {
        const c = getPlayerCell(p);
        if (!c) return false;
        return (c.y === 0 || c.y === board.height - 1) && underlap.play({ team, player: p, board }).success;
      });
      if (touchlinePlayer) return { play: underlap, player: touchlinePlayer };
    }

    const throughBall = pick(ThroughBallAction);
    if (throughBall && holder) {
      const attackingRight = team.side === 'left';
      let bestTarget = null;
      let bestScore = -Infinity;
      for (const teammate of team.currentPlayers) {
        if (teammate === holder) continue;
        const c = getPlayerCell(teammate);
        if (!c) continue;
        const dx = c.x - ball.x;
        if (attackingRight ? dx < 2 : dx > -2) continue;
        const result = throughBall.play({ passer: holder, team, target: { x: c.x, y: c.y }, board });
        if (!result.success) continue;
        if (result.intercepted) continue;
        const score = c.x * (attackingRight ? 1 : -1) + (teammate.shooting || 0) * 0.5;
        if (score > bestScore) { bestScore = score; bestTarget = { x: c.x, y: c.y }; }
      }
      if (bestTarget) return { play: throughBall, target: bestTarget };
    }

    const oneTwo = pick(OneTwoAction);
    if (oneTwo && holder) {
      const c = getPlayerCell(holder);
      if (c) {
        const attackingRight = team.side === 'left';
        const forward = attackingRight ? 1 : -1;
        let bestTarget = null;
        let bestScore = -Infinity;
        for (let dy = -1; dy <= 1; dy++) {
          const nx = c.x + forward;
          const ny = c.y + dy;
          if (nx < 0 || nx >= WIDTH || ny < 0 || ny >= HEIGHT) continue;
          const result = oneTwo.play({ passer: holder, team, target: { x: nx, y: ny }, board });
          if (!result.success) continue;
          if (result.intercepted) continue;
          const score = nx * (attackingRight ? 1 : -1);
          if (score > bestScore) { bestScore = score; bestTarget = { x: nx, y: ny }; }
        }
        if (bestTarget) return { play: oneTwo, target: bestTarget };
      }
    }

    const pass = pick(PassAction);

    const sideAttack = pick(SideAttackAction);
    if (sideAttack) {
      const flank = aiBestSideAttackFlank(team, holder);
      if (flank && aiCountFlankPlayers(team, flank) >= 2 && aiSideAttackLegal(team, sideAttack, flank)) {
        return { play: sideAttack, side: flank };
      }
    }

    const overload = pick(OverloadAction);
    if (overload && ctx.hasBall) {
      const result = overload.play({ team, board });
      if (result.success) return { play: overload };
    }

    const triggerPress = pick(TriggerPressAction);
    if (triggerPress && !ctx.hasBall) {
      const result = triggerPress.play({ team, board });
      if (result.success) return { play: triggerPress };
    }

    const tacticalSub = pick(TacticalSubAction);
    if (tacticalSub && team.subsRemaining > 0) {
      const subTarget = team.currentPlayers.find((p) => {
        if (p.position === 'GK') return false;
        if (p.hasEffect('exhausted') || p.hasEffect('injured')) return true;
        return false;
      });
      if (subTarget) {
        const bench = team.availableSubstitutes();
        if (bench.length > 0) {
          return { play: tacticalSub, player: subTarget };
        }
      }
    }

    const triggerManMarking = pick(TriggerManMarkingAction);
    if (triggerManMarking && !team.hasTeamEffect('triggerManMarking')) {
      return { play: triggerManMarking };
    }

    const parkTheMidfield = pick(ParkTheMidfieldAction);
    if (parkTheMidfield) {
      const result = parkTheMidfield.play({ team, board });
      if (result.success) return { play: parkTheMidfield };
    }

    const switchPlay = pick(SwitchPlayAction);
    if (switchPlay && holder) {
      const c = getPlayerCell(holder);
      if (c && (c.y === 0 || c.y === HEIGHT - 1)) {
        const targetRow = c.y === 0 ? HEIGHT - 1 : 0;
        const forward = team.side === 'left' ? -1 : 1;
        let bestTarget = null;
        for (let x = 0; x < WIDTH; x++) {
          const matesAtCell = board
            .getPlayersAt(x, targetRow)
            .filter((p) => p.team === team.name);
          if (matesAtCell.length === 0) continue;
          const opponentsAtCell = board
            .getPlayersAt(x, targetRow)
            .filter((p) => p.team !== team.name);
          if (opponentsAtCell.some((o) => o.marking + o.tacticalThinking >= holder.passing + 3)) continue;
          if (!bestTarget || forward * x > forward * bestTarget.x) bestTarget = { x, y: targetRow };
        }
        if (bestTarget) return { play: switchPlay, target: bestTarget };
      }
    }

    const tikiTaka = pick(TikiTakaAction);
    if (tikiTaka) return { play: tikiTaka };

    const oneTwoWall = pick(OneTwoWallAction);
    if (oneTwoWall) return { play: oneTwoWall };

    const hasScoringCard = hand.some(
      (c) => c instanceof ShootAction || c instanceof FinishAction || c instanceof CrossAction
    );
    if (!hasScoringCard) {
      const longShot = pick(LongShotAction);
      if (longShot) return { play: longShot };
    }

    const flair = pick(FlairAction);
    if (flair) {
      const hasShootPlayable = Boolean(
        pick(ShootAction) || pick(FinishAction) || pick(CrossAction) || pick(LongShotAction)
      );
      if (!hasShootPlayable) return { play: flair };
    }

    const hasAnyScoringCard = hand.some(
      (c) =>
        c instanceof ShootAction ||
        c instanceof FinishAction ||
        c instanceof CrossAction ||
        c instanceof TouchOfMagicAction ||
        c instanceof SiiiiuAction
    );
    if (!hasAnyScoringCard) {
      const ouch = pick(OuchAction);
      if (ouch) return { play: ouch };
    }

    const sprint = pick(SprintAction);
    if (sprint) {
      const target = aiForwardSprintTarget(team, sprint, holder);
      if (target && !aiBacklineMoveBlocked(team, holder)) {
        return { play: sprint, player: holder, target };
      }
    }

    const inspiration = pick(InspirationAction);
    if (inspiration) return { play: inspiration };

    const intensity = pick(IntensityAction);
    if (intensity) return { play: intensity };

    const playmaking = pick(PlaymakingAction);
    if (playmaking) return { play: playmaking };

    const dribble = pick(DribblingAction);
    if (dribble) {
      const target = aiDribbleShootTarget(team, holder);
      if (target) return { play: dribble, target };
    }

    if (pass) {
      const target = aiForwardPassTarget(team, holder, false);
      if (target) return { play: pass, target };
    }

    const longPass = pick(LongPassAction);
    if (longPass) {
      const target = aiForwardPassTarget(team, holder, false);
      if (target) return { play: longPass, target };
    }

    const longBall = pick(LongBallAction);
    if (longBall) {
      const onePointLeft = game.actionPoints[team.name] === 1;
      const moveCard = hand.some((c) => c instanceof MoveAction);
      const canMoveOrFinish = Boolean(pick(MoveAction) || pick(FinishAction));
      if (onePointLeft || (moveCard && canMoveOrFinish)) {
        const target = aiLongBallTarget(team, holder);
        if (target) return { play: longBall, target };
      }
    }

    const slip = aiSlipMove(team, pick);
    if (slip) return slip;

    return null;
  },

  // Attack down the touchlines and get the ball into the box to a header target.
  wideCross(ctx) {
    const { game, team, pick, hand } = ctx;
    const holder = ctx.holder;

    // Feed the wide channels first: run/overlap/side-attack/cross take priority.
    const sideAttack = pick(SideAttackAction);
    if (sideAttack) {
      const flank = aiBestSideAttackFlank(team, holder);
      if (flank && aiCountFlankPlayers(team, flank) >= 1 && aiSideAttackLegal(team, sideAttack, flank)) {
        return { play: sideAttack, side: flank };
      }
    }

    const cross = pick(CrossAction);
    if (cross) {
      const target = aiBestCrossCandidate(team);
      if (target) return { play: cross, player: target };
    }

    const runAndCross = pick(RunAndCrossAction);
    if (runAndCross) {
      const target = aiBestCrossCandidate(team);
      if (target) return { play: runAndCross, player: target };
    }

    const runAndCrossFlank = pick(RunAndCrossFlankAction);
    if (runAndCrossFlank) {
      const target = aiBestCrossCandidate(team);
      if (target) return { play: runAndCrossFlank, player: target };
    }

    const dribbleAndCross = pick(DribbleAndCrossAction);
    if (dribbleAndCross) {
      const target = aiBestCrossCandidate(team);
      if (target) return { play: dribbleAndCross, player: target };
    }

    const overlap = pick(OverlapAction);
    if (overlap) {
      const bestOverlap = aiBestOverlapCandidate(team, overlap);
      if (bestOverlap) return { play: overlap, player: bestOverlap };
    }

    const underlap = pick(UnderlapAction);
    if (underlap) {
      const touchlinePlayer = team.currentPlayers.find((p) => {
        const c = getPlayerCell(p);
        if (!c) return false;
        return (c.y === 0 || c.y === board.height - 1) && underlap.play({ team, player: p, board }).success;
      });
      if (touchlinePlayer) return { play: underlap, player: touchlinePlayer };
    }

    const headerFinish = pick(HeaderFinishAction);
    if (headerFinish) {
      const finisher = aiBestFinishCandidate(team);
      if (finisher) return { play: headerFinish, player: finisher };
    }

    const knockdownFinish = pick(KnockdownFinishAction);
    if (knockdownFinish) {
      const finisher = aiBestFinishCandidate(team);
      if (finisher) return { play: knockdownFinish, player: finisher };
    }

    const secondBallHeader = pick(SecondBallHeaderAction);
    if (secondBallHeader && matchState.lastShotSave) {
      const finisher = aiBestFinishCandidate(team);
      if (finisher) return { play: secondBallHeader, player: finisher };
    }

    const shoot = pick(ShootAction);
    if (shoot && !aiAvoidTouchlineShot(ctx)) return { play: shoot };

    const finish = pick(FinishAction);
    if (finish) {
      const finisher = aiBestFinishCandidate(team);
      if (finisher) return { play: finish, player: finisher };
    }

    const rabona = pick(RabonaAction);
    if (rabona) return { play: rabona };

    const volley = pick(VolleyAction);
    if (volley && holder) {
      const c = getPlayerCell(holder);
      if (c) {
        const attackingRight = team.side === 'left';
        const inLastThree = attackingRight ? c.x >= board.width - 3 : c.x <= 2;
        if (inLastThree) return { play: volley };
      }
    }

    // Move a wide player up the flank when possible.
    const sprint = pick(SprintAction);
    if (sprint && holder) {
      const wide = oBestWideRunner(team, pick);
      if (wide) {
        const c = getPlayerCell(wide);
        if (c) {
          const target = { x: c.x + (team.side === 'left' ? 1 : -1), y: c.y };
          if (
            target.x >= 0 && target.x < WIDTH &&
            sprint.play({ team, player: wide, board, target }).success
          ) {
            return { play: sprint, player: wide, target };
          }
        }
      }
    }

    // Prefer touchline passes forward.
    const pass = pick(PassAction);
    if (pass) {
      const target = aiForwardPassTarget(team, holder, true);
      if (target) return { play: pass, target };
    }

    const longPass = pick(LongPassAction);
    if (longPass) {
      const target = aiForwardPassTarget(team, holder, true);
      if (target) return { play: longPass, target };
    }

    // General forward pass.
    if (pass) {
      const target = aiForwardPassTarget(team, holder, false);
      if (target) return { play: pass, target };
    }

    const tikiTaka = pick(TikiTakaAction);
    if (tikiTaka) return { play: tikiTaka };

    const flair = pick(FlairAction);
    if (flair) return { play: flair };

    return null;
  },

  // Push midfielders forward to attack instead of relying on a lone target man.
  midfieldOverload(ctx) {
    const { game, team, pick, hand } = ctx;
    const holder = ctx.holder;

    const shoot = pick(ShootAction);
    if (shoot && !aiAvoidTouchlineShot(ctx)) return { play: shoot };

    const finish = pick(FinishAction);
    if (finish) {
      const finisher = aiBestFinishCandidate(team);
      if (finisher) return { play: finish, player: finisher };
    }

    const headerFinish = pick(HeaderFinishAction);
    if (headerFinish) {
      const finisher = aiBestFinishCandidate(team);
      if (finisher) return { play: headerFinish, player: finisher };
    }

    const knockdownFinish = pick(KnockdownFinishAction);
    if (knockdownFinish) {
      const finisher = aiBestFinishCandidate(team);
      if (finisher) return { play: knockdownFinish, player: finisher };
    }

    // Move midfielders up into shooting/passing lanes.
    const throughBall = pick(ThroughBallAction);
    if (throughBall && holder) {
      const attackingRight = team.side === 'left';
      let bestTarget = null;
      let bestScore = -Infinity;
      for (const teammate of team.currentPlayers) {
        if (teammate === holder) continue;
        const c = getPlayerCell(teammate);
        if (!c) continue;
        const dx = c.x - ball.x;
        if (attackingRight ? dx < 2 : dx > -2) continue;
        const result = throughBall.play({ passer: holder, team, target: { x: c.x, y: c.y }, board });
        if (!result.success) continue;
        if (result.intercepted) continue;
        const score = c.x * (attackingRight ? 1 : -1) + (teammate.shooting || 0) * 0.5 +
          (teammate.position === 'MF' ? 1.5 : teammate.position === 'FW' ? 1 : 0);
        if (score > bestScore) { bestScore = score; bestTarget = { x: c.x, y: c.y }; }
      }
      if (bestTarget) return { play: throughBall, target: bestTarget };
    }

    const oneTwo = pick(OneTwoAction);
    if (oneTwo && holder) {
      const c = getPlayerCell(holder);
      if (c) {
        const attackingRight = team.side === 'left';
        const forward = attackingRight ? 1 : -1;
        let bestTarget = null;
        let bestScore = -Infinity;
        for (let dy = -1; dy <= 1; dy++) {
          const nx = c.x + forward;
          const ny = c.y + dy;
          if (nx < 0 || nx >= WIDTH || ny < 0 || ny >= HEIGHT) continue;
          const result = oneTwo.play({ passer: holder, team, target: { x: nx, y: ny }, board });
          if (!result.success) continue;
          if (result.intercepted) continue;
          const score = nx * (attackingRight ? 1 : -1);
          if (score > bestScore) { bestScore = score; bestTarget = { x: nx, y: ny }; }
        }
        if (bestTarget) return { play: oneTwo, target: bestTarget };
      }
    }

    const overlap = pick(OverlapAction);
    if (overlap) {
      const bestOverlap = aiBestOverlapCandidate(team, overlap);
      if (bestOverlap) return { play: overlap, player: bestOverlap };
    }

    const parkTheMidfield = pick(ParkTheMidfieldAction);
    if (parkTheMidfield) {
      const result = parkTheMidfield.play({ team, board });
      if (result.success) return { play: parkTheMidfield };
    }

    // Move a forward MF into an advanced shooting position.
    const sprint = pick(SprintAction);
    if (sprint && holder) {
      const runner = oBestForwardRunner(team, pick);
      if (runner) {
        const c = getPlayerCell(runner);
        if (c && !aiBacklineMoveBlocked(team, runner)) {
          const target = aiForwardSprintTarget(team, sprint, runner);
          if (target && oForwardOf(team, target.x, c.x)) {
            return { play: sprint, player: runner, target };
          }
        }
      }
    }

    const pass = pick(PassAction);
    if (pass) {
      const target = aiForwardPassTarget(team, holder, false);
      if (target) return { play: pass, target };
    }

    const cross = pick(CrossAction);
    if (cross) {
      const target = aiBestCrossCandidate(team);
      if (target) return { play: cross, player: target };
    }

    const longPass = pick(LongPassAction);
    if (longPass) {
      const target = aiForwardPassTarget(team, holder, false);
      if (target) return { play: longPass, target };
    }

    const tikiTaka = pick(TikiTakaAction);
    if (tikiTaka) return { play: tikiTaka };

    const flair = pick(FlairAction);
    if (flair) return { play: flair };

    return null;
  },
};

const AI_OFFENSE_ORDER = ['balanced', 'wideCross', 'midfieldOverload'];
