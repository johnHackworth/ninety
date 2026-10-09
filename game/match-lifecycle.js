function showHoldCardModal(teamName) {
  return new Promise((resolve) => {
    const hand = game.inPlay[teamName] || [];
    if (hand.length === 0) {
      resolve();
      return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const modal = document.createElement('div');
    modal.className = 'shot-modal halftime-modal card-pick-modal';

    const title = document.createElement('div');
    title.className = 'halftime-title';
    title.textContent = 'CARD HOLD';
    modal.appendChild(title);

    const desc = document.createElement('div');
    desc.className = 'halftime-kickoff';
    desc.textContent = 'Choose one card to hold for the entire match — it will never be discarded.';
    modal.appendChild(desc);

    const cardWrap = document.createElement('div');
    cardWrap.className = 'halftime-content training-cards-row card-pick-scroll';

    for (const card of hand) {
      if (card.hold) continue;
      const cardEl = createActionCard(card);
      cardEl.classList.add('training-pick', 'hold-choice', `rarity-${card.rarity}`);

      cardEl.addEventListener('click', () => {
        cardEl.classList.add('held-glow');
        setTimeout(() => {
          overlay.remove();
          if (!game.matchHeldCards[teamName]) game.matchHeldCards[teamName] = [];
          game.matchHeldCards[teamName].push(card.name);
          card.hold = true;
          logMatch(teamName, `${card.name} is marked as held — it stays in hand every turn.`);
          renderGame();
          resolve();
        }, 350);
      });

      cardWrap.appendChild(cardEl);
    }

    modal.appendChild(cardWrap);

    const skipBtn = document.createElement('button');
    skipBtn.className = 'shot-modal-close';
    skipBtn.textContent = 'Skip';
    skipBtn.addEventListener('click', () => {
      overlay.remove();
      resolve();
    });
    modal.appendChild(skipBtn);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  });
}

function outPlayersState() {
  return worldCup || tournament;
}

const STAR_MILESTONES = [
  { stat: 'goals', threshold: 3, label: 'goals' },
  { stat: 'recoveries', threshold: 5, label: 'ball recoveries' },
  { stat: 'assists', threshold: 3, label: 'assists' },
  { stat: 'saves', threshold: 5, label: 'saves' },
];

const POSITION_SIGNATURE_STATS = {
  GK: ['goalkeeping', 'tacticalThinking', 'speed'],
  DF: ['marking', 'tackling', 'heading', 'speed'],
  MF: ['passing', 'tacticalThinking', 'dribbling', 'speed'],
  FW: ['shooting', 'dribbling', 'speed', 'heading'],
};

function applyStarPromotions() {
  const target = outPlayersState();
  if (!target || !target.starPromotions) return;
  for (const team of Object.values(TEAMS)) {
    const promoMap = target.starPromotions[team.name];
    if (!promoMap) continue;
    for (const name of Object.keys(promoMap)) {
      const player = team.squad.find((p) => p.name === name);
      if (!player) continue;
      player.isStar = true;
      if (!team.starPlayers.includes(name)) team.starPlayers.push(name);
      for (const attr of Object.keys(promoMap[name])) {
        if (BOOSTABLE_STATS.includes(attr)) player[attr] += promoMap[name][attr];
      }
    }
  }
}

function recordStarPromotions() {
  const target = outPlayersState();
  if (!target || !game || !game.playerStats) return;
  if (!target.starPromotions) target.starPromotions = {};
  for (const name of Object.keys(game.playerStats)) {
    if (name === '__none__') continue;
    const s = game.playerStats[name];
    const milestone = STAR_MILESTONES.find((m) => (s[m.stat] || 0) >= m.threshold);
    if (!milestone) continue;
    const team = s.team && TEAMS[s.team];
    if (!team) continue;
    const player = team.squad.find((p) => p.name === name);
    if (!player || player.isStar) continue;
    const related =
      POSITION_SIGNATURE_STATS[player.position] ||
      BOOSTABLE_STATS.filter((a) => !POSITION_SIGNATURE_STATS.GK.concat(POSITION_SIGNATURE_STATS.DF, POSITION_SIGNATURE_STATS.MF, POSITION_SIGNATURE_STATS.FW).includes(a));
    const mainStat = related[Math.floor(Math.random() * related.length)];
    const pool = BOOSTABLE_STATS.filter((a) => a !== mainStat);
    const boosts = { [mainStat]: 2 };
    while (Object.keys(boosts).length < 4 && pool.length > 0) {
      const idx = Math.floor(Math.random() * pool.length);
      boosts[pool.splice(idx, 1)[0]] = 1;
    }
    player.isStar = true;
    if (!team.starPlayers.includes(name)) team.starPlayers.push(name);
    for (const attr of Object.keys(boosts)) player[attr] += boosts[attr];
    if (!target.starPromotions[team.name]) target.starPromotions[team.name] = {};
    target.starPromotions[team.name][name] = boosts;
    const boostText = Object.keys(boosts)
      .map((a) => `+${boosts[a]} ${a}`)
      .join(', ');
    logMatch(
      team.name,
      `${player.name} is promoted to star player after ${s[milestone.stat]} ${milestone.label}! (${boostText})`,
      'goal'
    );
    if (typeof humanNotice === 'function') humanNotice(`⭐ ${player.name} PROMOTED TO STAR`);
  }
}

function freeFormationCoords(team, player) {
  const used = new Set(
    team.currentPlayers
      .map((p) => team.formation[p.name])
      .filter(Boolean)
      .map(([x, y]) => x + ',' + y)
  );
  const colX = { GK: 0, DF: 2, MF: 4, FW: 6 };
  const preferredX = colX[player.position] !== undefined ? colX[player.position] : 4;
  for (let x = preferredX; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      if (!used.has(x + ',' + y)) return [x, y];
    }
  }
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      if (!used.has(x + ',' + y)) return [x, y];
    }
  }
  return [4, 3];
}

