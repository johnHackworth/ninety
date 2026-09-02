class Spain extends AbstractTeam {
  static formation = {
    'Unai Simón': [0, 3],
    'Cucurella': [2, 0],
    'Laporte': [2, 2],
    'Cubarsí': [2, 4],
    'Pedro Porro': [2, 6],
    'Rodri': [4, 2],
    'Pedri': [4, 4],
    'Nico Williams': [5, 0],
    'Dani Olmo': [5, 3],
    'Lamine Yamal': [5, 6],
    'Oyarzabal': [6, 3],
  };

  constructor() {
    super({
      name: 'Spain',
      level: 3,
  starPlayers: ['Rodri', 'Pedri', 'Lamine Yamal', 'Nico Williams', 'Cucurella'],
      startingDeck: "technical",
      artifacts: [ 'tacticalMindset'],
      extraActions: { 'tiki-taka': 1, eureka: 1, ouch: 1, 'ghost-run': 1 },
      coach: 'Luis de la Fuente',
      controller: { type: 'human' },
      primaryColor: '#c60b1e',
      reserveColor: '#ffffff',
      shortsColor: '#002868',
      awayShortsColor: '#ffffff',
      startingXI: ['Unai Simón', 'Cucurella', 'Laporte', 'Cubarsí', 'Pedro Porro', 'Rodri', 'Pedri', 'Nico Williams', 'Oyarzabal', 'Lamine Yamal', 'Dani Olmo'],
      squad: [
        ['Unai Simón', 29, 'GK', 'Spain', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['Laporte', 32, 'DF', 'Spain', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Cubarsí', 19, 'DF', 'Spain', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Cucurella', 28, 'DF', 'Spain', 9, 8, 8, 5, 8, 8, 8, 7, 2],
        ['Pedro Porro', 27, 'DF', 'Spain', 9, 8, 8, 5, 8, 7, 8, 6, 2],
        ['Rodri', 30, 'MF', 'Spain', 7, 9, 9, 8, 9, 8, 10, 8, 1],
        ['Pedri', 23, 'MF', 'Spain', 7, 6, 6, 7, 9, 9, 9, 4, 1],
        ['Gavi', 22, 'MF', 'Spain', 7, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Lamine Yamal', 19, 'FW', 'Spain', 9, 5, 5, 8, 9, 10, 9, 4, 1],
        ['Morata', 33, 'FW', 'Spain', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Nico Williams', 24, 'FW', 'Spain', 10, 5, 5, 8, 8, 9, 8, 4, 1],
        ['Raya', 31, 'GK', 'Spain', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['Marcos Llorente', 31, 'DF', 'Spain', 9, 8, 8, 5, 8, 7, 8, 7, 2],
        ['Fabián Ruiz', 30, 'MF', 'Spain', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Mikel Merino', 30, 'MF', 'Spain', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Oyarzabal', 29, 'FW', 'Spain', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Ferran Torres', 26, 'FW', 'Spain', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Dani Olmo', 28, 'FW', 'Spain', 6, 4, 4, 8, 9, 9, 9, 4, 1],
      ],
    });
  }
}
