// World Cup UI layer — extracted from app.js

// ---- World Cup state ----
let worldCup = null;
let wcSimRunning = false;
let wcControllers = null;
let wcMatchMode = false;
let wcMatchInProgress = null;
let wcHumanPlaying = false;
let wcExtraHalves = 0;
let wcEndingShown = false;
let wcShootout = null;
let wcStatsView = 'fixtures';
let wcScheduleMatchday = 1;
let wcTrainingQueue = [];
let wcTrainingActive = false;
let wcTrainingTargetTeam = null;
let wcTrainingCards = {};
let wcTrainingPhases = { attack: false, defense: false };
let wcPendingTrainingPhases = null;
let wcPendingTrainingMatch = null;
let wcShootExhaust = {};
let wcEventQueue = [];
let wcEventActive = false;
let wcEventTargetTeam = null;
let wcTotalEvents = 0;
let wcEventsScheduled = 0;
let wcCoachPicksQueue = [];
let wcCoachPicksActive = false;
let wcGroupToKnockoutPending = false;
const worldCupScreen = document.getElementById('world-cup-screen');
const worldCupPhaseEl = document.getElementById('world-cup-phase');
const worldCupContentEl = document.getElementById('world-cup-content');
const wcNextMatchEl = document.getElementById('wc-next-match');
const worldCupPlayNextBtn = document.getElementById('wc-continue');

// ---- World Cup card pool constants ----
const WC_CARD_CATEGORIES = {
  defense: ['defense'],
  offense: ['offense'],
  tactical: ['tactical'],
  general: ['defense', 'offense', 'tactical', 'effect'],
};

const SYNERGY_PACKS = [
  { cards: [TackleAction, MarkingAction], label: 'Defensive Lock' },
  { cards: [PressAction, TackleAction], label: 'High Press' },
  { cards: [MoveAction, CrossAction], label: 'Build-Up Play' },
  { cards: [LongBallAction, FinishAction], label: 'Direct Attack' },
  { cards: [SprintAction, OverlapAction], label: 'Wide Overload' },
  { cards: [ThroughBallAction, ShootAction], label: 'Killer Pass' },
  { cards: [DribblingAction, FeintTurnAction], label: 'Skill Combo' },
  { cards: [OneTwoAction, CrossAction], label: 'Combination Play' },
  { cards: [DefensiveWallAction, MarkingAction], label: 'Set Piece Defense' },
  { cards: [CounterAttackAction, LongPassAction], label: 'Rapid Counter' },
  { cards: [OffBallPlayAction, SprintAction], label: 'Off-the-Ball Run' },
  { cards: [PressAction, MarkingAction], label: 'Smothering Press' },
  { cards: [SideAttackAction, OverlapAction], label: 'Flank Assault' },
  { cards: [HardTackleAction, DirtyTricksAction], label: 'Aggressive Defense' },
];

// ---- World Cup coach / buff state ----
let wcPendingCoaches = {};
let wcOwnedCoaches = {};

let wcCleanSheetStreak = {};

let wcPlayerDebuffs = {};
let wcSuspendedPlayers = {};
let wcPendingPenalties = {};
let wcTeamDebuffs = {};
let wcTeamDrawPenalties = {};
let wcTeamDrawBonuses = {};
let wcRecurringPenalties = {};
let wcTeamBuffs = {};
let wcPlayerBuffs = {};
let wcRandomBoostApplied = {};
let wcPendingDeckReshuffle = null;
let wcMyTeamSelected = null;
let wcSelectedFormation = null;
let wcPendingLineup = {};
let wcPendingFormationCoords = {};

let wcPermanentHolds = {};

// Fixed per-team knockout powerup granted automatically (AI teams only) once a
// team reaches the knockout stage. Each national team has a signature team effect
// tied to its playing identity. Keyed by display team name -> TEAM_EFFECTS key.
const WC_KNOCKOUT_POWERUPS = {
  // Possession / creative sides -> passing & dribbling
  Spain: 'teamPassing',
  Argentina: 'teamDribbling',
  Brazil: 'teamDribbling',
  Netherlands: 'teamPassing',
  Portugal: 'teamPassing',
  Japan: 'teamPassing',
  Mexico: 'teamDribbling',
  Morocco: 'teamDribbling',
  Colombia: 'teamTactics',
  Uruguay: 'teamDefense',
  'South Korea': 'teamEnergy',
  // Attacking / shooting sides -> clinical finish & big moments
  France: 'clinicalFinish',
  England: 'clinicalFinish',
  Germany: 'thunderstrike',
  Norway: 'thunderstrike',
  Sweden: 'clinicalFinish',
  Belgium: 'flyingStart',
  Croatia: 'flyingStart',
  Türkiye: 'flyingStart',
  Czechia: 'wideThinking',
  Scotland: 'wideThinking',
  Switzerland: 'teamTactics',
  Austria: 'teamTactics',
  // Gritty / defensive sides -> iron glove, counter press, last defender
  Iran: 'ironGlove',
  Qatar: 'ironGlove',
  Iraq: 'ironGlove',
  Tunisia: 'counterPress',
  Egypt: 'counterPress',
  Algeria: 'counterPress',
  Senegal: 'lastDefender',
  'South Africa': 'lastDefender',
  Ghana: 'lastDefender',
  'Ivory Coast': 'teamSpark',
  'DR Congo': 'teamDefense',
  'Cape Verde': 'teamEnergy',
  'Saudi Arabia': 'deadBallMastery',
  Jordan: 'deadBallMastery',
  Australia: 'teamDefense',
  'New Zealand': 'teamEnergy',
  Canada: 'teamEnergy',
  'United States': 'teamSpark',
  Panama: 'teamDefense',
  Curaçao: 'teamSpark',
  Haiti: 'teamEnergy',
  Ecuador: 'teamSpark',
  Paraguay: 'teamDefense',
  Uzbekistan: 'teamPassing',
  'Bosnia and Herzegovina': 'squadDepth',
};

// Tracks which AI teams have already received their knockout powerup.
let wcKnockoutPowerups = {};

// Grant each AI team's fixed knockout powerup. Called at the start of every
// knockout match so stat boosts persist into the freshly-built Team objects;
// the powerup itself is recorded (and announced) only once per team.
function wcApplyKnockoutPowerups(teamNames) {
  if (typeof WC_KNOCKOUT_POWERUPS === 'undefined' || !wcKnockoutPowerups) return;
  for (const teamName of teamNames) {
    const effect = WC_KNOCKOUT_POWERUPS[teamName];
    if (!effect) continue;
    const team = TEAMS && TEAMS[teamName];
    if (!team) continue;
    if (typeof team.controller !== 'object' || team.controller.type !== 'ai') continue;
    if (!wcKnockoutPowerups[teamName]) {
      wcKnockoutPowerups[teamName] = effect;
      const spec = TEAM_EFFECTS && TEAM_EFFECTS[effect];
      logMatch(teamName, `${teamName} reach the knockout stage and unlock ${spec && spec.label ? spec.label : effect}.`);
    }
    team.addTeamEffect(effect, Infinity);
  }
}

// ---- World Cup top-players state ----
let wcTopCategory = 'goals';
let wcChampionModalShown = false;

const WC_TOP_CATEGORIES = [
  ['goals', 'Goals'],
  ['assists', 'Assists'],
  ['shots', 'Shots'],
  ['passes', 'Successful passes'],
  ['recoveries', 'Ball recoveries'],
  ['fouls', 'Fouls'],
  ['motm', 'Man of the match'],
];

// ---- Formation templates (x: 0=left goal, 8=right goal; y: 0=top, 6=bottom) ----
const FORMATION_TEMPLATES = {
  '4-4-2': {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4], [4, 6]],
    FW: [[6, 1], [6, 5]],
  },
  '4-2-3-1': {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 2], [4, 4]],
    AM: [[5, 0], [5, 3], [5, 6]],
    FW: [[7, 3]],
  },
  '4-3-3': {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 1], [4, 3], [4, 5]],
    FW: [[6, 0], [6, 3], [6, 6]],
  },
  '3-5-2': {
    GK: [[0, 3]],
    DF: [[2, 1], [2, 3], [2, 5]],
    MF: [[4, 0], [4, 1], [4, 3], [4, 5], [4, 6]],
    FW: [[6, 2], [6, 4]],
  },
  '5-3-2': {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 1], [2, 3], [2, 5], [2, 6]],
    MF: [[4, 1], [4, 3], [4, 5]],
    FW: [[6, 2], [6, 4]],
  },
  '4-1-4-1': {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    DM: [[3, 3]],
    MF: [[4, 0], [4, 1], [4, 5], [4, 6]],
    FW: [[6, 3]],
  },
};

// ---- World Cup UI functions ----

function showWorldCupScreen() {
  menuScreen.classList.add('hidden');
  setupScreen.classList.add('hidden');
  simSetupScreen.classList.add('hidden');
  tournamentSetupScreen.classList.add('hidden');
  tournamentScreen.classList.add('hidden');
  worldCupScreen.classList.remove('hidden');
  rulesScreen.classList.add('hidden');
  boardEl.classList.add('hidden');
  gameStatusEl.classList.add('hidden');
  hintEl.classList.add('hidden');
}

function showWorldCupView() {
  worldCup = null;
  showWorldCupScreen();
  openWcSetup();
}

function openWcSetup() {
  const list = document.getElementById('wc-setup-list');
  if (list && list.children.length === 0) buildWcSetupList();
  const overlay = document.getElementById('wc-setup-overlay');
  if (overlay) overlay.classList.remove('hidden');
}

function buildWcSetupList() {
  const list = document.getElementById('wc-setup-list');
  if (!list) return;
  list.innerHTML = '';
  for (const name of TEAM_NAMES) {
    const row = document.createElement('div');
    row.className = 'wc-setup-row';

    const teamWrap = document.createElement('span');
    teamWrap.className = 'wc-setup-team-wrap';
    const teamName = document.createElement('span');
    teamName.className = 'wc-setup-team';
    const cls = TEAM_CLASSES[name];
    try {
      teamName.style.color = new (cls)().primaryColor;
    } catch (e) {}
    const flag = document.createElement('span');
    flag.className = 'wc-setup-flag';
    flag.textContent = TEAM_FLAGS[name] || '';
    teamWrap.appendChild(flag);
    teamName.textContent = name;
    teamWrap.appendChild(teamName);
    row.appendChild(teamWrap);

    const select = document.createElement('select');
    select.className = 'wc-setup-ctrl';
    select.dataset.team = name;
    const aiOpt = document.createElement('option');
    aiOpt.value = 'ai';
    aiOpt.textContent = 'AI';
    const humanOpt = document.createElement('option');
    humanOpt.value = 'human';
    humanOpt.textContent = 'Human';
    select.appendChild(aiOpt);
    select.appendChild(humanOpt);
    row.appendChild(select);
    list.appendChild(row);
  }
  const allAi = document.getElementById('wc-setup-all-ai');
  if (allAi) {
    allAi.addEventListener('click', () => {
      for (const sel of document.querySelectorAll('.wc-setup-ctrl')) sel.value = 'ai';
    });
  }
}

function startWcFromSetup() {
  wcControllers = {};
  for (const sel of document.querySelectorAll('.wc-setup-ctrl')) {
    const teamName = sel.dataset.team;
    if (sel.value === 'human') {
      wcControllers[teamName] = { type: 'human' };
    } else {
      wcControllers[teamName] = { type: 'ai', player: 'basic-coach' };
    }
  }
  const overlay = document.getElementById('wc-setup-overlay');
  if (overlay) overlay.classList.add('hidden');
  const randomize = document.getElementById('wc-setup-randomize');
  worldCup = createWorldCup(randomize && randomize.checked);
  if (game) {
    game.finished = true;
    game = null;
  }
  wcTrainingQueue = [];
  wcTrainingCards = {};
  wcTrainingPhases = { attack: false, defense: false };
  wcEventQueue = [];
  wcEventActive = false;
  wcEventTargetTeam = null;
  wcTotalEvents = Math.floor(Math.random() * 3) + 3;
  wcEventsScheduled = 0;
  wcCoachPicksQueue = [];
  wcChampionModalShown = false;
  wcCleanSheetStreak = {};
  wcPlayerDebuffs = {};
  wcSuspendedPlayers = {};
  wcPendingPenalties = {};
  wcTeamDebuffs = {};
  wcTeamDrawPenalties = {};
  wcTeamDrawBonuses = {};
  wcRecurringPenalties = {};
  wcTeamBuffs = {};
  wcPlayerBuffs = {};
  wcRandomBoostApplied = {};
  wcKnockoutPowerups = {};
  wcPendingDeckReshuffle = null;
  wcGroupToKnockoutPending = false;
  for (const [teamName, ctrl] of Object.entries(wcControllers)) {
    if (ctrl.type === 'human') {
      wcCoachPicksQueue.push({ teamName });
      wcQueueTraining(teamName, 3);
    }
  }
  renderWorldCupView();
}

function wcRunMatch(homeName, awayName) {
  let attempt = 0;
  const maxAttempts = 2;
  while (attempt < maxAttempts) {
    attempt++;
    try {
      const start = performance.now();
      simulateMatch(homeName, awayName);
      const elapsed = performance.now() - start;
      if (elapsed > 2000) {
        console.warn(`[world-cup] match ${homeName} vs ${awayName} took ${elapsed.toFixed(0)}ms, retrying...`);
        continue;
      }
      const score = (game && game.score) || {};
      return { home: score[homeName] || 0, away: score[awayName] || 0 };
    } catch (err) {
      console.error(`[world-cup] simulation error (attempt ${attempt}):`, err);
      if (attempt < maxAttempts) {
        console.warn('[world-cup] retrying after crash...');
        continue;
      }
    }
  }
  console.warn('[world-cup] both attempts failed, resolving as 0-0');
  return { home: 0, away: 0 };
}

function wcSnapshotMatchStats() {
  if (!game) return null;
  const stats = {};
  for (const team of Object.values(TEAMS)) {
    const s = game.stats[team.name];
    stats[team.name] = {
      possession: s.possession,
      shots: s.shots,
      fouls: s.fouls,
      recoveries: s.recoveries,
      passes: s.passes,
      assists: s.assists,
      goals: s.goals,
    };
  }
  const playerStats = {};
  for (const name of Object.keys(game.playerStats)) {
    playerStats[name] = { ...game.playerStats[name] };
  }
  return { stats, playerStats };
}

function wcPlayMatch(m) {
  const result = wcRunMatch(m.home, m.away);
  recordOutPlayers(m.home, m.away);
  m.played = true;
  m.homeScore = result.home;
  m.awayScore = result.away;
  const snap = wcSnapshotMatchStats();
  m.stats = snap ? snap.stats : null;
  m.playerStats = snap ? snap.playerStats : null;
  if (m.label !== undefined) {
    if (m.homeScore === m.awayScore) {
      const pen = wcPenaltyShootout(m.home, m.away);
      m.pen = true;
      m.penHome = pen.home;
      m.penAway = pen.away;
      m.winner = pen.winner;
    } else {
      m.winner = m.homeScore > m.awayScore ? m.home : m.away;
    }
  }
}

function wcHandleMatchEnd() {
  if (wcEndingShown) return;
  wcEndingShown = true;
  const m = wcMatchInProgress;
  if (!m) return;
  const isKo = m.label !== undefined;
  const tied = (game.score[m.home] || 0) === (game.score[m.away] || 0);
  if (isKo && tied && wcExtraHalves < 2) {
    wcStartExtraTime(m);
  } else {
    wcFinishMatch(m);
  }
}

function wcStartExtraTime(m) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'wc-modal shot-modal halftime-modal';

  const content = document.createElement('div');
  content.className = 'shot-modal-content halftime-content';

  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent = wcExtraHalves === 0 ? 'Extra Time' : 'Extra Time · Second Half';
  content.appendChild(title);

  const scoreLine = document.createElement('div');
  scoreLine.className = 'halftime-score';
  scoreLine.textContent = `${wcTeamName(m.home)} ${game.score[m.home] || 0} - ${game.score[m.away] || 0} ${wcTeamName(m.away)}`;
  content.appendChild(scoreLine);

  const note = document.createElement('div');
  note.className = 'halftime-kickoff';
  note.textContent =
    wcExtraHalves === 0
      ? 'A knockout draw means extra time: two halves of two turns each. Still level after that? Penalties.'
      : 'Still level after the first extra-time half. One more half of two turns to settle it.';
  content.appendChild(note);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'shot-modal-close';
  closeBtn.textContent = 'Kick off';
  closeBtn.addEventListener('click', async () => {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
    wcExtraHalves += 1;
    game.maxTurns += 2;
    game.finished = false;
    wcEndingShown = false;
    await humanNotice('EXTRA TIME');
    const kickoffTeam = board.getOpponent(Object.values(TEAMS)[0]);
    resetForRestart(kickoffTeam);
    if (!game.finished) game.currentTeam = kickoffTeam;
    logMatch(kickoffTeam.name, `${kickoffTeam.name} kick off extra time.`);
    renderGame();
  });

  modal.appendChild(content);
  modal.appendChild(closeBtn);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  function onKey(e) {
    if (e.key === 'Escape' || e.key === 'Enter') closeBtn.click();
  }
  document.addEventListener('keydown', onKey);
}

function wcFinishMatch(m) {
  m.played = true;
  m.homeScore = game.score[m.home] || 0;
  m.awayScore = game.score[m.away] || 0;
  const snap = wcSnapshotMatchStats();
  m.stats = snap ? snap.stats : null;
  m.playerStats = snap ? snap.playerStats : null;
  if (m.label !== undefined) {
    if (m.homeScore === m.awayScore) {
      const homeHuman = wcControllerForTeam(m.home).type === 'human';
      const awayHuman = wcControllerForTeam(m.away).type === 'human';
      if (homeHuman || awayHuman) {
        wcExtraHalves = 0;
        wcStartShootout(m);
        return;
      }
      const pen = wcPenaltyShootout(m.home, m.away);
      m.pen = true;
      m.penHome = pen.home;
      m.penAway = pen.away;
      m.winner = pen.winner;
    } else {
      m.winner = m.homeScore > m.awayScore ? m.home : m.away;
    }
  }
  wcCompleteMatch(m);
}

