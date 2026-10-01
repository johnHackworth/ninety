const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const { runInNewContext } = require('node:vm');

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
