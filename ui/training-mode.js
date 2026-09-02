let trainingActive = false;
let trainingEnding = false;
let trainingTeams = null;
let trainingVariant = null;
let trainingLastOutcome = null;

function wcHumanTeamName() {
  if (wcMyTeamSelected && wcControllerForTeam(wcMyTeamSelected).type === 'human') {
    return wcMyTeamSelected;
  }
  const humans = TEAM_NAMES.filter((name) => wcControllerForTeam(name).type === 'human');
  return humans[0] || null;
}

function trainingSampleCards(count, category = 'offense') {
  const pool = CARD_TYPES.map((C) => new C()).filter(
    (c) => c.category === category && (c.rarity || 0) <= 2
  );
  const picked = [];
  const seen = new Set();
  while (picked.length < count && seen.size < pool.length) {
    const card = pool[Math.floor(Math.random() * pool.length)];
    if (seen.has(card.name)) continue;
    seen.add(card.name);
    picked.push(card);
  }
  return picked;
}

function buildTrainingSplits(teamName, variant = 'attack') {
  const TeamClass = TEAM_CLASSES[teamName];
  const attack = new TeamClass();
  const defense = new TeamClass();

  const pool = attack.squad;
  const attScore = (p) => p.shooting + p.dribbling + p.passing + p.speed;
  const defScore = (p) => p.tackling + p.marking + p.speed;

  const fieldPool = pool.filter((p) => p.position === 'FW' || p.position === 'MF');
  const attackers = [...fieldPool].sort((a, b) => attScore(b) - attScore(a)).slice(0, 5);
  const attackerNames = new Set(attackers.map((p) => p.name));
  const defCandidates = pool
    .filter((p) => (p.position === 'DF' || p.position === 'MF') && !attackerNames.has(p.name))
    .sort((a, b) => defScore(b) - defScore(a));
  const defenders = defCandidates.slice(0, 5);
  const keeper = pool.find((p) => p.position === 'GK');

  if (attackers.length < 5 || defenders.length < 5 || !keeper) return null;

  attack.currentPlayers = attackers;
  attack.startingXI = attackers.map((p) => p.name);
  attack.squad = attackers.slice();
  attack.currentGoalkeeper = null;
  defense.currentPlayers = [...defenders, keeper];
  defense.startingXI = defense.currentPlayers.map((p) => p.name);
  defense.squad = defense.currentPlayers.slice();
  defense.currentGoalkeeper = keeper;

  attack.actions = StartingDeck.build(StartingDeck.DEFAULT);
  attack.availableActions = [...attack.actions];
  defense.actions = StartingDeck.build(StartingDeck.DEFAULT);
  defense.availableActions = [...defense.actions];

  attack.name = `${teamName} Attack`;
  defense.name = `${teamName} Defence`;
  attack.side = 'left';
  defense.side = 'right';
  for (const p of attack.squad) p.team = attack.name;
  for (const p of defense.squad) p.team = defense.name;
  if (variant === 'defense') {
    attack.controller = { type: 'ai', player: 'basic-coach' };
    defense.controller = { type: 'human' };
    attack.primaryColor = '#7a7a7a';
    attack.reserveColor = '#4a4a4a';
  } else {
    attack.controller = { type: 'human' };
    defense.controller = { type: 'ai', player: 'basic-coach' };
    defense.primaryColor = '#7a7a7a';
    defense.reserveColor = '#4a4a4a';
  }

  const ys = [1, 2, 3, 4, 5];
  attackers.forEach((p, i) => {
    attack.formation[p.name] = [4, ys[i]];
  });
  const defSlots = [
    [6, 1],
    [6, 2],
    [5, 3],
    [6, 4],
    [6, 5],
  ];
  defenders.forEach((p, i) => {
    defense.formation[p.name] = defSlots[i];
  });
  defense.formation[keeper.name] = [8, 3];

  return { attack, defense };
}

async function launchTrainingSession(variant = 'attack', teamNameOverride = null) {
  if (!worldCup || wcMatchMode || trainingActive) return;
  if (game && !game.finished) return;
  const teamName = teamNameOverride || wcHumanTeamName();
  if (!teamName) {
    showToast('Start a World Cup and choose your team first.');
    return;
  }
  const splits = buildTrainingSplits(teamName, variant);
  if (!splits) {
    showToast('Not enough FW/MF/DF players in this squad for a training session.');
    return;
  }
  await showTrainingIntroModal(variant);
  if (typeof wcTrainingPhases !== 'undefined' && wcTrainingPhases) {
    wcTrainingPhases[variant] = true;
  }
  trainingActive = true;
  trainingEnding = false;
  trainingVariant = variant;
  trainingLastOutcome = null;
  trainingTeams = {
    attackName: splits.attack.name,
    defenseName: splits.defense.name,
    realTeamName: teamName,
  };
  await startMatch(
    splits.attack.name,
    splits.defense.name,
    splits.attack.controller,
    splits.defense.controller,
    { [splits.attack.name]: splits.attack, [splits.defense.name]: splits.defense }
  );
  showBoard();
}

