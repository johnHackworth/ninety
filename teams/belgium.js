class Belgium extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[3, 0], [2, 1], [2, 3], [2, 5]],
    MF: [[4, 2], [5, 2], [4, 4]],
    FW: [[3, 6], [6, 3], [5, 4]],
  };

  constructor() {
    super({
      name: 'Belgium',
      level: 3,
      starPlayers: ['Kevin De Bruyne', 'Jérémy Doku', 'Romelu Lukaku', 'Thibaut Courtois', 'Youri Tielemans'],
      startingDeck: "attacking",
      extraActions: { eureka: 1 },
      coach: 'Rudi Garcia',
      artifacts: ["midfieldControl"],
      primaryColor: '#fdbf00',
      reserveColor: '#000000',
      shortsColor: '#000000',
      awayShortsColor: '#fdbf00',
      startingXI: ['Thibaut Courtois', 'Timothy Castagne', 'Brandon Mechele', 'Zeno Debast', 'Arthur Theate', 'Jérémy Doku', 'Amadou Onana', 'Kevin De Bruyne', 'Youri Tielemans', 'Romelu Lukaku', 'Leandro Trossard'],
      squad: [
        ['Thibaut Courtois', 34, 'GK', 'Belgium', 3, 8, 2, 1, 8, 3, 8, 3, 10],
        ['Zeno Debast', 22, 'DF', 'Belgium', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Arthur Theate', 26, 'DF', 'Belgium', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Brandon Mechele', 33, 'DF', 'Belgium', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Maxim De Cuyper', 25, 'DF', 'Belgium', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Axel Witsel', 37, 'MF', 'Belgium', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Kevin De Bruyne', 34, 'MF', 'Belgium', 8, 5, 5, 9, 10, 9, 9, 5, 1],
        ['Youri Tielemans', 29, 'MF', 'Belgium', 7, 6, 6, 8, 8, 8, 8, 5, 1],
        ['Romelu Lukaku', 33, 'FW', 'Belgium', 8, 4, 4, 9, 7, 7, 7, 9, 1],
        ['Leandro Trossard', 31, 'FW', 'Belgium', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Jérémy Doku', 24, 'FW', 'Belgium', 10, 4, 4, 7, 7, 9, 7, 3, 1],
        ['Senne Lammens', 23, 'GK', 'Belgium', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Mike Penders', 20, 'GK', 'Belgium', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Dodi Lukébakio', 28, 'FW', 'Belgium', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Thomas Meunier', 34, 'DF', 'Belgium', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Koni De Winter', 23, 'DF', 'Belgium', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Charles De Ketelaere', 25, 'FW', 'Belgium', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Joaquin Seys', 21, 'DF', 'Belgium', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Diego Moreira', 21, 'MF', 'Belgium', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Hans Vanaken', 33, 'MF', 'Belgium', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Timothy Castagne', 30, 'DF', 'Belgium', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Alexis Saelemaekers', 26, 'MF', 'Belgium', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Nicolas Raskin', 25, 'MF', 'Belgium', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Amadou Onana', 24, 'MF', 'Belgium', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Nathan Ngoy', 23, 'DF', 'Belgium', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Matias Fernandez-Pardo', 21, 'FW', 'Belgium', 7, 2, 2, 9, 4, 6, 4, 8, 1],
      ],
    });
  }
}
