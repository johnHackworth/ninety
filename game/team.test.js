const assert = require('node:assert/strict');
const { readFileSync, readdirSync } = require('node:fs');
const { test } = require('node:test');
const { runInNewContext, createContext, runInContext } = require('node:vm');

const Team = runInNewContext(`${readFileSync(`${__dirname}/team.js`, 'utf8')}\nTeam;`);
const stats = ['speed', 'marking', 'tackling', 'shooting', 'passing', 'dribbling', 'tacticalThinking', 'heading', 'goalkeeping'];
function player(name, position, values = {}) {
  return { name, position, ...Object.fromEntries(stats.map((s) => [s, 5])), ...values };
}
function resolve(cells, starters, subs = [], options = {}) {
  return Team.resolveFormation(cells, { starters, subs, ...options });
}

test('selects stronger substitutes and the best goalkeeper using relevant skills', () => {
  const weak = player('Starter', 'DF');
  const defender = player('Defender', 'DF', { marking: 9, tackling: 9, heading: 9 });
  const irrelevant = player('Shooter', 'DF', { shooting: 10, dribbling: 10, goalkeeping: 10 });
  const gk = player('Starting keeper', 'GK', { goalkeeping: 4 });
  const bestGk = player('Reserve keeper', 'GK', { goalkeeping: 9 });
  const result = resolve({ DF: [[2, 3]] }, [weak, gk], [irrelevant, defender, bestGk]);
  assert.deepEqual(Array.from(result.placed, (p) => p.name), ['Reserve keeper', 'Defender']);
});

test('assigns mobile players wide and strong finishers centrally', () => {
  const winger = player('Winger', 'FW', { speed: 10, dribbling: 10, passing: 9, shooting: 6, heading: 2 });
  const striker = player('Striker', 'FW', { shooting: 10, heading: 10, speed: 3, dribbling: 4 });
  const result = resolve({ FW: [[6, 0], [6, 3]] }, [striker, winger]);
  assert.deepEqual(Array.from(result.map.Winger), [6, 0]);
  assert.deepEqual(Array.from(result.map.Striker), [6, 3]);
});

test('optimizes the entire assignment rather than taking each slots best player greedily', () => {
  const versatile = player('Versatile', 'MF', { marking: 9, tackling: 9, heading: 9, passing: 10, tacticalThinking: 10, dribbling: 10 });
  const defender = player('Specialist', 'DF', { marking: 7, tackling: 7, heading: 7, passing: 1, tacticalThinking: 1, dribbling: 1 });
  assert.ok(Team.formationScore(versatile, 'DF', 2, 3) > Team.formationScore(defender, 'DF', 2, 3));
  const result = resolve({ DF: [[2, 3]], MF: [[4, 3]] }, [versatile, defender]);
  assert.deepEqual(Array.from(result.map.Specialist), [2, 3]);
  assert.deepEqual(Array.from(result.map.Versatile), [4, 3]);
});

test('assignment score matches exhaustive search for a mixed squad', () => {
  const candidates = [player('D', 'DF'), player('M', 'MF'), player('F', 'FW'), player('Utility', 'MF', { tackling: 8, shooting: 8, speed: 8 })];
  const cells = { DF: [[2, 0]], MF: [[4, 3]], FW: [[6, 3]] };
  const slots = [['DF', 2, 0], ['MF', 4, 3], ['FW', 6, 3]];
  let optimum = -Infinity;
  for (const a of candidates) for (const b of candidates) for (const c of candidates) {
    if (new Set([a, b, c]).size < 3) continue;
    optimum = Math.max(optimum, [a, b, c].reduce((sum, p, i) => sum + Team.formationScore(p, ...slots[i]), 0));
  }
  const result = resolve(cells, candidates);
  const score = result.placed.reduce((sum, p) => {
    const [x, y] = result.map[p.name];
    const slot = slots.find((s) => s[1] === x && s[2] === y);
    return sum + Team.formationScore(p, ...slot);
  }, 0);
  assert.ok(Math.abs(score - optimum) < 1e-9);
});

test('home and away select identical players and mirror every slot', () => {
  const candidates = [player('Keeper', 'GK'), player('Defender', 'DF'), player('Midfielder', 'MF'), player('Forward', 'FW')];
  const cells = { MF: [[3, 3], [5, 0]], FW: [[6, 3]] };
  const home = resolve(cells, candidates, [], { side: 'left' });
  const away = resolve(cells, candidates, [], { side: 'right' });
  assert.deepEqual(Array.from(home.placed, (p) => p.name), Array.from(away.placed, (p) => p.name));
  for (const [name, [x, y]] of Object.entries(home.map)) assert.deepEqual(Array.from(away.map[name]), [8 - x, y]);
});

