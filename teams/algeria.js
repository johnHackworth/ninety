class Algeria extends AbstractTeam {
  static formation = {
    'Melvin Mastil': [0, 3],
    'Aïssa Mandi': [2, 0],
    'Achref Abada': [2, 2],
    'Mohamed Amine Tougai': [2, 4],
    'Zineddine Belaïd': [2, 6],
    'Ramiz Zerrouki': [4, 0],
    'Houssem Aouar': [4, 2],
    'Farès Chaïbi': [4, 4],
    'Hicham Boudaoui': [4, 6],
    'Riyad Mahrez': [6, 2],
    'Amine Gouiri': [6, 4],
  };

  constructor() {
    super({
      name: 'Algeria',
      level: 1,
      starPlayers: ['Riyad Mahrez', 'Ramy Bensebaini', 'Mohamed Amoura', 'Nabil Bentaleb'],
      startingDeck: "counter",
      coach: 'Vladimir Petković',
      primaryColor: '#006233',
      reserveColor: '#ffffff',
      shortsColor: '#006233',
      awayShortsColor: '#ffffff',
      startingXI: ['Melvin Mastil', 'Aïssa Mandi', 'Achref Abada', 'Mohamed Amine Tougai', 'Zineddine Belaïd', 'Ramiz Zerrouki', 'Houssem Aouar', 'Farès Chaïbi', 'Hicham Boudaoui', 'Riyad Mahrez', 'Amine Gouiri'],
      squad: [
        ['Melvin Mastil', 26, 'GK', 'Algeria', 4, 5, 2, 2, 5, 2, 8, 6, 9],
        ['Aïssa Mandi', 34, 'DF', 'Algeria', 10, 9, 7, 4, 10, 8, 7, 7, 1],
        ['Achref Abada', 26, 'DF', 'Algeria', 6, 9, 6, 4, 9, 7, 9, 10, 1],
        ['Mohamed Amine Tougai', 26, 'DF', 'Algeria', 10, 10, 10, 3, 10, 6, 8, 8, 3],
        ['Zineddine Belaïd', 27, 'DF', 'Algeria', 9, 8, 8, 4, 8, 8, 10, 9, 1],
        ['Ramiz Zerrouki', 28, 'MF', 'Algeria', 10, 9, 8, 9, 10, 8, 9, 5, 1],
        ['Riyad Mahrez', 35, 'FW', 'Algeria', 10, 4, 7, 10, 10, 10, 10, 10, 1],
        ['Houssem Aouar', 27, 'MF', 'Algeria', 10, 8, 9, 5, 10, 10, 7, 5, 1],
        ['Amine Gouiri', 26, 'FW', 'Algeria', 10, 5, 3, 10, 7, 10, 10, 6, 1],
        ['Farès Chaïbi', 23, 'MF', 'Algeria', 7, 5, 9, 9, 10, 10, 10, 5, 3],
        ['Anis Hadj Moussa', 24, 'FW', 'Algeria', 7, 2, 3, 10, 5, 9, 6, 7, 1],
        ['Nadhir Benbouali', 26, 'FW', 'Algeria', 10, 3, 5, 8, 6, 9, 5, 4, 1],
        ['Jaouen Hadjam', 23, 'DF', 'Algeria', 5, 8, 9, 1, 10, 6, 7, 8, 1],
        ['Hicham Boudaoui', 26, 'MF', 'Algeria', 9, 8, 10, 5, 10, 9, 10, 5, 1],
        ['Rayan Aït-Nouri', 25, 'DF', 'Algeria', 6, 10, 10, 5, 9, 8, 10, 10, 1],
        ['Oussama Benbot', 31, 'GK', 'Algeria', 5, 8, 3, 1, 8, 2, 8, 4, 10],
        ['Rafik Belghali', 24, 'DF', 'Algeria', 8, 7, 9, 4, 8, 5, 7, 8, 1],
        ['Mohamed Amoura', 26, 'FW', 'Algeria', 10, 6, 5, 10, 9, 10, 9, 10, 1],
        ['Nabil Bentaleb', 31, 'MF', 'Algeria', 10, 7, 10, 7, 10, 10, 10, 7, 3],
        ['Adil Boulbina', 23, 'FW', 'Algeria', 10, 3, 3, 10, 6, 9, 7, 9, 1],
        ['Ramy Bensebaini', 31, 'DF', 'Algeria', 10, 10, 9, 6, 10, 10, 9, 10, 3],
        ['Ibrahim Maza', 20, 'MF', 'Algeria', 9, 9, 8, 4, 10, 10, 7, 8, 1],
        ['Luca Zidane', 28, 'GK', 'Algeria', 4, 8, 3, 2, 7, 1, 8, 7, 10],
        ['Yacine Titraoui', 22, 'MF', 'Algeria', 8, 7, 6, 8, 10, 8, 10, 6, 2],
        ['Farès Ghedjemis', 23, 'FW', 'Algeria', 7, 3, 2, 9, 7, 10, 8, 6, 1],
        ['Samir Chergui', 27, 'DF', 'Algeria', 7, 8, 7, 2, 8, 5, 6, 6, 1]
      ],
    });
  }
}
