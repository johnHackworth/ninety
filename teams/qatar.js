class Qatar extends AbstractTeam {
  static formation = {
    'Barsham': [0, 3],
    'Ro-Ro': [2, 0],
    'Bassam Al-Rawi': [2, 2],
    'Khoukhi': [2, 4],
    'Homam Ahmed': [2, 6],
    'Jassem Gaber': [4, 0],
    'Mohammed Waad': [4, 2],
    'Hazem Shehata': [4, 4],
    'Mostafa Meshaal': [4, 6],
    'Akram Afif': [6, 2],
    'Almoez Ali': [6, 4],
  };

  constructor() {
    super({
      name: 'Qatar',
      level: 0,
  starPlayers: ['Akram Afif', 'Almoez Ali'],
      startingDeck: "defensive",
      extraActions: { 'underdog-bite': 1 },
      coach: 'Julen Lopetegui',
      artifacts: [ 'minnowWill'],
      primaryColor: '#8c1d40',
      reserveColor: '#ffffff',
      shortsColor: '#8c1d40',
      awayShortsColor: '#ffffff',
      startingXI: ['Barsham', 'Ro-Ro', 'Bassam Al-Rawi', 'Khoukhi', 'Homam Ahmed', 'Jassem Gaber', 'Mohammed Waad', 'Hazem Shehata', 'Mostafa Meshaal', 'Akram Afif', 'Almoez Ali'],
      squad: [
        ['Barsham', 28, 'GK', 'Qatar', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Al-Sheeb', 36, 'GK', 'Qatar', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Ro-Ro', 36, 'DF', 'Qatar', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Bassam Al-Rawi', 29, 'DF', 'Qatar', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Khoukhi', 36, 'DF', 'Qatar', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Homam Ahmed', 27, 'DF', 'Qatar', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Tarek Salman', 29, 'DF', 'Qatar', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Jassem Gaber', 24, 'MF', 'Qatar', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Mohammed Waad', 27, 'MF', 'Qatar', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Hazem Shehata', 28, 'MF', 'Qatar', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Mostafa Meshaal', 25, 'MF', 'Qatar', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Ahmed Fatehi', 33, 'MF', 'Qatar', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Abdullah Al-Ahrak', 29, 'MF', 'Qatar', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Akram Afif', 30, 'FW', 'Qatar', 8, 4, 4, 8, 7, 9, 7, 5, 1],
        ['Almoez Ali', 30, 'FW', 'Qatar', 7, 4, 4, 8, 6, 7, 6, 6, 1],
        ['Hassan Al-Haydos', 36, 'FW', 'Qatar', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Ahmed Alaaeldin', 33, 'FW', 'Qatar', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Mohammed Muntari', 33, 'FW', 'Qatar', 5, 2, 1, 6, 5, 5, 4, 4, 1],
      ],
    });
  }
}
