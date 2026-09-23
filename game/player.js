const BOOSTABLE_STATS = [
  'speed',
  'marking',
  'tackling',
  'shooting',
  'passing',
  'dribbling',
  'tacticalThinking',
  'heading',
  'goalkeeping',
];

const DEFENSIVE_EFFECT_TYPES = [
  'cohesiveDefense',
  'defenseFocus',
  'compactShape',
  'teamDefense',
  'steelTackle',
  'ironCurtain',
];

const PLAYER_EFFECTS = {
  cramped: {
    char: '🦵',
    turns: 1,
    label: 'Cramped',
    explanation: 'Leg cramp: cannot move, dribble, sprint, feint, finish or cross.',
    stats: {},
  },
  yellow: {
    char: '🟨',
    turns: Infinity,
    label: 'Yellow card',
    explanation: 'Carded: -2 tackling and -2 marking for the whole match. A second yellow means a red card.',
    stats: { tackling: -2, marking: -2 },
  },
  scaredToTackle: {
    char: '😬',
    turns: Infinity,
    label: 'Scared of a second card',
    explanation: 'Recently booked: their next tackle attempt automatically fails.',
    stats: {},
  },
  inspired: {
    char: '💡',
    turns: 1,
    label: 'Inspired',
    explanation: 'In a zone: +2 to all stats for a turn.',
    stats: Object.fromEntries(BOOSTABLE_STATS.map((s) => [s, +2])),
  },
  exhausted: {
    char: '🥵',
    turns: 2,
    label: 'Exhausted',
    explanation: 'Running on fumes: -2 to all stats for 2 turns.',
    stats: Object.fromEntries(BOOSTABLE_STATS.map((s) => [s, -2])),
  },
  fatigued: {
    char: '😮‍💨',
    turns: 3,
    label: 'Fatigued',
    explanation: 'Worn out: -2 to all stats for 3 turns.',
    stats: Object.fromEntries(BOOSTABLE_STATS.map((s) => [s, -2])),
  },
  matchFatigued: {
    char: '🥴',
    turns: Infinity,
    label: 'Drained',
    explanation:
      'Played too many cards this match: -1 to all attributes for the rest of the match. Getting drained again next match means exhaustion.',
    stats: Object.fromEntries(BOOSTABLE_STATS.map((s) => [s, -1])),
  },
  matchExhausted: {
    char: '🫠',
    turns: Infinity,
    label: 'Worn out',
    explanation:
      'Completely spent: -3 to all attributes for the rest of the match, and will miss the next match.',
    stats: Object.fromEntries(BOOSTABLE_STATS.map((s) => [s, -3])),
  },
  injured: {
    char: '🤕',
    turns: Infinity,
    label: 'Injured',
    explanation: 'Hurt: -4 to all stats for the whole match.',
    stats: Object.fromEntries(BOOSTABLE_STATS.map((s) => [s, -4])),
  },
  cohesiveDefense: {
    char: '🛡️',
    turns: Infinity,
    label: 'Cohesive defense',
    explanation: 'Parked the bus: +2 tackling and +1 marking for the whole match.',
    stats: { tackling: +2, marking: +1 },
  },
  defenseFocus: {
    char: '🎯',
    turns: Infinity,
    label: 'Defense focus',
    explanation: 'Stays in the defensive half for the whole match.',
    stats: {},
  },
  blinded: {
    char: '😵',
    turns: 1,
    label: 'Blinded',
    explanation: 'Sun in the eyes: -4 goalkeeping for a turn.',
    stats: { goalkeeping: -4 },
  },
  compactShape: {
    char: '🧱',
    turns: 1,
    label: 'Compact shape',
    explanation: 'Tight formation: +1 tackling and +1 marking, but cannot move more than 1 cell.',
    stats: { tackling: +1, marking: +1 },
  },
  wellRest: {
    char: '💤',
    turns: Infinity,
    label: 'Well rested',
    explanation: 'Fresh from the bench: +2 to all attributes for the rest of the match.',
    stats: Object.fromEntries(BOOSTABLE_STATS.map((s) => [s, +2])),
  },
  eventDebuff: {
    char: '🍺',
    turns: 1,
    label: 'Hungover',
    explanation: 'Still feeling last night: -3 to all attributes for one match.',
    stats: Object.fromEntries(BOOSTABLE_STATS.map((s) => [s, -3])),
  },
  captainBoost: {
    char: '💪',
    turns: 1,
    label: 'Captain fired up',
    explanation: 'Leading by example: +2 to all attributes for one match.',
    stats: Object.fromEntries(BOOSTABLE_STATS.map((s) => [s, +2])),
  },
  teammateResentment: {
    char: '😤',
    turns: 1,
    label: 'Resentful',
    explanation: 'Feeling sidelined: -1 to all attributes for one match.',
    stats: Object.fromEntries(BOOSTABLE_STATS.map((s) => [s, -1])),
  },
  captainUnhappy: {
    char: '😒',
    turns: 1,
    label: 'Captain unhappy',
    explanation: 'Disappointed with the boss: -2 to all attributes for one match.',
    stats: Object.fromEntries(BOOSTABLE_STATS.map((s) => [s, -2])),
  },
  enragedRivalDebuff: {
    char: '😤',
    turns: Infinity,
    label: 'Enraged rival',
    explanation: 'The rivals are furious after the taunt.',
    stats: {},
  },
  mindGamesMark: {
    char: '🎭',
    turns: 1,
    label: 'Mind Games',
    explanation: 'Psyched out by the opposition bench: -1 tactical thinking this minute.',
    stats: { tacticalThinking: -1 },
  },
};

