class Jordan extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4]],
    FW: [[4, 6], [6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Jordan',
      level: 1,
      starPlayers: ['Musa Al-Taamari', 'Nizar Al-Rashdan'],
      startingDeck: "defensive",
      extraActions: { 'underdog-bite': 1 },
      coach: 'Jamal Sellami',
      artifacts: ["minnowWill"],
      primaryColor: '#ce1126',
      reserveColor: '#000000',
      shortsColor: '#000000',
      awayShortsColor: '#ffffff',
      startingXI: ['Yazeed Abulaila', 'Ihsan Haddad', 'Yazan Al-Arab', 'Abdallah Nasib', 'Mohammad Abu Hashish', 'Rajaei Ayed', 'Nizar Al-Rashdan', 'Noor Al-Rawabdeh', 'Ali Olwan', 'Musa Al-Taamari', 'Mohammad Abu Zrayq'],
      squad: [
        ['Yazeed Abulaila', 33, 'GK', 'Jordan', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Mohammad Abu Hashish', 31, 'DF', 'Jordan', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Abdallah Nasib', 32, 'DF', 'Jordan', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Husam Abu Dahab', 26, 'DF', 'Jordan', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Yazan Al-Arab', 30, 'DF', 'Jordan', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Amer Jamous', 23, 'MF', 'Jordan', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Mohammad Abu Zrayq', 28, 'FW', 'Jordan', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Noor Al-Rawabdeh', 29, 'MF', 'Jordan', 9, 9, 8, 7, 8, 8, 8, 10, 2],
        ['Ali Olwan', 26, 'FW', 'Jordan', 8, 6, 8, 8, 10, 9, 9, 8, 1],
        ['Musa Al-Taamari', 29, 'FW', 'Jordan', 8, 4, 4, 7, 7, 8, 7, 4, 1],
        ['Odeh Al-Fakhouri', 20, 'FW', 'Jordan', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Nour Bani Attiah', 33, 'GK', 'Jordan', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Mahmoud Al-Mardi', 32, 'FW', 'Jordan', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Rajaei Ayed', 32, 'MF', 'Jordan', 8, 9, 10, 7, 8, 8, 8, 9, 2],
        ['Ibrahim Sadeh', 26, 'MF', 'Jordan', 8, 9, 10, 8, 8, 8, 8, 9, 1],
        ['Mo Abualnadi', 25, 'DF', 'Jordan', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Salim Obaid', 34, 'DF', 'Jordan', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Mohammad Taha', 20, 'MF', 'Jordan', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Saed Al-Rosan', 29, 'DF', 'Jordan', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Mohannad Abu Taha', 23, 'MF', 'Jordan', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Nizar Al-Rashdan', 27, 'MF', 'Jordan', 6, 6, 6, 6, 7, 6, 6, 5, 1],
        ['Abdallah Al-Fakhouri', 26, 'GK', 'Jordan', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Ihsan Haddad', 32, 'DF', 'Jordan', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Ali Azaizeh', 22, 'FW', 'Jordan', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Mohammad Al-Dawoud', 34, 'MF', 'Jordan', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Anas Badawi', 28, 'DF', 'Jordan', 5, 6, 6, 3, 3, 2, 5, 6, 1],
      ],
    });
  }
}
