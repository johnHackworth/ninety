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
      startingDeck: "attacking",
      extraActions: { eureka: 1, "touch-of-magic": 1, 'nordic-hammer': 1, 'growing-menace': 1 },
      coach: 'Ståle Solbakken',
      primaryColor: '#ef2b2d',
      reserveColor: '#ffffff',
      shortsColor: '#00285e',
      awayShortsColor: '#ffffff',
      startingXI: ['Ørjan Nyland', 'Kristoffer Ajer', 'Leo Østigård', 'David Møller Wolfe', 'Fredrik André Bjørkan', 'Morten Thorsby', 'Patrick Berg', 'Sander Berge', 'Martin Ødegaard', 'Alexander Sørloth', 'Erling Haaland'],
      squad: [
        ['Ørjan Nyland', 35, 'GK', 'Norway', 2, 4, 5, 2, 4, 1, 4, 6, 7]
        ['Morten Thorsby', 30, 'MF', 'Norway', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Kristoffer Ajer', 28, 'DF', 'Norway', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Leo Østigård', 26, 'DF', 'Norway', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['David Møller Wolfe', 24, 'DF', 'Norway', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Patrick Berg', 28, 'MF', 'Norway', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Alexander Sørloth', 30, 'FW', 'Norway', 8, 4, 9, 8, 9, 8, 10, 8, 1]
        ['Sander Berge', 28, 'MF', 'Norway', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Erling Haaland', 25, 'FW', 'Norway', 8, 6, 7, 8, 10, 8, 9, 9, 2]
        ['Martin Ødegaard', 27, 'MF', 'Norway', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Jørgen Strand Larsen', 26, 'FW', 'Norway', 6, 2, 2, 8, 4, 5, 4, 7, 1]
        ['Sander Tangvik', 23, 'GK', 'Norway', 2, 4, 5, 2, 4, 1, 4, 6, 7]
        ['Egil Selvik', 28, 'GK', 'Norway', 2, 4, 5, 2, 4, 1, 4, 6, 7]
        ['Fredrik Aursnes', 30, 'MF', 'Norway', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Fredrik André Bjørkan', 27, 'DF', 'Norway', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Marcus Holmgren Pedersen', 25, 'DF', 'Norway', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Torbjørn Heggem', 27, 'DF', 'Norway', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Kristian Thorstvedt', 27, 'MF', 'Norway', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Thelo Aasgaard', 24, 'MF', 'Norway', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Antonio Nusa', 21, 'MF', 'Norway', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Andreas Schjelderup', 22, 'MF', 'Norway', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Oscar Bobb', 22, 'MF', 'Norway', 8, 7, 9, 9, 8, 8, 8, 10, 1]
        ['Jens Petter Hauge', 26, 'MF', 'Norway', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Sondre Langås', 25, 'DF', 'Norway', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Henrik Falchener', 23, 'DF', 'Norway', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Julian Ryerson', 28, 'DF', 'Norway', 6, 7, 7, 3, 3, 2, 5, 7, 1]
      ],
    });
  }
}
