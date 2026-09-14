class Iraq extends AbstractTeam {
  static formation = {
    'Fahad Talib': [0, 3],
    'Rebin Sulaka': [2, 0],
    'Hussein Ali': [2, 2],
    'Zaid Tahseen': [2, 4],
    'Akam Hashim': [2, 6],
    'Youssef Amyn': [4, 0],
    'Ibrahim Bayesh': [4, 2],
    'Zidane Iqbal': [4, 4],
    'Amir Al-Ammari': [4, 6],
    'Ali Al-Hamadi': [6, 2],
    'Mohanad Ali': [6, 4],
  };

  constructor() {
    super({
      name: 'Iraq',
      level: 1,
      starPlayers: ['Aymen Hussein', 'Mohanad Ali', 'Ibrahim Bayesh', 'Youssef Amyn', 'Ali Jasim'],
      startingDeck: "defensive",
      extraActions: {"eureka":1},
      coach: 'Graham Arnold',
      artifacts: ["setPieceSpecialist"],
      primaryColor: '#c8102e',
      reserveColor: '#ffffff',
      shortsColor: '#ffffff',
      awayShortsColor: '#000000',
      startingXI: ['Fahad Talib', 'Rebin Sulaka', 'Hussein Ali', 'Zaid Tahseen', 'Akam Hashim', 'Youssef Amyn', 'Ibrahim Bayesh', 'Zidane Iqbal', 'Amir Al-Ammari', 'Ali Al-Hamadi', 'Mohanad Ali'],
      squad: [
        ['Fahad Talib', 31, 'GK', 'Iraq', 4, 8, 2, 1, 10, 4, 8, 4, 10],
        ['Rebin Sulaka', 34, 'DF', 'Iraq', 9, 10, 9, 5, 8, 4, 7, 8, 2],
        ['Hussein Ali', 24, 'DF', 'Iraq', 9, 9, 8, 4, 8, 4, 9, 10, 1],
        ['Zaid Tahseen', 25, 'DF', 'Iraq', 6, 10, 10, 3, 7, 8, 10, 7, 1],
        ['Akam Hashim', 27, 'DF', 'Iraq', 5, 9, 9, 4, 7, 5, 7, 8, 1],
        ['Manaf Younis', 29, 'DF', 'Iraq', 7, 10, 10, 3, 10, 6, 6, 8, 1],
        ['Youssef Amyn', 22, 'MF', 'Iraq', 8, 8, 8, 9, 10, 10, 8, 6, 2],
        ['Ibrahim Bayesh', 26, 'MF', 'Iraq', 10, 10, 7, 8, 10, 9, 10, 10, 1],
        ['Ali Al-Hamadi', 24, 'FW', 'Iraq', 10, 3, 5, 10, 7, 10, 9, 8, 1],
        ['Mohanad Ali', 25, 'FW', 'Iraq', 10, 2, 5, 10, 9, 10, 10, 10, 1],
        ['Ahmed Qasem', 22, 'FW', 'Iraq', 10, 2, 6, 10, 5, 10, 5, 9, 1],
        ['Jalal Hassan', 35, 'GK', 'Iraq', 4, 10, 1, 3, 7, 3, 10, 9, 10],
        ['Ali Yousif', 30, 'FW', 'Iraq', 9, 4, 3, 10, 5, 10, 5, 6, 1],
        ['Zidane Iqbal', 23, 'MF', 'Iraq', 8, 6, 6, 4, 10, 8, 10, 5, 1],
        ['Ahmed Maknzi', 24, 'DF', 'Iraq', 6, 8, 7, 3, 7, 4, 5, 9, 1],
        ['Amir Al-Ammari', 28, 'MF', 'Iraq', 10, 7, 8, 8, 10, 10, 10, 5, 2],
        ['Ali Jasim', 22, 'FW', 'Iraq', 10, 3, 4, 10, 10, 10, 10, 10, 1],
        ['Aymen Hussein', 30, 'FW', 'Iraq', 10, 3, 6, 10, 8, 10, 10, 10, 2],
        ['Kevin Yakob', 25, 'MF', 'Iraq', 10, 7, 8, 5, 8, 7, 10, 5, 2],
        ['Aimar Sher', 23, 'MF', 'Iraq', 9, 4, 6, 5, 10, 8, 10, 5, 1],
        ['Marko Farji', 22, 'FW', 'Iraq', 8, 3, 6, 10, 8, 9, 5, 6, 1],
        ['Ahmed Basil', 29, 'GK', 'Iraq', 3, 8, 3, 1, 7, 2, 8, 6, 10],
        ['Merchas Doski', 26, 'DF', 'Iraq', 9, 9, 10, 3, 10, 4, 8, 7, 1],
        ['Zaid Ismail', 24, 'MF', 'Iraq', 6, 4, 7, 3, 8, 7, 9, 5, 2],
        ['Mustafa Saadoon', 25, 'DF', 'Iraq', 9, 10, 9, 5, 8, 8, 8, 10, 1],
        ['Frans Putros', 32, 'DF', 'Iraq', 7, 9, 10, 5, 8, 5, 10, 10, 2]
      ],
    });
  }
}

module.exports = Iraq;