test('excludes unavailable players, deduplicates pools and handles short squads', () => {
  const keeper = player('Keeper', 'GK');
  const fit = player('Fit', 'FW', Object.fromEntries(stats.map((s) => [s, 0])));
  const candidates = [keeper, fit, player('Injured', 'DF', { injured: true }), player('Red card', 'DF', { sentOff: true }), player('Suspended', 'DF')];
  const result = resolve({ DF: [[2, 0], [2, 3]], MF: [[4, 3]] }, candidates, [fit, keeper], { unavailable: new Set(['Suspended']) });
  assert.equal(result.placed.length, 2);
  assert.equal(new Set(result.placed.map((p) => p.name)).size, 2);
  assert.equal(Object.keys(result.map).length, 2);
  assert.equal(resolve({ DF: [[2, 3]] }, []).placed.length, 0);
});

test('equal scores retain the starter and old position penalties do not distort selection', () => {
  const starter = player('Starter', 'MF', { _outOfPositionDelta: -1, ...Object.fromEntries(stats.map((s) => [s, 4])) });
  const reserve = player('Reserve', 'MF');
  const before = JSON.stringify(starter);
  assert.equal(resolve({ MF: [[4, 3]] }, [starter], [reserve]).placed[0], starter);
  assert.equal(JSON.stringify(starter), before);
});

function gameContext() {
  const context = createContext({ StartingDeck: { DEFAULT: 'default', build: () => [], expand: () => {} } });
  const actions = ['WellPositionedAction', 'MispositionedAction', 'LooseBallAction', 'BotchedSaveAction', 'HowlerAction', 'AmazingReflexesAction', 'HitThePostAction'];
  for (const name of actions) context[name] = class {};
  for (const file of ['player.js', 'team.js']) runInContext(readFileSync(`${__dirname}/${file}`, 'utf8'), context);
  runInContext(readFileSync(`${__dirname}/../teams/abstract-team.js`, 'utf8'), context);
  for (const file of readdirSync(`${__dirname}/../teams`).filter((f) => f.endsWith('.js') && f !== 'abstract-team.js')) {
    runInContext(readFileSync(`${__dirname}/../teams/${file}`, 'utf8'), context);
  }
  runInContext(readFileSync(`${__dirname}/team-registry.js`, 'utf8'), context);
  return context;
}

test('all real teams start eleven distinct players with matching formation and goalkeeper', () => {
  const context = gameContext();
  const teams = runInContext('buildTeams(Object.keys(TEAM_CLASSES))', context);
  for (const team of Object.values(teams)) {
    assert.equal(team.currentPlayers.length, 11, team.name);
    assert.equal(new Set(team.currentPlayers.map((p) => p.name)).size, 11, team.name);
    assert.equal(team.currentPlayers.filter((p) => p.position === 'GK').length, 1, team.name);
    assert.ok(team.currentPlayers.includes(team.currentGoalkeeper), team.name);
    assert.equal(Object.keys(team.formation).length, 11, team.name);
    assert.equal(new Set(Object.values(team.formation).map((c) => c.join(','))).size, 11, team.name);
    for (const p of team.currentPlayers) assert.ok(team.formation[p.name], `${team.name}: ${p.name}`);
  }
});

test('squad display preserves flexible assignments and formation changes update current coordinates', () => {
  const context = gameContext();
  const ui = readFileSync(`${__dirname}/../ui/world-cup-ui.js`, 'utf8');
  const templates = ui.slice(ui.indexOf('const FORMATION_TEMPLATES ='), ui.indexOf('\n};', ui.indexOf('const FORMATION_TEMPLATES =')) + 3);
  const squadFunctions = ui.slice(ui.indexOf('const WC_MT_ROLE_STATS ='), ui.indexOf('function wcMtReplaceInSlot('));
  runInContext(`let wcSelectedFormation; const wcPendingLineup = {}; const wcPendingFormationCoords = {};\n${templates}\n${squadFunctions}`, context);
  const team = runInContext('buildTeams(["Argentina"]).Argentina', context);
  // Force midfielders to fill attacking slots so display cannot rely on natural roles.
  team.squad = team.squad.filter((p) => p.position !== 'FW');
  team.currentPlayers = team.currentPlayers.filter((p) => p.position !== 'FW');
  context.team = team;
  context.wcMatchUnavailableNames = () => new Set();
  runInContext('wcMtApplyFormation(team, team.name, false, "4-3-3")', context);
  const assignments = runInContext('wcMtFormationAssignment(team, false)', context);
  assert.equal(assignments.length, 11);
  assert.ok(assignments.some((s) => s.rawTx === 6 && s.player.position !== 'FW'));
  for (const slot of assignments) assert.deepEqual(Array.from(team.formation[slot.player.name]), [slot.rawTx, slot.rawTy]);
  const pending = runInContext('wcPendingFormationCoords[team.name]', context);
  assert.equal(JSON.stringify(pending), JSON.stringify(team.formation));
});

