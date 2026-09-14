class Colombia extends AbstractTeam {
  static formation = {
    'David Ospina': [0, 3],
    'Daniel Muñoz': [2, 0],
    'Jhon Lucumí': [2, 2],
    'Santiago Arias': [2, 4],
    'Yerry Mina': [2, 6],
    'Kevin Castaño': [4, 0],
    'Richard Ríos': [4, 2],
    'Jorge Carrascal': [4, 4],
    'James Rodríguez': [4, 6],
    'Luis Díaz': [6, 2],
    'Jhon Córdoba': [6, 4],
  };

  constructor() {
    super({
      name: 'Colombia',
      level: 2,
      starPlayers: ['James Rodríguez', 'Luis Díaz', 'Yerry Mina'],
      startingDeck: "aggressive",
      extraActions: {"eureka":1},
      coach: 'Néstor Lorenzo',
      artifacts: ["midfieldMaestro"],
      primaryColor: '#ffcd00',
      reserveColor: '#003893',
      shortsColor: '#003893',
      awayShortsColor: '#ffcd00',
      startingXI: ['David Ospina', 'Daniel Muñoz', 'Jhon Lucumí', 'Santiago Arias', 'Yerry Mina', 'Kevin Castaño', 'Richard Ríos', 'Jorge Carrascal', 'James Rodríguez', 'Luis Díaz', 'Jhon Córdoba'],
      squad: [
        ['David Ospina', 37, 'GK', 'Colombia', 5, 8, 4, 1, 7, 3, 8, 8, 10],
        ['Daniel Muñoz', 30, 'DF', 'Colombia', 7, 10, 8, 5, 10, 9, 10, 10, 3],
        ['Jhon Lucumí', 27, 'DF', 'Colombia', 7, 10, 8, 4, 10, 9, 9, 10, 1],
        ['Santiago Arias', 34, 'DF', 'Colombia', 10, 10, 8, 2, 7, 6, 10, 10, 2],
        ['Kevin Castaño', 25, 'MF', 'Colombia', 7, 6, 7, 4, 10, 7, 9, 5, 2],
        ['Richard Ríos', 26, 'MF', 'Colombia', 9, 6, 8, 8, 10, 7, 10, 8, 1],
        ['Luis Díaz', 29, 'FW', 'Colombia', 10, 4, 4, 10, 9, 10, 10, 10, 1],
        ['Jorge Carrascal', 28, 'MF', 'Colombia', 10, 5, 6, 6, 9, 9, 8, 5, 1],
        ['Jhon Córdoba', 33, 'FW', 'Colombia', 9, 4, 5, 10, 10, 10, 10, 9, 1],
        ['James Rodríguez', 34, 'MF', 'Colombia', 10, 7, 10, 7, 10, 9, 10, 9, 1],
        ['Jhon Arias', 28, 'MF', 'Colombia', 8, 7, 10, 8, 10, 8, 10, 10, 1],
        ['Camilo Vargas', 37, 'GK', 'Colombia', 4, 9, 3, 1, 8, 4, 8, 5, 10],
        ['Yerry Mina', 31, 'DF', 'Colombia', 9, 10, 10, 2, 10, 10, 10, 10, 2],
        ['Gustavo Puerta', 22, 'DF', 'Colombia', 5, 10, 7, 5, 5, 6, 8, 7, 1],
        ['Juan Portilla', 27, 'MF', 'Colombia', 7, 5, 6, 8, 7, 8, 7, 5, 1],
        ['Jefferson Lerma', 31, 'MF', 'Colombia', 8, 5, 10, 7, 10, 10, 10, 9, 1],
        ['Johan Mojica', 33, 'DF', 'Colombia', 10, 10, 10, 5, 10, 5, 9, 8, 1],
        ['Willer Ditta', 28, 'DF', 'Colombia', 6, 8, 6, 2, 5, 4, 4, 9, 2],
        ['Cucho Hernández', 27, 'FW', 'Colombia', 7, 2, 5, 8, 6, 8, 5, 6, 1],
        ['Juan Fernando Quintero', 33, 'MF', 'Colombia', 10, 6, 10, 6, 10, 10, 10, 10, 1],
        ['Jaminton Campaz', 26, 'FW', 'Colombia', 7, 4, 5, 10, 8, 7, 7, 8, 1],
        ['Deiver Machado', 32, 'DF', 'Colombia', 5, 9, 7, 4, 6, 5, 6, 10, 1],
        ['Davinson Sánchez', 29, 'DF', 'Colombia', 9, 9, 9, 2, 10, 7, 10, 8, 3],
        ['Álvaro Montero', 31, 'GK', 'Colombia', 4, 8, 2, 1, 7, 3, 10, 8, 10],
        ['Luis Suárez', 28, 'FW', 'Colombia', 8, 3, 3, 9, 8, 7, 7, 7, 1],
        ['Andrés Gómez', 23, 'FW', 'Colombia', 7, 3, 3, 8, 8, 10, 7, 8, 1]
      ],
    });
  }
}

module.exports = Colombia;