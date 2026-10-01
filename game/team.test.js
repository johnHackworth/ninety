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
  runInContext(readFileSync(`${__dirname}/mocks.js`, 'utf8'), context);
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
