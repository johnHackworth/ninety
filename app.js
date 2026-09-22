



function setupGame() {
  game = new GameController({
    teams: Object.values(TEAMS),
    turns: typeof trainingActive !== 'undefined' && trainingActive ? 3 : 20,
    cardsPerTurn: 6,
    pointsPerTurn: 3,
  });

  game.onTurnEnd = () => {
    const holderEl = matchState.possession;
    const holderPlayer = holderEl && holderEl._token.player;
    if (holderPlayer && TEAMS[holderPlayer.team]) {
      game.recordPossession(TEAMS[holderPlayer.team]);
    }

    enforceFreeKickProtection();

    const hold = matchState.gkHoldFrom;
    if (!hold) return;
    matchState.gkHoldFrom = null;
    const keeper = hold.player;
    const team = TEAMS[keeper.team];
    const card = keeper.giveYellow();
    game.recordEvent({ type: card === 'red' ? 'red' : 'yellow', team: team.name, player: keeper.name });
    logMatch(
      team.name,
      card === 'red'
        ? `RED CARD for ${keeper.name} (holding the ball too long)! Sent off.`
        : `Yellow card for ${keeper.name} for holding the ball too long.`,
      'card'
    );
    humanNotice(card === 'red' ? 'RED CARD!' : 'YELLOW CARD');
    if (card === 'red') {
      if (matchState.possession && matchState.possession._token.player === keeper) {
        matchState.possession = null;
      }
      removeFromPitchAndSquad(team, keeper);
      if (keeper === team.currentGoalkeeper) onTeamLosesGoalkeeper(team, keeper);
    }
  };

  game.onTurnStart = () => {
    for (const teamName of Object.keys(TEAMS)) {
      const team = TEAMS[teamName];
      if (team.hasTeamEffect('fullPressure')) {
        const candidates = team.currentPlayers.filter((p) => !p.hasEffect('exhausted'));
        if (candidates.length > 0) {
          const victim = candidates[Math.floor(Math.random() * candidates.length)];
          victim.addEffect('exhausted', Infinity);
          logMatch(team.name, `Full pressure: ${victim.name} is exhausted for the rest of the match.`);
        }
      }

      if (team.hasTeamEffect('argentoPride')) {
        const opponent = TEAMS[Object.keys(TEAMS).find((n) => n !== team.name)];
        const goalsBehind = Math.max(0, game.score[opponent.name] - game.score[team.name]);
        if (goalsBehind > 0) {
          game.actionPoints[team.name] += goalsBehind;
          logMatch(team.name, `Argento pride: +${goalsBehind} action point(s) (${goalsBehind} goal(s) behind).`);
        }
      }

      if (team.hasTeamEffect('comingHome')) {
        const opponent = TEAMS[Object.keys(TEAMS).find((n) => n !== team.name)];
        if (game.score[opponent.name] > game.score[team.name]) {
          game.actionPoints[team.name] += 2;
          logMatch(team.name, `Coming home: +2 action points (trailing ${game.score[team.name]}-${game.score[opponent.name]}).`);
        }
      }

      if (team.hasTeamEffect('underdogBite')) {
        const opponent = TEAMS[Object.keys(TEAMS).find((n) => n !== team.name)];
        const goalsBehind = game.score[opponent.name] - game.score[team.name];
        if (goalsBehind >= 2) {
          game.actionPoints[team.name] += 3;
          logMatch(team.name, `Underdog bite: +3 action points (down by ${goalsBehind}).`);
        }
      }

      const halfStart = game.turn === 1 || game.turn === Math.floor(game.maxTurns / 2) + 1;
      if (halfStart && team.hasTeamEffect('secondWind')) {
        team.applySecondWind();
      }
    }

    if (matchState.gkCollectReturn) {
      const team = TEAMS[matchState.gkCollectReturn.team];
      const gk = team && team.currentGoalkeeper;
      const gkHolds = Boolean(
        gk && matchState.possession && matchState.possession._token.player === gk
      );
      if (!gkHolds) {
        matchState.gkCollectReturn = null;
        if (gk) {
          const gkEl = tokenElForPlayer(gk);
          const front = goalFrontCell(team);
          if (gkEl && board.canOccupy(front.x, front.y, [gk])) {
            moveTokenToCell(gkEl, front.x, front.y);
            logMatch(team.name, `${gk.name} returns to the front of the goal.`);
          }
        }
      }
    }

    const holder = matchState.possession && matchState.possession._token.player;
    if (holder && TEAMS[holder.team]) {
      game.currentTeam = TEAMS[holder.team];
    }
  };
}

