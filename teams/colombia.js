class Colombia extends AbstractTeam {
  static formation = {
    'Vargas': [0, 3],
    'Muñoz': [2, 0],
    'Dávinson Sánchez': [2, 2],
    'Lucumí': [2, 4],
    'Mojica': [2, 6],
    'Lerma': [4, 2],
    'Richard Ríos': [4, 4],
    'Quintero': [5, 0],
    'James Rodríguez': [5, 3],
    'Luis Díaz': [5, 6],
    'Jhon Córdoba': [6, 3],
  };

  constructor() {
    super({
      name: 'Colombia',
      level: 2,
  starPlayers: ['Luis Díaz', 'James Rodríguez', 'Dávinson Sánchez', 'Richard Ríos'],
      startingDeck: "technical",
      extraActions: { eureka: 1, ouch: 1, 'ghost-run': 1 },
      coach: 'Néstor Lorenzo',
      artifacts: [ 'tikiTakaBoots'],
      primaryColor: '#fcd116',
      reserveColor: '#1b3f8f',
      shortsColor: '#1b3f8f',
      awayShortsColor: '#1b3f8f',
      startingXI: ['Vargas', 'Muñoz', 'Dávinson Sánchez', 'Lucumí', 'Mojica', 'Lerma', 'Richard Ríos', 'James Rodríguez', 'Quintero', 'Luis Díaz', 'Jhon Córdoba'],
      squad: [
        ['Vargas', 37, 'GK', 'Colombia', 3, 7, 2, 1, 7, 3, 6, 3, 8],
        ['Ospina', 37, 'GK', 'Colombia', 3, 7, 2, 1, 7, 3, 6, 3, 8],
        ['Muñoz', 30, 'DF', 'Colombia', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Dávinson Sánchez', 30, 'DF', 'Colombia', 7, 8, 8, 4, 7, 5, 8, 8, 1],
        ['Lucumí', 28, 'DF', 'Colombia', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Mojica', 33, 'DF', 'Colombia', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Yerry Mina', 31, 'DF', 'Colombia', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Lerma', 31, 'MF', 'Colombia', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Richard Ríos', 26, 'MF', 'Colombia', 7, 7, 7, 7, 8, 8, 7, 6, 1],
        ['James Rodríguez', 35, 'MF', 'Colombia', 7, 4, 4, 9, 9, 8, 9, 4, 1],
        ['Quintero', 33, 'MF', 'Colombia', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Uribe', 35, 'MF', 'Colombia', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Carrascal', 28, 'MF', 'Colombia', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Luis Díaz', 29, 'FW', 'Colombia', 9, 5, 5, 8, 7, 9, 8, 5, 1],
        ['Jhon Córdoba', 33, 'FW', 'Colombia', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Borré', 30, 'FW', 'Colombia', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Sinisterra', 27, 'FW', 'Colombia', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Durán', 22, 'FW', 'Colombia', 7, 4, 3, 8, 7, 7, 6, 6, 1],
      ],
    });
  }
}
