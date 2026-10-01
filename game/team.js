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
    this._headsInTheCloudsActive = false;
    this._originalPlayers = null;

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

  syncHandPenalties(inPlay) {
    const STAT_KEYS = BOOSTABLE_STATS;
    const hasHeads = inPlay.some((c) => c instanceof HeadsInTheCloudsAction);
    const hasRedMist = inPlay.some((c) => c instanceof RedMistAction);
    const hasMoraleCollapse = inPlay.some((c) => c instanceof MoraleCollapseAction);
    const hasGKBlunder = inPlay.some((c) => c instanceof GoalkeeperBlunderAction);
    const anyActive = hasHeads || hasRedMist || hasMoraleCollapse || hasGKBlunder;

    if (anyActive && !this._handPenaltiesActive) {
      this._originalPlayers = this.currentPlayers.slice();
      this.currentPlayers = this._originalPlayers.map((p) => {
        const handler = {
          get(target, prop, receiver) {
            if (STAT_KEYS.includes(prop)) {
              let v = Reflect.get(target, prop, receiver);
              if (typeof v === 'number') {
                if (hasHeads) v -= 3;
                if (hasRedMist && (prop === 'marking' || prop === 'tackling')) v -= 2;
                if (hasMoraleCollapse && prop === 'tacticalThinking') v -= 3;
                if (hasGKBlunder && prop === 'goalkeeping') v -= 4;
              }
              return v;
            }
            return Reflect.get(target, prop, receiver);
          },
        };
        const proxy = new Proxy(p, handler);
        proxy.__original = p;
        return proxy;
      });
      this._handPenaltiesActive = true;
    } else if (!anyActive && this._handPenaltiesActive && this._originalPlayers) {
      this.currentPlayers = this._originalPlayers;
      this._originalPlayers = null;
      this._handPenaltiesActive = false;
    } else if (anyActive && this._handPenaltiesActive && this._originalPlayers) {
      const hasHeadsChanged = hasHeads !== this._headsInPlay;
      const hasRedMistChanged = hasRedMist !== this._redMistInPlay;
      const hasMoraleChanged = hasMoraleCollapse !== this._moraleCollapseInPlay;
      const hasGKBlunderChanged = hasGKBlunder !== this._gkBlunderInPlay;
      if (hasHeadsChanged || hasRedMistChanged || hasMoraleChanged || hasGKBlunderChanged) {
        this.currentPlayers = this._originalPlayers.map((p) => {
          const handler = {
            get(target, prop, receiver) {
              if (STAT_KEYS.includes(prop)) {
                let v = Reflect.get(target, prop, receiver);
                if (typeof v === 'number') {
                  if (hasHeads) v -= 3;
                  if (hasRedMist && (prop === 'marking' || prop === 'tackling')) v -= 2;
                  if (hasMoraleCollapse && prop === 'tacticalThinking') v -= 3;
                  if (hasGKBlunder && prop === 'goalkeeping') v -= 4;
                }
                return v;
              }
              return Reflect.get(target, prop, receiver);
            },
          };
          const proxy = new Proxy(p, handler);
          proxy.__original = p;
          return proxy;
        });
      }
    }

    this._headsInPlay = hasHeads;
    this._redMistInPlay = hasRedMist;
    this._moraleCollapseInPlay = hasMoraleCollapse;
    this._gkBlunderInPlay = hasGKBlunder;
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
    this.currentPlayers[index] = inPlayer;
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
    const pos = player.position;
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

  // ---- Formation resolver ----
  // cellsByPos: { GK: [[0,3]], DF: [[2,0],...], MF: [...], FW: [...] }
  //   coords are own-goal-relative (x=0 own goal, max x=6)
  // starters/subs: arrays of Player objects
  // side: 'left' | 'right'
  // unavailable: Set of player names to skip
  static resolveFormation(cellsByPos, { starters, subs, side, unavailable } = {}) {
    unavailable = unavailable || new Set();
    const map = {};
    const placed = [];
    const placedSet = new Set();
    const _absX = (relX) => (side === 'left' ? relX : 8 - relX);

    // 1. GK — always exactly one, at own-goal front
    const gkCellX = side === 'left' ? 0 : 8;
    const pickGk = [...starters, ...subs].find(
      (p) => p.position === 'GK' && !unavailable.has(p.name)
    );
    if (pickGk) {
      map[pickGk.name] = [gkCellX, 3];
      placed.push(pickGk);
      placedSet.add(pickGk.name);
    }

    // 2. Flatten non-GK cells in position order (DF → MF → FW)
    const cells = [];
    for (const pos of ['DF', 'MF', 'FW']) {
      for (const coord of cellsByPos[pos] || []) {
        cells.push({ pos, relX: coord[0], relY: coord[1] });
      }
    }

    // 3. Available pools (non-GK, not yet placed, not unavailable)
    const poolStarters = starters.filter(
      (p) => !placedSet.has(p.name) && !unavailable.has(p.name) && p.position !== 'GK'
    );
    const poolSubs = subs.filter(
      (p) => !placedSet.has(p.name) && !unavailable.has(p.name) && p.position !== 'GK'
    );

    // 4. Fill each cell: strict first, then flex, starters before subs
    for (const cell of cells) {
      if (placed.length >= 11) break;
      const acx = _absX(cell.relX);

      let pick =
        poolStarters.find((p) => p.position === cell.pos) ||
        poolStarters.find((p) => Team.canFlex(p.position, cell.pos, acx, cell.relY)) ||
        poolSubs.find((p) => p.position === cell.pos) ||
        poolSubs.find((p) => Team.canFlex(p.position, cell.pos, acx, cell.relY)) ||
        poolStarters[0] ||
        poolSubs[0];

      if (pick) {
        map[pick.name] = [acx, cell.relY];
        placed.push(pick);
        placedSet.add(pick.name);
        const i1 = poolStarters.indexOf(pick);
        if (i1 !== -1) poolStarters.splice(i1, 1);
        const i2 = poolSubs.indexOf(pick);
        if (i2 !== -1) poolSubs.splice(i2, 1);
      }
    }

    return { map, placed };
  }

  static canFlex(pPos, slotPos, absX, relY) {
    if (pPos === slotPos) return true;
    if (slotPos === 'MF' && pPos === 'DF' && absX < 5) return true;
    if (
      slotPos === 'FW' &&
      pPos === 'MF' &&
      !(absX === 6 && (relY === 2 || relY === 3 || relY === 4))
    )
      return true;
    if (slotPos === 'MF' && pPos === 'FW' && (relY === 0 || relY === 6) && absX >= 5)
      return true;
    return false;
  }
}
