class Paraguay extends AbstractTeam {
  static formation = {
    'Gatito Fernández': [0, 3],
    'Gustavo Velázquez': [2, 0],
    'Omar Alderete': [2, 2],
    'Juan José Cáceres': [2, 4],
    'Fabián Balbuena': [2, 6],
    'Ramón Sosa': [4, 0],
    'Diego Gómez': [4, 2],
    'Miguel Almirón': [4, 4],
    'Maurício': [4, 6],
    'Antonio Sanabria': [6, 2],
    'Kaku': [6, 4],
  };

  constructor() {
    super({
      name: 'Paraguay',
      level: 1,
      starPlayers: ['Miguel Almirón', 'Gustavo Gómez', 'Julio Enciso'],
      startingDeck: "defensive",
      extraActions: {"ouch":1},
      coach: 'Gustavo Alfaro',
      primaryColor: '#ce1126',
      reserveColor: '#ffffff',
      shortsColor: '#003087',
      awayShortsColor: '#ffffff',
      startingXI: ['Gatito Fernández', 'Gustavo Velázquez', 'Omar Alderete', 'Juan José Cáceres', 'Fabián Balbuena', 'Ramón Sosa', 'Diego Gómez', 'Miguel Almirón', 'Maurício', 'Antonio Sanabria', 'Kaku'],
      squad: [
        ['Gatito Fernández', 38, 'GK', 'Paraguay', 3, 9, 4, 1, 5, 2, 8, 7, 9],
        ['Gustavo Velázquez', 35, 'DF', 'Paraguay', 5, 9, 9, 4, 7, 6, 8, 8, 1],
        ['Omar Alderete', 29, 'DF', 'Paraguay', 7, 10, 9, 5, 8, 8, 6, 10, 1],
        ['Juan José Cáceres', 26, 'DF', 'Paraguay', 5, 9, 8, 4, 5, 8, 10, 9, 1],
        ['Fabián Balbuena', 34, 'DF', 'Paraguay', 7, 10, 10, 5, 9, 5, 10, 9, 2],
        ['Júnior Alonso', 33, 'DF', 'Paraguay', 8, 9, 9, 6, 10, 5, 8, 10, 1],
        ['Ramón Sosa', 26, 'MF', 'Paraguay', 10, 9, 6, 6, 9, 10, 10, 5, 1],
        ['Diego Gómez', 23, 'MF', 'Paraguay', 8, 8, 7, 4, 9, 9, 7, 7, 2],
        ['Antonio Sanabria', 30, 'FW', 'Paraguay', 10, 4, 8, 10, 10, 10, 8, 10, 1],
        ['Miguel Almirón', 32, 'MF', 'Paraguay', 10, 8, 10, 10, 9, 9, 10, 5, 1],
        ['Maurício', 24, 'MF', 'Paraguay', 5, 7, 6, 5, 8, 9, 6, 7, 1],
        ['Orlando Gill', 26, 'GK', 'Paraguay', 3, 7, 4, 2, 6, 1, 8, 6, 8],
        ['José Canale', 29, 'DF', 'Paraguay', 8, 8, 6, 3, 8, 6, 6, 8, 2],
        ['Andrés Cubas', 30, 'MF', 'Paraguay', 10, 7, 6, 9, 10, 10, 10, 9, 2],
        ['Gustavo Gómez', 33, 'DF', 'Paraguay', 8, 10, 10, 2, 10, 10, 10, 10, 3],
        ['Damián Bobadilla', 24, 'MF', 'Paraguay', 6, 8, 6, 4, 9, 10, 7, 7, 1],
        ['Kaku', 31, 'FW', 'Paraguay', 10, 6, 4, 10, 10, 10, 7, 10, 1],
        ['Álex Arce', 30, 'FW', 'Paraguay', 9, 3, 3, 10, 6, 9, 8, 5, 1],
        ['Julio Enciso', 22, 'FW', 'Paraguay', 10, 4, 4, 10, 10, 10, 10, 10, 1],
        ['Braian Ojeda', 25, 'MF', 'Paraguay', 6, 7, 8, 6, 9, 6, 8, 8, 1],
        ['Gabriel Ávalos', 34, 'FW', 'Paraguay', 8, 4, 3, 9, 6, 10, 8, 7, 1],
        ['Gastón Olveira', 33, 'GK', 'Paraguay', 3, 6, 2, 2, 7, 3, 7, 5, 10],
        ['Matías Galarza', 24, 'MF', 'Paraguay', 10, 6, 9, 5, 9, 6, 10, 5, 1],
        ['Gustavo Caballero', 24, 'MF', 'Paraguay', 8, 5, 7, 3, 8, 7, 7, 6, 1],
        ['Isidro Pitta', 26, 'FW', 'Paraguay', 7, 2, 4, 8, 8, 7, 6, 8, 1],
        ['Alexandro Maidana', 20, 'DF', 'Paraguay', 9, 10, 8, 1, 5, 6, 5, 7, 1]
      ],
    });
  }
}
