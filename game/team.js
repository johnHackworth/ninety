class Team {
  static MAX_SUBS_PER_MATCH = 5;
  static MAX_SUB_WINDOWS = 3;

  constructor({ name, level, starPlayers, coach, primaryColor, reserveColor, shortsColor, awayShortsColor, squad, actions, startingXI, side, controller, artifacts }) {
    this.name = name;
    this.level = level; // 3 = FIFA top 10, 2 = 11-20, 1 = 21-40, 0 = rest (informational only, not used in game)
    this.side = side;
    this.coach = coach;
    this.controller = controller || { type: 'human' };
    this.primaryColor = primaryColor;
    this.reserveColor = reserveColor;
    this.shortsColor = shortsColor || primaryColor;
    this.awayShortsColor = awayShortsColor || reserveColor;
    this.squad = squad;
    this.startingXI = startingXI;
    this.currentPlayers = this.squad.filter((player) => startingXI.includes(player.name));
    this.starPlayers = starPlayers || [];
    this.currentGoalkeeper = this.currentPlayers.find((player) => player.position === 'GK');
    this.actions = actions && actions.length ? actions : [];
    this.availableActions = [...this.actions];
    this.discardedActions = [];
    this.exhaustedActions = [];
    this.teamEffects = [];
    this.teamEffectObjects = [];
    this.artifacts = [];
    this.coaches = [];
    this.substitutedOut = [];
    this.substitutionsUsed = 0;
    this.subWindowsUsed = 0;
    this._handPenaltiesActive = false;
    this._handPenaltyProxies = new WeakMap();

    this.activateArtifacts(artifacts);

    this.goalkeepingDeck = [
      new WellPositionedAction(),
      new MispositionedAction(),
      new LooseBallAction(),
      new LooseBallAction(),
      new BotchedSaveAction(),
      new HowlerAction(),
      new AmazingReflexesAction(),
      new HitThePostAction(),
    ];
    this.availableGoalkeeping = [...this.goalkeepingDeck];
    this.discardedGoalkeeping = [];
    this.exhaustedGoalkeeping = [];
  }

  static rating(player) {
    return (
      player.speed + player.marking + player.tackling + player.shooting +
      player.passing + player.dribbling + player.tacticalThinking +
      player.heading + player.goalkeeping
    ) / 9;
  }

  _unwrapPlayer(player) {
    return player && player.__original ? player.__original : player;
  }

  _handPenaltyFor(stat) {
    if (!BOOSTABLE_STATS.includes(stat)) return 0;
    let penalty = this._headsInPlay ? 3 : 0;
    if (this._redMistInPlay && (stat === 'marking' || stat === 'tackling')) penalty += 2;
    if (this._moraleCollapseInPlay && stat === 'tacticalThinking') penalty += 3;
    if (this._gkBlunderInPlay && stat === 'goalkeeping') penalty += 4;
    return penalty;
  }

  _handPenaltyPlayer(player) {
    player = this._unwrapPlayer(player);
    if (!this._handPenaltiesActive) return player;
    let proxy = this._handPenaltyProxies.get(player);
    if (!proxy) {
      const team = this;
      proxy = new Proxy(player, {
        get(target, prop, receiver) {
          if (prop === '__original') return target;
          const value = Reflect.get(target, prop, receiver);
          return typeof value === 'number' ? value - team._handPenaltyFor(prop) : value;
        },
        set(target, prop, value, receiver) {
          // Writes use the same effective attributes as reads, so +=/-= do
          // not bake a temporary hand penalty into the player's base stats.
          const baseValue = typeof value === 'number' ? value + team._handPenaltyFor(prop) : value;
          return Reflect.set(target, prop, baseValue, receiver);
        },
      });
      this._handPenaltyProxies.set(player, proxy);
    }
    return proxy;
  }

  syncHandPenalties(inPlay) {
    this._headsInPlay = inPlay.some((c) => c instanceof HeadsInTheCloudsAction);
    this._redMistInPlay = inPlay.some((c) => c instanceof RedMistAction);
    this._moraleCollapseInPlay = inPlay.some((c) => c instanceof MoraleCollapseAction);
    this._gkBlunderInPlay = inPlay.some((c) => c instanceof GoalkeeperBlunderAction);
    this._handPenaltiesActive = this._headsInPlay || this._redMistInPlay ||
      this._moraleCollapseInPlay || this._gkBlunderInPlay;

    // Keep the current lineup, including substitutions and player removals.
    // Cached proxies read the current flags even through retained references.
    this.currentPlayers = this.currentPlayers.map((p) => this._handPenaltyPlayer(p));
  }

  syncHeadsInTheClouds(inPlay) {
    this.syncHandPenalties(inPlay);
  }

  drawGoalkeepingCard() {
    if (this.availableGoalkeeping.length === 0) this.recycleGoalkeeping();
    if (this.availableGoalkeeping.length === 0) return null;
    const index = Math.floor(Math.random() * this.availableGoalkeeping.length);
    return this.availableGoalkeeping.splice(index, 1)[0];
  }

  recycleGoalkeeping() {
    if (this.discardedGoalkeeping.length === 0) return;
    this.availableGoalkeeping.push(...this.discardedGoalkeeping);
    this.discardedGoalkeeping = [];
  }

  discardGoalkeeping(card) {
    if (!card) return;
    if (card.exhaust) {
      this.exhaustedGoalkeeping.push(card);
    } else {
      this.discardedGoalkeeping.push(card);
    }
  }

  useAction(action) {
    if (action instanceof FatigueAction) {
      const candidates = this.currentPlayers.filter((p) => !p.injured);
      if (candidates.length > 0) {
        const victim = candidates[Math.floor(Math.random() * candidates.length)];
        victim.addEffect('fatigued', 3);
      }
    }
    if (action instanceof InjuryRiskAction) {
      const candidates = this.currentPlayers.filter((p) => !p.injured);
      if (candidates.length > 0) {
        const victim = candidates[Math.floor(Math.random() * candidates.length)];
        victim.addEffect('injured', Infinity);
        logMatch(this.name, `Injury risk: ${victim.name} is injured!`);
      }
    }
    if (action.exhaust) {
      this.exhaustedActions.push(action);
    } else {
      this.discardedActions.push(action);
    }
  }

  substitute(outPlayer, inPlayer) {
    outPlayer = this._unwrapPlayer(outPlayer);
    inPlayer = this._unwrapPlayer(inPlayer);
    if (this.substitutedOut.includes(outPlayer)) return false;
    if (this.currentPlayers.some((p) => this._unwrapPlayer(p) === inPlayer)) return false;
    const index = this.currentPlayers.findIndex((p) => this._unwrapPlayer(p) === outPlayer);
    if (index === -1) return false;
    let slot = null;
    if (this.formation && this.formation[outPlayer.name]) {
      slot = this.formation[outPlayer.name];
    }
    this.currentPlayers[index] = this._handPenaltyPlayer(inPlayer);
    if (outPlayer.position === 'GK') this.currentGoalkeeper = inPlayer;
    this.substitutionsUsed += 1;
    this.substitutedOut.push(outPlayer);
    if (slot) {
      this.formation[inPlayer.name] = slot;
      delete this.formation[outPlayer.name];
    }
    this.recomputeOutOfPosition();
    return true;
  }

  // Attribute penalty for a player whose spot column is far from their
  // natural position. Returns 0, -1 or -3. Columns are measured from the
  // team's own goal (higher = more attacking), independent of which side
  // each team attacks.
  outOfPositionPenalty(player) {
    const slot = this.formation && this.formation[player.name];
    if (!slot) return 0;
    const attackingX = this.side === 'left' ? slot[0] : (WIDTH - 1 - slot[0]);
    return Team.positionPenalty(player.position, attackingX);
  }

  static positionPenalty(pos, attackingX) {
    if (pos === 'FW') return attackingX >= 5 ? 0 : (attackingX >= 3 ? -1 : -3);
    if (pos === 'MF') return (attackingX >= 3 && attackingX <= 5) ? 0 : -1;
    if (pos === 'DF') return attackingX <= 3 ? 0 : (attackingX <= 4 ? -1 : -3);
    return 0;
  }

  // Apply (or reverse) each on-pitch player's out-of-position penalty on their
  // base attributes. Reverses the previous delta before applying the new one,
  // so repeated calls are idempotent.
  recomputeOutOfPosition() {
    for (const cw of this.currentPlayers) {
      const real = this._unwrapPlayer(cw);
      const penalty = this.outOfPositionPenalty(real);
      const old = real._outOfPositionDelta || 0;
      if (penalty === old) continue;
      if (old) for (const attr of BOOSTABLE_STATS) real[attr] -= old;
      if (penalty) for (const attr of BOOSTABLE_STATS) real[attr] += penalty;
      real._outOfPositionDelta = penalty;
    }
  }

  availableSubstitutes() {
    return this.squad.filter(
      (p) =>
        !this.currentPlayers.some((cp) => this._unwrapPlayer(cp) === p) &&
        !p.injured &&
        !p.sentOff &&
        !this.substitutedOut.includes(p)
    );
  }

  get subsRemaining() {
    return Math.max(0, Team.MAX_SUBS_PER_MATCH - this.substitutionsUsed);
  }

  get subWindowsRemaining() {
    return Math.max(0, Team.MAX_SUB_WINDOWS - this.subWindowsUsed);
  }

  discardAction(action) {
    const index = this.availableActions.indexOf(action);
    if (index === -1) return;
    this.availableActions.splice(index, 1);
    this.discardedActions.push(action);
  }

  recycleDiscarded(needed = 1) {
    if (this.availableActions.length >= needed) return;
    if (this.discardedActions.length === 0) return;
    this.availableActions.push(...this.discardedActions);
    this.discardedActions = [];
  }

  activateArtifacts(artifacts = []) {
    this.artifacts = [];
    for (const artifact of artifacts) {
      const spec = typeof artifact === 'string' ? TEAM_ARTIFACTS[artifact] : artifact;
      if (!spec) throw new Error(`unknown team artifact: ${JSON.stringify(artifact)}`);
      const active = { ...spec };
      if (!Array.isArray(active.effects)) active.effects = [active.effect].filter(Boolean);
      this.artifacts.push(active);
      for (const effect of active.effects) {
        this.addTeamEffect(effect, Infinity);
      }
    }
  }

  _applyTeamEffectStats(type, sign) {
    const spec = TEAM_EFFECTS[type];
    if (!spec || !spec.stats) return;
    for (const player of this.squad) {
      for (const attr of BOOSTABLE_STATS) {
        const delta = spec.stats[attr];
        if (delta) player[attr] += sign * delta;
      }
    }
  }

  addTeamEffect(effect, turns) {
    const spec = TEAM_EFFECTS[effect];
    if (!spec) {
      this.teamEffects.push(effect);
      return;
    }
    const duration = turns === undefined ? spec.turns : turns;

    const existing = this.teamEffectObjects.find((e) => e.type === effect);
    if (existing) {
      existing.turns = duration;
      return;
    }

    const obj = {
      type: effect,
      turns: duration,
      char: spec.char,
      label: spec.label,
      explanation: spec.explanation,
    };
    if (!this.teamEffects.includes(effect)) this.teamEffects.push(effect);
    if (!this.teamEffectObjects.includes(obj)) this.teamEffectObjects.push(obj);
    this._applyTeamEffectStats(effect, 1);
    if (effect === 'gkStar' && this.goalkeepingDeck) {
      for (let i = 0; i < 2; i++) {
        const card = new AmazingReflexesAction();
        this.goalkeepingDeck.push(card);
        this.availableGoalkeeping.push(card);
      }
    }
    if (effect === 'highMobility') {
      for (let i = 0; i < 3; i++) {
        const card = new MoveAction();
        this.actions.push(card);
        this.availableActions.push(card);
      }
      const sprint = new SprintAction();
      this.actions.push(sprint);
      this.availableActions.push(sprint);
    }
  }

  removeTeamEffect(effect) {
    const index = this.teamEffects.indexOf(effect);
    if (index !== -1) this.teamEffects.splice(index, 1);
    const objIndex = this.teamEffectObjects.findIndex((e) => e.type === effect);
    if (objIndex !== -1) {
      this._applyTeamEffectStats(effect, -1);
      this.teamEffectObjects.splice(objIndex, 1);
    }
  }

  tickTeamEffects() {
    for (const objectEffect of [...this.teamEffectObjects]) {
      if (objectEffect.turns === Infinity) continue;
      objectEffect.turns -= 1;
      if (objectEffect.turns <= 0) this.removeTeamEffect(objectEffect.type);
    }
  }

  hasTeamEffect(effect) {
    return this.teamEffects.includes(effect);
  }

  applySecondWind() {
    if (!this.hasTeamEffect('secondWind')) return;
    for (const p of this.currentPlayers) {
      for (const type of ['exhausted', 'fatigued', 'matchFatigued', 'matchExhausted']) {
        if (p.hasEffect(type)) {
          p.removeEffect(type);
          logMatch(this.name, `Second wind: ${p.name} is no longer ${PLAYER_EFFECTS[type].label.toLowerCase()}.`);
        }
      }
    }
  }

  // Rate the skills used in this slot, including its actual position penalty.
  // Wide slots favor mobility; central slots favor defending or finishing.
  static formationScore(player, pos, relX, relY) {
    const wide = relY <= 1 || relY >= 5;
    let weights;
    if (pos === 'GK') weights = { goalkeeping: 8, tacticalThinking: 1, passing: 1 };
    else if (pos === 'DF') weights = wide
      ? { marking: 3, tackling: 3, speed: 3, passing: 1 }
      : { marking: 3, tackling: 3, heading: 3, tacticalThinking: 1 };
    else if (pos === 'FW') weights = wide
      ? { shooting: 3, dribbling: 3, speed: 3, passing: 1 }
      : { shooting: 5, heading: 2, dribbling: 2, tacticalThinking: 1 };
    else if (relX <= 3) weights = { tackling: 3, marking: 2, passing: 3, tacticalThinking: 2 };
    else if (relX >= 5) weights = { shooting: 3, passing: 3, dribbling: 3, speed: 1 };
    else weights = wide
      ? { passing: 3, dribbling: 3, speed: 3, tacticalThinking: 1 }
      : { passing: 4, tacticalThinking: 3, dribbling: 2, tackling: 1 };

    const delta = Team.positionPenalty(player.position, relX) - (player._outOfPositionDelta || 0);
    let score = 0;
    for (const [stat, weight] of Object.entries(weights)) {
      score += ((player[stat] || 0) + delta) * weight / 10;
    }
    // A small familiarity bonus allows a much stronger flexible player to win.
    if (player.position === pos) score += 1;
    else if (Team.canFlex(player.position, pos, relX, relY)) score += 0.5;
    return score;
  }

  // Coordinates are own-goal-relative. Starters win equal-score ties, but the
  // entire available squad competes for the strongest overall assignment.
  static resolveFormation(cellsByPos, { starters = [], subs = [], side = 'left', unavailable = new Set() } = {}) {
    const map = {};
    const placed = [];
    const seen = new Set();
    const players = [...starters, ...subs].filter((p) => {
      if (!p || seen.has(p.name) || unavailable.has(p.name) || p.injured || p.sentOff) return false;
      seen.add(p.name);
      return true;
    });
    const absX = (relX) => side === 'right' ? 8 - relX : relX;

    let goalkeeper = null;
    for (const player of players) {
      if (player.position !== 'GK') continue;
      if (!goalkeeper || Team.formationScore(player, 'GK', 0, 3) > Team.formationScore(goalkeeper, 'GK', 0, 3)) {
        goalkeeper = player;
      }
    }
    if (goalkeeper) {
      map[goalkeeper.name] = [absX(0), 3];
      placed.push(goalkeeper);
    }

    const cells = [];
    for (const pos of ['DF', 'MF', 'FW']) {
      for (const [relX, relY] of cellsByPos[pos] || []) {
        if (cells.length >= 11 - placed.length) break;
        cells.push({ pos, relX, relY });
      }
    }

    // Each bit is a filled slot. Process each player once, visiting masks in
    // descending order so the player cannot fill two slots. With ten outfield
    // slots this needs only 1024 states, avoiding a greedy assignment that can
    // use a versatile player before their strongest slot is considered.
    const states = new Array(1 << cells.length);
    states[0] = { score: 0, picks: [] };
    for (const player of players) {
      if (player.position === 'GK') continue;
      const scores = cells.map((c) => Team.formationScore(player, c.pos, c.relX, c.relY));
      for (let mask = states.length - 1; mask >= 0; mask--) {
        const state = states[mask];
        if (!state) continue;
        for (let i = 0; i < cells.length; i++) {
          if (mask & (1 << i)) continue;
          const next = mask | (1 << i);
          const score = state.score + scores[i];
          if (states[next] && score <= states[next].score + 1e-9) continue;
          const picks = state.picks.slice();
          picks[i] = player;
          states[next] = { score, picks };
        }
      }
    }

    // Short squads still field as many players as possible, even when their
    // scores are negative because they must play far out of position.
    let best = states[0];
    let bestCount = 0;
    for (const state of states) {
      if (!state) continue;
      const count = state.picks.filter(Boolean).length;
      if (count > bestCount || (count === bestCount && state.score > best.score + 1e-9)) {
        best = state;
        bestCount = count;
      }
    }
    best.picks.forEach((player, i) => {
      if (!player) return;
      map[player.name] = [absX(cells[i].relX), cells[i].relY];
      placed.push(player);
    });
    return { map, placed };
  }

  static canFlex(pPos, slotPos, relX, relY) {
    if (pPos === slotPos) return true;
    if (slotPos === 'MF' && pPos === 'DF' && relX < 5) return true;
    if (
      slotPos === 'FW' &&
      pPos === 'MF' &&
      !(relX === 6 && (relY === 2 || relY === 3 || relY === 4))
    )
      return true;
    if (slotPos === 'MF' && pPos === 'FW' && (relY === 0 || relY === 6) && relX >= 5)
      return true;
    return false;
  }
}
