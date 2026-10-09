function tickAi() {
  if (noticeOverlayActive) return;
  if (typeof halftimeModalOpen !== 'undefined' && halftimeModalOpen) return;
  if (aiTurnTimeout) return;
  if (!game) return;
  if (typeof wcShootout !== 'undefined' && wcShootout && !wcShootout.done) return;
  const team = game.currentTeam;
  if (!team || team.controller.type !== 'ai') return;
  if (game.finished || game.halftimePending) return;
  aiTurnTimeout = setTimeout(() => {
    aiTurnTimeout = null;
    runAiTurn();
  }, 500);
}

function runAiTurn() {
  if (noticeOverlayActive) return;
  if (!game) return;
  if (typeof wcShootout !== 'undefined' && wcShootout && !wcShootout.done) return;
  const team = game.currentTeam;
  if (!team || team.controller.type !== 'ai') return;
  if (game.finished || game.halftimePending) return;

  maybeAiSubstitute(team);

  const ai = AI_PLAYERS[team.controller.player];
  if (!ai) return;

  const decision = aiClearProtectedBall(team) || ai.chooseAction(game, team);
  if (!decision) return;

  if (decision.skip) {
    const result = game.skip(team);
    if (result.success) renderGame();
    return;
  }

  const action = decision.play;
  if (!action) return;

  executeAction(team, action, () => {
    if (action instanceof PassAction) {
      beginPassTargeting(team, action);
      resolvePass(decision.target.x, decision.target.y);
      return;
    }

    if (action instanceof LongPassAction) {
      beginLongPassTargeting(team, action);
      resolveLongPassCell(decision.target.x, decision.target.y);
      return;
    }

    if (action instanceof MoveAction) {
      beginMoveTargeting(team, action);
      selectMovePlayer(decision.player);
      resolveMove(decision.target.x, decision.target.y);
      return;
    }

    if (action instanceof SlipAction) {
      beginSlipTargeting(team, action);
      selectSlipPlayer(decision.player);
      resolveSlip(decision.target.x, decision.target.y);
      return;
    }

    if (action instanceof SprintAction) {
      beginSprintTargeting(team, action);
      selectSprintPlayer(decision.player);
      resolveSprint(decision.target.x, decision.target.y);
      return;
    }

    if (action instanceof ShortSprintAction) {
      beginSprintTargeting(team, action);
      selectSprintPlayer(decision.player);
      resolveSprint(decision.target.x, decision.target.y);
      return;
    }

    if (action instanceof DribblingAction) {
      beginDribblingTargeting(team, action);
      resolveDribble(decision.target.x, decision.target.y);
      return;
    }

    if (action instanceof TouchOfMagicAction) {
      beginTouchOfMagicTargeting(team, action);
      resolveTouchOfMagic(decision.target.x, decision.target.y);
      return;
    }

    if (action instanceof SiiiiuAction) {
      beginSiiiiuTargeting(team, action);
      resolveSiiiiu(decision.target.x, decision.target.y);
      return;
    }

    if (action instanceof LongBallAction) {
      beginLongBallTargeting(team, action);
      resolveLongBall(decision.target.x, decision.target.y);
      return;
    }

    if (action instanceof FinishAction) {
      beginFinishTargeting(team, action);
      resolveFinish(decision.player);
      return;
    }

    if (action instanceof HeaderFinishAction || action instanceof KnockdownFinishAction || action instanceof SecondBallHeaderAction) {
      beginFinishTargeting(team, action);
      resolveFinish(decision.player);
      return;
    }

    if (action instanceof CrossAction) {
      beginCrossTargeting(team, action);
      resolveCross(decision.player);
      return;
    }

    if (action instanceof RunAndCrossAction || action instanceof RunAndCrossFlankAction || action instanceof DribbleAndCrossAction) {
      beginRunAndCrossTargeting(team, action);
      resolveRunAndCross(decision.player);
      return;
    }

    if (action instanceof OverlapAction) {
      beginOverlapTargeting(team, action);
      resolveOverlap(decision.player);
      return;
    }

    if (action instanceof SideAttackAction) {
      beginSideAttackTargeting(team, action);
      resolveSideAttack(decision.side);
      if (game.inPlay[team.name].includes(action)) {
        const result = game.skip(team);
        if (result.success) renderGame();
      }
      return;
    }

    if (action instanceof TackleAction) {
      beginTackleTargeting(team, action);
      const target = document.querySelector('.tackle-target');
      if (target) {
        resolveTackle(target);
        return;
      }
      const result = game.skip(team);
      if (result.success) renderGame();
      return;
    }

    if (action instanceof RiskyTackleAction) {
      beginTackleTargeting(team, action);
      const target = document.querySelector('.tackle-target');
      if (target) {
        resolveRiskyTackle(target);
        return;
      }
      const result = game.skip(team);
      if (result.success) renderGame();
      return;
    }

    if (action instanceof ExpertTackleAction) {
      beginExpertTackleTargeting(team, action);
      const target = document.querySelector('.tackle-target');
      if (target) {
        resolveExpertTackle(target);
        return;
      }
      const result = game.skip(team);
      if (result.success) renderGame();
      return;
    }

    if (action instanceof CannonballAction) {
      playShoot(team, action);
      return;
    }

    if (action instanceof RabonaAction || action instanceof HatTrickHeroAction) {
      playShoot(team, action);
      return;
    }

    if (action instanceof OneTwoWallAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof MuscleMemoryAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof SecondWindAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof TimeWallAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof VeteranBenchAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof AllInAction) {
      const hand = game.inPlay[team.name] || [];
      if (hand.length > 1) {
        action.resolve(team);
      } else {
        const fallbackResult = game.skip(team);
        if (fallbackResult.success) renderGame();
      }
      return;
    }

    if (action instanceof GambitAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof YellowCardAction) {
      const opponent = board.getOpponent(team);
      const candidates = opponent.currentPlayers.filter(
        (p) => getPlayerCell(p) && !p.hasEffect('scaredToTackle')
      );
      const target =
        decision.player && candidates.includes(decision.player)
          ? decision.player
          : candidates[0];
      if (target) {
        executeAction(team, action, () => resolveYellowCard(target));
        return;
      }
      const fallbackResult = game.skip(team);
      if (fallbackResult.success) renderGame();
      return;
    }

    if (action instanceof TacklingMadnessAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof BrittleLittleBonesAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof ComboAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof HardTackleAction) {
      beginHardTackleTargeting(team, action);
      const target = document.querySelector('.hard-tackle-target');
      if (target) {
        resolveHardTackle(target);
        closeShotModal();
        return;
      }
      const result = game.skip(team);
      if (result.success) renderGame();
      return;
    }

    if (action instanceof MarkingAction) {
      playMarking(team, action);
      return;
    }

    if (action instanceof DirtyTricksAction) {
      playDirtyTricks(team, action);
      return;
    }

    if (action instanceof PressAction) {
      playPress(team, action);
      return;
    }

    if (action instanceof ForcedPressAction) {
      playForcedPress(team, action);
      return;
    }

    if (action instanceof ShootAction || action instanceof LongShotAction) {
      playShoot(team, action);
    // why closing?
    //  closeShotModal();
      return;
    }

    if (action instanceof OffsideTrapAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof FallbackAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof IntensityAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof FlairAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof HandOfGodAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof InspirationAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof PlaymakingAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof CoachInstructionsAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof FullPressureAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof CounterAttackAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof MarkThemUpAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof TacticalFaultAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof PossessionAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof ArgentoPrideAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof PepStyleAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof EurekaAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof JogaBonitoAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof GermanEfficiencyAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof ComingHomeAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof UnderdogBiteAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof TotalFootballAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof AtlasWallAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof GarraCharruaAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof NordicHammerAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof TerangaRoarAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof SunInTheirEyesAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof OuchAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof DrawFoulAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof BrokenDefenseAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof InjuryRiskAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof HeadsInTheCloudsAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof FrozenDefenseAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof RedMistAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof LostDressingRoomAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof FatigueAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof MoraleCollapseAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof SuspensionShadowAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof TacticalConfusionAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof GoalkeeperBlunderAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof CaptainsMutinyAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof WeatherWoesAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof ParkTheBusAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof TikiTakaAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof LastDitchBlockAction) {
      beginLastDitchBlockTargeting(team, action);
      const pending = pendingLastDitchBlock;
      if (!pending || pending.candidates.length === 0) {
        const fallbackResult = game.skip(team);
        if (fallbackResult.success) renderGame();
        return;
      }
      resolveLastDitchBlock(pending.candidates[0]);
      return;
    }

    if (action instanceof ClearanceAction) {
      beginClearanceTargeting(team, action);
      const pending = pendingClearance;
      if (!pending) {
        const fallbackResult = game.skip(team);
        if (fallbackResult.success) renderGame();
        return;
      }
      if (pending.candidates && pending.candidates.length > 0) {
        resolveClearance(pending.candidates[0]);
      }
      return;
    }

    if (action instanceof CompactShapeAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof DefensiveWallAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof ThroughBallAction) {
      beginThroughBallTargeting(team, action);
      resolveThroughBall(decision.target.x, decision.target.y);
      return;
    }

    if (action instanceof OneTwoAction) {
      beginOneTwoTargeting(team, action);
      resolveOneTwo(decision.target.x, decision.target.y);
      return;
    }

    if (action instanceof VolleyAction) {
      resolveVolley(team, action);
      return;
    }

    if (action instanceof SwitchPlayAction) {
      beginSwitchPlayTargeting(team, action);
      resolveSwitchPlay(decision.target.x, decision.target.y);
      return;
    }

    if (action instanceof UnderlapAction) {
      beginUnderlapTargeting(team, action);
      resolveUnderlap(decision.player);
      return;
    }

    if (action instanceof OverloadAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof TriggerPressAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof TacticalSubAction) {
      const sub = decision.player || team.currentPlayers.find((p) => {
        if (p.position === 'GK') return false;
        return team.availableSubstitutes().length > 0;
      });
      if (sub) resolveTacticalSub(sub);
      else {
        const fallbackResult = game.skip(team);
        if (fallbackResult.success) renderGame();
      }
      return;
    }

    if (action instanceof TriggerManMarkingAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof ParkTheMidfieldAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof DesperationAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof GameManagementAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof TimeWastingAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof TempoControlAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof ShithouseryAction) {
      const opponent = board.getOpponent(team);
      const oppHand = opponent && game.inPlay[opponent.name];
      if (oppHand && oppHand.length > 0) {
        const target = oppHand[Math.floor(Math.random() * oppHand.length)];
        executeAction(team, action, () => resolveShithousery(target));
      } else {
        const fallbackResult = game.skip(team);
        if (fallbackResult.success) renderGame();
      }
      return;
    }

    if (action instanceof HoldAction) {
      const target = aiPickHoldTarget(team, action);
      if (target) {
        executeAction(team, action, () => resolveHold(target));
      } else {
        const fallbackResult = game.skip(team);
        if (fallbackResult.success) renderGame();
      }
      return;
    }

    if (action instanceof TheScriptAction) {
      const picked = aiPickScriptCard(team);
      if (picked) {
        resolveTheScript(team, action, picked);
      } else {
        const fallbackResult = game.skip(team);
        if (fallbackResult.success) renderGame();
      }
      return;
    }

    if (action instanceof VideoSessionAction) {
      const Ctor = aiPickVideoSessionCard(team);
      if (Ctor) {
        resolveVideoSession(team, action, Ctor);
      } else {
        const fallbackResult = game.skip(team);
        if (fallbackResult.success) renderGame();
      }
      return;
    }

    if (action instanceof GrowingMenaceAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof AlwaysMovingAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof PeakFitnessAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof GhostRunAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof FortressMentalityAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof DoOrDieAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof NoPainNoGainAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof SwitchGearsAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof BigMatchMentalityAction) {
      action.resolve(team);
      return;
    }

    if (action instanceof ExtraTimeAction) {
      action.resolve(team);
      return;
    }

    const fallbackResult = game.skip(team);
    if (fallbackResult.success) renderGame();
  });
}