class Argentina extends AbstractTeam {
  static formation = {
    'Juan Musso': [0, 3],
    'Marcos Senesi': [2, 0],
    'Nicolás Tagliafico': [2, 2],
    'Gonzalo Montiel': [2, 4],
    'Lisandro Martínez': [2, 6],
    'Leandro Paredes': [4, 0],
    'Rodrigo De Paul': [4, 2],
    'Valentín Barco': [4, 4],
    'Giovani Lo Celso': [4, 6],
    'Julián Alvarez': [6, 2],
    'Lionel Messi': [6, 4],
  };

  constructor() {
    super({
      name: 'Argentina',
      level: 3,
      starPlayers: ['Lionel Messi', 'Lautaro Martínez', 'Rodrigo De Paul', 'Nicolás González'],
      startingDeck: "defensive",
      extraActions: { "dirty-tricks": 2, "argento-pride": 1, eureka: 1, "touch-of-magic": 1 },
      coach: 'Lionel Scaloni',
      primaryColor: '#75aadb',
      reserveColor: '#ffffff',
      shortsColor: '#000000',
      awayShortsColor: '#75aadb',
      startingXI: ['Juan Musso', 'Marcos Senesi', 'Nicolás Tagliafico', 'Gonzalo Montiel', 'Lisandro Martínez', 'Leandro Paredes', 'Rodrigo De Paul', 'Valentín Barco', 'Giovani Lo Celso', 'Julián Alvarez', 'Lionel Messi'],
      squad: [
        ['Juan Musso', 32, 'GK', 'Argentina', 2, 7, 3, 1, 6, 4, 7, 6, 8],
        ['Marcos Senesi', 29, 'DF', 'Argentina', 5, 8, 6, 2, 7, 4, 8, 7, 1],
        ['Nicolás Tagliafico', 33, 'DF', 'Argentina', 10, 10, 10, 5, 8, 5, 10, 10, 1],
        ['Gonzalo Montiel', 29, 'DF', 'Argentina', 9, 10, 8, 2, 6, 5, 10, 9, 2],
        ['Leandro Paredes', 31, 'MF', 'Argentina', 9, 6, 10, 9, 10, 10, 8, 9, 1],
        ['Lisandro Martínez', 28, 'DF', 'Argentina', 9, 9, 9, 5, 10, 9, 8, 10, 3],
        ['Rodrigo De Paul', 32, 'MF', 'Argentina', 10, 6, 9, 10, 10, 10, 10, 8, 3],
        ['Valentín Barco', 21, 'MF', 'Argentina', 10, 6, 7, 5, 8, 8, 9, 7, 1],
        ['Julián Alvarez', 26, 'FW', 'Argentina', 10, 4, 4, 10, 10, 10, 10, 10, 1],
        ['Lionel Messi', 38, 'FW', 'Argentina', 10, 3, 7, 10, 10, 10, 9, 10, 1],
        ['Giovani Lo Celso', 30, 'MF', 'Argentina', 10, 6, 9, 10, 10, 8, 10, 9, 1],
        ['Gerónimo Rulli', 34, 'GK', 'Argentina', 3, 6, 3, 1, 6, 2, 8, 4, 9],
        ['Cristian Romero', 28, 'DF', 'Argentina', 8, 10, 10, 4, 7, 5, 8, 10, 1],
        ['Exequiel Palacios', 27, 'MF', 'Argentina', 10, 6, 8, 6, 10, 10, 10, 8, 1],
        ['Nicolás González', 28, 'MF', 'Argentina', 9, 7, 10, 10, 10, 9, 10, 9, 3],
        ['Thiago Almada', 25, 'FW', 'Argentina', 9, 1, 5, 10, 7, 8, 9, 6, 1],
        ['Giuliano Simeone', 23, 'FW', 'Argentina', 10, 3, 4, 10, 7, 8, 6, 6, 1],
        ['Nico Paz', 21, 'FW', 'Argentina', 8, 2, 4, 9, 9, 10, 7, 9, 1],
        ['Nicolás Otamendi', 38, 'DF', 'Argentina', 8, 10, 10, 5, 9, 5, 8, 10, 2],
        ['Alexis Mac Allister', 27, 'MF', 'Argentina', 8, 9, 10, 5, 10, 10, 8, 8, 1],
        ['José Manuel López', 25, 'FW', 'Argentina', 10, 2, 3, 9, 8, 9, 5, 4, 1],
        ['Lautaro Martínez', 28, 'FW', 'Argentina', 10, 7, 5, 10, 10, 10, 10, 9, 1],
        ['Emiliano Martínez', 33, 'GK', 'Argentina', 7, 8, 3, 1, 10, 4, 9, 10, 10],
        ['Enzo Fernández', 25, 'MF', 'Argentina', 10, 10, 9, 6, 10, 9, 9, 9, 2],
        ['Facundo Medina', 27, 'DF', 'Argentina', 9, 9, 6, 2, 8, 7, 7, 9, 2],
        ['Nahuel Molina', 28, 'DF', 'Argentina', 9, 10, 10, 6, 8, 5, 6, 10, 1]
      ],
    });
  }
}
