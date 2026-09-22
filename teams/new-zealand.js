class NewZealand extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4], [4, 6]],
    FW: [[6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'New Zealand',
      level: 1,
      starPlayers: ['Chris Wood', 'Liberato Cacace'],
      startingDeck: "defensive",
      extraActions: { 'header-finish': 1, 'knockdown-finish': 1 },
      coach: 'Darren Bazeley',
      artifacts: ["aerialKings"],
      primaryColor: '#000000',
      reserveColor: '#ffffff',
      shortsColor: '#000000',
      awayShortsColor: '#ffffff',
      startingXI: ['Max Crocombe', 'Tim Payne', 'Tyler Bindon', 'Michael Boxall', 'Liberato Cacace', 'Joe Bell', 'Marko Stamenić', 'Sarpreet Singh', 'Elijah Just', 'Chris Wood', 'Ben Waine'],
      squad: [
        ['Max Crocombe', 32, 'GK', 'New Zealand', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Tim Payne', 32, 'DF', 'New Zealand', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Francis de Vries', 31, 'DF', 'New Zealand', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Tyler Bindon', 21, 'DF', 'New Zealand', 8, 8, 8, 5, 9, 10, 9, 8, 3],
        ['Michael Boxall', 37, 'DF', 'New Zealand', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Joe Bell', 27, 'MF', 'New Zealand', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Logan Rogerson', 28, 'FW', 'New Zealand', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Marko Stamenić', 24, 'MF', 'New Zealand', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Chris Wood', 34, 'FW', 'New Zealand', 6, 4, 4, 8, 6, 6, 7, 9, 1],
        ['Sarpreet Singh', 27, 'MF', 'New Zealand', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Elijah Just', 26, 'MF', 'New Zealand', 8, 10, 9, 9, 8, 8, 8, 8, 3],
        ['Alex Paulsen', 23, 'GK', 'New Zealand', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Liberato Cacace', 25, 'DF', 'New Zealand', 7, 7, 7, 4, 6, 6, 6, 5, 1],
        ['Alex Rufer', 29, 'MF', 'New Zealand', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Nando Pijnaker', 27, 'DF', 'New Zealand', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Finn Surman', 22, 'DF', 'New Zealand', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Kosta Barbarouses', 36, 'FW', 'New Zealand', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Ben Waine', 25, 'FW', 'New Zealand', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Ben Old', 23, 'MF', 'New Zealand', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Callum McCowatt', 27, 'MF', 'New Zealand', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Jesse Randall', 23, 'FW', 'New Zealand', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Michael Woud', 27, 'GK', 'New Zealand', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Ryan Thomas', 31, 'MF', 'New Zealand', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Callan Elliot', 26, 'DF', 'New Zealand', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Lachlan Bayliss', 23, 'MF', 'New Zealand', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Tommy Smith', 36, 'DF', 'New Zealand', 5, 6, 6, 3, 3, 2, 5, 6, 1],
      ],
    });
  }
}
