class Spain extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 2], [4, 4]],
    FW: [[5, 0], [6, 3], [5, 6], [5, 3]],
  };

  constructor() {
    super({
      name: 'Spain',
      level: 3,
      starPlayers: ['Rodri', 'Pedri', 'Lamine Yamal', 'Nico Williams', 'Marc Cucurella'],
      startingDeck: "technical",
      extraActions: { 'tiki-taka': 1, eureka: 1, ouch: 1, 'ghost-run': 1 },
      coach: 'Luis de la Fuente',
      artifacts: ["tacticalMindset"],
      primaryColor: '#aa151b',
      reserveColor: '#f1bf00',
      shortsColor: '#0047ab',
      awayShortsColor: '#f1bf00',
      startingXI: ['Unai Simón', 'Marc Cucurella', 'Aymeric Laporte', 'Pau Cubarsí', 'Pedro Porro', 'Rodri', 'Pedri', 'Nico Williams', 'Mikel Oyarzabal', 'Lamine Yamal', 'Dani Olmo'],
      squad: [
        ['David Raya', 30, 'GK', 'Spain', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Marc Pubill', 22, 'DF', 'Spain', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Álex Grimaldo', 30, 'DF', 'Spain', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Eric García', 25, 'DF', 'Spain', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Marcos Llorente', 31, 'DF', 'Spain', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Mikel Merino', 29, 'MF', 'Spain', 9, 6, 7, 10, 8, 8, 8, 9, 2],
        ['Ferran Torres', 26, 'FW', 'Spain', 8, 7, 8, 8, 10, 8, 9, 9, 1],
        ['Fabián Ruiz', 30, 'MF', 'Spain', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Gavi', 21, 'MF', 'Spain', 9, 7, 9, 10, 8, 8, 8, 8, 1],
        ['Dani Olmo', 28, 'FW', 'Spain', 8, 7, 6, 8, 8, 9, 10, 9, 1],
        ['Yéremy Pino', 23, 'FW', 'Spain', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Pedro Porro', 26, 'DF', 'Spain', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Joan Garcia', 25, 'GK', 'Spain', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Aymeric Laporte', 32, 'DF', 'Spain', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Álex Baena', 24, 'MF', 'Spain', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Rodri', 29, 'MF', 'Spain', 7, 9, 9, 8, 9, 8, 10, 8, 1],
        ['Nico Williams', 23, 'FW', 'Spain', 10, 5, 5, 8, 8, 9, 8, 4, 1],
        ['Martín Zubimendi', 27, 'MF', 'Spain', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Lamine Yamal', 18, 'FW', 'Spain', 9, 5, 5, 8, 9, 10, 9, 4, 1],
        ['Pedri', 23, 'MF', 'Spain', 7, 6, 6, 7, 9, 9, 9, 4, 1],
        ['Mikel Oyarzabal', 29, 'FW', 'Spain', 8, 5, 9, 8, 8, 8, 10, 9, 1],
        ['Pau Cubarsí', 19, 'DF', 'Spain', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Unai Simón', 29, 'GK', 'Spain', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Marc Cucurella', 27, 'DF', 'Spain', 9, 8, 8, 5, 8, 8, 8, 7, 2],
        ['Víctor Muñoz', 22, 'FW', 'Spain', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Borja Iglesias', 33, 'FW', 'Spain', 7, 2, 2, 9, 4, 6, 4, 8, 1],
      ],
    });
  }
}