function wcCompleteMatch(m) {
  if (aiTurnTimeout) {
    clearTimeout(aiTurnTimeout);
    aiTurnTimeout = null;
  }
  if (game) {
    game.finished = true;
  }
  wcMatchMode = false;
  wcMatchInProgress = null;
  wcHumanPlaying = false;
  wcExtraHalves = 0;
  wcEndingShown = false;
  recordOutPlayers(m.home, m.away);
  const wasGroups = worldCup.phase === 'groups';
  wcAdvance(worldCup);
  if (wasGroups && worldCup.phase === 'knockout') wcGroupToKnockoutPending = true;

  let eventQueuedThisMatch = false;
  for (const teamName of [m.home, m.away]) {
    if (wcControllerForTeam(teamName).type === 'human' && !wcHumanTeamEliminated(teamName)) {
      wcQueueTraining(teamName);
      if (!eventQueuedThisMatch && wcEventsScheduled < wcTotalEvents) {
        wcQueueEvent(teamName);
        wcEventsScheduled++;
        eventQueuedThisMatch = true;
      }
    }
  }

  const award = wcMaybeAwardCoach(m);
  const groupAward = wasGroups ? wcAwardGroupStageCoaches() : null;
  const isHuman = isHumanGame();

  const showChampionIfDone = () => {
    if (worldCup && worldCup.completed && !wcChampionModalShown) {
      wcChampionModalShown = true;
      wcShowChampionModal();
    }
  };

  if (isHuman) {
    showGameOverModal(() => {
      game = null;
      showWorldCupScreen();
      renderWorldCupView();

      const koCb = wcGroupToKnockoutPending ? wcShowKnockoutPreview : undefined;
      const finish = () => {
        if (koCb) koCb();
        showChampionIfDone();
      };
      if (award && groupAward) {
        wcShowCoachJoinedModal(award.teamName, award.coach, () => {
          wcShowCoachJoinedModal(groupAward.teamName, groupAward.coach, finish);
        });
      } else if (award) {
        wcShowCoachJoinedModal(award.teamName, award.coach, finish);
      } else if (groupAward) {
        wcShowCoachJoinedModal(groupAward.teamName, groupAward.coach, finish);
      } else {
        finish();
      }
    });
  } else {
    game = null;
    showWorldCupScreen();
    renderWorldCupView();
    const koCb = wcGroupToKnockoutPending ? wcShowKnockoutPreview : undefined;
    const finish = () => {
      if (koCb) koCb();
      showChampionIfDone();
    };
    if (award) {
      wcShowResultToast(m, () => wcShowCoachJoinedModal(award.teamName, award.coach, finish));
    } else {
      wcShowResultToast(m, finish);
    }
  }
}

function wcControllerForTeam(name) {
  return (wcControllers && wcControllers[name]) || { type: 'ai', player: 'basic-coach' };
}

function wcSetContinueLabel(text, teamName) {
  worldCupPlayNextBtn.textContent = '';
  const flag = (teamName && TEAM_FLAGS && TEAM_FLAGS[teamName]) ? TEAM_FLAGS[teamName] : '';
  if (flag) {
    const flagSpan = document.createElement('span');
    flagSpan.className = 'wc-continue-flag';
    flagSpan.textContent = flag;
    flagSpan.title = teamName;
    worldCupPlayNextBtn.appendChild(flagSpan);
  }
  const label = document.createTextNode(` Continue: ${text}`);
  worldCupPlayNextBtn.appendChild(label);
}

// Return the human team among a/b, if any.
function wcHumanTeamOf(a, b) {
  if (wcControllerForTeam(a).type === 'human') return a;
  if (wcControllerForTeam(b).type === 'human') return b;
  return null;
}

function wcAnyHumanController() {
  if (!wcControllers) return false;
  return Object.values(wcControllers).some((c) => c.type === 'human');
}

function wcHumanTeamAliveInKnockout(teamName) {
  for (const round of worldCup.rounds) {
    for (const m of round.matches) {
      if (m.home !== teamName && m.away !== teamName) continue;
      if (!m.played) return true;
      if (matchWinner(m) === teamName) return true;
    }
  }
  return false;
}

function wcHumanTeamEliminated(teamName) {
  if (!worldCup) return false;
  if (worldCup.phase === 'groups') {
    const group = worldCup.groups.find((g) => g.teams.includes(teamName));
    if (!group) return true;
    const groupDone = group.matches.every((m) => m.played);
    if (!groupDone) return false;
    const st = computeGroupStandings(group);
    if (st[2].team !== teamName && st[1].team !== teamName && st[0].team !== teamName) {
      return true;
    }
    if (st[2].team === teamName) {
      const groupsDone = worldCup.groups.every((g) => g.matches.every((m) => m.played));
      if (!groupsDone) return false;
      const qualifiedThirds = new Set(getThirdPlaceRanking(worldCup).slice(0, 8).map((t) => t.team));
      return !qualifiedThirds.has(teamName);
    }
    return false;
  }
  return !wcHumanTeamAliveInKnockout(teamName);
}

function wcRollTrainingPhases(match) {
  if (!worldCup || !wcTrainingPhases) return null;
  const humanName = [match.home, match.away].find(
    (name) => wcControllerForTeam(name).type === 'human'
  );
  if (!humanName) return null;
  if (wcHumanTeamEliminated(humanName)) return null;
  let variant = null;
  if (worldCup.phase === 'groups') {
    const r = Math.random();
    if (r < 0.2) variant = 'attack';
    else if (r < 0.4) variant = 'defense';
  } else {
    if (!wcTrainingPhases.attack || !wcTrainingPhases.defense) {
      variant = !wcTrainingPhases.attack ? 'attack' : 'defense';
    } else if (Math.random() < 0.1) {
      variant = Math.random() < 0.5 ? 'attack' : 'defense';
    }
  }
  return variant ? { teamName: humanName, variants: [variant] } : null;
}

async function wcContinue() {
  try {
    await wcContinueStep();
  } catch (err) {
    console.error('[wcContinue] failed:', err);
    wcSimRunning = false;
    renderWorldCupView();
    showToast(
      'Continue failed: ' +
        (err && err.message ? err.message : String(err)) +
        ' (see browser console for details)'
    );
  }
}

async function wcContinueStep() {
  if (!worldCup || wcSimRunning) return;
  if (wcGroupToKnockoutPending) {
    wcShowKnockoutPreview();
    return;
  }
  if (wcCoachPicksQueue.length > 0) {
    await wcProcessCoachPicksQueue(() => {
      renderWorldCupView();
    });
    return;
  }
  if (wcTrainingQueue.length > 0) {
    await wcProcessTrainingQueue(() => {
      renderWorldCupView();
    });
    return;
  }
  if (wcEventQueue.length > 0) {
    await wcProcessEventQueue(() => {
      renderWorldCupView();
    });
    return;
  }
  const start = wcNextMatch(worldCup);
  if (!start) return;
  const startHomeCtrl = wcControllerForTeam(start.match.home);
  const startAwayCtrl = wcControllerForTeam(start.match.away);
  const startIsHuman =
    startHomeCtrl.type === 'human' || startAwayCtrl.type === 'human';

  if (!startIsHuman) {
    wcSimRunning = true;
    try {
      for (let i = 0; i < 200; i++) {
        const nxt = wcNextMatch(worldCup);
        if (!nxt) break;
        if (
          wcGroupToKnockoutPending ||
          wcCoachPicksQueue.length > 0 ||
          wcTrainingQueue.length > 0 ||
          wcEventQueue.length > 0
        ) {
          break;
        }
        const homeCtrl = wcControllerForTeam(nxt.match.home);
        const awayCtrl = wcControllerForTeam(nxt.match.away);
        if (homeCtrl.type === 'human' || awayCtrl.type === 'human') break;
        worldCupPlayNextBtn.disabled = true;
        wcSetContinueLabel('Simulating…');
        wcPlayMatch(nxt.match);
        wcAdvance(worldCup);
        renderWorldCupView();
        await new Promise((r) => setTimeout(r, 0));
      }
    } finally {
      wcSimRunning = false;
      renderWorldCupView();
      if (worldCup && worldCup.completed && !wcChampionModalShown) {
        wcChampionModalShown = true;
        wcShowChampionModal();
      }
    }
    return;
  }

  let phaseTrigger = wcPendingTrainingPhases;
  wcPendingTrainingPhases = null;
  if (
    (!phaseTrigger || !phaseTrigger.variants || phaseTrigger.variants.length === 0) &&
    wcPendingTrainingMatch !== start.match
  ) {
    phaseTrigger = wcRollTrainingPhases(start.match);
  }
  if (
    phaseTrigger &&
    phaseTrigger.teamName &&
    wcHumanTeamEliminated(phaseTrigger.teamName)
  ) {
    phaseTrigger = null;
  }
  if (phaseTrigger && phaseTrigger.variants && phaseTrigger.variants.length > 0) {
    wcQueueTrainingPhases(phaseTrigger.variants, phaseTrigger.teamName);
    renderWorldCupView();
    return;
  }
  wcPendingTrainingMatch = null;
  wcHumanPlaying = true;
  wcMatchMode = true;
  wcMatchInProgress = start.match;
  wcExtraHalves = 0;
  wcEndingShown = false;
  wcShootout = null;
  startMatch(start.match.home, start.match.away, startHomeCtrl, startAwayCtrl);
  showBoard();
}

function wcShootoutOrder(team) {
  return [...team.currentPlayers].sort((a, b) => b.shooting - a.shooting);
}

function wcScatterAllLeft() {
  const cells = [];
  for (let y = 0; y < HEIGHT; y++) for (let x = 0; x < 4; x++) cells.push([x, y]);
  shuffleArray(cells);
  const st = wcShootout;
  if (!st) return;
  const players = [
    ...(TEAMS[st.home] ? TEAMS[st.home].currentPlayers : []),
    ...(TEAMS[st.away] ? TEAMS[st.away].currentPlayers : []),
  ];
  let ci = 0;
  for (const p of players) {
    let done = false;
    for (let tries = 0; tries < cells.length && !done; tries++) {
      const [x, y] = cells[ci % cells.length];
      ci += 1;
      if (board.getPlayersAt(x, y).length === 0) {
        placePlayerOn(p, x, y);
        done = true;
      }
    }
    if (!done) {
      for (let y = 0; y < HEIGHT && !done; y++) for (let x = 0; x < 4; x++) {
        if (board.getPlayersAt(x, y).length === 0) { placePlayerOn(p, x, y); done = true; break; }
      }
    }
  }
}

function wcStartShootout(m) {
  const homeTeam = TEAMS[m.home];
  const awayTeam = TEAMS[m.away];
  wcShootout = {
    m,
    home: m.home,
    away: m.away,
    homeScore: 0,
    awayScore: 0,
    round: 1,
    kicking: 'home',
    homeOrder: wcShootoutOrder(homeTeam),
    awayOrder: wcShootoutOrder(awayTeam),
    homeSide: homeTeam.side,
    awaySide: awayTeam.side,
    done: false,
  };
  for (const name of [wcShootout.home, wcShootout.away]) {
    game.inPlay[name].length = 0;
    game.actionPoints[name] = 0;
  }
  wcScatterAllLeft();
  moveBall(Math.floor(WIDTH / 2), Math.floor(HEIGHT / 2));
  matchState.possession = null;
  updatePossession();
  renderGame();
  wcShootoutKick();
}

function wcShootoutKick() {
  const st = wcShootout;
  if (!st || st.done) return;
  const teamName = st.kicking;
  const team = TEAMS[teamName];
  const oppName = teamName === 'home' ? st.away : st.home;
  const opp = TEAMS[oppName];
  const order = teamName === 'home' ? st.homeOrder : st.awayOrder;
  const idx = (st.round - 1) % Math.max(1, order.length);
  const shooter = order[idx];
  if (!shooter) { wcShootoutEnd(st); return; }

  wcScatterAllLeft();
  placePlayerOn(shooter, 7, 3);
  const oppGk = opp.currentGoalkeeper || opp.currentPlayers.find(p => p.position === 'GK');
  if (oppGk) placePlayerOn(oppGk, 8, 3);

  matchState.possession = tokenElForPlayer(shooter);
  moveBall(7, 3);

  game.currentTeam = team;
  game.actionPoints[teamName] = 0;
  game.inPlay[teamName].length = 0;
  const shoot = new ShootAction({ ephemeral: true, exhaust: true, free: true });
  game.inPlay[teamName].push(shoot);

  if (team.side !== 'left') team.side = 'left';

  renderGame();

  logMatch(teamName, `Penalty shootout — ${shooter.name} steps up to take the kick for ${teamName}.`);

  const human = wcControllerForTeam(teamName).type === 'human';
  if (human && !st.done) {
    wcShootoutPromptHuman(st, shooter, shoot);
  } else if (!st.done) {
    setTimeout(() => wcShootoutShoot(team, shoot, { ai: true }), 800);
  }
}

function wcShootoutPromptHuman(st, shooter, shootAction) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'wc-modal shot-modal halftime-modal';

  const content = document.createElement('div');
  content.className = 'shot-modal-content halftime-content';

  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent = 'Penalty Shootout';
  content.appendChild(title);

  const scoreLine = document.createElement('div');
  scoreLine.className = 'halftime-score';
  scoreLine.textContent = `${wcTeamName(st.home)} ${st.homeScore} - ${st.awayScore} ${wcTeamName(st.away)}`;
  content.appendChild(scoreLine);

  const roundNote = document.createElement('div');
  roundNote.className = 'halftime-kickoff';
  roundNote.textContent =
    st.round > 5 ? `Sudden death · round ${st.round - 5}` : `Round ${st.round} of 5`;
  content.appendChild(roundNote);

  const kickerNote = document.createElement('div');
  kickerNote.className = 'halftime-kickoff';
  kickerNote.textContent = `${shooter.name} takes the penalty for ${st.kicking === 'home' ? st.home : st.away}.`;
  content.appendChild(kickerNote);

  const prompt = document.createElement('div');
  prompt.className = 'shootout-prompt';
  prompt.textContent = 'Play your Shoot card to take the penalty.';
  content.appendChild(prompt);

  const btn = document.createElement('button');
  btn.className = 'menu-btn shootout-btn';
  btn.textContent = 'Shoot';
  btn.addEventListener('click', () => {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
    wcShootoutShoot(TEAMS[st.kicking], shootAction, { ai: false });
  });
  content.appendChild(btn);

  modal.appendChild(content);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  function onKey(e) {
    if (e.key === 'Escape' || e.key === 'Enter') {
      overlay.remove();
      document.removeEventListener('keydown', onKey);
      wcShootoutShoot(TEAMS[st.kicking], shootAction, { ai: false });
    }
  }
  document.addEventListener('keydown', onKey);
}

function wcShootoutShoot(team, action, { ai = false } = {}) {
  const st = wcShootout;
  if (!st || st.done) return;
  const teamName = team.name;
  const oppName = teamName === 'home' ? st.away : st.home;
  const opp = TEAMS[oppName];
  const order = teamName === 'home' ? st.homeOrder : st.awayOrder;
  const shooter = order[(st.round - 1) % Math.max(1, order.length)];
  const keeperCard = opp.drawGoalkeepingCard();

  if (team.side !== 'left') team.side = 'left';
  const result = resolveShot({
    team, shooter, board, goalkeepingCard: keeperCard, shootingBonus: 2,
  });

  const trueSide = teamName === 'home' ? st.homeSide : st.awaySide;
  if (team.side !== trueSide) team.side = trueSide;

  game.inPlay[teamName] = (game.inPlay[teamName] || []).filter(c => c !== action);
  if (keeperCard) opp.discardGoalkeeping(keeperCard);

  let scored = false;
  if (result.success && result.scored) {
    scored = true;
    st[teamName === 'home' ? 'homeScore' : 'awayScore'] += 1;
  }

  if (ai) {
    logMatch(teamName, scored
      ? `GOAL! ${shooter.name} scores the penalty for ${teamName}.`
      : `${shooter.name}'s penalty is saved by ${result.goalkeeper ? result.goalkeeper.name : 'the keeper'}.`);
    renderGame();
    setTimeout(() => wcShootoutAdvance(st), 700);
  } else {
    showShotResultModal({
      result,
      attackerCard: action,
      goalkeepingCard: keeperCard,
      onClose: () => { renderGame(); wcShootoutAdvance(st); },
    });
  }
}

function wcShootoutAdvance(st) {
  if (st.done) return;
  st.kicking = st.kicking === 'home' ? 'away' : 'home';
  if (st.kicking === 'home') st.round += 1;
  const lead = Math.abs(st.homeScore - st.awayScore);
  if (st.round <= 5) {
    const kicksLeft = st.kicking === 'away'
      ? 1 + (5 - st.round) * 2
      : (5 - st.round) * 2;
    if (lead > kicksLeft) { wcShootoutEnd(st); return; }
  } else {
    if (lead > 0) { wcShootoutEnd(st); return; }
  }
  wcShootoutKick();
}

function wcShootoutEnd(st) {
  const m = st.m;
  m.played = true;
  m.homeScore = game.score[m.home] || 0;
  m.awayScore = game.score[m.away] || 0;
  m.pen = true;
  m.penHome = st.homeScore;
  m.penAway = st.awayScore;
  m.winner = st.homeScore > st.awayScore ? m.home : m.away;
  wcShootout = null;
  wcExtraHalves = 0;
  wcCompleteMatch(m);
}

function wcPhaseTitle() {
  if (worldCup.completed) {
    return `Champion: ${worldCup.champion}`;
  }
  if (worldCup.phase === 'groups') {
    const nxt = wcNextMatch(worldCup);
    if (!nxt) return 'Group stage complete';
    return `Group stage · Matchday ${nxt.matchday}`;
  }
  const nxt = wcNextMatch(worldCup);
  if (!nxt) return 'Knockout stage complete';
  return `Knockout stage · ${nxt.round}`;
}

function renderWcViewButtons() {
  const navItems = document.querySelectorAll('.wc-nav-item[data-view]');
  navItems.forEach(btn => {
    const view = btn.dataset.view;
    btn.classList.toggle('active', wcStatsView === view);
    if (wcStatsView === view) {
      btn.setAttribute('aria-current', 'true');
    } else {
      btn.removeAttribute('aria-current');
    }
  });
}