const TEAM_EFFECTS = {
  teamPassing: {
    char: '🎯',
    turns: Infinity,
    label: 'Passing focus',
    explanation: '+1 passing for the whole team.',
    stats: { passing: +1 },
  },
  teamDribbling: {
    char: '💫',
    turns: Infinity,
    label: 'Dribbling flair',
    explanation: '+1 dribbling for the whole team.',
    stats: { dribbling: +1 },
  },
  teamTactics: {
    char: '🧠',
    turns: Infinity,
    label: 'Tactical calm',
    explanation: '+1 tactical thinking for the whole team.',
    stats: { tacticalThinking: +1 },
  },
  teamDefense: {
    char: '🛡️',
    turns: Infinity,
    label: 'Wall of steel',
    explanation: '+1 tackling and +1 marking for the whole team.',
    stats: { tackling: +1, marking: +1 },
  },
  teamEnergy: {
    char: '⚡',
    turns: Infinity,
    label: 'Flat-out energy',
    explanation: '+1 speed for the whole team.',
    stats: { speed: +1 },
  },

  // +2 stat boosts (all except goalkeeping)
  sonicSurge: {
    char: '💨',
    turns: Infinity,
    label: 'Sonic Surge',
    explanation: '+2 speed for the whole team. They play with lightning pace.',
    stats: { speed: +2 },
  },
  shadowLock: {
    char: '👁️',
    turns: Infinity,
    label: 'Shadow Lock',
    explanation: '+2 marking for the whole team. Every attacker is tightly tracked.',
    stats: { marking: +2 },
  },
  steelTackle: {
    char: '🔩',
    turns: Infinity,
    label: 'Steel Tackle',
    explanation: '+2 tackling for the whole team. Challenges hit like a wall.',
    stats: { tackling: +2 },
  },
  thunderstrike: {
    char: '⚡',
    turns: Infinity,
    label: 'Thunderstrike',
    explanation: '+2 shooting for the whole team. Every shot is a cannon.',
    stats: { shooting: +2 },
  },
  metronome: {
    char: '🎵',
    turns: Infinity,
    label: 'Metronome',
    explanation: '+2 passing for the whole team. The ball moves like clockwork.',
    stats: { passing: +2 },
  },
  silkTouch: {
    char: '✨',
    turns: Infinity,
    label: 'Silk Touch',
    explanation: '+2 dribbling for the whole team. The ball is glued to their feet.',
    stats: { dribbling: +2 },
  },
  grandmasterEye: {
    char: '♟️',
    turns: Infinity,
    label: 'Grandmaster Eye',
    explanation: '+2 tactical thinking for the whole team. They see three moves ahead.',
    stats: { tacticalThinking: +2 },
  },
  aerialDominion: {
    char: '🦅',
    turns: Infinity,
    label: 'Aerial Dominion',
    explanation: '+2 heading for the whole team. They own the skies.',
    stats: { heading: +2 },
  },

  // Gameplay-altering effects
  relentlessMomentum: {
    char: '🔥',
    turns: Infinity,
    label: 'Relentless Momentum',
    explanation: 'The first card played each turn does not pass the turn for playing cards to the other team.',
    stats: {},
  },
  ironCurtain: {
    char: '🧱',
    turns: 3,
    label: 'Iron Curtain',
    explanation: 'Opposing tackles always result in a foul for 3 turns.',
    stats: {},
  },
  secondWind: {
    char: '🌬️',
    turns: Infinity,
    label: 'Second Wind',
    explanation: 'Exhaustion is removed from all players at the start of each half.',
    stats: {},
  },
  clinicalFinish: {
    char: '🎯',
    turns: Infinity,
    label: 'Clinical Finish',
    explanation: 'Shots from inside the box always count as on target.',
    stats: {},
  },
  hotStreak: {
    char: '🚀',
    turns: Infinity,
    label: 'Hot Streak',
    explanation: 'Every time a Shoot card is played, the shooter gains +1 shooting for the rest of the match.',
    stats: {},
  },
  flyingStart: {
    char: '⏱️',
    turns: Infinity,
    label: 'Flying Start',
    explanation: '+1 action point during the first minute of each half.',
    stats: {},
  },
  knockoutFever: {
    char: '🏆',
    turns: Infinity,
    label: 'Knockout Fever',
    explanation: 'Do-or-die mentality: +1 action point at kickoff of knockout matches.',
    stats: {},
  },
  magicSpray: {
    char: '🧴',
    turns: Infinity,
    label: 'Magic Spray',
    explanation: 'At the halfway kick-off, one Exhausted card returns to your deck.',
    stats: {},
  },
  blindEye: {
    char: '😇',
    turns: Infinity,
    label: 'Blind Eye',
    explanation: 'Once per match, the referee turns a blind eye: your first red card is shown as a yellow instead.',
    stats: {},
  },
  ironGlove: {
    char: '🧤',
    turns: Infinity,
    label: 'Iron Glove',
    explanation: 'Shots against you must beat your keeper by 2 or more — a single-goal margin is saved.',
    stats: {},
  },
  squadDepth: {
    char: '📋',
    turns: Infinity,
    label: 'Squad Depth',
    explanation: 'Every 8 cards your team plays, you immediately draw an extra card.',
    stats: {},
  },
  mindGames: {
    char: '🎭',
    turns: Infinity,
    label: 'Mind Games',
    explanation: 'At the start of each minute, the opponent holding the ball loses 1 tactical thinking until the next minute.',
    stats: {},
  },
  counterPress: {
    char: '🔄',
    turns: Infinity,
    label: 'Counter-Press',
    explanation: 'When the ball is lost, the team immediately regains possession on a successful tackling roll.',
    stats: {},
  },
  deadBallMastery: {
    char: '📐',
    turns: Infinity,
    label: 'Dead Ball Mastery',
    explanation: 'Free kicks grant +1 extra action point.',
    stats: {},
  },
  lastDefender: {
    char: '🧤',
    turns: Infinity,
    label: 'Last Defender',
    explanation: 'The goalkeeper can move up to 2 cells with a Move card and returns automatically to the goal from twice the distance.',
    stats: {},
  },
  wideThinking: {
    char: '🃏',
    turns: Infinity,
    label: 'Wide Thinking',
    explanation: 'The team draws one extra card per turn.',
    stats: {},
  },
  creativity: {
    char: '🎨',
    turns: Infinity,
    label: 'Creativity',
    explanation: 'Every time an action creates new cards, twice as many are created.',
    stats: {},
  },
  persistence: {
    char: '📋',
    turns: Infinity,
    label: 'Persistence',
    explanation: 'A copy of the first card you play each turn is added to your deck.',
    stats: {},
  },
  growingMenace: {
    char: '🌱',
    turns: Infinity,
    label: 'Growing Menace',
    explanation: 'Every turn, all forwards gain +1 shooting for the rest of the match. Stacks.',
    stats: {},
  },
  noPainNoGain: {
    char: '🩹',
    turns: Infinity,
    label: 'No Pain, No Gain',
    explanation: 'Every time a player receives a card, the whole squad gains +1 tackling.',
    stats: {},
  },
  gearAttack: {
    char: '⚔️',
    turns: Infinity,
    label: 'Attacking gear',
    explanation: '+2 shooting, -1 marking while in the attacking gear.',
    stats: { shooting: +2, marking: -1 },
  },
  gearDefense: {
    char: '🛡️',
    turns: Infinity,
    label: 'Defensive gear',
    explanation: '+2 marking, +1 tackling, -1 shooting while in the defensive gear.',
    stats: { marking: +2, tackling: +1, shooting: -1 },
  },
  fullPressure: {
    char: '🔥',
    turns: Infinity,
    label: 'Full Pressure',
    explanation: 'Relentless press: your team draws 4 extra cards every turn, but a random player is exhausted (-2 to all attributes) for the rest of the match each turn.',
    stats: {},
  },
  argentoPride: {
    char: '🇦🇷',
    turns: Infinity,
    label: 'Argento Pride',
    explanation: 'While behind, gain one extra action point for each goal you are down.',
    stats: {},
  },
  comingHome: {
    char: '🦁',
    turns: Infinity,
    label: 'Coming Home',
    explanation: 'While trailing, gain +2 action points every turn.',
    stats: {},
  },
  underdogBite: {
    char: '🐕',
    turns: Infinity,
    label: 'Underdog Bite',
    explanation: 'While trailing by 2 or more goals, gain +3 action points every turn.',
    stats: {},
  },
  totalFootball: {
    char: '🇳🇱',
    turns: 3,
    label: 'Total Football',
    explanation: '+1 dribbling, +1 shooting and +1 passing for the whole team for 3 turns.',
    stats: { dribbling: +1, shooting: +1, passing: +1 },
  },
  atlasWall: {
    char: '🧱',
    turns: 3,
    label: 'Atlas Wall',
    explanation: '+2 tackling and +2 marking for the whole team for 3 turns.',
    stats: { tackling: +2, marking: +2 },
  },
  garraCharrua: {
    char: '🦷',
    turns: 3,
    label: 'Garra Charrúa',
    explanation: '+2 tackling and +1 speed for the whole team for 3 turns.',
    stats: { tackling: +2, speed: +1 },
  },
  pepStyle: {
    char: '🛌',
    turns: Infinity,
    label: 'Pep Style',
    explanation: 'Passing range is extended for three turns.',
    stats: {},
  },
  randomBoost: {
    char: '🎰',
    turns: Infinity,
    label: 'Random Boost',
    explanation: 'Two random team effects are granted at the start of the match.',
    stats: {},
  },
  goodCoaches: {
    char: '🎓',
    turns: Infinity,
    label: 'Good coaches',
    explanation: 'Training sessions can yield cards from any rarity.',
    stats: {},
  },
  doubleTrainingCards: {
    char: '📦',
    turns: Infinity,
    label: 'Double Training',
    explanation: 'Every training card is added as 2 copies instead of 1.',
    stats: {},
  },
  extraTrainingChoices: {
    char: '🎯',
    turns: Infinity,
    label: 'Extra Training Choices',
    explanation: 'Training sessions offer 5 card choices instead of 3.',
    stats: {},
  },
  trainingSynergyPacks: {
    char: '🤝',
    turns: Infinity,
    label: 'Synergy Packs',
    explanation: 'One of every 3 training candidates is a pack of 2 cards that work well together.',
    stats: {},
  },
  drawOnSkip: {
    char: '🎴',
    turns: Infinity,
    label: 'Quick Draw',
    explanation: 'When you skip your turn, draw 2 extra cards.',
    stats: {},
  },
  highMobility: {
    char: '🏃',
    turns: Infinity,
    label: 'High Mobility',
    explanation: 'Adds 3 Move and 1 Sprint to the deck. All Sprint cards cost 0.',
    stats: {},
  },
  cardHold: {
    char: '✋',
    turns: Infinity,
    label: 'Card Hold',
    explanation: 'At the start of each match, mark one card in your starting hand as held — it stays in your hand every turn until played.',
    stats: {},
  },
  gkStar: {
    char: '🧤',
    turns: Infinity,
    label: 'GK star',
    explanation: 'Adds two extra Quick Reflexes cards to the team goalkeeper deck.',
    stats: {},
  },
  triggerManMarking: {
    char: '🔒',
    turns: Infinity,
    label: 'Trigger man marking',
    explanation: 'Defenders use the higher of marking or tackling when following a marked player.',
    stats: {},
  },
  enragedRival: {
    char: '😡',
    turns: Infinity,
    label: 'Enraged Rival',
    explanation: 'The opposing team\'s players suffer -1 to all attributes. 50% of their tackles result in a yellow card for the tackler and an injury to the player they tackle.',
    stats: {},
  },

  // New team effects
  teamFortuneFavor: {
    char: '🍀',
    turns: Infinity,
    label: 'Team Fortune Favor',
    explanation: 'At the start of each turn: flip a coin. Heads: +1 to a random stat this turn for the whole team. Tails: -1 to a random opponent stat this turn.',
    stats: {},
  },
  teamIronWall: {
    char: '🛡️',
    turns: Infinity,
    label: 'Team Iron Wall',
    explanation: '+2 marking for the whole team. Opponents have -1 dribbling when attacking.',
    stats: { marking: +2 },
  },
  teamRuthless: {
    char: '🔥',
    turns: Infinity,
    label: 'Team Ruthless',
    explanation: '+3 shooting and +3 tackling for the whole team. At end of each turn: 50% chance per player a random stat decreases by 1 permanently.',
    stats: { shooting: +3, tackling: +3 },
  },
  teamHighPress: {
    char: '⚡',
    turns: Infinity,
    label: 'Team High Press',
    explanation: '+1 speed for all your players. Opponents have -1 tactical thinking.',
    stats: { speed: +1 },
  },
  teamOmamori: {
    char: '🍊',
    turns: Infinity,
    label: 'Team Omamori',
    explanation: 'At the start of each turn: 20% chance to remove the injured effect from one random player on the whole team.',
    stats: {},
  },
  teamClover: {
    char: '🍀',
    turns: Infinity,
    label: 'Team Clover',
    explanation: 'At the start of each turn: 25% chance the whole team gains +1 to a random stat this turn.',
    stats: {},
  },
  teamSpark: {
    char: '⚡',
    turns: Infinity,
    label: 'Team Spark',
    explanation: '+1 speed and +1 tactical thinking for all your players.',
    stats: { speed: +1, tacticalThinking: +1 },
  },
  teamWrench: {
    char: '🛠️',
    turns: Infinity,
    label: 'Team Wrench',
    explanation: 'At the start of each turn: 20% chance to remove the injured effect from one random player on the whole team.',
    stats: {},
  },
  teamFaceMelter: {
    char: '💥',
    turns: Infinity,
    label: 'Team Face-Melter',
    explanation: '+3 shooting and +3 tackling for the whole team. At end of each turn: 50% chance per player a random stat decreases by 1 permanently.',
    stats: { shooting: +3, tackling: +3 },
  },
  teamEruption: {
    char: '🌋',
    turns: Infinity,
    label: 'Team Eruption',
    explanation: '+2 shooting and -1 marking for the whole team. All-out attack style.',
    stats: { shooting: +2, marking: -1 },
  },
  teamDagger: {
    char: '🗡️',
    turns: Infinity,
    label: 'Team Dagger',
    explanation: 'Tackles have 50% chance to result in a red card instead of a foul. Cumulative with enragedRival.',
    stats: {},
  },

  // New effects
  fortuneFavor: {
    char: '🍀',
    turns: 1,
    label: 'Fortune Favor',
    explanation: 'At the start of your turn: flip a coin. Heads: +1 to a random stat this turn. Tails: -1 to a random opponent stat this turn.',
    stats: {},
  },
  ironWall: {
    char: '🛡️',
    turns: Infinity,
    label: 'Iron Wall',
    explanation: '+2 marking. Opponents have -1 dribbling when attacking this team.',
    stats: { marking: +2 },
  },
  ruthless: {
    char: '🔥',
    turns: Infinity,
    label: 'Ruthless',
    explanation: '+3 shooting and +3 tackling. At end of each turn: 50% chance a random stat decreases by 1 permanently.',
    stats: { shooting: +3, tackling: +3 },
  },
  highPress: {
    char: '⚡',
    turns: Infinity,
    label: 'High Press',
    explanation: '+1 speed for all your players. Opponents have -1 tactical thinking.',
    stats: { speed: +1 },
  },
  omamori: {
    char: '🍊',
    turns: 1,
    label: 'Omamori',
    explanation: 'At the start of each turn: all injured players have 20% chance to recover. Removes injured effect.',
    stats: {},
  },
  clover: {
    char: '🍀',
    turns: 1,
    label: 'Clover',
    explanation: 'At the start of your turn: 25% chance to gain +1 to a random stat this turn.',
    stats: {},
  },
  spark: {
    char: '⚡',
    turns: Infinity,
    label: 'Spark',
    explanation: '+1 speed for all your players. +1 tactical thinking for all your players.',
    stats: { speed: +1, tacticalThinking: +1 },
  },
  wrench: {
    char: '🛠️',
    turns: 1,
    label: 'Wrench',
    explanation: 'At the start of each turn: 20% chance to remove the injured effect from one player.',
    stats: {},
  },
  faceMelter: {
    char: '💥',
    turns: Infinity,
    label: 'Face-Melter',
    explanation: '+3 shooting and +3 tackling. At end of each turn: 50% chance a random stat decreases by 1 permanently (stacks).',
    stats: { shooting: +3, tackling: +3 },
  },
  dagger: {
    char: '🗡️',
    turns: Infinity,
    label: 'Dagger',
    explanation: 'Tackles have 50% chance to result in a red card instead of a foul. This effect is cumulative with enragedRival.',
    stats: {},
  },
  alwaysMoving: {
    char: '🚶',
    turns: Infinity,
    label: 'Always Moving',
    explanation: 'At the start of your turn, if you did not draw a Move card, add one Move card (ephemeral, exhausts) to your hand.',
    stats: {},
  },
};

