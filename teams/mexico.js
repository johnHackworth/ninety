class Mexico extends AbstractTeam {
  static formation = {
    'Luis Malagón': [0, 3],
    'Kevin Álvarez': [2, 0],
    'César Montes': [2, 2],
    'Johan Vásquez': [2, 4],
    'Jesús Gallardo': [2, 6],
    'Edson Álvarez': [4, 0],
    'Luis Chávez': [4, 2],
    'Orbelín Pineda': [4, 4],
    'Luis Romo': [4, 6],
    'Hirving Lozano': [6, 2],
    'Santiago Giménez': [6, 4],
  };

  constructor() {
    super({
      name: 'Mexico',
      level: 3,
  starPlayers: ['Edson Álvarez', 'Hirving Lozano', 'Santiago Giménez', 'Raúl Jiménez', 'Luis Chávez'],
      startingDeck: "attacking",
      extraActions: { eureka: 1 },
      coach: 'Javier Aguirre',
      artifacts: [ 'tikiTakaBoots'],
      primaryColor: '#006847',
      reserveColor: '#ffffff',
      shortsColor: '#ffffff',
      awayShortsColor: '#006847',
      startingXI: ['Luis Malagón', 'Kevin Álvarez', 'César Montes', 'Johan Vásquez', 'Jesús Gallardo', 'Edson Álvarez', 'Luis Chávez', 'Orbelín Pineda', 'Luis Romo', 'Hirving Lozano', 'Santiago Giménez'],
      squad: [
        ['Luis Malagón', 29, 'GK', 'Mexico', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['Raúl Rangel', 25, 'GK', 'Mexico', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['Kevin Álvarez', 27, 'DF', 'Mexico', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['César Montes', 29, 'DF', 'Mexico', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Johan Vásquez', 28, 'DF', 'Mexico', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Jesús Gallardo', 32, 'DF', 'Mexico', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Jorge Sánchez', 29, 'DF', 'Mexico', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Edson Álvarez', 29, 'MF', 'Mexico', 7, 8, 8, 6, 8, 7, 8, 7, 1],
        ['Luis Chávez', 30, 'MF', 'Mexico', 6, 6, 6, 8, 8, 7, 7, 5, 1],
        ['Orbelín Pineda', 30, 'MF', 'Mexico', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Luis Romo', 31, 'MF', 'Mexico', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Carlos Rodríguez', 29, 'MF', 'Mexico', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Roberto Alvarado', 28, 'MF', 'Mexico', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Hirving Lozano', 31, 'FW', 'Mexico', 9, 5, 5, 7, 7, 8, 7, 4, 1],
        ['Santiago Giménez', 25, 'FW', 'Mexico', 7, 4, 4, 9, 7, 7, 7, 8, 1],
        ['Raúl Jiménez', 35, 'FW', 'Mexico', 7, 4, 4, 8, 7, 7, 8, 8, 1],
        ['Uriel Antuna', 29, 'FW', 'Mexico', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['César Huerta', 26, 'FW', 'Mexico', 8, 5, 4, 9, 8, 8, 7, 7, 2],
      ],
    });
  }
}