function renderWorldCupView() {
  if (!worldCup) return;

  const phaseEl = document.getElementById('wc-phase');
  if (phaseEl) phaseEl.textContent = wcPhaseTitle();
  renderWcViewButtons();

  const contentEl = document.getElementById('world-cup-content');
  contentEl.innerHTML = '';

  if (worldCup.completed) {
    const banner = document.createElement('div');
    banner.className = 'wc-champion-banner';
    banner.innerHTML = `<span class="wc-champion-icon">🏆</span><span>${worldCup.champion} are World Cup 2026 champions!</span>`;
    contentEl.appendChild(banner);
  }

  let viewEl = null;
  if (wcStatsView === 'fixtures') {
    viewEl = renderWcFixturesDashboard();
  } else if (wcStatsView === 'schedule') {
    viewEl = renderWcSchedule();
  } else if (wcStatsView === 'standings') {
    viewEl = renderWcStandings();
  } else if (wcStatsView === 'top') {
    viewEl = renderWcTopPlayers();
  } else if (wcStatsView === 'myTeam') {
    viewEl = renderWcMyTeam();
  } else if (wcStatsView === 'knockouts') {
    viewEl = renderWcKnockoutBracket();
  } else if (worldCup.phase === 'groups') {
    viewEl = renderWcFixturesDashboard();
  } else if (worldCup.rounds.length > 0) {
    viewEl = renderWcKnockoutBracket();
  }

  if (viewEl) contentEl.appendChild(viewEl);

  const nextMatchEl = document.getElementById('wc-next-match');
  if (nextMatchEl) {
    nextMatchEl.innerHTML = '';
    const nxt = wcNextMatch(worldCup);
    if (nxt) nextMatchEl.appendChild(renderWcUpNextCard(nxt));
  }

  // Pre-decide whether the next human match is preceded by a training session,
  // so the Continue label reflects it before the user clicks. The decision is
  // cached per pending match so it doesn't re-randomise on every render.
  if (nxt && !wcSimRunning && !wcGroupToKnockoutPending && wcCoachPicksQueue.length === 0 && wcTrainingQueue.length === 0 && wcEventQueue.length === 0) {
    const nextIsHuman =
      wcControllerForTeam(nxt.match.home).type === 'human' ||
      wcControllerForTeam(nxt.match.away).type === 'human';
    if (!nextIsHuman) {
      wcPendingTrainingPhases = null;
      wcPendingTrainingMatch = null;
    } else if (wcPendingTrainingMatch !== nxt.match) {
      wcPendingTrainingMatch = nxt.match;
      wcPendingTrainingPhases = wcRollTrainingPhases(nxt.match) || { teamName: null, variants: [] };
    }
  } else {
    wcPendingTrainingPhases = null;
    wcPendingTrainingMatch = null;
  }

  if (wcSimRunning) {
    worldCupPlayNextBtn.disabled = true;
    wcSetContinueLabel('Simulating…');
  } else if (wcGroupToKnockoutPending) {
    worldCupPlayNextBtn.disabled = false;
    wcSetContinueLabel('Draw Knockout Bracket');
  } else if (wcCoachPicksQueue.length > 0) {
    worldCupPlayNextBtn.disabled = false;
    wcSetContinueLabel('Staff Picks', wcCoachPicksQueue[0].teamName);
  } else if (wcTrainingQueue.length > 0 || (wcPendingTrainingPhases && wcPendingTrainingPhases.variants.length > 0)) {
    worldCupPlayNextBtn.disabled = false;
    // Attack/defense phases are full match-based special training sessions;
    // the generic queue shows a focus-pick card-training modal.
    const isSpecial = wcPendingTrainingPhases && wcPendingTrainingPhases.variants.length > 0;
    const tTeam = (wcTrainingQueue.length > 0 && wcTrainingQueue[0].teamName) ||
      (wcPendingTrainingPhases && wcPendingTrainingPhases.teamName);
    wcSetContinueLabel(isSpecial ? 'Special Training' : 'Training Session', tTeam || undefined);
  } else if (wcEventQueue.length > 0) {
    worldCupPlayNextBtn.disabled = false;
    wcSetContinueLabel('Event Phase', wcEventQueue[0].teamName);
  } else if (nxt) {
    const nextIsHuman =
      wcControllerForTeam(nxt.match.home).type === 'human' ||
      wcControllerForTeam(nxt.match.away).type === 'human';
    worldCupPlayNextBtn.disabled = false;
    if (nextIsHuman) {
      wcSetContinueLabel(
        nxt.round ? `Play Next: ${nxt.round}` : 'Play Next Match',
        wcHumanTeamOf(nxt.match.home, nxt.match.away)
      );
    } else {
      wcSetContinueLabel(
        wcAnyHumanController() ? 'Simulate Until Next Match' : 'Simulate to End'
      );
    }
  } else {
    worldCupPlayNextBtn.disabled = true;
    wcSetContinueLabel(
      worldCup.completed ? 'Tournament Complete' : 'Preparing next stage…'
    );
  }
}

function renderWcUpNextCard(nxt) {
  const card = document.createElement('div');
  card.className = 'wc-upnext-card';
  const label = nxt.group ? `Group ${nxt.group} · Matchday ${nxt.matchday}` : nxt.round;
  const homeIsHuman = wcControllerForTeam(nxt.match.home).type === 'human';
  const awayIsHuman = wcControllerForTeam(nxt.match.away).type === 'human';
  const isHumanMatch = homeIsHuman || awayIsHuman;
  
  card.innerHTML = `
    <div class="wc-upnext-kicker">${label}</div>
    <div class="wc-upnext-match">
      <span class="wc-upnext-team ${homeIsHuman ? 'you' : ''}">${wcTeamName(nxt.match.home)}${homeIsHuman ? ' <span class="wc-you-badge">You</span>' : ''}</span>
      <span class="wc-upnext-vs">vs</span>
      <span class="wc-upnext-team ${awayIsHuman ? 'you' : ''}">${wcTeamName(nxt.match.away)}${awayIsHuman ? ' <span class="wc-you-badge">You</span>' : ''}</span>
    </div>
    ${isHumanMatch ? '<span class="wc-upnext-tag">Your match</span>' : ''}
  `;
  return card;
}

function renderWcFixturesDashboard() {
  const wrap = document.createElement('div');
  wrap.className = 'wc-fixtures-dashboard';

  const humanTeams = TEAM_NAMES.filter((name) => wcControllerForTeam(name).type === 'human');
  const myTeam = humanTeams[0];

  // Hero row - My Group
  if (myTeam && worldCup.groups) {
    const myGroup = worldCup.groups.find(g => g.teams.includes(myTeam));
    if (myGroup) {
      const heroCard = document.createElement('section');
      heroCard.className = 'wc-hero-group';
      heroCard.innerHTML = `
        <h2 class="wc-hero-title">Group ${myGroup.name}</h2>
        <div class="wc-hero-main"></div>
        <div class="wc-hero-side"></div>
      `;
      wrap.appendChild(heroCard);

      // Fill hero main with group table
      const heroMain = heroCard.querySelector('.wc-hero-main');
      heroMain.appendChild(renderWcGroupTable(myGroup, myTeam));

      // Fill hero side with qualification panel + squad problems
      const heroSide = heroCard.querySelector('.wc-hero-side');
      heroSide.appendChild(renderWcQualificationPanel(myGroup, myTeam));
      heroSide.appendChild(renderWcSquadProblems(myTeam));
    }
  }

  // Other 11 groups in 4-wide grid
  const otherGroups = worldCup.groups ? worldCup.groups.filter(g => !g.teams.includes(myTeam)) : [];
  if (otherGroups.length > 0) {
    const grid = document.createElement('div');
    grid.className = 'wc-groups-grid';
    
    for (const group of otherGroups) {
      grid.appendChild(renderWcCompactGroup(group));
    }

    // 12th slot: How you qualify card
    const qualifyCard = document.createElement('div');
    qualifyCard.className = 'wc-qualify-card';
    qualifyCard.innerHTML = `
      <h3 class="wc-qualify-title">How you qualify</h3>
      <div class="wc-qualify-body">
        <p>Top 2 from each group advance to the Round of 32.</p>
        <p>The 4 best 3rd-placed teams also qualify.</p>
        <p class="wc-qualify-note">12 groups × 4 teams = 48 teams. 32 reach knockouts.</p>
      </div>
    `;
    grid.appendChild(qualifyCard);
    wrap.appendChild(grid);
  }

  // Projected Round of 32
  if (worldCup.rounds && worldCup.rounds.length > 0) {
    const r32 = worldCup.rounds.find(r => r.name === 'Round of 32');
    if (r32) {
      const projSection = document.createElement('section');
      projSection.className = 'wc-projected-ko';
      projSection.innerHTML = `
        <h2 class="wc-section-title">Projected Round of 32</h2>
        <p class="wc-proj-note">Seeding TBC — groups still in progress</p>
        <div class="wc-proj-grid"></div>
      `;
      const projGrid = projSection.querySelector('.wc-proj-grid');
      for (const m of r32.matches) {
        projGrid.appendChild(renderWcProjectedTie(m));
      }
      wrap.appendChild(projSection);
    }
  }

  return wrap;
}

function renderWcGroupTable(group, myTeam) {
  const standings = computeGroupStandings(group);
  const table = document.createElement('table');
  table.className = 'wc-group-table';
  table.innerHTML = `
    <thead>
      <tr><th>Pos</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th><th>Pts</th></tr>
    </thead>
    <tbody></tbody>
  `;
  const tbody = table.querySelector('tbody');
  
  for (let i = 0; i < standings.length; i++) {
    const row = standings[i];
    const isMe = row.team === myTeam;
    const tr = document.createElement('tr');
    if (isMe) tr.classList.add('you');
    else if (i < 2) tr.classList.add('qualifies');
    else if (i === 2) tr.classList.add('third');
    
    const statusBadge = isMe ? '<span class="wc-status you">You</span>' : 
                       i < 2 ? '<span class="wc-status qualify">Qualifying</span>' :
                       i === 2 ? '<span class="wc-status third">3rd place</span>' :
                       '<span class="wc-status out">Out</span>';
    
    tr.innerHTML = `
      <td class="wc-pos">${i + 1}</td>
      <td class="wc-team">${wcTeamName(row.team)} ${statusBadge}</td>
      <td>${row.P}</td><td>${row.W}</td><td>${row.D}</td><td>${row.L}</td>
      <td>${row.GF}</td><td>${row.GA}</td>
      <td class="wc-gd">${row.GD > 0 ? '+' + row.GD : row.GD}</td>
      <td class="wc-pts">${row.Pts}</td>
    `;
    tbody.appendChild(tr);
  }
  return table;
}

function renderWcCompactGroup(group) {
  const standings = computeGroupStandings(group);
  const card = document.createElement('div');
  card.className = 'wc-compact-group';
  
  const nextMatch = group.matches.find(m => !m.played);
  const nextLine = nextMatch ? `${wcTeamName(nextMatch.home)} vs ${wcTeamName(nextMatch.away)}` : 'All played';
  
  card.innerHTML = `
    <div class="wc-compact-header">
      <span class="wc-compact-group-label">Group ${group.name}</span>
    </div>
    <div class="wc-compact-table">
      ${standings.map((row, i) => {
        const dotClass = i < 2 ? 'qualified' : i === 2 ? 'third' : '';
        const dot = `<span class="wc-dot ${dotClass}" title="${i < 2 ? 'Qualified' : i === 2 ? '3rd place' : ''}"></span>`;
        return `<div class="wc-compact-row">${dot}${wcTeamName(row.team)} <span class="wc-compact-pts">${row.Pts} pts</span></div>`;
      }).join('')}
    </div>
    <div class="wc-compact-next">Next: ${nextLine}</div>
  `;
  return card;
}

function renderWcQualificationPanel(group, myTeam) {
  const standings = computeGroupStandings(group);
  const myRow = standings.find(r => r.team === myTeam);
  if (!myRow) return document.createElement('div');
  
  const card = document.createElement('div');
  card.className = 'wc-qual-panel';
  
  const lastThree = myRow.form || [];
  const formDots = lastThree.map(r => `<span class="wc-form-dot ${r === 'W' ? 'win' : r === 'D' ? 'draw' : 'loss'}"></span>`).join('');
  
  card.innerHTML = `
    <h3 class="wc-qual-title">Qualification</h3>
    <div class="wc-qual-stats">
      <div class="wc-qual-row"><span>Position</span><strong>${standings.findIndex(r => r.team === myTeam) + 1}</strong></div>
      <div class="wc-qual-row"><span>Points</span><strong>${myRow.Pts}</strong></div>
      <div class="wc-qual-row"><span>Last 3</span><div class="wc-form">${formDots}</div></div>
    </div>
  `;
  return card;
}

function renderWcSquadProblems(teamName) {
  const team = TEAMS[teamName];
  if (!team) return document.createElement('div');
  
  const problems = [];
  for (const p of team.squad) {
    if (p.injured) problems.push({ player: p, issue: p.injury || 'Injured', type: 'injury' });
    else if (p.fatigue && p.fatigue > 70) problems.push({ player: p, issue: `Fatigue ${p.fatigue}%`, type: 'fatigue' });
    else if (p.doubt) problems.push({ player: p, issue: 'Doubt', type: 'doubt' });
  }
  
  if (problems.length === 0) return document.createElement('div');
  
  const card = document.createElement('div');
  card.className = 'wc-squad-problems';
  card.innerHTML = `
    <h3 class="wc-squad-title">Squad problems</h3>
    <ul class="wc-squad-list">
      ${problems.map(p => `<li><span class="wc-squad-player">${p.player.name}</span><span class="wc-squad-issue ${p.type}">${p.issue}</span></li>`).join('')}
    </ul>
  `;
  return card;
}

function renderWcProjectedTie(match) {
  const homeLabel = match.home === 'TBD' ? 'Winner A' : wcTeamName(match.home);
  const awayLabel = match.away === 'TBD' ? 'Runner-up B' : wcTeamName(match.away);
  const homeIsMe = TEAM_NAMES.filter(n => wcControllerForTeam(n).type === 'human').includes(match.home);
  const awayIsMe = TEAM_NAMES.filter(n => wcControllerForTeam(n).type === 'human').includes(match.away);
  const isMyPath = homeIsMe || awayIsMe;
  
  const card = document.createElement('div');
  card.className = 'wc-proj-tie' + (isMyPath ? ' my-path' : '');
  card.innerHTML = `
    <div class="wc-proj-teams">
      <span class="wc-proj-team ${homeIsMe ? 'you' : ''}">${homeLabel}${homeIsMe ? ' <span class="wc-you-badge">You</span>' : ''}</span>
      <span class="wc-proj-vs">vs</span>
      <span class="wc-proj-team ${awayIsMe ? 'you' : ''}">${awayLabel}${awayIsMe ? ' <span class="wc-you-badge">You</span>' : ''}</span>
    </div>
    <span class="wc-proj-tag">${isMyPath ? 'Your path' : 'Seeding TBC'}</span>
  `;
  return card;
}

function wcTeamName(name) {
  return TEAMS && TEAMS[name] && TEAMS[name].level === 3 ? name + ' <span class="wc-boss-star">\u2605</span>' : name;
}

