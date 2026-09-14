class DRCongo extends AbstractTeam {
  static formation = {
    'Lionel Mpasi': [0, 3],
    'Aaron Wan-Bissaka': [2, 0],
    'Steve Kapuadi': [2, 2],
    'Axel Tuanzebe': [2, 4],
    'Dylan Batubinsika': [2, 6],
    'Ngal\'ayel Mukau': [4, 0],
    'Nathanaël Mbuku': [4, 2],
    'Samuel Moutoussamy': [4, 4],
    'Théo Bongonda': [4, 6],
    'Brian Cipenga': [6, 2],
    'Gaël Kakuta': [6, 4],
  };

  constructor() {
    super({
      name: 'DR Congo',
      level: 1,
      starPlayers: ['Chancel Mbemba', 'Meschak Elia', 'Samuel Moutoussamy', 'Yoane Wissa'],
      startingDeck: "balanced",
      extraActions: {"teranga-roar":1},
      coach: 'Sébastien Desabre',
      artifacts: ["ironWall"],
      primaryColor: '#00a33c',
      reserveColor: '#ffce00',
      shortsColor: '#00a33c',
      awayShortsColor: '#ffce00',
      startingXI: ['Lionel Mpasi', 'Aaron Wan-Bissaka', 'Steve Kapuadi', 'Axel Tuanzebe', 'Dylan Batubinsika', 'Ngal\'ayel Mukau', 'Nathanaël Mbuku', 'Samuel Moutoussamy', 'Théo Bongonda', 'Brian Cipenga', 'Gaël Kakuta'],
      squad: [
        ['Lionel Mpasi', 31, 'GK', 'DR Congo', 5, 10, 2, 1, 10, 2, 9, 7, 10],
        ['Aaron Wan-Bissaka', 28, 'DF', 'DR Congo', 9, 7, 8, 3, 9, 5, 8, 6, 2],
        ['Steve Kapuadi', 28, 'DF', 'DR Congo', 8, 8, 8, 4, 8, 6, 7, 8, 2],
        ['Axel Tuanzebe', 28, 'DF', 'DR Congo', 6, 9, 9, 1, 8, 4, 8, 8, 2],
        ['Dylan Batubinsika', 30, 'DF', 'DR Congo', 7, 8, 6, 3, 7, 6, 7, 10, 2],
        ['Ngal\'ayel Mukau', 21, 'MF', 'DR Congo', 7, 6, 10, 5, 10, 8, 10, 5, 2],
        ['Nathanaël Mbuku', 24, 'MF', 'DR Congo', 10, 6, 6, 6, 8, 9, 8, 6, 1],
        ['Samuel Moutoussamy', 29, 'MF', 'DR Congo', 10, 10, 10, 9, 10, 10, 9, 5, 1],
        ['Brian Cipenga', 28, 'FW', 'DR Congo', 8, 4, 2, 7, 6, 7, 9, 8, 1],
        ['Théo Bongonda', 30, 'MF', 'DR Congo', 7, 7, 6, 6, 10, 8, 10, 8, 2],
        ['Gaël Kakuta', 34, 'FW', 'DR Congo', 9, 5, 5, 10, 7, 10, 9, 8, 1],
        ['Joris Kayembe', 31, 'DF', 'DR Congo', 8, 9, 7, 4, 5, 6, 10, 10, 2],
        ['Meschak Elia', 28, 'FW', 'DR Congo', 10, 2, 4, 10, 10, 10, 10, 10, 1],
        ['Noah Sadiki', 21, 'MF', 'DR Congo', 9, 5, 6, 6, 10, 9, 10, 7, 2],
        ['Aaron Tshibola', 31, 'MF', 'DR Congo', 7, 8, 6, 5, 8, 8, 9, 4, 2],
        ['Timothy Fayulu', 26, 'GK', 'DR Congo', 4, 8, 4, 1, 6, 4, 8, 5, 7],
        ['Cédric Bakambu', 35, 'FW', 'DR Congo', 10, 5, 7, 10, 10, 10, 8, 7, 1],
        ['Charles Pickel', 29, 'MF', 'DR Congo', 10, 6, 9, 8, 10, 10, 10, 5, 1],
        ['Fiston Mayele', 31, 'FW', 'DR Congo', 10, 4, 4, 10, 8, 10, 8, 7, 1],
        ['Yoane Wissa', 29, 'FW', 'DR Congo', 10, 4, 7, 10, 10, 10, 7, 10, 1],
        ['Matthieu Epolo', 21, 'GK', 'DR Congo', 3, 8, 2, 2, 5, 2, 7, 5, 10],
        ['Chancel Mbemba', 31, 'DF', 'DR Congo', 10, 10, 10, 4, 10, 7, 8, 8, 3],
        ['Simon Banza', 29, 'FW', 'DR Congo', 7, 2, 5, 10, 9, 8, 6, 6, 1],
        ['Gédéon Kalulu', 28, 'DF', 'DR Congo', 7, 10, 10, 4, 10, 8, 10, 10, 1],
        ['Edo Kayembe', 28, 'MF', 'DR Congo', 10, 10, 10, 5, 10, 9, 10, 6, 1],
        ['Arthur Masuaku', 32, 'DF', 'DR Congo', 10, 10, 9, 4, 7, 6, 8, 10, 1]
      ],
    });
  }
}

module.exports = DRCongo;