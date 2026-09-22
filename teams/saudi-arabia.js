class SaudiArabia extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4]],
    FW: [[4, 6], [6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Saudi Arabia',
      level: 1,
      starPlayers: ['Salem Al-Dawsari', 'Mohamed Kanno'],
      startingDeck: "counter",
      extraActions: {"teranga-roar":1},
      coach: 'Georgios Donis',
      primaryColor: '#006c35',
      reserveColor: '#ffffff',
      shortsColor: '#006c35',
      awayShortsColor: '#ffffff',
      startingXI: ['Mohammed Al-Owais', 'Ali Majrashi', 'Ali Lajami', 'Hassan Al-Tambakti', 'Abdulelah Al-Amri', 'Mohamed Kanno', 'Musab Al-Juwayr', 'Nasser Al-Dawsari', 'Salem Al-Dawsari', 'Firas Al-Buraikan', 'Saleh Al-Shehri'],
      squad: [
        ['Nawaf Al-Aqidi', 26, 'GK', 'Saudi Arabia', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Ali Majrashi', 26, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Ali Lajami', 30, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Abdulelah Al-Amri', 29, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Hassan Al-Tambakti', 27, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Nasser Al-Dawsari', 27, 'MF', 'Saudi Arabia', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Musab Al-Juwayr', 22, 'MF', 'Saudi Arabia', 8, 10, 7, 9, 8, 8, 8, 9, 1],
        ['Ayman Yahya', 25, 'FW', 'Saudi Arabia', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Firas Al-Buraikan', 26, 'FW', 'Saudi Arabia', 8, 4, 5, 8, 10, 8, 9, 9, 1],
        ['Salem Al-Dawsari', 34, 'FW', 'Saudi Arabia', 8, 4, 4, 8, 7, 8, 7, 4, 1],
        ['Saleh Al-Shehri', 32, 'FW', 'Saudi Arabia', 8, 5, 8, 8, 8, 9, 10, 9, 1],
        ['Saud Abdulhamid', 26, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Nawaf Boushal', 26, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Hassan Kadesh', 33, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Abdullah Al-Khaibari', 29, 'MF', 'Saudi Arabia', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Ziyad Al-Johani', 24, 'MF', 'Saudi Arabia', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Khalid Al-Ghannam', 25, 'FW', 'Saudi Arabia', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Alaa Al-Hejji', 30, 'MF', 'Saudi Arabia', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Abdullah Al-Hamdan', 26, 'FW', 'Saudi Arabia', 8, 6, 4, 8, 10, 8, 9, 9, 1],
        ['Sultan Mandash', 31, 'FW', 'Saudi Arabia', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Mohammed Al-Owais', 34, 'GK', 'Saudi Arabia', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Ahmed Al-Kassar', 35, 'GK', 'Saudi Arabia', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Mohamed Kanno', 31, 'MF', 'Saudi Arabia', 6, 7, 7, 6, 7, 6, 7, 6, 1],
        ['Moteb Al-Harbi', 26, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Jehad Thakri', 24, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Mohammed Abu Al-Shamat', 23, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
      ],
    });
  }
}
