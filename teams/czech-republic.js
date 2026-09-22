class CzechRepublic extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4], [4, 6]],
    FW: [[6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Czech Republic',
      level: 1,
      starPlayers: ['Patrik Schick', 'Tomáš Souček'],
      startingDeck: "technical",
      extraActions: { 'header-finish': 1, 'knockdown-finish': 1 },
      coach: 'Miroslav Koubek',
      artifacts: ["aerialKings"],
      primaryColor: '#d7141a',
      reserveColor: '#11457e',
      shortsColor: '#11457e',
      awayShortsColor: '#ffffff',
      startingXI: ['Jindřich Staněk', 'Vladimír Coufal', 'Ladislav Krejčí', 'Robin Hranáč', 'Tomáš Holeš', 'Tomáš Souček', 'Lukáš Provod', 'Vladimír Darida', 'Lukáš Červ', 'Patrik Schick', 'Adam Hložek'],
      squad: [
        ['Matěj Kovář', 26, 'GK', 'Czech Republic', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['David Zima', 25, 'DF', 'Czech Republic', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Tomáš Holeš', 33, 'DF', 'Czech Republic', 9, 8, 8, 2, 8, 8, 9, 10, 1],
        ['Robin Hranáč', 26, 'DF', 'Czech Republic', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Vladimír Coufal', 33, 'DF', 'Czech Republic', 9, 8, 8, 5, 10, 9, 8, 8, 1],
        ['Štěpán Chaloupek', 23, 'DF', 'Czech Republic', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Ladislav Krejčí', 27, 'DF', 'Czech Republic', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Vladimír Darida', 35, 'MF', 'Czech Republic', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Adam Hložek', 23, 'FW', 'Czech Republic', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Patrik Schick', 30, 'FW', 'Czech Republic', 7, 4, 4, 9, 7, 7, 7, 8, 1],
        ['Jan Kuchta', 29, 'FW', 'Czech Republic', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Lukáš Červ', 25, 'MF', 'Czech Republic', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Mojmír Chytil', 27, 'FW', 'Czech Republic', 8, 5, 6, 8, 9, 10, 9, 8, 1],
        ['David Jurásek', 25, 'DF', 'Czech Republic', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Pavel Šulc', 25, 'FW', 'Czech Republic', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Jindřich Staněk', 30, 'GK', 'Czech Republic', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Lukáš Provod', 29, 'MF', 'Czech Republic', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Michal Sadílek', 27, 'MF', 'Czech Republic', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Tomáš Chorý', 31, 'FW', 'Czech Republic', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Jaroslav Zelený', 33, 'DF', 'Czech Republic', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['David Douděra', 28, 'DF', 'Czech Republic', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Tomáš Souček', 31, 'MF', 'Czech Republic', 6, 7, 7, 7, 7, 6, 8, 8, 1],
        ['Lukáš Horníček', 23, 'GK', 'Czech Republic', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Alexandr Sojka', 23, 'MF', 'Czech Republic', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Hugo Sochůrek', 18, 'MF', 'Czech Republic', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Denis Višinský', 23, 'FW', 'Czech Republic', 5, 2, 2, 7, 4, 4, 4, 6, 1],
      ],
    });
  }
}
