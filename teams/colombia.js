class Colombia extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 2], [4, 4], [5, 3], [5, 0]],
    FW: [[5, 6], [6, 3]],
  };

  constructor() {
    super({
      name: 'Colombia',
      level: 2,
      starPlayers: ['Luis Díaz', 'James Rodríguez', 'Davinson Sánchez', 'Richard Ríos'],
      startingDeck: "technical",
      extraActions: { eureka: 1, ouch: 1, 'ghost-run': 1 },
      coach: 'Néstor Lorenzo',
      artifacts: ["tikiTakaBoots"],
      primaryColor: '#ffcd00',
      reserveColor: '#003893',
      shortsColor: '#003893',
      awayShortsColor: '#ffcd00',
      startingXI: ['Camilo Vargas', 'Daniel Muñoz', 'Davinson Sánchez', 'Jhon Lucumí', 'Johan Mojica', 'Jefferson Lerma', 'Richard Ríos', 'James Rodríguez', 'Juan Fernando Quintero', 'Luis Díaz', 'Jhon Córdoba'],
      squad: [
        ['David Ospina', 37, 'GK', 'Colombia', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Daniel Muñoz', 30, 'DF', 'Colombia', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Jhon Lucumí', 27, 'DF', 'Colombia', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Santiago Arias', 34, 'DF', 'Colombia', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Kevin Castaño', 25, 'MF', 'Colombia', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Richard Ríos', 26, 'MF', 'Colombia', 7, 7, 7, 7, 8, 8, 7, 6, 1],
        ['Luis Díaz', 29, 'FW', 'Colombia', 9, 5, 5, 8, 7, 9, 8, 5, 1],
        ['Jorge Carrascal', 28, 'MF', 'Colombia', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Jhon Córdoba', 33, 'FW', 'Colombia', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['James Rodríguez', 34, 'MF', 'Colombia', 7, 4, 4, 9, 9, 8, 9, 4, 1],
        ['Jhon Arias', 28, 'MF', 'Colombia', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Camilo Vargas', 37, 'GK', 'Colombia', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Yerry Mina', 31, 'DF', 'Colombia', 8, 8, 8, 2, 9, 10, 9, 8, 2],
        ['Gustavo Puerta', 22, 'DF', 'Colombia', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Juan Portilla', 27, 'MF', 'Colombia', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Jefferson Lerma', 31, 'MF', 'Colombia', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Johan Mojica', 33, 'DF', 'Colombia', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Willer Ditta', 28, 'DF', 'Colombia', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Cucho Hernández', 27, 'FW', 'Colombia', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Juan Fernando Quintero', 33, 'MF', 'Colombia', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Jaminton Campaz', 26, 'FW', 'Colombia', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Deiver Machado', 32, 'DF', 'Colombia', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Davinson Sánchez', 29, 'DF', 'Colombia', 7, 8, 8, 4, 7, 5, 8, 8, 1],
        ['Álvaro Montero', 31, 'GK', 'Colombia', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Luis Suárez', 28, 'FW', 'Colombia', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Andrés Gómez', 23, 'FW', 'Colombia', 6, 2, 2, 8, 4, 5, 4, 7, 1],
      ],
    });
  }
}