function recordOutPlayers(homeName, awayName) {
  const target = outPlayersState();
  if (!target) return;
  if (!target.outPlayers) target.outPlayers = {};
  if (!target.fatiguedPlayers) target.fatiguedPlayers = {};
  for (const teamName of [homeName, awayName]) {
    const team = TEAMS[teamName];
    const out = {};
    const fatigued = [];
    if (team) {
      for (const p of team.squad) {
        if (p.hasEffect('injured')) {
          if (typeof p.injuryMatches === 'number') {
            if (p.injuryMatches > 0) {
              out[p.name] = { reason: 'injured', matches: p.injuryMatches };
            } else {
              p.injuryMatches = undefined;
              p.removeEffect('injured');
              logMatch(teamName, `${p.name} is fit again after shaking off the injury.`, 'sub');
            }
          } else {
            out[p.name] = 'injured';
          }
        } else if (p.hasEffect('matchExhausted')) out[p.name] = 'exhausted';
        else if (p.sentOff) out[p.name] = 'red';
        if (p.hasEffect('matchFatigued')) fatigued.push(p.name);
      }
    }
    target.outPlayers[teamName] = out;
    target.fatiguedPlayers[teamName] = fatigued;
  }
  recordStarPromotions();
}

const MAX_INJURED_PER_TEAM = 4;

function enforceInjuryCap() {
  for (const team of Object.values(TEAMS)) {
    const injured = team.squad.filter((p) => p.hasEffect('injured'));
    if (injured.length <= MAX_INJURED_PER_TEAM) continue;
    injured
      .sort((a, b) => (a.injuryMatches || 0) - (b.injuryMatches || 0))
      .slice(0, injured.length - MAX_INJURED_PER_TEAM)
      .forEach((p) => {
        p.injuryMatches = undefined;
        p.removeEffect('injured');
        logMatch(
          team.name,
          `${p.name} shakes off the knock before kickoff — only ${MAX_INJURED_PER_TEAM} players can be injured at once.`,
          'sub'
        );
      });
  }
}

