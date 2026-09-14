class SaudiArabia extends AbstractTeam {
  static formation = {
    'Nawaf Al-Aqidi': [0, 3],
    'Ali Majrashi': [2, 0],
    'Ali Lajami': [2, 2],
    'Abdulelah Al-Amri': [2, 4],
    'Hassan Al-Tambakti': [2, 6],
    'Nasser Al-Dawsari': [4, 0],
    'Musab Al-Juwayr': [4, 2],
    'Abdullah Al-Khaibari': [4, 4],
    'Ziyad Al-Johani': [4, 6],
    'Ayman Yahya': [6, 2],
    'Firas Al-Buraikan': [6, 4],
  };

  constructor() {
    super({
      name: 'Saudi Arabia',
      level: 1,
      starPlayers: ['Musab Al-Juwayr', 'Saleh Al-Shehri', 'Firas Al-Buraikan', 'Abdullah Al-Hamdan', 'Salem Al-Dawsari'],
      startingDeck: "counter",
      extraActions: {"teranga-roar":1},
      coach: 'Georgios Donis',
      primaryColor: '#006c35',
      reserveColor: '#ffffff',
      shortsColor: '#006c35',
      awayShortsColor: '#ffffff',
      startingXI: ['Nawaf Al-Aqidi', 'Ali Majrashi', 'Ali Lajami', 'Abdulelah Al-Amri', 'Hassan Al-Tambakti', 'Nasser Al-Dawsari', 'Musab Al-Juwayr', 'Abdullah Al-Khaibari', 'Ziyad Al-Johani', 'Ayman Yahya', 'Firas Al-Buraikan'],
      squad: [
        ['Nawaf Al-Aqidi', 26, 'GK', 'Saudi Arabia', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Ali Majrashi', 26, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Ali Lajami', 30, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Abdulelah Al-Amri', 29, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Hassan Al-Tambakti', 27, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Nasser Al-Dawsari', 27, 'MF', 'Saudi Arabia', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Musab Al-Juwayr', 22, 'MF', 'Saudi Arabia', 8, 10, 7, 9, 8, 8, 8, 9, 1]
        ['Ayman Yahya', 25, 'FW', 'Saudi Arabia', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Firas Al-Buraikan', 26, 'FW', 'Saudi Arabia', 8, 4, 5, 8, 10, 8, 9, 9, 1]
        ['Salem Al-Dawsari', 34, 'FW', 'Saudi Arabia', 8, 2, 5, 8, 10, 9, 8, 9, 1]
        ['Saleh Al-Shehri', 32, 'FW', 'Saudi Arabia', 8, 5, 8, 8, 8, 9, 10, 9, 1]
        ['Saud Abdulhamid', 26, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Nawaf Boushal', 26, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Hassan Kadesh', 33, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Abdullah Al-Khaibari', 29, 'MF', 'Saudi Arabia', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Ziyad Al-Johani', 24, 'MF', 'Saudi Arabia', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Khalid Al-Ghannam', 25, 'FW', 'Saudi Arabia', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Alaa Al-Hejji', 30, 'MF', 'Saudi Arabia', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Abdullah Al-Hamdan', 26, 'FW', 'Saudi Arabia', 8, 6, 4, 8, 10, 8, 9, 9, 1]
        ['Sultan Mandash', 31, 'FW', 'Saudi Arabia', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Mohammed Al-Owais', 34, 'GK', 'Saudi Arabia', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Ahmed Al-Kassar', 35, 'GK', 'Saudi Arabia', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Mohamed Kanno', 31, 'MF', 'Saudi Arabia', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Moteb Al-Harbi', 26, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Jehad Thakri', 24, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Mohammed Abu Al-Shamat', 23, 'DF', 'Saudi Arabia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
      ],
    });
  }
}
