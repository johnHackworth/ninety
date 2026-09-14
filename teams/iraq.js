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
      extraActions: { 'underdog-bite': 1 },
      coach: 'Graham Arnold',
      artifacts: ["minnowWill"],
      primaryColor: '#c8102e',
      reserveColor: '#ffffff',
      shortsColor: '#ffffff',
      awayShortsColor: '#000000',
      startingXI: ['Fahad Talib', 'Rebin Sulaka', 'Hussein Ali', 'Zaid Tahseen', 'Akam Hashim', 'Youssef Amyn', 'Ibrahim Bayesh', 'Zidane Iqbal', 'Amir Al-Ammari', 'Ali Al-Hamadi', 'Mohanad Ali'],
      squad: [
        ['Fahad Talib', 31, 'GK', 'Iraq', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Rebin Sulaka', 34, 'DF', 'Iraq', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Hussein Ali', 24, 'DF', 'Iraq', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Zaid Tahseen', 25, 'DF', 'Iraq', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Akam Hashim', 27, 'DF', 'Iraq', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Manaf Younis', 29, 'DF', 'Iraq', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Youssef Amyn', 22, 'MF', 'Iraq', 8, 8, 8, 9, 9, 10, 8, 6, 2]
        ['Ibrahim Bayesh', 26, 'MF', 'Iraq', 9, 9, 7, 8, 8, 8, 8, 10, 1]
        ['Ali Al-Hamadi', 24, 'FW', 'Iraq', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Mohanad Ali', 25, 'FW', 'Iraq', 8, 2, 5, 8, 9, 8, 10, 9, 1]
        ['Ahmed Qasem', 22, 'FW', 'Iraq', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Jalal Hassan', 35, 'GK', 'Iraq', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Ali Yousif', 30, 'FW', 'Iraq', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Zidane Iqbal', 23, 'MF', 'Iraq', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Ahmed Maknzi', 24, 'DF', 'Iraq', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Amir Al-Ammari', 28, 'MF', 'Iraq', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Ali Jasim', 22, 'FW', 'Iraq', 8, 3, 4, 8, 10, 8, 9, 9, 1]
        ['Aymen Hussein', 30, 'FW', 'Iraq', 8, 3, 6, 8, 8, 9, 10, 9, 2]
        ['Kevin Yakob', 25, 'MF', 'Iraq', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Aimar Sher', 23, 'MF', 'Iraq', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Marko Farji', 22, 'FW', 'Iraq', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Ahmed Basil', 29, 'GK', 'Iraq', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Merchas Doski', 26, 'DF', 'Iraq', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Zaid Ismail', 24, 'MF', 'Iraq', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Mustafa Saadoon', 25, 'DF', 'Iraq', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Frans Putros', 32, 'DF', 'Iraq', 5, 6, 6, 3, 3, 2, 5, 6, 1]
      ],
    });
  }
}
