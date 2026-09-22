// UI layer — extracted from app.js

const WIDTH = 9;
const HEIGHT = 7;

const pitch = document.getElementById('pitch');

for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.x = x;
    cell.dataset.y = y;
    if (x >= WIDTH - 2) cell.classList.add('shooting-zone');
    pitch.appendChild(cell);
  }
}

const pitchWrapper = document.getElementById('pitch-wrapper');
if (pitchWrapper) {
  const colTicks = document.createElement('div');
  colTicks.className = 'column-ticks';
  for (let x = 0; x < WIDTH; x++) {
    const tick = document.createElement('div');
    tick.className = 'column-tick';
    tick.textContent = String(x);
    colTicks.appendChild(tick);
  }
  pitchWrapper.insertBefore(colTicks, pitch);

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = WIDTH - 2; x < WIDTH; x++) {
      const cellEl = pitch.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
      if (!cellEl) continue;
      if (y !== Math.floor(HEIGHT / 2)) continue;
      const label = document.createElement('div');
      label.className = 'shooting-zone-label';
      label.textContent = 'SHOOT';
      cellEl.appendChild(label);
    }
  }
}

const marks = [
  { id: 'halfway-line', className: 'line' },
  { id: 'center-circle' },
  { id: 'center-spot' },
  { id: 'penalty-box-left', className: 'penalty-box' },
  { id: 'penalty-box-right', className: 'penalty-box' },
  { id: 'penalty-spot-left', className: 'penalty-spot' },
  { id: 'penalty-spot-right', className: 'penalty-spot' },
  { id: 'goal-left', className: 'goal' },
  { id: 'goal-right', className: 'goal' },
];

for (const mark of marks) {
  const el = document.createElement('div');
  el.id = mark.id;
  if (mark.className) el.className = mark.className;
  pitch.appendChild(el);
}

let TEAMS = null;
let ball = null;
let matchState = null;
let benchSlots = null;
let panelSlots = null;
let railSlots = null;
let handSlots = null;
let railPointSlots = null;
let railDeckSlots = null;
let game = null;
let gameOverModalShown = false;
let noticeOverlayActive = false;
let halftimeModalOpen = false;

function showNotice(text) {
  return new Promise((resolve) => {
    noticeOverlayActive = true;

    const overlay = document.createElement('div');
    overlay.className = 'game-notice-overlay';

    const bar = document.createElement('div');
    bar.className = 'game-notice-bar';

    const textEl = document.createElement('div');
    textEl.className = 'game-notice-text';
    textEl.textContent = text;
    bar.appendChild(textEl);
    overlay.appendChild(bar);

    document.body.appendChild(overlay);

    const cleanup = () => {
      overlay.remove();
      noticeOverlayActive = false;
      if (game) renderGame();
      resolve();
    };

    const slideEnd = () => {
      textEl.removeEventListener('animationend', slideEnd);
      setTimeout(() => {
        overlay.classList.add('notice-exit');
        const fadeEnd = () => {
          overlay.removeEventListener('animationend', fadeEnd);
          cleanup();
        };
        overlay.addEventListener('animationend', fadeEnd);
        setTimeout(fadeEnd, 400);
      }, 1000);
    };
    textEl.addEventListener('animationend', slideEnd);
    setTimeout(slideEnd, 500);
  });
}

// Shared modal helper: manages the dimming overlay and keyboard/overlay dismissal.
// Usage:
//   const close = showModalOverlay(modalElement, { onClose, closeKeys: ['Escape','Enter'], closeOnOverlay: true });
//   ... close(); // programmatically dismiss
function showModalOverlay(modalEl, { onClose, closeKeys = ['Escape'], closeOnOverlay = false } = {}) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.appendChild(modalEl);
  document.body.appendChild(overlay);

  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    document.removeEventListener('keydown', onKey);
    overlay.remove();
    if (onClose) onClose();
  };
  const onKey = (e) => {
    if (closeKeys.includes(e.key)) close();
  };
  document.addEventListener('keydown', onKey);
  if (closeOnOverlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
  }
  return close;
}

function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  switch (max) {
    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
    case g: h = ((b - r) / d + 2) / 6; break;
    case b: h = ((r - g) / d + 4) / 6; break;
  }
  return { h: h * 360, s, l };
}

function colorsClash(c1, c2) {
  const a = hexToHsl(c1), b = hexToHsl(c2);

  // Neutral colors (low saturation: white / black / grays) clash mainly by lightness.
  const aNeutral = a.s < 0.15;
  const bNeutral = b.s < 0.15;
  if (aNeutral || bNeutral) {
    const lightDiff = Math.abs(a.l - b.l);
    // Two neutral kits clash unless they are clearly light-vs-dark.
    if (lightDiff < 0.4) return true;
  }

  // Saturated colors clash when they share a similar hue.
  if (!aNeutral && !bNeutral) {
    const diff = Math.abs(a.h - b.h);
    return Math.min(diff, 360 - diff) < 30;
  }

  // A saturated color never clashes with an opposing neutral (light or dark).
  return false;
}

function pickDistinctKitColor(againstHex) {
  const against = hexToHsl(againstHex);
  const candidates = ['#e11d48', '#2563eb', '#16a34a', '#f59e0b', '#7c3aed', '#0d9488'];
  for (const hex of candidates) {
    if (!colorsClash(hex, againstHex)) return hex;
  }
  return against.s < 0.15 && against.l > 0.5 ? '#111827' : '#ffffff';
}


const cell = (x, y) => pitch.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);

function renderBench(teamName) {
  const team = TEAMS[teamName];
  const slot = benchSlots[teamName];
  if (!slot) return;
  for (const el of slot.querySelectorAll('.player-token')) {
    if (el._token && typeof el._token.destroy === 'function') el._token.destroy();
  }
  slot.innerHTML = '';

  const bench = document.createElement('div');
  bench.className = 'bench';

  const header = document.createElement('div');
  header.className = 'bench-header';
  header.style.color = team.primaryColor;
  header.textContent = `${team.name} · Reserves (${team.squad.length - team.currentPlayers.length})`;
  bench.appendChild(header);

  const reserves = document.createElement('div');
  reserves.className = 'bench-reserves';

  for (const player of team.squad) {
    if (team.currentPlayers.includes(player)) continue;
    const slotEl = document.createElement('div');
    if (player.injured || player.sentOff) {
      slotEl.className = 'bench-slot bench-slot-unavailable';
      slotEl.textContent = `${player.injured ? '🤕' : '🔴'} ${player.name}`;
      slotEl.title = player.injured
        ? `${player.name} is injured and cannot play this match.`
        : `${player.name} is suspended (sent off) and cannot play this match.`;
      reserves.appendChild(slotEl);
      continue;
    }
    slotEl.className = 'bench-slot';
    new PlayerToken({ player, teamColor: team.primaryColor, shorts: PlayerToken.shortsFor(team) }).placeIn(slotEl);
    reserves.appendChild(slotEl);
  }

  bench.appendChild(reserves);
  slot.appendChild(bench);
}

function logMatch(teamName, text, cls = '') {
  if (typeof window !== 'undefined' && window.verbose) {
    const minute = (game ? game.turn : 1) - 1;
    console.log(`${minute * 5}' [${teamName || 'Match'}] ${text}`);
  }
  const logEl = document.getElementById('match-log');
  if (!logEl) return;
  const minute = (game ? game.turn : 1) - 1;
  const entry = document.createElement('div');
  entry.className = `log-entry${cls ? ` log-${cls}` : ''}`;

  const stamp = document.createElement('span');
  stamp.className = 'log-minute';
  stamp.textContent = `${minute * 5}'`;

  const tag = document.createElement('span');
  tag.className = 'log-team';
  if (teamName && TEAMS[teamName]) tag.style.color = TEAMS[teamName].primaryColor;
  tag.textContent = teamName ? `[${teamName}]` : '[Match]';

  const textEl = document.createElement('span');
  textEl.className = 'log-text';
  textEl.textContent = text;

  entry.appendChild(stamp);
  entry.appendChild(tag);
  entry.appendChild(textEl);
  logEl.appendChild(entry);
  logEl.scrollTop = logEl.scrollHeight;
}

function isHumanGame() {
  if (!TEAMS) return false;
  return Object.values(TEAMS).some((t) => t.controller && t.controller.type === 'human');
}

function humanNotice(text) {
  if (isHumanGame()) return showNotice(text);
  return Promise.resolve();
}

function logAlert(msg) {
  logMatch('', msg, isHumanGame() ? 'error' : '');
  showToast(String(msg), 'error');
}

function showToast(text, kind) {
  try {
    let toast = document.getElementById('global-error-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-error-toast';
      toast.className = 'global-error-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    if (kind !== 'error') toast.classList.add('info');
    else toast.classList.remove('info');
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 5000);
  } catch (_) {}
}

function shakeScreen() {
  if (simulationMode || !isHumanGame()) return;
  document.body.classList.remove('screen-shake');
  void document.body.offsetWidth;
  document.body.classList.add('screen-shake');
  setTimeout(() => document.body.classList.remove('screen-shake'), 500);
}

function sparkleAt(x, y) {
  if (typeof simulationMode !== 'undefined' && simulationMode) return;
  if (!isHumanGame()) return;
  const cellEl = cell(x, y);
  if (!cellEl) return;
  const count = 8;
  for (let i = 0; i < count; i++) {
    const spark = document.createElement('div');
    spark.className = 'spark-particle';
    if (i % 3 === 0) spark.classList.add('spark-white');
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.9;
    const dist = 24 + Math.random() * 32;
    spark.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    spark.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
    spark.style.animationDelay = `${Math.random() * 90}ms`;
    cellEl.appendChild(spark);
    setTimeout(() => spark.remove(), 850);
  }
}

function celebrateGoal(teamName, scorerName, extra) {
  if (typeof simulationMode !== 'undefined' && simulationMode) return;
  if (!isHumanGame()) return;
  const team = TEAMS && TEAMS[teamName];
  const overlay = document.createElement('div');
  overlay.className = 'goal-celebration-overlay';

  const flash = document.createElement('div');
  flash.className = 'goal-flash';
  overlay.appendChild(flash);

  if (team && team.primaryColor) {
    overlay.style.setProperty('--flash', team.primaryColor);
  }

  const banner = document.createElement('div');
  banner.className = 'goal-banner';
  banner.textContent = 'GOAL!';
  const sub = document.createElement('small');
  sub.textContent = `${scorerName ? scorerName + ' · ' : ''}${teamName}${extra ? ' · ' + extra : ''}`;
  banner.appendChild(sub);
  overlay.appendChild(banner);

  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 1900);

  playGoalCelebration(teamName);
}

function playGoalCelebration(teamName) {
  return new Promise((resolve) => {
    if (!TEAMS || !ball) return resolve();
    const team = TEAMS[teamName];
    if (!team) return resolve();

    // let resetForRestart settle everyone into formation first
    setTimeout(() => {
      noticeOverlayActive = true;
      if (pitch) pitch.style.pointerEvents = 'none';

      const saved = [];
      for (const el of pitch.querySelectorAll('.player-token')) {
        const cellEl = el.closest('.cell');
        if (cellEl) saved.push([el, Number(cellEl.dataset.x), Number(cellEl.dataset.y)]);
      }

      const attackingX = team.side === 'left' ? WIDTH - 1 : 0;
      const goalY = Math.floor(HEIGHT / 2);
      const dancerCount = 4 + Math.floor(Math.random() * 5);
      const dancers = team.currentPlayers
        .map((p) => ({ p, el: tokenElForPlayer(p), pos: getPlayerCell(p) }))
        .filter((d) => d.el && d.pos)
        .sort(
          (a, b) =>
            Math.abs(a.pos.x - attackingX) +
            Math.abs(a.pos.y - goalY) -
            (Math.abs(b.pos.x - attackingX) +
              Math.abs(b.pos.y - goalY))
        )
        .slice(0, dancerCount);

      const corners = [
        [0, 0],
        [WIDTH - 1, 0],
        [0, HEIGHT - 1],
        [WIDTH - 1, HEIGHT - 1],
      ];
      const [cx, cy] = corners[Math.floor(Math.random() * corners.length)];
      const spots = [];
      for (let dy = 0; dy <= 1; dy++) {
        for (let dx = 0; dx <= 2; dx++) {
          const x = cx === 0 ? dx : WIDTH - 1 - dx;
          const y = cy === 0 ? dy : HEIGHT - 1 - dy;
          if (inBounds(x, y)) spots.push([x, y]);
        }
      }

      const DANCES = [
        'goal-dance-wiggle',
        'goal-dance-jump',
        'goal-dance-spin',
        'goal-dance-wave',
        'goal-dance-squat',
      ];
      const dance = DANCES[Math.floor(Math.random() * DANCES.length)];

      dancers.forEach((d, i) => {
        const spot = spots[i % spots.length];
        moveTokenToCell(d.el, spot[0], spot[1], { displace: false });
      });

      setTimeout(() => {
        for (const d of dancers) d.el.classList.add('goal-dance', dance);

        setTimeout(() => {
          for (const d of dancers) d.el.classList.remove('goal-dance', dance);
          for (const [el, x, y] of saved) moveTokenToCell(el, x, y, { displace: false });

          setTimeout(() => {
            noticeOverlayActive = false;
            if (pitch) pitch.style.pointerEvents = '';
            updatePossession();
            renderGame();
            resolve();
          }, 500);
        }, 1000);
      }, 450);
    }, 400);
  });
}

