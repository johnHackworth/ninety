class Jordan extends AbstractTeam {
  static formation = {
    'Abulaila': [0, 3],
    'Ihsan Haddad': [2, 0],
    'Yazan Al-Arab': [2, 2],
    'Abdallah Nasib': [2, 4],
    'Mohammad Abu Hasheesh': [2, 6],
    'Rajaei Ayed': [4, 0],
    'Nizar Al-Rashdan': [4, 2],
    'Noor Al-Rawabdeh': [4, 4],
    'Ali Olwan': [4, 6],
    'Musa Al-Taamari': [6, 2],
    'Yazan Al-Naimat': [6, 4],
  };

  constructor() {
    super({
      name: 'Jordan',
      level: 0,
  starPlayers: ['Musa Al-Taamari', 'Nizar Al-Rashdan'],
      startingDeck: "defensive",
      extraActions: { 'underdog-bite': 1 },
      coach: 'Jamal Sellami',
      artifacts: [ 'minnowWill'],
      primaryColor: '#ffffff',
      reserveColor: '#e30613',
      shortsColor: '#ffffff',
      awayShortsColor: '#e30613',
      startingXI: ['Abulaila', 'Ihsan Haddad', 'Yazan Al-Arab', 'Abdallah Nasib', 'Mohammad Abu Hasheesh', 'Rajaei Ayed', 'Nizar Al-Rashdan', 'Noor Al-Rawabdeh', 'Ali Olwan', 'Musa Al-Taamari', 'Yazan Al-Naimat'],
      squad: [
        ['Abulaila', 33, 'GK', 'Jordan', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Juaidi', 25, 'GK', 'Jordan', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Ihsan Haddad', 30, 'DF', 'Jordan', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Yazan Al-Arab', 30, 'DF', 'Jordan', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Abdallah Nasib', 32, 'DF', 'Jordan', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Mohammad Abu Hasheesh', 31, 'DF', 'Jordan', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Salem Al-Ajalin', 38, 'DF', 'Jordan', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Rajaei Ayed', 33, 'MF', 'Jordan', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Nizar Al-Rashdan', 27, 'MF', 'Jordan', 6, 6, 6, 6, 7, 6, 6, 5, 1],
        ['Noor Al-Rawabdeh', 29, 'MF', 'Jordan', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Ali Olwan', 38, 'MF', 'Jordan', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Mahmoud Al-Mardi', 35, 'MF', 'Jordan', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Anas Al-Awadat', 28, 'MF', 'Jordan', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Musa Al-Taamari', 29, 'FW', 'Jordan', 8, 4, 4, 7, 7, 8, 7, 4, 1],
        ['Yazan Al-Naimat', 27, 'FW', 'Jordan', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Hamza Al-Dardour', 35, 'FW', 'Jordan', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Reziq Bani Hani', 24, 'FW', 'Jordan', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Ali Alwan', 26, 'FW', 'Jordan', 5, 2, 1, 6, 5, 5, 4, 4, 1],
      ],
    });
  }
}
