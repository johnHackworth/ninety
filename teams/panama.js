class Panama extends AbstractTeam {
  static formation = {
    'Luis Mejía': [0, 3],
    'César Blackman': [2, 0],
    'José Córdoba': [2, 2],
    'Fidel Escobar': [2, 4],
    'Edgardo Fariña': [2, 6],
    'Cristian Martínez': [4, 0],
    'José Luis Rodríguez': [4, 2],
    'Adalberto Carrasquilla': [4, 4],
    'Ismael Díaz': [4, 6],
    'Tomás Rodríguez': [6, 2],
    'José Fajardo': [6, 4],
  };

  constructor() {
    super({
      name: 'Panama',
      level: 1,
      starPlayers: ['Yoel Bárcenas', 'César Yanis', 'Adalberto Carrasquilla', 'José Fajardo'],
      startingDeck: "counter",
      extraActions: { 'underdog-bite': 1 },
      coach: 'Thomas Christiansen',
      artifacts: ["minnowWill"],
      primaryColor: '#ce1126',
      reserveColor: '#002d62',
      shortsColor: '#002d62',
      awayShortsColor: '#ffffff',
      startingXI: ['Luis Mejía', 'César Blackman', 'José Córdoba', 'Fidel Escobar', 'Edgardo Fariña', 'Cristian Martínez', 'José Luis Rodríguez', 'Adalberto Carrasquilla', 'Ismael Díaz', 'Tomás Rodríguez', 'José Fajardo'],
      squad: [
        ['Luis Mejía', 35, 'GK', 'Panama', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['César Blackman', 28, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['José Córdoba', 25, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Fidel Escobar', 31, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Edgardo Fariña', 24, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Cristian Martínez', 29, 'MF', 'Panama', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['José Luis Rodríguez', 27, 'MF', 'Panama', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Adalberto Carrasquilla', 27, 'MF', 'Panama', 8, 9, 10, 8, 8, 8, 8, 9, 2]
        ['Tomás Rodríguez', 27, 'FW', 'Panama', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Ismael Díaz', 29, 'MF', 'Panama', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Yoel Bárcenas', 32, 'MF', 'Panama', 9, 7, 10, 5, 8, 9, 8, 7, 2]
        ['César Samudio', 32, 'GK', 'Panama', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Jiovany Ramos', 29, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Carlos Harvey', 26, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Eric Davis', 35, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Andrés Andrade', 27, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['José Fajardo', 32, 'FW', 'Panama', 8, 6, 5, 8, 10, 9, 8, 9, 1]
        ['Cecilio Waterman', 35, 'FW', 'Panama', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Alberto Quintero', 38, 'MF', 'Panama', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Aníbal Godoy', 36, 'MF', 'Panama', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['César Yanis', 30, 'MF', 'Panama', 9, 9, 10, 8, 8, 8, 8, 8, 2]
        ['Orlando Mosquera', 31, 'GK', 'Panama', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Michael Amir Murillo', 30, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Azarias Londoño', 24, 'FW', 'Panama', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Roderick Miller', 34, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Jorge Gutiérrez', 27, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1]
      ],
    });
  }
}
