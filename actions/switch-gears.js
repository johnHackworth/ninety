class SwitchGearsAction extends Action {
  static rarity = 1;
  constructor() {
    super({
      name: 'Switch gears',
      description:
        'Toggle your team\u2019s stance. Attacking gear: +2 shooting, -1 marking. Defensive gear: +2 marking, +1 tackling, -1 shooting. The stance lasts until you switch again; each switch draws 1 card. Starts in the attacking gear.',
      cost: [0],
      category: 'tactical',
    });
  }

  play({ team }) {
    return { success: true, team };
  }

  resolve(team) {
    const result = this.play({ team });
    if (!result.success && result.reason) {
      logAlert(result.reason);
      renderGame();
      return;
    }
    let drew = false;
    if (team.hasTeamEffect('gearAttack')) {
      team.removeTeamEffect('gearAttack');
      team.addTeamEffect('gearDefense');
      drew = true;
      logMatch(team.name, 'Switch gears: dropping into the defensive gear (+2 marking, +1 tackling, -1 shooting). Draw 1 card.');
    } else if (team.hasTeamEffect('gearDefense')) {
      team.removeTeamEffect('gearDefense');
      team.addTeamEffect('gearAttack');
      drew = true;
      logMatch(team.name, 'Switch gears: surging into the attacking gear (+2 shooting, -1 marking). Draw 1 card.');
    } else {
      team.addTeamEffect('gearAttack');
      logMatch(team.name, 'Switch gears: the team settles into the attacking gear (+2 shooting, -1 marking).');
    }
    if (drew) game.drawCards(team, 1);
    const playResult = game.playAction(team, this);
    if (!playResult.success) logAlert(playResult.reason);
    renderGame();
  }
}