function getTokensInCell(x, y) {
  return [...cell(x, y).querySelectorAll('.player-token')];
}

function updatePossession() {
  const tokenEls = getTokensInCell(ball.x, ball.y);
  let owner = null;

  if (tokenEls.length >= 1) {
    const prev = matchState.possession;
    if (prev && tokenEls.includes(prev)) {
      owner = prev;
    } else {
      const prevTeam = prev && prev._token ? prev._token.player.team : null;
      owner = tokenEls.find((el) => el._token.player.team === prevTeam) || tokenEls[0];
    }
  }

  matchState.possession = owner;

  if (matchState.gkHoldFrom && (ball.x !== matchState.gkHoldFrom.x || ball.y !== matchState.gkHoldFrom.y)) {
    matchState.gkHoldFrom = null;
  }

  for (const tokenEl of pitch.querySelectorAll('.player-token.has-ball')) {
    tokenEl.classList.remove('has-ball');
  }
  for (const tokenEl of tokenEls) {
    tokenEl.classList.toggle('has-ball', tokenEl === owner);
  }

  if (owner) {
    ball.anchorTo(owner);
  } else {
    ball.centerInCell();
  }
}


function moveBall(x, y) {
  ball.moveTo(x, y);
  if (game.freeKickProtection) {
    const prot = game.freeKickProtection;
    if (x !== prot.x || y !== prot.y) game.freeKickProtection = null;
  }
  updatePossession();
  syncFreeKickProtectionHighlight();
}

function syncFreeKickProtectionHighlight() {
  for (const el of pitch.querySelectorAll('.cell.protected-zone')) {
    el.classList.remove('protected-zone');
  }
  const prot = game && game.freeKickProtection;
  if (!prot) return;
  const el = pitch.querySelector(`.cell[data-x="${prot.x}"][data-y="${prot.y}"]`);
  if (el) el.classList.add('protected-zone');
}

function getPlayerCell(player) {
  for (const el of document.querySelectorAll('.player-token')) {
    if (el._token.player !== player) continue;
    const cellEl = el.closest('.cell');
    if (!cellEl) continue;
    return { x: Number(cellEl.dataset.x), y: Number(cellEl.dataset.y) };
  }
  return null;
}


const board = {
  width: WIDTH,
  height: HEIGHT,
  ballCell: () => ({ x: ball.x, y: ball.y }),
  getPlayersAt: (x, y) => getTokensInCell(x, y).map((el) => el._token.player),
  getPlayerCell: (player) => getPlayerCell(player),
  getBallHolder: () => (matchState.possession ? matchState.possession._token.player : null),
  getOpponent: (team) => Object.values(TEAMS).find((t) => t !== team),
  nextKickoffTeam: () =>
    game && game.lastKickoffTeam
      ? board.getOpponent(game.lastKickoffTeam)
      : Object.values(TEAMS).find((t) => t.side === 'left') || Object.values(TEAMS)[0],
  getTeam: (name) => TEAMS[name],
  inPenaltyBox: (x, y, side) => {
    if (y < 2 || y > 4) return false;
    return side === 'left' ? x <= 1 : x >= WIDTH - 2;
  },
  canOccupy: (x, y, players) => {
    const prot = game.freeKickProtection;
    if (prot && prot.x === x && prot.y === y && players.some((p) => p.team === prot.opponentName)) {
      return false;
    }
    const byTeam = {};
    for (const p of [...board.getPlayersAt(x, y), ...players]) {
      byTeam[p.team] = (byTeam[p.team] || 0) + 1;
    }
    if (Object.values(byTeam).some((n) => n > 1)) return false;
    for (const p of players) {
      if (!p.hasEffect('defenseFocus')) continue;
      const team = TEAMS[p.team];
      const limit = team.side === 'left' ? 3 : WIDTH - 1 - 3;
      if (team.side === 'left' ? x > limit : x < limit) return false;
    }
    return true;
  },
  isCramped: (player) => player.hasEffect('cramped'),
};

const slotId = (prefix, teamName) => {
  const teams = Object.keys(TEAMS);
  const label = teams.indexOf(teamName) === 0 ? 'local-team' : 'away-team';
  return `${prefix}-${label}`;
};

function ensurePanelStructure(teamName) {
  const panel = panelSlots[teamName];
  if (panel.dataset.ready) return panel;
  panel.dataset.ready = '1';

  const team = TEAMS[teamName];

  const teamHeader = document.createElement('div');
  teamHeader.className = 'panel-team';
  teamHeader.style.color = team.primaryColor;
  teamHeader.textContent = team.name;
  panel.appendChild(teamHeader);

  const hand = document.createElement('div');
  hand.className = 'panel-hand';
  panel.appendChild(hand);

  return panel;
}

function ensureRailStructure(teamName) {
  const rail = railSlots[teamName];
  if (!rail || rail.dataset.ready) return rail;
  rail.dataset.ready = '1';

  const team = TEAMS[teamName];

  const header = document.createElement('div');
  header.className = 'rail-team-header';
  header.style.color = team.primaryColor;

  const nameEl = document.createElement('span');
  nameEl.className = 'rail-team-name';
  nameEl.textContent = team.name;
  header.appendChild(nameEl);

  const apRow = document.createElement('div');
  apRow.className = 'rail-ap-row';
  apRow.dataset.team = teamName;
  header.appendChild(apRow);

  rail.appendChild(header);

  const points = document.createElement('div');
  points.className = 'rail-points';
  rail.appendChild(points);

  const decks = document.createElement('div');
  decks.className = 'rail-decks';
  rail.appendChild(decks);

  return rail;
}


let _nameMeasureCtx = null;
function nameNeedsCompactFont(name) {
  const text = String(name).toUpperCase();
  if (typeof document === 'undefined' || !document.createElement('canvas').getContext) {
    return text.length > 12;
  }
  if (!_nameMeasureCtx) _nameMeasureCtx = document.createElement('canvas').getContext('2d');
  _nameMeasureCtx.font = '700 13px system-ui, sans-serif';
  return _nameMeasureCtx.measureText(text).width + text.length * 0.5 > 105;
}

const TOOLTIP_AUTO_HIDE_MS = 5000;

let cardTooltipEl = null;
let teamEffectTooltipEl = null;
let tooltipAction = null;

function ensureCardTooltip() {
  if (cardTooltipEl && cardTooltipEl.isConnected) return cardTooltipEl;
  cardTooltipEl = document.createElement('div');
  cardTooltipEl.className = 'action-card-tooltip';
  cardTooltipEl.style.display = 'none';
  document.body.appendChild(cardTooltipEl);
  cardTooltipEl.addEventListener('mouseenter', () => {
    if (tooltipAction) tooltipAction.enterEl();
  });
  cardTooltipEl.addEventListener('mouseleave', () => {
    if (tooltipAction) tooltipAction.leaveEl();
  });
  return cardTooltipEl;
}

function ensureTeamEffectTooltip() {
  if (teamEffectTooltipEl && teamEffectTooltipEl.isConnected) return teamEffectTooltipEl;
  teamEffectTooltipEl = document.createElement('div');
  teamEffectTooltipEl.className = 'team-effect-tooltip';
  teamEffectTooltipEl.style.display = 'none';
  document.body.appendChild(teamEffectTooltipEl);
  teamEffectTooltipEl.addEventListener('mouseenter', () => {
    if (tooltipAction) tooltipAction.enterEl();
  });
  teamEffectTooltipEl.addEventListener('mouseleave', () => {
    if (tooltipAction) tooltipAction.leaveEl();
  });
  return teamEffectTooltipEl;
}

function bindCardTooltip(card, tooltip, tipText) {
  const action = { enterEl: null, leaveEl: null };
  tooltipAction = action;

  const state = {
    hideTimer: null,
    autoHideTimer: null,
    dismissedByClick: false,
  };

  const autoHide = () => {
    tooltip.style.display = 'none';
  };

  const show = () => {
    if (state.dismissedByClick) return;
    if (!card.isConnected) return;
    clearTimeout(state.hideTimer);
    clearTimeout(state.autoHideTimer);
    if (card.classList.contains('disabled') || card.classList.contains('face-down')) {
      tooltip.style.display = 'none';
      return;
    }
    const rect = card.getBoundingClientRect();
    if (!rect.width && !rect.height) return;
    tooltip.textContent = tipText;
    tooltip.style.display = 'block';
    state.autoHideTimer = setTimeout(autoHide, TOOLTIP_AUTO_HIDE_MS);
    tooltip.style.position = 'fixed';
    tooltip.style.left = '0';
    tooltip.style.top = '0';
    tooltip.style.transform = 'none';
    const tRect = tooltip.getBoundingClientRect();
    let top = rect.top - tRect.height - 10;
    let left = rect.left + rect.width / 2 - tRect.width / 2;
    if (top < 8) {
      top = rect.bottom + 10;
    }
    const maxLeft = window.innerWidth - 8;
    left = Math.max(8, Math.min(maxLeft - tRect.width, left));
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  };
  const hide = () => {
    clearTimeout(state.autoHideTimer);
    if (!card.isConnected) return;
    state.hideTimer = setTimeout(() => { tooltip.style.display = 'none'; }, 100);
  };
  const resetDismissed = () => { state.dismissedByClick = false; };
  action.enterEl = () => clearTimeout(state.hideTimer);
  action.leaveEl = () => hide();
  card.addEventListener('mouseenter', () => show());
  card.addEventListener('mouseleave', () => hide());
  card.addEventListener('click', () => { 
    state.dismissedByClick = true;
    clearTimeout(state.autoHideTimer);
    tooltip.style.display = 'none';
    setTimeout(resetDismissed, 200);
  });
}

function bindTeamEffectTooltip(el, description, extraText, turns) {
  const tooltip = ensureTeamEffectTooltip();
  const action = { enterEl: null, leaveEl: null };
  tooltipAction = action;

  let content = description;
  if (extraText) content += ` ${extraText}`;
  if (turns !== Infinity && turns != null) content += ` (${turns} turn${turns === 1 ? '' : 's'} remaining)`;

  let hideTimer = null;
  let autoHideTimer = null;

  const autoHide = () => {
    tooltip.style.display = 'none';
  };

  const show = () => {
    clearTimeout(hideTimer);
    clearTimeout(autoHideTimer);
    const rect = el.getBoundingClientRect();
    if (!rect.width && !rect.height) return;
    tooltip.textContent = content;
    tooltip.style.display = 'block';
    autoHideTimer = setTimeout(autoHide, TOOLTIP_AUTO_HIDE_MS);
    tooltip.style.position = 'fixed';
    tooltip.style.left = '0';
    tooltip.style.top = '0';
    tooltip.style.transform = 'none';
    const tRect = tooltip.getBoundingClientRect();
    let top = rect.top - tRect.height - 8;
    let left = rect.left + rect.width / 2 - tRect.width / 2;
    if (top < 8) top = rect.bottom + 8;
    left = Math.max(8, Math.min(window.innerWidth - 8 - tRect.width, left));
    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  };
  const hide = () => {
    clearTimeout(autoHideTimer);
    hideTimer = setTimeout(() => { tooltip.style.display = 'none'; }, 100);
  };
  action.enterEl = () => clearTimeout(hideTimer);
  action.leaveEl = () => hide();
  el.addEventListener('mouseenter', () => show());
  el.addEventListener('mouseleave', () => hide());
}

function createActionCard(action) {
  const card = document.createElement('div');
  card.className = 'action-card';
  if (action.category) card.classList.add(`category-${action.category}`);
  if (action.rarity > 0) card.classList.add(`rarity-${action.rarity}`);

  const name = document.createElement('div');
  name.className = 'action-card-name';
  name.textContent = action.name;
  if (nameNeedsCompactFont(action.name)) card.classList.add('compact-name');

  const isGoalkeeping = action instanceof GoalkeepingAction;

  const desc = document.createElement('div');
  desc.className = 'action-card-desc';

  const tooltip = ensureCardTooltip();
  const tipText = action.description;
  bindCardTooltip(card, tooltip, tipText);

  if (!isGoalkeeping) {
    const cost = document.createElement('span');
    cost.className = 'action-card-cost';
    cost.textContent = action.free ? '0' : String(action.cost[0]);
    desc.appendChild(cost);
  }
  desc.appendChild(document.createTextNode(action.description));

  card.appendChild(name);
  card.appendChild(desc);

  if (action.exhaust) {
    const exhaust = document.createElement('div');
    exhaust.className = 'action-card-exhaust';
    exhaust.textContent = 'Exhaust';
    card.appendChild(exhaust);
  }

  if (action.ephemeral) {
    const ephemeral = document.createElement('div');
    ephemeral.className = 'action-card-ephemeral';
    ephemeral.textContent = 'Ephemeral';
    card.appendChild(ephemeral);
  }

  if (action.free) {
    const free = document.createElement('div');
    free.className = 'action-card-free';
    free.textContent = 'Free';
    card.appendChild(free);
  }

  if (action.hold) {
    const hold = document.createElement('div');
    hold.className = 'hold-badge';
    hold.textContent = '✋ held';
    card.appendChild(hold);
  }

  return card;
}