const TEAM_ARTIFACTS = {
  tikiTakaBoots: {
    char: '✨',
    label: 'Tiki-Taka Boots',
    effect: 'teamDribbling',
    description: '+1 dribbling for the whole team, always active.',
  },
  tacticalMindset: {
    char: '🧠',
    label: 'Tactical mindset',
    effect: 'teamTactics',
    description: '+1 tactical thinking for the whole team, always active.',
  },
  midfieldControl: {
    char: '🎵',
    label: 'Midfield Control',
    effect: 'teamPassing',
    description: '+1 passing for the whole team, always active.',
  },
  graniteWall: {
    char: '🛡️',
    label: 'Granite Wall',
    effect: 'teamDefense',
    description: '+1 tackling and +1 marking for the whole team, always active.',
  },
  turboLegs: {
    char: '⚡',
    label: 'Turbo Legs',
    effect: 'teamEnergy',
    description: '+1 speed for the whole team, always active.',
  },
  pressMachine: {
    char: '🔄',
    label: 'Press Machine',
    effect: 'counterPress',
    description: 'Counter-press: the team instantly tries to win the ball back whenever it loses it, always active.',
  },
  aerialKings: {
    char: '🦅',
    label: 'Aerial Kings',
    effect: 'aerialDominion',
    description: '+2 heading for the whole team, always active.',
  },
  minnowWill: {
    char: '🌬️',
    label: 'Minnow Grit',
    effect: 'secondWind',
    description: 'Exhaustion is removed from all players at the start of each half, always active.',
  },
};

