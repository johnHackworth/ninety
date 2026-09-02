// game/ai-defense.js — Composible defensive AI styles.
//
// Each style is a function `(ctx) => decision | null` that decides what to do
// while the team does NOT have the ball. `ctx` is built by `makeAiContext` in
// this file (shared with the offense coordinator).
//
// `decision` is the same shape used by `chooseAction`: `{ play, player, target }`
// or `{ skip: true }`. Returning `null` means "no defensive move; let the
// coordinator try the offense phase / fallbacks".
//
// Styles:
//   fullPitch    — mark opponents all over the pitch (the original default).
//   ownHalf      — only mark opponents inside our own half; stay compact.
//   looseTackle  — mark less, rely on tackles/pressure to win the ball.

function makeAiContext(game, team) {
  const hand = game.inPlay[team.name];
  const canPlay = (c) => hand.includes(c) && canPlayAction(team, c);
  const pick = (Type) => hand.find((c) => c instanceof Type && canPlay(c));

  const possession = matchState.possession;
  const holder = possession ? possession._token.player : null;
  const hasBall = Boolean(holder && holder.team === team.name);
  const defending = Boolean(holder && holder.team !== team.name);
  const opponent = board.getOpponent(team);

  return {
    game,
    team,
    hand,
    canPlay,
    pick,
    holder,
    hasBall,
    defending,
    opponent,
    ballStasisTurns: game.ballStasisTurns || 0,
  };
}

// ---- marking / movement helpers shared by defense styles ----

function dCountOutfieldersInOwnHalf(team) {
  let count = 0;
  for (const player of team.currentPlayers) {
    if (player.position === 'GK') continue;
    const c = getPlayerCell(player);
    if (!c) continue;
    if (team.side === 'left' ? c.x < Math.floor(WIDTH / 2) : c.x >= Math.ceil(WIDTH / 2)) count++;
  }
  return count;
}

function dCountOutfieldersInOwnThird(team, columns) {
  let count = 0;
  for (const player of team.currentPlayers) {
    if (player.position === 'GK') continue;
    const c = getPlayerCell(player);
    if (!c) continue;
    if (team.side === 'left' ? c.x < columns : c.x >= WIDTH - columns) count++;
  }
  return count;
}

function dOwnGoalX(team) {
  return team.side === 'left' ? 0 : WIDTH - 1;
}

// Is this opponent in the team's own half?
function dIsInOwnHalf(team, c) {
  return team.side === 'left' ? c.x < Math.floor(WIDTH / 2) : c.x >= Math.ceil(WIDTH / 2);
}

function dBestMoverFor({ ctx, targetX, targetY, preferUnmarked, ownGoalX }) {
  const { team, pick } = ctx;
  const move = pick(MoveAction);
  const sprint = pick(SprintAction);
  const shortSprint = pick(ShortSprintAction);
  let best = null;
  let bestDist = Infinity;
  for (const player of team.currentPlayers) {
    if (player.position === 'GK') continue;
    if (aiBacklineMoveBlocked(team, player)) continue;
    const pc = getPlayerCell(player);
    if (!pc) continue;
    if (Math.max(Math.abs(pc.x - targetX), Math.abs(pc.y - targetY)) > 2) continue;
    if (preferUnmarked && aiIsMarkingOpponent(team, player)) continue;
    const dist = Math.abs(pc.x - ownGoalX);
    if (move && move.play({ team, player, board, target: { x: targetX, y: targetY } }).success) {
      if (dist < bestDist) { bestDist = dist; best = { play: move, player, target: { x: targetX, y: targetY } }; }
    }
    if (sprint && Math.abs(pc.x - targetX) + Math.abs(pc.y - targetY) <= 2) {
      if (sprint.play({ team, player, board, target: { x: targetX, y: targetY } }).success) {
        if (dist < bestDist) { bestDist = dist; best = { play: sprint, player, target: { x: targetX, y: targetY } }; }
      }
    }
    if (shortSprint && Math.max(Math.abs(pc.x - targetX), Math.abs(pc.y - targetY)) <= 2) {
      if (shortSprint.play({ team, player, board, target: { x: targetX, y: targetY } }).success) {
        if (dist < bestDist) { bestDist = dist; best = { play: shortSprint, player, target: { x: targetX, y: targetY } }; }
      }
    }
  }
  return best;
}

