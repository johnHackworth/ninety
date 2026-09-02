class GoalkeepingAction extends Action {
  static rarity = 3;

  constructor({ name, description, goalkeeperBonus = 0, looseBall = false, hitPost = false, exhaust = false }) {
    super({ name, description, cost: [0], exhaust });
    this.goalkeeperBonus = goalkeeperBonus;
    this.looseBall = looseBall;
    this.hitPost = hitPost;
  }
}

class WellPositionedAction extends GoalkeepingAction {
  constructor() {
    super({
      name: 'Well positioned',
      description: 'The goalkeeper is well positioned for the shot, +1 to goalkeeping.',
      goalkeeperBonus: 1,
    });
  }
}

class MispositionedAction extends GoalkeepingAction {
  constructor() {
    super({
      name: 'Mispositioned',
      description: 'The goalkeeper is caught mispositioned, -2 to goalkeeping.',
      goalkeeperBonus: -2,
    });
  }
}

class LooseBallAction extends GoalkeepingAction {
  constructor() {
    super({
      name: 'Loose ball',
      description:
        'If the shot is blocked, the ball is randomly placed in one of the six cells around the goal instead of staying with the keeper.',
      looseBall: true,
    });
  }
}

class BotchedSaveAction extends GoalkeepingAction {
  constructor() {
    super({
      name: 'Botched save',
      description: 'The goalkeeper fumbles the save, -4 to goalkeeping.',
      goalkeeperBonus: -4,
    });
  }
}

class HowlerAction extends GoalkeepingAction {
  constructor() {
    super({
      name: 'Howler',
      description: 'The goalkeeper makes a terrible mistake, -5 to goalkeeping. Exhausts after use.',
      goalkeeperBonus: -5,
      exhaust: true,
    });
  }
}

class AmazingReflexesAction extends GoalkeepingAction {
  constructor() {
    super({
      name: 'Quick reflexes',
      description: 'The goalkeeper pulls off a wonder save, +3 to goalkeeping.',
      goalkeeperBonus: 3,
    });
  }
}

class HitThePostAction extends GoalkeepingAction {
  constructor() {
    super({
      name: 'Hit the post!',
      description:
        'No modifiers are applied and the shot always fails, bouncing to a random penalty box cell. If a single player occupies it they get possession; if two players, the one with the higher tactical thinking takes it (ties favour the attacker).',
      hitPost: true,
    });
  }
}
