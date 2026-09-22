class Egypt extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 6]],
    FW: [[4, 4], [6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Egypt',
      level: 1,
      starPlayers: ['Mohamed Salah', 'Omar Marmoush', 'Emam Ashour'],
      startingDeck: "counter",
      extraActions: { ouch: 1 },
      coach: 'Hossam Hassan',
      artifacts: ["turboLegs"],
      primaryColor: '#e70013',
      reserveColor: '#ffffff',
      shortsColor: '#000000',
      awayShortsColor: '#ffffff',
      startingXI: ['Mohamed El Shenawy', 'Yasser Ibrahim', 'Mohamed Abdelmonem', 'Mohamed Hany', 'Hossam Abdelmaguid', 'Mostafa Ziko', 'Emam Ashour', 'Zizo', 'Hamdy Fathy', 'Mohamed Salah', 'Omar Marmoush'],
      squad: [
        ['Mohamed El Shenawy', 37, 'GK', 'Egypt', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Yasser Ibrahim', 33, 'DF', 'Egypt', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Mohamed Hany', 30, 'DF', 'Egypt', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Hossam Abdelmaguid', 25, 'DF', 'Egypt', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Ramy Rabia', 33, 'DF', 'Egypt', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Mohamed Abdelmonem', 27, 'DF', 'Egypt', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Trézéguet', 31, 'FW', 'Egypt', 8, 2, 4, 8, 10, 8, 9, 9, 1],
        ['Emam Ashour', 28, 'MF', 'Egypt', 6, 7, 7, 6, 8, 6, 7, 5, 1],
        ['Hamza Abdelkarim', 18, 'FW', 'Egypt', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Mohamed Salah', 33, 'FW', 'Egypt', 9, 4, 4, 9, 8, 9, 8, 4, 1],
        ['Mostafa Ziko', 29, 'MF', 'Egypt', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Haissem Hassan', 24, 'FW', 'Egypt', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Ahmed Fatouh', 28, 'DF', 'Egypt', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Hamdy Fathy', 31, 'MF', 'Egypt', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Karim Hafez', 30, 'DF', 'Egypt', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['El Mahdy Soliman', 39, 'GK', 'Egypt', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Mohanad Lasheen', 30, 'MF', 'Egypt', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Nabil Emad', 30, 'MF', 'Egypt', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Marwan Attia', 27, 'MF', 'Egypt', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Ibrahim Adel', 25, 'FW', 'Egypt', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Mahmoud Saber', 24, 'MF', 'Egypt', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Omar Marmoush', 27, 'FW', 'Egypt', 8, 5, 5, 8, 7, 8, 7, 6, 1],
        ['Mostafa Shobeir', 26, 'GK', 'Egypt', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Tarek Alaa', 24, 'DF', 'Egypt', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Zizo', 30, 'FW', 'Egypt', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Mohamed Alaa', 27, 'GK', 'Egypt', 2, 4, 4, 2, 4, 1, 4, 5, 6],
      ],
    });
  }
}