function applyManualSub(team, outPlayer, inPlayer) {
  game.recordEvent({
    type: 'sub',
    team: team.name,
    player: outPlayer.name,
    detail: `${outPlayer.name} ← ${inPlayer.name}`,
  });
  logMatch(team.name, `Substitution: ${outPlayer.name} ← ${inPlayer.name}.`, 'sub');
  const holder = matchState.possession && matchState.possession._token.player;
  const tokenEl = tokenElForPlayer(outPlayer);
  const cellEl = tokenEl ? tokenEl.closest('.cell') : null;
  team.substitute(outPlayer, inPlayer);
  if (tokenEl) tokenEl.remove();
  if (cellEl) {
    new PlayerToken({
      player: inPlayer,
      teamColor: team.primaryColor,
      shorts: PlayerToken.shortsFor(team),
    }).placeIn(cellEl, team.side === 'left' ? 'left' : 'right');
    refreshCellLayout(cellEl);
    if (holder === outPlayer) {
      const c = { x: Number(cellEl.dataset.x), y: Number(cellEl.dataset.y) };
      moveBall(c.x, c.y);
    }
  }
}

function maybeAiSubstitute(team) {
  if (!substitutionWindowOpen) return;
  if (team.subsRemaining <= 0 || team.subWindowsRemaining <= 0) return;
  const bench = team.availableSubstitutes();
  if (bench.length === 0) return;
  const candidates = team.currentPlayers
    .map((p) => ({ p, rating: Team.rating(p) }))
    .map(({ p, rating }) => {
      const repl = bench
        .slice()
        .sort((a, b) => Team.rating(b) - Team.rating(a))[0];
      if (!repl) return null;
      const bad =
        p.injured ||
        p.hasEffect('exhausted') ||
        Team.rating(repl) > rating + 2;
      return bad ? { p, repl, injured: p.injured || p.hasEffect('exhausted') } : null;
    })
    .filter(Boolean);
  if (candidates.length === 0) return;
  candidates.sort((a, b) => {
    if (a.injured !== b.injured) return a.injured ? -1 : 1;
    return a.p.rating - b.p.rating;
  });
  const { p, repl } = candidates[0];
  team.subWindowsUsed += 1;
  applyManualSub(team, p, repl);
}