function renderActionDeck(team) {
  const deck = document.createElement('div');
  deck.className = 'deck';

  const back = document.createElement('button');
  back.className = 'deck-back';
  back.style.backgroundColor = team.primaryColor;

  const typeLabel = document.createElement('span');
  typeLabel.className = 'deck-type';
  typeLabel.textContent = 'playable';

  const countLabel = document.createElement('span');
  countLabel.className = 'deck-count';
  countLabel.textContent = String(team.availableActions.length);

  back.appendChild(typeLabel);
  back.appendChild(countLabel);

  const cards = document.createElement('div');
  cards.className = 'deck-cards';

  for (const action of team.availableActions) {
    cards.appendChild(createActionCard(action));
  }

  back.addEventListener('click', () => {
    cards.classList.toggle('open');
  });

  deck.appendChild(back);
  deck.appendChild(cards);
  return deck;
}

function renderGoalkeepingDeck(team) {
  const deck = document.createElement('div');
  deck.className = 'deck gk-deck';

  const back = document.createElement('button');
  back.className = 'deck-back gk-back';
  back.style.backgroundColor = team.reserveColor;

  const typeLabel = document.createElement('span');
  typeLabel.className = 'deck-type';
  typeLabel.textContent = 'gk';

  const countLabel = document.createElement('span');
  countLabel.className = 'deck-count';
  countLabel.textContent = String(team.availableGoalkeeping.length);

  back.appendChild(typeLabel);
  back.appendChild(countLabel);

  const cards = document.createElement('div');
  cards.className = 'deck-cards';

  for (const card of team.availableGoalkeeping) {
    cards.appendChild(createActionCard(card));
  }

  back.addEventListener('click', () => {
    cards.classList.toggle('open');
  });

  deck.appendChild(back);
  deck.appendChild(cards);
  return deck;
}

function renderExhaustedDeck(team) {
  const deck = document.createElement('div');
  deck.className = 'deck exhausted-deck';

  const back = document.createElement('button');
  back.className = 'deck-back exhausted-back';
  back.style.backgroundColor = '#4a4a52';

  const typeLabel = document.createElement('span');
  typeLabel.className = 'deck-type';
  typeLabel.textContent = 'exhaust';

  const countLabel = document.createElement('span');
  countLabel.className = 'deck-count';
  countLabel.textContent = String(team.exhaustedActions.length);

  back.appendChild(typeLabel);
  back.appendChild(countLabel);

  const cards = document.createElement('div');
  cards.className = 'deck-cards';

  for (const card of team.exhaustedActions) {
    cards.appendChild(createActionCard(card));
  }

  back.addEventListener('click', () => {
    cards.classList.toggle('open');
  });

  deck.appendChild(back);
  deck.appendChild(cards);
  return deck;
}

function renderDecks() {
  for (const teamName of Object.keys(TEAMS)) {
    const team = TEAMS[teamName];
    const decksEl = railDeckSlots && railDeckSlots[teamName];
    if (!decksEl) continue;
    decksEl.innerHTML = '';
    decksEl.appendChild(renderActionDeck(team));
    decksEl.appendChild(renderGoalkeepingDeck(team));
    decksEl.appendChild(renderExhaustedDeck(team));
  }
}


function renderPoints() {
  for (const teamName of Object.keys(TEAMS)) {
    const team = TEAMS[teamName];
    const pointsEl = railPointSlots && railPointSlots[teamName];
    const apRow = railSlots[teamName] && railSlots[teamName].querySelector('.rail-ap-row');
    if (!apRow) continue;

    const isCurrent = team === game.currentTeam;

    const teamEffectsEl = document.createElement('div');
    teamEffectsEl.className = 'panel-team-effects';
    for (const artifact of team.artifacts || []) {
      const b = document.createElement('span');
      b.className = 'team-effect-badge team-artifact';
      b.textContent = `${artifact.char} ${artifact.label}`;
      bindTeamEffectTooltip(b, artifact.description, 'Always active', Infinity);
      teamEffectsEl.appendChild(b);
    }
    for (const objectEffect of team.teamEffectObjects || []) {
      const badge = document.createElement('span');
      badge.className = 'team-effect-badge';
      badge.textContent = `${objectEffect.char} ${objectEffect.label}`;
      bindTeamEffectTooltip(badge, objectEffect.explanation, null, objectEffect.turns);
      if (objectEffect.turns !== Infinity) badge.textContent += ` (${objectEffect.turns}t)`;
      teamEffectsEl.appendChild(badge);
    }

    if (pointsEl) {
      pointsEl.innerHTML = '';
      if (teamEffectsEl.childElementCount > 0) {
        pointsEl.appendChild(teamEffectsEl);
      }
    }

    apRow.innerHTML = '';

    const label = document.createElement('span');
    label.className = 'panel-team-name';
    label.style.color = team.primaryColor;
    label.textContent = isCurrent ? 'PLAYING' : '';
    apRow.appendChild(label);

    const dots = document.createElement('div');
    dots.className = 'rail-ap-dots';
    dots.title = `${game.actionPoints[teamName]}/${game.pointsPerTurn} action points left`;
    const maxDots = Math.max(game.actionPoints[teamName], game.pointsPerTurn);
    for (let i = 0; i < maxDots; i++) {
      const dot = document.createElement('span');
      dot.className = `rail-ap-dot ${i < game.actionPoints[teamName] ? 'filled' : 'empty'}`;
      dots.appendChild(dot);
    }
    apRow.appendChild(dots);
  }
}

function renderRailControls() {
  const rail = document.getElementById('rail-controls');
  if (!rail) return;
  rail.innerHTML = '';

  const current = game.currentTeam;

  const playing = document.createElement('div');
  playing.className = 'rail-playing';
  playing.style.color = current ? current.primaryColor : '#fff';
  playing.textContent = current ? `${current.name} to move` : '';
  rail.appendChild(playing);

  const isHumanTurn =
    current && current.controller.type === 'human' && !game.finished && !hasActivePending() && !handoffScheduled;

  if (isHumanTurn) {
    const ap = game.actionPoints[current.name] ?? 0;
    const isLastAp = ap <= 1;
    const btnText = isLastAp ? 'End Turn' : 'Skip and Draw';

    const endBtn = document.createElement('button');
    endBtn.className = 'rail-end-turn';
    endBtn.textContent = btnText;
    endBtn.title = isLastAp
      ? 'End your turn. No action points remain.'
      : 'Skip your remaining action points and draw a card.';
    endBtn.addEventListener('click', () => {
      if (handoffScheduled) return;
      const team = game.currentTeam;
      matchState.lastBallMove = null;
      matchState.lastDribbledPlayer = null;
      substitutionWindowOpen = false;
      const result = game.skip(team, { deferSwitch: true });
      if (!result.success) logAlert(result.reason);
      renderGame();
    });
    rail.appendChild(endBtn);
  }
}


function openSubstitutionModal(team) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'shot-modal';

  const content = document.createElement('div');
  content.className = 'shot-modal-content halftime-content';

  const title = document.createElement('div');
  title.className = 'shot-modal-label';
  title.textContent = `${team.name} — Substitutions (${team.substitutionsUsed}/${Team.MAX_SUBS_PER_MATCH} used)`;
  content.appendChild(title);

  const hint = document.createElement('div');
  hint.className = 'hard-tackle-sub-row';
  const hintLabel = document.createElement('div');
  hintLabel.textContent = `Select a player on the pitch, then any substitute from the bench. Out-of-position players take an attribute penalty. You may batch up to ${team.subsRemaining} changes.`;
  hint.appendChild(hintLabel);
  content.appendChild(hint);

  const rows = document.createElement('div');
  rows.className = 'halftime-col';

  const onPitch = team.currentPlayers.filter((p) => !p.sentOff);
  const bench = team.availableSubstitutes();

  const outLabel = document.createElement('div');
  outLabel.className = 'shot-modal-label';
  outLabel.textContent = 'On the pitch (coming off):';
  rows.appendChild(outLabel);

  const outRow = document.createElement('div');
  outRow.className = 'hard-tackle-sub-row';
  outRow.style.flexWrap = 'wrap';
  for (const p of onPitch) {
    const btn = document.createElement('button');
    btn.className = 'bench-slot-button';
    btn.textContent = `${p.name} (${p.position})`;
    btn._player = p;
    btn.dataset.role = 'out';
    btn.addEventListener('click', () => pickSub(btn, p, 'out'));
    outRow.appendChild(btn);
  }
  rows.appendChild(outRow);

  const inLabel = document.createElement('div');
  inLabel.className = 'shot-modal-label';
  inLabel.textContent = 'Substitute coming on:';
  rows.appendChild(inLabel);

  const inRow = document.createElement('div');
  inRow.className = 'hard-tackle-sub-row';
  inRow.style.flexWrap = 'wrap';
  if (bench.length === 0) {
    const label = document.createElement('div');
    label.textContent = 'No substitutes available.';
    inRow.appendChild(label);
  }
  for (const p of bench) {
    const btn = document.createElement('button');
    btn.className = 'bench-slot-button';
    btn.textContent = `${p.name} (${p.position})`;
    btn._player = p;
    btn.dataset.role = 'in';
    btn.addEventListener('click', () => pickSub(btn, p, 'in'));
    inRow.appendChild(btn);
  }
  rows.appendChild(inRow);

  const pendingLabel = document.createElement('div');
  pendingLabel.className = 'shot-modal-label';
  pendingLabel.textContent = 'Changes to make:';
  rows.appendChild(pendingLabel);

  const pendingRow = document.createElement('div');
  pendingRow.className = 'hard-tackle-sub-row';
  pendingRow.style.flexWrap = 'wrap';
  rows.appendChild(pendingRow);

  content.appendChild(rows);

  const selected = { out: null, in: null };
  const pairs = [];

  const renderButtons = () => {
    for (const btn of content.querySelectorAll('button[data-role]')) {
      const player = btn._player;
      const role = btn.dataset.role;
      btn.classList.remove('selected', 'disabled', 'eligible', 'sub-candidate');
      if (role === 'out' && pairs.some(([o]) => o === player)) {
        btn.classList.add('selected', 'disabled');
      } else if (role === 'in' && pairs.some(([, i]) => i === player)) {
        btn.classList.add('selected', 'disabled');
      } else if (role === 'out' && selected.out === player) {
        btn.classList.add('selected');
      } else if (role === 'in' && selected.out) {
        if (selected.in === player) {
          btn.classList.add('selected');
        } else {
          btn.classList.add('eligible');
        }
      } else if (role === 'out' && (player.injured || player.hasEffect('exhausted'))) {
        btn.classList.add('sub-candidate');
      }
    }
  };

  const renderPending = () => {
    pendingRow.innerHTML = '';
    if (pairs.length === 0) {
      const label = document.createElement('div');
      label.textContent = 'None yet.';
      pendingRow.appendChild(label);
      return;
    }
    for (const [outPlayer, inPlayer] of pairs) {
      const chip = document.createElement('button');
      chip.className = 'bench-slot-button';
      chip.textContent = `${outPlayer.name} ← ${inPlayer.name} ✕`;
      chip.addEventListener('click', () => {
        const i = pairs.findIndex(([o, i2]) => o === outPlayer && i2 === inPlayer);
        if (i !== -1) pairs.splice(i, 1);
        renderPending();
        renderButtons();
      });
      pendingRow.appendChild(chip);
    }
  };

  function pickSub(btn, player, role) {
    if (role === 'out') {
      selected.out = selected.out === player ? null : player;
      if (selected.out) selected.in = null;
    } else {
      if (!selected.out) return;
      pairs.push([selected.out, player]);
      selected.out = null;
      selected.in = null;
    }
    renderPending();
    renderButtons();
  }

  const confirmBtn = document.createElement('button');
  confirmBtn.className = 'skip-btn';
  confirmBtn.textContent = 'Confirm substitutions';
  confirmBtn.style.marginRight = '8px';
  confirmBtn.addEventListener('click', () => {
    if (pairs.length === 0) return;
    team.subWindowsUsed += 1;
    for (const [outPlayer, inPlayer] of pairs) applyManualSub(team, outPlayer, inPlayer);
    close();
    renderGame();
  });
  content.appendChild(confirmBtn);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'shot-modal-close';
  closeBtn.textContent = 'Close';

  modal.appendChild(content);
  modal.appendChild(closeBtn);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  const onKey = (e) => {
    if (e.key === 'Escape') close();
  };

  let closed = false;
  function close() {
    if (closed) return;
    closed = true;
    document.removeEventListener('keydown', onKey);
    overlay.remove();
  }

  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', onKey);
  renderPending();
  renderButtons();
}


function scaleHandToPitch(handEl) {
  const pitch = document.getElementById('pitch');
  if (!pitch || !handEl) return;
  const pitchRect = pitch.getBoundingClientRect();
  const handRect = handEl.getBoundingClientRect();
  if (handRect.width > pitchRect.width) {
    const scale = pitchRect.width / handRect.width;
    handEl.style.transform = `scale(${scale})`;
    handEl.style.transformOrigin = 'center top';
  } else {
    handEl.style.transform = '';
    handEl.style.transformOrigin = '';
  }
}

