class Egypt extends AbstractTeam {
  static formation = {
    'Mohamed El Shenawy': [0, 3],
    'Yasser Ibrahim': [2, 0],
    'Mohamed Hany': [2, 2],
    'Hossam Abdelmaguid': [2, 4],
    'Ramy Rabia': [2, 6],
    'Emam Ashour': [4, 0],
    'Mostafa Ziko': [4, 2],
    'Hamdy Fathy': [4, 4],
    'Mohanad Lasheen': [4, 6],
    'Trézéguet': [6, 2],
    'Hamza Abdelkarim': [6, 4],
  };

  constructor() {
    super({
      name: 'Egypt',
      level: 1,
      starPlayers: ['Mohamed Salah', 'Trézéguet', 'Omar Marmoush'],
      startingDeck: "counter",
      extraActions: { ouch: 1 },
      coach: 'Hossam Hassan',
      artifacts: ["turboLegs"],
      primaryColor: '#e70013',
      reserveColor: '#ffffff',
      shortsColor: '#000000',
      awayShortsColor: '#ffffff',
      startingXI: ['Mohamed El Shenawy', 'Yasser Ibrahim', 'Mohamed Hany', 'Hossam Abdelmaguid', 'Ramy Rabia', 'Emam Ashour', 'Mostafa Ziko', 'Hamdy Fathy', 'Mohanad Lasheen', 'Trézéguet', 'Hamza Abdelkarim'],
      squad: [
        ['Mohamed El Shenawy', 37, 'GK', 'Egypt', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Yasser Ibrahim', 33, 'DF', 'Egypt', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Mohamed Hany', 30, 'DF', 'Egypt', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Hossam Abdelmaguid', 25, 'DF', 'Egypt', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Ramy Rabia', 33, 'DF', 'Egypt', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Mohamed Abdelmonem', 27, 'DF', 'Egypt', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Trézéguet', 31, 'FW', 'Egypt', 8, 2, 4, 8, 10, 8, 9, 9, 1]
        ['Emam Ashour', 28, 'MF', 'Egypt', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Hamza Abdelkarim', 18, 'FW', 'Egypt', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Mohamed Salah', 33, 'FW', 'Egypt', 8, 2, 4, 8, 10, 8, 9, 9, 1]
        ['Mostafa Ziko', 29, 'MF', 'Egypt', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Haissem Hassan', 24, 'FW', 'Egypt', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Ahmed Fatouh', 28, 'DF', 'Egypt', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Hamdy Fathy', 31, 'MF', 'Egypt', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Karim Hafez', 30, 'DF', 'Egypt', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['El Mahdy Soliman', 39, 'GK', 'Egypt', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Mohanad Lasheen', 30, 'MF', 'Egypt', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Nabil Emad', 30, 'MF', 'Egypt', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Marwan Attia', 27, 'MF', 'Egypt', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Ibrahim Adel', 25, 'FW', 'Egypt', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Mahmoud Saber', 24, 'MF', 'Egypt', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Omar Marmoush', 27, 'FW', 'Egypt', 8, 3, 6, 8, 10, 9, 8, 9, 1]
        ['Mostafa Shobeir', 26, 'GK', 'Egypt', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Tarek Alaa', 24, 'DF', 'Egypt', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Zizo', 30, 'FW', 'Egypt', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Mohamed Alaa', 27, 'GK', 'Egypt', 2, 4, 4, 2, 4, 1, 4, 5, 6]
      ],
    });
  }
}
