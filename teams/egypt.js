class Egypt extends AbstractTeam {
  static formation = {
    'El Shenawy': [0, 3],
    'Omar Kamal': [2, 0],
    'Abdelmonem': [2, 2],
    'Hegazi': [2, 4],
    'Mohamed Hamdy': [2, 6],
    'Elneny': [4, 0],
    'Ashour': [4, 2],
    'Zizo': [4, 4],
    'Fathi': [4, 6],
    'Salah': [6, 2],
    'Marmoush': [6, 4],
  };

  constructor() {
    super({
      name: 'Egypt',
      level: 1,
  starPlayers: ['Salah', 'Marmoush', 'Elneny'],
      startingDeck: "counter",
      extraActions: { ouch: 1 },
      coach: 'Hossam Hassan',
      artifacts: [ 'turboLegs'],
      primaryColor: '#ce1126',
      reserveColor: '#ffffff',
      shortsColor: '#ffffff',
      awayShortsColor: '#ffffff',
      startingXI: ['El Shenawy', 'Omar Kamal', 'Abdelmonem', 'Hegazi', 'Mohamed Hamdy', 'Elneny', 'Ashour', 'Zizo', 'Fathi', 'Salah', 'Marmoush'],
      squad: [
        ['El Shenawy', 37, 'GK', 'Egypt', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Omar Kamal', 32, 'DF', 'Egypt', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Abdelmonem', 27, 'DF', 'Egypt', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Hegazi', 35, 'DF', 'Egypt', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Mohamed Hamdy', 31, 'DF', 'Egypt', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Mahmoud Alaa', 35, 'DF', 'Egypt', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Elneny', 34, 'MF', 'Egypt', 6, 7, 7, 6, 8, 6, 7, 5, 1],
        ['Ashour', 28, 'MF', 'Egypt', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Attia', 28, 'MF', 'Egypt', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Maher', 29, 'MF', 'Egypt', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Zizo', 30, 'MF', 'Egypt', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Fathi', 32, 'MF', 'Egypt', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Salah', 34, 'FW', 'Egypt', 9, 4, 4, 9, 8, 9, 8, 4, 1],
        ['Marmoush', 27, 'FW', 'Egypt', 8, 5, 5, 8, 7, 8, 7, 6, 1],
        ['Mostafa Mohamed', 28, 'FW', 'Egypt', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Trezeguet', 31, 'FW', 'Egypt', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Ibrahim Adel', 25, 'FW', 'Egypt', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Abo Gabal', 37, 'GK', 'Egypt', 2, 6, 1, 1, 6, 2, 5, 2, 7],
      ],
    });
  }
}