function trainingHeartbeat() {
  if (!trainingActive || trainingEnding || !game || game.finished) return;
  game.halftimePending = false;
  if (noticeOverlayActive || deferredPlayActive || hasActivePending()) return;
  if (document.querySelector('.modal-overlay')) return;
  const holderEl = matchState && matchState.possession;
  const holder = holderEl && holderEl._token && holderEl._token.player;
  const stolen = Boolean(holder && holder.team === trainingTeams.defenseName);
  const scored = (game.score[trainingTeams.attackName] || 0) > 0;

  if (trainingVariant === 'defense') {
    if (scored) {
      endTraining(false, 'You conceded — the attack got through!');
      return;
    }
    if (stolen) {
      endTraining(true, '');
      return;
    }
    return;
  }

  if (stolen) {
    endTraining(false, `${holder.name} wins the ball — possession stolen!`);
    return;
  }
  if (scored) {
    endTraining(true, '');
  }
}

function handleTrainingFinish() {
  if (trainingEnding || !game) return;
  const scored = (game.score[trainingTeams.attackName] || 0) > 0;
  if (trainingVariant === 'defense') {
    endTraining(!scored, scored ? '' : 'Full time — clean sheet!');
  } else {
    endTraining(scored, scored ? '' : 'Full time — no goal scored.');
  }
}

function endTraining(success, reason) {
  if (trainingEnding) return;
  trainingEnding = true;
  trainingLastOutcome = { success, reason };
  if (game && !game.finished) game.finished = true;
  renderGame();
  setTimeout(() => {
    if (success) offerRewardCards();
    else showTrainingFailModal(reason);
  }, 600);
}

function showTrainingFailModal(reason) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  const modal = document.createElement('div');
  modal.className = 'shot-modal halftime-modal training-modal';
  const content = document.createElement('div');
  content.className = 'shot-modal-content halftime-content';
  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent = 'Training Failed';
  content.appendChild(title);
  const sub = document.createElement('div');
  sub.className = 'halftime-kickoff';
  sub.textContent = reason;
  content.appendChild(sub);
  const closeBtn = document.createElement('button');
  closeBtn.className = 'shot-modal-close';
  closeBtn.textContent = 'Back to World Cup';
  closeBtn.addEventListener('click', () => {
    overlay.remove();
    cleanupTraining();
  });
  modal.appendChild(content);
  modal.appendChild(closeBtn);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
}

function offerRewardCards() {
  const category = trainingVariant === 'defense' ? 'defense' : 'offense';
  const choices = trainingSampleCards(5, category);
  const picked = new Set();
  let confirmed = false;

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  const modal = document.createElement('div');
  modal.className = 'shot-modal halftime-modal training-modal';
  const content = document.createElement('div');
  content.className = 'shot-modal-content halftime-content';

  const title = document.createElement('div');
  title.className = 'halftime-title';
  title.textContent =
    trainingVariant === 'defense' ? 'Clean Sheet! Training Complete' : 'Goal! Training Complete';
  content.appendChild(title);

  const subtitle = document.createElement('div');
  subtitle.className = 'halftime-kickoff';
  subtitle.textContent =
    trainingVariant === 'defense'
      ? 'Pick 2 defensive cards to add to your deck:'
      : 'Pick 2 attacking cards to add to your deck:';
  content.appendChild(subtitle);

  const cardWrap = document.createElement('div');
  cardWrap.className = 'training-cards-row';

  const confirmBtn = document.createElement('button');
  confirmBtn.className = 'shot-modal-close';
  confirmBtn.textContent = 'Add to Deck';
  confirmBtn.disabled = true;

  const updateConfirm = () => {
    confirmBtn.disabled = picked.size !== 2;
    confirmBtn.textContent =
      picked.size === 2 ? 'Add to Deck' : `Pick ${2 - picked.size} more`;
  };

  for (const card of choices) {
    const cardEl = document.createElement('div');
    cardEl.className = `training-card rarity-${card.rarity}`;
    cardEl.innerHTML =
      `<div class="training-card-name">${card.name}</div>` +
      `<div class="training-card-desc">${card.description}</div>` +
      `<div class="training-card-rarity">Level ${card.rarity}</div>`;
    cardEl.addEventListener('click', () => {
      if (confirmed) return;
      if (picked.has(card)) {
        picked.delete(card);
        cardEl.classList.remove('selected');
      } else if (picked.size < 2) {
        picked.add(card);
        cardEl.classList.add('selected');
      } else {
        const oldest = picked.values().next().value;
        picked.delete(oldest);
        picked.add(card);
        cardWrap
          .querySelectorAll('.training-card')
          .forEach((el, idx) => el.classList.toggle('selected', choices[idx] === card));
      }
      updateConfirm();
    });
    cardWrap.appendChild(cardEl);
  }

  confirmBtn.addEventListener('click', () => {
    if (confirmed || picked.size !== 2) return;
    confirmed = true;
    const teamName = trainingTeams.realTeamName;
    if (!wcTrainingCards[teamName]) wcTrainingCards[teamName] = [];
    for (const card of picked) wcTrainingCards[teamName].push(card);
    overlay.remove();
    cleanupTraining();
  });

  content.appendChild(cardWrap);
  modal.appendChild(content);
  modal.appendChild(confirmBtn);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  updateConfirm();
}