function dispatchActionPlay(team, action, isPending = false) {
  if (noticeOverlayActive) return;
  if (deferredPlayActive) return;
  if (isPending) {
    cancelPending();
    return;
  }
  if (action instanceof PassAction) {
    beginPassTargeting(team, action);
    return;
  }
  if (action instanceof LongPassAction) {
    beginLongPassTargeting(team, action);
    return;
  }
  if (action instanceof TackleAction || action instanceof RiskyTackleAction) {
    beginTackleTargeting(team, action);
    return;
  }
  if (action instanceof MarkingAction) {
    executeAction(team, action, () => playMarking(team, action));
    return;
  }
  if (action instanceof DirtyTricksAction) {
    executeAction(team, action, () => playDirtyTricks(team, action));
    return;
  }
  if (action instanceof PressAction) {
    executeAction(team, action, () => playPress(team, action));
    return;
  }
  if (action instanceof ForcedPressAction) {
    executeAction(team, action, () => playForcedPress(team, action));
    return;
  }
  if (action instanceof ShootAction) {
    executeAction(team, action, () => playShoot(team, action));
    return;
  }
  if (action instanceof LongShotAction) {
    executeAction(team, action, () => playShoot(team, action));
    return;
  }
  if (action instanceof FullPressureAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof MoveAction) {
    beginMoveTargeting(team, action);
    return;
  }
  if (action instanceof SlipAction) {
    beginSlipTargeting(team, action);
    return;
  }
  if (action instanceof LongBallAction) {
    beginLongBallTargeting(team, action);
    return;
  }
  if (action instanceof OffBallPlayAction) {
    beginOffBallTargeting(team, action);
    return;
  }
  if (action instanceof DribblingAction) {
    beginDribblingTargeting(team, action);
    return;
  }
  if (action instanceof SprintAction) {
    beginSprintTargeting(team, action);
    return;
  }
  if (action instanceof ShortSprintAction) {
    beginSprintTargeting(team, action);
    return;
  }
  if (action instanceof OverlapAction) {
    beginOverlapTargeting(team, action);
    return;
  }
  if (action instanceof SideAttackAction) {
    beginSideAttackTargeting(team, action);
    return;
  }
  if (action instanceof FinishAction) {
    beginFinishTargeting(team, action);
    return;
  }
  if (action instanceof CrossAction) {
    beginCrossTargeting(team, action);
    return;
  }
  if (action instanceof OffsideTrapAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof TacticalFaultAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof FallbackAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof CounterAttackAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof MarkThemUpAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof IntensityAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof FlairAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof HandOfGodAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof ParkTheBusAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof InspirationAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof CrampAction) {
    beginCrampTargeting(team, action);
    return;
  }
  if (action instanceof PlaymakingAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof HardTackleAction) {
    beginHardTackleTargeting(team, action);
    return;
  }
  if (action instanceof FeintTurnAction) {
    beginFeintTurnTargeting(team, action);
    return;
  }
  if (action instanceof CoachInstructionsAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof PossessionAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof TikiTakaAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof ArgentoPrideAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof PepStyleAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof EurekaAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof JogaBonitoAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof FullDefenseAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof FullAttackAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof LastDitchBlockAction) {
    beginLastDitchBlockTargeting(team, action);
    return;
  }
  if (action instanceof ClearanceAction) {
    beginClearanceTargeting(team, action);
    return;
  }
  if (action instanceof CompactShapeAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof DefensiveWallAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof GermanEfficiencyAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof ComingHomeAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof UnderdogBiteAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof TotalFootballAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof AtlasWallAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof GarraCharruaAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof NordicHammerAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof TerangaRoarAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof SunInTheirEyesAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof OuchAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof DrawFoulAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof HoldAction) {
    beginHoldTargeting(team, action);
    return;
  }
  if (action instanceof GrowingMenaceAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof PeakFitnessAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof GhostRunAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof FortressMentalityAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof DoOrDieAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof NoPainNoGainAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof SwitchGearsAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof TheScriptAction) {
    beginTheScriptTargeting(team, action);
    return;
  }
  if (action instanceof VideoSessionAction) {
    beginVideoSessionTargeting(team, action);
    return;
  }
  if (action instanceof TouchOfMagicAction) {
    beginTouchOfMagicTargeting(team, action);
    return;
  }
  if (action instanceof SiiiiuAction) {
    beginSiiiiuTargeting(team, action);
    return;
  }
  if (action instanceof BrokenDefenseAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof InjuryRiskAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof HeadsInTheCloudsAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof FrozenDefenseAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof RedMistAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof LostDressingRoomAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof FatigueAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof MoraleCollapseAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof SuspensionShadowAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof TacticalConfusionAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof GoalkeeperBlunderAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof CaptainsMutinyAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof WeatherWoesAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof ExpertTackleAction) {
    beginExpertTackleTargeting(team, action);
    return;
  }
  if (action instanceof CannonballAction) {
    executeAction(team, action, () => playShoot(team, action));
    return;
  }
  if (action instanceof TacklingMadnessAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof HighMobilityAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof BrittleLittleBonesAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof AlwaysMovingAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof ComboAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof RunAndCrossAction) {
    beginRunAndCrossTargeting(team, action);
    return;
  }
  if (action instanceof ThroughBallAction) {
    beginThroughBallTargeting(team, action);
    return;
  }
  if (action instanceof OneTwoAction) {
    beginOneTwoTargeting(team, action);
    return;
  }
  if (action instanceof VolleyAction) {
    executeAction(team, action, () => resolveVolley(team, action));
    return;
  }
  if (action instanceof SwitchPlayAction) {
    beginSwitchPlayTargeting(team, action);
    return;
  }
  if (action instanceof UnderlapAction) {
    beginUnderlapTargeting(team, action);
    return;
  }
  if (action instanceof OverloadAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof TriggerPressAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof TacticalSubAction) {
    beginTacticalSubTargeting(team, action);
    return;
  }
  if (action instanceof TriggerManMarkingAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof ParkTheMidfieldAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof DesperationAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof GameManagementAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof TimeWastingAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof TempoControlAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof ShithouseryAction) {
    beginShithouseryTargeting(team, action);
    return;
  }
  if (action instanceof BigMatchMentalityAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof ExtraTimeAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof OneTwoWallAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof MuscleMemoryAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof SecondWindAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof TimeWallAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof VeteranBenchAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof AllInAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof GambitAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof HeaderFinishAction || action instanceof KnockdownFinishAction || action instanceof SecondBallHeaderAction) {
    beginFinishTargeting(team, action);
    return;
  }
  if (action instanceof RunAndCrossFlankAction || action instanceof DribbleAndCrossAction) {
    beginRunAndCrossTargeting(team, action);
    return;
  }
  if (action instanceof ScoutingReportAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof EagleEyeAction) {
    executeAction(team, action, () => action.resolve(team));
    return;
  }
  if (action instanceof YellowCardAction) {
    beginYellowCardTargeting(team, action);
    return;
  }
  if (action instanceof RabonaAction || action instanceof HatTrickHeroAction) {
    executeAction(team, action, () => playShoot(team, action));
    return;
  }
  executeAction(team, action, () => {
    if (hasActivePending()) cancelPending();
    matchState.lastBallMove = null;
    const result = game.playAction(team, action);
    if (!result.success) {
      logMatch(team.name, `${action.name} not allowed: ${result.reason}`, 'denied');
      logAlert(result.reason);
      return;
    }
    renderGame();
  });
}

























let aiTurnTimeout = null;






// ---- Persistent player availability across tournament / world-cup matches ----
// Injured players and players sent off (red card) in one match are unavailable
// for the team's NEXT match. They are kept on the bench but ineligible to be
// used as a substitute, and are replaced in the starting XI by a substitute.



