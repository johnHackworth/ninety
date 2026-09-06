// Team Sheet Screen
// Sits between the hub and kick-off: last place to change lineup, only place to see full scouting picture of opposition

(function () {
  'use strict';

  // ============================================================
  // Formation coordinate sets — stored as [x%, y%] pairs (11 each)
  // x%: 0 (own goal line) → 100 (opponent goal line)
  // y%: 0 (top touchline) → 100 (bottom touchline)
  // ============================================================
  const FORMATIONS = {
    '4-4-2': [
      [0, 50],    // GK - at goal line (0%)
      [22, 12],   // RB
      [22, 35],   // RCB
      [22, 65],   // LCB
      [22, 88],   // LB
      [48, 18],   // RM
      [48, 42],   // RCM
      [48, 58],   // LCM
      [48, 82],   // LM
      [75, 35],   // RS
      [75, 65],   // LS
    ],
    '4-3-3': [
      [0, 50],    // GK
      [22, 12],   // RB
      [22, 35],   // RCB
      [22, 65],   // LCB
      [22, 88],   // LB
      [45, 25],   // RM
      [48, 50],   // CM
      [45, 75],   // LM
      [75, 18],   // RW
      [75, 50],   // ST
      [75, 82],   // LW
    ],
    '3-5-2': [
      [0, 50],    // GK
      [24, 25],   // RCB
      [24, 50],   // CB
      [24, 75],   // LCB
      [48, 12],   // RWB
      [48, 35],   // RCM
      [48, 50],   // CM
      [48, 65],   // LCM
      [48, 88],   // LWB
      [75, 35],   // RS
      [75, 65],   // LS
    ],
    '4-5-1': [
      [0, 50],    // GK
      [22, 12],   // RB
      [22, 35],   // RCB
      [22, 65],   // LCB
      [22, 88],   // LB
      [48, 15],   // RM
      [48, 35],   // RCM
      [48, 50],   // CM
      [48, 65],   // LCM
      [48, 85],   // LM
      [75, 50],   // ST
    ],
    '3-4-3': [
      [0, 50],    // GK
      [24, 25],   // RCB
      [24, 50],   // CB
      [24, 75],   // LCB
      [48, 15],   // RM
      [48, 40],   // RCM
      [48, 60],   // LCM
      [48, 85],   // LM
      [75, 20],   // RW
      [75, 50],   // ST
      [75, 80],   // LW
    ],
    '5-3-2': [
      [0, 50],    // GK
      [18, 10],   // RWB
      [22, 25],   // RCB
      [22, 50],   // CB
      [22, 75],   // LCB
      [18, 90],   // LWB
      [48, 35],   // RCM
      [48, 50],   // CM
      [48, 65],   // LCM
      [75, 35],   // RS
      [75, 65],   // LS
    ],
    '4-2-3-1': [
      [0, 50],    // GK
      [22, 12],   // RB
      [22, 35],   // RCB
      [22, 65],   // LCB
      [22, 88],   // LB
      [48, 35],   // CDM (right)
      [48, 65],   // CDM (left)
      [45, 20],   // RAM
      [48, 50],   // CAM
      [45, 80],   // LAM
      [75, 50],   // ST
    ],
  };

  // ============================================================
  // Position colour mapping (shared with card/coach systems)
  // ============================================================
  const POS_COLOURS = {
    GK: { fill: '#f2d06b', ink: '#3a2c05', ring: '#c9a02e', disc: '#f2d06b' },
    DF: { fill: '#a5e06f', ink: '#1f3d10', ring: '#6fae3f', disc: '#a5e06f' },
    MF: { fill: '#2f5bb7', ink: '#ffffff', ring: '#7fb3ff', disc: '#2f5bb7' },
    FW: { fill: '#f0a35e', ink: '#3a1b06', ring: '#c06a25', disc: '#f0a35e' },
  };

  const POS_KEY_STATS = {
    GK: ['goalkeeping', 'heading', 'passing', 'tackling'],
    DF: ['marking', 'tackling', 'heading', 'speed'],
    MF: ['passing', 'tackling', 'dribbling', 'tackling'],
    FW: ['shooting', 'dribbling', 'speed', 'passing'],
  };

  // ============================================================
  // State
  // ============================================================
  let state = {
    system: '4-4-2',
    tab: 'xi', // 'xi' | 'bench'
    sel: null, // null | { from: 'xi'|'bench', idx: number }
    order: [], // array of 11 roster indices → pitch slots
    xi: [],    // mutable copy of starting XI (11 Player objects)
    bench: [], // mutable copy of bench (7 Player objects)
    homeTeam: null,
    awayTeam: null,
    matchday: 1,
    venue: '',
    conditions: [], // array of condition objects
    oppUnavailable: [], // opposition unavailable/doubtful players
    oppTraits: [], // opposition team traits
    oppDangerMen: [], // opposition danger men
  };

  const EL = {};

  // ============================================================
  // Helpers
  // ============================================================
  function calculateOVR(player) {
    const stats = POS_KEY_STATS[player.position] || POS_KEY_STATS.MF;
    const sum = stats.reduce((acc, s) => acc + (player[s] || 0), 0);
    return (sum / stats.length).toFixed(1);
  }

  function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function getSurname(name) {
    const parts = name.trim().split(/\s+/);
    return parts[parts.length - 1];
  }

  function flagForTeam(teamName) {
    const flags = {
      Spain: '🇪🇸', Argentina: '🇦🇷', Brazil: '🇧🇷', England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      France: '🇫🇷', Germany: '🇩🇪', Italy: '🇮🇹', Portugal: '🇵🇹',
      Netherlands: '🇳🇱', Belgium: '🇧🇪', Uruguay: '🇺🇾', Croatia: '🇭🇷',
      Morocco: '🇲🇦', Japan: '🇯🇵', Korea: '🇰🇷', USA: '🇺🇸',
      Mexico: '🇲🇽', Colombia: '🇨🇴', Ecuador: '🇪🇨', Peru: '🇵🇪',
      Switzerland: '🇨🇭', Denmark: '🇩🇰', Sweden: '🇸🇪', Norway: '🇳🇴',
      Poland: '🇵🇱', Serbia: '🇷🇸', Wales: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
      Turkey: '🇹🇷', Austria: '🇦🇹', Czechia: '🇨🇿', Hungary: '🇭🇺',
      Canada: '🇨🇦', Australia: '🇦🇺', Iran: '🇮🇷', Saudi: '🇸🇦',
      Qatar: '🇶🇦', Tunisia: '🇹🇳', Ghana: '🇬🇭', Senegal: '🇸🇳',
      Cameroon: '🇨🇲', Nigeria: '🇳🇬', Algeria: '🇩🇿', Egypt: '🇪🇬',
      'South Africa': '🇿🇦', 'Ivory Coast': '🇨🇮', Mali: '🇲🇱', 'DR Congo': '🇨🇩',
      Panama: '🇵🇦', 'Costa Rica': '🇨🇷', Jamaica: '🇯🇲', 'New Zealand': '🇳🇿',
      Paraguay: '🇵🇾', Bolivia: '🇧🇴', Venezuela: '🇻🇪', Iraq: '🇮🇶',
      Jordan: '🇯🇴', UAE: '🇦🇪', Oman: '🇴🇲', Bahrain: '🇧🇭',
      Kuwait: '🇰🇼', Lebanon: '🇱🇧', Syria: '🇸🇾', Palestine: '🇵🇸',
      Haiti: '🇭🇹', 'Cape Verde': '🇨🇻', Curacao: '🇨🇼', Bosnia: '🇧🇦',
      Herzegovina: '🇧🇦', Georgia: '🇬🇪', Armenia: '🇦🇲', Azerbaijan: '🇦🇿',
      Kazakhstan: '🇰🇿', Uzbekistan: '🇺🇿', Turkmenistan: '🇹🇲', Kyrgyzstan: '🇰🇬',
      Tajikistan: '🇹🇯', Afghanistan: '🇦🇫', Pakistan: '🇵🇰', Bangladesh: '🇧🇩',
      Nepal: '🇳🇵', Bhutan: '🇧🇹', Maldives: '🇲🇻', 'Sri Lanka': '🇱🇰',
    };
    return flags[teamName] || '🏳️';
  }

  function formatReason(reason) {
    // Ensure consequences are included, not bare "injured"
    return reason;
  }

  // ============================================================
  // Data preparation
  // ============================================================
  function prepareTeamSheetData(homeTeam, awayTeam, matchday, venue, homeController, awayController) {
    // Build teams if not already built (TEAMS is only set after startMatch)
    const teams = (typeof TEAMS !== 'undefined' && TEAMS && TEAMS[homeTeam]) ? TEAMS : buildTeams([homeTeam, awayTeam]);
    const home = teams[homeTeam];
    const away = teams[awayTeam];

    // Determine which team is human-controlled
    const homeIsHuman = homeController && homeController.type === 'human';
    const awayIsHuman = awayController && awayController.type === 'human';
    const editableIsHome = homeIsHuman || (!awayIsHuman && homeIsHuman); // default to home if both AI or both human
    const editableTeam = editableIsHome ? home : away;
    const oppositionTeam = editableIsHome ? away : home;
    const editableTeamName = editableIsHome ? homeTeam : awayTeam;
    const oppositionTeamName = editableIsHome ? awayTeam : homeTeam;

    // Build mutable xi and bench from currentPlayers and squad
    const xiNames = editableTeam.currentPlayers.map(p => p.name);
    const xi = editableTeam.currentPlayers.map(p => p);
    const benchPlayers = editableTeam.squad.filter(p => !xiNames.includes(p.name));
    const bench = benchPlayers.slice(0, 7);

    // Build order array: map each xi player to their formation slot index
    const formationCoords = FORMATIONS[state.system];
    const order = xi.map((player, idx) => idx); // identity mapping initially

    // Build conditions strip
    const conditions = [];

    // Coach effects — alternate blue/gold for visual variety
    let coachEffectIndex = 0;
    for (const effect of editableTeam.teamEffects) {
      const spec = TEAM_EFFECTS[effect];
      if (spec) {
        const isGold = coachEffectIndex % 2 === 1;
        conditions.push({
          kind: 'Coach effect',
          effect: spec.label,
          source: editableTeam.coach,
          class: 'coach' + (isGold ? ' gold' : ''),
        });
        coachEffectIndex++;
      }
    }

    // Event effects with countdown (simplified - would come from world cup state)
    if (worldCup && window.wcEventEffects && window.wcEventEffects[editableTeamName]) {
      for (const ev of window.wcEventEffects[editableTeamName]) {
        conditions.push({
          kind: 'Event effect',
          effect: `${ev.name} · ${ev.matchesLeft} match${ev.matchesLeft !== 1 ? 'es' : ''} left`,
          source: ev.source,
          class: 'event',
        });
      }
    }

    // Unavailable players + stopgaps
    if (worldCup && window.wcSuspendedPlayers && window.wcSuspendedPlayers[editableTeamName]) {
      for (const name of window.wcSuspendedPlayers[editableTeamName]) {
        const player = editableTeam.squad.find(p => p.name === name);
        const replacement = editableTeam.currentPlayers.find(p => p.position === (player?.position)) || editableTeam.currentPlayers[0];
        if (player && replacement) {
          conditions.push({
            kind: 'Unavailable',
            effect: `${player.name} suspended → '${replacement.name}'`,
            source: 'Suspension',
            class: 'unavail',
          });
        }
      }
    }

    // Opposition scouting data
    const oppUnavailable = [];
    if (worldCup && window.wcSuspendedPlayers && window.wcSuspendedPlayers[oppositionTeamName]) {
      for (const name of window.wcSuspendedPlayers[oppositionTeamName]) {
        const player = oppositionTeam.squad.find(p => p.name === name);
        const replacement = oppositionTeam.squad.find(p => p.position === (player?.position) && !oppositionTeam.currentPlayers.includes(p));
        oppUnavailable.push({
          name,
          status: 'Out',
          tag: 'Susp',
          reason: `second yellow in qualifying — ${replacement?.name || 'Vranckx'} steps in, −2 tackling`,
        });
      }
    }
    // Add some defaults for demo
    if (oppositionTeamName === 'Belgium' && oppUnavailable.length === 0) {
      oppUnavailable.push(
        { name: 'Courtois', status: 'Out', tag: 'Susp', reason: 'knee, ruled out of the group stage — Casteels starts' },
        { name: 'Onana', status: 'Out', tag: 'Susp', reason: 'second yellow in qualifying — Vranckx steps in, −2 tackling' },
        { name: 'Doku', status: 'Doubt', tag: 'Doubt', reason: 'hamstring, late fitness test — 50% he plays' }
      );
    }

    // Opposition traits (from artifacts/coach)
    const oppTraits = [];
    for (const artifact of oppositionTeam.artifacts) {
      const spec = TEAM_ARTIFACTS[artifact];
      if (spec) {
        oppTraits.push({ name: spec.label, effect: spec.description });
      }
    }
    // Add coach effect as trait
    for (const effect of oppositionTeam.teamEffects) {
      const spec = TEAM_EFFECTS[effect];
      if (spec) {
        oppTraits.push({ name: spec.label, effect: spec.explanation });
      }
    }

    // Danger men: opposition star players
    const oppDangerMen = [];
    for (const starName of oppositionTeam.starPlayers) {
      const player = oppositionTeam.squad.find(p => p.name === starName);
      if (!player) continue;
      const role = dangerRoleForPosition(player.position);
      const threat = threatTextForPlayer(player, editableTeam);
      const counter = counterTextForPlayer(player, editableTeam);
      oppDangerMen.push({
        player,
        role,
        threat,
        counter,
        isDoubt: oppUnavailable.some(u => u.name === starName),
      });
    }

    return {
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      matchday,
      venue,
      xi,
      bench,
      order,
      conditions,
      oppUnavailable,
      oppTraits,
      oppDangerMen,
      homeFlag: flagForTeam(homeTeam),
      awayFlag: flagForTeam(awayTeam),
      homeFormation: home.formation,
      awayFormation: away.formation,
      homeSquad: home.squad,
      awaySquad: away.squad,
      homeTeamObj: home,
      awayTeamObj: away,
      editableIsHome,
      editableTeamName,
      oppositionTeamName,
    };
  }

  function dangerRoleForPosition(pos) {
    const roles = {
      GK: 'Shot stopper',
      DF: 'Anchor',
      MF: 'Playmaker',
      FW: 'Target man',
    };
    // More specific roles based on stats
    return roles[pos] || 'Key player';
  }

  function threatTextForPlayer(player, homeTeam) {
    const threats = {
      GK: 'Every shot they face is 20% harder to save while he is on the pitch.',
      DF: 'Every attacker they mark loses 1 dribbling and 1 speed while he is on the pitch.',
      MF: 'Every Tactical card they play draws them an extra card while he is on the pitch.',
      FW: 'Every shot they take gains +2 shooting while he is on the pitch.',
    };
    return threats[player.position] || 'Their presence changes how the opposition must play.';
  }

  function counterTextForPlayer(player, homeTeam) {
    const home = homeTeam;
    let bestCounter = null;
    let bestDesc = '';

    if (player.position === 'FW' || player.position === 'MF') {
      // Find best defender for marking/heading
      for (const p of home.currentPlayers) {
        if (p.position === 'DF' || p.position === 'GK') {
          const markDiff = (p.marking || 0) - (player.dribbling || 0);
          const headDiff = (p.heading || 0) - (player.heading || 0);
          if (markDiff > 0 || headDiff > 0) {
            if (!bestCounter || markDiff > bestCounter) {
              bestCounter = markDiff;
              bestDesc = `${p.name} outmarks him ${p.marking} to ${player.dribbling}`;
            }
            if (headDiff > bestCounter) {
              bestCounter = headDiff;
              bestDesc = `${p.name} outheads him ${p.heading} to ${player.heading}`;
            }
          }
        }
      }
    }
    if (player.position === 'FW' || player.position === 'MF') {
      // Find fastest defender
      for (const p of home.currentPlayers) {
        if (p.position === 'DF') {
          const speedDiff = (p.speed || 0) - (player.speed || 0);
          if (speedDiff >= 0 && (!bestCounter || speedDiff > bestCounter)) {
            bestCounter = speedDiff;
            bestDesc = `${p.name} at ${p.speed} speed is your only match for him`;
          }
        }
      }
    }
    if (player.position === 'GK') {
      for (const p of home.currentPlayers) {
        if (p.position === 'FW') {
          bestDesc = `${p.name} at ${p.shooting} shooting tests him best`;
          break;
        }
      }
    }
    return bestDesc || 'No obvious answer in your squad — avoid letting him dominate.';
  }

  // ============================================================
  // Render
  // ============================================================
  function render() {
    // Header
    EL.homeFlag.textContent = state.homeFlag;
    EL.awayFlag.textContent = state.awayFlag;
    EL.homeName.textContent = state.homeTeam;
    EL.awayName.textContent = state.awayTeam;
    EL.meta.textContent = `Matchday ${state.matchday} · ${state.venue}`;

    // Conditions
    renderConditions();

    // Left panel: pitch
    renderPitch();

    // Middle panel: squad
    renderSquad();

    // Right panel: opposition
    renderOpposition();

    // Update hints
    updateHints();
  }

  function renderConditions() {
    // Clear only condition cards, preserve the "In effect" label
    const label = EL.conditions.querySelector('.ts-conditions-label');
    EL.conditions.innerHTML = '';
    if (label) EL.conditions.appendChild(label);
    
    if (state.conditions.length === 0) {
      EL.conditions.style.display = 'none';
      return;
    }
    EL.conditions.style.display = 'flex';
    for (const c of state.conditions) {
      const card = document.createElement('div');
      card.className = `ts-condition-card ${c.class}`;
      card.innerHTML = `
        <div class="ts-condition-kind">${c.kind}</div>
        <div class="ts-condition-effect">${c.effect}</div>
        <div class="ts-condition-source">${c.source}</div>
      `;
      EL.conditions.appendChild(card);
    }
  }

  function renderPitch() {
    // Get coordinates for current system
    let coords;
    const editableTeam = state.editableIsHome ? state.homeTeamObj : state.awayTeamObj;
    const editableTeamSide = editableTeam.side; // 'left' or 'right'
    const teamFormation = editableTeam.formation; // TeamClass.formation (already mirrored for side)
    
    if (state.system === 'Default') {
      // Use team's actual formation - convert from grid coords to percentages
      coords = [];
      for (let i = 0; i < 11; i++) {
        const player = state.xi[i];
        if (player && teamFormation[player.name]) {
          const [gridX, gridY] = teamFormation[player.name];
          // Convert grid (0-8, 0-6) to percentage (0-100)
          const xPct = Math.round((gridX / 8) * 100);
          const yPct = Math.round((gridY / 6) * 100);
          coords.push([xPct, yPct]);
        } else {
          // Fallback
          coords.push([0, 50]);
        }
      }
    } else {
      coords = FORMATIONS[state.system];
      if (editableTeamSide === 'right') {
        // Mirror x-coordinates: 0% <-> 100%, 22% <-> 78%, etc.
        coords = coords.map(([x, y]) => [100 - x, y]);
      }
    }

    const tokensEl = EL.tokens;
    tokensEl.innerHTML = '';

    // Update panel title with editable team name
    const editableTeamName = state.editableIsHome ? state.homeTeam : state.awayTeam;
    const panelTitleEl = document.querySelector('#ts-pitch-panel .ts-panel-title');
    if (panelTitleEl) {
      panelTitleEl.textContent = `${editableTeamName} shape`;
    }

    // Build token list: order maps slot index -> xi index
    for (let slotIdx = 0; slotIdx < 11; slotIdx++) {
      const xiIdx = state.order[slotIdx] ?? slotIdx;
      const player = state.xi[xiIdx];
      if (!player) continue;

      const [xPct, yPct] = coords[slotIdx];
      const colours = POS_COLOURS[player.position];
      const isStar = player.isStar;
      const isSelected = state.sel && state.sel.from === 'xi' && state.sel.idx === xiIdx;

      const token = document.createElement('div');
      token.className = `ts-token ts-pos-${player.position.toLowerCase()} ${isSelected ? 'selected' : ''}`;
      token.style.left = `${xPct}%`;
      token.style.top = `${yPct}%`;
      token.style.background = colours.fill;
      token.style.borderColor = colours.ring;
      token.dataset.from = 'xi';
      token.dataset.idx = xiIdx;
      token.innerHTML = `
        <span class="ts-token-initials">${getInitials(player.name)}</span>
        <span class="ts-token-surname">${getSurname(player.name)}</span>
        ${isStar ? '<span class="ts-token-star">★</span>' : ''}
      `;
      token.addEventListener('click', () => handleTokenClick('xi', xiIdx));
      tokensEl.appendChild(token);
    }

    // Formation pills
    EL.formationPills.innerHTML = '';
    const formationKeys = ['Default', '4-4-2', '4-3-3', '3-5-2', '4-5-1', '3-4-3', '5-3-2', '4-2-3-1'];
    for (const key of formationKeys) {
      const btn = document.createElement('button');
      btn.className = `ts-formation-pill ${state.system === key ? 'active' : ''}`;
      btn.textContent = key;
      btn.addEventListener('click', () => {
        state.system = key;
        // Rebuild order to identity for new formation
        state.order = state.xi.map((_, i) => i);
        renderPitch();
        updateHints();
      });
      EL.formationPills.appendChild(btn);
    }
  }

  function renderSquad() {
    // Tab counts
    EL.xiCount.textContent = state.xi.length;
    EL.benchCount.textContent = state.bench.length;

    // XI list
    EL.xiList.innerHTML = '';
    for (let i = 0; i < state.xi.length; i++) {
      const player = state.xi[i];
      const isSelected = state.sel && state.sel.from === 'xi' && state.sel.idx === i;
      EL.xiList.appendChild(createSquadRow(player, i, 'xi', isSelected));
    }

    // Bench list
    EL.benchList.innerHTML = '';
    for (let i = 0; i < state.bench.length; i++) {
      const player = state.bench[i];
      const isSelected = state.sel && state.sel.from === 'bench' && state.sel.idx === i;
      EL.benchList.appendChild(createSquadRow(player, i, 'bench', isSelected));
    }

    // Show active tab
    EL.xiList.classList.toggle('hidden', state.tab !== 'xi');
    EL.benchList.classList.toggle('hidden', state.tab !== 'bench');
    EL.tabs.querySelectorAll('.ts-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === state.tab);
    });
  }

  function createSquadRow(player, idx, from, isSelected) {
    const row = document.createElement('div');
    row.className = `ts-squad-row ${isSelected ? 'selected' : ''}`;
    row.dataset.from = from;
    row.dataset.idx = idx;

    const colours = POS_COLOURS[player.position];
    const ovr = calculateOVR(player);
    const isStar = player.isStar;
    const isCaptain = idx === 0; // first in XI is captain

    row.innerHTML = `
      <div class="ts-pos-disc ts-disc-${player.position.toLowerCase()}">${getInitials(player.name)}</div>
      <div class="ts-player-info">
        <span class="ts-player-name">${player.name}</span>
        <span class="ts-player-meta">${player.position} · ${player.age}</span>
      </div>
      <span class="ts-ovr">${ovr}</span>
      <div class="ts-markers">
        ${isStar ? '<span class="ts-star-pill">★ Star</span>' : ''}
        ${isCaptain ? '<span class="ts-status-pill">C</span>' : ''}
        <span class="ts-status-pill">Fit</span>
      </div>
    `;
    row.addEventListener('click', () => handleTokenClick(from, idx));
    return row;
  }

  function renderOpposition() {
    const oppositionTeam = state.editableIsHome ? state.awayTeamObj : state.homeTeamObj;
    const oppositionTeamName = state.editableIsHome ? state.awayTeam : state.homeTeam;

    // Name + scouted chip
    EL.oppName.textContent = oppositionTeamName;

    // Formation text + shape note
    const formationText = formationToText(oppositionTeam.formation);
    const shapeNote = shapeNoteForFormation(oppositionTeam.formation);
    EL.oppFormation.innerHTML = `
      <span class="ts-opp-formation-shape">${formationText}</span>
      <span class="ts-opp-formation-note">${shapeNote}</span>
    `;

    // Team news
    EL.oppNews.innerHTML = '';
    for (const item of state.oppUnavailable) {
      const div = document.createElement('div');
      div.className = 'ts-opp-news-item';
      div.innerHTML = `
        <span class="ts-opp-news-tag ${item.tag.toLowerCase()}">${item.tag}</span>
        <div class="ts-opp-news-body">
          <div class="ts-opp-news-name">${item.name}</div>
          <div class="ts-opp-news-reason">${item.reason}</div>
        </div>
      `;
      EL.oppNews.appendChild(div);
    }

    // Traits
    EL.oppTraits.innerHTML = '';
    for (const trait of state.oppTraits) {
      const div = document.createElement('div');
      div.className = 'ts-trait-pill';
      div.innerHTML = `
        <div class="ts-trait-name">${trait.name}</div>
        <div class="ts-trait-effect">${trait.effect}</div>
      `;
      EL.oppTraits.appendChild(div);
    }

    // Danger men
    EL.dangerList.innerHTML = '';
    for (const dm of state.oppDangerMen) {
      const colours = POS_COLOURS[dm.player.position];
      const div = document.createElement('div');
      div.className = 'ts-danger-card';
      div.innerHTML = `
        <div class="ts-danger-header">
          <div class="ts-danger-disc" style="background:${colours.fill}; border-color:#ffd24a;">${getInitials(dm.player.name)}</div>
          <span class="ts-danger-name">${dm.player.name}</span>
          <span class="ts-danger-role">${dm.role}</span>
        </div>
        <div class="ts-threat">Threat — ${dm.threat}</div>
        <div class="ts-counter"><span class="ts-counter-label">Counter:</span> ${dm.counter}</div>
      `;
      EL.dangerList.appendChild(div);
    }
  }

  function formationToText(formation) {
    // Count players per row (simplified)
    const rows = { GK: 0, DF: 0, MF: 0, FW: 0 };
    const oppositionSquad = state.editableIsHome ? state.awaySquad : state.homeSquad;
    for (const name of Object.keys(formation)) {
      const player = oppositionSquad.find(p => p.name === name);
      if (player) rows[player.position]++;
    }
    return `${rows.DF}-${rows.MF}-${rows.FW}`;
  }

  function shapeNoteForFormation(formation) {
    // Generate a basic shape note based on formation
    const text = formationToText(formation);
    const notes = {
      '4-4-2': 'Two banks of four, two strikers',
      '4-3-3': 'Three midfielders, wingers high',
      '3-5-2': 'Wing-backs, packed midfield, two up top',
      '4-5-1': 'Lone striker, five-man midfield',
      '3-4-3': 'Three at back, front three',
      '5-3-2': 'Five defenders, two strikers',
      '4-2-3-1': 'Double pivot, three behind striker',
    };
    return notes[text] || `${text} shape`;
  }

  // ============================================================
  // Interaction: one gesture does everything (click, then click)
  // ============================================================
  function handleTokenClick(from, idx) {
    if (state.sel && state.sel.from === from && state.sel.idx === idx) {
      // Re-click same player → deselect
      state.sel = null;
    } else if (state.sel) {
      // Second click → complete the pair
      const first = state.sel;
      const second = { from, idx };

      if (first.from === 'xi' && second.from === 'xi') {
        // Starter + starter → swap pitch positions (exchange order entries)
        const slotA = state.order.indexOf(first.idx);
        const slotB = state.order.indexOf(second.idx);
        if (slotA !== -1 && slotB !== -1) {
          [state.order[slotA], state.order[slotB]] = [state.order[slotB], state.order[slotA]];
        }
      } else if ((first.from === 'xi' && second.from === 'bench') || (first.from === 'bench' && second.from === 'xi')) {
        // Bench + starter → substitution
        const xiIdx = first.from === 'xi' ? first.idx : second.idx;
        const benchIdx = first.from === 'bench' ? first.idx : second.idx;
        const slot = state.order.indexOf(xiIdx);
        // Swap players between xi and bench, keep pitch slot
        [state.xi[xiIdx], state.bench[benchIdx]] = [state.bench[benchIdx], state.xi[xiIdx]];
        // The incoming player inherits the slot (order already points to xiIdx)
      } else if (first.from === 'bench' && second.from === 'bench') {
        // Bench + bench → move selection to newly clicked bench player
        state.sel = second;
        renderSquad();
        updateHints();
        return;
      }

      state.sel = null;
    } else {
      // First click → select
      state.sel = { from, idx };
    }

    renderPitch();
    renderSquad();
    updateHints();
  }

  // ============================================================
  // Hints — state-dependent, name actual players
  // ============================================================
  function updateHints() {
    // Pitch hint
    let pitchHint = '';
    if (!state.sel) {
      pitchHint = 'Click a player, then another, to swap positions.';
    } else if (state.sel.from === 'xi') {
      const player = state.xi[state.sel.idx];
      pitchHint = `${player.name} selected — click another starter to swap positions.`;
    } else {
      const player = state.bench[state.sel.idx];
      pitchHint = `${player.name} selected — click the starter they replace.`;
    }
    EL.pitchHint.textContent = pitchHint;

    // Squad hint
    let squadHint = '';
    if (state.tab === 'xi') {
      if (!state.sel) {
        squadHint = 'Swap two starters, or open the bench to substitute.';
      } else if (state.sel.from === 'xi') {
        const player = state.xi[state.sel.idx];
        squadHint = `${player.name} selected — swap positions, or pick a substitute.`;
      } else {
        const player = state.bench[state.sel.idx];
        squadHint = `${player.name} comes on — pick who makes way.`;
      }
    } else { // bench tab
      if (!state.sel) {
        squadHint = 'Pick a substitute, then the starter they replace.';
      } else if (state.sel.from === 'bench') {
        const player = state.bench[state.sel.idx];
        squadHint = `${player.name} selected — click the starter they replace.`;
      } else {
        const player = state.xi[state.sel.idx];
        squadHint = `${player.name} selected — swap positions, or pick a substitute.`;
      }
    }
    EL.squadHint.textContent = squadHint;
  }

  // ============================================================
  // Tab switching (must NOT clear selection)
  // ============================================================
  function handleTabClick(tab) {
    state.tab = tab;
    renderSquad();
    updateHints();
  }

  // ============================================================
  // Public API
  // ============================================================
  window.showTeamSheet = function (homeTeam, awayTeam, matchday = 1, venue = 'Neutral Ground', homeController, awayController, onBack) {
    const data = prepareTeamSheetData(homeTeam, awayTeam, matchday, venue, homeController, awayController);

    // Populate state
    state = {
      ...state,
      ...data,
      system: 'Default', // default to team's actual formation
      tab: 'xi',
      sel: null,
      order: data.xi.map((_, i) => i),
      homeController: homeController || { type: 'human' },
      awayController: awayController || { type: 'ai', player: 'basic-coach' },
    };

    // Cache elements
    EL.homeFlag = document.getElementById('ts-home-flag');
    EL.awayFlag = document.getElementById('ts-away-flag');
    EL.homeName = document.getElementById('ts-home-name');
    EL.awayName = document.getElementById('ts-away-name');
    EL.meta = document.getElementById('ts-meta');
    EL.conditions = document.getElementById('ts-conditions');
    EL.formationPills = document.getElementById('ts-formation-pills');
    EL.tokens = document.getElementById('ts-tokens');
    EL.pitchHint = document.getElementById('ts-pitch-hint');
    EL.tabs = document.getElementById('ts-tabs');
    EL.xiCount = document.getElementById('ts-xi-count');
    EL.benchCount = document.getElementById('ts-bench-count');
    EL.xiList = document.getElementById('ts-xi-list');
    EL.benchList = document.getElementById('ts-bench-list');
    EL.squadHint = document.getElementById('ts-squad-hint');
    EL.oppName = document.getElementById('ts-opp-name');
    EL.oppFormation = document.getElementById('ts-opp-formation');
    EL.oppNews = document.getElementById('ts-opp-news');
    EL.oppTraits = document.getElementById('ts-opp-traits');
    EL.dangerList = document.getElementById('ts-danger-list');

    // Bind events
    EL.tabs.querySelectorAll('.ts-tab').forEach(btn => {
      btn.onclick = () => handleTabClick(btn.dataset.tab);
    });

    document.getElementById('ts-kickoff').onclick = () => {
      // Apply final lineup to team and start match
      applyLineupAndStart();
    };

    // ESC to go back
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        hideTeamSheet();
        if (typeof onBack === 'function') onBack();
        else showSetupScreen();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);

    // Show screen
    document.getElementById('team-sheet-screen').classList.remove('hidden');
    render();
  };

  function hideTeamSheet() {
    document.getElementById('team-sheet-screen').classList.add('hidden');
  }

  function applyLineupAndStart() {
    // Build both teams with modifications
    const teams = buildTeams([state.homeTeam, state.awayTeam]);
    const home = teams[state.homeTeam];
    const away = teams[state.awayTeam];

    // Apply current xi order to the editable team (human-controlled)
    const editableTeam = state.editableIsHome ? home : away;
    editableTeam.currentPlayers = [...state.xi];
    editableTeam.currentGoalkeeper = editableTeam.currentPlayers.find(p => p.position === 'GK') || null;

    // Update formation coords based on current system and order
    if (state.system !== 'Default') {
      // Custom formation selected - convert from percentages to grid
      const coords = FORMATIONS[state.system];
      editableTeam.formation = {};
      for (let slotIdx = 0; slotIdx < 11; slotIdx++) {
        const xiIdx = state.order[slotIdx];
        const player = state.xi[xiIdx];
        if (player) {
          // Convert percentage coordinates to grid coordinates (9x7 grid)
          const [xPct, yPct] = coords[slotIdx];
          const gridX = Math.round((xPct / 100) * 8);
          const gridY = Math.round((yPct / 100) * 6);
          editableTeam.formation[player.name] = [gridX, gridY];
        }
      }
    }
    // If 'Default', keep the team's existing formation (already set correctly by buildTeams)

    // Hide team sheet
    hideTeamSheet();

    // Actually start the match with preset teams and proper controllers
    startMatch(state.homeTeam, state.awayTeam, state.homeController, state.awayController, teams);
    showBoard();
  }

  // ============================================================
  // Expose for debugging
  // ============================================================
  window.TeamSheetState = state;
})();