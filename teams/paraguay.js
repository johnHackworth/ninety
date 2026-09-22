class Paraguay extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4], [4, 6]],
    FW: [[6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Paraguay',
      level: 1,
      starPlayers: ['Miguel Almirón', 'Antonio Sanabria', 'Julio Enciso'],
      startingDeck: "defensive",
      extraActions: {"ouch":1},
      coach: 'Gustavo Alfaro',
      primaryColor: '#ce1126',
      reserveColor: '#ffffff',
      shortsColor: '#003087',
      awayShortsColor: '#ffffff',
      startingXI: ['Gatito Fernández', 'Gustavo Velázquez', 'Gustavo Gómez', 'Omar Alderete', 'Júnior Alonso', 'Andrés Cubas', 'Ramón Sosa', 'Diego Gómez', 'Miguel Almirón', 'Antonio Sanabria', 'Julio Enciso'],
      squad: [
        ['Gatito Fernández', 38, 'GK', 'Paraguay', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Gustavo Velázquez', 35, 'DF', 'Paraguay', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Omar Alderete', 29, 'DF', 'Paraguay', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Juan José Cáceres', 26, 'DF', 'Paraguay', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Fabián Balbuena', 34, 'DF', 'Paraguay', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Júnior Alonso', 33, 'DF', 'Paraguay', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Ramón Sosa', 26, 'MF', 'Paraguay', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Diego Gómez', 23, 'MF', 'Paraguay', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Antonio Sanabria', 30, 'FW', 'Paraguay', 7, 4, 4, 8, 6, 7, 7, 7, 1],
        ['Miguel Almirón', 32, 'MF', 'Paraguay', 9, 5, 5, 7, 7, 8, 7, 4, 1],
        ['Maurício', 24, 'MF', 'Paraguay', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Orlando Gill', 26, 'GK', 'Paraguay', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['José Canale', 29, 'DF', 'Paraguay', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Andrés Cubas', 30, 'MF', 'Paraguay', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Gustavo Gómez', 33, 'DF', 'Paraguay', 8, 8, 8, 2, 9, 10, 9, 8, 3],
        ['Damián Bobadilla', 24, 'MF', 'Paraguay', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Kaku', 31, 'FW', 'Paraguay', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Álex Arce', 30, 'FW', 'Paraguay', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Julio Enciso', 22, 'FW', 'Paraguay', 8, 4, 4, 8, 7, 8, 7, 4, 1],
        ['Braian Ojeda', 25, 'MF', 'Paraguay', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Gabriel Ávalos', 34, 'FW', 'Paraguay', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Gastón Olveira', 33, 'GK', 'Paraguay', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Matías Galarza', 24, 'MF', 'Paraguay', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Gustavo Caballero', 24, 'MF', 'Paraguay', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Isidro Pitta', 26, 'FW', 'Paraguay', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Alexandro Maidana', 20, 'DF', 'Paraguay', 5, 6, 6, 3, 3, 2, 5, 6, 1],
      ],
    });
  }
}
