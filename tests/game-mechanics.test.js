const test = require('node:test');
const assert = require('node:assert/strict');
const { createGameContext } = require('./game-fixture');

test('changing overlapping hand penalties keeps stat reads valid', () => {
  const { run } = createGameContext();
  assert.equal(run(`
    const team = makeTeam('A');
    team.syncHandPenalties([new HeadsInTheCloudsAction()]);
    team.currentPlayers[0].speed;
  `), 2);
  assert.equal(run(`
    team.syncHandPenalties([new HeadsInTheCloudsAction(), new RedMistAction()]);
    team.currentPlayers[0].marking;
  `), 0);
  assert.equal(run(`
    team.syncHandPenalties([new RedMistAction()]);
    team.currentPlayers[0].speed;
  `), 5);
  assert.equal(run(`team.syncHandPenalties([]); team.currentPlayers[0].marking;`), 5);
});

test('held cards remain in hand and can be played on a later turn', () => {
  const { run } = createGameContext();
  run(`
    newMatch();
    const a = TEAMS.A, held = game.inPlay.A[0], ordinary = game.inPlay.A[1];
    const innate = new MoveAction(); innate.hold = true;
    game.inPlay.A.push(innate);
    game.heldCards.A = [held]; held.hold = true;
    game.endTurn();
  `);
  assert.equal(run('game.inPlay.A.includes(held) && game.inPlay.A.includes(innate)'), true);
  assert.equal(run('a.discardedActions.includes(ordinary)'), true);
  assert.equal(run('a.discardedActions.includes(held) || a.exhaustedActions.includes(held)'), false);
  run('game.endTurn(); game.currentTeam = a;');
  assert.equal(run('game.inPlay.A.includes(held)'), true);
  assert.equal(run('game.playAction(a, held, {noSwitch: true}).success'), true);
  assert.equal(run('game.heldCards.A.includes(held) || game.inPlay.A.includes(held)'), false);
});

test('Do or die expires for the original players even after a substitution', () => {
  const { run } = createGameContext();
  run(`newMatch(); const a = TEAMS.A, buffed = a.currentPlayers[0];
    game.doOrDie.A = {stage: 'primed', buffed: []}; game.endTurn();`);
  assert.equal(run('buffed.shooting'), 9);
  run(`const substitute = new Player({...buffed, name: 'sub', shooting: 5});
    a.currentPlayers[0] = substitute; game.endTurn();`);
  assert.equal(run('buffed.shooting'), 5);
  assert.equal(run('substitute.shooting'), 5);
  assert.equal(run('a.currentPlayers[1].injured'), true);
  assert.equal(run("a.currentPlayers[1].removeEffect('injured'); a.currentPlayers[1].shooting"), 5);
  assert.equal(run('game.doOrDie.A'), undefined);
});