function applyOutPlayers() {
  applyStarPromotions();
  const target = outPlayersState();
  if (!target || !target.outPlayers) return;
  for (const team of Object.values(TEAMS)) {
    const outMap = target.outPlayers[team.name];
    if (!outMap) continue;
    for (const name of Object.keys(outMap)) {
      const player = team.squad.find((p) => p.name === name);
      if (!player) continue;
      const outEntry = outMap[name];
      const reason = outEntry && typeof outEntry === 'object' ? outEntry.reason : outEntry;
      if (reason === 'injured') {
        if (!player.hasEffect('injured')) player.addEffect('injured', Infinity);
        if (outEntry && typeof outEntry === 'object' && typeof outEntry.matches === 'number') {
          if (outEntry.matches <= 1) {
            player.injuryMatches = 0;
            delete outMap[name];
          } else {
            player.injuryMatches = outEntry.matches - 1;
            outEntry.matches = player.injuryMatches;
          }
        }
      } else if (reason === 'exhausted') {
        // one-match ban: forced substitution below, no persistent state
      } else {
        player.sentOff = true;
      }
      if (team.currentPlayers.includes(player)) {
        const slot = (team.formation || {})[player.name];
        const index = team.currentPlayers.findIndex((p) => (p.__original || p).name === player.name);
        if (slot) delete team.formation[player.name];
        const repl =
          team.squad.find(
            (p) => !team.currentPlayers.includes(p) && !p.hasEffect('injured') && !p.sentOff
          );
        if (repl) {
          team.currentPlayers[index] = repl;
          if (slot) team.formation[repl.name] = slot;
        } else if (index !== -1) {
          team.currentPlayers.splice(index, 1);
        }
      }
    }
    for (const name of Object.keys(outMap)) {
      if (outMap[name] === 'exhausted') delete outMap[name];
    }
    const fatiguedList = target.fatiguedPlayers ? target.fatiguedPlayers[team.name] : null;
    if (fatiguedList && fatiguedList.length > 0) {
      for (const name of fatiguedList) {
        const player = team.squad.find((p) => p.name === name);
        if (player && !player.sentOff && !player.hasEffect('injured')) {
          player.carriedFatigue = true;
        }
      }
      target.fatiguedPlayers[team.name] = [];
    }
    team.currentGoalkeeper = team.currentPlayers.find((p) => p.position === 'GK') || null;
  }
  enforceInjuryCap();
}

function normalizeKickoffFormationFrame(formation, team) {
  if (team.side !== 'right') return formation;
  const gk = team.currentPlayers && team.currentPlayers.find((p) => p.position === 'GK');
  const gkCoord = gk && formation[gk.name];
  if (!gkCoord || gkCoord[0] >= 4) return formation;
  const out = {};
  for (const [name, [x, y]] of Object.entries(formation)) out[name] = [8 - x, y];
  return out;
}

