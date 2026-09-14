class Norway extends AbstractTeam {
  static formation = {
    'Ørjan Nyland': [0, 3],
    'Kristoffer Ajer': [2, 0],
    'Leo Østigård': [2, 2],
    'David Møller Wolfe': [2, 4],
    'Fredrik André Bjørkan': [2, 6],
    'Morten Thorsby': [4, 0],
    'Patrick Berg': [4, 2],
    'Sander Berge': [4, 4],
    'Martin Ødegaard': [4, 6],
    'Alexander Sørloth': [6, 2],
    'Erling Haaland': [6, 4],
  };

  constructor() {
    super({
      name: 'Norway',
      level: 2,
      starPlayers: ['Erling Haaland', 'Alexander Sørloth', 'Oscar Bobb'],
      startingDeck: "pressing",
      extraActions: {"wing-play":1},
      coach: 'Ståle Solbakken',
      artifacts: ["engine"],
      primaryColor: '#ef2b2d',
      reserveColor: '#ffffff',
      shortsColor: '#00285e',
      awayShortsColor: '#ffffff',
      startingXI: ['Ørjan Nyland', 'Kristoffer Ajer', 'Leo Østigård', 'David Møller Wolfe', 'Fredrik André Bjørkan', 'Morten Thorsby', 'Patrick Berg', 'Sander Berge', 'Martin Ødegaard', 'Alexander Sørloth', 'Erling Haaland'],
      squad: [
        ['Ørjan Nyland', 35, 'GK', 'Norway', 6, 9, 2, 2, 9, 4, 8, 4, 10],
        ['Morten Thorsby', 30, 'MF', 'Norway', 10, 9, 8, 8, 10, 8, 10, 8, 1],
        ['Kristoffer Ajer', 28, 'DF', 'Norway', 9, 10, 8, 4, 10, 10, 10, 8, 3],
        ['Leo Østigård', 26, 'DF', 'Norway', 8, 10, 8, 5, 8, 6, 10, 8, 2],
        ['David Møller Wolfe', 24, 'DF', 'Norway', 7, 9, 9, 2, 8, 5, 6, 8, 1],
        ['Patrick Berg', 28, 'MF', 'Norway', 10, 9, 10, 9, 10, 10, 9, 5, 1],
        ['Alexander Sørloth', 30, 'FW', 'Norway', 10, 4, 9, 10, 9, 10, 10, 10, 1],
        ['Sander Berge', 28, 'MF', 'Norway', 10, 10, 8, 8, 10, 10, 10, 7, 1],
        ['Erling Haaland', 25, 'FW', 'Norway', 10, 6, 7, 10, 10, 10, 10, 10, 2],
        ['Martin Ødegaard', 27, 'MF', 'Norway', 8, 5, 10, 5, 10, 10, 8, 8, 1],
        ['Jørgen Strand Larsen', 26, 'FW', 'Norway', 10, 5, 5, 10, 10, 10, 10, 9, 1],
        ['Sander Tangvik', 23, 'GK', 'Norway', 4, 5, 1, 2, 5, 1, 7, 6, 8],
        ['Egil Selvik', 28, 'GK', 'Norway', 5, 7, 3, 1, 5, 1, 8, 5, 8],
        ['Fredrik Aursnes', 30, 'MF', 'Norway', 10, 7, 10, 5, 10, 10, 10, 5, 2],
        ['Fredrik André Bjørkan', 27, 'DF', 'Norway', 10, 9, 9, 2, 7, 8, 7, 9, 2],
        ['Marcus Holmgren Pedersen', 25, 'DF', 'Norway', 7, 10, 10, 2, 7, 4, 6, 9, 1],
        ['Torbjørn Heggem', 27, 'DF', 'Norway', 7, 8, 8, 3, 8, 4, 5, 7, 1],
        ['Kristian Thorstvedt', 27, 'MF', 'Norway', 8, 9, 9, 7, 10, 8, 8, 7, 2],
        ['Thelo Aasgaard', 24, 'MF', 'Norway', 6, 4, 8, 7, 9, 10, 7, 7, 1],
        ['Antonio Nusa', 21, 'MF', 'Norway', 9, 6, 9, 5, 10, 10, 10, 5, 1],
        ['Andreas Schjelderup', 22, 'MF', 'Norway', 7, 4, 10, 7, 10, 10, 10, 9, 1],
        ['Oscar Bobb', 22, 'MF', 'Norway', 10, 7, 9, 9, 10, 9, 9, 10, 1],
        ['Jens Petter Hauge', 26, 'MF', 'Norway', 6, 6, 7, 5, 10, 9, 9, 7, 2],
        ['Sondre Langås', 25, 'DF', 'Norway', 7, 7, 8, 4, 7, 5, 6, 7, 1],
        ['Henrik Falchener', 23, 'DF', 'Norway', 8, 9, 8, 3, 4, 6, 7, 9, 1],
        ['Julian Ryerson', 28, 'DF', 'Norway', 8, 10, 9, 2, 6, 9, 10, 10, 2]
      ],
    });
  }
}

module.exports = Norway;