function renderWorldCupGroups() {
  const wrap = document.createElement('div');
  wrap.className = 'world-cup-groups';
  for (const group of worldCup.groups) {
    const panel = document.createElement('div');
    panel.className = 'world-cup-group';

    const header = document.createElement('div');
    header.className = 'world-cup-group-title';
    header.textContent = `Group ${group.name}`;
    panel.appendChild(header);

    const table = document.createElement('table');
    table.className = 'world-cup-group-table';
    const thead = document.createElement('thead');
    thead.innerHTML =
      '<tr><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>Pts</th></tr>';
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    const standings = computeGroupStandings(group);
    for (let i = 0; i < standings.length; i++) {
      const row = standings[i];
      const tr = document.createElement('tr');
      if (i < 2) tr.classList.add('qualifies');
      else if (i === 2) tr.classList.add('third');
      tr.innerHTML =
        `<td class="wc-team">${wcTeamName(row.team)}</td>` +
        `<td>${row.P}</td>` +
        `<td>${row.W}</td>` +
        `<td>${row.D}</td>` +
        `<td>${row.L}</td>` +
        `<td>${row.GF}</td>` +
        `<td>${row.GA}</td>` +
        `<td>${row.Pts}</td>`;
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    panel.appendChild(table);

    const schedule = document.createElement('div');
    schedule.className = 'world-cup-group-schedule';
    group.matches.forEach((m, idx) => {
      const row = document.createElement('div');
      row.className = 'wc-schedule-row';
      if (m.played) {
        row.classList.add('played');
        row.innerHTML =
          `<span class="wc-sched-home">${wcTeamName(m.home)}</span>` +
          `<span class="wc-sched-score">${m.homeScore} - ${m.awayScore}</span>` +
          `<span class="wc-sched-away">${wcTeamName(m.away)}</span>`;
      } else {
        row.innerHTML =
          `<span class="wc-sched-home">${wcTeamName(m.home)}</span>` +
          `<span class="wc-sched-score">vs</span>` +
          `<span class="wc-sched-away">${wcTeamName(m.away)}</span>`;
      }
      schedule.appendChild(row);
    });
    panel.appendChild(schedule);

    wrap.appendChild(panel);
  }
  return wrap;
}

function renderWorldCupBracket() {
  const wrap = document.createElement('div');
  wrap.className = 'world-cup-bracket';

  for (const round of worldCup.rounds) {
    const col = document.createElement('div');
    col.className = 'world-cup-round';

    const title = document.createElement('div');
    title.className = 'world-cup-round-title';
    title.textContent = round.name;
    col.appendChild(title);

    for (const m of round.matches) {
      col.appendChild(renderWcBracketMatch(m));
    }
    wrap.appendChild(col);
  }
  return wrap;
}

function renderWcBracketMatch(m) {
  const card = document.createElement('div');
  card.className = 'wc-match-card';
  if (m.played) {
    card.classList.add('played');
    const homeWon = m.winner === m.home;
    card.innerHTML =
      `<div class="wc-card-team ${homeWon ? 'won' : ''}">${wcTeamName(m.home)} <span class="wc-card-score">${m.homeScore}${m.pen ? ` (${m.penHome})` : ''}</span></div>` +
      `<div class="wc-card-team ${!homeWon ? 'won' : ''}">${wcTeamName(m.away)} <span class="wc-card-score">${m.awayScore}${m.pen ? ` (${m.penAway})` : ''}</span></div>`;
  } else {
    card.innerHTML =
      `<div class="wc-card-team pending">${wcTeamName(m.home)}</div>` +
      `<div class="wc-card-team pending">${wcTeamName(m.away)}</div>`;
  }
  return card;
}

function renderWcNextMatchCard(nxt) {
  const card = document.createElement('div');
  card.className = 'wc-next-match';
  card.innerHTML =
    `<span class="wc-next-label">Next up · ${nxt.group ? 'Group ' + nxt.group : nxt.round}</span>` +
    `<span class="wc-next-home">${wcTeamName(nxt.match.home)}</span>` +
    `<span class="wc-next-vs">vs</span>` +
    `<span class="wc-next-away">${wcTeamName(nxt.match.away)}</span>`;
  return card;
}

function renderWcSchedule() {
  const wrap = document.createElement('div');
  wrap.className = 'wc-schedule-view';

  const humanTeams = TEAM_NAMES.filter((name) => wcControllerForTeam(name).type === 'human');
  if (humanTeams.length === 0) {
    wrap.innerHTML = '<p class="wc-empty">No human teams in this World Cup.</p>';
    return wrap;
  }

  const myTeam = humanTeams[0];

  // Collect all group matches by matchday
  const matchesByMd = { 1: [], 2: [], 3: [] };
  for (const g of worldCup.groups) {
    for (const m of g.matches) {
      if (m.matchday >= 1 && m.matchday <= 3) {
        matchesByMd[m.matchday].push({ ...m, group: g.name });
      }
    }
  }

  const md = (wcScheduleMatchday || 1);
  const mdMatches = matchesByMd[md] || [];

  // State line
  const playedCount = mdMatches.filter(m => m.played).length;
  const totalCount = mdMatches.length;
  const stateLine = playedCount === totalCount ? 'Complete' : `In progress · ${playedCount} of ${totalCount} played`;

  wrap.innerHTML = `
    <header class="wc-schedule-header">
      <h2 class="wc-schedule-title">Schedule · Matchday ${md}</h2>
      <div class="wc-schedule-state">${stateLine}</div>
    </header>
    <div class="wc-schedule-summary">
      <div class="wc-summary-item"><span>${totalCount}</span> matches</div>
      <div class="wc-summary-item"><span>${playedCount}</span> played</div>
      <div class="wc-summary-item"><span>${totalCount - playedCount}</span> to come</div>
      <div class="wc-summary-item wc-legend"><span class="wc-legend-swatch your"></span>Your match</div>
    </div>
    <div class="wc-schedule-md-pills" role="tablist">
      <button class="wc-md-pill${md === 1 ? ' active' : ''}" data-md="1" role="tab" aria-selected="${md === 1}">Matchday 1</button>
      <button class="wc-md-pill${md === 2 ? ' active' : ''}" data-md="2" role="tab" aria-selected="${md === 2}">Matchday 2</button>
      <button class="wc-md-pill${md === 3 ? ' active' : ''}" data-md="3" role="tab" aria-selected="${md === 3}">Matchday 3</button>
    </div>
    <div class="wc-schedule-grid" role="tabpanel"></div>
  `;

  const grid = wrap.querySelector('.wc-schedule-grid');
  for (const m of mdMatches) {
    grid.appendChild(renderWcScheduleMatchRow(m, myTeam));
  }

  wrap.querySelectorAll('.wc-md-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      wcScheduleMatchday = parseInt(btn.dataset.md, 10);
      renderWorldCupView();
    });
  });

  return wrap;
}

function renderWcScheduleMatchRow(m, myTeam) {
  const row = document.createElement('div');
  row.className = 'wc-schedule-match';
  const isMyMatch = m.home === myTeam || m.away === myTeam;
  if (isMyMatch) row.classList.add('my-match');
  
  const homeIsHuman = wcControllerForTeam(m.home).type === 'human';
  const awayIsHuman = wcControllerForTeam(m.away).type === 'human';
  
  const status = m.played ? 'Full time' : 'Kick-off';
  const timeStr = m.played ? '' : ` · ${m.kickoff || 'TBD'}`;
  
  const homeScore = m.played ? m.homeScore : '';
  const awayScore = m.played ? m.awayScore : '';
  const homeWon = m.played && m.winner === m.home;
  const awayWon = m.played && m.winner === m.away;
  
  row.innerHTML = `
    <span class="wc-sched-group-badge">${m.group}</span>
    <div class="wc-sched-teams">
      <div class="wc-sched-team ${homeWon ? 'won' : ''} ${awayWon ? 'lost' : ''} ${homeIsHuman ? 'you' : ''}">
        ${wcTeamName(m.home)}${homeIsHuman ? ' <span class="wc-you-badge">You</span>' : ''}
        ${m.played ? `<span class="wc-sched-score">${homeScore}</span>` : ''}
      </div>
      <div class="wc-sched-team ${awayWon ? 'won' : ''} ${homeWon ? 'lost' : ''} ${awayIsHuman ? 'you' : ''}">
        ${wcTeamName(m.away)}${awayIsHuman ? ' <span class="wc-you-badge">You</span>' : ''}
        ${m.played ? `<span class="wc-sched-score">${awayScore}</span>` : ''}
      </div>
    </div>
    <div class="wc-sched-status">${status}${timeStr}</div>
  `;
  return row;
}

function paintWcPitchLines(cell, x, y) {
  const sides = [];

  if (x === 0) sides.push('left');
  if (x === 8) sides.push('right');
  if (y === 0) sides.push('top');
  if (y === 6) sides.push('bottom');

  if (x === 4) sides.push('midR');
  if (x === 5) sides.push('midL');

  const inBoxRows = y >= 2 && y <= 4;
  if ((x === 0 || x === 1) && inBoxRows) {
    cell.classList.add('wc-box-left');
    if (x === 0) sides.push('boxGoalLeft');
    if (x === 1) sides.push('boxFrontLeft');
    if (y === 2) sides.push('boxTop');
    if (y === 4) sides.push('boxBottom');
  }
  if ((x === 7 || x === 8) && inBoxRows) {
    cell.classList.add('wc-box-right');
    if (x === 7) sides.push('boxFrontRight');
    if (x === 8) sides.push('boxGoalRight');
    if (y === 2) sides.push('boxTop');
    if (y === 4) sides.push('boxBottom');
  }

  for (const s of sides) cell.classList.add(`wc-line-${s}`);
}