async function startMatch(homeName, awayName, homeController, awayController, presetTeams) {
  clearSaveGame();
  if (game) {
    game.finished = true;
    game = null;
  }
  gameOverModalShown = false;
  if (matchState) matchState = null;
  if (ball) {
    ball.el.remove();
    ball = null;
  }
  for (const el of pitch.querySelectorAll('.player-token')) {
    if (el._token && typeof el._token.destroy === 'function') el._token.destroy();
    el.remove();
  }
  for (const el of document.querySelectorAll('.hand-panel, .rail-team, .side-bench, #scoreboard')) {
    el.innerHTML = '';
    delete el.dataset.ready;
  }
  selectedToken = null;
  const logEl = document.getElementById('match-log');
  if (logEl) logEl.innerHTML = '';

  TEAMS = presetTeams || buildTeams([homeName, awayName]);
  TEAMS[homeName].controller = homeController || TEAMS[homeName].controller;
  TEAMS[awayName].controller = awayController || TEAMS[awayName].controller;

  if (worldCup && worldCup.phase === 'knockout') {
    for (const teamName of [homeName, awayName]) {
      TEAMS[teamName].addTeamEffect('knockoutFever', Infinity);
      logMatch(teamName, `Knockout Fever: ${teamName} are in do-or-die territory this match.`);
    }
    wcApplyKnockoutPowerups([homeName, awayName]);
  }

  // Injured players and players sent off (red card) in one match are unavailable
  // for the team's NEXT match. They are kept on the bench but ineligible to be
  // used as a substitute, and are replaced in the starting XI by a substitute.
  const unavailableAtKickoff = {};
  if (worldCup) {
    const preState = outPlayersState();
    for (const teamName of [homeName, awayName]) {
      unavailableAtKickoff[teamName] = {
        ...((preState && preState.outPlayers && preState.outPlayers[teamName]) || {}),
      };
    }
  }

  applyOutPlayers();

  if (worldCup) {
    for (const teamName of Object.keys(TEAMS)) {
      const pendingNames = wcPendingLineup[teamName];
      if (pendingNames && pendingNames.length > 0) {
        const team = TEAMS[teamName];
        const unavailable = unavailableAtKickoff[teamName] || {};
        const newStarters = pendingNames
          .map((n) => team.squad.find((p) => p.name === n))
          .filter(Boolean)
          .filter((p) => !unavailable[p.name]);
        const filtered = newStarters.length < pendingNames.length;
        for (const p of team.currentPlayers) {
          if (newStarters.length >= 11) break;
          if (!newStarters.includes(p)) newStarters.push(p);
        }
        if (newStarters.length === 11) {
          team.currentPlayers.length = 0;
          team.currentPlayers.push(...newStarters);
          team.currentGoalkeeper = team.currentPlayers.find((p) => p.position === 'GK') || null;
        }
        const pendingCoords = wcPendingFormationCoords[teamName];
        if (pendingCoords && Object.keys(pendingCoords).length > 0) {
          if (filtered) {
            const merged = { ...team.formation };
            for (const p of team.currentPlayers) {
              if (pendingCoords[p.name]) merged[p.name] = pendingCoords[p.name];
            }
            team.formation = merged;
          } else {
            team.formation = { ...pendingCoords };
          }
          team.formation = normalizeKickoffFormationFrame(team.formation, team);
        }
      }
    }
  }

  if (tournament) {
    for (const teamName of Object.keys(TEAMS)) {
      const rewardCards = tournament.rewardCards[teamName] || [];
      if (rewardCards.length === 0) continue;
      const team = TEAMS[teamName];
      team.actions.push(...rewardCards);
      team.availableActions.push(...rewardCards);
    }
  }

  const suspensionSnapshot = {};
  if (worldCup) {
    for (const teamName of Object.keys(TEAMS)) {
      const trainingCards = wcTrainingCards[teamName] || [];
      if (trainingCards.length > 0) {
        const team = TEAMS[teamName];
        team.actions.push(...trainingCards);
        team.availableActions.push(...trainingCards);
      }
      const owned = wcOwnedCoaches[teamName] || [];
      for (const c of owned) {
        c.applyToTeam(TEAMS[teamName]);
      }
      const pendingCoach = wcPendingCoaches && wcPendingCoaches[teamName];
      if (pendingCoach) {
        pendingCoach.applyToTeam(TEAMS[teamName]);
        delete wcPendingCoaches[teamName];
      }
      if (TEAMS[teamName].hasTeamEffect('randomBoost') && !wcRandomBoostApplied[teamName]) {
        wcRandomBoostApplied[teamName] = true;
        const allEffects = Object.keys(TEAM_EFFECTS).filter((k) => k !== 'randomBoost');
        const shuffled = allEffects.sort(() => Math.random() - 0.5);
        for (let i = 0; i < 2 && i < shuffled.length; i++) {
          TEAMS[teamName].addTeamEffect(shuffled[i], Infinity);
        }
      }

      const debuffs = wcPlayerDebuffs[teamName] || {};
      for (const [playerName, debuff] of Object.entries(debuffs)) {
        const player = TEAMS[teamName].currentPlayers.find((p) => p.name === playerName);
        if (player) {
          const effectType = debuff.effect || 'eventDebuff';
          player.addEffect(effectType, debuff.turns);
        }
      }
      delete wcPlayerDebuffs[teamName];

      const buffs = wcPlayerBuffs[teamName] || {};
      for (const [playerName, buff] of Object.entries(buffs)) {
        const player = TEAMS[teamName].currentPlayers.find((p) => p.name === playerName);
        if (player) {
          player.addEffect('captainBoost', buff.turns);
        }
      }
      delete wcPlayerBuffs[teamName];

      const teamBuff = wcTeamBuffs[teamName];
      if (teamBuff) {
        for (const player of TEAMS[teamName].currentPlayers) {
          for (const [stat, delta] of Object.entries(teamBuff)) {
            if (stat === 'turns' || stat === 'teamMoralePenalty' || stat === 'deckReshuffle' || stat === 'mediaFrenzyMorale' || stat === 'teamMoraleBoost' || stat === 'drawBonus') continue;
            if (BOOSTABLE_STATS.includes(stat)) {
              player[stat] += delta;
            }
          }
        }
        if (teamBuff.teamMoralePenalty) {
          for (const player of TEAMS[teamName].currentPlayers) {
            player.addEffect('teammateResentment', teamBuff.turns);
          }
        }
        if (teamBuff.mediaFrenzyMorale) {
          for (const player of TEAMS[teamName].currentPlayers) {
            for (const s of BOOSTABLE_STATS) {
              player[s] += 1;
            }
          }
        }
        if (teamBuff.teamMoraleBoost) {
          for (const player of TEAMS[teamName].currentPlayers) {
            for (const s of BOOSTABLE_STATS) {
              player[s] += 2;
            }
          }
        }
      }
      delete wcTeamBuffs[teamName];

      const suspended = wcSuspendedPlayers[teamName] || [];
      if (suspended.length > 0) suspensionSnapshot[teamName] = [...suspended];
      for (const playerName of suspended) {
        const player = TEAMS[teamName].currentPlayers.find((p) => p.name === playerName);
        if (player) {
          const subs = TEAMS[teamName].availableSubstitutes();
          const replacement = subs.find((p) => p.position === player.position);
          if (replacement) {
            const idx = TEAMS[teamName].currentPlayers.findIndex((p) => (p.__original || p).name === player.name);
            const slot = TEAMS[teamName].formation[player.name];
            TEAMS[teamName].currentPlayers[idx] = replacement;
            if (slot) TEAMS[teamName].formation[replacement.name] = slot;
            TEAMS[teamName].substitutedOut.push(player);
          }
        }
      }
      delete wcSuspendedPlayers[teamName];

      const penalties = wcPendingPenalties[teamName] || [];
      for (const card of penalties) {
        TEAMS[teamName].actions.push(card);
        TEAMS[teamName].availableActions.push(card);
      }
      delete wcPendingPenalties[teamName];

      const recurringCount = (typeof wcRecurringPenalties !== 'undefined' && wcRecurringPenalties && wcRecurringPenalties[teamName]) || 0;
      if (recurringCount > 0) {
        const allPenaltyCards = CARD_TYPES.filter((Ctor) => {
          if (typeof Ctor !== 'function') return false;
          try {
            return new Ctor().category === 'penalty';
          } catch {
            return false;
          }
        });
        for (let i = 0; i < recurringCount && allPenaltyCards.length > 0; i++) {
          const Ctor = allPenaltyCards[Math.floor(Math.random() * allPenaltyCards.length)];
          const card = new Ctor();
          TEAMS[teamName].actions.push(card);
          TEAMS[teamName].availableActions.push(card);
        }
      }

      if (wcShootExhaust && wcShootExhaust[teamName]) {
        for (const card of [...TEAMS[teamName].actions, ...TEAMS[teamName].availableActions]) {
          if (card instanceof ShootAction) {
            card.exhaust = true;
          }
        }
      }

      const teamDebuff = wcTeamDebuffs[teamName];
      if (teamDebuff && teamDebuff.drawPenalty) {
        if (!wcTeamDrawPenalties) wcTeamDrawPenalties = {};
        wcTeamDrawPenalties[teamName] = teamDebuff.drawPenalty;
      }
      delete wcTeamDebuffs[teamName];

      if (teamBuff && teamBuff.drawBonus) {
        if (!wcTeamDrawBonuses) wcTeamDrawBonuses = {};
        wcTeamDrawBonuses[teamName] = teamBuff.drawBonus;
      }
    }
  }

  const awayTeam = Object.values(TEAMS).find((t) => t.side === 'right');
  const homeTeam = Object.values(TEAMS).find((t) => t.side === 'left');
  const homeKitOrig = homeTeam && homeTeam.primaryColor;
  const awayKitOrig = awayTeam && awayTeam.primaryColor;
  if (awayTeam && homeTeam && colorsClash(homeTeam.primaryColor, awayTeam.primaryColor)) {
    // Prefer each team's own reserve kit; fall back to a guaranteed-distinct override.
    if (!colorsClash(homeTeam.primaryColor, awayTeam.reserveColor)) {
      awayTeam.primaryColor = awayTeam.reserveColor;
    } else if (!colorsClash(homeTeam.reserveColor, awayTeam.primaryColor)) {
      homeTeam.primaryColor = homeTeam.reserveColor;
    } else if (!colorsClash(homeTeam.reserveColor, awayTeam.reserveColor)) {
      [awayTeam.primaryColor, awayTeam.reserveColor] = [awayTeam.reserveColor, awayTeam.primaryColor];
      [homeTeam.primaryColor, homeTeam.reserveColor] = [homeTeam.reserveColor, homeTeam.primaryColor];
    } else {
      awayTeam.primaryColor = pickDistinctKitColor(homeTeam.primaryColor);
    }
  }
  if (homeTeam) homeTeam.wearingAwayKit = homeTeam.primaryColor !== homeKitOrig;
  if (awayTeam) awayTeam.wearingAwayKit = awayTeam.primaryColor !== awayKitOrig;

  for (const teamName of Object.keys(TEAMS)) {
    const team = TEAMS[teamName];
    for (const player of team.currentPlayers) {
      if (!team.formation[player.name]) {
        team.formation[player.name] = freeFormationCoords(team, player);
        console.warn('[startMatch] missing formation coords for', player.name, '— assigned', team.formation[player.name]);
      }
    }
    team.recomputeOutOfPosition();
  }

  for (const teamName of Object.keys(TEAMS)) {
    const team = TEAMS[teamName];
    const half = team.side;
    for (const player of team.currentPlayers) {
      const [x, y] = team.formation[player.name];
      new PlayerToken({ player, teamColor: team.primaryColor, shorts: PlayerToken.shortsFor(team) }).placeIn(cell(x, y), half);
    }
  }

  for (const cellEl of pitch.querySelectorAll('.cell')) {
    const tokens = [...cellEl.querySelectorAll('.player-token')];
    if (tokens.length === 1) {
      tokens[0].classList.remove('half-left', 'half-right');
      tokens[0].classList.add('alone');
    }
  }

  ball = new Ball({
    x: 4,
    y: 3,
    resolveCell: cell,
  });
  ball.placeIn(cell(4, 3));

  matchState = {
    possession: null,
    lastBallMove: null,
    lastDribbledPlayer: null,
    gkHoldFrom: null,
    gkCollectReturn: null,
    lastShotSave: false,
    lastLongBallReceiver: null,
  };
  substitutionWindowOpen = false;

  updatePossession();

  benchSlots = Object.fromEntries(
    Object.keys(TEAMS).map((name) => [name, document.getElementById(slotId('bench', name))])
  );
  for (const name of Object.keys(TEAMS)) renderBench(name);

  panelSlots = Object.fromEntries(
    Object.keys(TEAMS).map((name) => [name, document.getElementById(slotId('panel', name))])
  );

  for (const teamName of Object.keys(TEAMS)) ensurePanelStructure(teamName);

  railSlots = Object.fromEntries(
    Object.keys(TEAMS).map((name) => [name, document.getElementById(`rail-${slotId('panel', name).replace('panel-', '')}`)])
  );

  for (const teamName of Object.keys(TEAMS)) ensureRailStructure(teamName);

  handSlots = Object.fromEntries(
    Object.keys(TEAMS).map((name) => [name, panelSlots[name].querySelector('.panel-hand')])
  );
  railPointSlots = Object.fromEntries(
    Object.keys(TEAMS).map((name) => [name, railSlots[name] && railSlots[name].querySelector('.rail-points')])
  );
  railDeckSlots = Object.fromEntries(
    Object.keys(TEAMS).map((name) => [name, railSlots[name] && railSlots[name].querySelector('.rail-decks')])
  );

  setupGame();

  for (const teamName of Object.keys(TEAMS)) {
    if (TEAMS[teamName].hasTeamEffect('pepStyle')) {
      game.pepStyle[teamName] = 999;
    }
  }

  if (worldCup) {
    for (const teamName of Object.keys(TEAMS)) {
      const permHolds = wcPermanentHolds && wcPermanentHolds[teamName];
      if (permHolds && permHolds.length > 0) {
        game.matchHeldCards[teamName] = [...permHolds];
        const hand = game.inPlay[teamName] || [];
        for (const card of hand) {
          if (permHolds.includes(card.name)) card.hold = true;
        }
      }
    }
  }

  for (const teamName of Object.keys(TEAMS)) {
    if (TEAMS[teamName].hasTeamEffect('cardHold') && worldCup) {
      const ctrl = TEAMS[teamName].controller;
      if (ctrl && ctrl.type === 'human') {
        await showHoldCardModal(teamName);
      } else {
        const hand = game.inPlay[teamName] || [];
        if (hand.length > 0) {
          const best = hand.reduce((a, b) => (b.rarity > a.rarity ? b : a), hand[0]);
          if (!game.matchHeldCards[teamName]) game.matchHeldCards[teamName] = [];
          game.matchHeldCards[teamName].push(best.name);
          best.hold = true;
        }
      }
    }
  }

  if (worldCup) {
    const reasonLabels = { injured: 'injured', red: 'sent off', exhausted: 'exhausted' };
    for (const teamName of [homeName, awayName]) {
      const entries = [];
      for (const [playerName, reason] of Object.entries(unavailableAtKickoff[teamName] || {})) {
        const label =
          reason && typeof reason === 'object'
            ? `injured (${reason.matches} match${reason.matches === 1 ? '' : 'es'})`
            : reasonLabels[reason] || reason;
        entries.push(`${playerName} (${label})`);
      }
      for (const playerName of suspensionSnapshot[teamName] || []) {
        entries.push(`${playerName} (suspended)`);
      }
      if (entries.length > 0) {
        logMatch(teamName, `Unavailable: ${entries.join(', ')}`);
      }
    }
  }

  const kickoffTeam = Object.values(TEAMS).find((t) => t.side === 'left') || Object.values(TEAMS)[0];
  game.lastKickoffTeam = kickoffTeam;
  await humanNotice('KICK OFF');
  if (!tournament && typeof Onboarding !== 'undefined') {
    await Onboarding.matchBasics();
  }
  resetForRestart(kickoffTeam);
  logMatch(kickoffTeam.name, `${kickoffTeam.name} kick off.`);
  renderGame();
  // saveGameState();
}
function resolveTeam(teamName) {
  if (!teamName) return null;
  if (typeof teamName !== 'string') {
    return Object.values(TEAMS).find((t) => t === teamName) || null;
  }
  return TEAMS[teamName] || null;
}

