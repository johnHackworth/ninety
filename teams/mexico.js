class Mexico extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4], [4, 6]],
    FW: [[6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Mexico',
      level: 3,
      starPlayers: ['Edson Álvarez', 'Alexis Vega', 'Santiago Giménez', 'Raúl Jiménez', 'Luis Chávez'],
      startingDeck: "attacking",
      extraActions: { eureka: 1 },
      coach: 'Javier Aguirre',
      artifacts: ["tikiTakaBoots"],
      primaryColor: '#006847',
      reserveColor: '#ffffff',
      shortsColor: '#ffffff',
      awayShortsColor: '#000000',
      startingXI: ['Raúl Rangel', 'Edson Álvarez', 'César Montes', 'Johan Vásquez', 'Jesús Gallardo', 'Érik Lira', 'Luis Chávez', 'Orbelín Pineda', 'Luis Romo', 'Raúl Jiménez', 'Santiago Giménez'],
      squad: [
        ['Raúl Rangel', 26, 'GK', 'Mexico', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Jorge Sánchez', 28, 'DF', 'Mexico', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['César Montes', 29, 'DF', 'Mexico', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Edson Álvarez', 28, 'DF', 'Mexico', 7, 8, 8, 6, 8, 7, 8, 7, 1],
        ['Johan Vásquez', 27, 'DF', 'Mexico', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Érik Lira', 26, 'MF', 'Mexico', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Luis Romo', 31, 'MF', 'Mexico', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Álvaro Fidalgo', 29, 'MF', 'Mexico', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Raúl Jiménez', 35, 'FW', 'Mexico', 7, 4, 4, 8, 7, 7, 8, 8, 1],
        ['Alexis Vega', 28, 'FW', 'Mexico', 9, 5, 5, 7, 7, 8, 7, 4, 1],
        ['Santiago Giménez', 25, 'FW', 'Mexico', 7, 4, 4, 9, 7, 7, 7, 8, 1],
        ['Carlos Acevedo', 30, 'GK', 'Mexico', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Guillermo Ochoa', 40, 'GK', 'Mexico', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Armando González', 23, 'FW', 'Mexico', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Israel Reyes', 26, 'DF', 'Mexico', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Julián Quiñones', 29, 'FW', 'Mexico', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Orbelín Pineda', 30, 'MF', 'Mexico', 9, 7, 8, 10, 8, 9, 8, 7, 2],
        ['Obed Vargas', 20, 'MF', 'Mexico', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Gilberto Mora', 17, 'MF', 'Mexico', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Mateo Chávez', 22, 'DF', 'Mexico', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['César Huerta', 25, 'FW', 'Mexico', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Guillermo Martínez', 31, 'FW', 'Mexico', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Jesús Gallardo', 31, 'DF', 'Mexico', 8, 8, 8, 3, 10, 6, 9, 9, 1],
        ['Luis Chávez', 30, 'MF', 'Mexico', 6, 6, 6, 8, 8, 7, 7, 5, 1],
        ['Roberto Alvarado', 27, 'FW', 'Mexico', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Brian Gutiérrez', 22, 'MF', 'Mexico', 7, 6, 6, 7, 5, 5, 8, 6, 1],
      ],
    });
  }
}