function renderInPlay() {
  if (simulationMode) return;
  for (const teamName of Object.keys(TEAMS)) {
    const team = TEAMS[teamName];
    const inPlayEl = handSlots[teamName];
    if (!inPlayEl) continue;
    inPlayEl.innerHTML = '';

    const isCurrent = team === game.currentTeam;

    const section = document.createElement('div');
    section.className = 'in-play-team';

    const headerRow = document.createElement('div');
    headerRow.className = 'in-play-team-header-row';

    const header = document.createElement('div');
    header.className = 'in-play-team-header';
    header.style.color = team.primaryColor;
    header.textContent = `${team.name}${isCurrent ? ' · PLAYING' : ''}`;
    headerRow.appendChild(header);

    section.appendChild(headerRow);

    const hand = document.createElement('div');
    hand.className = 'in-play-hand';
    if (isCurrent && team.controller.type === 'human') {
      hand.classList.add('playing-hand');
    }

    const shithouseryTarget = pendingShithousery && pendingShithousery.team !== team;
    const holdTargeting = pendingHold && pendingHold.team === team;
    const handRevealed =
      (game.revealedHand && game.revealedHand[team.name]) ||
      (game.revealedHandTurn && game.revealedHandTurn[team.name]);
    const showHand =
      isCurrent ||
      shithouseryTarget ||
      holdTargeting ||
      handRevealed ||
      (substitutionWindowOpen && team.controller.type === 'human');

    if (!showHand) {
      if (panelSlots && panelSlots[teamName]) panelSlots[teamName].style.display = 'none';
      continue;
    }

    if (panelSlots && panelSlots[teamName]) panelSlots[teamName].style.display = '';
    const heldSet = new Set(game.heldCards && game.heldCards[team.name] ? game.heldCards[team.name] : []);
    const orderedHand = game.inPlay[team.name].slice().sort((a, b) => {
      const aHeld = (a.hold || heldSet.has(a)) ? 1 : 0;
      const bHeld = (b.hold || heldSet.has(b)) ? 1 : 0;
      return bHeld - aHeld;
    });
    for (const action of orderedHand) {
      const card = createActionCard(action);
      card.__action = action;
      const pending = currentPending(team, action);
      const isPending = Boolean(pending);
      const playable = canPlayAction(team, action);
      const isPenaltyCard = action.category === 'penalty' ||
        (action instanceof BrokenDefenseAction) ||
        (action instanceof FrozenDefenseAction) ||
        (action instanceof InjuryRiskAction) ||
        (action instanceof HeadsInTheCloudsAction) ||
        (action instanceof RedMistAction) ||
        (action instanceof LostDressingRoomAction) ||
        (action instanceof FatigueAction) ||
        (action instanceof MoraleCollapseAction) ||
        (action instanceof SuspensionShadowAction) ||
        (action instanceof TacticalConfusionAction) ||
        (action instanceof GoalkeeperBlunderAction) ||
        (action instanceof CaptainsMutinyAction) ||
        (action instanceof WeatherWoesAction);

      if (shithouseryTarget) {
        card.classList.add('shithousery-target');
        card.addEventListener('click', () => {
          executeAction(pendingShithousery.team, pendingShithousery.action, () =>
            resolveShithousery(action)
          );
        });
      } else if (holdTargeting && action !== pendingHold.action) {
        card.classList.add('hold-target');
        card.addEventListener('click', () => {
          executeAction(pendingHold.team, pendingHold.action, () => resolveHold(action));
        });
      } else if (team.controller.type === 'ai' && !isPenaltyCard && !(game.revealedHand && game.revealedHand[team.name]) && !(game.revealedHandTurn && game.revealedHandTurn[team.name])) {
        card.classList.add('face-down');
      } else if (isPending) {
        card.classList.add('active');
      } else {
        if (playable && !pending) {
          card.classList.add('playable');
        } else {
          card.classList.add('disabled');
          const reason = canPlayActionReason(team, action);
          if (reason) card.title = reason;
        }
      }

      if (!shithouseryTarget && playable) {
        card.addEventListener('click', () => dispatchActionPlay(team, action, isPending));
      }

      hand.appendChild(card);
    }

    section.appendChild(hand);

    if (
      substitutionWindowOpen &&
      team.controller.type === 'human' &&
      team.subsRemaining > 0 &&
      team.subWindowsRemaining > 0 &&
      !game.finished &&
      !game.halftimePending
    ) {
      const subBtn = document.createElement('button');
      subBtn.className = 'skip-btn';
      subBtn.textContent = `Substitute (${team.subsRemaining})`;
      subBtn.title = `Make a substitution (${team.subsRemaining} of ${Team.MAX_SUBS_PER_MATCH} left). Uses one of ${Team.MAX_SUB_WINDOWS} substitution windows. A player who comes off cannot return.`;
      subBtn.addEventListener('click', () => openSubstitutionModal(team));
      section.appendChild(subBtn);
    }

    inPlayEl.appendChild(section);
  }
  renderPoints();
}

function renderScoreboard() {
  const el = document.getElementById('scoreboard');
  el.innerHTML = '';

  const [home, away] = Object.values(TEAMS).sort((a, b) =>
    a.side === 'left' ? -1 : b.side === 'left' ? 1 : 0
  );

  const minutes = (game.turn - 1) * 5;
  const centerLabel = game.finished
    ? `Full Time · ${minutes}'`
    : `${game.half === 1 ? '1st' : '2nd'} Half · ${minutes}'`;

  const sideEl = (team) => {
    const side = document.createElement('div');
    side.className = 'scoreboard-side';

    const name = document.createElement('span');
    name.className = 'scoreboard-team';
    name.style.color = team.primaryColor;
    name.textContent = team.name;

    const score = document.createElement('span');
    score.className = 'scoreboard-score';
    score.textContent = game.score[team.name] || 0;

    side.appendChild(name);
    side.appendChild(score);
    return side;
  };

  const center = document.createElement('div');
  center.className = 'scoreboard-center';
  center.textContent = centerLabel;

  if (typeof wcShootout !== 'undefined' && wcShootout && !wcShootout.done) {
    const pen = document.createElement('div');
    pen.className = 'scoreboard-penalties';
    pen.textContent = `Pens: ${wcShootout.homeScore} - ${wcShootout.awayScore}`;
    center.appendChild(pen);
  }

  if (game.matchEffect) {
    const fx = document.createElement('div');
    fx.className = 'scoreboard-match-effect';
    fx.title = game.matchEffect.description;
    fx.textContent = `${game.matchEffect.char} ${game.matchEffect.name}`;
    center.appendChild(fx);
  }

  el.appendChild(sideEl(home));
  el.appendChild(center);
  el.appendChild(sideEl(away));
}

function renderGameStatus() {
  const statusEl = document.getElementById('game-status');
  statusEl.innerHTML = '';

  const turn = document.createElement('span');
  turn.className = 'game-turn';
  turn.textContent = `Turn ${game.turn}/${game.maxTurns}${game.finished ? ' · GAME OVER' : ''}`;

  const playing = document.createElement('span');
  playing.className = 'game-playing';
  playing.style.color = game.currentTeam.primaryColor;
  playing.textContent = `Playing: ${game.currentTeam.name}`;

  const turnsLeft = document.createElement('span');
  turnsLeft.className = 'game-turns-left';
  turnsLeft.textContent = `${game.turnsLeft} turns left`;

  const score = document.createElement('span');
  score.className = 'game-score';
  score.textContent = Object.keys(TEAMS)
    .map((name) => `${name} ${game.score[name] || 0}`)
    .join(' · ');

  statusEl.appendChild(turn);
  statusEl.appendChild(playing);
  statusEl.appendChild(turnsLeft);
  statusEl.appendChild(score);
}


const gameStatusEl = document.getElementById('game-status');
const hintEl = document.getElementById('hint');
let selectedToken = null;

function inBounds(x, y) {
  return x >= 0 && x < WIDTH && y >= 0 && y < HEIGHT;
}

function adjacentOffsets(distance) {
  const offsets = [];
  for (let dx = -distance; dx <= distance; dx++) {
    for (let dy = -distance; dy <= distance; dy++) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) !== distance) continue;
      offsets.push([dx, dy]);
    }
  }
  return offsets;
}

function candidatesFrom(cx, cy, distance) {
  return adjacentOffsets(distance)
    .map(([dx, dy]) => [cx + dx, cy + dy])
    .filter(([nx, ny]) => inBounds(nx, ny));
}


