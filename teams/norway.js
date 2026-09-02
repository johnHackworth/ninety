class Norway extends AbstractTeam {
  static formation = {
    'Nyland': [0, 3],
    'Holmgren Pedersen': [2, 0],
    'Østigård': [2, 2],
    'Strandberg': [2, 4],
    'Ryerson': [2, 6],
    'Berge': [4, 2],
    'Thorsby': [4, 4],
    'Nusa': [5, 0],
    'Ødegaard': [5, 3],
    'Sørloth': [5, 6],
    'Haaland': [6, 3],
  };

  constructor() {
    super({
      name: 'Norway',
      level: 2,
  starPlayers: ['Haaland', 'Ødegaard', 'Sørloth', 'Nusa'],
      startingDeck: "attacking",
      extraActions: { eureka: 1, "touch-of-magic": 1, 'nordic-hammer': 1, 'growing-menace': 1 },
      coach: 'Ståle Solbakken',
      primaryColor: '#d81e05',
      reserveColor: '#ffffff',
      shortsColor: '#ffffff',
      awayShortsColor: '#000000',
      startingXI: ['Nyland', 'Holmgren Pedersen', 'Østigård', 'Strandberg', 'Ryerson', 'Nusa', 'Berge', 'Ødegaard', 'Thorsby', 'Haaland', 'Sørloth'],
      squad: [
        ['Nyland', 35, 'GK', 'Norway', 3, 7, 2, 1, 7, 3, 6, 3, 8],
        ['Holmgren Pedersen', 26, 'DF', 'Norway', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Østigård', 26, 'DF', 'Norway', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Strandberg', 36, 'DF', 'Norway', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Ryerson', 28, 'DF', 'Norway', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Nusa', 21, 'MF', 'Norway', 9, 4, 4, 7, 7, 8, 6, 4, 1],
        ['Berge', 28, 'MF', 'Norway', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Ødegaard', 27, 'MF', 'Norway', 7, 5, 5, 8, 10, 9, 9, 4, 1],
        ['Thorsby', 30, 'MF', 'Norway', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Haaland', 25, 'FW', 'Norway', 9, 4, 4, 10, 6, 7, 7, 10, 1],
        ['Sørloth', 30, 'FW', 'Norway', 8, 4, 4, 8, 6, 7, 7, 9, 1],
        ['Selvik', 29, 'GK', 'Norway', 3, 7, 2, 1, 7, 3, 6, 3, 8],
        ['Ajer', 28, 'DF', 'Norway', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Aursnes', 30, 'MF', 'Norway', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Thorstvedt', 27, 'MF', 'Norway', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Strand Larsen', 26, 'FW', 'Norway', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Solbakken', 27, 'FW', 'Norway', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Berg', 28, 'MF', 'Norway', 6, 6, 6, 6, 8, 7, 7, 5, 1],
      ],
    });
  }
}
