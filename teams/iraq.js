class Iraq extends AbstractTeam {
  static formation = {
    'Jalal Hassan': [0, 3],
    'Merchas Doski': [2, 0],
    'Rebin Sulaka': [2, 2],
    'Zaid Tahseen': [2, 4],
    'Hussein Ali': [2, 6],
    'Amir Al-Ammari': [4, 0],
    'Ibrahim Bayesh': [4, 2],
    'Osama Rashid': [4, 4],
    'Zidane Iqbal': [4, 6],
    'Aymen Hussein': [6, 2],
    'Mohanad Ali': [6, 4],
  };

  constructor() {
    super({
      name: 'Iraq',
      level: 0,
  starPlayers: ['Zidane Iqbal', 'Amir Al-Ammari'],
      startingDeck: "defensive",
      extraActions: { 'underdog-bite': 1 },
      coach: 'Graham Arnold',
      artifacts: [ 'minnowWill'],
      primaryColor: '#ffffff',
      reserveColor: '#0e7a3c',
      shortsColor: '#ffffff',
      awayShortsColor: '#0e7a3c',
      startingXI: ['Jalal Hassan', 'Merchas Doski', 'Rebin Sulaka', 'Zaid Tahseen', 'Hussein Ali', 'Amir Al-Ammari', 'Ibrahim Bayesh', 'Osama Rashid', 'Zidane Iqbal', 'Aymen Hussein', 'Mohanad Ali'],
      squad: [
        ['Jalal Hassan', 35, 'GK', 'Iraq', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Ahmed Basil', 30, 'GK', 'Iraq', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Merchas Doski', 27, 'DF', 'Iraq', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Rebin Sulaka', 34, 'DF', 'Iraq', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Zaid Tahseen', 25, 'DF', 'Iraq', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Hussein Ali', 24, 'DF', 'Iraq', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Dhurgham Ismail', 32, 'DF', 'Iraq', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Amir Al-Ammari', 29, 'MF', 'Iraq', 6, 6, 6, 6, 7, 6, 6, 5, 1],
        ['Ibrahim Bayesh', 26, 'MF', 'Iraq', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Osama Rashid', 34, 'MF', 'Iraq', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Zidane Iqbal', 23, 'MF', 'Iraq', 7, 5, 5, 6, 7, 7, 6, 4, 1],
        ['Youssef Amyn', 23, 'MF', 'Iraq', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Bashar Resan', 30, 'MF', 'Iraq', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Aymen Hussein', 30, 'FW', 'Iraq', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Mohanad Ali', 26, 'FW', 'Iraq', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Ali Jasim', 22, 'FW', 'Iraq', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Ali Al-Hamadi', 24, 'FW', 'Iraq', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Ahmed Yasin', 37, 'FW', 'Iraq', 5, 2, 1, 6, 5, 5, 4, 4, 1],
      ],
    });
  }
}
