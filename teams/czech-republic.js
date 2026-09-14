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
      startingDeck: "pressing",
      extraActions: {"gegenpressing":1},
      coach: 'Miroslav Koubek',
      artifacts: ["aerialThreat"],
      primaryColor: '#d7141a',
      reserveColor: '#11457e',
      shortsColor: '#11457e',
      awayShortsColor: '#ffffff',
      startingXI: ['Matěj Kovář', 'David Zima', 'Tomáš Holeš', 'Robin Hranáč', 'Vladimír Coufal', 'Vladimír Darida', 'Lukáš Červ', 'Lukáš Provod', 'Michal Sadílek', 'Adam Hložek', 'Patrik Schick'],
      squad: [
        ['Matěj Kovář', 26, 'GK', 'Czech Republic', 4, 10, 2, 1, 6, 2, 10, 7, 9],
        ['David Zima', 25, 'DF', 'Czech Republic', 9, 10, 10, 2, 5, 7, 10, 10, 3],
        ['Tomáš Holeš', 33, 'DF', 'Czech Republic', 10, 10, 10, 2, 8, 8, 9, 10, 1],
        ['Robin Hranáč', 26, 'DF', 'Czech Republic', 7, 8, 10, 2, 5, 5, 6, 7, 2],
        ['Vladimír Coufal', 33, 'DF', 'Czech Republic', 10, 10, 9, 5, 10, 9, 8, 8, 1],
        ['Štěpán Chaloupek', 23, 'DF', 'Czech Republic', 6, 8, 6, 3, 5, 4, 8, 7, 2],
        ['Ladislav Krejčí', 27, 'DF', 'Czech Republic', 9, 8, 9, 5, 10, 7, 6, 7, 2],
        ['Vladimír Darida', 35, 'MF', 'Czech Republic', 7, 4, 6, 8, 10, 10, 10, 8, 1],
        ['Adam Hložek', 23, 'FW', 'Czech Republic', 10, 3, 3, 10, 7, 10, 10, 6, 1],
        ['Patrik Schick', 30, 'FW', 'Czech Republic', 10, 4, 9, 10, 9, 10, 10, 10, 1],
        ['Jan Kuchta', 29, 'FW', 'Czech Republic', 10, 2, 7, 10, 7, 9, 9, 8, 1],
        ['Lukáš Červ', 25, 'MF', 'Czech Republic', 7, 4, 9, 5, 8, 10, 7, 7, 1],
        ['Mojmír Chytil', 27, 'FW', 'Czech Republic', 10, 5, 6, 10, 9, 10, 9, 8, 1],
        ['David Jurásek', 25, 'DF', 'Czech Republic', 6, 8, 8, 4, 7, 6, 7, 10, 1],
        ['Pavel Šulc', 25, 'FW', 'Czech Republic', 10, 4, 4, 9, 6, 8, 7, 6, 1],
        ['Jindřich Staněk', 30, 'GK', 'Czech Republic', 5, 7, 4, 1, 6, 2, 10, 8, 10],
        ['Lukáš Provod', 29, 'MF', 'Czech Republic', 10, 7, 7, 9, 9, 10, 8, 6, 1],
        ['Michal Sadílek', 27, 'MF', 'Czech Republic', 9, 5, 7, 9, 10, 8, 8, 7, 2],
        ['Tomáš Chorý', 31, 'FW', 'Czech Republic', 10, 3, 3, 10, 10, 10, 8, 10, 1],
        ['Jaroslav Zelený', 33, 'DF', 'Czech Republic', 9, 10, 8, 3, 7, 7, 10, 9, 2],
        ['David Douděra', 28, 'DF', 'Czech Republic', 8, 9, 6, 4, 5, 7, 10, 7, 1],
        ['Tomáš Souček', 31, 'MF', 'Czech Republic', 10, 6, 6, 9, 10, 8, 9, 8, 2],
        ['Lukáš Horníček', 23, 'GK', 'Czech Republic', 3, 7, 3, 1, 8, 3, 8, 7, 7],
        ['Alexandr Sojka', 23, 'MF', 'Czech Republic', 7, 6, 8, 7, 6, 6, 8, 5, 1],
        ['Hugo Sochůrek', 18, 'MF', 'Czech Republic', 9, 4, 6, 6, 7, 6, 8, 5, 1],
        ['Denis Višinský', 23, 'FW', 'Czech Republic', 9, 1, 4, 9, 8, 7, 7, 6, 1]
      ],
    });
  }
}

module.exports = CzechRepublic;