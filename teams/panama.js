class Panama extends AbstractTeam {
  static formation = {
    'Orlando Mosquera': [0, 3],
    'Michael Amir Murillo': [2, 0],
    'Fidel Escobar': [2, 2],
    'Roderick Miller': [2, 4],
    'Andrés Andrade': [2, 6],
    'Adalberto Carrasquilla': [4, 0],
    'Aníbal Godoy': [4, 2],
    'Cristian Martínez': [4, 4],
    'Edgar Bárcenas': [4, 6],
    'Ismael Díaz': [6, 2],
    'José Fajardo': [6, 4],
  };

  constructor() {
    super({
      name: 'Panama',
      level: 0,
  starPlayers: ['Adalberto Carrasquilla', 'Michael Amir Murillo'],
      startingDeck: "counter",
      extraActions: { 'underdog-bite': 1 },
      coach: 'Thomas Christiansen',
      artifacts: [ 'minnowWill'],
      primaryColor: '#da121a',
      reserveColor: '#ffffff',
      shortsColor: '#da121a',
      awayShortsColor: '#ffffff',
      startingXI: ['Orlando Mosquera', 'Michael Amir Murillo', 'Fidel Escobar', 'Roderick Miller', 'Andrés Andrade', 'Adalberto Carrasquilla', 'Aníbal Godoy', 'Cristian Martínez', 'Edgar Bárcenas', 'Ismael Díaz', 'José Fajardo'],
      squad: [
        ['Orlando Mosquera', 32, 'GK', 'Panama', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Luis Mejía', 35, 'GK', 'Panama', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Michael Amir Murillo', 30, 'DF', 'Panama', 7, 7, 7, 4, 6, 6, 7, 6, 1],
        ['Fidel Escobar', 31, 'DF', 'Panama', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Roderick Miller', 34, 'DF', 'Panama', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Andrés Andrade', 28, 'DF', 'Panama', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Edgardo Fariña', 25, 'DF', 'Panama', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Adalberto Carrasquilla', 28, 'MF', 'Panama', 6, 6, 6, 6, 7, 7, 6, 4, 1],
        ['Aníbal Godoy', 36, 'MF', 'Panama', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Cristian Martínez', 29, 'MF', 'Panama', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Edgar Bárcenas', 33, 'MF', 'Panama', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['César Yanis', 30, 'MF', 'Panama', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Jovani Welch', 27, 'MF', 'Panama', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Ismael Díaz', 29, 'FW', 'Panama', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['José Fajardo', 33, 'FW', 'Panama', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Cecilio Waterman', 35, 'FW', 'Panama', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Eduardo Guerrero', 26, 'FW', 'Panama', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Alberto Quintero', 39, 'FW', 'Panama', 5, 2, 1, 6, 5, 5, 4, 4, 1],
      ],
    });
  }
}
