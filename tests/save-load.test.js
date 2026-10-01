const test = require('node:test');
const assert = require('node:assert/strict');
const { createGameContext, read } = require('./game-fixture');

function savedGame() {
  const fixture = createGameContext();
  fixture.run(read('app.js').split('function applyManualSub')[0]);
  const lifecycle = read('game/match-lifecycle.js');
  fixture.run(lifecycle.slice(lifecycle.indexOf('function resolveCard('), lifecycle.indexOf('function resolvePlayer(')));
  fixture.run(`
    const CARD_TYPES = [PassAction, MoveAction, HeadsInTheCloudsAction, RedMistAction,
      WellPositionedAction, MispositionedAction, LooseBallAction, BotchedSaveAction,
      HowlerAction, AmazingReflexesAction, HitThePostAction];
    function enforceFreeKickProtection() {}
    matchState = {possession: null, lastBallMove: null, lastDribbledPlayer: null,
      gkHoldFrom: null, gkCollectReturn: null};
  `);
  fixture.load('game/save-load.js');
  fixture.run('newMatch(); _saveLoad._debounceMs = 0;');
  return fixture;
}

function capture(run) {
  return JSON.parse(run('JSON.stringify(loadGameState())'));
}

test('restore preserves deck, stats, effect durations and turn without random rolls', () => {
  const { run } = savedGame();
  run(`
    TEAMS.A.currentPlayers[0].addEffect('defenseFocus', 3);
    TEAMS.A.addTeamEffect('growingMenace', 3);
    game.turn = 4;
    game.muscleMemory.A = true; game.timeWall.B = true;
    game.ghostRun.A = true; game.fortressMentality.A = 2;
    game.blindEyeUsed.A = true; game.squadDepthPlays.A = 7;
    game.cardsPlayedByPlayer.A = { A0: 9 }; game.matchHeldCards.A = ['Pass'];
    game.pendingPenalty = 'A';
    game.freeKickProtection = {teamName: 'A', opponentName: 'B', x: 2, y: 3, turn: 4};
    game.ballStasisTurns = 2; game._lastBallCell = 17; game._dogRolledThisTurn = true;
    saveGameState(); const snapshot = loadGameState();
  `);
  const before = capture(run);
  run('Math.random = () => { throw new Error("Unexpected random roll during restore"); };');
  assert.equal(run('restoreGameState(snapshot)'), true);
  run('saveGameState();');
  assert.deepEqual(capture(run), before);
  assert.equal(run('typeof game.onTurnStart === "function" && typeof game.onTurnEnd === "function"'), true);
});

test('held and free card references and runtime flags survive reload', () => {
  const { run } = savedGame();
  run(`
    const held = game.inPlay.A[0]; held.hold = true;
    held.ephemeral = true; held.exhaust = true; held.free = true; held._id = 100000;
    game.heldCards.A = [held]; game.markFree(game.inPlay.A[1]);
    saveGameState(); restoreGameState(loadGameState());
  `);
  assert.equal(run('game.heldCards.A[0] === game.inPlay.A[0] && game.freeActions[0] === game.inPlay.A[1]'), true);
  assert.equal(run('game.inPlay.A[0].hold && game.inPlay.A[0].free && game.inPlay.A[0].ephemeral && game.inPlay.A[0].exhaust'), true);
  assert.equal(run('new PassAction()._id > 100000'), true);
  run('game.endTurn();');
  assert.equal(run('game.inPlay.A.includes(game.heldCards.A[0])'), true);
});

test('restored Do or die expires and pending video session draws its copies', () => {
  const { run } = savedGame();
  run(`
    game.doOrDie.A = {stage: 'primed', buffed: []};
    game.endTurn();
    game.videoSession.A = MoveAction;
    saveGameState(); restoreGameState(loadGameState());
  `);
  assert.equal(run('game.doOrDie.A.buffed[0] === TEAMS.A.squad[0]'), true);
  assert.equal(run('TEAMS.A.squad[0].shooting'), 9);
  assert.equal(run('game.videoSession.A === MoveAction'), true);
  run('game.endTurn();');
  assert.equal(run('TEAMS.A.squad[0].shooting'), 5);
  assert.equal(run("TEAMS.A.squad[1].removeEffect('injured'); TEAMS.A.squad[1].shooting"), 5);
  assert.equal(run('game.inPlay.A.filter((c) => c instanceof MoveAction).length'), 2);
});

test('hand penalties restore once and can subsequently change', () => {
  const { run } = savedGame();
  run(`game.inPlay.A.push(new HeadsInTheCloudsAction());
    TEAMS.A.syncHandPenalties(game.inPlay.A); saveGameState();`);
  assert.equal(run('TEAMS.A.currentPlayers[0].speed'), 2);
  run('restoreGameState(loadGameState());');
  assert.equal(run('TEAMS.A.currentPlayers[0].speed'), 2);
  assert.equal(run('TEAMS.A.squad[0].speed'), 5);
  run(`game.inPlay.A = [new RedMistAction()]; TEAMS.A.syncHandPenalties(game.inPlay.A);`);
  assert.equal(run('TEAMS.A.currentPlayers[0].marking'), 3);
});

test('weather boost state restores without applying bonuses twice', () => {
  const { run } = savedGame();
  run(`game.score.B = 1; game.matchEffect = new GiantTifoEffect();
    game.matchEffect.apply(); game.pendingMatchEffect = game.matchEffect;
    saveGameState(); restoreGameState(loadGameState());`);
  assert.equal(run('TEAMS.A.squad[0].shooting'), 6);
  assert.equal(run('game.pendingMatchEffect === game.matchEffect'), true);
  run('game.matchEffect.revoke();');
  assert.equal(run('TEAMS.A.squad[0].shooting'), 5);
});

test('older saves without new state fields still restore', () => {
  const { run } = savedGame();
  run(`saveGameState(); const snapshot = loadGameState();
    for (const key of SAVE_EFFECT_MAPS) delete snapshot.game[key];
    for (const key of ['doOrDie', 'heldCards', 'videoSession', 'matchEffectState']) delete snapshot.game[key];
    for (const cards of Object.values(snapshot.inPlay)) {
      for (const card of cards) for (const flag of ['hold', 'free', 'ephemeral', 'exhaust']) delete card[flag];
    }`);
  assert.equal(run('restoreGameState(snapshot)'), true);
  assert.equal(run('Object.keys(game.muscleMemory).length'), 0);
  assert.equal(run('game.inPlay.A[0].hold'), false);
  assert.equal(run('game.turn === snapshot.game.turn'), true);
});
