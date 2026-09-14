class Belgium extends AbstractTeam {
  static formation = {
    'Thibaut Courtois': [0, 3],
    'Zeno Debast': [2, 0],
    'Arthur Theate': [2, 2],
    'Brandon Mechele': [2, 4],
    'Maxim De Cuyper': [2, 6],
    'Axel Witsel': [4, 0],
    'Kevin De Bruyne': [4, 2],
    'Youri Tielemans': [4, 4],
    'Diego Moreira': [4, 6],
    'Romelu Lukaku': [6, 2],
    'Leandro Trossard': [6, 4],
  };

  constructor() {
    super({
      name: 'Belgium',
      level: 3,
      starPlayers: ['Romelu Lukaku', 'Kevin De Bruyne', 'Youri Tielemans'],
      startingDeck: "balanced",
      extraActions: {"ouch":1},
      coach: 'Rudi Garcia',
      artifacts: ["aerialThreat"],
      primaryColor: '#fdbf00',
      reserveColor: '#000000',
      shortsColor: '#000000',
      awayShortsColor: '#fdbf00',
      startingXI: ['Thibaut Courtois', 'Zeno Debast', 'Arthur Theate', 'Brandon Mechele', 'Maxim De Cuyper', 'Axel Witsel', 'Kevin De Bruyne', 'Youri Tielemans', 'Diego Moreira', 'Romelu Lukaku', 'Leandro Trossard'],
      squad: [
        ['Thibaut Courtois', 34, 'GK', 'Belgium', 6, 8, 2, 1, 7, 1, 10, 7, 10],
        ['Zeno Debast', 22, 'DF', 'Belgium', 8, 10, 9, 3, 9, 10, 7, 10, 1],
        ['Arthur Theate', 26, 'DF', 'Belgium', 10, 10, 10, 2, 7, 7, 6, 10, 3],
        ['Brandon Mechele', 33, 'DF', 'Belgium', 5, 9, 9, 4, 5, 4, 8, 10, 1],
        ['Maxim De Cuyper', 25, 'DF', 'Belgium', 9, 7, 9, 4, 10, 4, 10, 7, 1],
        ['Axel Witsel', 37, 'MF', 'Belgium', 10, 6, 8, 6, 10, 9, 8, 8, 2],
        ['Kevin De Bruyne', 34, 'MF', 'Belgium', 10, 9, 9, 6, 10, 10, 8, 9, 1],
        ['Youri Tielemans', 29, 'MF', 'Belgium', 9, 10, 8, 8, 10, 10, 9, 5, 2],
        ['Romelu Lukaku', 33, 'FW', 'Belgium', 10, 5, 8, 10, 9, 10, 8, 10, 1],
        ['Leandro Trossard', 31, 'FW', 'Belgium', 10, 3, 8, 10, 10, 10, 10, 10, 1],
        ['Jérémy Doku', 24, 'FW', 'Belgium', 10, 4, 8, 10, 7, 10, 10, 10, 2],
        ['Senne Lammens', 23, 'GK', 'Belgium', 3, 8, 2, 1, 5, 2, 7, 6, 7],
        ['Mike Penders', 20, 'GK', 'Belgium', 2, 8, 2, 1, 5, 3, 7, 6, 10],
        ['Dodi Lukébakio', 28, 'FW', 'Belgium', 10, 3, 6, 10, 10, 10, 7, 10, 1],
        ['Thomas Meunier', 34, 'DF', 'Belgium', 10, 8, 10, 4, 9, 7, 8, 9, 2],
        ['Koni De Winter', 23, 'DF', 'Belgium', 7, 8, 7, 2, 6, 6, 7, 9, 1],
        ['Charles De Ketelaere', 25, 'FW', 'Belgium', 10, 6, 4, 10, 8, 10, 8, 8, 1],
        ['Joaquin Seys', 21, 'DF', 'Belgium', 6, 8, 7, 3, 6, 8, 7, 9, 2],
        ['Diego Moreira', 21, 'MF', 'Belgium', 10, 7, 5, 6, 9, 6, 8, 8, 2],
        ['Hans Vanaken', 33, 'MF', 'Belgium', 10, 8, 9, 5, 10, 10, 10, 9, 3],
        ['Timothy Castagne', 30, 'DF', 'Belgium', 10, 9, 10, 6, 10, 10, 8, 10, 1],
        ['Alexis Saelemaekers', 26, 'MF', 'Belgium', 9, 9, 6, 4, 10, 9, 10, 8, 2],
        ['Nicolas Raskin', 25, 'MF', 'Belgium', 7, 8, 6, 5, 8, 9, 6, 6, 2],
        ['Amadou Onana', 24, 'MF', 'Belgium', 8, 6, 10, 5, 10, 7, 10, 8, 1],
        ['Nathan Ngoy', 23, 'DF', 'Belgium', 6, 8, 7, 3, 8, 4, 6, 6, 1],
        ['Matias Fernandez-Pardo', 21, 'FW', 'Belgium', 7, 2, 3, 9, 6, 10, 7, 6, 1]
      ],
    });
  }
}

module.exports = Belgium;