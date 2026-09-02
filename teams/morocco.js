class Morocco extends AbstractTeam {
  static formation = {
    'Bono': [0, 3],
    'Hakimi': [2, 0],
    'Aguerd': [2, 2],
    'Saïss': [2, 4],
    'Mazraoui': [2, 6],
    'Amrabat': [4, 3],
    'Ounahi': [5, 0],
    'El Khannous': [5, 2],
    'Brahim Díaz': [5, 4],
    'El Kaabi': [5, 6],
    'En-Nesyri': [6, 3],
  };

  constructor() {
    super({
      name: 'Morocco',
      level: 3,
  starPlayers: ['Hakimi', 'Brahim Díaz', 'Ziyech', 'En-Nesyri', 'Amrabat'],
      startingDeck: "counter",
      extraActions: { eureka: 1, 'atlas-wall': 1, 'fortress-mentality': 1 },
      coach: 'Walid Regragui',
      artifacts: [ 'graniteWall'],
      primaryColor: '#c1272d',
      reserveColor: '#ffffff',
      shortsColor: '#c1272d',
      awayShortsColor: '#ffffff',
      startingXI: ['Bono', 'Hakimi', 'Aguerd', 'Saïss', 'Mazraoui', 'Amrabat', 'Ounahi', 'El Khannous', 'Brahim Díaz', 'En-Nesyri', 'El Kaabi'],
      squad: [
        ['Bono', 35, 'GK', 'Morocco', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['Hakimi', 27, 'DF', 'Morocco', 10, 7, 7, 7, 8, 9, 8, 6, 1],
        ['Aguerd', 30, 'DF', 'Morocco', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Saïss', 36, 'DF', 'Morocco', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Mazraoui', 28, 'DF', 'Morocco', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Attiyat-Allah', 31, 'DF', 'Morocco', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Amrabat', 29, 'MF', 'Morocco', 7, 8, 8, 6, 8, 7, 8, 6, 1],
        ['Ounahi', 26, 'MF', 'Morocco', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['El Khannous', 22, 'MF', 'Morocco', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Brahim Díaz', 26, 'MF', 'Morocco', 8, 5, 5, 8, 8, 9, 8, 4, 1],
        ['Ziyech', 33, 'MF', 'Morocco', 7, 5, 5, 8, 9, 9, 8, 4, 1],
        ['Saibari', 25, 'MF', 'Morocco', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['En-Nesyri', 29, 'FW', 'Morocco', 8, 5, 5, 9, 7, 7, 7, 9, 1],
        ['El Kaabi', 33, 'FW', 'Morocco', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Rahimi', 30, 'FW', 'Morocco', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Ezzalzouli', 24, 'FW', 'Morocco', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Akhomach', 22, 'FW', 'Morocco', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Munir', 37, 'GK', 'Morocco', 4, 8, 3, 2, 8, 4, 7, 4, 9],
      ],
    });
  }
}