// Mark the ball carrier + any unmarked opponents, with an optional own-half
// filter (filter fn takes an opponent player cell x and team; returns true to include).
function dMarkingMovement(ctx, filterOpp) {
  const { team, pick, opponent, game } = ctx;
  const holder = ctx.holder;
  const ownGoalX = dOwnGoalX(team);

  // PRIORITY 1: Always mark the ball carrier if not already marked by our team.
  if (holder && holder.team !== team.name) {
    const holderCell = getPlayerCell(holder);
    if (holderCell) {
      const alreadyMarked = board.getPlayersAt(holderCell.x, holderCell.y)
        .some((p) => p.team === team.name);
      if (!alreadyMarked) {
        const mover = dBestMoverFor({ ctx, targetX: holderCell.x, targetY: holderCell.y, preferUnmarked: true, ownGoalX })
          || dBestMoverFor({ ctx, targetX: holderCell.x, targetY: holderCell.y, preferUnmarked: false, ownGoalX });
        if (mover) return mover;
      }
    }
  }

  // PRIORITY 2: Mark unmarked opponents, closest to our goal first.
  const unmarkedOpponents = opponent.currentPlayers
    .filter((opp) => {
      if (opp.position === 'GK') return false;
      const c = getPlayerCell(opp);
      if (!c) return false;
      if (filterOpp && !filterOpp(opp, c)) return false;
      return !board.getPlayersAt(c.x, c.y).some((p) => p.team === team.name);
    })
    .map((opp) => {
      const c = getPlayerCell(opp);
      return { player: opp, x: c.x, y: c.y, dist: Math.abs(c.x - ownGoalX) };
    })
    .sort((a, b) => a.dist - b.dist);

  for (const opp of unmarkedOpponents) {
    if (!board.canOccupy(opp.x, opp.y, [])) continue;
    const mover = dBestMoverFor({ ctx, targetX: opp.x, targetY: opp.y, preferUnmarked: true, ownGoalX })
      || dBestMoverFor({ ctx, targetX: opp.x, targetY: opp.y, preferUnmarked: false, ownGoalX });
    if (mover) return mover;
  }

  return null;
}

// ---- DEFENSE STYLES ----

