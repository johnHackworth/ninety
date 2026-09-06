class GameController {
  constructor({ teams, turns = 10, cardsPerTurn = 3, pointsPerTurn = 3 }) {
    this.teams = teams;
    this.turn = 0;
    this.maxTurns = turns;
    this.cardsPerTurn = cardsPerTurn;
    this.pointsPerTurn = pointsPerTurn;
    this.currentTeam = teams[0];
    this.actionPoints = {};
    this.blindEyeUsed = {};
    this.squadDepthPlays = {};
    this.inPlay = {};
    this.finished = false;
    this.score = {};
    this.scorers = [];
    this.events = [];
    this.stats = {};
    this.playerStats = {};
    this.lastPass = null;
    this.halftimePending = false;
    this.pendingHandAnimation = false;
    this.cardsPlayedByPlayer = {};

    this.intensity = {};
    this.pepStyle = {};
    this.flair = {};
    this.handOfGod = {};
    this.brittleBones = {};
    this.defensiveWall = {};
    this.freeActions = [];
    this.gameManagement = {};
    this.tempoControl = {};
    this.tempoControlIntensityCost = {};
    this.skipOpponentNextTurn = {};
    this.suspensionShadowActive = null;
    this.freeKickProtection = null;
    this.pendingPenalty = null;
    this.muscleMemory = {};
    this.timeWall = {};
    this.heldCards = {};
    this.matchHeldCards = {};
    this.matchEffect = null;
    this.pendingMatchEffect = null;
    this.ghostRun = {};
    this.fortressMentality = {};
    this.doOrDie = {};
    this.videoSession = {};
    this.revealedHand = {};
    this.revealedHandTurn = {};

    this.pendingHandoff = null;
    this._turnHandAdds = {};

    this.ballStasisTurns = 0;
    this._lastBallCell = null;

    this._creativityProxies = {};
    this._suppressCreativity = false;
    this.firstPlayedThisTurn = {};
    this.comboExtraPlays = {};

    for (const team of teams) {
      this.actionPoints[team.name] = 0;
      this.inPlay[team.name] = [];
      this.score[team.name] = 0;
      this.stats[team.name] = {
        possession: 0,
        recoveries: 0,
        shots: 0,
        assists: 0,
        goals: 0,
        fouls: 0,
        passes: 0,
      };
    }

    this.startTurn();
  }

  _wrapInPlayProxies() {
    for (const team of this.teams) {
      const current = this.inPlay[team.name];
      if (current && current.__creativityProxy) continue;
      const raw = current;
      const self = this;
      const proxied = new Proxy(raw, {
        get(target, prop, receiver) {
          if (prop === '__creativityProxy') return true;
          if (prop === 'push') {
            return function (...args) {
              const result = target.push(...args);
              if (team.hasTeamEffect('creativity') && !self._suppressCreativity) {
                for (const card of args) {
                  const clone = Object.assign(Object.create(Object.getPrototypeOf(card)), card);
                  target.push(clone);
                }
              }
              if (!self._suppressCreativity) {
                const tracked = (self._turnHandAdds[team.name] = self._turnHandAdds[team.name] || []);
                for (const card of args) tracked.push(card);
              }
              return result;
            };
          }
          return Reflect.get(target, prop, receiver);
        },
      });
      this.inPlay[team.name] = proxied;
      this._creativityProxies[team.name] = proxied;
    }
  }

  pushWithoutCreativity(teamName, cards) {
    this._suppressCreativity = true;
    try {
      const hand = this.inPlay[teamName];
      for (const card of cards) hand.push(card);
    } finally {
      this._suppressCreativity = false;
    }
  }

  get turnsLeft() {
    return Math.max(0, this.maxTurns - this.turn);
  }

  get half() {
    return this.turn <= this.maxTurns / 2 ? 1 : 2;
  }

  startTurn() {
    if (this.onTurnEnd) this.onTurnEnd();

    if (this.turn >= this.maxTurns) {
      this.finished = true;
      return;
    }

    this.turn += 1;
    this.pendingHandAnimation = true;
    this.freeActions = [];
    this.firstPlayedThisTurn = {};

    if (typeof ball !== 'undefined' && ball && typeof WIDTH !== 'undefined') {
      const bx = ball.x;
      const by = ball.y;
      const key = bx * HEIGHT + by;
      if (this._lastBallCell === key) {
        this.ballStasisTurns += 1;
      } else {
        this.ballStasisTurns = 0;
        this._lastBallCell = key;
      }
    }
    this.comboExtraPlays = {};

    this._dogRolledThisTurn = false;

    this._rollMatchEffect();

    if (this.turn === Math.floor(this.maxTurns / 2) + 1) {
      this.halftimePending = true;
    }

    this.intensity = {};
    this.flair = {};
    this.defensiveWall = {};
    this.muscleMemory = {};
    this.timeWall = {};
    this.revealedHandTurn = {};
    if (typeof matchState !== 'undefined' && matchState) {
      matchState.lastShotSave = false;
      matchState.lastLongBallReceiver = null;
    }
    for (const teamName of Object.keys(this.pepStyle)) {
      this.pepStyle[teamName] -= 1;
      if (this.pepStyle[teamName] <= 0) {
        delete this.pepStyle[teamName];
        const team = this.teams.find((t) => t.name === teamName);
        if (team) team.removeTeamEffect('pepStyle');
      }
    }
    for (const teamName of Object.keys(this.handOfGod)) {
      this.handOfGod[teamName] -= 1;
      if (this.handOfGod[teamName] <= 0) delete this.handOfGod[teamName];
    }
    for (const teamName of Object.keys(this.brittleBones)) {
      this.brittleBones[teamName] -= 1;
      if (this.brittleBones[teamName] <= 0) {
        delete this.brittleBones[teamName];
        const team = this.teams.find((t) => t.name === teamName);
        if (team) team.removeTeamEffect('brittleBones');
      }
    }
    for (const teamName of Object.keys(this.gameManagement)) {
      this.gameManagement[teamName] -= 1;
      if (this.gameManagement[teamName] <= 0) {
        delete this.gameManagement[teamName];
        const team = this.teams.find((t) => t.name === teamName);
        if (team) team.removeTeamEffect('gameManagement');
      }
    }
    for (const teamName of Object.keys(this.tempoControl)) {
      this.tempoControl[teamName] -= 1;
      if (this.tempoControl[teamName] <= 0) {
        delete this.tempoControl[teamName];
        delete this.tempoControlIntensityCost[teamName];
        const team = this.teams.find((t) => t.name === teamName);
        if (team) team.removeTeamEffect('tempoControl');
      }
    }
    for (const teamName of Object.keys(this.ghostRun)) {
      delete this.ghostRun[teamName];
      logMatch(teamName, 'The ghost run fades — your carrier can be closed down again.');
    }
    for (const teamName of Object.keys(this.fortressMentality)) {
      this.fortressMentality[teamName] -= 1;
      if (this.fortressMentality[teamName] <= 0) {
        delete this.fortressMentality[teamName];
        logMatch(teamName, 'Fortress mentality wears off — defensive effects expire normally again.');
      }
    }
    for (const teamName of Object.keys(this.doOrDie)) {
      const team = this.teams.find((t) => t.name === teamName);
      if (!team) {
        delete this.doOrDie[teamName];
        continue;
      }
      const state = this.doOrDie[teamName];
      if (state.stage === 'primed') {
        state.stage = 'active';
        for (const p of team.currentPlayers) p.shooting += 4;
        logMatch(teamName, 'DO OR DIE! Desperation fuels every shot (+4 shooting this turn).', 'goal');
      } else {
        delete this.doOrDie[teamName];
        for (const p of state.buffed || []) p.shooting -= 4;
        const stars = team.currentPlayers.filter((p) => p.isStar && !p.injured && !p.sentOff);
        const victim = stars[Math.floor(Math.random() * stars.length)] || null;
        if (victim) {
          victim.addEffect('injured', Infinity);
          logMatch(teamName, `Do or die takes its toll: ${victim.name} pulls up injured.`, 'card');
          humanNotice(`${victim.name} INJURED`);
        } else {
          logMatch(teamName, 'Do or die takes its toll, but nobody gets hurt.');
        }
      }
    }
    for (const team of this.teams) {
      if (team.hasTeamEffect('growingMenace')) {
        const forwards = team.currentPlayers.filter((p) => p.position === 'FW');
        if (forwards.length > 0) {
          for (const p of forwards) p.shooting += 1;
          logMatch(
            team.name,
            `Growing menace: ${forwards.map((p) => p.name).join(', ')} grow sharper (+1 shooting).`
          );
        }
      }
    }
    for (const team of this.teams) {
      for (const player of team.currentPlayers) player.tickEffects();
      team.tickTeamEffects();
    }

    // Mind Games: the opponent holding the ball is psyched out for this minute
    if (
      typeof board !== 'undefined' &&
      board &&
      typeof board.getBallHolder === 'function'
    ) {
      const holder = board.getBallHolder();
      if (holder && holder.team) {
        const mindTeam = this.teams.find((t) => t.name !== holder.team);
        if (mindTeam && mindTeam.hasTeamEffect('mindGames') && !holder.hasEffect('mindGamesMark')) {
          holder.addEffect('mindGamesMark', 1);
          logMatch(mindTeam.name, `Mind Games: ${holder.name} loses 1 tactical thinking this minute.`);
        }
      }
    }

    // Enraged Rival: apply/remove debuff to opponent players
    for (const team of this.teams) {
      const opponent = this.teams.find((t) => t.name !== team.name);
      if (!opponent) continue;
      if (team.hasTeamEffect('enragedRival')) {
        for (const player of opponent.currentPlayers) {
          if (!player.hasEffect('enragedRivalDebuff')) {
            player.addEffect('enragedRivalDebuff', Infinity);
          }
        }
      } else {
        for (const player of opponent.currentPlayers) {
          if (player.hasEffect('enragedRivalDebuff')) {
            player.removeEffect('enragedRivalDebuff');
          }
        }
      }
    }

    // Team Fortune Favor: coin flip at start of turn
    for (const team of this.teams) {
      if (team.hasTeamEffect('teamFortuneFavor')) {
        if (Math.random() < 0.5) {
          // Heads: +1 to a random stat this turn for the whole team
          const randomStat = BOOSTABLE_STATS[Math.floor(Math.random() * BOOSTABLE_STATS.length)];
          for (const player of team.currentPlayers) {
            player.speed += (randomStat === 'speed' ? 1 : 0);
            player.marking += (randomStat === 'marking' ? 1 : 0);
            player.tackling += (randomStat === 'tackling' ? 1 : 0);
            player.shooting += (randomStat === 'shooting' ? 1 : 0);
            player.passing += (randomStat === 'passing' ? 1 : 0);
            player.dribbling += (randomStat === 'dribbling' ? 1 : 0);
            player.tacticalThinking += (randomStat === 'tacticalThinking' ? 1 : 0);
            player.heading += (randomStat === 'heading' ? 1 : 0);
            player.goalkeeping += (randomStat === 'goalkeeping' ? 1 : 0);
          }
          logMatch(team.name, `Team Fortune Favor: heads! +1 ${randomStat} this turn.`);
        } else {
          // Tails: -1 to a random opponent stat this turn
          const opponent = this.teams.find((t) => t.name !== team.name);
          if (opponent) {
            const randomStat = BOOSTABLE_STATS[Math.floor(Math.random() * BOOSTABLE_STATS.length)];
            for (const player of opponent.currentPlayers) {
              player.speed += (randomStat === 'speed' ? -1 : 0);
              player.marking += (randomStat === 'marking' ? -1 : 0);
              player.tackling += (randomStat === 'tackling' ? -1 : 0);
              player.shooting += (randomStat === 'shooting' ? -1 : 0);
              player.passing += (randomStat === 'passing' ? -1 : 0);
              player.dribbling += (randomStat === 'dribbling' ? -1 : 0);
              player.tacticalThinking += (randomStat === 'tacticalThinking' ? -1 : 0);
              player.heading += (randomStat === 'heading' ? -1 : 0);
              player.goalkeeping += (randomStat === 'goalkeeping' ? -1 : 0);
            }
            logMatch(team.name, `Team Fortune Favor: tails! -1 ${randomStat} to opponents this turn.`);
          }
        }
      }
    }

    // Team Clover: 25% chance whole team gains +1 random stat this turn
    for (const team of this.teams) {
      if (team.hasTeamEffect('teamClover')) {
        if (Math.random() < 0.25) {
          const randomStat = BOOSTABLE_STATS[Math.floor(Math.random() * BOOSTABLE_STATS.length)];
          for (const player of team.currentPlayers) {
            player.speed += (randomStat === 'speed' ? 1 : 0);
            player.marking += (randomStat === 'marking' ? 1 : 0);
            player.tackling += (randomStat === 'tackling' ? 1 : 0);
            player.shooting += (randomStat === 'shooting' ? 1 : 0);
            player.passing += (randomStat === 'passing' ? 1 : 0);
            player.dribbling += (randomStat === 'dribbling' ? 1 : 0);
            player.tacticalThinking += (randomStat === 'tacticalThinking' ? 1 : 0);
            player.heading += (randomStat === 'heading' ? 1 : 0);
            player.goalkeeping += (randomStat === 'goalkeeping' ? 1 : 0);
          }
          logMatch(team.name, `Team Clover: good luck! +1 ${randomStat} this turn.`);
        }
      }
    }

    // Team Omamori: 20% chance to remove injured from one random player on whole team
    for (const team of this.teams) {
      if (team.hasTeamEffect('teamOmamori')) {
        if (Math.random() < 0.2) {
          const injuredPlayers = [];
          for (const player of team.currentPlayers) {
            if (player.injured) injuredPlayers.push(player);
          }
          if (injuredPlayers.length > 0) {
            const victim = injuredPlayers[Math.floor(Math.random() * injuredPlayers.length)];
            victim.removeEffect('injured');
            logMatch(team.name, `Team Omamori: ${victim.name} recovers from injury!`);
          }
        }
      }
    }

    // Team Wrench: 20% chance to remove injured from one random player on whole team
    for (const team of this.teams) {
      if (team.hasTeamEffect('teamWrench')) {
        if (Math.random() < 0.2) {
          const injuredPlayers = [];
          for (const player of team.currentPlayers) {
            if (player.injured) injuredPlayers.push(player);
          }
          if (injuredPlayers.length > 0) {
            const victim = injuredPlayers[Math.floor(Math.random() * injuredPlayers.length)];
            victim.removeEffect('injured');
            logMatch(team.name, `Team Wrench: ${victim.name} recovers from injury!`);
          }
        }
      }
    }

    // Team High Press: +1 speed (already applied by team effect stats)
    // Team Spark: +1 speed +1 tactical thinking (already applied by team effect stats)

    // Team Ruthless/FaceMelter: 50% chance per player to reduce one random stat permanently at start of turn
    const ruthlessTeams = this.teams.filter((t) => t.hasTeamEffect('teamRuthless') || t.hasTeamEffect('teamFaceMelter'));
    for (const team of ruthlessTeams) {
      const isFaceMelter = team.hasTeamEffect('teamFaceMelter');
      for (const player of team.currentPlayers) {
        if (Math.random() < 0.5) {
          const randomStat = BOOSTABLE_STATS[Math.floor(Math.random() * BOOSTABLE_STATS.length)];
          // Reduce the random stat by 1 permanently
          player[randomStat] -= 1;
          logMatch(team.name, `${player.name}'s ${randomStat} permanently decreased by 1 (Team ${isFaceMelter ? 'Face-Melter' : 'Ruthless'}).`);
        }
      }
    }

    const firstTurnOfHalf = this.turn === 1 || this.turn === Math.floor(this.maxTurns / 2) + 1;
    for (const team of this.teams) {
      if (
        team.hasTeamEffect('magicSpray') &&
        this.turn === Math.floor(this.maxTurns / 2) + 1 &&
        team.exhaustedActions.length > 0
      ) {
        const restored = team.exhaustedActions.pop();
        team.availableActions.push(restored);
        logMatch(team.name, `Magic Spray at half-time: ${restored.name} returns from the Exhaust pile.`);
      }
      const held = this.heldCards[team.name] || [];
      for (const action of this.inPlay[team.name] || []) {
        if (held.includes(action) || action.hold) continue;
        if (action instanceof InjuryRiskAction) {
          const candidates = team.currentPlayers.filter((p) => !p.injured);
          if (candidates.length > 0) {
            const victim = candidates[Math.floor(Math.random() * candidates.length)];
            victim.addEffect('injured', Infinity);
          }
        }
        if (action.ephemeral || action.exhaust) {
          team.exhaustedActions.push(action);
        } else {
          team.discardedActions.push(action);
        }
      }
      this.inPlay[team.name] = [];
      this._wrapInPlayProxies();
      this.actionPoints[team.name] = this.pointsPerTurn;
      const matchEffect = this.matchEffect;
      if (matchEffect && typeof EarlyWhistleEffect !== 'undefined' && matchEffect instanceof EarlyWhistleEffect) {
        this.actionPoints[team.name] -= 1;
      }
      if (matchEffect && typeof LateWhistleEffect !== 'undefined' && matchEffect instanceof LateWhistleEffect) {
        this.actionPoints[team.name] += 1;
      }
      if (firstTurnOfHalf && team.hasTeamEffect('flyingStart')) {
        this.actionPoints[team.name] += 1;
        logMatch(team.name, 'Flying Start: +1 action point for the opening minute.');
      }
      if (this.turn === 1 && team.hasTeamEffect('knockoutFever')) {
        this.actionPoints[team.name] += 1;
        logMatch(team.name, 'Knockout Fever: +1 action point at kickoff.');
      }
      if (this.skipOpponentNextTurn[team.name]) {
        delete this.skipOpponentNextTurn[team.name];
        this.actionPoints[team.name] = 0;
      }
      const count = this.cardsPerTurn + (team.hasTeamEffect('fullPressure') ? 4 : 0) + (team.hasTeamEffect('wideThinking') ? 1 : 0) + (team.hasTeamEffect('tempoControl') ? 1 : 0);
      team.recycleDiscarded(count);
      this.shuffle(team.availableActions);
      const dealt = team.availableActions.splice(0, count);
      this.pushWithoutCreativity(team.name, dealt);
      const mh = this.matchHeldCards[team.name] || [];
      let carriedOver = 0;
      for (const card of this.inPlay[team.name]) {
        if (mh.includes(card.name)) {
          if (!card.hold) carriedOver += 1;
          card.hold = true;
        }
      }
      if (carriedOver > 0 && this.turn > 1) {
        logMatch(team.name, `${carriedOver} held card${carriedOver > 1 ? 's' : ''} carried over this turn.`);
      }
      team.syncHeadsInTheClouds(this.inPlay[team.name]);

      if (team.hasTeamEffect('alwaysMoving')) {
        const hasMove = this.inPlay[team.name].some((c) => c instanceof MoveAction);
        if (!hasMove) {
          const moveCard = new MoveAction();
          moveCard.ephemeral = true;
          moveCard.exhaust = true;
          this.inPlay[team.name].push(moveCard);
          logMatch(team.name, 'Always Moving: added a free Move card to your hand.');
        }
      }
    }

    for (const team of this.teams) {
      const pending = this.videoSession[team.name];
      if (!pending) continue;
      delete this.videoSession[team.name];
      this.inPlay[team.name].push(new pending(), new pending());
      logMatch(
        team.name,
        `Video session pays off: two copies of ${new pending().name} join the hand.`
      );
    }

    if (this.onTurnStart) this.onTurnStart();
    this._turnHandAdds = {};
  }

  recordEvent(event) {
    this.events.push({ minute: (this.turn - 1) * 5, ...event });
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  effectiveCost(team, action) {
    if (action.free) return 0;
    if (this.freeActions.includes(action)) return 0;
    if (action instanceof SprintAction && team.hasTeamEffect && team.hasTeamEffect('highMobility')) return 0;
    const base = Number(action.cost[0]) || 0;
    if (this.intensity[team.name] && base > 1) return 1;
    if (this.tempoControlIntensityCost[team.name] && action instanceof IntensityAction) {
      return base + this.tempoControlIntensityCost[team.name];
    }
    let cost = base;
    const hasWeatherWoes = this.inPlay[team.name] && this.inPlay[team.name].some((c) => c instanceof WeatherWoesAction);
    const isMovement = (a) =>
      a instanceof MoveAction ||
      a instanceof SprintAction ||
      a instanceof ShortSprintAction ||
      a instanceof DribblingAction ||
      a instanceof FeintTurnAction;
    if (hasWeatherWoes && isMovement(action)) {
      cost += 1;
    }
    if (this.timeWall[team.name] && isMovement(action)) {
      cost += 1;
    }
    const snowing = this.matchEffect && typeof SnowEffect !== 'undefined' &&
      this.matchEffect instanceof SnowEffect;
    if (snowing && isMovement(action)) {
      cost += 1;
    }
    const sandstorm = this.matchEffect && typeof SandstormEffect !== 'undefined' &&
      this.matchEffect instanceof SandstormEffect;
    if (sandstorm && isMovement(action)) {
      cost += 1;
    }
    return cost;
  }

  markFree(action) {
    if (!this.freeActions.includes(action)) this.freeActions.push(action);
  }

  drawCards(team, count, options = {}) {
    const penalty = typeof wcTeamDrawPenalties !== 'undefined' && wcTeamDrawPenalties && wcTeamDrawPenalties[team.name];
    const bonus = typeof wcTeamDrawBonuses !== 'undefined' && wcTeamDrawBonuses ? wcTeamDrawBonuses[team.name] || 0 : 0;
    const adjustedCount = Math.max(1, count - (penalty || 0) + bonus);
    const drawn = [];
    const rejected = [];
    this._suppressCreativity = true;
    try {
      const hand = this.inPlay[team.name];
      for (let i = 0; i < adjustedCount; i++) {
        team.recycleDiscarded(1);
        if (team.availableActions.length === 0) break;
        const index = Math.floor(Math.random() * team.availableActions.length);
        const card = team.availableActions.splice(index, 1)[0];
        if (options.unique && hand.some((h) => h.name === card.name)) {
          rejected.push(card);
          i--;
          continue;
        }
        hand.push(card);
        drawn.push(card);
      }
    } finally {
      this._suppressCreativity = false;
    }
    for (const card of rejected) {
      team.discardedActions.push(card);
    }
    team.syncHeadsInTheClouds(this.inPlay[team.name]);
    if (drawn.length > 0) {
      const tracked = (this._turnHandAdds[team.name] = this._turnHandAdds[team.name] || []);
      for (const card of drawn) tracked.push(card);
    }
    return drawn;
  }

  nextTeam() {
    const index = this.teams.indexOf(this.currentTeam);
    this.currentTeam = this.teams[(index + 1) % this.teams.length];
  }

  _advancePlay() {
    const canAct = (t) =>
      this.actionPoints[t.name] > 0 &&
      this.inPlay[t.name] &&
      this.inPlay[t.name].length > 0;

    if (!this.teams.some(canAct)) {
      this.endTurn();
    }
  }

  skip(team, options = {}) {
    if (this.finished) return { success: false, reason: 'game over' };
    if (team !== this.currentTeam) return { success: false, reason: 'not this team turn' };

    if (this.pendingPenalty === team.name) {
      this.pendingPenalty = null;
      logMatch(team.name, `${team.name} retake the penalty.`);
    }

    if (this.actionPoints[team.name] >= 1) {
      this.actionPoints[team.name] -= 1;
    }

    const shouldDraw = this.actionPoints[team.name] > 0 && options.draw !== false;
    if (shouldDraw) {
      this.drawCards(team, 1);
    }
    // Quick Draw team effect: draw 2 extra cards when skipping
    if (team.hasTeamEffect('drawOnSkip')) {
      this.drawCards(team, 2);
      logMatch(team.name, `${team.name} draws 2 extra cards with Quick Draw.`);
    }
    const gained = shouldDraw ? (this._turnHandAdds[team.name] || []).slice() : [];
    this._turnHandAdds[team.name] = [];

    if (options.deferSwitch && team.controller.type === 'human' && gained.length > 0) {
      this.pendingHandoff = { teamName: team.name, drawn: gained, handoffSwitch: true };
    } else {
      this.nextTeam();
      this._advancePlay();
    }

    return { success: true, drawn: gained };
  }

  resolveHandoff() {
    const handoff = this.pendingHandoff;
    if (!handoff) return false;
    this.pendingHandoff = null;
    if (this.finished) return false;
    if (handoff.handoffSwitch !== false) {
      this.nextTeam();
      this._advancePlay();
    }
    return true;
  }

  _attributeActor(team, options) {
    const actor = (options && options.actor) || this._decisionActor;
    if (actor && team.currentPlayers.includes(actor)) return actor;
    const holderEl =
      typeof matchState !== 'undefined' && matchState && matchState.possession ? matchState.possession : null;
    const holder = holderEl && holderEl._token ? holderEl._token.player : null;
    if (holder && team.currentPlayers.includes(holder)) return holder;
    const players = team.currentPlayers.filter((p) => !p.hasEffect('matchExhausted'));
    if (players.length === 0) return null;
    return players[Math.floor(Math.random() * players.length)];
  }

  _trackCardPlay(team, options) {
    if (!this.cardsPlayedByPlayer[team.name]) this.cardsPlayedByPlayer[team.name] = {};
    const actor = this._attributeActor(team, options);
    if (!actor) return;
    const counts = this.cardsPlayedByPlayer[team.name];
    counts[actor.name] = (counts[actor.name] || 0) + 1;

    const limit = actor.age < 21 ? 8 : 10;
    const hardLimit = 15;
    const heatwave =
      this.matchEffect && typeof HeatwaveEffect !== 'undefined' &&
      this.matchEffect instanceof HeatwaveEffect;
    const effLimit = heatwave ? Math.floor(limit / 2) : limit;
    const effHardLimit = heatwave ? Math.floor(hardLimit / 2) : hardLimit;
    const count = counts[actor.name];

    if (count > effHardLimit) {
      this._exhaustByCards(team, actor);
    } else if (count > effLimit) {
      if (actor.carriedFatigue) {
        this._exhaustByCards(team, actor);
      } else if (!actor.hasEffect('matchFatigued')) {
        actor.addEffect('matchFatigued', Infinity);
        logMatch(
          team.name,
          `${actor.name} has played ${count} cards and is drained (-1 to all attributes for the rest of the match).`
        );
      }
    }
  }

  _exhaustByCards(team, player) {
    if (player.hasEffect('matchExhausted')) return;
    if (player.hasEffect('matchFatigued')) player.removeEffect('matchFatigued');
    player.addEffect('matchExhausted', Infinity);
    logMatch(
      team.name,
      `${player.name} is completely worn out (-3 to all attributes for the rest of the match, and will miss the next match).`
    );
  }

  refereeCard(player) {
    const card = player.giveYellow();
    if (card !== 'red') return card;
    const team = this.teams.find((t) => t.name === player.team);
    if (team && team.hasTeamEffect('blindEye') && !this.blindEyeUsed[team.name]) {
      this.blindEyeUsed[team.name] = true;
      player.yellowCards = 1;
      player.sentOff = false;
      logMatch(
        team.name,
        `Blind Eye: the referee shows ${player.name} only a yellow — there will be words after the match.`,
        'card'
      );
      return 'yellow';
    }
    return 'red';
  }

  playAction(team, action, options = {}) {
    if (this.finished) return { success: false, reason: 'game over' };
    if (team !== this.currentTeam) return { success: false, reason: 'not this team turn' };

    const hand = this.inPlay[team.name];
    if (!hand.includes(action)) return { success: false, reason: 'action not in play' };

    const cost = this.effectiveCost(team, action);
    if (this.actionPoints[team.name] < cost) {
      return { success: false, reason: 'not enough action points' };
    }

    this.actionPoints[team.name] -= cost;
    hand.splice(hand.indexOf(action), 1);
    if (this.heldCards[team.name]) {
      const heldIdx = this.heldCards[team.name].indexOf(action);
      if (heldIdx >= 0) this.heldCards[team.name].splice(heldIdx, 1);
    }
    team.useAction(action);
    this._trackCardPlay(team, options);
    this._decisionActor = null;

    if (team.hasTeamEffect('persistence') && !this.firstPlayedThisTurn[team.name]) {
      this.firstPlayedThisTurn[team.name] = true;
      team.availableActions.push({ ...action });
    }

    const isComboExtra = (this.comboExtraPlays[team.name] || 0) > 0;
    if (isComboExtra) {
      this.comboExtraPlays[team.name] -= 1;
    }

    if (options.endTurn) {
      this.endTurn();
      if (options.nextTeam && !this.finished) this.currentTeam = options.nextTeam;
    } else if (options.noSwitch || isComboExtra) {
      // keep the current team on the ball: play another card without handing over the turn
      const comboGained = (this._turnHandAdds[team.name] || []).slice();
      this._turnHandAdds[team.name] = [];
      if (comboGained.length > 0 && isComboExtra && !options.noSwitch && team.controller.type === 'human') {
        this.pendingHandoff = { teamName: team.name, drawn: comboGained, handoffSwitch: false };
      }
    } else if (
      team.hasTeamEffect('relentlessMomentum') &&
      !this.firstPlayedThisTurn[team.name]
    ) {
      this.firstPlayedThisTurn[team.name] = true;
      this._turnHandAdds[team.name] = [];
    } else {
      const gained = (this._turnHandAdds[team.name] || []).slice();
      this._turnHandAdds[team.name] = [];
      if (gained.length > 0 && team.controller.type === 'human') {
        this.pendingHandoff = { teamName: team.name, drawn: gained, handoffSwitch: true };
      } else {
        this.nextTeam();
        this._advancePlay();
      }
    }

    if (team.hasTeamEffect('squadDepth')) {
      const plays = (this.squadDepthPlays[team.name] || 0) + 1;
      if (plays >= 8) {
        this.squadDepthPlays[team.name] = 0;
        this.drawCards(team, 1);
        logMatch(team.name, 'Squad Depth: fresh legs roll on — draw an extra card.');
      } else {
        this.squadDepthPlays[team.name] = plays;
      }
    }

    return { success: true };
  }

  endTurn() {
    this.startTurn();
  }

  _rollMatchEffect() {
    if (typeof MATCH_EFFECTS === 'undefined') return;
    if (Math.random() >= 0.1) return;

    if (this.matchEffect) {
      try {
        this.matchEffect.revoke();
      } catch (_) {}
      this.matchEffect = null;
    }

    let next = null;
    try {
      next = randomMatchEffect();
    } catch (_) {
      next = null;
    }
    if (!next) return;

    this.matchEffect = next;
    try {
      next.apply();
    } catch (_) {}
    if (typeof logMatch === 'function') {
      logMatch('', `A match effect takes hold: ${next.char} ${next.name} — ${next.description}`);
    }
    this.pendingMatchEffect = next;
  }

  recordGoal(team, scorer, extra) {
    if (this.finished) return { success: false, reason: 'game over' };
    this.score[team.name] = (this.score[team.name] || 0) + 1;
    this.matchEffect =
      this.matchEffect ||
      (this.pendingMatchEffectName ? resolveMatchEffectByName(this.pendingMatchEffectName) : this.matchEffect);
    if (
      this.matchEffect &&
      typeof GiantTifoEffect !== 'undefined' &&
      this.matchEffect instanceof GiantTifoEffect
    ) {
      try {
        this.matchEffect.syncBoost();
      } catch (_) {}
    }
    this.stats[team.name].goals += 1;
    this._statPlayer(scorer).goals += 1;
    if (typeof celebrateGoal === 'function') {
      try {
        celebrateGoal(team.name, scorer.name, extra);
      } catch {}
    }
    if (typeof shakeScreen === 'function') {
      try {
        shakeScreen();
      } catch {}
    }
    let assist = null;
    if (
      this.lastPass &&
      this.lastPass.turn === this.turn &&
      this.lastPass.team === team.name &&
      this.lastPass.player !== scorer.name
    ) {
      assist = this.lastPass.player;
      this.stats[team.name].assists += 1;
      this._statPlayer({ name: assist, team: team.name }).assists += 1;
    }
    this.lastPass = null;
    this.scorers.push({ team: team.name, scorer: scorer.name, assist, turn: this.turn });
    const opponent = this.teams.find((t) => t.name !== team.name);
    if (opponent) this.cancelParkTheBus(opponent);
    return { success: true, assist };
  }

  recordPossession(team) {
    this.stats[team.name].possession += 1;
  }

  recordRecovery(team, player) {
    this.stats[team.name].recoveries += 1;
    this._statPlayer(player).recoveries += 1;
    this.lastPass = null;
  }

  recordSave(team, goalkeeper) {
    this._statPlayer(goalkeeper).saves += 1;
  }

  recordShot(team, shooter) {
    this.stats[team.name].shots += 1;
    this._statPlayer(shooter).shots += 1;
  }

  recordFoul(team, player) {
    this.stats[team.name].fouls += 1;
    this._statPlayer(player).fouls += 1;
    if (typeof shakeScreen === 'function') {
      try {
        shakeScreen();
      } catch {}
    }
  }

  recordPass(team, player) {
    this.stats[team.name].passes += 1;
    this._statPlayer(player).passes += 1;
    this.lastPass = { team: team.name, player: player.name, turn: this.turn };
  }

  _statPlayer(player) {
    const name = player && (typeof player === 'string' ? player : player.name);
    if (!name) return this.playerStats.__none__ || (this.playerStats.__none__ = this._newPlayerStat(null, '__none__', null));
    const team = player && typeof player !== 'string' ? player.team : null;
    const age =
      player && typeof player !== 'string'
        ? player.age
        : (() => {
            const squad = team && TEAMS[team] && TEAMS[team].squad;
            const found = squad && squad.find((p) => p.name === name);
            return found ? found.age : null;
          })();
    if (!this.playerStats[name]) {
      this.playerStats[name] = this._newPlayerStat(team, name, age);
    }
    return this.playerStats[name];
  }

  _newPlayerStat(team, name, age) {
    return {
      name,
      team,
      age: typeof age === 'number' ? age : null,
      goals: 0,
      assists: 0,
      shots: 0,
      passes: 0,
      recoveries: 0,
      fouls: 0,
      saves: 0,
    };
  }

  clearLastPass() {
    this.lastPass = null;
  }

  possessionPercentages() {
    const result = {};
    const total = this.teams.reduce((sum, t) => sum + this.stats[t.name].possession, 0);
    let remaining = 100;
    this.teams.forEach((team, index) => {
      if (total === 0) {
        result[team.name] = 0;
      } else if (index === this.teams.length - 1) {
        result[team.name] = remaining;
      } else {
        const pct = Math.round((this.stats[team.name].possession / total) * 100);
        result[team.name] = pct;
        remaining -= pct;
      }
    });
    return result;
  }

  cancelParkTheBus(team) {
    for (const p of team.currentPlayers) {
      p.removeEffect('cohesiveDefense');
      p.removeEffect('defenseFocus');
    }
  }
}
