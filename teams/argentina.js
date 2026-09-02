class Argentina extends AbstractTeam {
  static formation = {
    'E. Martínez': [0, 3],
    'Molina': [2, 0],
    'Romero': [2, 2],
    'Otamendi': [2, 4],
    'Tagliafico': [2, 6],
    'Enzo Fernández': [4, 1],
    'De Paul': [3, 3],
    'Mac Allister': [4, 5],
    'Lo Celso': [6, 1],
    'Messi': [5, 3],
    'Lautaro Martínez': [6, 5],
  };

  constructor() {
    super({
      name: 'Argentina',
      level: 3,
  starPlayers: ['Messi', 'Lautaro Martínez', 'Julián Álvarez', 'De Paul', 'Enzo Fernández'],
      startingDeck: "defensive",
      extraActions: { "dirty-tricks": 2, "argento-pride": 1, eureka: 1, "touch-of-magic": 1 },
      coach: 'Lionel Scaloni',
      primaryColor: '#74acdf',
      reserveColor: '#f5f5f5',
      shortsColor: '#1a2e5f',
      awayShortsColor: '#000000',
      startingXI: ['E. Martínez', 'Molina', 'Romero', 'Otamendi', 'Tagliafico', 'De Paul', 'Lo Celso', 'Enzo Fernández', 'Mac Allister', 'Messi', 'Lautaro Martínez'],
      squad: [
        ['E. Martínez', 34, 'GK', 'Argentina', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['Molina', 28, 'DF', 'Argentina', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Romero', 28, 'DF', 'Argentina', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Otamendi', 38, 'DF', 'Argentina', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Tagliafico', 34, 'DF', 'Argentina', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['De Paul', 32, 'MF', 'Argentina', 8, 7, 7, 7, 8, 8, 8, 5, 1],
        ['Enzo Fernández', 25, 'MF', 'Argentina', 7, 8, 7, 8, 9, 8, 9, 6, 1],
        ['Mac Allister', 27, 'MF', 'Argentina', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Messi', 39, 'FW', 'Argentina', 8, 4, 3, 10, 10, 10, 10, 5, 1],
        ['Lautaro Martínez', 29, 'FW', 'Argentina', 8, 5, 4, 9, 8, 8, 8, 8, 1],
        ['Julián Álvarez', 26, 'FW', 'Argentina', 8, 6, 5, 9, 8, 8, 7, 7, 1],
        ['Rulli', 34, 'GK', 'Argentina', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['Lisandro Martínez', 28, 'DF', 'Argentina', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Montiel', 29, 'DF', 'Argentina', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Paredes', 32, 'MF', 'Argentina', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Lo Celso', 30, 'MF', 'Argentina', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Di María', 38, 'FW', 'Argentina', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Palacios', 28, 'MF', 'Argentina', 7, 7, 7, 7, 9, 8, 8, 6, 2],
      ],
    });
  }
}
