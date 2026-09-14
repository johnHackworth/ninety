class Qatar extends AbstractTeam {
  static formation = {
    'Mahmud Abunada': [0, 3],
    'Pedro Miguel': [2, 0],
    'Lucas Mendes': [2, 2],
    'Issa Laye': [2, 4],
    'Jassem Gaber': [2, 6],
    'Abdulaziz Hatem': [4, 0],
    'Karim Boudiaf': [4, 2],
    'Ahmed Al-Ganehi': [4, 4],
    'Ahmed Fathy': [4, 6],
    'Ahmed Alaaeldin': [6, 2],
    'Edmilson Junior': [6, 4],
  };

  constructor() {
    super({
      name: 'Qatar',
      level: 1,
      starPlayers: ['Almoez Ali', 'Akram Afif', 'Hassan Al-Haydos', 'Mohammed Muntari'],
      startingDeck: "aggressive",
      extraActions: {"eureka":1},
      coach: 'Julen Lopetegui',
      artifacts: ["setPieceSpecialist"],
      primaryColor: '#8a1538',
      reserveColor: '#ffffff',
      shortsColor: '#8a1538',
      awayShortsColor: '#ffffff',
      startingXI: ['Mahmud Abunada', 'Pedro Miguel', 'Lucas Mendes', 'Issa Laye', 'Jassem Gaber', 'Abdulaziz Hatem', 'Karim Boudiaf', 'Ahmed Al-Ganehi', 'Ahmed Fathy', 'Ahmed Alaaeldin', 'Edmilson Junior'],
      squad: [
        ['Mahmud Abunada', 26, 'GK', 'Qatar', 4, 8, 2, 1, 7, 1, 10, 5, 10],
        ['Pedro Miguel', 35, 'DF', 'Qatar', 8, 10, 10, 5, 9, 6, 10, 10, 3],
        ['Lucas Mendes', 35, 'DF', 'Qatar', 9, 7, 10, 3, 7, 4, 6, 10, 1],
        ['Issa Laye', 28, 'DF', 'Qatar', 6, 7, 8, 4, 8, 6, 8, 7, 1],
        ['Jassem Gaber', 24, 'DF', 'Qatar', 7, 10, 10, 5, 7, 5, 9, 10, 1],
        ['Abdulaziz Hatem', 36, 'MF', 'Qatar', 10, 6, 9, 4, 10, 8, 9, 7, 1],
        ['Ahmed Alaaeldin', 33, 'FW', 'Qatar', 10, 6, 6, 10, 7, 10, 8, 10, 2],
        ['Edmilson Junior', 31, 'FW', 'Qatar', 10, 1, 3, 10, 7, 10, 5, 7, 1],
        ['Mohammed Muntari', 32, 'FW', 'Qatar', 10, 6, 4, 10, 10, 10, 10, 9, 1],
        ['Hassan Al-Haydos', 35, 'FW', 'Qatar', 10, 5, 5, 10, 10, 10, 10, 9, 1],
        ['Akram Afif', 29, 'FW', 'Qatar', 10, 3, 7, 10, 9, 10, 10, 8, 1],
        ['Karim Boudiaf', 35, 'MF', 'Qatar', 10, 9, 10, 7, 10, 10, 10, 4, 1],
        ['Ayoub Al-Oui', 21, 'DF', 'Qatar', 8, 8, 9, 5, 6, 4, 5, 9, 1],
        ['Homam Ahmed', 26, 'DF', 'Qatar', 7, 10, 10, 6, 10, 10, 10, 10, 1],
        ['Yusuf Abdurisag', 26, 'FW', 'Qatar', 10, 3, 7, 10, 10, 10, 8, 8, 1],
        ['Boualem Khoukhi', 35, 'DF', 'Qatar', 10, 8, 10, 5, 8, 9, 10, 9, 1],
        ['Ahmed Al-Ganehi', 25, 'MF', 'Qatar', 10, 7, 7, 7, 9, 9, 10, 7, 2],
        ['Sultan Al-Brake', 30, 'DF', 'Qatar', 7, 10, 10, 3, 5, 5, 8, 10, 2],
        ['Almoez Ali', 29, 'FW', 'Qatar', 10, 2, 6, 10, 10, 10, 10, 9, 1],
        ['Ahmed Fathy', 33, 'MF', 'Qatar', 10, 9, 8, 7, 10, 10, 8, 7, 1],
        ['Salah Zakaria', 27, 'GK', 'Qatar', 4, 7, 4, 2, 5, 3, 8, 4, 9],
        ['Meshaal Barsham', 28, 'GK', 'Qatar', 4, 10, 6, 3, 8, 4, 9, 8, 10],
        ['Assim Madibo', 29, 'MF', 'Qatar', 10, 6, 9, 5, 10, 10, 10, 5, 1],
        ['Tahsin Jamshid', 19, 'FW', 'Qatar', 10, 4, 5, 8, 5, 10, 7, 8, 1],
        ['Al-Hashmi Al-Hussain', 22, 'DF', 'Qatar', 9, 8, 6, 4, 7, 7, 8, 8, 2],
        ['Mohamed Manai', 23, 'FW', 'Qatar', 9, 4, 3, 10, 6, 8, 8, 8, 1]
      ],
    });
  }
}

module.exports = Qatar;