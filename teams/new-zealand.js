class NewZealand extends AbstractTeam {
  static formation = {
    'Max Crocombe': [0, 3],
    'Tim Payne': [2, 0],
    'Tyler Bindon': [2, 2],
    'Michael Boxall': [2, 4],
    'Liberato Cacace': [2, 6],
    'Joe Bell': [4, 0],
    'Marko Stamenić': [4, 2],
    'Matt Garbett': [4, 4],
    'Elijah Just': [4, 6],
    'Chris Wood': [6, 2],
    'Ben Waine': [6, 4],
  };

  constructor() {
    super({
      name: 'New Zealand',
      level: 0,
  starPlayers: ['Chris Wood', 'Liberato Cacace'],
      startingDeck: "defensive",
      extraActions: { 'header-finish': 1, 'knockdown-finish': 1 },
      coach: 'Darren Bazeley',
      artifacts: [ 'aerialKings'],
      primaryColor: '#ffffff',
      reserveColor: '#000000',
      shortsColor: '#ffffff',
      awayShortsColor: '#ffffff',
      startingXI: ['Max Crocombe', 'Tim Payne', 'Tyler Bindon', 'Michael Boxall', 'Liberato Cacace', 'Joe Bell', 'Marko Stamenić', 'Matt Garbett', 'Elijah Just', 'Chris Wood', 'Ben Waine'],
      squad: [
        ['Max Crocombe', 33, 'GK', 'New Zealand', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Alex Paulsen', 24, 'GK', 'New Zealand', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Tim Payne', 32, 'DF', 'New Zealand', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Liberato Cacace', 26, 'DF', 'New Zealand', 7, 7, 7, 4, 6, 6, 6, 5, 1],
        ['Tyler Bindon', 21, 'DF', 'New Zealand', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Michael Boxall', 38, 'DF', 'New Zealand', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Finn Surman', 22, 'DF', 'New Zealand', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Joe Bell', 27, 'MF', 'New Zealand', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Marko Stamenić', 24, 'MF', 'New Zealand', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Matt Garbett', 24, 'MF', 'New Zealand', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Ryan Thomas', 32, 'MF', 'New Zealand', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Ben Old', 24, 'MF', 'New Zealand', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Elijah Just', 26, 'MF', 'New Zealand', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Chris Wood', 34, 'FW', 'New Zealand', 6, 4, 4, 8, 6, 6, 7, 9, 1],
        ['Ben Waine', 25, 'FW', 'New Zealand', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Kosta Barbarouses', 36, 'FW', 'New Zealand', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Callum McCowatt', 27, 'FW', 'New Zealand', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Max Mata', 26, 'FW', 'New Zealand', 5, 2, 1, 6, 5, 5, 4, 4, 1],
      ],
    });
  }
}