function renderWcMyTeam() {  const wrap = document.createElement('div');
  wrap.className = 'wc-my-team';

  const humanTeams = TEAM_NAMES.filter((name) => wcControllerForTeam(name).type === 'human');
  if (humanTeams.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'wc-schedule-empty';
    empty.textContent = 'No human teams in this World Cup.';
    wrap.appendChild(empty);
    return wrap;
  }

  const teamName = humanTeams[0];
  console.log('[MyTeam] renderWcMyTeam called, TEAMS=', TEAMS ? 'exists' : 'null', 'teamName=', teamName);
  let team = TEAMS && TEAMS[teamName];
  console.log('[MyTeam] team from TEAMS=', team ? team.name : 'null/undefined');
  const mirrorX = team && team.side === 'right';
  if (!team) {
    console.log('[MyTeam] building team from scratch');
    const built = buildTeams([teamName]);
    team = built[teamName];
    if (!matchState) {
      if (!TEAMS) TEAMS = {};
      TEAMS[teamName] = team;
    }
    const trainingCards = wcTrainingCards[teamName] || [];
    if (trainingCards.length > 0) {
      team.actions.push(...trainingCards);
      team.availableActions.push(...trainingCards);
    }
    const owned = wcOwnedCoaches[teamName] || [];
    for (const c of owned) c.applyToTeam(team);
    const pendingCoach = wcPendingCoaches && wcPendingCoaches[teamName];
    if (pendingCoach) pendingCoach.applyToTeam(team);
    if (team.hasTeamEffect('randomBoost') && !wcRandomBoostApplied[team.name]) {
      wcRandomBoostApplied[team.name] = true;
      const allEffects = Object.keys(TEAM_EFFECTS).filter((k) => k !== 'randomBoost');
      const shuffled = allEffects.sort(() => Math.random() - 0.5);
      for (let i = 0; i < 2 && i < shuffled.length; i++) {
        team.addTeamEffect(shuffled[i], Infinity);
      }
    }
  }
  const pendingNames = wcPendingLineup[teamName];
  if (pendingNames && pendingNames.length === 11) {
    const pendingStarters = pendingNames
      .map((n) => team.squad.find((p) => p.name === n))
      .filter(Boolean);
    if (pendingStarters.length === 11) {
      team.currentPlayers.length = 0;
      team.currentPlayers.push(...pendingStarters);
      team.currentGoalkeeper = team.currentPlayers.find((p) => p.position === 'GK') || null;
    }
    const pendingCoords = wcPendingFormationCoords[teamName];
    if (pendingCoords && Object.keys(pendingCoords).length > 0) {
      team.formation = { ...pendingCoords };
    }
  }

  // --- Team Header ---
  const header = document.createElement('div');
  header.className = 'wc-mt-header';
  header.style.borderLeftColor = team.primaryColor;
  header.innerHTML = `<span class="wc-mt-team-name">${teamName}</span>` +
    (team.coaches.length > 0 ? `<span class="wc-mt-coach-line">Coach: ${team.coaches.map((c) => c.name).join(', ')}</span>` : '');
  wrap.appendChild(header);

  // --- Section: Starting XI ---
  const xiSection = document.createElement('div');
  xiSection.className = 'wc-mt-section';
  xiSection.innerHTML = '<div class="wc-mt-section-title">Starting XI <span class="wc-mt-hint">(click to swap with bench)</span></div>';
  const xiGrid = document.createElement('div');
  xiGrid.className = 'wc-mt-players';
  for (const player of team.currentPlayers) {
    const el = renderWcMiniPlayer(player, team.primaryColor);
    el.classList.add('wc-mt-player-selectable');
    el.addEventListener('click', () => {
      if (wcMyTeamSelected) {
        const inCurrent = team.currentPlayers.includes(player);
        const selectedInCurrent = team.currentPlayers.includes(wcMyTeamSelected);
        if (inCurrent && !selectedInCurrent) {
          const outIdx = team.currentPlayers.indexOf(player);
          const benchList = team.availableSubstitutes();
          const inIdx = benchList.indexOf(wcMyTeamSelected);
          if (outIdx !== -1 && inIdx !== -1) {
            const slot = team.formation[player.name];
            const [rawSx, sy] = slot || [4, 3];
            const sx = mirrorX ? 8 - rawSx : rawSx;
            const canFlex = (pPos, slotPos) => {
              if (pPos === slotPos) return true;
              if (slotPos === 'MF' && pPos === 'DF' && sx < 5) return true;
              if (slotPos === 'FW' && pPos === 'MF' && !(sx === 6 && (sy === 2 || sy === 3 || sy === 4))) return true;
              if (slotPos === 'MF' && pPos === 'FW' && (sy === 0 || sy === 6) && sx >= 5) return true;
              return false;
            };
            if (canFlex(wcMyTeamSelected.position, player.position)) {
              team.currentPlayers[outIdx] = wcMyTeamSelected;
              if (slot) {
                team.formation[wcMyTeamSelected.name] = slot;
                delete team.formation[player.name];
              }
              wcPendingLineup[teamName] = team.currentPlayers.map((p) => p.name);
              wcPendingFormationCoords[teamName] = { ...team.formation };
            }
          }
        }
        wcMyTeamSelected = null;
        renderWorldCupView();
        return;
      }
      wcMyTeamSelected = player;
      renderWorldCupView();
    });
    if (wcMyTeamSelected === player) el.classList.add('wc-mt-player-selected');
    xiGrid.appendChild(el);
  }
  xiSection.appendChild(xiGrid);
  wrap.appendChild(xiSection);

  // --- Section: Bench ---
  const bench = team.availableSubstitutes();
  console.log('[MyTeam] bench=', bench.map(p => p.name + '(' + p.position + ')'), 'substitutedOut=', team.substitutedOut.map(p => p.name));
  if (bench.length > 0) {
    const benchSection = document.createElement('div');
    benchSection.className = 'wc-mt-section';
    benchSection.innerHTML = '<div class="wc-mt-section-title">Bench</div>';
    const benchGrid = document.createElement('div');
    benchGrid.className = 'wc-mt-players';
    for (const player of bench) {
      const el = renderWcMiniPlayer(player, team.reserveColor);
      el.classList.add('wc-mt-player-selectable');
      el.addEventListener('click', () => {
        if (wcMyTeamSelected) {
          const inCurrent = team.currentPlayers.includes(player);
          const selectedInCurrent = team.currentPlayers.includes(wcMyTeamSelected);
          if (!inCurrent && selectedInCurrent) {
            const outIdx = team.currentPlayers.indexOf(wcMyTeamSelected);
            if (outIdx !== -1) {
              const slot = team.formation[wcMyTeamSelected.name];
              const [rawSx, sy] = slot || [4, 3];
              const sx = mirrorX ? 8 - rawSx : rawSx;
              const canFlex = (pPos, slotPos) => {
                if (pPos === slotPos) return true;
                if (slotPos === 'MF' && pPos === 'DF' && sx < 5) return true;
                if (slotPos === 'FW' && pPos === 'MF' && !(sx === 6 && (sy === 2 || sy === 3 || sy === 4))) return true;
                if (slotPos === 'MF' && pPos === 'FW' && (sy === 0 || sy === 6) && sx >= 5) return true;
                return false;
              };
              if (canFlex(player.position, wcMyTeamSelected.position)) {
                team.currentPlayers[outIdx] = player;
                if (slot) {
                  team.formation[player.name] = slot;
                  delete team.formation[wcMyTeamSelected.name];
                }
                wcPendingLineup[teamName] = team.currentPlayers.map((p) => p.name);
                wcPendingFormationCoords[teamName] = { ...team.formation };
              }
            }
          }
          wcMyTeamSelected = null;
          renderWorldCupView();
          return;
        }
        wcMyTeamSelected = player;
        renderWorldCupView();
      });
      if (wcMyTeamSelected === player) el.classList.add('wc-mt-player-selected');
      benchGrid.appendChild(el);
    }
    benchSection.appendChild(benchGrid);
    wrap.appendChild(benchSection);
  }

  // --- Section: Coaches ---
  if (team.coaches.length > 0) {
    const coachSection = document.createElement('div');
    coachSection.className = 'wc-mt-section';
    coachSection.innerHTML = '<div class="wc-mt-section-title">Coaches</div>';
    for (const coach of team.coaches) {
      const row = document.createElement('div');
      row.className = 'wc-mt-coach';
      const effects = coach.effects.map((e) => {
        const spec = TEAM_EFFECTS[e];
        return spec ? `${spec.char} ${spec.explanation}` : e;
      }).join(' ');
      const cards = coach.cards.map((C) => {
        const c = new C();
        return `⚠️ ${c.name}`;
      }).join(', ');
      row.innerHTML = `<span class="wc-mt-coach-name">${coach.name}</span>` +
        `<span class="wc-mt-coach-effects">${effects}${cards ? ' · ' + cards : ''}</span>`;
      coachSection.appendChild(row);
    }
    wrap.appendChild(coachSection);
  }

  // --- Section: Pending Effects for Next Match ---
  const effectsSection = document.createElement('div');
  effectsSection.className = 'wc-mt-section';
  effectsSection.innerHTML = '<div class="wc-mt-section-title">Next Match Effects</div>';
  let hasEffects = false;

  const teamBuff = wcTeamBuffs[teamName];
  if (teamBuff) {
    for (const [stat, delta] of Object.entries(teamBuff)) {
      if (stat === 'turns' || stat === 'teamMoralePenalty' || stat === 'deckReshuffle' || stat === 'mediaFrenzyMorale' || stat === 'teamMoraleBoost' || stat === 'drawBonus') continue;
      if (typeof delta === 'number' && delta !== 0) {
        const eff = document.createElement('div');
        eff.className = 'wc-mt-effect ' + (delta > 0 ? 'positive' : 'negative');
        eff.textContent = `${delta > 0 ? '↑' : '↓'} ${stat}: ${delta > 0 ? '+' : ''}${delta}`;
        effectsSection.appendChild(eff);
        hasEffects = true;
      }
    }
    if (teamBuff.teamMoralePenalty) {
      const eff = document.createElement('div');
      eff.className = 'wc-mt-effect negative';
      eff.textContent = '😤 Team morale penalty: -1 all stats';
      effectsSection.appendChild(eff);
      hasEffects = true;
    }
    if (teamBuff.mediaFrenzyMorale) {
      const eff = document.createElement('div');
      eff.className = 'wc-mt-effect positive';
      eff.textContent = '📣 Media morale: +1 all stats';
      effectsSection.appendChild(eff);
      hasEffects = true;
    }
    if (teamBuff.teamMoraleBoost) {
      const eff = document.createElement('div');
      eff.className = 'wc-mt-effect positive';
      eff.textContent = '🎉 Team morale boost: +2 all stats';
      effectsSection.appendChild(eff);
      hasEffects = true;
    }
    if (teamBuff.drawBonus) {
      const eff = document.createElement('div');
      eff.className = 'wc-mt-effect positive';
      eff.textContent = `🎟️ Federation prize: +${teamBuff.drawBonus} card(s) per turn`;
      effectsSection.appendChild(eff);
      hasEffects = true;
    }
  }

  const recurringPenalties = (wcRecurringPenalties && wcRecurringPenalties[teamName]) || 0;
  if (recurringPenalties > 0) {
    const eff = document.createElement('div');
    eff.className = 'wc-mt-effect negative';
    eff.textContent = `🎩 Benefactor's curse: a penalty card every match (${recurringPenalties} remaining)`;
    effectsSection.appendChild(eff);
    hasEffects = true;
  }

  const teamDebuff = wcTeamDebuffs[teamName];
  if (teamDebuff && teamDebuff.drawPenalty) {
    const eff = document.createElement('div');
    eff.className = 'wc-mt-effect negative';
    eff.textContent = `📉 Draw penalty: -${teamDebuff.drawPenalty} card(s) per turn`;
    effectsSection.appendChild(eff);
    hasEffects = true;
  }

  const playerBuffs = wcPlayerBuffs[teamName] || {};
  for (const [name] of Object.entries(playerBuffs)) {
    const eff = document.createElement('div');
    eff.className = 'wc-mt-effect positive';
    eff.textContent = `💪 ${name}: +2 all stats (captain boost)`;
    effectsSection.appendChild(eff);
    hasEffects = true;
  }

  const playerDebuffs = wcPlayerDebuffs[teamName] || {};
  for (const [name, debuff] of Object.entries(playerDebuffs)) {
    const eff = document.createElement('div');
    eff.className = 'wc-mt-effect negative';
    const label = debuff.effect === 'captainUnhappy' ? '😒 unhappy (-2 all)' : '🍺 hungover (-3 all)';
    eff.textContent = `${name}: ${label}`;
    effectsSection.appendChild(eff);
    hasEffects = true;
  }

  const suspended = wcSuspendedPlayers[teamName] || [];
  for (const name of suspended) {
    const eff = document.createElement('div');
    eff.className = 'wc-mt-effect negative';
    eff.textContent = `🚫 ${name}: suspended`;
    effectsSection.appendChild(eff);
    hasEffects = true;
  }

  const penalties = wcPendingPenalties[teamName] || [];
  if (penalties.length > 0) {
    const eff = document.createElement('div');
    eff.className = 'wc-mt-effect negative';
    eff.textContent = `⚠️ ${penalties.length} penalty card(s) incoming`;
    effectsSection.appendChild(eff);
    hasEffects = true;
  }

  if (team.teamEffectObjects.length > 0) {
    for (const obj of team.teamEffectObjects) {
      const eff = document.createElement('div');
      eff.className = 'wc-mt-effect positive';
      const turns = obj.turns === Infinity ? '' : ` (${obj.turns}t)`;
      eff.textContent = `${obj.char} ${obj.label}${turns} — ${obj.explanation}`;
      effectsSection.appendChild(eff);
      hasEffects = true;
    }
  }

  if (!hasEffects) {
    const none = document.createElement('div');
    none.className = 'wc-mt-effect none';
    none.textContent = 'No pending effects';
    effectsSection.appendChild(none);
  }
  wrap.appendChild(effectsSection);

  // --- Section: Unavailable Players ---
  const unavailSection = document.createElement('div');
  unavailSection.className = 'wc-mt-section';
  unavailSection.innerHTML = '<div class="wc-mt-section-title">Unavailable Players</div>';
  let hasUnavail = false;

  const allSquad = team.squad;

  for (const p of allSquad) {
    if (p.injured) {
      const row = document.createElement('div');
      row.className = 'wc-mt-unavail wc-mt-unavail-injury';
      row.innerHTML = `<span class="wc-mt-unavail-icon">🤕</span><span class="wc-mt-unavail-name">${p.name}</span><span class="wc-mt-unavail-reason">Injured — out until healed</span>`;
      unavailSection.appendChild(row);
      hasUnavail = true;
    }
  }

  const outMap = worldCup && worldCup.outPlayers ? worldCup.outPlayers[teamName] : null;
  for (const [name, reason] of Object.entries(outMap || {})) {
    if (reason !== 'exhausted') continue;
    const row = document.createElement('div');
    row.className = 'wc-mt-unavail wc-mt-unavail-suspended';
    row.innerHTML = `<span class="wc-mt-unavail-icon">🫠</span><span class="wc-mt-unavail-name">${name}</span><span class="wc-mt-unavail-reason">Worn out — out for next match</span>`;
    unavailSection.appendChild(row);
    hasUnavail = true;
  }

  const suspendedPlayers = wcSuspendedPlayers[teamName] || [];
  for (const name of suspendedPlayers) {
    const row = document.createElement('div');
    row.className = 'wc-mt-unavail wc-mt-unavail-suspended';
    row.innerHTML = `<span class="wc-mt-unavail-icon">🚫</span><span class="wc-mt-unavail-name">${name}</span><span class="wc-mt-unavail-reason">Suspended — out for next match</span>`;
    unavailSection.appendChild(row);
    hasUnavail = true;
  }

  const unavailDebuffs = wcPlayerDebuffs[teamName] || {};
  for (const [name, debuff] of Object.entries(unavailDebuffs)) {
    const label = debuff.effect === 'captainUnhappy' ? 'Unhappy' : 'Hungover';
    const turns = debuff.turns != null ? ` (${debuff.turns}t left)` : '';
    const row = document.createElement('div');
    row.className = 'wc-mt-unavail wc-mt-unavail-debuff';
    row.innerHTML = `<span class="wc-mt-unavail-icon">${debuff.effect === 'captainUnhappy' ? '😒' : '🍺'}</span><span class="wc-mt-unavail-name">${name}</span><span class="wc-mt-unavail-reason">${label}${turns}</span>`;
    unavailSection.appendChild(row);
    hasUnavail = true;
  }

  if (!hasUnavail) {
    const none = document.createElement('div');
    none.className = 'wc-mt-unavail none';
    none.textContent = 'All players available';
    unavailSection.appendChild(none);
  }
  wrap.appendChild(unavailSection);

  // --- Section: Formation ---
  const formSection = document.createElement('div');
  formSection.className = 'wc-mt-section';
  formSection.innerHTML = '<div class="wc-mt-section-title">Formation</div>';

  // Formation picker
  const pickerRow = document.createElement('div');
  pickerRow.className = 'wc-mt-formation-picker';
  const pickerLabel = document.createElement('span');
  pickerLabel.className = 'wc-mt-formation-label';
  pickerLabel.textContent = 'Tactical system:';
  const picker = document.createElement('select');
  picker.className = 'wc-mt-formation-select';
  if (!wcSelectedFormation) wcSelectedFormation = Object.keys(FORMATION_TEMPLATES)[0];
  for (const key of Object.keys(FORMATION_TEMPLATES)) {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = key;
    if (key === wcSelectedFormation) opt.selected = true;
    picker.appendChild(opt);
  }
  picker.addEventListener('change', () => {
    console.log('[Formation] change fired, picker.value=', picker.value);
    wcSelectedFormation = picker.value;
    const tmpl = FORMATION_TEMPLATES[picker.value];
    if (!tmpl) { console.log('[Formation] no template found'); return; }

    const placed = [];
    const placedNames = new Set();
    const startersByName = {};
    for (const p of team.currentPlayers) startersByName[p.name] = p;
    const bench = team.availableSubstitutes();
    const benchByName = {};
    for (const p of bench) benchByName[p.name] = p;

    for (const [pos, coords] of Object.entries(tmpl)) {
      const matchPos = (pos === 'AM' || pos === 'DM') ? 'MF' : pos;
      for (const coord of coords) {
        const [rawCx, cy] = coord;
        const cx = mirrorX ? 8 - rawCx : rawCx;
        const canFlex = (pPos) => {
          if (pPos === matchPos) return true;
          if (matchPos === 'MF' && pPos === 'DF' && cx < 5) return true;
          if (matchPos === 'FW' && pPos === 'MF' && !(cx === 6 && (cy === 2 || cy === 3 || cy === 4))) return true;
          if (matchPos === 'MF' && pPos === 'FW' && (cy === 0 || cy === 6) && cx >= 5) return true;
          return false;
        };
        let picked = null;
        for (const p of team.currentPlayers) {
          if (!placedNames.has(p.name) && canFlex(p.position)) { picked = p; break; }
        }
        if (!picked) {
          for (const p of bench) {
            if (!placedNames.has(p.name) && canFlex(p.position)) { picked = p; break; }
          }
        }
        if (!picked) {
          for (const p of team.currentPlayers) {
            if (!placedNames.has(p.name)) { picked = p; break; }
          }
        }
        if (!picked) {
          for (const p of bench) {
            if (!placedNames.has(p.name)) { picked = p; break; }
          }
        }
        if (picked) {
          placed.push(picked);
          placedNames.add(picked.name);
        }
      }
    }

    const droppedFromXI = team.currentPlayers.filter((p) => !placedNames.has(p.name));
    for (const p of droppedFromXI) {
      const idx = team.substitutedOut.indexOf(p);
      if (idx !== -1) team.substitutedOut.splice(idx, 1);
    }

    team.currentPlayers.length = 0;
    team.currentPlayers.push(...placed);

    const newFormation = {};
    let i = 0;
    for (const [pos, coords] of Object.entries(tmpl)) {
      for (const coord of coords) {
        if (i < placed.length) { newFormation[placed[i].name] = coord; i++; }
      }
    }

    wcPendingLineup[teamName] = team.currentPlayers.map((p) => p.name);
    wcPendingFormationCoords[teamName] = { ...newFormation };
    wcSelectedFormation = picker.value;

    console.log('[Formation] newStarters=', placed.map(p => p.name + '(' + p.position + ')'));
    console.log('[Formation] substitutedOut=', team.substitutedOut.map(p => p.name));
    console.log('[Formation] newFormation=', newFormation);
    console.log('[Formation] calling renderWorldCupView');

    renderWorldCupView();
  });
  pickerRow.appendChild(pickerLabel);
  pickerRow.appendChild(picker);
  formSection.appendChild(pickerRow);

  const pitch = document.createElement('div');
  pitch.className = 'wc-mt-pitch';
  const POS_X = { GK: 0, DF: 2, MF: 4, FW: 6 };
  const grid = Array.from({ length: 7 }, () => Array(9).fill(null));
  for (const player of team.currentPlayers) {
    const pos = team.formation[player.name];
    if (pos) {
      const dx = mirrorX ? 8 - pos[0] : pos[0];
      grid[pos[1]][dx] = player;
    } else {
      const baseX = POS_X[player.position] !== undefined ? POS_X[player.position] : 4;
      const x = mirrorX ? 8 - baseX : baseX;
      for (let tryY = 0; tryY < 7; tryY++) {
        if (!grid[tryY][x]) { grid[tryY][x] = player; break; }
      }
    }
  }
  const stripColor = (team.wearingAwayKit ? team.awayShortsColor : team.shortsColor) ||
    (team.wearingAwayKit ? team.reserveColor : team.primaryColor);
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 9; x++) {
      const cell = document.createElement('div');
      cell.className = 'wc-mt-pitch-cell';
      paintWcPitchLines(cell, x, y);
      const player = grid[y][x];
      if (player) {
        cell.style.backgroundColor = team.primaryColor;
        cell.classList.add('wc-mt-token');
        cell.style.setProperty('--shorts', stripColor);
        cell.textContent = player.name.split(' ').pop().substring(0, 3).toUpperCase();
        cell.title = `${player.name} (${player.position})`;
      }
      pitch.appendChild(cell);
    }
  }
  formSection.appendChild(pitch);
  wrap.appendChild(formSection);

  // --- Section: Deck ---
  const deckSection = document.createElement('div');
  deckSection.className = 'wc-mt-section';
  deckSection.innerHTML = '<div class="wc-mt-section-title">Deck of Cards</div>';
  const deckBtn = document.createElement('button');
  deckBtn.className = 'wc-mt-deck-btn';
  deckBtn.textContent = `View Deck (${team.actions.length} cards)`;
  deckBtn.addEventListener('click', () => showWcDeckModal(team));
  deckSection.appendChild(deckBtn);

  const deckSummary = document.createElement('div');
  deckSummary.className = 'wc-mt-deck-summary';
  const cats = {};
  for (const card of team.actions) {
    const c = card.category || 'other';
    cats[c] = (cats[c] || 0) + 1;
  }
  for (const [cat, count] of Object.entries(cats)) {
    const tag = document.createElement('span');
    tag.className = `wc-mt-deck-tag category-${cat}`;
    tag.textContent = `${cat}: ${count}`;
    deckSummary.appendChild(tag);
  }
  deckSection.appendChild(deckSummary);
  wrap.appendChild(deckSection);

  return wrap;
}

function renderWcMiniPlayer(player, color) {
  const el = document.createElement('div');
  el.className = 'wc-mt-mini-player';
  const avatar = document.createElement('div');
  avatar.className = 'wc-mt-mini-avatar';
  avatar.style.backgroundColor = color;
  avatar.textContent = player.name.split(' ').map((n) => n[0]).join('').substring(0, 2);
  const info = document.createElement('div');
  info.className = 'wc-mt-mini-info';
  const name = document.createElement('div');
  name.className = 'wc-mt-mini-name';
  name.textContent = player.name;
  const meta = document.createElement('div');
  meta.className = 'wc-mt-mini-meta';
  meta.textContent = `${player.position} · ${player.age}yo`;
  const stats = document.createElement('div');
  stats.className = 'wc-mt-mini-stats';
  const statList = [
    ['SPD', player.speed], ['MRK', player.marking], ['TCK', player.tackling],
    ['SHT', player.shooting], ['PAS', player.passing], ['DRI', player.dribbling],
    ['TAC', player.tacticalThinking], ['HDG', player.heading],
  ];
  if (player.position === 'GK') statList.push(['GK', player.goalkeeping]);
  for (const [label, value] of statList) {
    const s = document.createElement('span');
    s.className = 'wc-mt-mini-stat';
    s.textContent = `${label}:${value}`;
    stats.appendChild(s);
  }
  info.appendChild(name);
  info.appendChild(meta);
  info.appendChild(stats);
  el.appendChild(avatar);
  el.appendChild(info);
  return el;
}

function showWcDeckModal(team) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  const modal = document.createElement('div');
  modal.className = 'wc-modal shot-modal halftime-modal';
  const content = document.createElement('div');
  content.className = 'shot-modal-content halftime-content';

  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent = `${team.name} — Deck (${team.actions.length} cards)`;
  content.appendChild(title);

  const scroll = document.createElement('div');
  scroll.className = 'wc-mt-deck-scroll';

  const sorted = [...team.actions].sort((a, b) => {
    const catOrder = { offense: 0, defense: 1, tactical: 2, effect: 3, penalty: 4 };
    const ca = catOrder[a.category] ?? 5;
    const cb = catOrder[b.category] ?? 5;
    if (ca !== cb) return ca - cb;
    return (b.rarity || 0) - (a.rarity || 0);
  });

  for (const card of sorted) {
    const cardEl = createActionCard(card);
    cardEl.classList.add('wc-mt-deck-card');
    scroll.appendChild(cardEl);
  }

  content.appendChild(scroll);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'event-phase-option';
  closeBtn.textContent = 'Close';
  closeBtn.addEventListener('click', () => overlay.remove());
  content.appendChild(closeBtn);

  modal.appendChild(content);
  overlay.appendChild(modal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function wcCardPool(maxRarity) {
  return CARD_TYPES.filter((Ctor) => {
    if (typeof Ctor !== 'function') return false;
    const inst = new Ctor();
    return inst.rarity >= 1 && inst.rarity <= maxRarity;
  });
}

function wcCardsByCategory(category, maxRarity) {
  const categories = WC_CARD_CATEGORIES[category] || WC_CARD_CATEGORIES.general;
  return wcCardPool(maxRarity).filter((Ctor) => categories.includes(new Ctor().category));
}

function wcPickRandomCards(ctors, count) {
  const pool = [...ctors];
  const picked = [];
  for (let i = 0; i < Math.min(count, pool.length); i++) {
    const idx = Math.floor(Math.random() * pool.length);
    const Ctor = pool.splice(idx, 1)[0];
    picked.push(new Ctor());
  }
  return picked;
}

function wcAddCardToTeamDeck(teamName, card) {
  const team = TEAMS && TEAMS[teamName];
  const pending = wcPendingCoaches && wcPendingCoaches[teamName];
  const doubled = (team && team.hasTeamEffect('doubleTrainingCards')) ||
    (pending && pending.effects && pending.effects.includes('doubleTrainingCards'));

  if (game && game.inPlay && game.inPlay[teamName]) {
    game.pushWithoutCreativity(teamName, [card]);
    if (doubled) game.pushWithoutCreativity(teamName, [card]);
  } else {
    if (!wcTrainingCards[teamName]) wcTrainingCards[teamName] = [];
    wcTrainingCards[teamName].push(card);
    if (doubled) wcTrainingCards[teamName].push(card);
  }
}

// Show the choosing team's flag in the top-left corner of a WC modal.
function wcAddTeamFlagBadge(modal, teamName) {
  const flag = document.createElement('span');
  flag.className = 'wc-team-flag-badge';
  flag.textContent = TEAM_FLAGS[teamName] || '';
  flag.title = teamName;
  if (!flag.textContent) return;
  modal.appendChild(flag);
}

function wcShowTrainingModal(teamName, options, callback) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'wc-modal shot-modal halftime-modal training-modal';

  const content = document.createElement('div');
  content.className = 'shot-modal-content halftime-content';

  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent = 'Training Session';
  content.appendChild(title);

  const subtitle = document.createElement('div');
  subtitle.className = 'halftime-kickoff';
  subtitle.textContent = `${teamName} — Choose your training focus:`;
  content.appendChild(subtitle);

  const focusWrap = document.createElement('div');
  focusWrap.className = 'training-focus-row';

  for (const focus of options) {
    const btn = document.createElement('button');
    btn.className = 'training-focus-btn';
    btn.textContent = focus.charAt(0).toUpperCase() + focus.slice(1);
    btn.addEventListener('click', () => {
      focusWrap.remove();
      subtitle.remove();
      wcShowCardPick(content, teamName, focus, callback);
    });
    focusWrap.appendChild(btn);
  }

  content.appendChild(focusWrap);

  modal.appendChild(content);
  wcAddTeamFlagBadge(modal, teamName);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  function close() {
    overlay.remove();
  }

  return { overlay, modal, content, close };
}

