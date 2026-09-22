class Argentina extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[3, 3], [6, 1], [4, 1], [4, 5]],
    FW: [[5, 3], [6, 5]],
  };

  constructor() {
    super({
      name: 'Argentina',
      level: 3,
      starPlayers: ['Lionel Messi', 'Lautaro Martínez', 'Julián Alvarez', 'Rodrigo De Paul', 'Enzo Fernández'],
      startingDeck: "defensive",
      extraActions: { "dirty-tricks": 2, "argento-pride": 1, eureka: 1, "touch-of-magic": 1 },
      coach: 'Lionel Scaloni',
      primaryColor: '#75aadb',
      reserveColor: '#ffffff',
      shortsColor: '#000000',
      awayShortsColor: '#75aadb',
      startingXI: ['Emiliano Martínez', 'Nahuel Molina', 'Cristian Romero', 'Nicolás Otamendi', 'Nicolás Tagliafico', 'Rodrigo De Paul', 'Giovani Lo Celso', 'Enzo Fernández', 'Alexis Mac Allister', 'Lionel Messi', 'Lautaro Martínez'],
      squad: [
        ['Juan Musso', 32, 'GK', 'Argentina', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Marcos Senesi', 29, 'DF', 'Argentina', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Nicolás Tagliafico', 33, 'DF', 'Argentina', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Gonzalo Montiel', 29, 'DF', 'Argentina', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Leandro Paredes', 31, 'MF', 'Argentina', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Lisandro Martínez', 28, 'DF', 'Argentina', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Rodrigo De Paul', 32, 'MF', 'Argentina', 8, 7, 7, 7, 8, 8, 8, 5, 1],
        ['Valentín Barco', 21, 'MF', 'Argentina', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Julián Alvarez', 26, 'FW', 'Argentina', 8, 6, 5, 9, 8, 8, 7, 7, 1],
        ['Lionel Messi', 38, 'FW', 'Argentina', 8, 4, 3, 10, 10, 10, 10, 5, 1],
        ['Giovani Lo Celso', 30, 'MF', 'Argentina', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Gerónimo Rulli', 34, 'GK', 'Argentina', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Cristian Romero', 28, 'DF', 'Argentina', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Exequiel Palacios', 27, 'MF', 'Argentina', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Nicolás González', 28, 'MF', 'Argentina', 8, 7, 10, 9, 8, 8, 8, 9, 3],
        ['Thiago Almada', 25, 'FW', 'Argentina', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Giuliano Simeone', 23, 'FW', 'Argentina', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Nico Paz', 21, 'FW', 'Argentina', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Nicolás Otamendi', 38, 'DF', 'Argentina', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Alexis Mac Allister', 27, 'MF', 'Argentina', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['José Manuel López', 25, 'FW', 'Argentina', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Lautaro Martínez', 28, 'FW', 'Argentina', 8, 5, 4, 9, 8, 8, 8, 8, 1],
        ['Emiliano Martínez', 33, 'GK', 'Argentina', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Enzo Fernández', 25, 'MF', 'Argentina', 7, 8, 7, 8, 9, 8, 9, 6, 1],
        ['Facundo Medina', 27, 'DF', 'Argentina', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Nahuel Molina', 28, 'DF', 'Argentina', 7, 7, 7, 4, 5, 2, 6, 7, 1],
      ],
    });
  }
}
