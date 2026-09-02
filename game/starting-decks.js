class StartingDeck {
  static DEFAULT = 'basic';

  static cardClass = {
    pass: PassAction,
    'long-pass': LongPassAction,
    tackle: TackleAction,
    marking: MarkingAction,
    press: PressAction,
    move: MoveAction,
    'long-ball': LongBallAction,
    shoot: ShootAction,
    'long-shot': LongShotAction,
    'off-ball-play': OffBallPlayAction,
    dribbling: DribblingAction,
    sprint: SprintAction,
    'short-sprint': ShortSprintAction,
    'side-attack': SideAttackAction,
    overlap: OverlapAction,
    finish: FinishAction,
    cross: CrossAction,
    'offside-trap': OffsideTrapAction,
    'tactical-fault': TacticalFaultAction,
    fallback: FallbackAction,
    'dirty-tricks': DirtyTricksAction,
    'park-the-bus': ParkTheBusAction,
    'counter-attack': CounterAttackAction,
    intensity: IntensityAction,
    inspiration: InspirationAction,
    cramp: CrampAction,
    playmaking: PlaymakingAction,
    'hard-tackle': HardTackleAction,
    'full-pressure': FullPressureAction,
    'feint-turn': FeintTurnAction,
    possession: PossessionAction,
    'tiki-taka': TikiTakaAction,
    'coach-instructions': CoachInstructionsAction,
    'argento-pride': ArgentoPrideAction,
    'pep-style': PepStyleAction,
    eureka: EurekaAction,
    'joga-bonito': JogaBonitoAction,
    'german-efficiency': GermanEfficiencyAction,
    'coming-home': ComingHomeAction,
    'underdog-bite': UnderdogBiteAction,
    'total-football': TotalFootballAction,
    'atlas-wall': AtlasWallAction,
    'garra-charrua': GarraCharruaAction,
    'nordic-hammer': NordicHammerAction,
    'teranga-roar': TerangaRoarAction,
    'sun-in-their-eyes': SunInTheirEyesAction,
    'touch-of-magic': TouchOfMagicAction,
    ouch: OuchAction,
    'draw-foul': DrawFoulAction,
    hold: HoldAction,
    'growing-menace': GrowingMenaceAction,
    'peak-fitness': PeakFitnessAction,
    'ghost-run': GhostRunAction,
    'fortress-mentality': FortressMentalityAction,
    'the-script': TheScriptAction,
    'video-session': VideoSessionAction,
    'do-or-die': DoOrDieAction,
    'no-pain-no-gain': NoPainNoGainAction,
    'switch-gears': SwitchGearsAction,
    'broken-defense': BrokenDefenseAction,
    'forced-press': ForcedPressAction,
    'frozen-defense': FrozenDefenseAction,
    'risky-tackle': RiskyTackleAction,
    flair: FlairAction,
    'hand-of-god': HandOfGodAction,
    slip: SlipAction,
    siiiiu: SiiiiuAction,
    'expert-tackle': ExpertTackleAction,
    'tackling-madness': TacklingMadnessAction,
    'high-mobility': HighMobilityAction,
    'always-moving': AlwaysMovingAction,
    'brittle-little-bones': BrittleLittleBonesAction,
    cannonball: CannonballAction,
    combo: ComboAction,
    'run-and-cross': RunAndCrossAction,
    'injury-risk': InjuryRiskAction,
    'heads-in-the-clouds': HeadsInTheCloudsAction,
    'full-defense': FullDefenseAction,
    'full-attack': FullAttackAction,
    'mark-them-up': MarkThemUpAction,
    'last-ditch-block': LastDitchBlockAction,
    clearance: ClearanceAction,
    'compact-shape': CompactShapeAction,
    'defensive-wall': DefensiveWallAction,
    'through-ball': ThroughBallAction,
    'one-two': OneTwoAction,
    volley: VolleyAction,
    'switch-play': SwitchPlayAction,
    'underlap': UnderlapAction,
    overload: OverloadAction,
    'trigger-press': TriggerPressAction,
    'tactical-sub': TacticalSubAction,
    'trigger-man-marking': TriggerManMarkingAction,
    'park-the-midfield': ParkTheMidfieldAction,
    desperation: DesperationAction,
    'game-management': GameManagementAction,
    'time-wasting': TimeWastingAction,
    'tempo-control': TempoControlAction,
    shithousery: ShithouseryAction,
    'big-match-mentality': BigMatchMentalityAction,
    'extra-time': ExtraTimeAction,
    'red-mist': RedMistAction,
    'lost-dressing-room': LostDressingRoomAction,
    fatigue: FatigueAction,
    'morale-collapse': MoraleCollapseAction,
    'suspension-shadow': SuspensionShadowAction,
    'tactical-confusion': TacticalConfusionAction,
    'goalkeeper-blunder': GoalkeeperBlunderAction,
    'captains-mutiny': CaptainsMutinyAction,
    'weather-woes': WeatherWoesAction,
    'one-two-wall': OneTwoWallAction,
    'muscle-memory': MuscleMemoryAction,
    'second-wind': SecondWindAction,
    rabona: RabonaAction,
    'hat-trick-hero': HatTrickHeroAction,
    'time-wall': TimeWallAction,
    'yellow-card': YellowCardAction,
    'veteran-bench': VeteranBenchAction,
    'header-finish': HeaderFinishAction,
    'second-ball-header': SecondBallHeaderAction,
    'run-and-cross-flank': RunAndCrossFlankAction,
    'dribble-and-cross': DribbleAndCrossAction,
    'knockdown-finish': KnockdownFinishAction,
  };

  static registry = {};

  static define(name, { base = null, add = {} } = {}) {
    const counts = this.refCounts(base);
    for (const [card, count] of Object.entries(add)) {
      counts[card] = (counts[card] || 0) + count;
    }
    this.registry[name] = counts;
    return counts;
  }

  static refCounts(name) {
    if (!name) return {};
    const counts = this.registry[name];
    if (!counts) throw new Error(`Unknown starting deck '${name}'`);
    return { ...counts };
  }

  static counts(name = this.DEFAULT) {
    const counts = this.registry[name];
    if (!counts) throw new Error(`Unknown starting deck '${name}'`);
    return counts;
  }

  static build(name = this.DEFAULT) {
    return this.expand([], this.counts(name));
  }

  static expand(actions = [], extra = {}) {
    for (const [card, count] of Object.entries(extra)) {
      const ActionClass = this.cardClass[card];
      if (!ActionClass) throw new Error(`Unknown action card '${card}'`);
      for (let i = 0; i < count; i++) actions.push(new ActionClass());
    }
    return actions;
  }
}

