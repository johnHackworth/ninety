class Qatar extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6], [4, 0]],
    MF: [[4, 2], [4, 4], [4, 6]],
    FW: [[6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Qatar',
      level: 1,
      starPlayers: ['Akram Afif', 'Almoez Ali'],
      startingDeck: "defensive",
      extraActions: { 'underdog-bite': 1 },
      coach: 'Julen Lopetegui',
      artifacts: ["minnowWill"],
      primaryColor: '#8a1538',
      reserveColor: '#ffffff',
      shortsColor: '#8a1538',
      awayShortsColor: '#ffffff',
      startingXI: ['Meshaal Barsham', 'Pedro Miguel', 'Lucas Mendes', 'Boualem Khoukhi', 'Homam Ahmed', 'Jassem Gaber', 'Abdulaziz Hatem', 'Karim Boudiaf', 'Ahmed Al-Ganehi', 'Akram Afif', 'Almoez Ali'],
      squad: [
        ['Mahmud Abunada', 26, 'GK', 'Qatar', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Pedro Miguel', 35, 'DF', 'Qatar', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Lucas Mendes', 35, 'DF', 'Qatar', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Issa Laye', 28, 'DF', 'Qatar', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Jassem Gaber', 24, 'DF', 'Qatar', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Abdulaziz Hatem', 36, 'MF', 'Qatar', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Ahmed Alaaeldin', 33, 'FW', 'Qatar', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Edmilson Junior', 31, 'FW', 'Qatar', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Mohammed Muntari', 32, 'FW', 'Qatar', 8, 6, 4, 8, 10, 8, 9, 9, 1],
        ['Hassan Al-Haydos', 35, 'FW', 'Qatar', 8, 5, 5, 8, 10, 8, 9, 9, 1],
        ['Akram Afif', 29, 'FW', 'Qatar', 8, 4, 4, 8, 7, 9, 7, 5, 1],
        ['Karim Boudiaf', 35, 'MF', 'Qatar', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Ayoub Al-Oui', 21, 'DF', 'Qatar', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Homam Ahmed', 26, 'DF', 'Qatar', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Yusuf Abdurisag', 26, 'FW', 'Qatar', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Boualem Khoukhi', 35, 'DF', 'Qatar', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Ahmed Al-Ganehi', 25, 'MF', 'Qatar', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Sultan Al-Brake', 30, 'DF', 'Qatar', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Almoez Ali', 29, 'FW', 'Qatar', 7, 4, 4, 8, 6, 7, 6, 6, 1],
        ['Ahmed Fathy', 33, 'MF', 'Qatar', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Salah Zakaria', 27, 'GK', 'Qatar', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Meshaal Barsham', 28, 'GK', 'Qatar', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Assim Madibo', 29, 'MF', 'Qatar', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Tahsin Jamshid', 19, 'FW', 'Qatar', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Al-Hashmi Al-Hussain', 22, 'DF', 'Qatar', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Mohamed Manai', 23, 'FW', 'Qatar', 5, 2, 2, 7, 4, 4, 4, 6, 1],
      ],
    });
  }
}