function resolveCard(card) {
  if (!card) return null;
  if (typeof card !== 'string') return card;
  const name = card.trim().toLowerCase();
  for (const Ctor of CARD_TYPES) {
    if (typeof Ctor !== 'function') continue;
    const instance = new Ctor();
    if (instance.name.toLowerCase() === name) return instance;
  }
  return null;
}

function resolvePlayer(player, teamName) {
  if (!player) return null;
  if (typeof player !== 'string') return player;
  const teams = teamName ? [resolveTeam(teamName)].filter(Boolean) : Object.values(TEAMS);
  for (const team of teams) {
    for (const found of [...team.currentPlayers, ...team.squad]) {
      if (found.name === player) return found;
    }
  }
  return null;
}

function addCardToHand(teamName, card, points = 0) {
  const team = resolveTeam(teamName);
  if (!team) return { success: false, reason: `unknown team (${teamName})` };

  const action = resolveCard(card);
  if (!action) return { success: false, reason: `unknown card (${card})` };

  game.pushWithoutCreativity(team.name, [action]);
  if (points) game.actionPoints[team.name] += points;
  renderGame();

  return {
    success: true,
    team: team.name,
    card: action.name,
    points: game.actionPoints[team.name],
    hand: game.inPlay[team.name].map((a) => a.name),
  };
}