function renderHint() {
  const hintEl = document.getElementById('hint');
  if (pendingPass) {
    hintEl.textContent = `${pendingPass.team.name} · ${pendingPass.passer.name} — click a highlighted cell to pass · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingLongPass) {
    hintEl.textContent = `${pendingLongPass.team.name} · ${pendingLongPass.passer.name} — click a highlighted cell for the long pass · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingTackle) {
    hintEl.textContent = `${pendingTackle.team.name} — click a highlighted player to tackle · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingClearance) {
    hintEl.textContent = `${pendingClearance.team.name} — click a highlighted player to clear · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingLastDitchBlock) {
    hintEl.textContent = `${pendingLastDitchBlock.team.name} — click a highlighted defender to Last-Ditch Block · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingMove && !pendingMove.player) {
    hintEl.textContent = `${pendingMove.team.name} — click a player to move · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingMove && pendingMove.player) {
    hintEl.textContent = `${pendingMove.team.name} — ${pendingMove.player.name} · click a highlighted cell to move · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingSlip && !pendingSlip.player) {
    hintEl.textContent = `${pendingSlip.team.name} — click a player without the ball to slip · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingSlip && pendingSlip.player) {
    hintEl.textContent = `${pendingSlip.team.name} — ${pendingSlip.player.name} · click a highlighted cell to slip to · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingLongBall) {
    hintEl.textContent = `${pendingLongBall.team.name} — click a highlighted empty cell for the long ball · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingOffBall && !pendingOffBall.currentPlayer) {
    hintEl.textContent = `${pendingOffBall.team.name} — pick ${3 - pendingOffBall.moves.length} player(s) to move off the ball · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingOffBall && pendingOffBall.currentPlayer) {
    hintEl.textContent = `${pendingOffBall.team.name} — ${pendingOffBall.currentPlayer.name} · click a highlighted cell · ${3 - pendingOffBall.moves.length} player(s) left · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingDribble) {
    hintEl.textContent = `${pendingDribble.team.name} — ${pendingDribble.player.name} dribbles · click a highlighted cell · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingSprint && !pendingSprint.player) {
    const sprintLabel = pendingSprint.action instanceof ShortSprintAction ? 'short-sprint' : 'sprint';
    hintEl.textContent = `${pendingSprint.team.name} — click a player to ${sprintLabel} · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingSprint && pendingSprint.player) {
    const targetLabel =
      pendingSprint.action instanceof ShortSprintAction
        ? 'a highlighted cell one or two cells away'
        : 'a highlighted cell two cells away';
    hintEl.textContent = `${pendingSprint.team.name} — ${pendingSprint.player.name} · click ${targetLabel} · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingFinish) {
    hintEl.textContent = `${pendingFinish.team.name} — click a highlighted player to move in and finish · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingCross) {
    hintEl.textContent = `${pendingCross.team.name} — click a highlighted attacker to cross to · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingRunAndCross) {
    hintEl.textContent = `${pendingRunAndCross.team.name} — click a highlighted attacker to cross to · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingCramp) {
    hintEl.textContent = `${pendingCramp.team.name} — click a highlighted opponent to cramp · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingHardTackle) {
    hintEl.textContent = `${pendingHardTackle.team.name} — click a highlighted player to make the hard tackle · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingSideAttack) {
    hintEl.textContent = `${pendingSideAttack.team.name} — click the top or bottom row to launch the side attack · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingOverlap) {
    hintEl.textContent = `${pendingOverlap.team.name} — click a highlighted player to overlap · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingFeintTurn) {
    hintEl.textContent = `${pendingFeintTurn.team.name} — ${pendingFeintTurn.player.name} feints · click a side or diagonal highlighted cell · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingTouchOfMagic) {
    hintEl.textContent = `${pendingTouchOfMagic.team.name} — ${pendingTouchOfMagic.player.name} weaves through · click a highlighted cell 1-2 away to move and shoot · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingSiiiiu) {
    hintEl.textContent = `${pendingSiiiiu.team.name} — ${pendingSiiiiu.player.name} shouts Siiiiu! · click a highlighted cell two cells towards goal to sprint and shoot · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingThroughBall) {
    hintEl.textContent = `${pendingThroughBall.team.name} — ${pendingThroughBall.passer.name} · click a highlighted cell to play a through ball · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingOneTwo) {
    hintEl.textContent = `${pendingOneTwo.team.name} — ${pendingOneTwo.passer.name} · click a highlighted adjacent teammate to play a one-two · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingUnderlap) {
    hintEl.textContent = `${pendingUnderlap.team.name} — click a highlighted player on the touchline for an underlap · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingShithousery) {
    hintEl.textContent = `${pendingShithousery.team.name} — click an opponent card to discard it · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingHold) {
    hintEl.textContent = `${pendingHold.team.name} — click one of your cards to hold it · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingYellowCard) {
    hintEl.textContent = `${pendingYellowCard.team.name} — click a highlighted opponent to book them · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingSwitchPlay) {
    hintEl.textContent = `${pendingSwitchPlay.team.name} — click any cell on the opposite row to switch play · Esc to cancel`;
    hintEl.classList.add('visible');
  } else if (pendingTacticalSub) {
    hintEl.textContent = `${pendingTacticalSub.team.name} — click an outfield player to sub off · Esc to cancel`;
    hintEl.classList.add('visible');
  } else {
    hintEl.textContent = '';
    hintEl.classList.remove('visible');
  }
}


function refreshCellLayout(cellEl) {
  const tokens = [...cellEl.querySelectorAll('.player-token')];
  for (const el of tokens) {
    const team = el._token && TEAMS[el._token.player.team];
    if (!team) continue;
    el.classList.remove('alone', 'half-left', 'half-right');
    el.classList.add(team.side === 'left' ? 'half-left' : 'half-right');
  }
  if (tokens.length === 1 && tokens[0]._token && TEAMS[tokens[0]._token.player.team]) {
    tokens[0].classList.remove('half-left', 'half-right');
    tokens[0].classList.add('alone');
  }
  const teams = new Set(tokens.map((el) => el._token && el._token.player.team).filter((t) => t && TEAMS[t]));
  cellEl.classList.toggle('duel', tokens.length >= 2 && teams.size >= 2);
}

function nearestEmptyCellFor(player, x, y) {
  const team = TEAMS[player.team];
  const focus = player.hasEffect('defenseFocus');
  const xMax = team.side === 'left' ? 3 : WIDTH - 1 - 3;
  let best = null;
  let bestDist = Infinity;
  for (let cx = 0; cx < WIDTH; cx++) {
    for (let cy = 0; cy < HEIGHT; cy++) {
      if (getTokensInCell(cx, cy).length > 0) continue;
      if (focus && (team.side === 'left' ? cx > xMax : cx < xMax)) continue;
      const d = Math.abs(cx - x) + Math.abs(cy - y);
      if (d < bestDist) {
        bestDist = d;
        best = [cx, cy];
      }
    }
  }
  return best;
}

function moveTokenToCell(tokenEl, x, y, opts) {
  if (!opts || opts.displace !== false) {
    const mover = tokenEl._token && tokenEl._token.player;
    if (mover) {
      const occupants = getTokensInCell(x, y).filter(
        (t) => t !== tokenEl && t._token && t._token.player && t._token.player.team === mover.team
      );
      for (const other of occupants) {
        const free = nearestEmptyCellFor(other._token.player, x, y);
        if (free) moveTokenToCell(other, free[0], free[1], { displace: false });
      }
    }
  }
  const sourceCell = tokenEl.closest('.cell');
  const targetCell = cell(x, y);
  const fromRect = tokenEl.getBoundingClientRect();
  targetCell.appendChild(tokenEl);
  if (sourceCell && sourceCell !== targetCell) refreshCellLayout(sourceCell);
  refreshCellLayout(targetCell);
  animateFlipEl(tokenEl, fromRect);
}


function buildShotFormulaParts(result) {
  const shootParts = [`Shooting: ${result.baseShooting}`];
  if (result.shootingCardBonus) shootParts.push(`+${result.shootingCardBonus} (shoot card)`);
  if (result.distance > 0) shootParts.push(`-${result.distance} (distance)`);
  if (result.marked) shootParts.push(`-${result.markedModifier ?? 2} (marked)`);
  if (result.defenders > 0) shootParts.push(`-${result.defenders} (defenders)`);
  if (result.attackers > 0) shootParts.push(`+${result.attackers} (attackers)`);

  const gkParts = [`Goalkeeping: ${result.baseGoalkeeping}`];
  if (result.goalkeepingCard) {
    const bonus = result.goalkeepingCard.goalkeeperBonus;
    if (bonus > 0) gkParts.push(`+${bonus} (${result.goalkeepingCard.name})`);
    else if (bonus < 0) gkParts.push(`${bonus} (${result.goalkeepingCard.name})`);
  }
  if (result.goalkeeperOffPosition) gkParts.push('-5 (GK out of position)');

  return { shootParts, gkParts };
}


function showShotResultModal({ result, attackerCard, goalkeepingCard, onClose }) {
  const shootTeamName = result.shooter && result.shooter.team;
  if (game.pendingPenalty === shootTeamName) game.pendingPenalty = null;
  if (game.freeKickProtection && game.freeKickProtection.teamName === shootTeamName) {
    game.freeKickProtection = null;
  }
  if (simulationMode) {
    onClose();
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'shot-modal';

  const content = document.createElement('div');
  content.className = 'shot-modal-content';

  const attackerCardEl = document.createElement('div');
  attackerCardEl.className = 'shot-modal-side';
  const attackerLabel = document.createElement('div');
  attackerLabel.className = 'shot-modal-label';
  attackerLabel.textContent = 'Attacker card';
  attackerCardEl.appendChild(attackerLabel);
  attackerCardEl.appendChild(createActionCard(attackerCard));

  const gkCardEl = document.createElement('div');
  gkCardEl.className = 'shot-modal-side';
  const gkLabel = document.createElement('div');
  gkLabel.className = 'shot-modal-label';
  gkLabel.textContent = 'Goalkeeping card';
  gkCardEl.appendChild(gkLabel);
  if (goalkeepingCard) {
    gkCardEl.appendChild(createActionCard(goalkeepingCard));
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'gk-placeholder';
    placeholder.textContent = 'No card';
    gkCardEl.appendChild(placeholder);
  }

  const center = document.createElement('div');
  center.className = 'shot-modal-center';

  const outcome = document.createElement('div');
  outcome.className = `shot-modal-outcome ${result.scored ? 'goal' : 'blocked'}`;
  outcome.textContent = result.scored ? 'GOAL!' : result.hitPost ? 'HIT THE POST!' : 'BLOCKED / OFF TARGET';

  const { shootParts, gkParts } = buildShotFormulaParts(result);

  const shootingLine = document.createElement('div');
  shootingLine.className = 'shot-formula-line shooting';
  shootingLine.textContent = `${shootParts.join(' ')} = ${result.shooting}`;

  const gkLine = document.createElement('div');
  gkLine.className = 'shot-formula-line goalkeeping';
  gkLine.textContent = `${gkParts.join(' ')} = ${result.goalkeeping}`;

  const verdict = document.createElement('div');
  verdict.className = 'shot-modal-verdict';
  verdict.textContent = result.scored
    ? `${result.shooter.name} scores for ${result.shooter.team}!`
    : result.hitPost
      ? 'The ball bounces off the post and into the penalty box!'
      : goalkeepingCard && goalkeepingCard.looseBall
        ? 'Loose ball! The ball bounces around the goal.'
        : `${result.goalkeeper.name} keeps the ball.`;

  center.appendChild(outcome);
  center.appendChild(shootingLine);
  center.appendChild(gkLine);
  center.appendChild(verdict);

  content.appendChild(attackerCardEl);
  content.appendChild(center);
  content.appendChild(gkCardEl);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'shot-modal-close';
  closeBtn.textContent = 'Continue';

  modal.appendChild(content);
  modal.appendChild(closeBtn);

  const close = showModalOverlay(modal, {
    onClose,
    closeKeys: ['Escape', 'Enter'],
    closeOnOverlay: true,
  });
  closeBtn.addEventListener('click', close);
}


function showActingGoalkeeperModal(team, candidates) {
  if (simulationMode) {
    assignActingGoalkeeper(team, candidates[0]);
    return;
  }
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'shot-modal';

  const content = document.createElement('div');
  content.className = 'shot-modal-content halftime-content';

  const title = document.createElement('div');
  title.className = 'shot-modal-label';
  title.textContent = 'No goalkeeper left';
  content.appendChild(title);

  const text = document.createElement('div');
  text.className = 'shot-modal-verdict';
  text.textContent = `${team.name} lost their goalkeeper. Choose a player on the pitch to take over as keeper.`;
  content.appendChild(text);

  const row = document.createElement('div');
  row.className = 'hard-tackle-sub-row';
  let selected = candidates[0];
  for (const player of candidates) {
    const btn = document.createElement('button');
    btn.className = 'bench-slot-button';
    btn.textContent = player.name;
    if (player === selected) btn.classList.add('selected');
    btn.addEventListener('click', () => {
      selected = player;
      for (const b of row.querySelectorAll('button')) b.classList.remove('selected');
      btn.classList.add('selected');
    });
    row.appendChild(btn);
  }
  content.appendChild(row);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'shot-modal-close';
  closeBtn.textContent = 'Continue';

  modal.appendChild(content);
  modal.appendChild(closeBtn);
  overlay.appendChild(modal);

  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    document.removeEventListener('keydown', onKey);
    overlay.remove();
    assignActingGoalkeeper(team, selected);
  };
  const onKey = (e) => {
    if (e.key === 'Escape' || e.key === 'Enter') close();
  };
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', onKey);
  document.body.appendChild(overlay);
}


function showHardTackleModal({ team, action, tackler, holder, result }) {
  const opponent = board.getOpponent(team);
  const secondYellow = result.yellow && tackler.yellowCards >= 1;
  const sentOff = result.red || secondYellow;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'shot-modal';

  const content = document.createElement('div');
  content.className = 'shot-modal-content';

  const holderSide = document.createElement('div');
  holderSide.className = 'shot-modal-side';
  const holderLabel = document.createElement('div');
  holderLabel.className = 'shot-modal-label';
  holderLabel.textContent = `${holder.name} · ${holder.team}`;
  holderSide.appendChild(holderLabel);

  const holderOutcome = document.createElement('div');
  holderOutcome.className = 'shot-modal-outcome blocked';
  holderOutcome.textContent = 'INJURED';
  holderSide.appendChild(holderOutcome);

  const holderVerdict = document.createElement('div');
  holderVerdict.className = 'shot-modal-verdict';
  holderVerdict.textContent = `${holder.name} is injured and must be substituted.`;
  holderSide.appendChild(holderVerdict);

  const availableSubs = opponent.squad.filter(
    (p) => !opponent.currentPlayers.includes(p) && !p.injured && !p.sentOff
  );
  const aiControlled = opponent.controller && opponent.controller.type === 'ai';
  let selectedSub = null;
  if (aiControlled) {
    selectedSub =
      availableSubs.find((p) => p.position === holder.position) ||
      availableSubs.slice().sort((a, b) => Team.rating(b) - Team.rating(a))[0];
  } else {
    selectedSub = availableSubs[0] || null;
  }

  const subRow = document.createElement('div');
  subRow.className = 'hard-tackle-sub-row';
  if (aiControlled) {
    const label = document.createElement('div');
    label.textContent = selectedSub
      ? `AI coach selects ${selectedSub.name} to come on.`
      : 'No substitutes available.';
    subRow.appendChild(label);
  } else if (availableSubs.length > 0) {
    const label = document.createElement('div');
    label.textContent = 'Replace with:';
    subRow.appendChild(label);
    for (const sub of availableSubs) {
      const btn = document.createElement('button');
      btn.className = 'bench-slot-button';
      btn.textContent = sub.name;
      if (sub === selectedSub) btn.classList.add('selected');
      btn.addEventListener('click', () => {
        selectedSub = sub;
        for (const b of subRow.querySelectorAll('button')) b.classList.remove('selected');
        btn.classList.add('selected');
      });
      subRow.appendChild(btn);
    }
  } else {
    const label = document.createElement('div');
    label.textContent = 'No substitutes available.';
    subRow.appendChild(label);
  }
  holderSide.appendChild(subRow);
  content.appendChild(holderSide);

  const tacklerSide = document.createElement('div');
  tacklerSide.className = 'shot-modal-side';
  const tacklerLabel = document.createElement('div');
  tacklerLabel.className = 'shot-modal-label';
  tacklerLabel.textContent = `${tackler.name} · ${tackler.team}`;
  tacklerSide.appendChild(tacklerLabel);

  const tacklerOutcome = document.createElement('div');
  tacklerOutcome.className = `shot-modal-outcome ${sentOff ? 'blocked' : 'goal'}`;
  tacklerOutcome.textContent = result.red
    ? 'RED CARD'
    : secondYellow
      ? 'SECOND YELLOW · RED'
      : 'YELLOW CARD';
  tacklerSide.appendChild(tacklerOutcome);

  const tacklerVerdict = document.createElement('div');
  tacklerVerdict.className = 'shot-modal-verdict';
  tacklerVerdict.textContent = sentOff
    ? `${tackler.name} is sent off and ${tackler.team} plays on without a replacement.`
    : `${tackler.name} is cautioned.`;
  tacklerSide.appendChild(tacklerVerdict);
  content.appendChild(tacklerSide);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'shot-modal-close';
  closeBtn.textContent = 'Continue';

  modal.appendChild(content);
  modal.appendChild(closeBtn);
  overlay.appendChild(modal);

  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    document.removeEventListener('keydown', onKey);
    overlay.remove();

    holder.addEffect('injured', Infinity);
    holder.injuryMatches = 1 + Math.floor(Math.random() * 3);
    logMatch(
      team.name,
      `Hard tackle! ${holder.name} is injured and will miss the next ${holder.injuryMatches} match${holder.injuryMatches === 1 ? '' : 'es'}.`,
      'injury'
    );
    humanNotice('INJURY!');
    if (selectedSub) {
      game.recordEvent({
        type: 'sub',
        team: opponent.name,
        player: holder.name,
        detail: `${holder.name} ← ${selectedSub.name}`,
      });
      logMatch(opponent.name, `Substitution: ${holder.name} ← ${selectedSub.name}.`, 'sub');
      const holderTokenEl = tokenElForPlayer(holder);
      const holderCellEl = holderTokenEl ? holderTokenEl.closest('.cell') : null;
      opponent.substitute(holder, selectedSub);
      if (holderTokenEl) {
        if (holderTokenEl._token && typeof holderTokenEl._token.destroy === 'function') holderTokenEl._token.destroy();
        holderTokenEl.remove();
      }
      if (holderCellEl) {
        new PlayerToken({
          player: selectedSub,
          teamColor: opponent.primaryColor,
          shorts: PlayerToken.shortsFor(opponent),
        }).placeIn(holderCellEl, opponent.side === 'left' ? 'left' : 'right');
        refreshCellLayout(holderCellEl);
      }
    }

    if (holder.position === 'GK') onTeamLosesGoalkeeper(opponent, holder);

    if (result.yellow) {
      const card = game.refereeCard(tackler);
      game.recordEvent({
        type: card === 'red' ? 'red' : 'yellow',
        team: team.name,
        player: tackler.name,
      });
      logMatch(
        team.name,
        card === 'red'
          ? `RED CARD for ${tackler.name}! Sent off.`
          : `Yellow card for ${tackler.name}.`,
        'card'
      );
      humanNotice(card === 'red' ? 'RED CARD!' : 'YELLOW CARD');
      if (card === 'red') {
        removeFromPitchAndSquad(team, tackler);
        if (tackler === team.currentGoalkeeper) onTeamLosesGoalkeeper(team, tackler);
      }
    } else {
      tackler.sentOff = true;
      game.recordEvent({ type: 'red', team: team.name, player: tackler.name });
      logMatch(team.name, `RED CARD for ${tackler.name}! Sent off.`, 'card');
      humanNotice('RED CARD!');
      removeFromPitchAndSquad(team, tackler);
      if (tackler === team.currentGoalkeeper) onTeamLosesGoalkeeper(team, tackler);
    }

        const wasPenalty = resolveFault(holder, tackler);
    const playResult = game.playAction(team, action, {
      endTurn: true,
      nextTeam: opponent,
    });
    if (!playResult.success) logAlert(playResult.reason);
    if (wasPenalty) grantPenaltyShootCard(opponent);
    else grantFreeKickCards(opponent, ball);
    renderGame();
  };
  const onKey = (e) => {
    if (e.key === 'Escape' || e.key === 'Enter') close();
  };
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', onKey);

  if (simulationMode) {
    close();
    return;
  }

  document.body.appendChild(overlay);
}


function tokenElForPlayer(player) {
  for (const el of document.querySelectorAll('.player-token')) {
    if (el._token.player === player) return el;
  }
  return null;
}


const EFFECT_CHIP_COLORS = {
  cramped: '#ff8c4d',
  yellow: '#ffd60a',
  inspired: '#6a9bff',
  exhausted: '#a89a6d',
  injured: '#e05555',
  cohesiveDefense: '#2e8b57',
  defenseFocus: '#6c757d',
  blinded: '#ffff00',
};

function renderPlayerEffects() {
  for (const el of document.querySelectorAll('.player-token')) {
    const player = el._token.player;
    let container = el.querySelector('.effect-chips');
    if (!container) {
      container = document.createElement('div');
      container.className = 'effect-chips';
      el.appendChild(container);
    }
    container.innerHTML = '';
    for (const effect of player.effects) {
      const chip = document.createElement('div');
      chip.className = 'effect-chip';
      chip.style.backgroundColor = EFFECT_CHIP_COLORS[effect.type] || '#888888';
      chip.textContent = effect.char;
      chip.title = `${effect.label}${effect.turns === Infinity ? ' · whole match' : ` · ${effect.turns} turn(s) left`}\n${effect.explanation}`;
      container.appendChild(chip);
    }
    if (el._token && el._token.tooltipEl && typeof el._token.renderEffects === 'function') el._token.renderEffects();
    if (el._token && typeof el._token.renderStats === 'function') el._token.renderStats();
  }
}


const HAND_FADE_MS = 500;

const PLAYED_CARD_MOVE_MS = 150;
const PLAYED_CARD_HOLD_MS = 1000;
const PLAYED_CARD_FADE_MS = 500;

const HANDOFF_WAIT_MS = 1000;

let deferredPlayActive = false;
let handoffScheduled = false;
let handoffCaptured = null;
let simulationMode = false;
let substitutionWindowOpen = false;
let lastSimAction = null;


function dogInterruptRoll(team, action) {
  const dog =
    typeof game !== 'undefined' &&
    game &&
    game.matchEffect &&
    typeof DogOnFieldEffect !== 'undefined' &&
    game.matchEffect instanceof DogOnFieldEffect;
  if (!dog) return false;
  if (game._dogRolledThisTurn) return false;
  game._dogRolledThisTurn = true;
  if (Math.random() >= 0.1) return false;
  logMatch(team.name, `A dog sprints onto the pitch and sends ${action.name} dead — the card is wasted!`);
  return true;
}

function executeAction(team, action, work) {
  if (deferredPlayActive) return;
  substitutionWindowOpen = false;
  deferredPlayActive = true;
  if (game && game._turnHandAdds) game._turnHandAdds[team.name] = [];

  if (dogInterruptRoll(team, action)) {
    const playResult = game.playAction(team, action, { noSwitch: true });
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
    deferredPlayActive = false;
    return;
  }

  if (simulationMode) {
    try {
      work();
    } finally {
      deferredPlayActive = false;
    }
    return;
  }
  animatePlayedCard({ team: team.name, action }, playedCardSourceRect({ action }));
  setTimeout(() => {
    deferredPlayActive = false;
    work();
  }, PLAYED_CARD_MOVE_MS + PLAYED_CARD_HOLD_MS);
}

function playedCardSourceRect(played) {
  for (const el of document.querySelectorAll('.in-play-hand .action-card')) {
    if (el.__action === played.action) {
      const r = el.getBoundingClientRect();
      return { left: r.left, top: r.top, width: r.width, height: r.height };
    }
  }
  return null;
}

function animatePlayedCard(played, sourceRect) {
  const overlay = document.createElement('div');
  overlay.className = 'played-card-overlay';

  const card = createActionCard(played.action);
  card.classList.add('played-card-clone');

  const pitch = document.getElementById('pitch');
  const pitchRect = pitch ? pitch.getBoundingClientRect() : null;

  const width = sourceRect ? sourceRect.width : 112;
  const height = sourceRect ? sourceRect.height : Math.round(width * (7 / 5));
  const startX = sourceRect ? sourceRect.left : window.innerWidth / 2 - width / 2;
  const startY = sourceRect ? sourceRect.top : window.innerHeight * 0.75;
  const endX = pitchRect ? pitchRect.left + pitchRect.width / 2 - width / 2 : (window.innerWidth - width) / 2;
  const endY = pitchRect ? pitchRect.top + pitchRect.height / 2 - height / 2 : 48;

  card.style.left = `${startX}px`;
  card.style.top = `${startY}px`;
  card.style.width = `${width}px`;
  card.style.height = `${height}px`;

  overlay.appendChild(card);
  document.body.appendChild(overlay);

  card.offsetHeight;

  card.style.left = `${endX}px`;
  card.style.top = `${endY}px`;

  setTimeout(() => {
    card.classList.add('played-card-out');
  }, PLAYED_CARD_MOVE_MS + PLAYED_CARD_HOLD_MS);

  setTimeout(() => {
    overlay.remove();
  }, PLAYED_CARD_MOVE_MS + PLAYED_CARD_HOLD_MS + PLAYED_CARD_FADE_MS + 50);
}

function captureHandFadeOut() {
  const overlay = document.createElement('div');
  overlay.className = 'hand-fade-overlay';
  document.body.appendChild(overlay);

  for (const teamName of Object.keys(TEAMS)) {
    const inPlayEl = handSlots[teamName];
    const handEl = inPlayEl.querySelector('.in-play-hand');
    if (!handEl || handEl.children.length === 0) continue;
    const rect = inPlayEl.getBoundingClientRect();
    const clone = handEl.cloneNode(true);
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    overlay.appendChild(clone);
  }

  overlay.offsetHeight;
  overlay.classList.add('fading');

  setTimeout(() => {
    overlay.remove();
  }, HAND_FADE_MS + 50);
}

function flyInHands() {
  for (const teamName of Object.keys(TEAMS)) {
    const railEl = railDeckSlots && railDeckSlots[teamName];
    const deckEl = railEl ? railEl.querySelector('.deck-back') : null;
    const inPlayEl = handSlots[teamName];
    const cards = [...inPlayEl.querySelectorAll('.in-play-hand .action-card')];
    if (!deckEl || cards.length === 0) continue;

    const deckRect = deckEl.getBoundingClientRect();
    const deckX = deckRect.left + deckRect.width / 2;
    const deckY = deckRect.top + deckRect.height / 2;

    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const dx = deckX - (rect.left + rect.width / 2);
      const dy = deckY - (rect.top + rect.height / 2);
      card.classList.add('hand-fly-in');
      card.style.transform = `translate(${dx}px, ${dy}px) scale(0.35)`;
      card.style.opacity = '0';
    }

    setTimeout(() => {
      for (const card of cards) {
        card.offsetHeight;
      }
      cards.forEach((card, i) => {
        card.style.transitionDelay = `${Math.min(i, 5) * 45}ms`;
        card.style.transform = 'translate(0, 0) scale(1)';
        card.style.opacity = '1';
      });
      setTimeout(() => {
        for (const card of cards) {
          card.classList.remove('hand-fly-in');
          card.style.transform = '';
          card.style.opacity = '';
          card.style.transitionDelay = '';
        }
      }, cards.length * 45 + 600);
    }, HAND_FADE_MS);
  }
}

function captureHandPositions(teamName) {
  const inPlayEl = handSlots && handSlots[teamName];
  if (!inPlayEl) return [];
  return [...inPlayEl.querySelectorAll('.in-play-hand .action-card')].map((c) => {
    const r = c.getBoundingClientRect();
    return { action: c.__action, left: r.left, top: r.top };
  });
}

function flyInDrawnCards(teamName, drawn) {
  const railEl = railDeckSlots && railDeckSlots[teamName];
  const deckEl = railEl ? railEl.querySelector('.deck-back') : null;
  const inPlayEl = handSlots && handSlots[teamName];
  const allCards = inPlayEl
    ? [...inPlayEl.querySelectorAll('.in-play-hand .action-card')]
    : [];
  const drawnSet = new Set(drawn);
  const news = allCards.filter((c) => drawnSet.has(c.__action));
  const olds = allCards.filter((c) => !drawnSet.has(c.__action));

  const captured = handoffCaptured && handoffCaptured.teamName === teamName ? handoffCaptured.cards : null;
  handoffCaptured = null;

  const animated = [];

  if (captured && olds.length > 0) {
    for (const card of olds) {
      const prev = captured.find((p) => p.action === card.__action);
      if (!prev) continue;
      const now = card.getBoundingClientRect();
      const dx = prev.left - now.left;
      const dy = prev.top - now.top;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) continue;
      card.classList.add('hand-slide');
      card.style.transform = `translate(${dx}px, ${dy}px)`;
      animated.push(card);
    }
  }

  if (!deckEl || news.length === 0) {
    if (animated.length > 0) {
      setTimeout(() => {
        for (const card of animated) {
          card.style.transform = '';
        }
        setTimeout(() => {
          for (const card of animated) {
            card.classList.remove('hand-slide');
            card.style.transform = '';
          }
        }, 500);
      }, 30);
    }
    return;
  }

  const deckRect = deckEl.getBoundingClientRect();
  const deckX = deckRect.left + deckRect.width / 2;
  const deckY = deckRect.top + deckRect.height / 2;

  for (const card of news) {
    const rect = card.getBoundingClientRect();
    const dx = deckX - (rect.left + rect.width / 2);
    const dy = deckY - (rect.top + rect.height / 2);
    card.classList.add('hand-fly-in');
    card.style.transform = `translate(${dx}px, ${dy}px) scale(0.35)`;
    card.style.opacity = '0';
  }

  setTimeout(() => {
    for (const card of news) {
      card.offsetHeight;
    }
    news.forEach((card, i) => {
      card.style.transitionDelay = `${Math.min(i, 5) * 45}ms`;
      card.style.transform = 'translate(0, 0) scale(1)';
      card.style.opacity = '1';
    });
    if (animated.length > 0) {
      for (const card of animated) {
        card.style.transform = '';
      }
    }
    setTimeout(() => {
      for (const card of [...news, ...animated]) {
        card.classList.remove('hand-fly-in', 'hand-slide');
        card.style.transform = '';
        card.style.opacity = '';
        card.style.transitionDelay = '';
      }
    }, news.length * 45 + 600);
  }, HAND_FADE_MS);
}

function showMatchEffectAnimation(effect) {
  if (typeof simulationMode !== 'undefined' && simulationMode) return;
  if (!isHumanGame()) return;
  if (!effect) return;
  if (document.getElementById('match-effect-animation')) return;

  const pitch = document.getElementById('pitch');
  if (!pitch) return;

  const overlay = document.createElement('div');
  overlay.id = 'match-effect-animation';
  overlay.className = 'match-effect-overlay';

  const card = createActionCard(effect);
  card.classList.add('match-effect-card');
  card.classList.remove('rarity-0');
  if (card.classList.contains('category-effect')) card.classList.remove('category-effect');
  const nameEl = card.querySelector('.action-card-name');
  if (nameEl) nameEl.textContent = `${effect.char} ${effect.name}`;

  const tag = document.createElement('div');
  tag.className = 'match-effect-tag';
  tag.textContent = 'MATCH EFFECT';
  overlay.appendChild(tag);
  overlay.appendChild(card);

  pitch.appendChild(overlay);
  void overlay.offsetWidth;
  overlay.classList.add('show');

  setTimeout(() => {
    overlay.classList.add('fade');
    setTimeout(() => overlay.remove(), 1000);
  }, 3000);
}

let perfRenderTick = 0;

function renderGame() {
  perfRenderTick += 1;
  if (perfRenderTick % 30 === 1 && window.Perf && typeof window.Perf.reportCounts === 'function') {
    window.Perf.reportCounts('render#' + perfRenderTick);
  }
  if (simulationMode) return;
  if (!panelSlots || !document.getElementById('pitch')) return;
  if (!game) return;

  if (game && game.pendingHandoff && !handoffCaptured) {
    handoffCaptured = {
      teamName: game.pendingHandoff.teamName,
      cards: captureHandPositions(game.pendingHandoff.teamName),
    };
  }

  const animateHands =
    Boolean(game.pendingHandAnimation) && !game.halftimePending && !game.finished;
  if (game.pendingHandAnimation) game.pendingHandAnimation = false;
  if (animateHands) {
    captureHandFadeOut();
  }
  renderScoreboard();
  if (game && game.pendingMatchEffect) {
    const pending = game.pendingMatchEffect;
    game.pendingMatchEffect = null;
    showMatchEffectAnimation(pending);
  }
  renderGameStatus();
  renderPoints();
  renderRailControls();
  renderInPlay();
  syncFreeKickProtectionHighlight();
  renderDecks();
  for (const name of Object.keys(TEAMS)) renderBench(name);
  renderPlayerEffects();
  renderHint();
  if (trainingActive) trainingHeartbeat();
  if (game.halftimePending && !noticeOverlayActive) showHalftimeModal();
  if (game.finished && !noticeOverlayActive) {
    if (trainingActive) handleTrainingFinish();
    else if (wcMatchMode && wcMatchInProgress) wcHandleMatchEnd();
    else showGameOverModal();
  }
  if (animateHands) flyInHands();
  if (game && game.pendingHandoff && !handoffScheduled) {
    handoffScheduled = true;
    deferredPlayActive = true;
    const handoff = game.pendingHandoff;
    flyInDrawnCards(handoff.teamName, handoff.drawn || []);
    setTimeout(() => {
      handoffScheduled = false;
      deferredPlayActive = false;
      if (game && game.pendingHandoff) game.resolveHandoff();
      renderGame();
    }, HANDOFF_WAIT_MS);
  }
  tickAi();
  saveGameState();
}

function appendMatchStatsSection(section) {
  const [a, b] = Object.values(TEAMS);
  const poss = game.possessionPercentages();
  const rows = [
    ['Possession', `${poss[a.name]}% - ${poss[b.name]}%`],
    ['Shots', `${game.stats[a.name].shots} - ${game.stats[b.name].shots}`],
    ['Fouls committed', `${game.stats[a.name].fouls} - ${game.stats[b.name].fouls}`],
    [
      'Ball recoveries',
      `${game.stats[a.name].recoveries} - ${game.stats[b.name].recoveries}`,
    ],
    ['Successful passes', `${game.stats[a.name].passes} - ${game.stats[b.name].passes}`],
    ['Assists', `${game.stats[a.name].assists} - ${game.stats[b.name].assists}`],
  ];
  const statsList = section('Match stats');
  for (const [label, value] of rows) {
    const row = document.createElement('div');
    row.textContent = `${label} · ${value}`;
    statsList.appendChild(row);
  }
}

async function showHalftimeModal() {
  if (!isHumanGame()) return;
  substitutionWindowOpen = true;
  halftimeModalOpen = true;

  game.halftimePending = false;

  await humanNotice('HALF TIME');

  logMatch(
    '',
    `Half time — ${Object.values(TEAMS)
      .map((t) => `${wcTeamName(t.name)} ${game.score[t.name] || 0}`)
      .join(' - ')}.`
  );

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'shot-modal halftime-modal wide-modal';

  const content = document.createElement('div');
  content.className = 'shot-modal-content halftime-content';

  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent = 'Half Time';
  content.appendChild(title);

  const scoreLine = document.createElement('div');
  scoreLine.className = 'halftime-score';
  scoreLine.textContent = Object.values(TEAMS)
    .map((t) => `${t.name} ${game.score[t.name] || 0}`)
    .join('  -  ');
  content.appendChild(scoreLine);

  const pom = getPlayerOfTheMatch();
  if (pom) {
    const pomEl = document.createElement('div');
    pomEl.className = 'player-of-match';
    const teamLabel = pom.team && TEAMS[pom.team] ? TEAMS[pom.team].name : pom.team || '';
    pomEl.innerHTML =
      `<div class="pom-label">Player of the Match</div>` +
      `<div class="pom-name">${pom.name || '—'}</div>` +
      (teamLabel ? `<div class="pom-team">${teamLabel}</div>` : '');
    content.appendChild(pomEl);
  }

  const grid = document.createElement('div');
  grid.className = 'halftime-grid';
  content.appendChild(grid);

  const colLeft = document.createElement('div');
  colLeft.className = 'halftime-col';
  const colRight = document.createElement('div');
  colRight.className = 'halftime-col';
  grid.appendChild(colLeft);
  grid.appendChild(colRight);

  const section = (parent, heading) => {
    const h = document.createElement('div');
    h.className = 'halftime-section-title';
    h.textContent = heading;
    parent.appendChild(h);
    const list = document.createElement('div');
    list.className = 'halftime-list';
    parent.appendChild(list);
    return list;
  };

  const goalsList = section(colLeft, 'Goals');
  const goals = game.events.filter((e) => e.type === 'goal');
  if (goals.length === 0) {
    const row = document.createElement('div');
    row.textContent = 'No goals yet.';
    goalsList.appendChild(row);
  } else {
    for (const g of goals) {
      const row = document.createElement('div');
      row.textContent = `${g.minute}' · ${g.player} (${TEAMS[g.team].name})`;
      goalsList.appendChild(row);
    }
  }

  const cardsList = section(colLeft, 'Cards');
  const cards = game.events.filter((e) => e.type === 'yellow' || e.type === 'red');
  if (cards.length === 0) {
    const row = document.createElement('div');
    row.textContent = 'No cards.';
    cardsList.appendChild(row);
  } else {
    for (const c of cards) {
      const row = document.createElement('div');
      row.textContent = `${c.minute}' · ${c.type.toUpperCase()} · ${c.player} (${TEAMS[c.team].name})`;
      cardsList.appendChild(row);
    }
  }

  const subsList = section(colRight, 'Substitutions');
  const subs = game.events.filter((e) => e.type === 'sub');
  if (subs.length === 0) {
    const row = document.createElement('div');
    row.textContent = 'No substitutions.';
    subsList.appendChild(row);
  } else {
    for (const s of subs) {
      const row = document.createElement('div');
      row.textContent = `${s.minute}' · ${s.detail}`;
      subsList.appendChild(row);
    }
  }

  appendMatchStatsSection((heading) => section(colRight, heading));

  const kickoffTeam = board.nextKickoffTeam();
  const kickoffNote = document.createElement('div');
  kickoffNote.className = 'halftime-kickoff';
  kickoffNote.textContent = `${kickoffTeam.name} will kick off the second half.`;
  content.appendChild(kickoffNote);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'shot-modal-close';
  closeBtn.textContent = 'Kick off';
  closeBtn.addEventListener('click', close);

  modal.appendChild(content);
  modal.appendChild(closeBtn);
  overlay.appendChild(modal);

  let closed = false;
  async function close() {
    if (closed) return;
    closed = true;
    document.removeEventListener('keydown', onKey);
    overlay.remove();
    await humanNotice('SECOND HALF');
    resetForRestart(kickoffTeam);
    if (!game.finished) game.currentTeam = kickoffTeam;
    game.lastKickoffTeam = kickoffTeam;
    logMatch(kickoffTeam.name, `${kickoffTeam.name} kick off the second half.`);
    halftimeModalOpen = false;
    renderGame();
  }
  function onKey(e) {
    if (e.key === 'Escape' || e.key === 'Enter') close();
  }
  document.addEventListener('keydown', onKey);
  document.body.appendChild(overlay);
}