function fixture() {
  const files = [
    'actions/action.js',
    'actions/goalkeeping-action.js',
    'actions/heads-in-the-clouds.js',
    'actions/red-mist.js',
    'actions/morale-collapse.js',
    'actions/goalkeeper-blunder.js',
    'game/player.js',
    'game/team.js',
  ];
  const source = files.map((file) => readFileSync(`${__dirname}/../${file}`, 'utf8')).join('\n');
  const { Team, Player, cards, stats } = runInNewContext(`${source}
    ({ Team, Player, stats: BOOSTABLE_STATS, cards: [
      new HeadsInTheCloudsAction(), new RedMistAction(),
      new MoraleCollapseAction(), new GoalkeeperBlunderAction(),
    ] });
  `);
  const makePlayer = (name) => new Player({
    name, position: 'FW', team: 'Home',
    ...Object.fromEntries(stats.map((stat) => [stat, 10])),
  });
  const starter = makePlayer('Starter');
  const substitute = makePlayer('Substitute');
  const team = new Team({
    name: 'Home', squad: [starter, substitute], startingXI: [starter.name],
  });
  return { team, starter, substitute, cards, stats };
}

test('changing active penalty types updates all attribute penalties without crashing', () => {
  const { team, starter, cards, stats } = fixture();
  team.syncHandPenalties(cards);
  const player = team.currentPlayers[0];
  assert.equal(player.speed, 7);
  assert.equal(player.tackling, 5);
  assert.equal(player.tacticalThinking, 4);
  assert.equal(player.goalkeeping, 3);

  team.syncHandPenalties(cards.slice(1));
  assert.equal(team.currentPlayers[0].speed, 10);
  assert.equal(team.currentPlayers[0].tackling, 8);
  assert.equal(team.currentPlayers[0].tacticalThinking, 7);
  assert.equal(team.currentPlayers[0].goalkeeping, 6);
  team.syncHandPenalties([]);
  assert.equal(team.currentPlayers[0], starter);
  for (const stat of stats) assert.equal(starter[stat], 10);
});

test('substitutions remain in the lineup when penalties change or clear', () => {
  const { team, starter, substitute, cards } = fixture();
  team.syncHandPenalties(cards);
  assert.equal(team.substitute(team.currentPlayers[0], substitute), true);
  assert.equal(team.currentPlayers[0].name, substitute.name);
  team.syncHandPenalties(cards.slice(1));
  assert.equal(team.currentPlayers[0].name, substitute.name);
  team.syncHandPenalties([]);
  assert.equal(team.currentPlayers[0], substitute);
  assert.equal(team.substitutedOut[0], starter);
  assert.equal(team.substitutionsUsed, 1);
});

test('incoming substitutes immediately receive active hand penalties', () => {
  const { team, substitute, cards } = fixture();
  team.syncHandPenalties([cards[0]]);
  assert.equal(team.substitute(team.currentPlayers[0], substitute), true);
  assert.equal(team.currentPlayers[0].speed, 7);
  assert.equal(substitute.speed, 10);
});

test('removed players stay removed when penalties clear', () => {
  const { team, cards } = fixture();
  team.syncHandPenalties([cards[0]]);
  team.currentPlayers.splice(0, 1);
  team.syncHandPenalties([]);
  assert.equal(team.currentPlayers.length, 0);
});

test('temporary player effects do not make hand penalties permanent', () => {
  const { team, starter, cards, stats } = fixture();
  team.syncHandPenalties(cards);
  const player = team.currentPlayers[0];
  player.addEffect('inspired', 1);
  assert.equal(player.speed, 9);
  assert.equal(player.tackling, 7);
  player.tickEffects();
  assert.equal(player.speed, 7);
  assert.equal(player.tackling, 5);
  team.syncHandPenalties([]);
  for (const stat of stats) assert.equal(starter[stat], 10);
});

test('attribute improvements under a hand penalty preserve their intended gain', () => {
  const { team, starter, cards } = fixture();
  team.syncHandPenalties([cards[0]]);
  team.currentPlayers[0].shooting += 1;
  assert.equal(team.currentPlayers[0].shooting, 8);
  team.syncHandPenalties([]);
  assert.equal(starter.shooting, 11);
});

test('retained player references use the current penalties without accumulating them', () => {
  const { team, cards } = fixture();
  team.syncHandPenalties([cards[0]]);
  const player = team.currentPlayers[0];
  team.syncHandPenalties([cards[0]]);
  assert.equal(team.currentPlayers[0], player);
  assert.equal(player.speed, 7);
  team.syncHandPenalties(cards.slice(1));
  assert.equal(player.speed, 10);
  assert.equal(player.tackling, 8);
  team.syncHandPenalties([]);
  assert.equal(player.tackling, 10);
});
