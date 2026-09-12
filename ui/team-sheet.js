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
    useNatural: true,
    orient: 'vertical', // 'vertical' | 'horizontal'
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

    // Coach effects — semantic chip with the real mechanical effect
    for (const effect of editableTeam.teamEffects) {
      const spec = TEAM_EFFECTS[effect];
      if (spec) {
        conditions.push({
          kind: 'Coach',
          body: spec.label,
          sub: editableTeam.coach,
          sev: 'neutral',
          tipName: spec.label,
          tip: spec.explanation,
        });
      }
    }

    // Event effects with countdown (simplified - would come from world cup state)
    if (worldCup && window.wcEventEffects && window.wcEventEffects[editableTeamName]) {
      for (const ev of window.wcEventEffects[editableTeamName]) {
        const body = `${ev.name} · ${ev.matchesLeft} match${ev.matchesLeft !== 1 ? 'es' : ''} left`;
        conditions.push({
          kind: 'Event',
          body,
          sub: ev.source,
          sev: 'event',
          tipName: body,
          tip: '',
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
            body: `${player.name} suspended → '${replacement.name}'`,
            sub: 'Suspension',
            sev: 'warn',
            tipName: `${player.name} — ${replacement.name} steps in`,
            tip: '',
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

    // Opposition team effects (artifacts + coach effects)
    const oppTeamEffects = [];
    for (const artifact of oppositionTeam.artifacts) {
      const spec = TEAM_ARTIFACTS[artifact];
      if (spec) {
        oppTeamEffects.push({ name: spec.label, effect: spec.description, type: 'artifact' });
      }
    }
    for (const effect of oppositionTeam.teamEffects) {
      const spec = TEAM_EFFECTS[effect];
      if (spec) {
        oppTeamEffects.push({ name: spec.label, effect: spec.explanation, type: 'coach' });
      }
    }

    // Opposition player traits — individual strengths based on stats
    const oppPlayerTraits = [];
    for (const starName of oppositionTeam.starPlayers) {
      const player = oppositionTeam.squad.find(p => p.name === starName);
      if (!player) continue;
      const traits = playerTraitsFromStats(player);
      oppPlayerTraits.push({ name: player.name, traits });
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
      oppTeamEffects,
      oppPlayerTraits,
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

  function playerTraitsFromStats(player) {
    const statLabels = {
      speed: 'Pace',
      marking: 'Marking',
      tackling: 'Tackling',
      shooting: 'Finishing',
      passing: 'Passing',
      dribbling: 'Dribbling',
      tacticalThinking: 'Vision',
      heading: 'Heading',
      goalkeeping: 'Goalkeeping',
    };
    const traits = [];
    // Find top 3 stats for this player (excluding GK-specific for outfield)
    const stats = [
      { key: 'speed', label: 'Pace' },
      { key: 'marking', label: 'Marking' },
      { key: 'tackling', label: 'Tackling' },
      { key: 'shooting', label: 'Finishing' },
      { key: 'passing', label: 'Passing' },
      { key: 'dribbling', label: 'Dribbling' },
      { key: 'tacticalThinking', label: 'Vision' },
      { key: 'heading', label: 'Heading' },
      { key: 'goalkeeping', label: 'Goalkeeping' },
    ];
    // Sort by value descending
    const sorted = stats
      .map(s => ({ label: s.label, value: player[s.key] || 0 }))
      .sort((a, b) => b.value - a.value);
    // Take top 3 that are >= 7
    for (const s of sorted) {
      if (s.value >= 7 && traits.length < 3) {
        traits.push(`${s.label} ${s.value}`);
      }
    }
    return traits;
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
  // Formation selector — system metadata + mini shapes
  // ============================================================
  const SYSTEMS_ORDER = ['4-4-2', '4-3-3', '3-5-2', '4-5-1', '3-4-3', '5-3-2', '4-2-3-1'];
  const SYSTEM_META = {
    '4-4-2':   { sub: 'Two banks of four, two strikers', lines: [1, 4, 4, 2] },
    '4-3-3':   { sub: 'Three midfielders, wingers high', lines: [1, 4, 3, 3] },
    '3-5-2':   { sub: 'Wing-backs, packed midfield, two up top', lines: [1, 3, 5, 2] },
    '4-5-1':   { sub: 'Lone striker, five-man midfield', lines: [1, 4, 5, 1] },
    '3-4-3':   { sub: 'Three at back, front three', lines: [1, 3, 4, 3] },
    '5-3-2':   { sub: 'Five defenders, two strikers', lines: [1, 5, 3, 2] },
    '4-2-3-1': { sub: 'Double pivot, three behind striker', lines: [1, 4, 2, 3, 1] },
  };
  const MINI_COL_TINT = { 0: '#f2d06b', 1: '#a5e06f', 2: '#2f5bb7', 3: '#f0a35e', 4: '#f0a35e' };

  // Top-down mini: columns spread left→right (GK on own goal → attackers on
  // opponent goal), players within each column spread top→bottom. Uses width
  // (available) instead of height (scarce in the fixed 800px team sheet).
  function renderMiniDots(el, lines) {
    el.innerHTML = '';
    const n = lines.length;
    lines.forEach((count, c) => {
      if (!count) return;
      const x = 100 * (c + 0.5) / n;
      for (let i = 0; i < count; i++) {
        const y = count > 1 ? 100 * (i + 0.5) / count : 50;
        const d = document.createElement('span');
        d.className = 'ts-mini-dot';
        d.style.left = x + '%';
        d.style.top = y + '%';
        d.style.background = MINI_COL_TINT[c];
        el.appendChild(d);
      }
    });
  }

  function naturalLines() {
    const rows = { GK: 0, DF: 0, MF: 0, FW: 0 };
    for (const p of state.xi) {
      if (p && rows[p.position] !== undefined) rows[p.position]++;
    }
    return [rows.GK, rows.DF, rows.MF, rows.FW];
  }

  function updateFormationControl() {
    const meta = SYSTEM_META[state.system];
    const natural = state.useNatural;
    EL.activeName.textContent = natural ? 'Natural' : state.system;
    EL.activeSub.textContent = natural ? 'Follows the current XI' : (meta ? meta.sub : '');
    renderMiniDots(EL.activeMini, natural ? naturalLines() : (meta ? meta.lines : [0, 0, 0, 0]));

    document.querySelectorAll('.ts-default-opt').forEach(o => {
      const on = (o.dataset.natural === '1') === natural;
      o.classList.toggle('active', on);
      o.setAttribute('aria-pressed', String(on));
    });
    EL.formationSystems.querySelectorAll('.ts-system-opt').forEach(o => {
      const isActive = !natural && o.dataset.system === state.system;
      o.classList.toggle('active', isActive);
      o.setAttribute('aria-pressed', String(isActive));
    });
  }

  function closeFormationSystems() {
    if (!EL.formationSystems.classList.contains('is-open')) return;
    EL.formationSystems.classList.remove('is-open');
    EL.formationSelector.classList.remove('open');
    EL.formationSelector.setAttribute('aria-expanded', 'false');
  }

  function setOrient(orient) {
    if (orient !== 'vertical' && orient !== 'horizontal') return;
    state.orient = orient;
    renderPitch();
    updateHints();
  }

  function renderFormationSystems() {
    EL.formationSystems.innerHTML = '';
    for (const key of SYSTEMS_ORDER) {
      const opt = document.createElement('button');
      opt.type = 'button';
      opt.className = 'ts-system-opt';
      opt.dataset.system = key;
      opt.setAttribute('aria-pressed', 'false');
      const mini = document.createElement('span');
      mini.className = 'ts-mini-shape';
      mini.setAttribute('aria-hidden', 'true');
      renderMiniDots(mini, SYSTEM_META[key].lines);
      const label = document.createElement('span');
      label.textContent = key;
      opt.appendChild(mini);
      opt.appendChild(label);
      opt.onclick = () => {
        state.system = key;
        state.useNatural = false;
        state.order = state.xi.map((_, i) => i);
        closeFormationSystems();
        renderPitch();
        updateHints();
      };
      EL.formationSystems.appendChild(opt);
    }
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
    if (state.conditions.length === 0) {
      EL.conditions.style.display = 'none';
      return;
    }
    EL.conditions.style.display = 'flex';
    EL.chipRow.innerHTML = '';

    const SHOWN = 3;
    state.conditions.forEach((c, i) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `ts-effect-chip sev-${c.sev}`;
      if (i >= SHOWN) chip.hidden = true;
      const tipFull = (c.tipName || c.body) + (c.tip ? ' — ' + c.tip : '');
      chip.setAttribute('data-tip', tipFull);
      chip.setAttribute('title', tipFull);
      chip.innerHTML = `
        <span class="ts-effect-kind">${c.kind}</span>
        <span class="ts-effect-body">${c.body}<span class="ts-effect-sub">${c.sub}</span></span>
        <span class="ts-sr-only">${c.tip || c.body}</span>
      `;
      EL.chipRow.appendChild(chip);
    });

    const nHidden = Math.max(0, state.conditions.length - SHOWN);
    EL.chipsMore.hidden = nHidden === 0;
    EL.chipsMore.textContent = `+${nHidden} more`;
    EL.chipsMore.onclick = () => {
      EL.chipRow.querySelectorAll('.ts-effect-chip').forEach(c => c.hidden = false);
      EL.chipsMore.hidden = true;
    };
  }

  function renderPitch() {
    // Get coordinates for current system
    let coords;
    const editableTeam = state.editableIsHome ? state.homeTeamObj : state.awayTeamObj;
    const editableTeamSide = editableTeam.side; // 'left' or 'right'
    const teamFormation = editableTeam.formation; // TeamClass.formation (already mirrored for side)
    
    if (state.useNatural) {
      // Use team's actual formation - convert from grid coords to percentages
      coords = [];
      for (let i = 0; i < 11; i++) {
        const player = state.xi[i];
        if (player && teamFormation[player.name]) {
          const [gridX, gridY] = teamFormation[player.name];
          // Convert grid (0-8, 0-6) to percentage (0-100)
          const xPct = Math.round((gridX / 8) * 100);
          // Clamp width to the same 12-88% band the preset systems use, so
          // the natural (grid) formation doesn't render wider than the others
          const yPct = Math.round(12 + (gridY / 6) * 76);
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

    // Sync pitch orientation UI (class on the field + toggle state)
    const vertical = state.orient === 'vertical';
    EL.pitch.classList.toggle('ts-pitch-vertical', vertical);
    document.querySelectorAll('.ts-orient-opt').forEach(o => {
      const on = o.dataset.orient === state.orient;
      o.classList.toggle('active', on);
      o.setAttribute('aria-pressed', String(on));
    });

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
      token.style.left = `${vertical ? yPct : xPct}%`;
      const bottomPct = editableTeamSide === 'right' ? 100 - xPct : xPct;
      token.style[vertical ? 'bottom' : 'top'] = vertical ? `${bottomPct}%` : `${yPct}%`;
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

    // Formation selector state (system choice + natural toggle)
    updateFormationControl();
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

    // Team Effects (artifacts + coach effects)
    const teamEffectsEl = document.getElementById('ts-opp-team-effects');
    if (teamEffectsEl) {
      teamEffectsEl.innerHTML = '';
      // Coach name header
      if (oppositionTeam.coach) {
        const coachHeader = document.createElement('div');
        coachHeader.className = 'ts-section-title ts-coach-header';
        coachHeader.textContent = `Coach: ${oppositionTeam.coach}`;
        teamEffectsEl.appendChild(coachHeader);
      }
      for (const effect of state.oppTeamEffects) {
        const div = document.createElement('div');
        div.className = `ts-team-effect-pill ${effect.type}`;
        div.innerHTML = `
          <div class="ts-team-effect-name">${effect.name}</div>
          <div class="ts-team-effect-desc">${effect.effect}</div>
        `;
        teamEffectsEl.appendChild(div);
      }
    }

    // Player Traits (individual strengths)
    const playerTraitsEl = document.getElementById('ts-opp-player-traits');
    if (playerTraitsEl) {
      playerTraitsEl.innerHTML = '';
      for (const pt of state.oppPlayerTraits) {
        const div = document.createElement('div');
        div.className = 'ts-player-trait-row';
        div.innerHTML = `
          <div class="ts-player-trait-name">${pt.name}</div>
          <div class="ts-player-trait-list">${pt.traits.join(', ')}</div>
        `;
        playerTraitsEl.appendChild(div);
      }
    }

    // Danger men
    EL.dangerList.innerHTML = '';
    // Star players section title
    const dangerTitle = document.createElement('div');
    dangerTitle.className = 'ts-section-title ts-danger-title';
    dangerTitle.textContent = 'Star players';
    EL.dangerList.appendChild(dangerTitle);
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
      system: '4-4-2',
      useNatural: true, // default to team's actual formation
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
    EL.chipRow = document.getElementById('ts-chip-row');
    EL.chipsMore = document.getElementById('ts-chips-more');
    EL.formationSelector = document.getElementById('ts-formation-selector');
    EL.formationSystems = document.getElementById('ts-formation-systems');
    EL.activeMini = document.getElementById('ts-active-mini');
    EL.activeName = document.getElementById('ts-active-name');
    EL.activeSub = document.getElementById('ts-active-sub');
    EL.tokens = document.getElementById('ts-tokens');
    EL.pitch = document.getElementById('ts-pitch');
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
    EL.oppTeamEffects = document.getElementById('ts-opp-team-effects');
    EL.oppPlayerTraits = document.getElementById('ts-opp-player-traits');
    EL.dangerList = document.getElementById('ts-danger-list');

    // Bind events
    EL.tabs.querySelectorAll('.ts-tab').forEach(btn => {
      btn.onclick = () => handleTabClick(btn.dataset.tab);
    });

    // Formation selector + natural toggle
    renderFormationSystems();
    EL.formationSelector.onclick = (e) => {
      e.stopPropagation();
      const open = EL.formationSystems.classList.toggle('is-open');
      EL.formationSelector.classList.toggle('open', open);
      EL.formationSelector.setAttribute('aria-expanded', String(open));
    };
    document.querySelectorAll('.ts-default-opt').forEach(o => {
      o.onclick = () => {
        state.useNatural = o.dataset.natural === '1';
        state.order = state.xi.map((_, i) => i);
        renderPitch();
        updateHints();
      };
    });

    // Pitch orientation toggle
    document.querySelectorAll('.ts-orient-opt').forEach(o => {
      o.onclick = () => setOrient(o.dataset.orient);
    });

    document.getElementById('ts-kickoff').onclick = () => {
      // Apply final lineup to team and start match
      applyLineupAndStart();
    };

    // ESC: close the formation dropdown first, then go back
    const escHandler = (e) => {
      if (e.key !== 'Escape') return;
      if (EL.formationSystems.classList.contains('is-open')) {
        closeFormationSystems();
        return;
      }
      hideTeamSheet();
      if (typeof onBack === 'function') onBack();
      else showSetupScreen();
      document.removeEventListener('keydown', escHandler);
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
    if (!state.useNatural) {
      // Custom formation selected - convert from percentages to grid
      const coords = FORMATIONS[state.system];
      const isRight = editableTeam.side === 'right';
      editableTeam.formation = {};
      for (let slotIdx = 0; slotIdx < 11; slotIdx++) {
        const xiIdx = state.order[slotIdx];
        const player = state.xi[xiIdx];
        if (player) {
          // Convert percentage coordinates to grid coordinates (9x7 grid)
          const [xPct, yPct] = coords[slotIdx];
          let gridX = Math.round((xPct / 100) * 8);
          const gridY = Math.round((yPct / 100) * 6);
          // Mirror to board space for a right-side team (own goal at column 8)
          if (isRight) gridX = 8 - gridX;
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
  document.addEventListener('click', function tsOutsideClick(e) {
    const wrap = document.getElementById('ts-formation-wrap');
    const systems = document.getElementById('ts-formation-systems');
    if (wrap && systems && systems.classList.contains('is-open') && !wrap.contains(e.target) && !systems.contains(e.target)) {
      systems.classList.remove('is-open');
      const selector = document.getElementById('ts-formation-selector');
      if (selector) {
        selector.classList.remove('open');
        selector.setAttribute('aria-expanded', 'false');
      }
    }
  });

  window.TeamSheetState = state;
})();