function startFireworks(container, colors) {
  const layer = document.createElement('div');
  layer.className = 'fireworks-layer';
  container.insertBefore(layer, container.firstChild);

  let stopped = false;
  const palette = colors && colors.length > 0 ? colors : ['#ffd24d', '#ffffff'];

  function burst() {
    if (stopped) return;
    const b = document.createElement('div');
    b.className = 'firework-burst';
    b.style.left = `${10 + Math.random() * 80}%`;
    b.style.top = `${8 + Math.random() * 50}%`;
    b.style.setProperty('--fw-color', palette[Math.floor(Math.random() * palette.length)]);
    const count = 14;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      const angle = ((360 / count) * i + Math.random() * 24) * (Math.PI / 180);
      const dist = 60 + Math.random() * 80;
      p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
      p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
      b.appendChild(p);
    }
    layer.appendChild(b);
    setTimeout(() => b.remove(), 1100);
  }

  burst();
  const timer = setInterval(burst, 650);
  return () => {
    stopped = true;
    clearInterval(timer);
    layer.remove();
  };
}

function scorePlayerOfTheMatch(ps) {
  return (ps.goals || 0) * 5 +
    (ps.assists || 0) * 4 +
    (ps.saves || 0) * 3 +
    (ps.recoveries || 0) * 1.5 +
    (ps.shots || 0) * 0.5;
}