pitch.addEventListener('click', (event) => {
  if (deferredPlayActive) return;
  if (event.target.closest('.player-token')) return;
  const targetEl = event.target.closest('.cell');
  if (!targetEl) return;

  if (pendingPass) {
    if (targetEl.classList.contains('pass-target')) {
      executeAction(pendingPass.team, pendingPass.action, () =>
        resolvePass(Number(targetEl.dataset.x), Number(targetEl.dataset.y))
      );
    }
    return;
  }

  if (pendingLongPass) {
    if (targetEl.classList.contains('longpass-target')) {
      executeAction(pendingLongPass.team, pendingLongPass.action, () =>
        resolveLongPassCell(Number(targetEl.dataset.x), Number(targetEl.dataset.y))
      );
    }
    return;
  }

  if (pendingLongBall) {
    if (targetEl.classList.contains('longball-target')) {
      executeAction(pendingLongBall.team, pendingLongBall.action, () =>
        resolveLongBall(Number(targetEl.dataset.x), Number(targetEl.dataset.y))
      );
    }
    return;
  }

  if (pendingMove && pendingMove.player) {
    if (targetEl.classList.contains('move-cell-target')) {
      executeAction(pendingMove.team, pendingMove.action, () =>
        resolveMove(Number(targetEl.dataset.x), Number(targetEl.dataset.y))
      );
    }
    return;
  }

  if (pendingSlip && pendingSlip.player) {
    if (targetEl.classList.contains('slip-cell-target')) {
      executeAction(pendingSlip.team, pendingSlip.action, () =>
        resolveSlip(Number(targetEl.dataset.x), Number(targetEl.dataset.y))
      );
    }
    return;
  }

  if (pendingOffBall && pendingOffBall.currentPlayer) {
    if (targetEl.classList.contains('offball-cell-target')) {
      executeAction(pendingOffBall.team, pendingOffBall.action, () =>
        resolveOffBallCell(Number(targetEl.dataset.x), Number(targetEl.dataset.y))
      );
    }
    return;
  }

  if (pendingDribble) {
    if (targetEl.classList.contains('dribble-target')) {
      executeAction(pendingDribble.team, pendingDribble.action, () =>
        resolveDribble(Number(targetEl.dataset.x), Number(targetEl.dataset.y))
      );
    }
    return;
  }

  if (pendingFeintTurn) {
    if (targetEl.classList.contains('feint-target')) {
      executeAction(pendingFeintTurn.team, pendingFeintTurn.action, () =>
        resolveFeintTurn(Number(targetEl.dataset.x), Number(targetEl.dataset.y))
      );
    }
    return;
  }

  if (pendingTouchOfMagic) {
    if (targetEl.classList.contains('touch-magic-target')) {
      executeAction(pendingTouchOfMagic.team, pendingTouchOfMagic.action, () =>
        resolveTouchOfMagic(Number(targetEl.dataset.x), Number(targetEl.dataset.y))
      );
    }
    return;
  }

  if (pendingSiiiiu) {
    if (targetEl.classList.contains('siiiiu-target')) {
      executeAction(pendingSiiiiu.team, pendingSiiiiu.action, () =>
        resolveSiiiiu(Number(targetEl.dataset.x), Number(targetEl.dataset.y))
      );
    }
    return;
  }

  if (pendingSwitchPlay) {
    if (targetEl.classList.contains('switch-target')) {
      executeAction(pendingSwitchPlay.team, pendingSwitchPlay.action, () =>
        resolveSwitchPlay(Number(targetEl.dataset.x), Number(targetEl.dataset.y))
      );
    }
    return;
  }

  if (pendingThroughBall) {
    if (targetEl.classList.contains('throughball-target')) {
      executeAction(pendingThroughBall.team, pendingThroughBall.action, () =>
        resolveThroughBall(Number(targetEl.dataset.x), Number(targetEl.dataset.y))
      );
    }
    return;
  }

  if (pendingOneTwo) {
    if (targetEl.classList.contains('onetwo-target')) {
      executeAction(pendingOneTwo.team, pendingOneTwo.action, () =>
        resolveOneTwo(Number(targetEl.dataset.x), Number(targetEl.dataset.y))
      );
    }
    return;
  }

  if (pendingSprint && pendingSprint.player) {
    if (targetEl.classList.contains('sprint-cell-target')) {
      executeAction(pendingSprint.team, pendingSprint.action, () =>
        resolveSprint(Number(targetEl.dataset.x), Number(targetEl.dataset.y))
      );
    }
    return;
  }

  if (pendingSideAttack) {
    if (targetEl.classList.contains('side-attack-target')) {
      executeAction(pendingSideAttack.team, pendingSideAttack.action, () =>
        resolveSideAttack(Number(targetEl.dataset.y) === 0 ? 'top' : 'bottom')
      );
    }
    return;
  }

  if (hasActivePending()) cancelPending();
});

document.addEventListener('keydown', (event) => {
  if (deferredPlayActive) return;
  if (event.key === 'Escape') cancelPending();
});

