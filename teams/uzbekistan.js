class Uzbekistan extends AbstractTeam {
  static formation = {
    'Yusupov': [0, 3],
    'Alijonov': [2, 0],
    'Khusanov': [2, 2],
    'Ashurmatov': [2, 4],
    'Eshmurodov': [2, 6],
    'Shukurov': [4, 0],
    'Khamrobekov': [4, 2],
    'Masharipov': [4, 4],
    'Fayzullaev': [4, 6],
    'Shomurodov': [6, 2],
    'Sergeev': [6, 4],
  };

  constructor() {
    super({
      name: 'Uzbekistan',
      level: 0,
  starPlayers: ['Khusanov', 'Fayzullaev'],
      startingDeck: "counter",
      coach: 'Srečko Katanec',
      primaryColor: '#ffffff',
      reserveColor: '#0a7fc2',
      shortsColor: '#0a7fc2',
      awayShortsColor: '#ffffff',
      startingXI: ['Yusupov', 'Alijonov', 'Khusanov', 'Ashurmatov', 'Eshmurodov', 'Shukurov', 'Khamrobekov', 'Masharipov', 'Fayzullaev', 'Shomurodov', 'Sergeev'],
      squad: [
        ['Yusupov', 35, 'GK', 'Uzbekistan', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Nematov', 25, 'GK', 'Uzbekistan', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Alijonov', 29, 'DF', 'Uzbekistan', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Khusanov', 22, 'DF', 'Uzbekistan', 8, 8, 8, 3, 6, 5, 7, 7, 1],
        ['Ashurmatov', 30, 'DF', 'Uzbekistan', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Eshmurodov', 26, 'DF', 'Uzbekistan', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Aliqulov', 27, 'DF', 'Uzbekistan', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Shukurov', 30, 'MF', 'Uzbekistan', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Khamrobekov', 30, 'MF', 'Uzbekistan', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Masharipov', 33, 'MF', 'Uzbekistan', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Fayzullaev', 23, 'MF', 'Uzbekistan', 8, 4, 4, 7, 8, 8, 7, 4, 1],
        ['Erkinov', 25, 'MF', 'Uzbekistan', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Kholmatov', 24, 'MF', 'Uzbekistan', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Shomurodov', 31, 'FW', 'Uzbekistan', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Sergeev', 33, 'FW', 'Uzbekistan', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Turgunboev', 32, 'FW', 'Uzbekistan', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Abdikholikov', 29, 'FW', 'Uzbekistan', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Rashidov', 35, 'FW', 'Uzbekistan', 5, 2, 1, 6, 5, 5, 4, 4, 1],
      ],
    });
  }
}