function wcShowCardPick(content, teamName, focus, callback) {
  const team = TEAMS && TEAMS[teamName];
  const pending = wcPendingCoaches && wcPendingCoaches[teamName];
  const hasEffect = (key) =>
    (team && team.hasTeamEffect(key)) ||
    (pending && pending.effects && pending.effects.includes(key));

  const isKnockout = worldCup && worldCup.phase === 'knockout';
  const maxRarity = hasEffect('goodCoaches') ? 3 : isKnockout ? 2 : 1;
  const pool = wcCardsByCategory(focus, maxRarity);

  const choiceCount = hasEffect('extraTrainingChoices') ? 5 : 3;
  const singleCards = wcPickRandomCards(pool, choiceCount);

  // Build the final list of clickable items: single cards + synergy packs
  const items = [];
  for (const card of singleCards) {
    items.push({ type: 'single', card });
  }

  // Insert synergy packs: one pack for every 3 candidates
  if (hasEffect('trainingSynergyPacks')) {
    const packCount = Math.floor(choiceCount / 3);
    const shuffledPacks = [...SYNERGY_PACKS].sort(() => Math.random() - 0.5);
    for (let i = 0; i < packCount; i++) {
      const pack = shuffledPacks[i % shuffledPacks.length];
      const packCards = pack.cards.map((Ctor) => new Ctor());
      const packRarity = Math.max(...packCards.map((c) => c.rarity));
      items.push({ type: 'pack', label: pack.label, cards: packCards, rarity: packRarity });
    }
  }

  // Shuffle items so packs aren't always at the end
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  const subtitle = document.createElement('div');
  subtitle.className = 'halftime-kickoff';
  subtitle.textContent = `Focus: ${focus.charAt(0).toUpperCase() + focus.slice(1)} — Pick one card to add to your deck:`;
  content.appendChild(subtitle);

  const cardWrap = document.createElement('div');
  cardWrap.className = 'training-cards-row';

  for (const item of items) {
    if (item.type === 'single') {
      const cardEl = createActionCard(item.card);
      cardEl.classList.add('training-pick', `rarity-${item.card.rarity}`);
      cardEl.addEventListener('click', () => {
        wcAddCardToTeamDeck(teamName, item.card);
        if (TEAMS) logMatch(teamName, `Training: ${teamName} added ${item.card.name} to their deck.`);
        cardWrap.remove();
        subtitle.remove();
        callback();
      });
      cardWrap.appendChild(cardEl);
    } else {
      const packEl = document.createElement('div');
      packEl.className = `training-pack rarity-${item.rarity}`;

      const packLabel = document.createElement('div');
      packLabel.className = 'training-pack-label';
      packLabel.textContent = item.label;

      const packCards = document.createElement('div');
      packCards.className = 'training-pack-cards';
      for (const card of item.cards) {
        packCards.appendChild(createActionCard(card));
      }

      const packInfo = document.createElement('div');
      packInfo.className = 'training-pack-info';
      packInfo.textContent = `Level ${item.rarity} · Pick both`;

      packEl.appendChild(packLabel);
      packEl.appendChild(packCards);
      packEl.appendChild(packInfo);
      packEl.addEventListener('click', () => {
        for (const card of item.cards) wcAddCardToTeamDeck(teamName, card);
        const added = item.cards.map((c) => c.name).join(', ');
        if (TEAMS) logMatch(teamName, `Training: ${teamName} added ${added} to their deck (synergy pack).`);
        cardWrap.remove();
        subtitle.remove();
        callback();
      });
      cardWrap.appendChild(packEl);
    }
  }

  content.appendChild(cardWrap);
}

function wcRunTrainingForTeam(teamName, cards = 1) {
  const options = ['defense', 'offense', 'tactical', 'general'];

  return new Promise(async (resolve) => {
    wcTrainingActive = true;
    wcTrainingTargetTeam = teamName;

    for (let i = 0; i < cards; i++) {
      await showNotice('TRAINING SESSION');
      await new Promise((res) => {
        const instance = wcShowTrainingModal(teamName, options, () => {
          instance.close();
          res();
        });
      });
    }
    wcTrainingActive = false;
    wcTrainingTargetTeam = null;
    resolve();
  });
}

async function wcProcessTrainingQueue(callback) {
  if (wcTrainingQueue.length === 0) {
    callback();
    return;
  }
  const next = wcTrainingQueue.shift();
  await wcRunTrainingForTeam(next.teamName, next.cards);
  wcProcessTrainingQueue(callback);
}

function wcQueueTraining(teamName, cards = 1) {
  wcTrainingQueue.push({ teamName, cards });
}

function wcQueueEvent(teamName) {
  wcEventQueue.push({ teamName });
}

function wcRunEventForTeam(teamName, eventIndex, eventTotal) {
  return new Promise(async (resolve) => {
    wcEventActive = true;
    wcEventTargetTeam = teamName;
    const progressLabel = eventTotal > 0 ? ` (${eventIndex}/${eventTotal})` : '';
    await showNotice('EVENT PHASE' + progressLabel);
    const savedTeams = TEAMS;
    if (!TEAMS || !TEAMS[teamName]) {
      TEAMS = buildTeams([teamName]);
    }
    const event = pickRandomEvent();
    if (event) {
      const instance = wcShowEventPhaseModal(teamName, event, () => {
        instance.close();
        TEAMS = savedTeams;
        wcEventActive = false;
        wcEventTargetTeam = null;
        resolve();
      }, eventIndex, eventTotal);
    } else {
      TEAMS = savedTeams;
      wcEventActive = false;
      wcEventTargetTeam = null;
      resolve();
    }
  });
}

async function wcProcessEventQueue(callback) {
  if (wcEventQueue.length === 0) {
    callback();
    return;
  }
  const total = wcEventQueue.length;
  let index = 0;
  while (wcEventQueue.length > 0) {
    const next = wcEventQueue.shift();
    index += 1;
    await wcRunEventForTeam(next.teamName, index, total);
  }
  callback();
}

function wcRunCoachPicksForTeam(teamName) {
  const available = wcUnusedCoaches(teamName);
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  const choices = shuffled.slice(0, 5);

  return new Promise(async (resolve) => {
    wcCoachPicksActive = true;
    await showNotice('STAFF PICKS');
    const instance = wcShowCoachPickModal(teamName, choices, () => {
      instance.close();
      wcCoachPicksActive = false;
      resolve();
    });
  });
}

async function wcProcessCoachPicksQueue(callback) {
  if (wcCoachPicksQueue.length === 0) {
    callback();
    return;
  }
  const next = wcCoachPicksQueue.shift();
  await wcRunCoachPicksForTeam(next.teamName);
  wcProcessCoachPicksQueue(callback);
}

function wcShowCoachPickModal(teamName, choices, callback) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'wc-modal shot-modal halftime-modal training-modal';

  const content = document.createElement('div');
  content.className = 'shot-modal-content halftime-content';

  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent = 'Staff Picks';
  content.appendChild(title);

  const subtitle = document.createElement('div');
  subtitle.className = 'halftime-kickoff';
  subtitle.textContent = `${teamName} — Choose a coach to join your staff:`;
  content.appendChild(subtitle);

  const coachWrap = document.createElement('div');
  coachWrap.className = 'training-cards-row';

  for (const coach of choices) {
    const coachEl = document.createElement('div');
    coachEl.className = `coach-card rarity-${coach.effects.length > 1 ? 2 : 1}`;
    coachEl.innerHTML =
      `<div class="coach-card-name">${coach.name}</div>` +
      `<div class="coach-card-nationality">${coach.nationality}</div>` +
      `<div class="coach-card-desc">${coach.explanation}</div>` +
      `<div class="coach-card-effects">${coach.effects.map((e) => TEAM_EFFECTS[e]?.label || e).join(', ')}</div>`;
    coachEl.addEventListener('click', () => {
      if (TEAMS && TEAMS[teamName]) {
        coach.applyToTeam(TEAMS[teamName]);
        if (TEAMS[teamName].hasTeamEffect('randomBoost') && !wcRandomBoostApplied[teamName]) {
          wcRandomBoostApplied[teamName] = true;
          const allEffects = Object.keys(TEAM_EFFECTS).filter((k) => k !== 'randomBoost');
          const shuffled = allEffects.sort(() => Math.random() - 0.5);
          for (let i = 0; i < 2 && i < shuffled.length; i++) {
            TEAMS[teamName].addTeamEffect(shuffled[i], Infinity);
          }
        }
        logMatch(teamName, `Staff Picks: ${teamName} hired coach ${coach.name} (${coach.nationality}).`);
      } else {
        if (!wcPendingCoaches) wcPendingCoaches = {};
        wcPendingCoaches[teamName] = coach;
      }
      if (!wcOwnedCoaches[teamName]) wcOwnedCoaches[teamName] = [];
      wcOwnedCoaches[teamName].push(coach);
      coachWrap.remove();
      subtitle.remove();
      callback();
    });
    coachWrap.appendChild(coachEl);
  }

  content.appendChild(coachWrap);

  modal.appendChild(content);
  wcAddTeamFlagBadge(modal, teamName);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  function close() {
    overlay.remove();
  }

  return { overlay, modal, content, close };
}

function wcDeckReshuffle(teamName, callback) {
  const team = TEAMS[teamName];
  if (!team) { callback(); return; }

  const oldSize = team.actions.length;
  const baseDeck = StartingDeck.build(team.startingDeck || 'basic');
  StartingDeck.expand(baseDeck, team.extraActions || {});
  const targetSize = oldSize;
  const picksNeeded = Math.max(0, targetSize - baseDeck.length);

  if (picksNeeded <= 0) {
    team.actions = baseDeck;
    team.availableActions = [...baseDeck];
    team.discardedActions = [];
    callback();
    return;
  }

  let picksRemaining = picksNeeded;

  function showPickModal() {
    const pool = CARD_TYPES.filter((Ctor) => {
      if (typeof Ctor !== 'function') return false;
      try { new Ctor(); return true; } catch { return false; }
    });
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const choices = shuffled.slice(0, 3).map((Ctor) => new Ctor());

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    const modal = document.createElement('div');
    modal.className = 'wc-modal shot-modal halftime-modal event-phase-modal';
    const content = document.createElement('div');
    content.className = 'shot-modal-content halftime-content';

    const title = document.createElement('div');
    title.className = 'halftime-title';
    title.textContent = `Choose a card (${picksRemaining} remaining)`;
    content.appendChild(title);

    const desc = document.createElement('div');
    desc.className = 'halftime-kickoff';
    desc.textContent = 'Pick one card to add to your new deck.';
    content.appendChild(desc);

    const optionsWrap = document.createElement('div');
    optionsWrap.className = 'event-phase-options';

    for (const card of choices) {
      const btn = document.createElement('button');
      btn.className = 'event-phase-option';
      btn.innerHTML =
        `<div class="event-option-label">${card.name || 'Unknown Card'}</div>` +
        `<div class="event-option-desc">${card.description || ''}</div>`;
      btn.addEventListener('click', () => {
        baseDeck.push(card);
        overlay.remove();
        picksRemaining--;
        if (picksRemaining > 0) {
          showPickModal();
        } else {
          team.actions = baseDeck;
          team.availableActions = [...baseDeck];
          team.discardedActions = [];
          callback();
        }
      });
      optionsWrap.appendChild(btn);
    }

    content.appendChild(optionsWrap);
    modal.appendChild(content);
    wcAddTeamFlagBadge(modal, teamName);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  showPickModal();
}

function wcUnusedCoaches(teamName) {
  const owned = new Set();
  if (wcOwnedCoaches[teamName]) {
    for (const c of wcOwnedCoaches[teamName]) owned.add(c);
  }
  if (TEAMS && TEAMS[teamName] && Array.isArray(TEAMS[teamName].coaches)) {
    for (const c of TEAMS[teamName].coaches) owned.add(c);
  }
  if (wcPendingCoaches && wcPendingCoaches[teamName]) owned.add(wcPendingCoaches[teamName]);
  return COACHES.filter((c) => !owned.has(c));
}

function wcMaybeAwardCoach(m) {
  if (!m || m.homeScore === undefined || m.awayScore === undefined) return null;
  const humans = [m.home, m.away].filter(
    (t) => wcControllerForTeam(t).type === 'human'
  );
  if (humans.length === 0) return null;

  const rows = [
    { team: m.home, gf: m.homeScore, ga: m.awayScore },
    { team: m.away, gf: m.awayScore, ga: m.homeScore },
  ];
  for (const r of rows) {
    wcCleanSheetStreak[r.team] = r.ga === 0 ? (wcCleanSheetStreak[r.team] || 0) + 1 : 0;
  }

  for (const t of humans) {
    const row = rows.find((r) => r.team === t);
    const diff = row.gf - row.ga;
    const winBy3 = diff > 3;
    const scoreMore4 = row.gf > 4;
    const clean2 = (wcCleanSheetStreak[t] || 0) >= 2;
    const opponent = m.home === t ? m.away : m.home;
    const beatTop10 = diff > 0 && TEAMS[opponent] && TEAMS[opponent].level === 3;
    if (winBy3 || scoreMore4 || clean2 || beatTop10) {
      const pool = wcUnusedCoaches(t);
      if (pool.length === 0) return null;
      const coach = pool[Math.floor(Math.random() * pool.length)];
      if (!wcPendingCoaches) wcPendingCoaches = {};
      wcPendingCoaches[t] = coach;
      if (!wcOwnedCoaches[t]) wcOwnedCoaches[t] = [];
      wcOwnedCoaches[t].push(coach);
      const reason = beatTop10 ? `beating top-10 opponent ${opponent}` : 'performance';
      logMatch(t, `${reason} reward: ${t} attracts coach ${coach.name} (${coach.nationality}).`);
      return { teamName: t, coach };
    }
  }
  return null;
}

function wcAwardGroupStageCoaches() {
  if (worldCup.phase !== 'knockout' || worldCup.rounds.length !== 1) return null;
  const results = {};
  for (const g of worldCup.groups) {
    const st = computeGroupStandings(g);
    results[g.name] = { winner: st[0].team, runnerUp: st[1].team };
  }
  const qualified = new Set();
  for (const g of worldCup.groups) {
    qualified.add(results[g.name].winner);
    qualified.add(results[g.name].runnerUp);
  }
  for (const teamName of qualified) {
    if (wcControllerForTeam(teamName).type !== 'human') continue;
    const pool = wcUnusedCoaches(teamName);
    if (pool.length === 0) continue;
    const coach = pool[Math.floor(Math.random() * pool.length)];
    if (!wcPendingCoaches) wcPendingCoaches = {};
    wcPendingCoaches[teamName] = coach;
    if (!wcOwnedCoaches[teamName]) wcOwnedCoaches[teamName] = [];
    wcOwnedCoaches[teamName].push(coach);
    logMatch(teamName, `Group stage qualification: ${teamName} attracts coach ${coach.name} (${coach.nationality}).`);
    return { teamName, coach };
  }
  return null;
}

function wcShowKnockoutPreview() {
  wcGroupToKnockoutPending = false;
  const r32 = worldCup.rounds[0];
  const humanMatchups = [];
  for (const m of r32.matches) {
    const homeIsHuman = wcControllerForTeam(m.home).type === 'human';
    const awayIsHuman = wcControllerForTeam(m.away).type === 'human';
    if (homeIsHuman || awayIsHuman) {
      humanMatchups.push({ team: homeIsHuman ? m.home : m.away, opponent: homeIsHuman ? m.away : m.home, label: m.label });
    }
  }
  if (humanMatchups.length === 0) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  const modal = document.createElement('div');
  modal.className = 'wc-modal shot-modal halftime-modal wc-ko-preview-modal';

  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent = 'Knockout Stage';
  modal.appendChild(title);

  const subtitle = document.createElement('div');
  subtitle.className = 'halftime-kickoff';
  subtitle.textContent = 'Round of 32';
  modal.appendChild(subtitle);

  function renderAll(idx) {
    if (idx >= humanMatchups.length) return;
    const m = humanMatchups[idx];
    const matchup = document.createElement('div');
    matchup.className = 'wc-ko-preview-matchup';
    matchup.innerHTML = `${wcTeamName(m.team)} <span class="wc-ko-preview-vs">VS</span> ${wcTeamName(m.opponent)}`;
    modal.appendChild(matchup);

    const label = document.createElement('div');
    label.className = 'wc-result-pens';
    label.textContent = `Match ${m.label}`;
    modal.appendChild(label);

    if (idx + 1 < humanMatchups.length) {
      const spacer = document.createElement('div');
      spacer.style.height = '12px';
      modal.appendChild(spacer);
      renderAll(idx + 1);
    }
  }
  renderAll(0);

  const doneBtn = document.createElement('button');
  doneBtn.className = 'shot-modal-close';
  doneBtn.textContent = 'Continue';
  doneBtn.addEventListener('click', close);
  modal.appendChild(doneBtn);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  function close() {
    document.removeEventListener('keydown', onKey);
    overlay.remove();
  }
  function onKey(e) {
    if (e.key === 'Escape' || e.key === 'Enter') close();
  }
  document.addEventListener('keydown', onKey);
}

function wcShowEventResultModal(teamName, { transformed, removedCards, newHolds }, callback) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'wc-modal shot-modal halftime-modal event-phase-modal';

  const content = document.createElement('div');
  content.className = 'shot-modal-content halftime-content';

  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent = 'Result';
  content.appendChild(title);

  if (transformed.length > 0) {
    const sub = document.createElement('div');
    sub.className = 'event-result-subtitle';
    sub.textContent = 'Transformed:';
    content.appendChild(sub);
    for (const t of transformed) {
      const row = document.createElement('div');
      row.className = 'event-result-row';
      const fromChip = document.createElement('span');
      fromChip.className = 'event-result-chip removed';
      fromChip.textContent = t.fromCard.name;
      const arrow = document.createElement('span');
      arrow.className = 'event-result-arrow';
      arrow.textContent = '→';
      row.appendChild(fromChip);
      row.appendChild(arrow);
      row.appendChild(createActionCard(t.toCard));
      content.appendChild(row);
    }
  }

  if (removedCards.length > 0) {
    const sub = document.createElement('div');
    sub.className = 'event-result-subtitle';
    sub.textContent = 'Removed from your deck:';
    content.appendChild(sub);
    const row = document.createElement('div');
    row.className = 'event-result-row';
    for (const c of removedCards) {
      const chip = document.createElement('span');
      chip.className = 'event-result-chip removed';
      chip.textContent = c.name;
      row.appendChild(chip);
    }
    content.appendChild(row);
  }

  if (newHolds.length > 0) {
    const sub = document.createElement('div');
    sub.className = 'event-result-subtitle';
    sub.textContent = 'Permanently held from now on:';
    content.appendChild(sub);
    const row = document.createElement('div');
    row.className = 'event-result-row';
    for (const n of newHolds) {
      const chip = document.createElement('span');
      chip.className = 'event-result-chip held';
      chip.textContent = n;
      row.appendChild(chip);
    }
    content.appendChild(row);
  }

  const doneBtn = document.createElement('button');
  doneBtn.className = 'shot-modal-close';
  doneBtn.textContent = 'Continue';
  doneBtn.addEventListener('click', close);
  content.appendChild(doneBtn);

  modal.appendChild(content);
  wcAddTeamFlagBadge(modal, teamName);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  function close() {
    document.removeEventListener('keydown', onKey);
    overlay.remove();
    if (callback) callback();
  }
  function onKey(e) {
    if (e.key === 'Escape' || e.key === 'Enter') close();
  }
  document.addEventListener('keydown', onKey);
}

