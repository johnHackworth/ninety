function generateTournamentSchedule(teamNames) {
  const n = teamNames.length;
  const matches = [];
  const others = teamNames.slice(1);
  for (let round = 0; round < n - 1; round++) {
    const rotated = [teamNames[0], ...others];
    for (let i = 0; i < n / 2; i++) {
      matches.push({
        home: rotated[i],
        away: rotated[n - 1 - i],
        played: false,
        homeScore: null,
        awayScore: null,
      });
    }
    others.unshift(others.pop());
  }
  return matches;
}

function getTournamentStats() {
  const stats = {};
  for (const team of tournament.teams) {
    stats[team] = { P: 0, W: 0, D: 0, L: 0, GF: 0, GA: 0, GD: 0, Pts: 0 };
  }
  for (const m of tournament.matches) {
    if (!m.played) continue;
    stats[m.home].P++;
    stats[m.away].P++;
    stats[m.home].GF += m.homeScore;
    stats[m.home].GA += m.awayScore;
    stats[m.away].GF += m.awayScore;
    stats[m.away].GA += m.homeScore;
    if (m.homeScore > m.awayScore) {
      stats[m.home].W++;
      stats[m.home].Pts += 3;
      stats[m.away].L++;
    } else if (m.homeScore < m.awayScore) {
      stats[m.away].W++;
      stats[m.away].Pts += 3;
      stats[m.home].L++;
    } else {
      stats[m.home].D++;
      stats[m.away].D++;
      stats[m.home].Pts += 1;
      stats[m.away].Pts += 1;
    }
  }
  for (const team of tournament.teams) {
    stats[team].GD = stats[team].GF - stats[team].GA;
  }
  return stats;
}

function getSortedStandings() {
  const stats = getTournamentStats();
  return [...tournament.teams].sort((a, b) => {
    if (stats[b].Pts !== stats[a].Pts) return stats[b].Pts - stats[a].Pts;
    if (stats[b].GD !== stats[a].GD) return stats[b].GD - stats[a].GD;
    return stats[b].GF - stats[a].GF;
  });
}

function getNextMatchIndex() {
  return tournament.matches.findIndex((m) => !m.played);
}


function tournamentPlayNextMatch() {
  const nextIdx = getNextMatchIndex();
  if (nextIdx === -1) return;

  const m = tournament.matches[nextIdx];
  const homeCtrl = tournament.controllers[m.home];
  const awayCtrl = tournament.controllers[m.away];
  const bothAi = homeCtrl.type === 'ai' && awayCtrl.type === 'ai';

  tournament.currentMatchIndex = nextIdx;

  if (bothAi) {
    simulateMatch(m.home, m.away);
    recordOutPlayers(m.home, m.away);
    m.played = true;
    m.homeScore = game.score[m.home] || 0;
    m.awayScore = game.score[m.away] || 0;
    showTournamentView();
  } else {
    tournamentMode = true;
    showTeamSheet(m.home, m.away, tournament.currentMatchIndex + 1, 'Tournament', homeCtrl, awayCtrl, () => {
      tournamentMode = false;
      showTournamentView();
    });
  }
}

function cancelTournament() {
  tournament = null;
  tournamentMode = false;
  if (game) {
    game.finished = true;
    game = null;
  }
  showMainMenu();
}

function pickTournamentRewardCards(teamName, margin) {
  const ownedNames = new Set(
    (tournament.rewardCards[teamName] || []).map((c) => c.name)
  );
  const allClasses = Object.values(StartingDeck.cardClass).filter(
    (Ctor) => typeof Ctor === 'function' && Ctor !== ShootAction
  );
  const pools = {
    1: allClasses.filter((Ctor) => Ctor.rarity === 1),
    2: allClasses.filter((Ctor) => Ctor.rarity === 2),
    3: allClasses.filter((Ctor) => Ctor.rarity === 3),
  };
  const specs = margin >= 3 ? [[2, 2], [1, 3]] : margin === 2 ? [[2, 1], [1, 2]] : [[3, 1]];
  const picked = [];
  for (const [count, rarity] of specs) {
    let pool = pools[rarity].filter((Ctor) => !ownedNames.has(new Ctor().name));
    if (pool.length === 0) pool = pools[rarity];
    for (let i = 0; i < count; i++) {
      const candidates = pool.filter((Ctor) => !picked.some((c) => c.constructor === Ctor));
      const Ctor = candidates.length > 0
        ? candidates[Math.floor(Math.random() * candidates.length)]
        : pools[rarity][Math.floor(Math.random() * pools[rarity].length)];
      picked.push(new Ctor());
    }
  }
  return picked;
}