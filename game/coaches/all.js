const COACHES = [
  new Coach({
    name: 'Carlos Mendes',
    nationality: 'Spain',
    effects: ['teamPassing'],
  }),
  new Coach({
    name: 'Rafael Dominguez',
    nationality: 'Argentina',
    effects: ['teamDribbling'],
  }),
  new Coach({
    name: 'Klaus Richter',
    nationality: 'Germany',
    effects: ['teamTactics'],
  }),
  new Coach({
    name: 'Giovanni Ferraro',
    nationality: 'Italy',
    effects: ['teamDefense'],
  }),
  new Coach({
    name: 'Emeka Okafor',
    nationality: 'Nigeria',
    effects: ['teamEnergy'],
  }),
  new Coach({
    name: 'Jorge Velasquez',
    nationality: 'Colombia',
    effects: ['sonicSurge'],
  }),
  new Coach({
    name: 'Moustapha Diallo',
    nationality: 'Senegal',
    effects: ['shadowLock'],
  }),
  new Coach({
    name: 'Branislav Petrovic',
    nationality: 'Serbia',
    effects: ['steelTackle'],
  }),
  new Coach({
    name: 'Hiroshi Tanaka',
    nationality: 'Japan',
    effects: ['thunderstrike'],
  }),
  new Coach({
    name: 'Arnaud Lefevre',
    nationality: 'France',
    effects: ['metronome'],
  }),
  new Coach({
    name: 'Luis Ramirez',
    nationality: 'Uruguay',
    effects: ['silkTouch'],
  }),
  new Coach({
    name: 'Dimitrios Papadopoulos',
    nationality: 'Greece',
    effects: ['grandmasterEye'],
  }),
  new Coach({
    name: 'Samuel Okonkwo',
    nationality: 'Cameroon',
    effects: ['aerialDominion'],
  }),
  new Coach({
    name: 'Marcelo Bianchi',
    nationality: 'Italy',
    effects: ['relentlessMomentum'],
  }),
  new Coach({
    name: 'Viktor Sorokin',
    nationality: 'Russia',
    effects: ['ironCurtain'],
  }),
  new Coach({
    name: 'Thomas Eriksen',
    nationality: 'Denmark',
    effects: ['secondWind'],
  }),
  new Coach({
    name: 'Fabio Costa',
    nationality: 'Portugal',
    effects: ['clinicalFinish'],
  }),
  new Coach({
    name: 'Andre Mensah',
    nationality: 'Ghana',
    effects: ['counterPress'],
  }),
  new Coach({
    name: 'William Harper',
    nationality: 'England',
    effects: ['deadBallMastery'],
  }),
  new Coach({
    name: 'Aleksandar Kovac',
    nationality: 'Croatia',
    effects: ['lastDefender'],
  }),
  new Coach({
    name: 'Paolo Venturelli',
    nationality: 'Italy',
    effects: ['wideThinking'],
  }),
  new Coach({
    name: 'Hendrik Mulder',
    nationality: 'Netherlands',
    effects: ['creativity'],
  }),
  new Coach({
    name: 'Oleksiy Danylyuk',
    nationality: 'Ukraine',
    effects: ['persistence'],
  }),
  new Coach({
    name: 'Alvaro Castaño',
    nationality: 'Spain',
    effects: ['fullPressure'],
  }),
  new Coach({
    name: 'Lionel Ramos',
    nationality: 'Argentina',
    effects: ['argentoPride'],
  }),
  new Coach({
    name: 'Xavier Fontaine',
    nationality: 'France',
    effects: ['pepStyle'],
    cards: [InjuryRiskAction],
  }),
  new Coach({
    name: 'Rafael Cortez',
    nationality: 'Chile',
    effects: ['clinicalFinish'],
    cards: [InjuryRiskAction],
  }),
  new Coach({
    name: 'Yuki Nakamura',
    nationality: 'Japan',
    effects: ['randomBoost'],
    cards: [HeadsInTheCloudsAction],
  }),
  new Coach({
    name: 'Marc Dubois',
    nationality: 'Belgium',
    effects: ['goodCoaches'],
  }),
  new Coach({
    name: 'Sergio Rivera',
    nationality: 'Mexico',
    effects: ['gkStar'],
  }),
  new Coach({
    name: 'Diego "El Loco" Vargas',
    nationality: 'Argentina',
    effects: ['enragedRival'],
  }),
  new Coach({
    name: 'Fiona McTavish',
    nationality: 'Scotland',
    effects: ['teamFortuneFavor'],
  }),
  new Coach({
    name: 'Davide Franco',
    nationality: 'Italy',
    effects: ['teamIronWall'],
  }),
  new Coach({
    name: 'Jorge Vest',
    nationality: 'Portugal',
    effects: ['teamRuthless'],
    cards: [HardTackleAction],
  }),
  new Coach({
    name: 'Luis Mendez',
    nationality: 'Spain',
    effects: ['teamHighPress'],
  }),
  new Coach({
    name: 'Carlos Santos',
    nationality: 'Wales',
    effects: ['teamOmamori'],
  }),
  new Coach({
    name: 'Patrick O\'Hara',
    nationality: 'Ireland',
    effects: ['teamClover'],
    cards: [InspirationAction],
  }),
  new Coach({
    name: 'Johan van Dijk',
    nationality: 'Netherlands',
    effects: ['teamSpark'],
  }),
  new Coach({
    name: 'Physio Rodriguez',
    nationality: 'Spain',
    effects: ['teamWrench'],
  }),
  new Coach({
    name: 'Gianni Rossi',
    nationality: 'Italy',
    effects: ['teamFaceMelter'],
    cards: [RiskyTackleAction],
  }),
  new Coach({
    name: 'Carlo Ventura',
    nationality: 'Italy',
    effects: ['teamEruption'],
  }),
  new Coach({
    name: 'Carlos Dunga',
    nationality: 'Brazil',
    effects: ['teamDagger'],
    cards: [ExpertTackleAction],
  }),
  new Coach({
    name: 'Emilio "The Professor" Straka',
    nationality: 'Austria',
    effects: ['hotStreak'],
  }),
  new Coach({
    name: 'Kenny Blackwell',
    nationality: 'Scotland',
    effects: ['flyingStart'],
  }),
  new Coach({
    name: 'Chico Ramires',
    nationality: 'Portugal',
    effects: ['magicSpray'],
  }),
  new Coach({
    name: 'Salvatore Contini',
    nationality: 'Italy',
    effects: ['blindEye'],
  }),
  new Coach({
    name: 'Manfred Steinbrecher',
    nationality: 'Austria',
    effects: ['ironGlove'],
  }),
  new Coach({
    name: 'Petr Kadlec',
    nationality: 'Czechia',
    effects: ['squadDepth'],
  }),
  new Coach({
    name: 'Dragan Milojević',
    nationality: 'Serbia',
    effects: ['mindGames'],
  }),
  new Coach({
    name: 'Kenji Tanaka',
    nationality: 'Japan',
    effects: ['doubleTrainingCards'],
    cards: [InjuryRiskAction],
  }),
  new Coach({
    name: 'Luciana Ferreira',
    nationality: 'Brazil',
    effects: ['extraTrainingChoices'],
    cards: [HeadsInTheCloudsAction],
  }),
  new Coach({
    name: 'Hans-Peter Müller',
    nationality: 'Germany',
    effects: ['trainingSynergyPacks'],
  }),
  new Coach({
    name: 'Jurgen "Speed" van Hoorn',
    nationality: 'Netherlands',
    effects: ['highMobility'],
  }),
  new Coach({
    name: 'Lucia Ferreira',
    nationality: 'Portugal',
    effects: ['cardHold'],
  }),
  new Coach({
    name: 'Viktor Nyman',
    nationality: 'Sweden',
    effects: ['alwaysMoving'],
    cards: [HeadsInTheCloudsAction],
  }),
];
