// game/save-load.js — Serialize/deserialize game state for page reload persistence
const SAVE_KEY = 'slay-the-umpire-save';
const SAVE_EFFECT_MAPS = [
  'muscleMemory', 'timeWall', 'ghostRun', 'fortressMentality',
  'blindEyeUsed', 'squadDepthPlays', 'cardsPlayedByPlayer', 'matchHeldCards',
];

const _saveLoad = {
  _lastSave: 0,
  _debounceMs: 500,

  _encode(val) {
    if (val === Infinity) return { __inf: true };
    if (val === -Infinity) return { __negInf: true };
    if (typeof val === 'number' && isNaN(val)) return { __nan: true };
    return val;
  },

  _decode(val) {
    if (val && typeof val === 'object') {
      if (val.__inf) return Infinity;
      if (val.__negInf) return -Infinity;
      if (val.__nan) return NaN;
    }
    return val;
  },

  _revive(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map((v) => this._revive(v));
    const decoded = {};
    for (const [k, v] of Object.entries(obj)) {
      decoded[k] = this._revive(this._decode(v));
    }
    return decoded;
  },

  _serializePlayer(p) {
    return {
      name: p.name,
      age: p.age,
      position: p.position,
      team: p.team,
      nationality: p.nationality,
      isStar: p.isStar,
      speed: p.speed,
      marking: p.marking,
      tackling: p.tackling,
      shooting: p.shooting,
      passing: p.passing,
      dribbling: p.dribbling,
      tacticalThinking: p.tacticalThinking,
      heading: p.heading,
      goalkeeping: p.goalkeeping,
      yellowCards: p.yellowCards,
      sentOff: p.sentOff,
      carriedFatigue: Boolean(p.carriedFatigue),
      injuryMatches: typeof p.injuryMatches === 'number' ? p.injuryMatches : undefined,
      effects: p.effects.map((e) => ({
        type: e.type,
        turns: e.turns,
      })),
    };
  },

  _serializeCard(card) {
    return {
      name: card.name, _id: card._id,
      hold: card.hold, free: card.free, ephemeral: card.ephemeral, exhaust: card.exhaust,
    };
  },

  _restoreCard(saved) {
    const card = resolveCard(saved.name);
    if (!card) return null;
    if (saved._id) {
      card._id = saved._id;
      Action.reserveCardId(saved._id);
    }
    for (const flag of ['hold', 'free', 'ephemeral', 'exhaust']) {
      if (typeof saved[flag] === 'boolean') card[flag] = saved[flag];
    }
    return card;
  },

  _serializeTeam(team) {
    return {
      name: team.name,
      side: team.side,
      primaryColor: team.primaryColor,
      reserveColor: team.reserveColor,
      shortsColor: team.shortsColor,
      awayShortsColor: team.awayShortsColor,
      controller: team.controller,
      squad: team.squad.map((p) => this._serializePlayer(p)),
      currentPlayers: team.currentPlayers.map((p) => p.name),
      startingXI: team.startingXI,
      substitutedOut: team.substitutedOut.map((p) => p.name),
      substitutionsUsed: team.substitutionsUsed,
      subWindowsUsed: team.subWindowsUsed,
      actions: team.actions.map((c) => this._serializeCard(c)),
      availableActions: team.availableActions.map((c) => this._serializeCard(c)),
      discardedActions: team.discardedActions.map((c) => this._serializeCard(c)),
      exhaustedActions: team.exhaustedActions.map((c) => this._serializeCard(c)),
      goalkeepingDeck: team.goalkeepingDeck.map((c) => this._serializeCard(c)),
      availableGoalkeeping: team.availableGoalkeeping.map((c) => this._serializeCard(c)),
      discardedGoalkeeping: team.discardedGoalkeeping.map((c) => this._serializeCard(c)),
      exhaustedGoalkeeping: team.exhaustedGoalkeeping.map((c) => this._serializeCard(c)),
      teamEffects: [...team.teamEffects],
      teamEffectObjects: team.teamEffectObjects.map((e) => ({
        type: e.type,
        turns: e.turns,
      })),
    };
  },

  _getPlayerPositions() {
    const positions = {};
    const tokens = document.querySelectorAll('.player-token');
    for (const el of tokens) {
      const player = el._token && el._token.player;
      if (!player) continue;
      const cellEl = el.closest('.cell');
      if (!cellEl) continue;
      positions[player.name] = {
        x: Number(cellEl.dataset.x),
        y: Number(cellEl.dataset.y),
      };
    }
    return positions;
  },

  save() {
    if (!game || simulationMode || !TEAMS) return;
    const now = Date.now();
    if (now - this._lastSave < this._debounceMs) return;
    this._lastSave = now;

    try {
      const snapshot = {
        v: 1,
        game: {
          turn: game.turn,
          maxTurns: game.maxTurns,
          cardsPerTurn: game.cardsPerTurn,
          pointsPerTurn: game.pointsPerTurn,
          finished: game.finished,
          halftimePending: game.halftimePending,
          score: { ...game.score },
          actionPoints: { ...game.actionPoints },
          scorers: game.scorers.map((s) => ({
            team: s.team,
            scorer: s.scorer,
            assist: s.assist,
            turn: s.turn,
          })),
          events: game.events.map((e) => ({
            minute: e.minute,
            type: e.type,
            team: e.team,
            player: e.player,
            detail: e.detail,
          })),
          stats: JSON.parse(JSON.stringify(game.stats)),
          playerStats: JSON.parse(JSON.stringify(game.playerStats)),
          lastPass: game.lastPass ? { ...game.lastPass } : null,
          intensity: { ...game.intensity },
          pepStyle: { ...game.pepStyle },
          flair: { ...game.flair },
          handOfGod: { ...game.handOfGod },
          brittleBones: { ...game.brittleBones },
          defensiveWall: { ...game.defensiveWall },
          gameManagement: { ...game.gameManagement },
          tempoControl: { ...game.tempoControl },
          tempoControlIntensityCost: { ...game.tempoControlIntensityCost },
          skipOpponentNextTurn: { ...game.skipOpponentNextTurn },
          pendingApBonus: { ...game.pendingApBonus },
          pendingDrawPenalty: { ...game.pendingDrawPenalty },
          revealedHand: { ...game.revealedHand },
          revealedHandTurn: { ...game.revealedHandTurn },
          suspensionShadowActive: game.suspensionShadowActive,
          firstPlayedThisTurn: { ...game.firstPlayedThisTurn },
          comboExtraPlays: { ...game.comboExtraPlays },
          heldCards: Object.fromEntries(Object.entries(game.heldCards).map(([name, cards]) =>
            [name, cards.map((c) => c._id)])),
          doOrDie: Object.fromEntries(Object.entries(game.doOrDie).map(([name, state]) =>
            [name, { stage: state.stage, buffed: (state.buffed || []).map((p) => p.name) }])),
          videoSession: Object.fromEntries(Object.entries(game.videoSession).map(([name, Ctor]) =>
            [name, new Ctor().name])),
          pendingPenalty: game.pendingPenalty,
          freeKickProtection: game.freeKickProtection ? { ...game.freeKickProtection } : null,
          ballStasisTurns: game.ballStasisTurns,
          lastBallCell: game._lastBallCell,
          dogRolledThisTurn: Boolean(game._dogRolledThisTurn),
          matchEffectName: game.matchEffect ? game.matchEffect.name : null,
          matchEffectState: game.matchEffect ? { ...game.matchEffect } : null,
          pendingMatchEffectName: game.pendingMatchEffect ? game.pendingMatchEffect.name : null,
          currentTeamName: game.currentTeam && game.currentTeam.name,
        },
        inPlay: {},
        freeActions: game.freeActions.map((c) => c._id),
        teams: {},
        ball: ball ? { x: ball.x, y: ball.y } : null,
        playerPositions: this._getPlayerPositions(),
        matchState: matchState ? {
          lastBallMove: matchState.lastBallMove ? { ...matchState.lastBallMove } : null,
          lastDribbledPlayer: matchState.lastDribbledPlayer || null,
          gkHoldFrom: null,
          gkCollectReturn: matchState.gkCollectReturn ? { ...matchState.gkCollectReturn } : null,
        } : null,
        substitutionWindowOpen: Boolean(substitutionWindowOpen),
        worldCup: typeof worldCup !== 'undefined' ? JSON.parse(JSON.stringify(worldCup)) : null,
        tournament: typeof tournament !== 'undefined' ? tournament : null,
        tournamentMode: typeof tournamentMode !== 'undefined' ? tournamentMode : false,
      };

      for (const key of SAVE_EFFECT_MAPS) snapshot.game[key] = game[key];
      for (const teamName of Object.keys(TEAMS)) {
        snapshot.inPlay[teamName] = game.inPlay[teamName].map((c) => this._serializeCard(c));
        snapshot.teams[teamName] = this._serializeTeam(TEAMS[teamName]);
      }

      const json = JSON.stringify(snapshot, (key, val) => this._encode(val));
      localStorage.setItem(SAVE_KEY, json);
    } catch (err) {
      console.warn('[save-load] save failed:', err.message);
    }
  },

  load() {
    try {
      const json = localStorage.getItem(SAVE_KEY);
      if (!json) return null;
      const raw = JSON.parse(json, (key, val) => this._decode(val));
      return this._revive(raw);
    } catch (err) {
      console.warn('[save-load] load failed:', err.message);
      return null;
    }
  },

  clear() {
    localStorage.removeItem(SAVE_KEY);
  },

  restore(snapshot) {
    if (!snapshot || !snapshot.teams) return false;

    const savedTeamNames = Object.keys(snapshot.teams);
    TEAMS = buildTeams(savedTeamNames);

    for (const teamName of savedTeamNames) {
      const saved = snapshot.teams[teamName];
      const team = TEAMS[teamName];
      if (!team) continue;

      team.side = saved.side;
      team.primaryColor = saved.primaryColor;
      team.reserveColor = saved.reserveColor;
      team.shortsColor = saved.shortsColor || saved.primaryColor;
      team.awayShortsColor = saved.awayShortsColor || saved.reserveColor;
      team.controller = saved.controller;
      team.startingXI = saved.startingXI;
      team.substitutionsUsed = saved.substitutionsUsed;
      team.subWindowsUsed = saved.subWindowsUsed;

      const savedPlayerByName = {};
      for (const sp of saved.squad) savedPlayerByName[sp.name] = sp;

      for (const player of team.squad) {
        const sp = savedPlayerByName[player.name];
        if (!sp) continue;
        player.speed = sp.speed;
        player.marking = sp.marking;
        player.tackling = sp.tackling;
        player.shooting = sp.shooting;
        player.passing = sp.passing;
        player.dribbling = sp.dribbling;
        player.tacticalThinking = sp.tacticalThinking;
        player.heading = sp.heading;
        player.goalkeeping = sp.goalkeeping;
        player.yellowCards = sp.yellowCards;
        player.sentOff = sp.sentOff;
        player.carriedFatigue = Boolean(sp.carriedFatigue);
        if (typeof sp.injuryMatches === 'number') player.injuryMatches = sp.injuryMatches;
        else if (player.injuryMatches !== undefined) player.injuryMatches = undefined;
        player.effects = [];
        for (const e of sp.effects) {
          // Saved stats already contain these modifiers. Restore metadata only.
          const spec = PLAYER_EFFECTS[e.type];
          if (!spec) throw new Error(`unknown effect: ${e.type}`);
          player.effects.push({
            type: e.type, turns: e.turns,
            char: spec.char, label: spec.label, explanation: spec.explanation,
          });
        }
      }

      team.currentPlayers = saved.currentPlayers
        .map((name) => team.squad.find((p) => p.name === name))
        .filter(Boolean);
      team.currentGoalkeeper = team.currentPlayers.find((p) => p.position === 'GK') || null;
      team.substitutedOut = saved.substitutedOut
        .map((name) => team.squad.find((p) => p.name === name))
        .filter(Boolean);

      team.teamEffects = saved.teamEffects || [];
      team.teamEffectObjects = (saved.teamEffectObjects || []).map((e) => ({
        type: e.type,
        turns: e.turns,
        char: TEAM_EFFECTS[e.type] ? TEAM_EFFECTS[e.type].char : '',
        label: TEAM_EFFECTS[e.type] ? TEAM_EFFECTS[e.type].label : e.type,
        explanation: TEAM_EFFECTS[e.type] ? TEAM_EFFECTS[e.type].explanation : '',
      }));

      const rebuildPile = (savedCards) => savedCards.map((sc) => this._restoreCard(sc)).filter(Boolean);

      team.actions = rebuildPile(saved.actions);
      team.availableActions = rebuildPile(saved.availableActions);
      team.discardedActions = rebuildPile(saved.discardedActions);
      team.exhaustedActions = rebuildPile(saved.exhaustedActions);
      team.goalkeepingDeck = rebuildPile(saved.goalkeepingDeck);
      team.availableGoalkeeping = rebuildPile(saved.availableGoalkeeping);
      team.discardedGoalkeeping = rebuildPile(saved.discardedGoalkeeping);
      team.exhaustedGoalkeeping = rebuildPile(saved.exhaustedGoalkeeping);
    }

    setupGame({ start: false });

    const g = snapshot.game;
    game.turn = g.turn;
    game.maxTurns = g.maxTurns;
    game.cardsPerTurn = g.cardsPerTurn;
    game.pointsPerTurn = g.pointsPerTurn;
    game.finished = g.finished;
    game.halftimePending = g.halftimePending;
    game.pendingHandoff = null;
    game._turnHandAdds = {};
    game.score = g.score;
    game.actionPoints = g.actionPoints;
    game.scorers = g.scorers || [];
    game.events = g.events || [];
    game.stats = g.stats || {};
    game.playerStats = g.playerStats || {};
    game.lastPass = g.lastPass;
    game.intensity = g.intensity || {};
    game.pepStyle = g.pepStyle || {};
    game.flair = g.flair || {};
    game.handOfGod = g.handOfGod || {};
    game.brittleBones = g.brittleBones || {};
    game.defensiveWall = g.defensiveWall || {};
    game.gameManagement = g.gameManagement || {};
    game.tempoControl = g.tempoControl || {};
    game.tempoControlIntensityCost = g.tempoControlIntensityCost || {};
    game.skipOpponentNextTurn = g.skipOpponentNextTurn || {};
    game.pendingApBonus = g.pendingApBonus || {};
    game.pendingDrawPenalty = g.pendingDrawPenalty || {};
    game.revealedHand = g.revealedHand || {};
    game.revealedHandTurn = g.revealedHandTurn || {};
    game.suspensionShadowActive = g.suspensionShadowActive || null;
    game.firstPlayedThisTurn = g.firstPlayedThisTurn || {};
    game.comboExtraPlays = g.comboExtraPlays || {};
    for (const key of SAVE_EFFECT_MAPS) game[key] = g[key] || {};
    game.pendingPenalty = g.pendingPenalty || null;
    game.freeKickProtection = g.freeKickProtection || null;
    game.ballStasisTurns = g.ballStasisTurns || 0;
    game._lastBallCell = g.lastBallCell ?? null;
    game._dogRolledThisTurn = Boolean(g.dogRolledThisTurn);
    game.doOrDie = {};
    for (const [teamName, state] of Object.entries(g.doOrDie || {})) {
      const team = TEAMS[teamName];
      if (!team) continue;
      game.doOrDie[teamName] = {
        stage: state.stage,
        buffed: (state.buffed || []).map((name) => team.squad.find((p) => p.name === name)).filter(Boolean),
      };
    }
    game.videoSession = {};
    for (const [teamName, name] of Object.entries(g.videoSession || {})) {
      const card = resolveCard(name);
      if (card) game.videoSession[teamName] = card.constructor;
    }
    game.freeActions = [];

    if (g.currentTeamName && TEAMS[g.currentTeamName]) {
      game.currentTeam = TEAMS[g.currentTeamName];
    }

    if (game.matchEffect) {
      try {
        game.matchEffect.revoke();
      } catch (_) {}
    }
    game.matchEffect = null;
    game.pendingMatchEffect = null;
    if (g.matchEffectName) {
      const restored = resolveMatchEffect(g.matchEffectName);
      if (restored) {
        if (g.matchEffectState) Object.assign(restored, g.matchEffectState);
        game.matchEffect = restored;
      }
    }
    if (g.pendingMatchEffectName) {
      game.pendingMatchEffect = game.matchEffect && game.matchEffect.name === g.pendingMatchEffectName
        ? game.matchEffect : resolveMatchEffect(g.pendingMatchEffectName);
    }

    const cardById = {};
    for (const teamName of Object.keys(TEAMS)) {
      game.inPlay[teamName] = (snapshot.inPlay[teamName] || []).map((sc) => {
        const card = this._restoreCard(sc);
        if (card) cardById[sc._id] = card;
        return card;
      }).filter(Boolean);
    }
    game.freeActions = (snapshot.freeActions || [])
      .map((id) => cardById[id])
      .filter(Boolean);
    game.heldCards = {};
    for (const teamName of savedTeamNames) {
      const hand = game.inPlay[teamName];
      const ids = (g.heldCards || {})[teamName] || [];
      game.heldCards[teamName] = hand.filter((card) => ids.includes(card._id));
      for (const card of game.heldCards[teamName]) card.hold = true;
      TEAMS[teamName].syncHandPenalties(hand);
    }

    matchState = snapshot.matchState ? {
      possession: null,
      lastBallMove: snapshot.matchState.lastBallMove,
      lastDribbledPlayer: snapshot.matchState.lastDribbledPlayer,
      gkHoldFrom: null,
      gkCollectReturn: snapshot.matchState.gkCollectReturn,
      lastShotSave: false,
      lastLongBallReceiver: null,
    } : {
      possession: null,
      lastBallMove: null,
      lastDribbledPlayer: null,
      gkHoldFrom: null,
      gkCollectReturn: null,
      lastShotSave: false,
      lastLongBallReceiver: null,
    };

    substitutionWindowOpen = snapshot.substitutionWindowOpen || false;

    for (const teamName of Object.keys(TEAMS)) {
      const team = TEAMS[teamName];
      if (team.hasTeamEffect('creativity')) {
        game._wrapInPlayProxies();
        break;
      }
    }

    for (const teamName of Object.keys(TEAMS)) {
      const team = TEAMS[teamName];
      for (const player of team.currentPlayers) {
        const pos = snapshot.playerPositions[player.name];
        if (pos) {
          new PlayerToken({ player, teamColor: team.primaryColor, shorts: PlayerToken.shortsFor(team) })
            .placeIn(cell(pos.x, pos.y), team.side === 'left' ? 'left' : 'right');
        }
      }
    }

    if (snapshot.ball) {
      ball = new Ball({ x: snapshot.ball.x, y: snapshot.ball.y, resolveCell: cell });
    }

    if (snapshot.ball && matchState) {
      const ballHolder = findBallHolder(snapshot.ball);
      if (ballHolder) {
        matchState.possession = ballHolder.el;
      }
    }

    if (typeof worldCup !== 'undefined' && worldCup && snapshot.worldCup) {
      Object.assign(worldCup, snapshot.worldCup);
    }
    if (typeof tournament !== 'undefined' && snapshot.tournament) {
      tournament = snapshot.tournament;
    }
    if (typeof tournamentMode !== 'undefined') {
      tournamentMode = snapshot.tournamentMode || false;
    }

    return true;
  },
};

function findBallHolder(ballPos) {
  const tokens = document.querySelectorAll('.player-token');
  for (const el of tokens) {
    if (!el._token) continue;
    const cellEl = el.closest('.cell');
    if (!cellEl) continue;
    if (Number(cellEl.dataset.x) === ballPos.x && Number(cellEl.dataset.y) === ballPos.y) {
      return el._token;
    }
  }
  return null;
}

function saveGameState() { _saveLoad.save(); }
function hasSaveGame() {
  try {
    return Boolean(localStorage.getItem(SAVE_KEY));
  } catch (err) {
    return false;
  }
}
function loadGameState() { return _saveLoad.load(); }
function clearSaveGame() { _saveLoad.clear(); }
function restoreGameState(snapshot) { return _saveLoad.restore(snapshot); }

function resumeMatchFromSave() {
  const snapshot = loadGameState();
  if (!snapshot) return;
  try {
    const restored = restoreGameState(snapshot);
    if (!restored) return;
    showBoard();
    renderGame();
  } catch (err) {
    console.warn('[save-load] resume failed:', err.message);
    clearSaveGame();
  }
}
