class Ecuador extends AbstractTeam {
  static formation = {
    'Moisés Ramírez': [0, 3],
    'Preciado': [2, 0],
    'Félix Torres': [2, 2],
    'Pacho': [2, 4],
    'Estupiñán': [2, 6],
    'Caicedo': [4, 0],
    'Gruezo': [4, 2],
    'Kendry Páez': [4, 4],
    'Sarmiento': [4, 6],
    'Enner Valencia': [6, 2],
    'Plata': [6, 4],
  };

  constructor() {
    super({
      name: 'Ecuador',
      level: 1,
  starPlayers: ['Caicedo', 'Kendry Páez', 'Enner Valencia'],
      startingDeck: "defensive",
      extraActions: { eureka: 1 },
      coach: 'Sebastián Beccacece',
      primaryColor: '#ffdd00',
      reserveColor: '#0033a0',
      shortsColor: '#0033a0',
      awayShortsColor: '#0033a0',
      startingXI: ['Moisés Ramírez', 'Preciado', 'Félix Torres', 'Pacho', 'Estupiñán', 'Caicedo', 'Gruezo', 'Kendry Páez', 'Sarmiento', 'Enner Valencia', 'Plata'],
      squad: [
        ['Moisés Ramírez', 26, 'GK', 'Ecuador', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Galíndez', 39, 'GK', 'Ecuador', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Preciado', 28, 'DF', 'Ecuador', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Félix Torres', 29, 'DF', 'Ecuador', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Pacho', 24, 'DF', 'Ecuador', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Estupiñán', 28, 'DF', 'Ecuador', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Hincapié', 24, 'DF', 'Ecuador', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Caicedo', 24, 'MF', 'Ecuador', 7, 8, 8, 6, 8, 8, 8, 6, 1],
        ['Gruezo', 31, 'MF', 'Ecuador', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Kendry Páez', 19, 'MF', 'Ecuador', 8, 4, 4, 8, 8, 9, 8, 4, 1],
        ['Sarmiento', 24, 'MF', 'Ecuador', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Alan Franco', 27, 'MF', 'Ecuador', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Zambrano', 22, 'MF', 'Ecuador', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Enner Valencia', 36, 'FW', 'Ecuador', 7, 4, 4, 8, 6, 7, 7, 8, 1],
        ['Plata', 25, 'FW', 'Ecuador', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Kevin Rodríguez', 26, 'FW', 'Ecuador', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Ángel Mena', 38, 'FW', 'Ecuador', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Allen Obando', 20, 'FW', 'Ecuador', 6, 3, 2, 7, 6, 6, 5, 5, 1],
      ],
    });
  }
}
