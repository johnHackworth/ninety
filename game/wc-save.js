// game/wc-save.js — Named World Cup save/load.
// Persists the full World Cup tournament state (bracket, teams, players,
// coaches, cards, buffs, penalties, suspensions, formations, controllers)
// as named slots in localStorage, with JSON export/import for portability.
//
// Saves are taken between matches (from the World Cup screen). A live match
// in progress is the job of the separate per-match auto-save (save-load.js).

const WC_SAVE_KEY = 'slay-the-umpire-wc-saves';
const WC_AUTOSAVE_NAME = 'autosave';

const WcSave = {
  // ---- serialization helpers (Infinity/NaN safe + card/coach instances -> names) ----

  _encode(val) {
    if (val === Infinity) return { __inf: true };
    if (val === -Infinity) return { __negInf: true };
    if (typeof val === 'number' && isNaN(val)) return { __nan: true };
    return val;
  },

  _decode(val) {
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      if (val.__inf) return Infinity;
      if (val.__negInf) return -Infinity;
      if (val.__nan) return NaN;
    }
    return val;
  },

  _revive(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map((v) => this._revive(v));
    const out = {};
    for (const k of Object.keys(obj)) {
      out[k] = this._revive(this._decode(obj[k]));
    }
    return out;
  },

  _jsonEncode(root) {
    return JSON.stringify(root, (key, val) => this._encode(val));
  },

  _jsonDecode(json) {
    return this._revive(JSON.parse(json, (key, val) => this._decode(val)));
  },

  _clone(obj) {
    return this._jsonDecode(this._jsonEncode(obj));
  },

  _cardName(card) {
    return card && typeof card === 'object' ? card.name : card;
  },

  _coachByName(name) {
    if (!COACHES) return null;
    return COACHES.find((c) => c && c.name === name) || null;
  },

  _cardsMapToNames(map) {
    const out = {};
    for (const team of Object.keys(map)) {
      out[team] = (map[team] || []).map((c) => this._cardName(c));
    }
    return out;
  },

  _coachesMapToNames(map) {
    const out = {};
    for (const team of Object.keys(map)) {
      const c = map[team];
      if (c == null) continue;
      out[team] = Array.isArray(c) ? c.map((x) => x.name) : c.name;
    }
    return out;
  },

  _captureState() {
    if (!worldCup) return null;

    const pendingPenalties = {};
    for (const team of Object.keys(wcPendingPenalties || {})) {
      pendingPenalties[team] = (wcPendingPenalties[team] || []).map((c) => this._cardName(c));
    }

    return {
      v: 1,
      savedAt: Date.now(),
      worldCup: this._clone(worldCup),
      controllers: this._clone(wcControllers || {}),
      statsView: wcStatsView,
      myTeamSelected: wcMyTeamSelected || null,
      selectedFormation: wcSelectedFormation || null,
      trainingPhases: this._clone(wcTrainingPhases || { attack: false, defense: false }),
      totalEvents: wcTotalEvents || 0,
      eventsScheduled: wcEventsScheduled || 0,
      groupToKnockoutPending: wcGroupToKnockoutPending || false,
      cleanSheetStreak: this._clone(wcCleanSheetStreak || {}),
      playerDebuffs: this._clone(wcPlayerDebuffs || {}),
      suspendedPlayers: this._clone(wcSuspendedPlayers || {}),
      pendingPenalties,
      teamDebuffs: this._clone(wcTeamDebuffs || {}),
      teamDrawPenalties: this._clone(wcTeamDrawPenalties || {}),
      teamDrawBonuses: this._clone(wcTeamDrawBonuses || {}),
      recurringPenalties: this._clone(wcRecurringPenalties || {}),
      teamBuffs: this._clone(wcTeamBuffs || {}),
      playerBuffs: this._clone(wcPlayerBuffs || {}),
      randomBoostApplied: this._clone(wcRandomBoostApplied || {}),
      shootExhaust: this._clone(wcShootExhaust || {}),
      permanentHolds: this._clone(wcPermanentHolds || {}),
      pendingLineup: this._clone(wcPendingLineup || {}),
      pendingFormationCoords: this._clone(wcPendingFormationCoords || {}),
      trainingCards: this._cardsMapToNames(wcTrainingCards || {}),
      ownedCoaches: this._coachesMapToNames(wcOwnedCoaches || {}),
      pendingCoaches: this._coachesMapToNames(wcPendingCoaches || {}),
      trainingQueue: this._clone(wcTrainingQueue || []),
      coachPicksQueue: this._clone(wcCoachPicksQueue || []),
      eventQueue: this._clone(wcEventQueue || []),
    };
  },

  _nextMatchLabel(state) {
    try {
      const worldCupState = state.worldCup;
      if (!worldCupState) return 'Tournament';
      const next = wcNextMatch(worldCupState);
      if (!next) return worldCupState.completed ? 'Complete' : 'Tournament';
      return `${next.match && next.match.home} vs ${next.match && next.match.away}`;
    } catch (e) {
      return 'Tournament';
    }
  },

  _resolveCards(names) {
    if (!Array.isArray(names)) return [];
    return names.map((n) => resolveCard(n)).filter(Boolean);
  },

  _restoreState(state) {
    if (!state || !state.worldCup) return false;

    worldCup = this._clone(state.worldCup);

    wcControllers = this._clone(state.controllers || wcControllers || {});
    wcStatsView = state.statsView || 'fixtures';
    wcMyTeamSelected = state.myTeamSelected || null;
    wcSelectedFormation = state.selectedFormation || null;
    wcTrainingPhases = this._clone(state.trainingPhases || { attack: false, defense: false });
    wcTotalEvents = state.totalEvents || 0;
    wcEventsScheduled = state.eventsScheduled || 0;
    wcGroupToKnockoutPending = !!state.groupToKnockoutPending;
    wcCleanSheetStreak = this._clone(state.cleanSheetStreak || {});
    wcPlayerDebuffs = this._clone(state.playerDebuffs || {});
    wcSuspendedPlayers = this._clone(state.suspendedPlayers || {});
    wcTeamDebuffs = this._clone(state.teamDebuffs || {});
    wcTeamDrawPenalties = this._clone(state.teamDrawPenalties || {});
    wcTeamDrawBonuses = this._clone(state.teamDrawBonuses || {});
    wcRecurringPenalties = this._clone(state.recurringPenalties || {});
    wcTeamBuffs = this._clone(state.teamBuffs || {});
    wcPlayerBuffs = this._clone(state.playerBuffs || {});
    wcRandomBoostApplied = this._clone(state.randomBoostApplied || {});
    wcShootExhaust = this._clone(state.shootExhaust || {});
    wcPermanentHolds = this._clone(state.permanentHolds || {});
    wcPendingLineup = this._clone(state.pendingLineup || {});
    wcPendingFormationCoords = this._clone(state.pendingFormationCoords || {});

    wcTrainingCards = {};
    for (const team of Object.keys(state.trainingCards || {})) {
      wcTrainingCards[team] = this._resolveCards(state.trainingCards[team]);
    }

    wcPendingPenalties = {};
    for (const team of Object.keys(state.pendingPenalties || {})) {
      wcPendingPenalties[team] = this._resolveCards(state.pendingPenalties[team]);
    }

    wcOwnedCoaches = {};
    for (const team of Object.keys(state.ownedCoaches || {})) {
      const names = state.ownedCoaches[team];
      wcOwnedCoaches[team] = (Array.isArray(names) ? names : [names])
        .map((n) => this._coachByName(n))
        .filter(Boolean);
    }

    wcPendingCoaches = {};
    for (const team of Object.keys(state.pendingCoaches || {})) {
      const coach = this._coachByName(state.pendingCoaches[team]);
      if (coach) wcPendingCoaches[team] = coach;
    }

    wcTrainingQueue = this._clone(state.trainingQueue || []);
    wcCoachPicksQueue = this._clone(state.coachPicksQueue || []);
    wcEventQueue = this._clone(state.eventQueue || []);

    wcMatchMode = false;
    wcMatchInProgress = null;
    wcHumanPlaying = false;
    wcSimRunning = false;
    wcEventActive = false;
    wcTrainingActive = false;
    wcEndingShown = false;
    wcExtraHalves = 0;
    wcShootout = null;
    wcPendingTrainingPhases = null;
    wcPendingTrainingMatch = null;
    wcTrainingPhaseQueue = [];
    wcTrainingPhaseTeam = null;

    return true;
  },

  // ---- name -> {state json} persisted in localStorage ----

  _readStore() {
    try {
      return this._jsonDecode(localStorage.getItem(WC_SAVE_KEY)) || {};
    } catch (e) {
      return {};
    }
  },

  _writeStore(store) {
    localStorage.setItem(WC_SAVE_KEY, this._jsonEncode(store));
  },

  list() {
    const store = this._readStore();
    return Object.keys(store)
      .map((name) => ({
        name,
        savedAt: store[name].savedAt,
        label: store[name].label || 'Tournament',
      }))
      .sort((a, b) => b.savedAt - a.savedAt);
  },

  save(name) {
    if (!worldCup) return { ok: false, reason: 'No World Cup in progress.' };
    const state = this._captureState();
    if (!state) return { ok: false, reason: 'No World Cup in progress.' };
    const label = this._nextMatchLabel(state);
    const store = this._readStore();
    store[name] = Object.assign({}, state, { label });
    this._writeStore(store);
    return { ok: true, name, label };
  },

  remove(name) {
    const store = this._readStore();
    if (name in store) {
      delete store[name];
      this._writeStore(store);
      return true;
    }
    return false;
  },

  resumeAvailable() {
    const store = this._readStore();
    const s = store[WC_AUTOSAVE_NAME];
    if (!s) return false;
    return this._nextMatchLabel(s) !== 'Complete';
  },

  resume() {
    return this.load(WC_AUTOSAVE_NAME);
  },

  load(name) {
    const store = this._readStore();
    const state = store[name];
    if (!state) return { ok: false, reason: `Save "${name}" not found.` };
    try {
      const restored = this._restoreState(this._clone(state));
      if (!restored) return { ok: false, reason: 'Could not restore this save.' };
      return { ok: true, name };
    } catch (err) {
      console.error('[wc-save] restore failed:', err);
      return { ok: false, reason: err && err.message ? err.message : 'Restore failed.' };
    }
  },

  exportJSON(name) {
    const store = this._readStore();
    const state = store[name];
    if (!state) return null;
    return this._jsonEncode({ type: 'wc-save', name, state });
  },

  importJSON(json) {
    let data;
    try {
      data = this._jsonDecode(json);
    } catch (e) {
      return { ok: false, reason: 'Invalid JSON file.' };
    }
    const state = data && data.type === 'wc-save' ? data.state : data;
    if (!state || !state.worldCup) return { ok: false, reason: 'Not a valid World Cup save file.' };
    const name = (data && data.name) || `Imported ${new Date().toLocaleDateString()}`;
    const label = this._nextMatchLabel(state);
    const store = this._readStore();
    store[name] = Object.assign({}, state, { label, savedAt: Date.now() });
    this._writeStore(store);
    return { ok: true, name, label };
  },
};