function setPlayerPosition(player, teamName, x, y) {
  if (typeof teamName === 'number') {
    y = x;
    x = teamName;
    teamName = undefined;
  }

  const found = resolvePlayer(player, teamName);
  if (!found) return { success: false, reason: `unknown player (${player})` };

  const onPitch = Object.values(TEAMS).some((t) => t.currentPlayers.includes(found));
  if (!onPitch) return { success: false, reason: `${found.name} is not currently on the pitch` };

  if (!inBounds(x, y)) return { success: false, reason: `(${x},${y}) is out of bounds` };

  const el = tokenElForPlayer(found);
  if (!el) return { success: false, reason: `${found.name} has no token on the pitch` };

  if (!board.canOccupy(x, y, [found])) {
    return { success: false, reason: 'that cell already holds another player of the same team' };
  }

  moveTokenToCell(el, x, y);
  const holder = matchState.possession && matchState.possession._token.player;
  if (holder === found) {
    moveBall(x, y);
  } else {
    updatePossession();
  }
  renderGame();

  return { success: true, player: found.name, team: found.team, x, y };
}
function simulateMatch(homeName, awayName) {
  simulationMode = true;
  const nativeAlert = window.alert;
  window.alert = () => {};
  try {
    startMatch(
      homeName,
      awayName,
      { type: 'ai', player: 'basic-coach' },
      { type: 'ai', player: 'basic-coach' }
    );

    const pitchEl2 = document.getElementById('pitch');
    const handEls2 = document.querySelectorAll('.in-play-hand');
    const panels2 = document.querySelectorAll('.hand-panel, .side-bench, #scoreboard');
    if (pitchEl2) pitchEl2.style.display = 'none';
    handEls2.forEach((el) => (el.style.display = 'none'));
    panels2.forEach((el) => (el.style.display = 'none'));

    let safety = 0;
    const maxSteps = 200000;
    let stalls = 0;
    while (!game.finished && safety < maxSteps) {
      safety++;
      if (game.halftimePending) {
        const kickoffTeam = board.nextKickoffTeam();
        resetForRestart(kickoffTeam);
        game.halftimePending = false;
        if (!game.finished) game.currentTeam = kickoffTeam;
        game.lastKickoffTeam = kickoffTeam;
        logMatch(kickoffTeam.name, `${kickoffTeam.name} kick off the second half.`);
        stalls = 0;
        continue;
      }
      const sig = `${game.turn}|${game.currentTeam && game.currentTeam.name}|${JSON.stringify(game.actionPoints)}`;
      try {
        runAiTurn();
      } catch (err) {
        logMatch('', `Simulation error: ${err.message}`);
        break;
      }
      if (sig === `${game.turn}|${game.currentTeam && game.currentTeam.name}|${JSON.stringify(game.actionPoints)}`) {
        stalls++;
        if (stalls > 5) {
          const stuckTeam = game.currentTeam;
          logMatch(stuckTeam ? stuckTeam.name : '', 'Turn stalled in simulation — forcing a skip.');
          try { game.skip(stuckTeam); } catch (skipErr) { logMatch('', `Simulation error: ${skipErr.message}`); break; }
          stalls = 0;
        }
        continue;
      }
      stalls = 0;
    }

    if (game.finished) {
      logMatch(
        '',
        `Full time — ${Object.values(TEAMS)
          .map((t) => `${wcTeamName(t.name)} ${game.score[t.name] || 0}`)
          .join(' - ')}.`
      );
    }
  } finally {
    window.alert = nativeAlert;
    simulationMode = false;
    const pitchEl = document.getElementById('pitch');
    const handEls = document.querySelectorAll('.in-play-hand');
    const panels = document.querySelectorAll('.hand-panel, .side-bench, #scoreboard');
    if (pitchEl) pitchEl.style.display = '';
    handEls.forEach((el) => (el.style.display = ''));
    panels.forEach((el) => (el.style.display = ''));
    if (pitchEl) {
      const toRemove = [...pitchEl.querySelectorAll('.player-token, .ball')];
      for (const el of toRemove) el.remove();
    }
  }
}