function showTrainingIntroModal(variant) {
  return new Promise((resolve) => {
    const isDefense = variant === 'defense';
    const titleText = isDefense ? 'Defense Training Session' : 'Attack Training Session';
    const rules = isDefense
      ? [
          'Your back line must keep a clean sheet.',
          'Win the ball back with your AF/DF/MF players.',
          'If you concede a goal, the session is over and you get no reward.',
          'Hold out until full time to earn 2 defensive cards.',
        ]
      : [
          'Drive your attack forward and score a goal.',
          'Use your FW/AM/MF players to keep possession and create chances.',
          'If the defense steals the ball, the session ends.',
          'Score to earn 2 attacking cards.',
        ];

    const modal = document.createElement('div');
    modal.className = 'shot-modal halftime-modal training-intro-modal';

    const title = document.createElement('div');
    title.className = 'halftime-title';
    title.textContent = titleText;
    modal.appendChild(title);

    const teamEl = document.createElement('div');
    teamEl.className = 'halftime-kickoff';
    teamEl.textContent = wcTrainingPhaseTeam
      ? `${wcTrainingPhaseTeam} — short session to sharpen your squad.`
      : 'A short session to sharpen your squad.';
    modal.appendChild(teamEl);

    const rulesWrap = document.createElement('div');
    rulesWrap.className = 'training-intro-rules';
    for (const rule of rules) {
      const li = document.createElement('div');
      li.className = 'training-intro-rule';
      li.textContent = rule;
      rulesWrap.appendChild(li);
    }
    modal.appendChild(rulesWrap);

    const startBtn = document.createElement('button');
    startBtn.className = 'shot-modal-close';
    startBtn.textContent = 'Start Training';
    startBtn.addEventListener('click', () => {
      close();
      resolve();
    });
    modal.appendChild(startBtn);

    const close = showModalOverlay(modal, {
      closeKeys: [],
      closeOnOverlay: false,
    });
  });
}

function cleanupTraining() {
  trainingActive = false;
  trainingEnding = false;
  trainingTeams = null;
  trainingVariant = null;
  trainingLastOutcome = null;
  gameOverModalShown = false;
  game = null;
  showWorldCupScreen();
  renderWorldCupView();
  wcLaunchNextTrainingPhase();
}

let wcTrainingPhaseQueue = [];
let wcTrainingPhaseTeam = null;
let wcTrainingCurrentPhase = null;

function wcQueueTrainingPhases(variants, teamName) {
  wcTrainingPhaseQueue = [...variants];
  wcTrainingPhaseTeam = teamName || null;
  wcTrainingCurrentPhase = null;
  wcLaunchNextTrainingPhase();
}

function wcLaunchNextTrainingPhase() {
  if (wcTrainingCurrentPhase) {
    wcTrainingPhases[wcTrainingCurrentPhase] = true;
  }
  const variant = wcTrainingPhaseQueue.shift();
  wcTrainingCurrentPhase = variant || null;
  if (!variant) {
    wcTrainingPhaseTeam = null;
    return;
  }
  launchTrainingSession(variant, wcTrainingPhaseTeam);
}
