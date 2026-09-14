class Ecuador extends AbstractTeam {
  static formation = {
    'Hernán Galíndez': [0, 3],
    'Félix Torres': [2, 0],
    'Piero Hincapié': [2, 2],
    'Joel Ordóñez': [2, 4],
    'Willian Pacho': [2, 6],
    'Jordy Alcívar': [4, 0],
    'Anthony Valencia': [4, 2],
    'Kendry Páez': [4, 4],
    'Alan Minda': [4, 6],
    'John Yeboah': [6, 2],
    'Kevin Rodríguez': [6, 4],
  };

  constructor() {
    super({
      name: 'Ecuador',
      level: 1,
      starPlayers: ['Enner Valencia', 'Kendry Páez', 'Moisés Caicedo', 'Alan Franco'],
      startingDeck: "defensive",
      extraActions: { eureka: 1 },
      coach: 'Sebastián Beccacece',
      primaryColor: '#ffcc00',
      reserveColor: '#005baa',
      shortsColor: '#005baa',
      awayShortsColor: '#005baa',
      startingXI: ['Hernán Galíndez', 'Félix Torres', 'Piero Hincapié', 'Joel Ordóñez', 'Willian Pacho', 'Jordy Alcívar', 'Anthony Valencia', 'Kendry Páez', 'Alan Minda', 'John Yeboah', 'Kevin Rodríguez'],
      squad: [
        ['Hernán Galíndez', 39, 'GK', 'Ecuador', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Félix Torres', 29, 'DF', 'Ecuador', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Piero Hincapié', 24, 'DF', 'Ecuador', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Joel Ordóñez', 22, 'DF', 'Ecuador', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Jordy Alcívar', 26, 'MF', 'Ecuador', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Willian Pacho', 24, 'DF', 'Ecuador', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Pervis Estupiñán', 28, 'DF', 'Ecuador', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Anthony Valencia', 22, 'MF', 'Ecuador', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['John Yeboah', 25, 'FW', 'Ecuador', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Kendry Páez', 19, 'MF', 'Ecuador', 10, 6, 9, 9, 8, 8, 8, 7, 3]
        ['Kevin Rodríguez', 26, 'FW', 'Ecuador', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Moisés Ramírez', 25, 'GK', 'Ecuador', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Enner Valencia', 36, 'FW', 'Ecuador', 8, 6, 8, 8, 10, 8, 9, 9, 1]
        ['Alan Minda', 23, 'MF', 'Ecuador', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Pedro Vite', 24, 'MF', 'Ecuador', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Jordy Caicedo', 28, 'FW', 'Ecuador', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Ángelo Preciado', 28, 'DF', 'Ecuador', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Denil Castillo', 22, 'MF', 'Ecuador', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Gonzalo Plata', 25, 'FW', 'Ecuador', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Nilson Angulo', 22, 'FW', 'Ecuador', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Alan Franco', 27, 'MF', 'Ecuador', 8, 8, 9, 7, 8, 10, 8, 9, 1]
        ['Gonzalo Valle', 30, 'GK', 'Ecuador', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Moisés Caicedo', 24, 'MF', 'Ecuador', 9, 10, 6, 8, 8, 9, 8, 8, 1]
        ['Jeremy Arévalo', 21, 'FW', 'Ecuador', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Jackson Porozo', 25, 'DF', 'Ecuador', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Yaimar Medina', 21, 'DF', 'Ecuador', 5, 6, 6, 3, 3, 2, 5, 6, 1]
      ],
    });
  }
}
