// ---- FIFA World Cup 2026 data & logic ----
// Groups match the real 2026 World Cup final draw (Dec 5, 2025) with the
// playoff winners (Bosnia and Herzegovina, Czechia, Iraq, DR Congo, Sweden,
// Türkiye) confirmed on Mar 31, 2026. Knockout bracket follows FIFA's
// published schedule (matches 73-104).

const WORLD_CUP_GROUPS = [
  { name: 'A', teams: ['Mexico', 'South Korea', 'South Africa', 'Czechia'] },
  { name: 'B', teams: ['Canada', 'Switzerland', 'Qatar', 'Bosnia and Herzegovina'] },
  { name: 'C', teams: ['Brazil', 'Morocco', 'Scotland', 'Haiti'] },
  { name: 'D', teams: ['United States', 'Australia', 'Paraguay', 'Türkiye'] },
  { name: 'E', teams: ['Germany', 'Ecuador', 'Ivory Coast', 'Curaçao'] },
  { name: 'F', teams: ['Netherlands', 'Japan', 'Tunisia', 'Sweden'] },
  { name: 'G', teams: ['Belgium', 'Iran', 'Egypt', 'New Zealand'] },
  { name: 'H', teams: ['Spain', 'Uruguay', 'Saudi Arabia', 'Cape Verde'] },
  { name: 'I', teams: ['France', 'Senegal', 'Norway', 'Iraq'] },
  { name: 'J', teams: ['Argentina', 'Austria', 'Algeria', 'Jordan'] },
  { name: 'K', teams: ['Portugal', 'Colombia', 'Uzbekistan', 'DR Congo'] },
  { name: 'L', teams: ['England', 'Croatia', 'Panama', 'Ghana'] },
];

const WORLD_CUP_ROUND_NAMES = [
  'Round of 32',
  'Round of 16',
  'Quarter-finals',
  'Semi-finals',
  'Third-place match',
  'Final',
];

// Round-of-32 matches that take a third-placed team, with the groups
// FIFA allows to feed that slot (Annex C of the tournament regulations).
const WC_THIRD_SLOTS = [
  { match: 74, allowed: ['A', 'B', 'C', 'D', 'F'] },
  { match: 77, allowed: ['C', 'D', 'F', 'G', 'H'] },
  { match: 79, allowed: ['C', 'E', 'F', 'H', 'I'] },
  { match: 80, allowed: ['E', 'H', 'I', 'J', 'K'] },
  { match: 81, allowed: ['B', 'E', 'F', 'I', 'J'] },
  { match: 82, allowed: ['A', 'E', 'H', 'I', 'J'] },
  { match: 85, allowed: ['E', 'F', 'G', 'I', 'J'] },
  { match: 87, allowed: ['D', 'E', 'I', 'J', 'L'] },
];