const DEFENSE_STYLES = {
  // Exact behaviour of the original "basic-coach" defensive block.
  fullPitch(ctx) {
    const { game, team, pick } = ctx;
    const holder = ctx.holder;

    const clearance = pick(ClearanceAction);
    if (clearance && holder && (holder.position === 'DF' || holder.position === 'GK')) {
      return { play: clearance };
    }

    if (ctx.defending) {
      const drawFoul = pick(DrawFoulAction);
      if (drawFoul && holder) {
        const hc = getPlayerCell(holder);
        if (hc && board.getPlayersAt(hc.x, hc.y).some((p) => p.team === team.name)) {
          return { play: drawFoul };
        }
      }

      const marking = pick(MarkingAction);
      if (marking) return { play: marking };

      const dirtyTricks = pick(DirtyTricksAction);
      if (dirtyTricks) return { play: dirtyTricks };

      const lastDitchBlock = pick(LastDitchBlockAction);
      if (lastDitchBlock) {
        const holderCell = getPlayerCell(holder);
        if (holderCell) {
          const nearGoal = team.side === 'left' ? holderCell.x >= WIDTH - 3 : holderCell.x <= 2;
          if (nearGoal) return { play: lastDitchBlock };
        }
      }

      const press = pick(PressAction);
      if (press) return { play: press };

      const tackle = pick(TackleAction);
      if (tackle) return { play: tackle };

      const offsideTrap = pick(OffsideTrapAction);
      if (offsideTrap) return { play: offsideTrap };

      const markThemUp = pick(MarkThemUpAction);
      if (markThemUp) return { play: markThemUp };

      if (dCountOutfieldersInOwnThird(team, 3) < 4) {
        const fallback = pick(FallbackAction);
        if (fallback) return { play: fallback };
      }

      const scoreDiff = Math.abs(
        game.score[team.name] - game.score[board.getOpponent(team).name]
      );
      const ballInOwnFinalQuarter =
        team.side === 'left' ? ball.x <= 3 : ball.x >= WIDTH - 4;
      const anyOtherDefensiveCard =
        pick(MarkingAction) ||
        pick(PressAction) ||
        pick(TackleAction) ||
        pick(OffsideTrapAction) ||
        pick(FallbackAction) ||
        pick(RiskyTackleAction);
      if (
        scoreDiff === 1 &&
        ballInOwnFinalQuarter &&
        game.turn > 14 &&
        !anyOtherDefensiveCard
      ) {
        const hardTackle = pick(HardTackleAction);
        if (hardTackle) return { play: hardTackle };
      }

      const forcedPress = pick(ForcedPressAction);
      if (forcedPress) return { play: forcedPress };

      const riskyTackle = pick(RiskyTackleAction);
      if (riskyTackle) return { play: riskyTackle };

      return dMarkingMovement(ctx, null);
    }

    return null;
  },

  // Only mark opponents inside our own half; otherwise stay compact / press.
  ownHalf(ctx) {
    const { game, team, pick } = ctx;
    const holder = ctx.holder;

    const clearance = pick(ClearanceAction);
    if (clearance && holder && (holder.position === 'DF' || holder.position === 'GK')) {
      return { play: clearance };
    }

    if (ctx.defending) {
      const drawFoul = pick(DrawFoulAction);
      if (drawFoul && holder) {
        const hc = getPlayerCell(holder);
        if (hc && board.getPlayersAt(hc.x, hc.y).some((p) => p.team === team.name)) {
          return { play: drawFoul };
        }
      }

      const marking = pick(MarkingAction);
      if (marking) return { play: marking };

      const dirtyTricks = pick(DirtyTricksAction);
      if (dirtyTricks) return { play: dirtyTricks };

      const lastDitchBlock = pick(LastDitchBlockAction);
      if (lastDitchBlock) {
        const holderCell = getPlayerCell(holder);
        if (holderCell) {
          const nearGoal = team.side === 'left' ? holderCell.x >= WIDTH - 3 : holderCell.x <= 2;
          if (nearGoal) return { play: lastDitchBlock };
        }
      }

      const press = pick(PressAction);
      if (press) return { play: press };

      const tackle = pick(TackleAction);
      if (tackle) return { play: tackle };

      const offsideTrap = pick(OffsideTrapAction);
      if (offsideTrap) return { play: offsideTrap };

      const markThemUp = pick(MarkThemUpAction);
      if (markThemUp) return { play: markThemUp };

      if (dCountOutfieldersInOwnThird(team, 3) < 4) {
        const fallback = pick(FallbackAction);
        if (fallback) return { play: fallback };
      }

      // Prefer tackles/pressure over long moves when defending our own half.
      const forcedPress = pick(ForcedPressAction);
      if (forcedPress) return { play: forcedPress };

      const riskyTackle = pick(RiskyTackleAction);
      if (riskyTackle) return { play: riskyTackle };

      return dMarkingMovement(ctx, (opp, c) => dIsInOwnHalf(team, c));
    }

    return null;
  },

  // Loose marking: only mark the ball carrier; otherwise tackle/apply pressure.
  looseTackle(ctx) {
    const { game, team, pick } = ctx;
    const holder = ctx.holder;

    const clearance = pick(ClearanceAction);
    if (clearance && holder && (holder.position === 'DF' || holder.position === 'GK')) {
      return { play: clearance };
    }

    if (ctx.defending) {
      const drawFoul = pick(DrawFoulAction);
      if (drawFoul && holder) {
        const hc = getPlayerCell(holder);
        if (hc && board.getPlayersAt(hc.x, hc.y).some((p) => p.team === team.name)) {
          return { play: drawFoul };
        }
      }

      const marking = pick(MarkingAction);
      if (marking) return { play: marking };

      const dirtyTricks = pick(DirtyTricksAction);
      if (dirtyTricks) return { play: dirtyTricks };

      const lastDitchBlock = pick(LastDitchBlockAction);
      if (lastDitchBlock) {
        const holderCell = getPlayerCell(holder);
        if (holderCell) {
          const nearGoal = team.side === 'left' ? holderCell.x >= WIDTH - 3 : holderCell.x <= 2;
          if (nearGoal) return { play: lastDitchBlock };
        }
      }

      // Heavy tackle/press reliance before any movement.
      const press = pick(PressAction);
      if (press) return { play: press };

      const tackle = pick(TackleAction);
      if (tackle) return { play: tackle };

      const forcedPress = pick(ForcedPressAction);
      if (forcedPress) return { play: forcedPress };

      const riskyTackle = pick(RiskyTackleAction);
      if (riskyTackle) return { play: riskyTackle };

      const hardTackle = pick(HardTackleAction);
      if (hardTackle) return { play: hardTackle };

      const offsideTrap = pick(OffsideTrapAction);
      if (offsideTrap) return { play: offsideTrap };

      // Only move to mark the ball carrier (not other runners).
      if (holder && holder.team !== team.name) {
        const holderCell = getPlayerCell(holder);
        if (holderCell) {
          const alreadyMarked = board.getPlayersAt(holderCell.x, holderCell.y)
            .some((p) => p.team === team.name);
          if (!alreadyMarked) {
            const ownGoalX = dOwnGoalX(team);
            const mover = dBestMoverFor({ ctx, targetX: holderCell.x, targetY: holderCell.y, preferUnmarked: true, ownGoalX })
              || dBestMoverFor({ ctx, targetX: holderCell.x, targetY: holderCell.y, preferUnmarked: false, ownGoalX });
            if (mover) return mover;
          }
        }
      }

      // Fallback if the back line is under-manned.
      if (dCountOutfieldersInOwnThird(team, 3) < 4) {
        const fallback = pick(FallbackAction);
        if (fallback) return { play: fallback };
      }
    }

    return null;
  },
};

const AI_DEFENSE_ORDER = ['fullPitch', 'ownHalf', 'looseTackle'];