document.addEventListener('click', (event) => {
  if (deferredPlayActive) return;
  const tokenEl = event.target.closest('.player-token');
  if (!tokenEl) return;

  if (pendingPass) {
    const cellEl = tokenEl.closest('.cell');
    if (cellEl && cellEl.classList.contains('pass-target')) {
      executeAction(pendingPass.team, pendingPass.action, () =>
        resolvePass(Number(cellEl.dataset.x), Number(cellEl.dataset.y))
      );
    } else {
      cancelPendingPass();
    }
    return;
  }

  if (pendingLongPass) {
    const cellEl = tokenEl.closest('.cell');
    if (cellEl && cellEl.classList.contains('longpass-target')) {
      executeAction(pendingLongPass.team, pendingLongPass.action, () =>
        resolveLongPassCell(Number(cellEl.dataset.x), Number(cellEl.dataset.y))
      );
    } else {
      cancelPendingLongPass();
    }
    return;
  }

  if (pendingTackle) {
    if (tokenEl.classList.contains('tackle-target')) {
      executeAction(pendingTackle.team, pendingTackle.action, () =>
        pendingTackle.action instanceof RiskyTackleAction
          ? resolveRiskyTackle(tokenEl)
          : pendingTackle.action instanceof ExpertTackleAction
          ? resolveExpertTackle(tokenEl)
          : resolveTackle(tokenEl)
      );
    } else {
      cancelPendingTackle();
    }
    return;
  }

  if (pendingClearance) {
    if (tokenEl.classList.contains('tackle-target')) {
      executeAction(pendingClearance.team, pendingClearance.action, () =>
        resolveClearance(tokenEl._token.player)
      );
    } else {
      cancelPendingClearance();
    }
    return;
  }

  if (pendingLastDitchBlock) {
    if (tokenEl.classList.contains('tackle-target')) {
      executeAction(pendingLastDitchBlock.team, pendingLastDitchBlock.action, () =>
        resolveLastDitchBlock(tokenEl._token.player)
      );
    } else {
      pendingLastDitchBlock = null;
      cancelPending();
    }
    return;
  }

  if (pendingMove) {
    if (!pendingMove.player && tokenEl.classList.contains('move-player-target')) {
      selectMovePlayer(tokenEl._token.player);
    } else if (pendingMove.player) {
      const cellEl = tokenEl.closest('.cell');
      if (cellEl && cellEl.classList.contains('move-cell-target')) {
        executeAction(pendingMove.team, pendingMove.action, () =>
          resolveMove(Number(cellEl.dataset.x), Number(cellEl.dataset.y))
        );
      }
    } else {
      cancelPendingMove();
    }
    return;
  }

  if (pendingSlip) {
    if (!pendingSlip.player && tokenEl.classList.contains('slip-player-target')) {
      selectSlipPlayer(tokenEl._token.player);
    } else if (pendingSlip.player) {
      const cellEl = tokenEl.closest('.cell');
      if (cellEl && cellEl.classList.contains('slip-cell-target')) {
        executeAction(pendingSlip.team, pendingSlip.action, () =>
          resolveSlip(Number(cellEl.dataset.x), Number(cellEl.dataset.y))
        );
      }
    } else {
      cancelPendingSlip();
    }
    return;
  }

  if (pendingOffBall) {
    if (tokenEl.classList.contains('offball-player-target')) {
      selectOffBallPlayer(tokenEl._token.player);
    } else if (pendingOffBall.currentPlayer) {
      const cellEl = tokenEl.closest('.cell');
      if (cellEl && cellEl.classList.contains('offball-cell-target')) {
        executeAction(pendingOffBall.team, pendingOffBall.action, () =>
          resolveOffBallCell(Number(cellEl.dataset.x), Number(cellEl.dataset.y))
        );
      } else {
        cancelPendingOffBall();
      }
    } else {
      cancelPendingOffBall();
    }
    return;
  }

  if (pendingSprint) {
    if (!pendingSprint.player && tokenEl.classList.contains('sprint-player-target')) {
      selectSprintPlayer(tokenEl._token.player);
    } else if (pendingSprint.player) {
      const cellEl = tokenEl.closest('.cell');
      if (cellEl && cellEl.classList.contains('sprint-cell-target')) {
        executeAction(pendingSprint.team, pendingSprint.action, () =>
          resolveSprint(Number(cellEl.dataset.x), Number(cellEl.dataset.y))
        );
      } else {
        cancelPendingSprint();
      }
    } else {
      cancelPendingSprint();
    }
    return;
  }

  if (pendingOverlap) {
    if (tokenEl.classList.contains('overlap-player-target')) {
      executeAction(pendingOverlap.team, pendingOverlap.action, () =>
        resolveOverlap(tokenEl._token.player)
      );
    } else {
      cancelPendingOverlap();
    }
    return;
  }

  if (pendingUnderlap) {
    if (tokenEl.classList.contains('underlap-target')) {
      executeAction(pendingUnderlap.team, pendingUnderlap.action, () =>
        resolveUnderlap(tokenEl._token.player)
      );
    } else {
      cancelPendingUnderlap();
    }
    return;
  }

  if (pendingFinish) {
    if (tokenEl.classList.contains('finish-player-target')) {
      executeAction(pendingFinish.team, pendingFinish.action, () =>
        resolveFinish(tokenEl._token.player)
      );
    } else {
      cancelPendingFinish();
    }
    return;
  }

  if (pendingCross) {
    if (tokenEl.classList.contains('cross-target')) {
      executeAction(pendingCross.team, pendingCross.action, () =>
        resolveCross(tokenEl._token.player)
      );
    } else {
      cancelPendingCross();
    }
    return;
  }

  if (pendingRunAndCross) {
    if (tokenEl.classList.contains('cross-target')) {
      executeAction(pendingRunAndCross.team, pendingRunAndCross.action, () =>
        resolveRunAndCross(tokenEl._token.player)
      );
    } else {
      cancelPendingRunAndCross();
    }
    return;
  }

  if (pendingCramp) {
    if (tokenEl.classList.contains('cramp-target')) {
      executeAction(pendingCramp.team, pendingCramp.action, () =>
        resolveCramp(tokenEl._token.player)
      );
    } else {
      cancelPendingCramp();
    }
    return;
  }

  if (pendingYellowCard) {
    if (tokenEl.classList.contains('yellowcard-target')) {
      executeAction(pendingYellowCard.team, pendingYellowCard.action, () =>
        resolveYellowCard(tokenEl._token.player)
      );
    } else {
      cancelPendingYellowCard();
    }
    return;
  }

  if (pendingHardTackle) {
    if (tokenEl.classList.contains('hard-tackle-target')) {
      executeAction(pendingHardTackle.team, pendingHardTackle.action, () =>
        resolveHardTackle(tokenEl)
      );
    } else {
      cancelPendingHardTackle();
    }
    return;
  }

  if (pendingTacticalSub) {
    if (tokenEl.classList.contains('side-attack-player')) {
      executeAction(pendingTacticalSub.team, pendingTacticalSub.action, () =>
        resolveTacticalSub(tokenEl._token.player)
      );
    } else {
      cancelPendingTacticalSub();
    }
    return;
  }

  if (pendingLongBall) {
    const cellEl = tokenEl.closest('.cell');
    if (cellEl && cellEl.classList.contains('longball-target')) {
      executeAction(pendingLongBall.team, pendingLongBall.action, () =>
        resolveLongBall(Number(cellEl.dataset.x), Number(cellEl.dataset.y))
      );
    } else {
      cancelPendingLongBall();
    }
    return;
  }

  if (pendingDribble) {
    const cellEl = tokenEl.closest('.cell');
    if (cellEl && cellEl.classList.contains('dribble-target')) {
      executeAction(pendingDribble.team, pendingDribble.action, () =>
        resolveDribble(Number(cellEl.dataset.x), Number(cellEl.dataset.y))
      );
    } else {
      cancelPendingDribble();
    }
    return;
  }

  if (pendingFeintTurn) {
    const cellEl = tokenEl.closest('.cell');
    if (cellEl && cellEl.classList.contains('feint-target')) {
      executeAction(pendingFeintTurn.team, pendingFeintTurn.action, () =>
        resolveFeintTurn(Number(cellEl.dataset.x), Number(cellEl.dataset.y))
      );
    } else {
      cancelPendingFeintTurn();
    }
    return;
  }

  if (pendingTouchOfMagic) {
    const cellEl = tokenEl.closest('.cell');
    if (cellEl && cellEl.classList.contains('touch-magic-target')) {
      executeAction(pendingTouchOfMagic.team, pendingTouchOfMagic.action, () =>
        resolveTouchOfMagic(Number(cellEl.dataset.x), Number(cellEl.dataset.y))
      );
    } else {
      cancelPendingTouchOfMagic();
    }
    return;
  }

  if (pendingSiiiiu) {
    const cellEl = tokenEl.closest('.cell');
    if (cellEl && cellEl.classList.contains('siiiiu-target')) {
      executeAction(pendingSiiiiu.team, pendingSiiiiu.action, () =>
        resolveSiiiiu(Number(cellEl.dataset.x), Number(cellEl.dataset.y))
      );
    } else {
      cancelPendingSiiiiu();
    }
    return;
  }

  if (pendingSwitchPlay) {
    const cellEl = tokenEl.closest('.cell');
    if (cellEl && cellEl.classList.contains('switch-target')) {
      executeAction(pendingSwitchPlay.team, pendingSwitchPlay.action, () =>
        resolveSwitchPlay(Number(cellEl.dataset.x), Number(cellEl.dataset.y))
      );
    } else {
      cancelPendingSwitchPlay();
    }
    return;
  }

  if (pendingThroughBall) {
    const cellEl = tokenEl.closest('.cell');
    if (cellEl && cellEl.classList.contains('throughball-target')) {
      executeAction(pendingThroughBall.team, pendingThroughBall.action, () =>
        resolveThroughBall(Number(cellEl.dataset.x), Number(cellEl.dataset.y))
      );
    } else {
      cancelPendingThroughBall();
    }
    return;
  }

  if (pendingOneTwo) {
    const cellEl = tokenEl.closest('.cell');
    if (cellEl && cellEl.classList.contains('onetwo-target')) {
      executeAction(pendingOneTwo.team, pendingOneTwo.action, () =>
        resolveOneTwo(Number(cellEl.dataset.x), Number(cellEl.dataset.y))
      );
    } else {
      cancelPendingOneTwo();
    }
    return;
  }

  if (pendingSideAttack) {
    const cellEl = tokenEl.closest('.cell');
    if (cellEl && cellEl.classList.contains('side-attack-target')) {
      executeAction(pendingSideAttack.team, pendingSideAttack.action, () =>
        resolveSideAttack(Number(cellEl.dataset.y) === 0 ? 'top' : 'bottom')
      );
    } else {
      cancelPendingSideAttack();
    }
    return;
  }

  const token = tokenEl._token;

  if (selectedToken === token) {
    token.deselect();
    selectedToken = null;
  } else {
    if (selectedToken) selectedToken.deselect();
    selectedToken = token;
    token.select();
  }

  renderGame();
});