class Player {
  constructor({
    name,
    age,
    position,
    team,
    nationality,
    speed,
    marking,
    tackling,
    shooting,
    passing,
    dribbling,
    tacticalThinking,
    heading,
    goalkeeping,
    isStar,
  }) {
    this.name = name;
    this.age = age;
    this.position = position;
    this.team = team;
    this.nationality = nationality;
    this.isStar = Boolean(isStar);
    this.speed = speed;
    this.marking = marking;
    this.tackling = tackling;
    this.shooting = shooting;
    this.passing = passing;
    this.dribbling = dribbling;
    this.tacticalThinking = tacticalThinking;
    this.heading = heading;
    this.goalkeeping = goalkeeping;

    this.yellowCards = 0;
    this.sentOff = false;
    this.effects = [];
  }

  get injured() {
    return this.hasEffect('injured');
  }

  addEffect(type, turns) {
    const spec = PLAYER_EFFECTS[type];
    if (!spec) throw new Error(`unknown effect: ${type}`);
    const duration = turns === undefined ? spec.turns : turns;

    if (type === 'injured' && !(typeof this.injuryMatches === 'number' && this.injuryMatches > 0)) {
      this.injuryMatches = 1;
    }

    const existing = this.effects.find((e) => e.type === type);
    if (existing) {
      existing.turns = duration;
      return;
    }

    const effect = { type, turns: duration, char: spec.char, label: spec.label, explanation: spec.explanation };
    this.effects.push(effect);
    for (const attr of BOOSTABLE_STATS) {
      const delta = spec.stats[attr];
      if (delta) this[attr] += delta;
    }
  }

