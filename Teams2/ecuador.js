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
      startingDeck: "tactical",
      extraActions: {"long-ball":1},
      coach: 'Sebastián Beccacece',
      artifacts: ["paceBurner"],
      primaryColor: '#ffcc00',
      reserveColor: '#005baa',
      shortsColor: '#005baa',
      awayShortsColor: '#005baa',
      startingXI: ['Hernán Galíndez', 'Félix Torres', 'Piero Hincapié', 'Joel Ordóñez', 'Willian Pacho', 'Jordy Alcívar', 'Anthony Valencia', 'Kendry Páez', 'Alan Minda', 'John Yeboah', 'Kevin Rodríguez'],
      squad: [
        ['Hernán Galíndez', 39, 'GK', 'Ecuador', 3, 7, 2, 1, 8, 3, 10, 8, 10],
        ['Félix Torres', 29, 'DF', 'Ecuador', 9, 10, 10, 5, 10, 8, 7, 8, 3],
        ['Piero Hincapié', 24, 'DF', 'Ecuador', 9, 10, 8, 2, 8, 5, 10, 10, 1],
        ['Joel Ordóñez', 22, 'DF', 'Ecuador', 10, 8, 10, 3, 10, 7, 10, 7, 1],
        ['Jordy Alcívar', 26, 'MF', 'Ecuador', 6, 6, 7, 6, 7, 9, 6, 7, 1],
        ['Willian Pacho', 24, 'DF', 'Ecuador', 7, 9, 9, 5, 6, 5, 9, 8, 1],
        ['Pervis Estupiñán', 28, 'DF', 'Ecuador', 9, 10, 10, 4, 10, 9, 8, 10, 1],
        ['Anthony Valencia', 22, 'MF', 'Ecuador', 7, 7, 8, 6, 7, 8, 10, 4, 2],
        ['John Yeboah', 25, 'FW', 'Ecuador', 10, 4, 4, 9, 7, 10, 8, 7, 1],
        ['Kendry Páez', 19, 'MF', 'Ecuador', 10, 6, 9, 9, 9, 10, 10, 7, 3],
        ['Kevin Rodríguez', 26, 'FW', 'Ecuador', 10, 3, 7, 10, 7, 10, 10, 10, 1],
        ['Moisés Ramírez', 25, 'GK', 'Ecuador', 4, 6, 3, 1, 8, 3, 10, 7, 10],
        ['Enner Valencia', 36, 'FW', 'Ecuador', 10, 6, 8, 10, 10, 10, 10, 10, 1],
        ['Alan Minda', 23, 'MF', 'Ecuador', 10, 8, 5, 4, 8, 8, 10, 4, 2],
        ['Pedro Vite', 24, 'MF', 'Ecuador', 10, 4, 9, 8, 10, 8, 9, 5, 1],
        ['Jordy Caicedo', 28, 'FW', 'Ecuador', 9, 3, 3, 10, 7, 10, 8, 9, 1],
        ['Ángelo Preciado', 28, 'DF', 'Ecuador', 10, 9, 10, 3, 9, 8, 10, 10, 1],
        ['Denil Castillo', 22, 'MF', 'Ecuador', 8, 7, 8, 4, 10, 10, 9, 8, 2],
        ['Gonzalo Plata', 25, 'FW', 'Ecuador', 10, 3, 6, 10, 7, 10, 10, 10, 1],
        ['Nilson Angulo', 22, 'FW', 'Ecuador', 10, 3, 5, 10, 10, 8, 6, 9, 1],
        ['Alan Franco', 27, 'MF', 'Ecuador', 9, 9, 9, 7, 10, 10, 10, 9, 1],
        ['Gonzalo Valle', 30, 'GK', 'Ecuador', 5, 5, 3, 2, 4, 4, 6, 6, 8],
        ['Moisés Caicedo', 24, 'MF', 'Ecuador', 10, 10, 6, 8, 10, 10, 10, 8, 1],
        ['Jeremy Arévalo', 21, 'FW', 'Ecuador', 10, 4, 3, 8, 8, 10, 9, 9, 1],
        ['Jackson Porozo', 25, 'DF', 'Ecuador', 5, 9, 6, 2, 7, 6, 6, 9, 1],
        ['Yaimar Medina', 21, 'DF', 'Ecuador', 6, 8, 6, 2, 7, 7, 7, 10, 1]
      ],
    });
  }
}

module.exports = Ecuador;