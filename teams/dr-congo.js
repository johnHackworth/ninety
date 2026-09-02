class DrCongo extends AbstractTeam {
  static formation = {
    'Mpasi': [0, 3],
    'Kalulu': [2, 0],
    'Mbemba': [2, 2],
    'Tuanzebe': [2, 4],
    'Masuaku': [2, 6],
    'Moutoussamy': [4, 0],
    'Pickel': [4, 2],
    'Kakuta': [4, 4],
    'Bongonda': [4, 6],
    'Bakambu': [6, 2],
    'Wissa': [6, 4],
  };

  constructor() {
    super({
      name: 'DR Congo',
      level: 0,
  starPlayers: ['Mbemba', 'Wissa'],
      startingDeck: "counter",
      coach: 'Sébastien Desabre',
      artifacts: [ 'turboLegs'],
      primaryColor: '#1e6fd9',
      reserveColor: '#ffffff',
      shortsColor: '#1e6fd9',
      awayShortsColor: '#ffffff',
      startingXI: ['Mpasi', 'Kalulu', 'Mbemba', 'Tuanzebe', 'Masuaku', 'Moutoussamy', 'Pickel', 'Kakuta', 'Bongonda', 'Bakambu', 'Wissa'],
      squad: [
        ['Mpasi', 31, 'GK', 'DR Congo', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Kalulu', 28, 'DF', 'DR Congo', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Mbemba', 31, 'DF', 'DR Congo', 6, 7, 7, 4, 6, 5, 7, 7, 1],
        ['Tuanzebe', 28, 'DF', 'DR Congo', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Masuaku', 32, 'DF', 'DR Congo', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Nsimba', 33, 'DF', 'DR Congo', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Moutoussamy', 29, 'MF', 'DR Congo', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Pickel', 29, 'MF', 'DR Congo', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Kakuta', 35, 'MF', 'DR Congo', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Bongonda', 30, 'MF', 'DR Congo', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Mfulu', 32, 'MF', 'DR Congo', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Silas', 27, 'MF', 'DR Congo', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Bakambu', 35, 'FW', 'DR Congo', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Wissa', 29, 'FW', 'DR Congo', 8, 4, 4, 7, 6, 7, 6, 7, 1],
        ['Banza', 29, 'FW', 'DR Congo', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Mayele', 32, 'FW', 'DR Congo', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Elia', 28, 'FW', 'DR Congo', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Fayulu', 27, 'GK', 'DR Congo', 1, 5, 1, 1, 5, 1, 4, 1, 6],
      ],
    });
  }
}