const CARD_TYPES = [
  PassAction,
  BackwardsPassAction,
  LongPassAction,
  TackleAction,
  MarkingAction,
  PressAction,
  MoveAction,
  LongBallAction,
  ShootAction,
  LongShotAction,
  OffBallPlayAction,
  DribblingAction,
  SprintAction,
  ShortSprintAction,
  SideAttackAction,
  OverlapAction,
  FinishAction,
  CrossAction,
  OffsideTrapAction,
  TacticalFaultAction,
  FallbackAction,
  CounterAttackAction,
  IntensityAction,
  InspirationAction,
  CrampAction,
  PlaymakingAction,
  HardTackleAction,
  FullPressureAction,
  CoachInstructionsAction,
  FeintTurnAction,
  ArgentoPrideAction,
  PepStyleAction,
  EurekaAction,
  JogaBonitoAction,
  GermanEfficiencyAction,
  ComingHomeAction,
  UnderdogBiteAction,
  TotalFootballAction,
  AtlasWallAction,
  GarraCharruaAction,
  NordicHammerAction,
  TerangaRoarAction,
  SunInTheirEyesAction,
  TouchOfMagicAction,
  OuchAction,
  DrawFoulAction,
  HoldAction,
  GrowingMenaceAction,
  PeakFitnessAction,
  GhostRunAction,
  FortressMentalityAction,
  TheScriptAction,
  VideoSessionAction,
  DoOrDieAction,
  NoPainNoGainAction,
  SwitchGearsAction,
  BrokenDefenseAction,
  ForcedPressAction,
  FrozenDefenseAction,
  RiskyTackleAction,
  FlairAction,
  HandOfGodAction,
  SlipAction,
  SiiiiuAction,
  ExpertTackleAction,
  TacklingMadnessAction,
  HighMobilityAction,
  AlwaysMovingAction,
  BrittleLittleBonesAction,
  CannonballAction,
  ComboAction,
  RunAndCrossAction,
  InjuryRiskAction,
  HeadsInTheCloudsAction,
  FullDefenseAction,
  FullAttackAction,
  MarkThemUpAction,
  LastDitchBlockAction,
  ClearanceAction,
  CompactShapeAction,
  DefensiveWallAction,
  ThroughBallAction,
  OneTwoAction,
  VolleyAction,
  SwitchPlayAction,
  UnderlapAction,
  OverloadAction,
  TriggerPressAction,
  TacticalSubAction,
  TriggerManMarkingAction,
  ParkTheMidfieldAction,
  DesperationAction,
  GameManagementAction,
  TimeWastingAction,
  TempoControlAction,
  ShithouseryAction,
  BigMatchMentalityAction,
  ExtraTimeAction,
  RedMistAction,
  LostDressingRoomAction,
  FatigueAction,
  MoraleCollapseAction,
  SuspensionShadowAction,
  TacticalConfusionAction,
  GoalkeeperBlunderAction,
  CaptainsMutinyAction,
  WeatherWoesAction,
  OneTwoWallAction,
  MuscleMemoryAction,
  SecondWindAction,
  RabonaAction,
  HatTrickHeroAction,
  TimeWallAction,
  YellowCardAction,
  VeteranBenchAction,
  HeaderFinishAction,
  SecondBallHeaderAction,
  RunAndCrossFlankAction,
  DribbleAndCrossAction,
  KnockdownFinishAction,
  ScoutingReportAction,
  EagleEyeAction,
  AllInAction,
  GambitAction,
];