function pickPlayerOfTheMatch(playerStats) {
  let best = null;
  let bestScore = -1;
  for (const [name, ps] of Object.entries(playerStats)) {
    if (name === '__none__') continue;
    if (!ps.name) continue;
    const score = scorePlayerOfTheMatch(ps);
    if (score > bestScore) {
      bestScore = score;
      best = ps;
    }
  }
  return best;
}

function getPlayerOfTheMatch() {
  return game.playerStats ? pickPlayerOfTheMatch(game.playerStats) : null;
}

async function showGameOverModal(onFinish) {
  if (!isHumanGame()) return;
  if (gameOverModalShown) return;
  gameOverModalShown = true;

  await humanNotice('FULL TIME');

  logMatch(
    '',
    `Full time — ${Object.values(TEAMS)
      .map((t) => `${wcTeamName(t.name)} ${game.score[t.name] || 0}`)
      .join(' - ')}.`
  );

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'shot-modal halftime-modal gameover-modal wide-modal';

  const content = document.createElement('div');
  content.className = 'shot-modal-content halftime-content';

  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent = 'Full Time';
  content.appendChild(title);

  const scoreLine = document.createElement('div');
  scoreLine.className = 'halftime-score';
  scoreLine.textContent = Object.values(TEAMS)
    .map((t) => `${t.name} ${game.score[t.name] || 0}`)
    .join('  -  ');
  content.appendChild(scoreLine);

  const pom = getPlayerOfTheMatch();
  if (pom) {
    const pomEl = document.createElement('div');
    pomEl.className = 'player-of-match';
    const teamLabel = pom.team && TEAMS[pom.team] ? TEAMS[pom.team].name : pom.team || '';
    pomEl.innerHTML =
      `<div class="pom-label">Player of the Match</div>` +
      `<div class="pom-name">${pom.name || '—'}</div>` +
      (teamLabel ? `<div class="pom-team">${teamLabel}</div>` : '');
    content.appendChild(pomEl);
  }

  const grid = document.createElement('div');
  grid.className = 'halftime-grid';
  content.appendChild(grid);

  const colLeft = document.createElement('div');
  colLeft.className = 'halftime-col';
  const colRight = document.createElement('div');
  colRight.className = 'halftime-col';
  grid.appendChild(colLeft);
  grid.appendChild(colRight);

  const section = (parent, heading) => {
    const h = document.createElement('div');
    h.className = 'halftime-section-title';
    h.textContent = heading;
    parent.appendChild(h);
    const list = document.createElement('div');
    list.className = 'halftime-list';
    parent.appendChild(list);
    return list;
  };

  const goalsList = section(colLeft, 'Goals');
  const goals = game.events.filter((e) => e.type === 'goal');
  if (goals.length === 0) {
    const row = document.createElement('div');
    row.textContent = 'No goals.';
    goalsList.appendChild(row);
  } else {
    for (const g of goals) {
      const row = document.createElement('div');
      row.textContent = `${g.minute}' · ${g.player} (${TEAMS[g.team].name})`;
      goalsList.appendChild(row);
    }
  }

  const cardsList = section(colLeft, 'Cards');
  const cards = game.events.filter((e) => e.type === 'yellow' || e.type === 'red');
  if (cards.length === 0) {
    const row = document.createElement('div');
    row.textContent = 'No cards.';
    cardsList.appendChild(row);
  } else {
    for (const c of cards) {
      const row = document.createElement('div');
      row.textContent = `${c.minute}' · ${c.type.toUpperCase()} · ${c.player} (${TEAMS[c.team].name})`;
      cardsList.appendChild(row);
    }
  }

  const subsList = section(colRight, 'Substitutions');
  const subs = game.events.filter((e) => e.type === 'sub');
  if (subs.length === 0) {
    const row = document.createElement('div');
    row.textContent = 'No substitutions.';
    subsList.appendChild(row);
  } else {
    for (const s of subs) {
      const row = document.createElement('div');
      row.textContent = `${s.minute}' · ${s.detail}`;
      subsList.appendChild(row);
    }
  }

  appendMatchStatsSection((heading) => section(colRight, heading));

  const [a, b] = Object.values(TEAMS);
  const sa = game.score[a.name] || 0;
  const sb = game.score[b.name] || 0;
  const resultNote = document.createElement('div');
  resultNote.className = 'halftime-kickoff';
  resultNote.textContent =
    sa === sb
      ? `It's a draw!`
      : `${(sa > sb ? a : b).name} win ${Math.max(sa, sb)}-${Math.min(sa, sb)}!`;
  content.appendChild(resultNote);

  const finishBtn = document.createElement('button');
  finishBtn.className = 'shot-modal-close';
  finishBtn.textContent = tournamentMode ? 'Back to Tournament' : 'Finish Match';
  finishBtn.addEventListener('click', close);

  modal.appendChild(content);
  modal.appendChild(finishBtn);
  overlay.appendChild(modal);

  let closed = false;
  let stopFireworks = null;
  const humanTeams = Object.values(TEAMS).filter((t) => t.controller && t.controller.type === 'human');
  const playerWon = humanTeams.some((t) => {
    const opp = Object.values(TEAMS).find((o) => o !== t);
    return (game.score[t.name] || 0) > (game.score[opp.name] || 0);
  });
  if (playerWon) {
    const winner = humanTeams.find((t) => {
      const opp = Object.values(TEAMS).find((o) => o !== t);
      return (game.score[t.name] || 0) > (game.score[opp.name] || 0);
    });
    stopFireworks = startFireworks(overlay, [
      winner && winner.primaryColor ? winner.primaryColor : '#ffd24d',
      '#ffd24d',
      '#ffffff',
    ]);
  }
  function close() {
    if (closed) return;
    closed = true;
    clearSaveGame();
    document.removeEventListener('keydown', onKey);
    if (stopFireworks) stopFireworks();
    overlay.remove();
    if (onFinish) {
      onFinish();
    } else if (tournamentMode && tournament) {
      const m = tournament.matches[tournament.currentMatchIndex];
      recordOutPlayers(m.home, m.away);
      m.played = true;
      m.homeScore = game.score[m.home] || 0;
      m.awayScore = game.score[m.away] || 0;
      tournamentMode = false;
      const homeCtrl = tournament.controllers[m.home];
      const awayCtrl = tournament.controllers[m.away];
      const humanTeam =
        homeCtrl.type === 'human' && m.homeScore > m.awayScore
          ? m.home
          : awayCtrl.type === 'human' && m.awayScore > m.homeScore
            ? m.away
            : null;
      if (humanTeam) {
        showTournamentRewardModal(humanTeam, Math.abs(m.homeScore - m.awayScore));
      } else {
        showTournamentView();
      }
    } else {
      showMainMenu();
    }
  }
  function onKey(e) {
    if (e.key === 'Escape' || e.key === 'Enter') close();
  }
  document.addEventListener('keydown', onKey);
  document.body.appendChild(overlay);
}