function generateGroupMatches(teams) {
  const [a, b, c, d] = teams;
  const make = (home, away, matchday) => ({
    home,
    away,
    matchday,
    played: false,
    homeScore: null,
    awayScore: null,
    stats: null,
    playerStats: null,
  });
  return [
    make(a, b, 1),
    make(c, d, 1),
    make(a, c, 2),
    make(d, b, 2),
    make(d, a, 3),
    make(b, c, 3),
  ];
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randomizeGroups(allTeams) {
  const shuffled = shuffleArray(allTeams);
  const groups = [];
  const groupNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  for (let i = 0; i < groupNames.length; i++) {
    groups.push({
      name: groupNames[i],
      teams: shuffled.slice(i * 4, i * 4 + 4),
    });
  }
  return groups;
}

function createWorldCup(randomize = false) {
  let groups;
  if (randomize) {
    const allTeams = WORLD_CUP_GROUPS.flatMap((g) => g.teams);
    groups = randomizeGroups(allTeams).map((g) => ({
      name: g.name,
      teams: [...g.teams],
      matches: generateGroupMatches(g.teams),
    }));
  } else {
    groups = WORLD_CUP_GROUPS.map((g) => ({
      name: g.name,
      teams: [...g.teams],
      matches: generateGroupMatches(g.teams),
    }));
  }
  return {
    phase: 'groups',
    groups,
    rounds: [],
    matchesByLabel: {},
    completed: false,
    champion: null,
  };
}

function computeGroupStandings(group) {
  const rows = {};
  for (const t of group.teams) {
    rows[t] = { team: t, P: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, Pts: 0 };
  }
  for (const m of group.matches) {
    if (!m.played) continue;
    const h = rows[m.home];
    const a = rows[m.away];
    h.P++;
    a.P++;
    h.GF += m.homeScore;
    h.GA += m.awayScore;
    a.GF += m.awayScore;
    a.GA += m.homeScore;
    if (m.homeScore > m.awayScore) {
      h.W++;
      h.Pts += 3;
      a.L++;
    } else if (m.homeScore < m.awayScore) {
      a.W++;
      a.Pts += 3;
      h.L++;
    } else {
      h.D++;
      a.D++;
      h.Pts += 1;
      a.Pts += 1;
    }
  }
  for (const t of group.teams) rows[t].GD = rows[t].GF - rows[t].GA;
  return [...group.teams]
    .map((t) => rows[t])
    .sort((x, y) => {
      if (y.Pts !== x.Pts) return y.Pts - x.Pts;
      if (y.GD !== x.GD) return y.GD - x.GD;
      return y.GF - x.GF;
    });
}

function getGroupResults(state) {
  const results = {};
  for (const g of state.groups) {
    const st = computeGroupStandings(g);
    results[g.name] = {
      winner: st[0].team,
      runnerUp: st[1].team,
      third: st[2].team,
    };
  }
  return results;
}

function getThirdPlaceRanking(state) {
  const thirds = [];
  for (const g of state.groups) {
    const st = computeGroupStandings(g);
    thirds.push({ group: g.name, team: st[2].team, row: st[2] });
  }
  thirds.sort((a, b) => {
    if (b.row.Pts !== a.row.Pts) return b.row.Pts - a.row.Pts;
    if (b.row.GD !== a.row.GD) return b.row.GD - a.row.GD;
    if (b.row.GF !== a.row.GF) return b.row.GF - a.row.GF;
    return 0;
  });
  return thirds;
}

function allocateThirdPlaces(qualifiedGroups) {
  const slots = WC_THIRD_SLOTS.map((s) => ({ match: s.match, allowed: s.allowed, group: null }));
  const groups = [...qualifiedGroups].sort();
  function solve(i) {
    if (i === groups.length) return true;
    const g = groups[i];
    for (const slot of slots) {
      if (slot.group === null && slot.allowed.includes(g)) {
        slot.group = g;
        if (solve(i + 1)) return true;
        slot.group = null;
      }
    }
    return false;
  }
  solve(0);
  return slots;
}

function makeKoMatch(label, home, away) {
  return {
    label,
    home,
    away,
    played: false,
    homeScore: null,
    awayScore: null,
    pen: false,
    penHome: null,
    penAway: null,
    winner: null,
    stats: null,
    playerStats: null,
  };
}

function buildRoundOf32(state) {
  const results = getGroupResults(state);
  const thirds = getThirdPlaceRanking(state);
  const qualified = thirds.slice(0, 8);
  const thirdByGroup = {};
  for (const t of qualified) thirdByGroup[t.group] = t.team;
  const slots = allocateThirdPlaces(qualified.map((t) => t.group));
  const slotByMatch = {};
  for (const s of slots) slotByMatch[s.match] = thirdByGroup[s.group];

  const G = (x) => results[x];
  const matches = [
    makeKoMatch(73, G('A').runnerUp, G('B').runnerUp),
    makeKoMatch(74, G('E').winner, slotByMatch[74]),
    makeKoMatch(75, G('F').winner, G('C').runnerUp),
    makeKoMatch(76, G('C').winner, G('F').runnerUp),
    makeKoMatch(77, G('I').winner, slotByMatch[77]),
    makeKoMatch(78, G('E').runnerUp, G('I').runnerUp),
    makeKoMatch(79, G('A').winner, slotByMatch[79]),
    makeKoMatch(80, G('L').winner, slotByMatch[80]),
    makeKoMatch(81, G('D').winner, slotByMatch[81]),
    makeKoMatch(82, G('G').winner, slotByMatch[82]),
    makeKoMatch(83, G('K').runnerUp, G('L').runnerUp),
    makeKoMatch(84, G('H').winner, G('J').runnerUp),
    makeKoMatch(85, G('B').winner, slotByMatch[85]),
    makeKoMatch(86, G('J').winner, G('H').runnerUp),
    makeKoMatch(87, G('K').winner, slotByMatch[87]),
    makeKoMatch(88, G('D').runnerUp, G('G').runnerUp),
  ];
  return matches;
}

function matchWinner(m) {
  if (!m.played) return null;
  if (m.winner) return m.winner;
  if (m.homeScore > m.awayScore) return m.home;
  if (m.awayScore > m.homeScore) return m.away;
  return null;
}

function buildNextRound(state) {
  const byLabel = (label) => state.matchesByLabel[label];
  const w = (label) => matchWinner(byLabel(label));
  const l = (label) => {
    const m = byLabel(label);
    const winner = matchWinner(m);
    return winner === m.home ? m.away : m.home;
  };

  const last = state.rounds[state.rounds.length - 1];
  const name = last.name;
  let nextName = null;
  let matches = null;

  if (name === 'Round of 32') {
    nextName = 'Round of 16';
    matches = [
      makeKoMatch(89, w(74), w(77)),
      makeKoMatch(90, w(73), w(75)),
      makeKoMatch(91, w(76), w(78)),
      makeKoMatch(92, w(79), w(80)),
      makeKoMatch(93, w(83), w(84)),
      makeKoMatch(94, w(81), w(82)),
      makeKoMatch(95, w(86), w(88)),
      makeKoMatch(96, w(85), w(87)),
    ];
  } else if (name === 'Round of 16') {
    nextName = 'Quarter-finals';
    matches = [
      makeKoMatch(97, w(89), w(90)),
      makeKoMatch(98, w(93), w(94)),
      makeKoMatch(99, w(91), w(92)),
      makeKoMatch(100, w(95), w(96)),
    ];
  } else if (name === 'Quarter-finals') {
    nextName = 'Semi-finals';
    matches = [
      makeKoMatch(101, w(97), w(98)),
      makeKoMatch(102, w(99), w(100)),
    ];
  } else if (name === 'Semi-finals') {
    nextName = 'Third-place match';
    matches = [makeKoMatch(103, l(101), l(102))];
  } else if (name === 'Third-place match') {
    nextName = 'Final';
    matches = [makeKoMatch(104, w(101), w(102))];
  }

  if (nextName) {
    const round = { name: nextName, matches };
    state.rounds.push(round);
    for (const m of matches) state.matchesByLabel[m.label] = m;
  }
}

function wcAdvance(state) {
  if (state.phase === 'groups') {
    const groupsDone = state.groups.every((g) => g.matches.every((m) => m.played));
    if (!groupsDone) return;
    const r32 = buildRoundOf32(state);
    state.rounds.push({ name: 'Round of 32', matches: r32 });
    for (const m of r32) state.matchesByLabel[m.label] = m;
    state.phase = 'knockout';
    return;
  }

  const last = state.rounds[state.rounds.length - 1];
  if (!last.matches.every((m) => m.played)) return;

  if (last.name === 'Final') {
    state.completed = true;
    state.champion = matchWinner(last.matches[0]);
    return;
  }
  buildNextRound(state);
}

function wcNextMatch(state) {
  if (state.phase === 'groups') {
    for (const matchday of [1, 2, 3]) {
      for (const g of state.groups) {
        const m = g.matches.find((m) => !m.played && m.matchday === matchday);
        if (m) return { group: g.name, matchday, match: m };
      }
    }
    return null;
  }
  for (const r of state.rounds) {
    const m = r.matches.find((m) => !m.played);
    if (m) return { round: r.name, match: m };
  }
  return null;
}

function wcGroupStats(state) {
  return state.groups.map((g) => ({
    name: g.name,
    teams: g.teams,
    standings: computeGroupStandings(g),
  }));
}

function wcTeamStrength(name) {
  const TeamClass = TEAM_CLASSES[name];
  if (!TeamClass) return 50;
  try {
    const team = new TeamClass();
    const players = team.squad || [];
    if (players.length === 0) return 50;
    const total = players.reduce((sum, p) => {
      return (
        sum +
        p.speed +
        p.marking +
        p.tackling +
        p.shooting +
        p.passing +
        p.dribbling +
        p.tacticalThinking +
        p.heading +
        p.goalkeeping
      );
    }, 0);
    return total / players.length;
  } catch (err) {
    return 50;
  }
}

function wcPenaltyShootout(home, away) {
  const hs = wcTeamStrength(home);
  const as = wcTeamStrength(away);
  const p = (s) => Math.min(0.85, Math.max(0.3, 0.5 + (s - 50) / 40));
  let h = 0;
  let a = 0;
  for (let i = 0; i < 5; i++) {
    if (Math.random() < p(hs)) h++;
    if (Math.random() < p(as)) a++;
  }
  let guard = 0;
  while (h === a && guard++ < 60) {
    if (Math.random() < p(hs)) h++;
    if (Math.random() < p(as)) a++;
  }
  return { home: h, away: a, winner: h > a ? home : away };
}
