class Czechia extends AbstractTeam {
  static formation = {
    'Jindřich Staněk': [0, 3],
    'Vladimír Coufal': [2, 0],
    'Ladislav Krejčí': [2, 2],
    'Robin Hranáč': [2, 4],
    'Martin Vitík': [2, 6],
    'Tomáš Souček': [4, 0],
    'Lukáš Provod': [4, 2],
    'Antonín Barák': [4, 4],
    'Ondřej Lingr': [4, 6],
    'Patrik Schick': [6, 2],
    'Adam Hložek': [6, 4],
  };

  constructor() {
    super({
      name: 'Czechia',
      level: 0,
  starPlayers: ['Patrik Schick', 'Tomáš Souček'],
      startingDeck: "technical",
      extraActions: { 'header-finish': 1, 'knockdown-finish': 1 },
      coach: 'Ivan Hašek',
      artifacts: [ 'aerialKings'],
      primaryColor: '#d7141a',
      reserveColor: '#ffffff',
      shortsColor: '#d7141a',
      awayShortsColor: '#ffffff',
      startingXI: ['Jindřich Staněk', 'Vladimír Coufal', 'Ladislav Krejčí', 'Robin Hranáč', 'Martin Vitík', 'Tomáš Souček', 'Lukáš Provod', 'Antonín Barák', 'Ondřej Lingr', 'Patrik Schick', 'Adam Hložek'],
      squad: [
        ['Jindřich Staněk', 30, 'GK', 'Czechia', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Vladimír Coufal', 34, 'DF', 'Czechia', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Ladislav Krejčí', 27, 'DF', 'Czechia', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Robin Hranáč', 26, 'DF', 'Czechia', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Martin Vitík', 23, 'DF', 'Czechia', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Tomáš Souček', 31, 'MF', 'Czechia', 6, 7, 7, 7, 7, 6, 8, 8, 1],
        ['Lukáš Provod', 30, 'MF', 'Czechia', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Antonín Barák', 32, 'MF', 'Czechia', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Ondřej Lingr', 28, 'MF', 'Czechia', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Patrik Schick', 30, 'FW', 'Czechia', 7, 4, 4, 9, 7, 7, 7, 8, 1],
        ['Adam Hložek', 24, 'FW', 'Czechia', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Matěj Kovář', 26, 'GK', 'Czechia', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['David Zima', 26, 'DF', 'Czechia', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Pavel Šulc', 26, 'MF', 'Czechia', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Michal Sadílek', 27, 'MF', 'Czechia', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Jan Kuchta', 29, 'FW', 'Czechia', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Mojmír Chytil', 27, 'FW', 'Czechia', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Tomáš Chorý', 31, 'FW', 'Czechia', 5, 2, 1, 6, 5, 5, 4, 4, 1],
      ],
    });
  }
}
