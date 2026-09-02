class PermissiveRefereeEffect extends MatchEffect {
  constructor() {
    super({
      name: 'Permissive Referee',
      description:
        'The referee lets play flow: all players get +1 tackling, and failed tackles rarely result in a foul.',
      char: '🦺',
    });
  }

  apply() {
    for (const p of MatchEffect.allPlayers()) {
      p.tackling += 1;
    }
  }

  revoke() {
    for (const p of MatchEffect.allPlayers()) {
      p.tackling -= 1;
    }
  }
}
