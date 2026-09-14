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
        ['Melvin Mastil', 26, 'GK', 'Algeria', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Aïssa Mandi', 34, 'DF', 'Algeria', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Achref Abada', 26, 'DF', 'Algeria', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Mohamed Amine Tougai', 26, 'DF', 'Algeria', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Zineddine Belaïd', 27, 'DF', 'Algeria', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Ramiz Zerrouki', 28, 'MF', 'Algeria', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Riyad Mahrez', 35, 'FW', 'Algeria', 8, 4, 7, 8, 10, 8, 9, 9, 1]
        ['Houssem Aouar', 27, 'MF', 'Algeria', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Amine Gouiri', 26, 'FW', 'Algeria', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Farès Chaïbi', 23, 'MF', 'Algeria', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Anis Hadj Moussa', 24, 'FW', 'Algeria', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Nadhir Benbouali', 26, 'FW', 'Algeria', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Jaouen Hadjam', 23, 'DF', 'Algeria', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Hicham Boudaoui', 26, 'MF', 'Algeria', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Rayan Aït-Nouri', 25, 'DF', 'Algeria', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Oussama Benbot', 31, 'GK', 'Algeria', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Rafik Belghali', 24, 'DF', 'Algeria', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Mohamed Amoura', 26, 'FW', 'Algeria', 8, 6, 5, 8, 9, 8, 9, 10, 1]
        ['Nabil Bentaleb', 31, 'MF', 'Algeria', 9, 7, 10, 7, 8, 9, 8, 7, 3]
        ['Adil Boulbina', 23, 'FW', 'Algeria', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Ramy Bensebaini', 31, 'DF', 'Algeria', 8, 8, 8, 6, 9, 10, 9, 8, 3]
        ['Ibrahim Maza', 20, 'MF', 'Algeria', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Luca Zidane', 28, 'GK', 'Algeria', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Yacine Titraoui', 22, 'MF', 'Algeria', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Farès Ghedjemis', 23, 'FW', 'Algeria', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Samir Chergui', 27, 'DF', 'Algeria', 5, 6, 6, 3, 3, 2, 5, 6, 1]
      ],
    });
  }
}
