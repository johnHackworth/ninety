class Morocco extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 3], [5, 0], [5, 2]],
    FW: [[5, 4], [6, 3], [5, 6]],
  };

  constructor() {
    super({
      name: 'Morocco',
      level: 3,
      starPlayers: ['Achraf Hakimi', 'Brahim Díaz', 'Bilal El Khannouss', 'Ayoub El Kaabi', 'Sofyan Amrabat'],
      startingDeck: "counter",
      extraActions: { eureka: 1, 'atlas-wall': 1, 'fortress-mentality': 1 },
      coach: 'Mohamed Ouahbi',
      artifacts: ["graniteWall"],
      primaryColor: '#c1272d',
      reserveColor: '#006233',
      shortsColor: '#006233',
      awayShortsColor: '#ffffff',
      startingXI: ['Yassine Bounou', 'Achraf Hakimi', 'Marwane Saâdane', 'Zakaria El Ouahdi', 'Noussair Mazraoui', 'Sofyan Amrabat', 'Azzedine Ounahi', 'Bilal El Khannouss', 'Brahim Díaz', 'Soufiane Rahimi', 'Ayoub El Kaabi'],
      squad: [
        ['Yassine Bounou', 35, 'GK', 'Morocco', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Achraf Hakimi', 27, 'DF', 'Morocco', 10, 7, 7, 7, 8, 9, 8, 6, 1],
        ['Noussair Mazraoui', 28, 'DF', 'Morocco', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Sofyan Amrabat', 29, 'MF', 'Morocco', 7, 8, 8, 6, 8, 7, 8, 6, 1],
        ['Marwane Saâdane', 34, 'DF', 'Morocco', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Ayyoub Bouaddi', 18, 'MF', 'Morocco', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Chemsdine Talbi', 21, 'MF', 'Morocco', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Azzedine Ounahi', 26, 'MF', 'Morocco', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Soufiane Rahimi', 30, 'FW', 'Morocco', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Brahim Díaz', 26, 'FW', 'Morocco', 8, 5, 5, 8, 8, 9, 8, 4, 1],
        ['Ismael Saibari', 25, 'MF', 'Morocco', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Munir Mohamedi', 37, 'GK', 'Morocco', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Zakaria El Ouahdi', 24, 'DF', 'Morocco', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Issa Diop', 29, 'DF', 'Morocco', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Samir El Mourabet', 20, 'MF', 'Morocco', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Gessime Yassine', 20, 'MF', 'Morocco', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Amine Sbaï', 25, 'FW', 'Morocco', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Chadi Riad', 22, 'DF', 'Morocco', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Youssef Belammari', 27, 'DF', 'Morocco', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Ayoub El Kaabi', 32, 'FW', 'Morocco', 8, 5, 5, 9, 7, 7, 7, 9, 1],
        ['Ayoube Amaimouni', 21, 'FW', 'Morocco', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Ahmed Reda Tagnaouti', 30, 'GK', 'Morocco', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Bilal El Khannouss', 22, 'MF', 'Morocco', 7, 5, 5, 8, 9, 9, 8, 4, 1],
        ['Neil El Aynaoui', 24, 'MF', 'Morocco', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Redouane Halhal', 23, 'DF', 'Morocco', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Anass Salah-Eddine', 24, 'DF', 'Morocco', 7, 7, 7, 4, 5, 2, 6, 7, 1],
      ],
    });
  }
}
