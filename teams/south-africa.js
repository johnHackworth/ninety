class SouthAfrica extends AbstractTeam {
  static formation = {
    'Ronwen Williams': [0, 3],
    'Mudau': [2, 0],
    'Mvala': [2, 2],
    'Xulu': [2, 4],
    'Modiba': [2, 6],
    'Mokoena': [4, 0],
    'Sithole': [4, 2],
    'Zwane': [4, 4],
    'Maswanganyi': [4, 6],
    'Tau': [6, 2],
    'Foster': [6, 4],
  };

  constructor() {
    super({
      name: 'South Africa',
      level: 0,
  starPlayers: ['Ronwen Williams', 'Tau'],
      startingDeck: "defensive",
      coach: 'Hugo Broos',
      primaryColor: '#ffb81c',
      reserveColor: '#007a4d',
      shortsColor: '#007a4d',
      awayShortsColor: '#ffffff',
      startingXI: ['Ronwen Williams', 'Mudau', 'Mvala', 'Xulu', 'Modiba', 'Mokoena', 'Sithole', 'Zwane', 'Maswanganyi', 'Tau', 'Foster'],
      squad: [
        ['Ronwen Williams', 34, 'GK', 'South Africa', 4, 7, 2, 1, 7, 3, 7, 3, 9],
        ['Mudau', 31, 'DF', 'South Africa', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Mvala', 31, 'DF', 'South Africa', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Xulu', 34, 'DF', 'South Africa', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Modiba', 31, 'DF', 'South Africa', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Mashego', 28, 'DF', 'South Africa', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Mokoena', 29, 'MF', 'South Africa', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Sithole', 27, 'MF', 'South Africa', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Zwane', 37, 'MF', 'South Africa', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Aubaas', 31, 'MF', 'South Africa', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Mbatha', 25, 'MF', 'South Africa', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Maswanganyi', 28, 'MF', 'South Africa', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Tau', 32, 'FW', 'South Africa', 8, 4, 4, 7, 7, 8, 7, 4, 1],
        ['Foster', 25, 'FW', 'South Africa', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Hlongwane', 26, 'FW', 'South Africa', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Rayners', 30, 'FW', 'South Africa', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Mokwana', 26, 'FW', 'South Africa', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Goss', 32, 'GK', 'South Africa', 1, 5, 1, 1, 5, 1, 4, 1, 6],
      ],
    });
  }
}