// ---- Headless simulation ----


// ---- Main menu / match setup ----
const menuScreen = document.getElementById('menu-screen');
const setupScreen = document.getElementById('friendly-setup-screen');
const rulesScreen = document.getElementById('rules-screen');
const boardEl = document.getElementById('board');

const homeTeamSelect = document.getElementById('team-home');
const awayTeamSelect = document.getElementById('team-away');
const homeControllerSelect = document.getElementById('controller-home');
const awayControllerSelect = document.getElementById('controller-away');
const startBtn = document.getElementById('menu-start');
const simSetupScreen = document.getElementById('sim-setup-screen');
const simHomeSelect = document.getElementById('sim-team-home');
const simAwaySelect = document.getElementById('sim-team-away');
const simStartBtn = document.getElementById('sim-start');

// ---- Tournament state ----
let tournament = null;
let tournamentMode = false;
const tournamentSetupScreen = document.getElementById('tournament-setup-screen');
const tournamentScreen = document.getElementById('tournament-screen');
const tournamentTableBody = document.getElementById('tournament-table-body');
const tournamentScheduleList = document.getElementById('tournament-schedule-list');
const tourTeamSelects = [1, 2, 3, 4].map((i) => document.getElementById(`tour-team-${i}`));
const tourCtrlSelects = [1, 2, 3, 4].map((i) => document.getElementById(`tour-ctrl-${i}`));

const TEAM_NAMES = Object.keys(TEAM_CLASSES);