function wcShowCardRewardModal(teamName, cards, callback) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'wc-modal shot-modal halftime-modal event-phase-modal';

  const content = document.createElement('div');
  content.className = 'shot-modal-content halftime-content';

  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent = cards.length === 1 ? 'New Card' : 'New Cards';
  content.appendChild(title);

  const subtitle = document.createElement('div');
  subtitle.className = 'halftime-kickoff';
  subtitle.textContent = `Added to ${teamName}'s deck:`;
  content.appendChild(subtitle);

  const cardsRow = document.createElement('div');
  cardsRow.className = 'event-result-row';
  for (const card of cards) {
    cardsRow.appendChild(createActionCard(card));
  }
  content.appendChild(cardsRow);

  const doneBtn = document.createElement('button');
  doneBtn.className = 'shot-modal-close';
  doneBtn.textContent = 'Great';
  doneBtn.addEventListener('click', close);
  content.appendChild(doneBtn);

  modal.appendChild(content);
  wcAddTeamFlagBadge(modal, teamName);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  function close() {
    document.removeEventListener('keydown', onKey);
    overlay.remove();
    if (callback) callback();
  }
  function onKey(e) {
    if (e.key === 'Escape' || e.key === 'Enter') close();
  }
  document.addEventListener('keydown', onKey);
}

function wcShowCoachJoinedModal(teamName, coach, callback) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'wc-modal shot-modal halftime-modal wc-result-modal';

  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent = 'New Coach';
  modal.appendChild(title);

  const subtitle = document.createElement('div');
  subtitle.className = 'halftime-kickoff';
  subtitle.textContent = `Your performance attracted a new coach to ${teamName}:`;
  modal.appendChild(subtitle);

  const coachEl = document.createElement('div');
  coachEl.className = `training-card rarity-${coach.effects.length > 1 ? 2 : 1}`;
  coachEl.innerHTML =
    `<div class="training-card-name">${coach.name}</div>` +
    `<div class="training-card-desc">${coach.nationality} — ${coach.explanation}</div>` +
    `<div class="training-card-rarity">${coach.effects.map((e) => TEAM_EFFECTS[e]?.label || e).join(', ')}</div>`;
  modal.appendChild(coachEl);

  const note = document.createElement('div');
  note.className = 'halftime-note';
  note.textContent = 'The coach will join your staff for the next match.';
  modal.appendChild(note);

  const doneBtn = document.createElement('button');
  doneBtn.className = 'shot-modal-close';
  doneBtn.textContent = 'Great';
  doneBtn.addEventListener('click', close);
  modal.appendChild(doneBtn);

  overlay.appendChild(modal);
  wcAddTeamFlagBadge(modal, teamName);
  document.body.appendChild(overlay);

  function close() {
    document.removeEventListener('keydown', onKey);
    overlay.remove();
    if (callback) callback();
  }
  function onKey(e) {
    if (e.key === 'Escape' || e.key === 'Enter') close();
  }
  document.addEventListener('keydown', onKey);
}

function wcShowEventPhaseModal(teamName, event, callback, eventIndex, eventTotal) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'wc-modal shot-modal halftime-modal event-phase-modal';

  const content = document.createElement('div');
  content.className = 'shot-modal-content halftime-content';

  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent = 'Event Phase';
  content.appendChild(title);

  if (eventIndex && eventTotal) {
    const progress = document.createElement('div');
    progress.className = 'event-phase-progress';
    progress.textContent = `Event ${eventIndex} of ${eventTotal}`;
    content.appendChild(progress);
  }

  const eventTitle = document.createElement('div');
  eventTitle.className = 'event-phase-title';
  eventTitle.textContent = event.title;
  content.appendChild(eventTitle);

  const desc = document.createElement('div');
  desc.className = 'halftime-kickoff';
  desc.textContent = event.description;
  content.appendChild(desc);

  const optionsWrap = document.createElement('div');
  optionsWrap.className = 'event-phase-options';

  const options = event.options(teamName);
  for (const opt of options) {
    const btn = document.createElement('button');
    btn.className = 'event-phase-option';
    btn.innerHTML =
      `<div class="event-option-label">${opt.label}</div>` +
      (opt.description ? `<div class="event-option-desc">${opt.description}</div>` : '');
    btn.addEventListener('click', () => {
      const hadCoach = !!(wcPendingCoaches && wcPendingCoaches[teamName]);
      const beforeCards = wcTrainingCards && wcTrainingCards[teamName]
        ? wcTrainingCards[teamName].slice() : [];
      const beforeHolds = wcPermanentHolds && wcPermanentHolds[teamName]
        ? wcPermanentHolds[teamName].slice() : [];

      const customResult = opt.execute();

      const hasNewCoach = !hadCoach && wcPendingCoaches && wcPendingCoaches[teamName];
      const newCoach = hasNewCoach ? wcPendingCoaches[teamName] : null;

      const afterCards = wcTrainingCards && wcTrainingCards[teamName]
        ? wcTrainingCards[teamName] : [];
      let addedCards = afterCards.filter((c) => !beforeCards.includes(c));
      let removedCards = beforeCards.filter((c) => !afterCards.includes(c));
      const newHolds = (wcPermanentHolds && wcPermanentHolds[teamName]
        ? wcPermanentHolds[teamName] : []).filter((n) => !beforeHolds.includes(n));

      const transformed = Array.isArray(customResult && customResult.transformed)
        ? customResult.transformed.filter((t) => t && t.fromCard && t.toCard) : [];
      for (const t of transformed) {
        addedCards = addedCards.filter((c) => c !== t.toCard);
        removedCards = removedCards.filter((c) => c !== t.fromCard);
      }

      optionsWrap.remove();
      desc.remove();
      eventTitle.remove();

      function afterRewards() {
        if (wcPendingDeckReshuffle) {
          const reshuffle = wcPendingDeckReshuffle;
  wcPendingDeckReshuffle = null;
  wcMyTeamSelected = null;
  wcSelectedFormation = null;
  wcPendingLineup = {};
  wcPendingFormationCoords = {};
          wcDeckReshuffle(reshuffle.teamName, callback);
        } else {
          callback();
        }
      }

      function showAddedThen(next) {
        if (addedCards.length > 0) {
          wcShowCardRewardModal(teamName, addedCards, next);
        } else {
          next();
        }
      }

      function showChangesThen() {
        const hasChanges = transformed.length > 0 || removedCards.length > 0 || newHolds.length > 0;
        if (hasChanges) {
          wcShowEventResultModal(teamName, { transformed, removedCards, newHolds }, () => {
            if (newCoach) {
              wcShowCoachJoinedModal(teamName, newCoach, showAddedThen(afterRewards));
            } else {
              showAddedThen(afterRewards);
            }
          });
        } else if (newCoach) {
          wcShowCoachJoinedModal(teamName, newCoach, showAddedThen(afterRewards));
        } else {
          showAddedThen(afterRewards);
        }
      }

      showChangesThen();
    });
    optionsWrap.appendChild(btn);
  }

  if (options.length === 0) {
    const skipBtn = document.createElement('button');
    skipBtn.className = 'shot-modal-close';
    skipBtn.textContent = 'Continue';
    skipBtn.addEventListener('click', () => {
      optionsWrap.remove();
      desc.remove();
      eventTitle.remove();
      callback();
    });
    optionsWrap.appendChild(skipBtn);
  }

  content.appendChild(optionsWrap);
  modal.appendChild(content);
  wcAddTeamFlagBadge(modal, teamName);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  function close() {
    document.removeEventListener('keydown', onKey);
    overlay.remove();
  }
  function onKey(e) {
    if (e.key === 'Escape') close();
  }
  document.addEventListener('keydown', onKey);

  return { close };
}

function wcAllMatches() {
  const matches = [];
  for (const g of worldCup.groups) for (const m of g.matches) matches.push(m);
  for (const r of worldCup.rounds) for (const m of r.matches) matches.push(m);
  return matches;
}

const WC_STAGE_WEIGHTS = {
  'Group · MD1': 1.0,
  'Group · MD2': 1.15,
  'Group · MD3': 1.3,
  'Round of 32': 1.5,
  'Round of 16': 1.8,
  'Quarter-finals': 2.1,
  'Semi-finals': 2.5,
  'Third-place match': 2.0,
  'Final': 3.0,
};

function wcStageKey(m) {
  if (!m) return 'Group · MD1';
  if (m.matchday !== undefined) return `Group · MD${m.matchday}`;
  const round = (worldCup.rounds || []).find((r) => r.matches.includes(m));
  return round ? round.name : 'Group · MD1';
}

function wcStageWeight(m) {
  return WC_STAGE_WEIGHTS[wcStageKey(m)] || 1.0;
}

function wcTeamAggregateStats() {
  const rows = {};
  for (const name of TEAM_NAMES) {
    rows[name] = {
      team: name,
      P: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, Pts: 0,
      possession: 0, shots: 0, fouls: 0, recoveries: 0, passes: 0, assists: 0,
    };
  }
  for (const m of wcAllMatches()) {
    if (!m.played || !m.stats) continue;
    const hs = m.stats[m.home];
    const as = m.stats[m.away];
    if (!hs || !as) continue;
    const h = rows[m.home];
    const a = rows[m.away];
    h.P++;
    a.P++;
    h.GF += m.homeScore;
    h.GA += m.awayScore;
    a.GF += m.awayScore;
    a.GA += m.homeScore;
    if (m.homeScore > m.awayScore) {
      h.W++; h.Pts += 3; a.L++;
    } else if (m.homeScore < m.awayScore) {
      a.W++; a.Pts += 3; h.L++;
    } else {
      h.D++; a.D++; h.Pts += 1; a.Pts += 1;
    }
    for (const [row, s] of [[h, hs], [a, as]]) {
      row.possession += s.possession;
      row.shots += s.shots;
      row.fouls += s.fouls;
      row.recoveries += s.recoveries;
      row.passes += s.passes;
      row.assists += s.assists;
    }
  }
  const totalPossession = Object.values(rows).reduce((sum, r) => sum + r.possession, 0);
  for (const name of TEAM_NAMES) {
    rows[name].GD = rows[name].GF - rows[name].GA;
    rows[name].possessionPct =
      totalPossession === 0 ? 0 : Math.round((rows[name].possession / totalPossession) * 100);
  }
  return Object.values(rows)
    .filter((r) => r.P > 0)
    .sort((x, y) => {
      if (y.Pts !== x.Pts) return y.Pts - x.Pts;
      if (y.GD !== x.GD) return y.GD - x.GD;
      return y.GF - x.GF;
    });
}