// ---- Persistent player availability across tournament / world-cup matches ----
// Injured players and players sent off (red card) in one match are unavailable
// for the team's NEXT match. They are kept on the bench but ineligible to be
// used as a substitute, and are replaced in the starting XI by a substitute.


function showSimResultModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'shot-modal halftime-modal sim-modal';

  const content = document.createElement('div');
  content.className = 'shot-modal-content halftime-content';

  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent = 'Match Result';
  content.appendChild(title);

  const scoreLine = document.createElement('div');
  scoreLine.className = 'halftime-score';
  scoreLine.textContent = Object.values(TEAMS)
    .map((t) => `${t.name} ${game.score[t.name] || 0}`)
    .join('  -  ');
  content.appendChild(scoreLine);

  const logEl = document.getElementById('match-log');
  const logCopy = document.createElement('div');
  logCopy.className = 'sim-log';
  if (logEl) {
    logCopy.innerHTML = logEl.innerHTML;
  }
  content.appendChild(logCopy);

  const doneBtn = document.createElement('button');
  doneBtn.className = 'shot-modal-close';
  doneBtn.textContent = 'Back to Menu';
  doneBtn.addEventListener('click', close);

  modal.appendChild(content);
  modal.appendChild(doneBtn);
  overlay.appendChild(modal);

  let closed = false;
  function close() {
    if (closed) return;
    closed = true;
    document.removeEventListener('keydown', onKey);
    overlay.remove();
    showMainMenu();
  }
  function onKey(e) {
    if (e.key === 'Escape' || e.key === 'Enter') close();
  }
  document.addEventListener('keydown', onKey);
  document.body.appendChild(overlay);
}

// ---- Main menu / match setup ----

function renderTournamentView() {
  const standings = getSortedStandings();
  const stats = getTournamentStats();

  tournamentTableBody.innerHTML = '';
  standings.forEach((team, idx) => {
    const s = stats[team];
    const tr = document.createElement('tr');
    tr.innerHTML =
      `<td>${idx + 1}</td>` +
      `<td>${team}</td>` +
      `<td>${s.P}</td>` +
      `<td>${s.W}</td>` +
      `<td>${s.D}</td>` +
      `<td>${s.L}</td>` +
      `<td>${s.GF}</td>` +
      `<td>${s.GA}</td>` +
      `<td>${s.GD > 0 ? '+' + s.GD : s.GD}</td>` +
      `<td>${s.Pts}</td>`;
    tournamentTableBody.appendChild(tr);
  });

  const nextIdx = getNextMatchIndex();

  tournamentScheduleList.innerHTML = '';
  tournament.matches.forEach((m, idx) => {
    const row = document.createElement('div');
    row.className = 'tournament-match-row';
    if (m.played) {
      row.classList.add('played');
    } else if (idx === nextIdx) {
      row.classList.add('current');
    } else {
      row.classList.add('pending');
    }

    const statusText = m.played ? 'FT' : idx === nextIdx ? 'NEXT' : '—';

    row.innerHTML =
      `<span class="tournament-match-home">${wcTeamName(m.home)}</span>` +
      `<span class="tournament-match-vs">vs</span>` +
      `<span class="tournament-match-away">${wcTeamName(m.away)}</span>` +
      `<span class="tournament-match-score">${m.played ? m.homeScore + ' - ' + m.awayScore : ''}</span>` +
      `<span class="tournament-match-status">${statusText}</span>`;
    tournamentScheduleList.appendChild(row);
  });

  const playBtn = document.getElementById('tour-play-next');
  if (nextIdx === -1) {
    playBtn.textContent = 'Tournament Complete!';
    playBtn.disabled = true;
  } else {
    playBtn.textContent = 'Play Next Match';
    playBtn.disabled = false;
  }
}


function showTournamentRewardModal(teamName, margin) {
  const team = TEAMS[teamName];
  const options = pickTournamentRewardCards(teamName, margin);

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'shot-modal halftime-modal reward-modal';

  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent = 'Victory Reward';

  const sub = document.createElement('div');
  sub.className = 'halftime-kickoff reward-subtitle';
  sub.textContent = `${team ? team.name : teamName} won by ${margin} goal${margin > 1 ? 's' : ''}. Pick one card to add to the team deck for the rest of the tournament.`;

  const row = document.createElement('div');
  row.className = 'reward-cards';

  const finish = () => {
    if (overlay.parentNode) overlay.remove();
    document.removeEventListener('keydown', onKey);
    showTournamentView();
  };

  for (const card of options) {
    const btn = document.createElement('button');
    btn.className = 'reward-card';
    btn.appendChild(createActionCard(card));
    btn.addEventListener('click', () => {
      if (!tournament.rewardCards[teamName]) tournament.rewardCards[teamName] = [];
      tournament.rewardCards[teamName].push(card);
      finish();
    });
    row.appendChild(btn);
  }

  modal.appendChild(title);
  modal.appendChild(sub);
  modal.appendChild(row);
  overlay.appendChild(modal);

  function onKey(e) {
    if (e.key === 'Enter' && options.length > 0) {
      const card = options[Math.floor(Math.random() * options.length)];
      if (!tournament.rewardCards[teamName]) tournament.rewardCards[teamName] = [];
      tournament.rewardCards[teamName].push(card);
      finish();
    } else if (e.key === 'Escape') {
      finish();
    }
  }
  document.addEventListener('keydown', onKey);
  document.body.appendChild(overlay);
}



function populateTeamSelect(select, defaultName) {
  for (const name of TEAM_NAMES) {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  }
  select.value = defaultName;
}
function controllerFromSelect(value) {
  if (value === 'human') return { type: 'human' };
  const player = value && value.startsWith('ai:') ? value.slice(3) : 'basic-coach';
  const available = typeof AI_PLAYERS !== 'undefined' ? AI_PLAYERS[player] : null;
  return { type: 'ai', player: available ? player : 'basic-coach' };
}
function showMainMenu() {
  menuScreen.classList.remove('hidden');
  setupScreen.classList.add('hidden');
  simSetupScreen.classList.add('hidden');
  tournamentSetupScreen.classList.add('hidden');
  tournamentScreen.classList.add('hidden');
  worldCupScreen.classList.add('hidden');
  rulesScreen.classList.add('hidden');
  boardEl.classList.add('hidden');
  gameStatusEl.classList.add('hidden');
  hintEl.classList.add('hidden');
}
function showGameRulesScreen() {
  menuScreen.classList.add('hidden');
  setupScreen.classList.add('hidden');
  simSetupScreen.classList.add('hidden');
  tournamentSetupScreen.classList.add('hidden');
  tournamentScreen.classList.add('hidden');
  worldCupScreen.classList.add('hidden');
  rulesScreen.classList.remove('hidden');
  boardEl.classList.add('hidden');
  gameStatusEl.classList.add('hidden');
  hintEl.classList.add('hidden');
}
function showSetupScreen() {
  menuScreen.classList.add('hidden');
  setupScreen.classList.remove('hidden');
  simSetupScreen.classList.add('hidden');
  tournamentSetupScreen.classList.add('hidden');
  tournamentScreen.classList.add('hidden');
  worldCupScreen.classList.add('hidden');
  rulesScreen.classList.add('hidden');
  boardEl.classList.add('hidden');
  gameStatusEl.classList.add('hidden');
  hintEl.classList.add('hidden');
}
function showSimSetupScreen() {
  menuScreen.classList.add('hidden');
  setupScreen.classList.add('hidden');
  simSetupScreen.classList.remove('hidden');
  tournamentSetupScreen.classList.add('hidden');
  tournamentScreen.classList.add('hidden');
  worldCupScreen.classList.add('hidden');
  rulesScreen.classList.add('hidden');
  boardEl.classList.add('hidden');
  gameStatusEl.classList.add('hidden');
  hintEl.classList.add('hidden');
}
function showTournamentSetup() {
  menuScreen.classList.add('hidden');
  setupScreen.classList.add('hidden');
  simSetupScreen.classList.add('hidden');
  tournamentSetupScreen.classList.remove('hidden');
  tournamentScreen.classList.add('hidden');
  worldCupScreen.classList.add('hidden');
  rulesScreen.classList.add('hidden');
  boardEl.classList.add('hidden');
  gameStatusEl.classList.add('hidden');
  hintEl.classList.add('hidden');
}
function showTournamentView() {
  menuScreen.classList.add('hidden');
  setupScreen.classList.add('hidden');
  simSetupScreen.classList.add('hidden');
  tournamentSetupScreen.classList.add('hidden');
  tournamentScreen.classList.remove('hidden');
  worldCupScreen.classList.add('hidden');
  rulesScreen.classList.add('hidden');
  boardEl.classList.add('hidden');
  gameStatusEl.classList.add('hidden');
  hintEl.classList.add('hidden');
  renderTournamentView();
}
function showBoard() {
  menuScreen.classList.add('hidden');
  setupScreen.classList.add('hidden');
  simSetupScreen.classList.add('hidden');
  tournamentSetupScreen.classList.add('hidden');
  tournamentScreen.classList.add('hidden');
  worldCupScreen.classList.add('hidden');
  rulesScreen.classList.add('hidden');
  boardEl.classList.remove('hidden');
  gameStatusEl.classList.remove('hidden');
  hintEl.classList.remove('hidden');
}
function updateStartBtn() {
  const sameTeams = homeTeamSelect.value === awayTeamSelect.value;
  startBtn.disabled = sameTeams;
  startBtn.textContent = sameTeams ? 'Pick two different teams' : 'Start Match';
}
function updateSimStartBtn() {
  const sameTeams = simHomeSelect.value === simAwaySelect.value;
  simStartBtn.disabled = sameTeams;
  simStartBtn.textContent = sameTeams ? 'Pick two different teams' : 'Simulate';
}
function updateTourStartBtn() {
  const teams = tourTeamSelects.map((s) => s.value);
  const unique = new Set(teams);
  const btn = document.getElementById('tour-start');
  btn.disabled = unique.size !== 4;
  btn.textContent = unique.size === 4 ? 'Start Tournament' : 'Pick four different teams';
}