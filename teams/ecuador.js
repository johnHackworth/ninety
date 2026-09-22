class Ecuador extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4], [4, 6]],
    FW: [[6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Ecuador',
      level: 1,
      starPlayers: ['Moisés Caicedo', 'Kendry Páez', 'Enner Valencia'],
      startingDeck: "defensive",
      extraActions: { eureka: 1 },
      coach: 'Sebastián Beccacece',
      primaryColor: '#ffcc00',
      reserveColor: '#005baa',
      shortsColor: '#005baa',
      awayShortsColor: '#005baa',
      startingXI: ['Moisés Ramírez', 'Ángelo Preciado', 'Félix Torres', 'Willian Pacho', 'Pervis Estupiñán', 'Moisés Caicedo', 'Alan Franco', 'Kendry Páez', 'Jordy Alcívar', 'Enner Valencia', 'Gonzalo Plata'],
      squad: [
        ['Hernán Galíndez', 39, 'GK', 'Ecuador', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Félix Torres', 29, 'DF', 'Ecuador', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Piero Hincapié', 24, 'DF', 'Ecuador', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Joel Ordóñez', 22, 'DF', 'Ecuador', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Jordy Alcívar', 26, 'MF', 'Ecuador', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Willian Pacho', 24, 'DF', 'Ecuador', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Pervis Estupiñán', 28, 'DF', 'Ecuador', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Anthony Valencia', 22, 'MF', 'Ecuador', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['John Yeboah', 25, 'FW', 'Ecuador', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Kendry Páez', 19, 'MF', 'Ecuador', 8, 4, 4, 8, 8, 9, 8, 4, 1],
        ['Kevin Rodríguez', 26, 'FW', 'Ecuador', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Moisés Ramírez', 25, 'GK', 'Ecuador', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Enner Valencia', 36, 'FW', 'Ecuador', 7, 4, 4, 8, 6, 7, 7, 8, 1],
        ['Alan Minda', 23, 'MF', 'Ecuador', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Pedro Vite', 24, 'MF', 'Ecuador', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Jordy Caicedo', 28, 'FW', 'Ecuador', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Ángelo Preciado', 28, 'DF', 'Ecuador', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Denil Castillo', 22, 'MF', 'Ecuador', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Gonzalo Plata', 25, 'FW', 'Ecuador', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Nilson Angulo', 22, 'FW', 'Ecuador', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Alan Franco', 27, 'MF', 'Ecuador', 8, 8, 9, 7, 8, 10, 8, 9, 1],
        ['Gonzalo Valle', 30, 'GK', 'Ecuador', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Moisés Caicedo', 24, 'MF', 'Ecuador', 7, 8, 8, 6, 8, 8, 8, 6, 1],
        ['Jeremy Arévalo', 21, 'FW', 'Ecuador', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Jackson Porozo', 25, 'DF', 'Ecuador', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Yaimar Medina', 21, 'DF', 'Ecuador', 5, 6, 6, 3, 3, 2, 5, 6, 1],
      ],
    });
  }
}