  removeEffect(type) {
    const index = this.effects.findIndex((e) => e.type === type);
    if (index === -1) return;
    const spec = PLAYER_EFFECTS[type];
    this.effects.splice(index, 1);
    for (const attr of BOOSTABLE_STATS) {
      const delta = spec.stats[attr];
      if (delta) this[attr] -= delta;
    }
  }

  hasEffect(type) {
    return this.effects.some((e) => e.type === type);
  }

  getEffect(type) {
    return this.effects.find((e) => e.type === type) || null;
  }

  tickEffects() {
    const fortressActive =
      typeof game !== 'undefined' &&
      game &&
      game.fortressMentality &&
      game.fortressMentality[this.team] > 0;
    for (const effect of [...this.effects]) {
      if (effect.turns === Infinity) continue;
      if (fortressActive && DEFENSIVE_EFFECT_TYPES.includes(effect.type)) continue;
      effect.turns -= 1;
      if (effect.turns <= 0) this.removeEffect(effect.type);
    }
  }

  giveYellow() {
    this.yellowCards += 1;
    this.addEffect('yellow', Infinity);
    let result = 'yellow';
    if (this.yellowCards >= 2) {
      this.sentOff = true;
      result = 'red';
    }
    if (
      typeof TEAMS !== 'undefined' &&
      TEAMS &&
      TEAMS[this.team] &&
      TEAMS[this.team].hasTeamEffect('noPainNoGain')
    ) {
      for (const p of TEAMS[this.team].squad) p.tackling += 1;
      if (typeof logMatch === 'function') {
        logMatch(
          this.team,
          `No pain, no gain: ${this.name} is booked — the whole squad digs in (+1 tackling).`
        );
      }
    }
    return result;
  }
}
