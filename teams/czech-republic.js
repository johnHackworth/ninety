class CzechRepublic extends AbstractTeam {
  static formation = {
    'Matěj Kovář': [0, 3],
    'David Zima': [2, 0],
    'Tomáš Holeš': [2, 2],
    'Robin Hranáč': [2, 4],
    'Vladimír Coufal': [2, 6],
    'Vladimír Darida': [4, 0],
    'Lukáš Červ': [4, 2],
    'Lukáš Provod': [4, 4],
    'Michal Sadílek': [4, 6],
    'Adam Hložek': [6, 2],
    'Patrik Schick': [6, 4],
  };

  constructor() {
    super({
      name: 'Czech Republic',
      level: 1,
      starPlayers: ['Patrik Schick', 'Tomáš Souček', 'Vladimír Coufal', 'Mojmír Chytil', 'Tomáš Holeš'],
      startingDeck: "technical",
      extraActions: { 'header-finish': 1, 'knockdown-finish': 1 },
      coach: 'Miroslav Koubek',
      artifacts: ["aerialKings"],
      primaryColor: '#d7141a',
      reserveColor: '#11457e',
      shortsColor: '#11457e',
      awayShortsColor: '#ffffff',
      startingXI: ['Matěj Kovář', 'David Zima', 'Tomáš Holeš', 'Robin Hranáč', 'Vladimír Coufal', 'Vladimír Darida', 'Lukáš Červ', 'Lukáš Provod', 'Michal Sadílek', 'Adam Hložek', 'Patrik Schick'],
      squad: [
        ['Matěj Kovář', 26, 'GK', 'Czech Republic', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['David Zima', 25, 'DF', 'Czech Republic', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Tomáš Holeš', 33, 'DF', 'Czech Republic', 9, 8, 8, 2, 8, 8, 9, 10, 1]
        ['Robin Hranáč', 26, 'DF', 'Czech Republic', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Vladimír Coufal', 33, 'DF', 'Czech Republic', 9, 8, 8, 5, 10, 9, 8, 8, 1]
        ['Štěpán Chaloupek', 23, 'DF', 'Czech Republic', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Ladislav Krejčí', 27, 'DF', 'Czech Republic', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Vladimír Darida', 35, 'MF', 'Czech Republic', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Adam Hložek', 23, 'FW', 'Czech Republic', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Patrik Schick', 30, 'FW', 'Czech Republic', 8, 4, 9, 8, 9, 8, 10, 8, 1]
        ['Jan Kuchta', 29, 'FW', 'Czech Republic', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Lukáš Červ', 25, 'MF', 'Czech Republic', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Mojmír Chytil', 27, 'FW', 'Czech Republic', 8, 5, 6, 8, 9, 10, 9, 8, 1]
        ['David Jurásek', 25, 'DF', 'Czech Republic', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Pavel Šulc', 25, 'FW', 'Czech Republic', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Jindřich Staněk', 30, 'GK', 'Czech Republic', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Lukáš Provod', 29, 'MF', 'Czech Republic', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Michal Sadílek', 27, 'MF', 'Czech Republic', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Tomáš Chorý', 31, 'FW', 'Czech Republic', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Jaroslav Zelený', 33, 'DF', 'Czech Republic', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['David Douděra', 28, 'DF', 'Czech Republic', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Tomáš Souček', 31, 'MF', 'Czech Republic', 10, 6, 6, 9, 8, 8, 9, 8, 2]
        ['Lukáš Horníček', 23, 'GK', 'Czech Republic', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Alexandr Sojka', 23, 'MF', 'Czech Republic', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Hugo Sochůrek', 18, 'MF', 'Czech Republic', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Denis Višinský', 23, 'FW', 'Czech Republic', 5, 2, 2, 7, 4, 4, 4, 6, 1]
      ],
    });
  }
}
