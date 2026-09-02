class Tunisia extends AbstractTeam {
  static formation = {
    'Dahmen': [0, 3],
    'Talbi': [2, 0],
    'Meriah': [2, 2],
    'Bronn': [2, 4],
    'Dräger': [2, 6],
    'Skhiri': [4, 0],
    'Laidouni': [4, 2],
    'Mejbri': [4, 4],
    'Ben Romdhane': [4, 6],
    'Msakni': [6, 2],
    'Khenissi': [6, 4],
  };

  constructor() {
    super({
      name: 'Tunisia',
      level: 0,
  starPlayers: ['Msakni', 'Skhiri'],
      startingDeck: "defensive",
      coach: 'Sami Trabelsi',
      primaryColor: '#e70013',
      reserveColor: '#ffffff',
      shortsColor: '#ffffff',
      awayShortsColor: '#e70013',
      startingXI: ['Dahmen', 'Talbi', 'Meriah', 'Bronn', 'Dräger', 'Skhiri', 'Laidouni', 'Mejbri', 'Ben Romdhane', 'Msakni', 'Khenissi'],
      squad: [
        ['Dahmen', 29, 'GK', 'Tunisia', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Talbi', 28, 'DF', 'Tunisia', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Meriah', 33, 'DF', 'Tunisia', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Bronn', 31, 'DF', 'Tunisia', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Dräger', 30, 'DF', 'Tunisia', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Abdi', 32, 'DF', 'Tunisia', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Skhiri', 31, 'MF', 'Tunisia', 7, 7, 8, 5, 7, 6, 7, 6, 1],
        ['Laidouni', 29, 'MF', 'Tunisia', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Mejbri', 23, 'MF', 'Tunisia', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Ben Romdhane', 26, 'MF', 'Tunisia', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Ben Slimane', 25, 'MF', 'Tunisia', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Rafia', 27, 'MF', 'Tunisia', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Msakni', 35, 'FW', 'Tunisia', 8, 4, 4, 8, 7, 8, 7, 4, 1],
        ['Jaziri', 33, 'FW', 'Tunisia', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Khenissi', 34, 'FW', 'Tunisia', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Sliti', 34, 'FW', 'Tunisia', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Achouri', 27, 'FW', 'Tunisia', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Ben Saïd', 31, 'GK', 'Tunisia', 1, 5, 1, 1, 5, 1, 4, 1, 6],
      ],
    });
  }
}
