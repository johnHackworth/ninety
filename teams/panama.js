class Panama extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4], [4, 6], [6, 2]],
    FW: [[6, 4]],
  };

  constructor() {
    super({
      name: 'Panama',
      level: 1,
      starPlayers: ['Adalberto Carrasquilla', 'Michael Amir Murillo'],
      startingDeck: "counter",
      extraActions: { 'underdog-bite': 1 },
      coach: 'Thomas Christiansen',
      artifacts: ["minnowWill"],
      primaryColor: '#ce1126',
      reserveColor: '#002d62',
      shortsColor: '#002d62',
      awayShortsColor: '#ffffff',
      startingXI: ['Orlando Mosquera', 'Michael Amir Murillo', 'Fidel Escobar', 'Roderick Miller', 'Andrés Andrade', 'Adalberto Carrasquilla', 'Aníbal Godoy', 'Cristian Martínez', 'Yoel Bárcenas', 'Ismael Díaz', 'José Fajardo'],
      squad: [
        ['Luis Mejía', 35, 'GK', 'Panama', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['César Blackman', 28, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['José Córdoba', 25, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Fidel Escobar', 31, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Edgardo Fariña', 24, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Cristian Martínez', 29, 'MF', 'Panama', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['José Luis Rodríguez', 27, 'MF', 'Panama', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Adalberto Carrasquilla', 27, 'MF', 'Panama', 6, 6, 6, 6, 7, 7, 6, 4, 1],
        ['Tomás Rodríguez', 27, 'FW', 'Panama', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Ismael Díaz', 29, 'MF', 'Panama', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Yoel Bárcenas', 32, 'MF', 'Panama', 9, 7, 10, 5, 8, 9, 8, 7, 2],
        ['César Samudio', 32, 'GK', 'Panama', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Jiovany Ramos', 29, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Carlos Harvey', 26, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Eric Davis', 35, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Andrés Andrade', 27, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['José Fajardo', 32, 'FW', 'Panama', 8, 6, 5, 8, 10, 9, 8, 9, 1],
        ['Cecilio Waterman', 35, 'FW', 'Panama', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Alberto Quintero', 38, 'MF', 'Panama', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Aníbal Godoy', 36, 'MF', 'Panama', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['César Yanis', 30, 'MF', 'Panama', 9, 9, 10, 8, 8, 8, 8, 8, 2],
        ['Orlando Mosquera', 31, 'GK', 'Panama', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Michael Amir Murillo', 30, 'DF', 'Panama', 7, 7, 7, 4, 6, 6, 7, 6, 1],
        ['Azarias Londoño', 24, 'FW', 'Panama', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Roderick Miller', 34, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Jorge Gutiérrez', 27, 'DF', 'Panama', 5, 6, 6, 3, 3, 2, 5, 6, 1],
      ],
    });
  }
}
