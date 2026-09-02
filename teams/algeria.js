class Algeria extends AbstractTeam {
  static formation = {
    'Mandrea': [0, 3],
    'Atal': [2, 0],
    'Mandi': [2, 2],
    'Tougai': [2, 4],
    'Aït-Nouri': [2, 6],
    'Bennacer': [4, 0],
    'Zerrouki': [4, 2],
    'Aouar': [4, 4],
    'Mahrez': [4, 6],
    'Amoura': [6, 2],
    'Gouiri': [6, 4],
  };

  constructor() {
    super({
      name: 'Algeria',
      level: 1,
  starPlayers: ['Mahrez', 'Bennacer', 'Amoura'],
      startingDeck: "counter",
      coach: 'Vladimir Petković',
      primaryColor: '#006233',
      reserveColor: '#ffffff',
      shortsColor: '#ffffff',
      awayShortsColor: '#006233',
      startingXI: ['Mandrea', 'Atal', 'Mandi', 'Tougai', 'Aït-Nouri', 'Bennacer', 'Zerrouki', 'Aouar', 'Mahrez', 'Amoura', 'Gouiri'],
      squad: [
        ['Mandrea', 29, 'GK', 'Algeria', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Atal', 30, 'DF', 'Algeria', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Mandi', 34, 'DF', 'Algeria', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Tougai', 26, 'DF', 'Algeria', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Aït-Nouri', 25, 'DF', 'Algeria', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Bensebaini', 31, 'DF', 'Algeria', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Bennacer', 28, 'MF', 'Algeria', 7, 7, 7, 5, 8, 7, 8, 5, 1],
        ['Zerrouki', 28, 'MF', 'Algeria', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Aouar', 28, 'MF', 'Algeria', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Bentaleb', 31, 'MF', 'Algeria', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Mahrez', 35, 'MF', 'Algeria', 8, 4, 4, 8, 8, 9, 8, 4, 1],
        ['Feghouli', 36, 'MF', 'Algeria', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Amoura', 26, 'FW', 'Algeria', 9, 4, 4, 8, 7, 8, 7, 6, 1],
        ['Gouiri', 26, 'FW', 'Algeria', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Slimani', 38, 'FW', 'Algeria', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Bounedjah', 34, 'FW', 'Algeria', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Brahimi', 36, 'FW', 'Algeria', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Zeghba', 35, 'GK', 'Algeria', 2, 6, 1, 1, 6, 2, 5, 2, 7],
      ],
    });
  }
}
