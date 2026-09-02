class Paraguay extends AbstractTeam {
  static formation = {
    'Coronel': [0, 3],
    'Rojas': [2, 0],
    'Gustavo Gómez': [2, 2],
    'Alderete': [2, 4],
    'Junior Alonso': [2, 6],
    'Cubas': [4, 0],
    'Villasanti': [4, 2],
    'Diego Gómez': [4, 4],
    'Almirón': [4, 6],
    'Sanabria': [6, 2],
    'Enciso': [6, 4],
  };

  constructor() {
    super({
      name: 'Paraguay',
      level: 1,
  starPlayers: ['Almirón', 'Sanabria', 'Enciso'],
      startingDeck: "defensive",
      coach: 'Gustavo Alfaro',
      primaryColor: '#d6001c',
      reserveColor: '#ffffff',
      shortsColor: '#0033a0',
      awayShortsColor: '#002b7f',
      startingXI: ['Coronel', 'Rojas', 'Gustavo Gómez', 'Alderete', 'Junior Alonso', 'Cubas', 'Villasanti', 'Diego Gómez', 'Almirón', 'Sanabria', 'Enciso'],
      squad: [
        ['Coronel', 29, 'GK', 'Paraguay', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Gatito Fernández', 38, 'GK', 'Paraguay', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Rojas', 30, 'DF', 'Paraguay', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Gustavo Gómez', 33, 'DF', 'Paraguay', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Alderete', 29, 'DF', 'Paraguay', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Balbuena', 34, 'DF', 'Paraguay', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Junior Alonso', 33, 'DF', 'Paraguay', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Cubas', 30, 'MF', 'Paraguay', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Villasanti', 29, 'MF', 'Paraguay', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Diego Gómez', 23, 'MF', 'Paraguay', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Almirón', 32, 'MF', 'Paraguay', 9, 5, 5, 7, 7, 8, 7, 4, 1],
        ['Kaku', 31, 'MF', 'Paraguay', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Bobadilla', 25, 'MF', 'Paraguay', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Sanabria', 30, 'FW', 'Paraguay', 7, 4, 4, 8, 6, 7, 7, 7, 1],
        ['Enciso', 22, 'FW', 'Paraguay', 8, 4, 4, 8, 7, 8, 7, 4, 1],
        ['Ángel Romero', 34, 'FW', 'Paraguay', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Derlis González', 32, 'FW', 'Paraguay', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Bareiro', 30, 'FW', 'Paraguay', 6, 3, 2, 7, 6, 6, 5, 5, 1],
      ],
    });
  }
}
