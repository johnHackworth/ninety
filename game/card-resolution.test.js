const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { test, mock } = require('node:test');
const { runInNewContext } = require('node:vm');

test('intercepted switch play transfers possession and completes the action', () => {
  const team = { name: 'Home' };
  const interceptor = { name: 'Defender' };
  const interceptorEl = { _token: { player: interceptor } };
  const target = { x: 5, y: 4 };
  const action = {
    play: () => ({ success: true, target, intercepted: true, interceptor }),
  };
  const context = {
    pendingSwitchPlay: { team, action },
    board: {},
    matchState: { possession: {}, lastDribbledPlayer: {} },
    cancelPendingSwitchPlay: () => {
      context.pendingSwitchPlay = null;
    },
    moveBall: mock.fn(),
    shakeScreen: () => {},
    tokenElForPlayer: mock.fn(() => interceptorEl),
    updatePossession: mock.fn(),
    logMatch: () => {},
    logAlert: mock.fn(),
    game: { playAction: mock.fn(() => ({ success: true })) },
    renderGame: mock.fn(),
  };
  runInNewContext(readFileSync(`${__dirname}/card-resolution.js`, 'utf8'), context);

  context.resolveSwitchPlay(target.x, target.y);

  assert.equal(context.pendingSwitchPlay, null);
  assert.equal(context.matchState.lastDribbledPlayer, null);
  assert.deepEqual(Array.from(context.moveBall.mock.calls[0].arguments), [target.x, target.y]);
  assert.deepEqual(Array.from(context.tokenElForPlayer.mock.calls[0].arguments), [interceptor]);
  assert.equal(context.matchState.possession, interceptorEl);
  assert.equal(context.updatePossession.mock.callCount(), 1);
  assert.deepEqual(Array.from(context.game.playAction.mock.calls[0].arguments), [team, action]);
  assert.equal(context.renderGame.mock.callCount(), 1);
  assert.equal(context.logAlert.mock.callCount(), 0);
});
