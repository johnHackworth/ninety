const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8'); }

function createGameContext() {
  const storage = new Map();
  const context = vm.createContext({
    console,
    Math: Object.assign(Object.create(Math), { random: () => 0.5 }),
    logMatch() {},
    humanNotice() {},
    document: { querySelectorAll() { return []; } },
    localStorage: {
      getItem(key) { return storage.get(key) ?? null; },
      setItem(key, value) { storage.set(key, value); },
      removeItem(key) { storage.delete(key); },
    },
  });
  for (const [, file] of read('index.html').matchAll(/<script src="([^"]+)"/g)) {
    if (file.startsWith('actions/') || file.startsWith('match-effects/') ||
        ['game/player.js', 'game/team.js', 'game/game-controller.js'].includes(file)) {
      vm.runInContext(read(file), context, { filename: file });
    }
  }
  vm.runInContext(`
    let game = null, TEAMS = null, ball = null, matchState = null;
    let simulationMode = false, substitutionWindowOpen = false;
    function makeTeam(name) {
      const squad = [0, 1].map((i) => new Player({
        name: name + i, age: 25, position: 'FW', team: name, isStar: true,
        speed: 5, marking: 5, tackling: 5, shooting: 5, passing: 5,
        dribbling: 5, tacticalThinking: 5, heading: 5, goalkeeping: 5,
      }));
      return new Team({name, squad, startingXI: squad.map((p) => p.name),
        side: name === 'A' ? 'left' : 'right', actions: Array.from({length: 30}, () => new PassAction())});
    }
    function buildTeams(names) { return Object.fromEntries(names.map((name) => [name, makeTeam(name)])); }
    function newMatch() {
      TEAMS = buildTeams(['A', 'B']);
      game = new GameController({teams: Object.values(TEAMS)});
    }
  `, context);
  return {
    context,
    run(code) { return vm.runInContext(code, context); },
    load(file) { vm.runInContext(read(file), context, { filename: file }); },
  };
}

module.exports = { createGameContext, read };
