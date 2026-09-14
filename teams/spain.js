class Spain extends AbstractTeam {
  static formation = {
    'David Raya': [0, 3],
    'Marc Pubill': [2, 0],
    'Álex Grimaldo': [2, 2],
    'Eric García': [2, 4],
    'Marcos Llorente': [2, 6],
    'Mikel Merino': [4, 0],
    'Fabián Ruiz': [4, 2],
    'Gavi': [4, 4],
    'Álex Baena': [4, 6],
    'Ferran Torres': [6, 2],
    'Dani Olmo': [6, 4],
  };

  constructor() {
    super({
      name: 'Spain',
      level: 3,
      starPlayers: ['Ferran Torres', 'Mikel Oyarzabal', 'Gavi', 'Dani Olmo', 'Mikel Merino'],
      startingDeck: "balanced",
      extraActions: {"gegenpressing":1},
      coach: 'Luis de la Fuente',
      artifacts: ["playmaker"],
      primaryColor: '#aa151b',
      reserveColor: '#f1bf00',
      shortsColor: '#0047ab',
      awayShortsColor: '#f1bf00',
      startingXI: ['David Raya', 'Marc Pubill', 'Álex Grimaldo', 'Eric García', 'Marcos Llorente', 'Mikel Merino', 'Fabián Ruiz', 'Gavi', 'Álex Baena', 'Ferran Torres', 'Dani Olmo'],
      squad: [
        ['David Raya', 30, 'GK', 'Spain', 6, 7, 2, 1, 5, 2, 10, 8, 10],
        ['Marc Pubill', 22, 'DF', 'Spain', 8, 7, 6, 3, 6, 8, 7, 8, 1],
        ['Álex Grimaldo', 30, 'DF', 'Spain', 9, 10, 9, 2, 9, 8, 5, 8, 1],
        ['Eric García', 25, 'DF', 'Spain', 7, 10, 8, 2, 9, 8, 6, 8, 1],
        ['Marcos Llorente', 31, 'DF', 'Spain', 9, 9, 9, 4, 10, 9, 5, 10, 1],
        ['Mikel Merino', 29, 'MF', 'Spain', 10, 6, 7, 10, 10, 9, 10, 9, 2],
        ['Ferran Torres', 26, 'FW', 'Spain', 10, 7, 8, 10, 10, 10, 10, 10, 1],
        ['Fabián Ruiz', 30, 'MF', 'Spain', 10, 6, 10, 5, 10, 8, 10, 10, 2],
        ['Gavi', 21, 'MF', 'Spain', 10, 7, 9, 10, 10, 9, 9, 8, 1],
        ['Dani Olmo', 28, 'FW', 'Spain', 10, 7, 6, 10, 8, 10, 10, 10, 1],
        ['Yéremy Pino', 23, 'FW', 'Spain', 10, 2, 4, 10, 8, 9, 5, 7, 1],
        ['Pedro Porro', 26, 'DF', 'Spain', 8, 10, 6, 2, 8, 6, 5, 8, 2],
        ['Joan Garcia', 25, 'GK', 'Spain', 5, 6, 3, 1, 5, 4, 8, 7, 10],
        ['Aymeric Laporte', 32, 'DF', 'Spain', 7, 9, 9, 5, 8, 10, 10, 8, 1],
        ['Álex Baena', 24, 'MF', 'Spain', 10, 8, 6, 7, 7, 8, 10, 5, 1],
        ['Rodri', 29, 'MF', 'Spain', 8, 10, 10, 7, 10, 10, 10, 7, 1],
        ['Nico Williams', 23, 'FW', 'Spain', 10, 5, 5, 10, 7, 10, 10, 7, 1],
        ['Martín Zubimendi', 27, 'MF', 'Spain', 7, 5, 6, 7, 10, 9, 10, 8, 1],
        ['Lamine Yamal', 18, 'FW', 'Spain', 10, 4, 5, 10, 9, 10, 8, 8, 1],
        ['Pedri', 23, 'MF', 'Spain', 10, 5, 7, 10, 10, 10, 9, 8, 1],
        ['Mikel Oyarzabal', 29, 'FW', 'Spain', 10, 5, 9, 10, 8, 10, 10, 10, 1],
        ['Pau Cubarsí', 19, 'DF', 'Spain', 8, 8, 10, 3, 8, 8, 9, 7, 1],
        ['Unai Simón', 29, 'GK', 'Spain', 5, 10, 5, 2, 10, 4, 10, 10, 10],
        ['Marc Cucurella', 27, 'DF', 'Spain', 8, 9, 7, 4, 9, 8, 10, 7, 2],
        ['Víctor Muñoz', 22, 'FW', 'Spain', 7, 3, 4, 9, 7, 10, 5, 7, 1],
        ['Borja Iglesias', 33, 'FW', 'Spain', 9, 3, 3, 10, 7, 9, 8, 7, 1]
      ],
    });
  }
}

module.exports = Spain;