function renderWcStandings() {
  const wrap = document.createElement('div');
  wrap.className = 'wc-stats-view';

  const note = document.createElement('div');
  note.className = 'wc-stats-note';
  note.textContent = 'Aggregate results and match statistics across every World Cup match so far.';
  wrap.appendChild(note);

  const scroll = document.createElement('div');
  scroll.className = 'wc-table-scroll';
  const table = document.createElement('table');
  table.className = 'wc-stats-table';
  table.innerHTML =
    '<thead><tr>' +
    '<th>#</th><th>Team</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th><th>Pts</th>' +
    '<th class="sep">Poss%</th><th>Shots</th><th>Fouls</th><th>Recoveries</th><th>Passes</th><th>Assists</th>' +
    '</tr></thead>';
  const tbody = document.createElement('tbody');
  const rows = wcTeamAggregateStats();
  if (rows.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 16;
    td.textContent = 'No matches played yet — stats will appear here as matches finish.';
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
  rows.forEach((r, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML =
      `<td>${idx + 1}</td>` +
      `<td class="wc-team">${wcTeamName(r.team)}</td>` +
      `<td>${r.P}</td><td>${r.W}</td><td>${r.D}</td><td>${r.L}</td>` +
      `<td>${r.GF}</td><td>${r.GA}</td><td>${r.GD > 0 ? '+' + r.GD : r.GD}</td><td>${r.Pts}</td>` +
      `<td class="sep">${r.possessionPct}%</td>` +
      `<td>${r.shots}</td><td>${r.fouls}</td><td>${r.recoveries}</td><td>${r.passes}</td><td>${r.assists}</td>`;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  scroll.appendChild(table);
  wrap.appendChild(scroll);
  return wrap;
}

function wcTopPlayersAggregate() {
  const agg = {};
  const keyFor = (ps, name) => `${ps.team || '?'}||${name || '?'}`;
  for (const m of wcAllMatches()) {
    if (!m.played || !m.playerStats) continue;
    for (const name of Object.keys(m.playerStats)) {
      const ps = m.playerStats[name];
      const key = keyFor(ps, name);
      if (!agg[key]) {
        let age = typeof ps.age === 'number' ? ps.age : null;
        if (typeof age !== 'number') {
          const squad = (ps.team && TEAMS[ps.team] && TEAMS[ps.team].squad) || [];
          const player = squad.find((p) => p.name === name || p.name === ps.name);
          age = player ? player.age : null;
        }
        agg[key] = {
          name: ps.name || name,
          team: ps.team,
          age,
          matches: 0,
          goals: 0, weightedGoals: 0, assists: 0, shots: 0, passes: 0, recoveries: 0, fouls: 0, saves: 0, motm: 0,
        };
      }
      const t = agg[key];
      const weight = wcStageWeight(m);
      t.matches += 1;
      t.goals += ps.goals;
      t.weightedGoals += (ps.goals || 0) * weight;
      t.assists += (ps.assists || 0) * weight;
      t.shots += (ps.shots || 0) * weight;
      t.passes += (ps.passes || 0) * weight;
      t.recoveries += (ps.recoveries || 0) * weight;
      t.fouls += (ps.fouls || 0) * weight;
      t.saves += (ps.saves || 0) * weight;
    }
  }
  for (const m of wcAllMatches()) {
    if (!m.played || !m.playerStats) continue;
    const motm = pickPlayerOfTheMatch(m.playerStats);
    if (!motm || !motm.name) continue;
    const entry = agg[`${motm.team || '?'}||${motm.name}`];
    if (entry) entry.motm += 1;
  }
  return Object.values(agg);
}

function renderWcTopTable(container) {
  container.innerHTML = '';
  const table = document.createElement('table');
  table.className = 'wc-stats-table wc-top-table';
  table.innerHTML =
    '<thead><tr><th>#</th><th>Player</th><th>Team</th><th>Matches</th><th>' +
    (WC_TOP_CATEGORIES.find(([k]) => k === wcTopCategory) || [])[1] +
    '</th></tr></thead>';
  const tbody = document.createElement('tbody');
  const players = wcTopPlayersAggregate().sort(
    (a, b) => b[wcTopCategory] - a[wcTopCategory]
  );
  const top = players.slice(0, 20);
  if (top.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 5;
    td.textContent = 'No player stats recorded yet.';
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
  top.forEach((p, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML =
      `<td>${idx + 1}</td>` +
      `<td class="wc-team">${p.name}</td>` +
      `<td>${wcTeamName(p.team) || '—'}</td>` +
      `<td>${p.matches || 0}</td>` +
      `<td>${p[wcTopCategory]}</td>`;
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);
}

function renderWcTopPlayers() {
  const wrap = document.createElement('div');
  wrap.className = 'wc-top-players-view';

  const categories = [
    { key: 'goals', label: 'Scorers', unit: 'Goals', icon: '⚽' },
    { key: 'rating', label: 'Ratings', unit: 'Rating', icon: '⭐' },
    { key: 'assists', label: 'Assists', unit: 'Assists', icon: '🎯' },
    { key: 'cleanSheets', label: 'Clean Sheets', unit: 'Shutouts', icon: '🧤' },
    { key: 'cards', label: 'Cards', unit: 'Cards', icon: '🟨' },
    { key: 'mySquad', label: 'My Squad', unit: 'Rating', icon: '👥' }
  ];

  const humanTeams = TEAM_NAMES.filter((name) => wcControllerForTeam(name).type === 'human');
  const myTeam = humanTeams[0];

  wrap.innerHTML = `
    <div class="wc-top-header">
      <div class="wc-top-tabs" role="tablist"></div>
    </div>
    <div class="wc-top-body">
      <div class="wc-top-main" role="tabpanel"></div>
      <aside class="wc-top-side"></aside>
    </div>
  `;

  const tabsEl = wrap.querySelector('.wc-top-tabs');
  const mainEl = wrap.querySelector('.wc-top-main');
  const sideEl = wrap.querySelector('.wc-top-side');

  categories.forEach((cat, idx) => {
    const btn = document.createElement('button');
    btn.className = 'wc-top-tab' + (idx === 0 ? ' active' : '');
    btn.dataset.key = cat.key;
    btn.role = 'tab';
    btn.ariaSelected = idx === 0;
    btn.textContent = cat.label;
    btn.addEventListener('click', () => {
      wcTopCategory = cat.key;
      tabsEl.querySelectorAll('.wc-top-tab').forEach(b => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn);
      });
      renderWcTopTable(mainEl, cat, myTeam);
      renderWcTopSide(sideEl, cat, myTeam);
    });
    tabsEl.appendChild(btn);
  });

  // Initial render
  renderWcTopTable(mainEl, categories[0], myTeam);
  renderWcTopSide(sideEl, categories[0], myTeam);

  return wrap;
}

function renderWcTopTable(container, category, myTeam) {
  const players = wcTopPlayersAggregate();
  
  // Filter for my squad category
  let sorted = [...players];
  if (category.key === 'mySquad' && myTeam) {
    sorted = players.filter(p => p.team === myTeam);
  } else {
    sorted.sort((a, b) => (b[category.key] || 0) - (a[category.key] || 0));
  }
  
  const top = sorted.slice(0, 10);
  const leaderValue = top[0] ? (top[0][category.key] || 0) : 0;

  container.innerHTML = `
    <table class="wc-top-table">
      <thead>
        <tr>
          <th class="wc-col-rank">#</th>
          <th class="wc-col-player">Player</th>
          <th class="wc-col-team">Team</th>
          <th class="wc-col-bar">Share</th>
          <th class="wc-col-value">${category.label}</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  const tbody = container.querySelector('tbody');
  
  for (let i = 0; i < top.length; i++) {
    const p = top[i];
    const isMe = myTeam && p.team === myTeam;
    const value = p[category.key] || 0;
    const sharePct = leaderValue > 0 ? Math.round((value / leaderValue) * 100) : 0;
    const rankClass = i === 0 ? 'gold' : i < 3 ? 'medal' : '';
    
    const posDisc = p.position ? `<span class="wc-pos-disc ${p.position.toLowerCase()}">${p.position}</span>` : '';
    
    const tr = document.createElement('tr');
    if (isMe) tr.classList.add('you');
    tr.innerHTML = `
      <td class="wc-col-rank"><span class="wc-rank ${rankClass}">${i + 1}</span></td>
      <td class="wc-col-player">${posDisc}<span class="wc-player-name">${p.name}</span>${isMe ? ' <span class="wc-you-badge">You</span>' : ''}</td>
      <td class="wc-col-team"><span class="wc-team-name">${wcTeamName(p.team) || '—'}</span></td>
      <td class="wc-col-bar"><div class="wc-share-bar"><div class="wc-share-fill" style="width:${sharePct}%"></div></div></td>
      <td class="wc-col-value">${value} ${category.unit}</td>
    `;
    tbody.appendChild(tr);
  }
}

function renderWcTopSide(container, category, myTeam) {
  const players = wcTopPlayersAggregate();
  const sorted = [...players].sort((a, b) => (b[category.key] || 0) - (a[category.key] || 0));
  const leader = sorted[0];
  
  let sideContent = '';
  
  if (leader) {
    const note = getLeaderNote(leader, category);
    sideContent += `
      <div class="wc-leader-card">
        <h3 class="wc-leader-title">${category.label} Leader</h3>
        <div class="wc-leader-info">
          <span class="wc-leader-name">${leader.name}</span>
          <span class="wc-leader-team">${wcTeamName(leader.team)}</span>
          <span class="wc-leader-value">${leader[category.key] || 0} ${category.unit}</span>
        </div>
        <p class="wc-leader-note">${note}</p>
      </div>
    `;
  }
  
  // Secondary panel per tab
  if (category.key === 'cards') {
    sideContent += renderWcSuspensionWatch();
  } else if (category.key === 'goals') {
    sideContent += renderWcLeadingScorers();
  }
  
  // My squad best in this category
  if (myTeam) {
    const myPlayers = players.filter(p => p.team === myTeam)
      .sort((a, b) => (b[category.key] || 0) - (a[category.key] || 0))
      .slice(0, 3);
    
    if (myPlayers.length > 0) {
      sideContent += `
        <div class="wc-my-best">
          <h4 class="wc-my-best-title">${myTeam}'s best</h4>
          <ul class="wc-my-best-list">
            ${myPlayers.map((p, i) => `<li><span class="wc-my-best-rank">${i + 1}</span><span class="wc-my-best-name">${p.name}</span><span class="wc-my-best-val">${p[category.key] || 0}</span></li>`).join('')}
          </ul>
        </div>
      `;
    }
  }
  
  container.innerHTML = sideContent;
}

function getLeaderNote(player, category) {
  const notes = {
    goals: `${player.name} leads the tournament with ${player.goals} goal${player.goals !== 1 ? 's' : ''}.`,
    rating: `${player.name} averages ${player.rating} per match.`,
    assists: `${player.name} has created ${player.assists} goal${player.assists !== 1 ? 's' : ''}.`,
    cleanSheets: `${player.name} kept ${player.cleanSheets} clean sheet${player.cleanSheets !== 1 ? 's' : ''}.`,
    cards: `${player.name} has picked up ${player.cards} card${player.cards !== 1 ? 's' : ''}.`
  };
  return notes[category.key] || '';
}

function renderWcSuspensionWatch() {
  // Players with 2+ yellow cards
  const players = wcTopPlayersAggregate().filter(p => (p.cards || 0) >= 2);
  if (players.length === 0) return '<div class="wc-side-empty">No suspension risks</div>';
  
  return `
    <div class="wc-side-panel">
      <h4 class="wc-side-title">Suspension watch</h4>
      <ul class="wc-side-list">
        ${players.slice(0, 5).map(p => `<li><span>${p.name}</span><span class="wc-cards-count">${p.cards} cards</span></li>`).join('')}
      </ul>
    </div>
  `;
}

function renderWcLeadingScorers() {
  const players = wcTopPlayersAggregate().sort((a, b) => (b.goals || 0) - (a.goals || 0)).slice(0, 5);
  return `
    <div class="wc-side-panel">
      <h4 class="wc-side-title">Leading scorers</h4>
      <ul class="wc-side-list">
        ${players.map(p => `<li><span>${p.name}</span><span>${p.goals || 0}</span></li>`).join('')}
      </ul>
    </div>
  `;
}

function wcAwardScore(p) {
  return (
    (p.weightedGoals || 0) * 5 +
    (p.assists || 0) * 4 +
    (p.recoveries || 0) * 2 +
    (p.saves || 0) * 1 +
    (p.passes || 0) * 0.5
  );
}

function wcComputeAwards() {
  const players = wcTopPlayersAggregate();
  if (players.length === 0) return null;

  const pickTop = (sortFn) => {
    const sorted = [...players].sort(sortFn);
    return sorted[0] || null;
  };

  const goldBoot = pickTop(
    (a, b) =>
      (b.weightedGoals || 0) - (a.weightedGoals || 0) ||
      (b.assists || 0) - (a.assists || 0) ||
      a.matches - b.matches
  );
  const goldBall = pickTop(
    (a, b) =>
      wcAwardScore(b) - wcAwardScore(a) ||
      (b.weightedGoals || 0) - (a.weightedGoals || 0)
  );
  const goldGlove = pickTop(
    (a, b) =>
      b.saves - a.saves ||
      b.matches - a.matches
  );
  const youngPlayers = players.filter((p) => typeof p.age === 'number' && p.age < 21);
  const youngPlayer = youngPlayers.length
    ? [...youngPlayers].sort(
        (a, b) => wcAwardScore(b) - wcAwardScore(a) || (b.weightedGoals || 0) - (a.weightedGoals || 0)
      )[0]
    : null;

  return { goldBoot, goldBall, goldGlove, youngPlayer };
}

function wcShowChampionModal() {
  const awards = wcComputeAwards();
  if (!worldCup || !worldCup.champion) return;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'wc-modal shot-modal halftime-modal wc-champion-modal';
  modal.setAttribute('role', 'dialog');

  const title = document.createElement('div');
  title.className = 'wc-champion-title';
  title.textContent = `🏆 ${worldCup.champion} are World Cup 2026 champions!`;
  modal.appendChild(title);

  const sub = document.createElement('div');
  sub.className = 'wc-champion-sub';
  sub.textContent = 'Congratulations on lifting the trophy.';
  modal.appendChild(sub);

  if (awards) {
    const awardsTitle = document.createElement('div');
    awardsTitle.className = 'wc-awards-title';
    awardsTitle.textContent = 'Individual Awards';
    modal.appendChild(awardsTitle);

    const list = document.createElement('div');
    list.className = 'wc-awards';
    const awardLine = (label, p) => {
      const row = document.createElement('div');
      row.className = 'wc-award-row';
      const left = document.createElement('span');
      left.className = 'wc-award-label';
      left.textContent = label;
      const right = document.createElement('span');
      right.className = 'wc-award-winner';
      right.textContent = p ? `${p.name} (${p.team || '—'})` : '—';
      row.appendChild(left);
      row.appendChild(right);
      return row;
    };
    list.appendChild(awardLine('Golden Boot · Top scorer', awards.goldBoot));
    list.appendChild(awardLine('Golden Ball · Best player', awards.goldBall));
    list.appendChild(awardLine('Golden Glove · Best goalkeeper', awards.goldGlove));
    list.appendChild(awardLine('Young Player Award', awards.youngPlayer));
    modal.appendChild(list);
  }

  const doneBtn = document.createElement('button');
  doneBtn.className = 'shot-modal-close';
  doneBtn.textContent = 'Celebrate';
  doneBtn.addEventListener('click', close);
  modal.appendChild(doneBtn);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  function close() {
    document.removeEventListener('keydown', onKey);
    overlay.remove();
  }
  function onKey(e) {
    if (e.key === 'Escape' || e.key === 'Enter') close();
  }
  document.addEventListener('keydown', onKey);
}

function wcShowResultToast(m, onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'wc-modal shot-modal halftime-modal wc-result-modal';

  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent = m.label !== undefined ? `Match ${m.label} · Full time` : 'Full time';
  modal.appendChild(title);

  const scoreLine = document.createElement('div');
  scoreLine.className = 'halftime-score';
  scoreLine.textContent = `${wcTeamName(m.home)} ${m.homeScore} - ${m.awayScore} ${wcTeamName(m.away)}`;
  modal.appendChild(scoreLine);

  if (m.pen) {
    const penLine = document.createElement('div');
    penLine.className = 'wc-result-pens';
    penLine.textContent = `Penalties ${m.penHome} - ${m.penAway} · ${wcTeamName(m.winner)} advance`;
    modal.appendChild(penLine);
  } else if (m.label !== undefined && m.winner) {
    const winnerLine = document.createElement('div');
    winnerLine.className = 'wc-result-winner';
    winnerLine.textContent = `${wcTeamName(m.winner)} advance`;
    modal.appendChild(winnerLine);
  }

  if (m.playerStats) {
    const pomStats = pickPlayerOfTheMatch(m.playerStats);
    if (pomStats) {
      const pomEl = document.createElement('div');
      pomEl.className = 'player-of-match';
      const pomTeamLabel =
        pomStats.team && TEAMS[pomStats.team] ? TEAMS[pomStats.team].name : pomStats.team || '';
      pomEl.innerHTML =
        `<div class="pom-label">Player of the Match</div>` +
        `<div class="pom-name">${pomStats.name || '—'}</div>` +
        (pomTeamLabel ? `<div class="pom-team">${pomTeamLabel}</div>` : '');
      modal.appendChild(pomEl);
    }
  }

  const doneBtn = document.createElement('button');
  doneBtn.className = 'shot-modal-close';
  doneBtn.textContent = 'Continue';
  doneBtn.addEventListener('click', close);
  modal.appendChild(doneBtn);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  function close() {
    document.removeEventListener('keydown', onKey);
    overlay.remove();
    if (onClose) onClose();
  }
  function onKey(e) {
    if (e.key === 'Escape' || e.key === 'Enter') close();
  }
  document.addEventListener('keydown', onKey);
}

// ---- World Cup Save / Load modal ----

function openWcSaveLoadModal() {
  const modal = document.createElement('div');
  modal.className = 'shot-modal wc-setup-modal wc-save-modal';

  const title = document.createElement('div');
  title.className = 'shot-modal-label wc-setup-title';
  title.textContent = 'World Cup — Save / Load';
  modal.appendChild(title);

  const note = document.createElement('p');
  note.className = 'wc-setup-note';
  note.textContent = 'Saves are taken between matches. They restore the full tournament: bracket, teams, players, coaches, cards, buffs, penalties and formations.';
  modal.appendChild(note);

  const close = showModalOverlay(modal, { closeKeys: ['Escape'], closeOnOverlay: true });

  const saveRow = document.createElement('div');
  saveRow.className = 'wc-save-row wc-save-new';
  const saveInput = document.createElement('input');
  saveInput.className = 'wc-save-name-input';
  saveInput.placeholder = 'Save name…';
  const saveBtn = document.createElement('button');
  saveBtn.className = 'menu-btn primary';
  saveBtn.textContent = 'Save';
  saveRow.appendChild(saveInput);
  saveRow.appendChild(saveBtn);
  modal.appendChild(saveRow);

  const listEl = document.createElement('div');
  listEl.className = 'wc-save-list';
  modal.appendChild(listEl);

  const importBtn = document.createElement('button');
  importBtn.className = 'menu-btn';
  importBtn.textContent = 'Import JSON…';
  modal.appendChild(importBtn);

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json,application/json';
  fileInput.style.display = 'none';
  modal.appendChild(fileInput);

  function renderList() {
    listEl.innerHTML = '';
    const saves = WcSave.list();
    if (saves.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'wc-save-empty';
      empty.textContent = 'No saved World Cups yet.';
      listEl.appendChild(empty);
      return;
    }
    for (const s of saves) {
      const row = document.createElement('div');
      row.className = 'wc-save-row';

      const info = document.createElement('div');
      info.className = 'wc-save-info';
      const nameEl = document.createElement('div');
      nameEl.className = 'wc-save-name';
      nameEl.textContent = s.name;
      const meta = document.createElement('div');
      meta.className = 'wc-save-meta';
      meta.textContent = `${s.label} · ${new Date(s.savedAt).toLocaleString()}`;
      info.appendChild(nameEl);
      info.appendChild(meta);
      row.appendChild(info);

      const actions = document.createElement('div');
      actions.className = 'wc-save-actions';

      const loadBtn = document.createElement('button');
      loadBtn.className = 'menu-btn primary';
      loadBtn.textContent = 'Load';
      loadBtn.addEventListener('click', () => {
        const res = WcSave.load(s.name);
        if (res.ok) {
          close();
          const setupOverlay = document.getElementById('wc-setup-overlay');
          if (setupOverlay) setupOverlay.classList.add('hidden');
          showWorldCupScreen();
          renderWorldCupView();
          showToast(`Restored World Cup "${s.name}".`, 'info');
        } else {
          showToast(res.reason || 'Load failed.', 'error');
        }
      });
      actions.appendChild(loadBtn);

      const exportBtn = document.createElement('button');
      exportBtn.className = 'menu-btn';
      exportBtn.textContent = 'Export';
      exportBtn.addEventListener('click', () => {
        const json = WcSave.exportJSON(s.name);
        if (!json) {
          showToast('Export failed.', 'error');
          return;
        }
        wcDownloadSave(s.name, json);
      });
      actions.appendChild(exportBtn);

      const delBtn = document.createElement('button');
      delBtn.className = 'menu-btn';
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', () => {
        WcSave.remove(s.name);
        showToast(`Deleted "${s.name}".`, 'info');
        renderList();
      });
      actions.appendChild(delBtn);

      row.appendChild(actions);
      listEl.appendChild(row);
    }
  }

  saveBtn.addEventListener('click', () => {
    const name = saveInput.value.trim();
    if (!name) {
      showToast('Enter a name for the save.', 'error');
      return;
    }
    const res = WcSave.save(name);
    if (res.ok) {
      saveInput.value = '';
      showToast(`Saved as "${name}".`, 'info');
      renderList();
    } else {
      showToast(res.reason || 'Save failed.', 'error');
    }
  });

  importBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const res = WcSave.importJSON(String(reader.result));
      if (res.ok) {
        showToast(`Imported "${res.name}".`, 'info');
        renderList();
      } else {
        showToast(res.reason || 'Import failed.', 'error');
      }
    };
    reader.readAsText(file);
    fileInput.value = '';
  });

  renderList();
}

function openWcLoadModal() {
  const saves = WcSave.list();
  if (saves.length === 0) {
    showToast('No saved World Cups found.', 'info');
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'shot-modal wc-setup-modal wc-save-modal';

  const title = document.createElement('div');
  title.className = 'shot-modal-label wc-setup-title';
  title.textContent = 'Load World Cup';
  modal.appendChild(title);

  const note = document.createElement('p');
  note.className = 'wc-setup-note';
  note.textContent = 'Select a saved tournament to continue.';
  modal.appendChild(note);

  const close = showModalOverlay(modal, { closeKeys: ['Escape'], closeOnOverlay: true });

  const listEl = document.createElement('div');
  listEl.className = 'wc-save-list';
  modal.appendChild(listEl);

  for (const s of saves) {
    const row = document.createElement('div');
    row.className = 'wc-save-row';

    const info = document.createElement('div');
    info.className = 'wc-save-info';
    const nameEl = document.createElement('div');
    nameEl.className = 'wc-save-name';
    nameEl.textContent = s.name;
    const meta = document.createElement('div');
    meta.className = 'wc-save-meta';
    meta.textContent = `${s.label} · ${new Date(s.savedAt).toLocaleString()}`;
    info.appendChild(nameEl);
    info.appendChild(meta);
    row.appendChild(info);

    const actions = document.createElement('div');
    actions.className = 'wc-save-actions';

    const loadBtn = document.createElement('button');
    loadBtn.className = 'menu-btn primary';
    loadBtn.textContent = 'Load';
    loadBtn.addEventListener('click', () => {
      const res = WcSave.load(s.name);
      if (res.ok) {
        close();
        showWorldCupScreen();
        renderWorldCupView();
        showToast(`Restored World Cup "${s.name}".`, 'info');
      } else {
        showToast(res.reason || 'Load failed.', 'error');
      }
    });
    actions.appendChild(loadBtn);

    row.appendChild(actions);
    listEl.appendChild(row);
  }
}

function wcDownloadSave(name, json) {
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.replace(/[^a-z0-9-_ ]/gi, '_')}.wc-save.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
