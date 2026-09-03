class BeesCornerEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Bees Swarm the Corner Flag',
      description:
        'A swarm of bees buzzes around the corners: any tackle or marking duel resolved in the outer columns or end rows is -3 to marking and tackling.',
      char: '🐝',
    });
  }

  apply() {}
  revoke() {}
}