StartingDeck.define('basic', {
  add: {
    pass: 6,
    marking: 3,
    tackle: 3,
    press: 3,
    move: 5,
    shoot: 5,
    'coach-instructions': 2,
    fallback: 2,
    'off-ball-play': 1,
    cramp: 1,
    intensity: 1,
    inspiration: 1,
    sprint: 1,
    cross: 1,
    'long-ball': 1,
    ouch: 1,
    'draw-foul': 1,
  },
});

StartingDeck.define('defensive', {
  base: 'basic',
  add: {
    'forced-press': 1,
    'risky-tackle': 1,
    'hard-tackle': 1,
    'full-pressure': 1,
    'long-ball': 2,
    'long-shot': 2,
    'tactical-fault': 2,
    'park-the-bus': 1,
    'mark-them-up': 1,
    fallback: 1,
    'short-sprint': 1,
    'last-ditch-block': 1,
    clearance: 1,
    'compact-shape': 1,
    'defensive-wall': 1,
  },
});

StartingDeck.define('attacking', {
  base: 'basic',
  add: {
    inspiration: 1,
    intensity: 1,
    'long-ball': 1,
    dribbling: 2,
    'feint-turn': 1,
    finish: 2,
    pass: 2,
    cross: 2,
    shoot: 2,
    overlap: 2,
    'offside-trap': 1,
    'side-attack': 2,
    flair: 1,
    slip: 1,
    'through-ball': 1,
    'one-two': 1,
    volley: 1,
    'switch-play': 1,
    underlap: 1,
  },
});

StartingDeck.define('counter', {
  base: 'defensive',
  add: {
    'long-ball': 3,
    move: 2,
    'counter-attack': 2,
    cross: 2,
    dribbling: 1,
    'full-pressure': 1,
    'feint-turn': 1,
    sprint: 2,
    'short-sprint': 2,
    'through-ball': 1,
    'switch-play': 1,
  },
});

StartingDeck.define('technical', {
  base: 'basic',
  add: {
    inspiration: 1,
    pass: 2,
    playmaking: 2,
    'feint-turn': 2,
    marking: 3,
    'offside-trap': 1,
    'side-attack': 2,
    overlap: 2,
    finish: 3,
    move: 2,
    possession: 1,
    'pep-style': 1,
    flair: 1,
    slip: 2,
    'through-ball': 1,
    'one-two': 1,
    'switch-play': 1,
    underlap: 1,
  },
});