// ---- World Cup ----

document.getElementById('menu-friendly').addEventListener('click', showSetupScreen);
document.getElementById('menu-back').addEventListener('click', showMainMenu);
document.getElementById('menu-rules').addEventListener('click', showGameRulesScreen);
document.getElementById('rules-back').addEventListener('click', showMainMenu);
document.getElementById('menu-tournament').addEventListener('click', showTournamentSetup);
document.getElementById('menu-world-cup').addEventListener('click', showWorldCupView);
document.getElementById('menu-load-wc').addEventListener('click', openWcLoadModal);
document.getElementById('sim-back').addEventListener('click', showMainMenu);
document.getElementById('tour-back').addEventListener('click', showMainMenu);
document.getElementById('tour-cancel').addEventListener('click', cancelTournament);
document.getElementById('tour-play-next').addEventListener('click', tournamentPlayNextMatch);
document.getElementById('wc-continue').addEventListener('click', wcContinue);
// wc-setup-start is now handled in world-cup-ui.js bindWcSetupEvents()
for (const [id, view] of [
  ['wc-tab-overview', 'overview'],
  ['wc-tab-bracket', 'bracket'],
  ['wc-tab-groups', 'groups'],
  ['wc-tab-schedule', 'schedule'],
  ['wc-tab-top', 'top'],
  ['wc-tab-squad', 'myTeam'],
  ['wc-tab-deck', 'deck'],
  ['wc-tab-stats', 'stats'],
]) {
  const btn = document.getElementById(id);
  if (btn) btn.addEventListener('click', () => wcSetTab(view));
}
document.getElementById('wc-save-load').addEventListener('click', openWcSaveLoadModal);
document.getElementById('wc-tabs-esc').addEventListener('click', openWcSaveLoadModal);
document.getElementById('wc-back').addEventListener('click', () => {
  wcSimRunning = false;
  if (worldCup && !worldCup.completed && typeof WcSave !== 'undefined') {
    WcSave.save('autosave');
  }
  worldCup = null;
  showMainMenu();
});

document.getElementById('menu-resume-wc').addEventListener('click', () => {
  const res = WcSave.resume();
  if (res && res.ok) {
    showWorldCupScreen();
    renderWorldCupView();
    showToast(`Resumed World Cup "${res.name}".`, 'info');
  } else {
    showToast((res && res.reason) || 'Could not resume World Cup.', 'error');
  }
});


for (const select of tourTeamSelects) {
  select.addEventListener('change', updateTourStartBtn);
}

document.getElementById('tour-start').addEventListener('click', () => {
  const teams = tourTeamSelects.map((s) => s.value);
  if (new Set(teams).size !== 4) return;
  const controllers = {};
  for (let i = 0; i < 4; i++) {
    controllers[teams[i]] = controllerFromSelect(tourCtrlSelects[i].value);
  }
  tournament = {
    teams: teams,
    controllers: controllers,
    matches: generateTournamentSchedule(teams),
    currentMatchIndex: 0,
    rewardCards: {},
  };
  tournamentMode = false;
  showTournamentView();
});
simStartBtn.addEventListener('click', () => {
  if (simHomeSelect.value === simAwaySelect.value) return;
  simulateMatch(simHomeSelect.value, simAwaySelect.value);
  showSimResultModal();
});
startBtn.addEventListener('click', () => {
  if (homeTeamSelect.value === awayTeamSelect.value) return;
  const homeCtrl = controllerFromSelect(homeControllerSelect.value);
  const awayCtrl = controllerFromSelect(awayControllerSelect.value);
  if (window.Onboarding) Onboarding.armFriendly(homeCtrl, awayCtrl);
  showTeamSheet(
    homeTeamSelect.value,
    awayTeamSelect.value,
    1,
    'Neutral Ground',
    homeCtrl,
    awayCtrl
  );
});
for (const select of [homeTeamSelect, awayTeamSelect]) {
  select.addEventListener('change', updateStartBtn);
}
for (const select of [simHomeSelect, simAwaySelect]) {
  select.addEventListener('change', updateSimStartBtn);
}

populateTeamSelect(homeTeamSelect, 'Spain');
populateTeamSelect(awayTeamSelect, 'Argentina');
updateStartBtn();
populateTeamSelect(simHomeSelect, 'Brazil');
populateTeamSelect(simAwaySelect, 'Argentina');
updateSimStartBtn();
populateTeamSelect(tourTeamSelects[0], 'Spain');
populateTeamSelect(tourTeamSelects[1], 'Argentina');
populateTeamSelect(tourTeamSelects[2], 'Brazil');
populateTeamSelect(tourTeamSelects[3], 'England');
updateTourStartBtn();

const autoStart = window.__AUTO_START_MATCH;
if (autoStart) {
  const opts = autoStart === true ? {} : autoStart;
  const home = opts.home || 'Spain';
  const away = opts.away || 'Argentina';
  startMatch(
    home,
    away,
    opts.homeController ? controllerFromSelect(opts.homeController) : null,
    opts.awayController ? controllerFromSelect(opts.awayController) : null
  );
  showBoard();
} else {
  showMainMenu();
}
