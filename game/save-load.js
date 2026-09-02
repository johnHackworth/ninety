// game/save-load.js — Serialize/deserialize game state for page reload persistence
const SAVE_KEY = 'slay-the-umpire-save';

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
      effects: p.effects.map((e) => ({
        type: e.type,
        turns: e.turns,
      })),
    };
  },

  _serializeCard(card) {
    return { name: card.name, _id: card._id };
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
          lastMoveWasSkip: game.lastMoveWasSkip,
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
          suspensionShadowActive: game.suspensionShadowActive,
          firstPlayedThisTurn: { ...game.firstPlayedThisTurn },
          comboExtraPlays: { ...game.comboExtraPlays },
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
        player.effects = [];
        for (const e of sp.effects) {
          player.addEffect(e.type, e.turns === Infinity ? Infinity : e.turns);
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

      function rebuildPile(savedCards) {
        return savedCards.map((sc) => {
          const card = resolveCard(sc.name);
          if (card && sc._id) card._id = sc._id;
          return card;
        }).filter(Boolean);
      }

      team.actions = rebuildPile(saved.actions);
      team.availableActions = rebuildPile(saved.availableActions);
      team.discardedActions = rebuildPile(saved.discardedActions);
      team.exhaustedActions = rebuildPile(saved.exhaustedActions);
      team.goalkeepingDeck = rebuildPile(saved.goalkeepingDeck);
      team.availableGoalkeeping = rebuildPile(saved.availableGoalkeeping);
      team.discardedGoalkeeping = rebuildPile(saved.discardedGoalkeeping);
      team.exhaustedGoalkeeping = rebuildPile(saved.exhaustedGoalkeeping);
    }

    setupGame();

    const g = snapshot.game;
    game.turn = g.turn;
    game.maxTurns = g.maxTurns;
    game.cardsPerTurn = g.cardsPerTurn;
    game.pointsPerTurn = g.pointsPerTurn;
    game.finished = g.finished;
    game.halftimePending = g.halftimePending;
    game.lastMoveWasSkip = g.lastMoveWasSkip;
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
    game.suspensionShadowActive = g.suspensionShadowActive || null;
    game.firstPlayedThisTurn = g.firstPlayedThisTurn || {};
    game.comboExtraPlays = g.comboExtraPlays || {};
    game.freeActions = [];

    if (g.currentTeamName && TEAMS[g.currentTeamName]) {
      game.currentTeam = TEAMS[g.currentTeamName];
    }

    const cardById = {};
    for (const teamName of Object.keys(TEAMS)) {
      game.inPlay[teamName] = (snapshot.inPlay[teamName] || []).map((sc) => {
        const card = resolveCard(sc.name);
        if (card && sc._id) card._id = sc._id;
        if (card) cardById[sc._id] = card;
        return card;
      }).filter(Boolean);
    }
    game.freeActions = (snapshot.freeActions || [])
      .map((id) => cardById[id])
      .filter(Boolean);

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
