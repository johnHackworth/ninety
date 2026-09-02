class Curacao extends AbstractTeam {
  static formation = {
    'Eloy Room': [0, 3],
    'Joshua Brenet': [2, 0],
    'Armando Obispo': [2, 2],
    'Juriën Gaari': [2, 4],
    'Shurandy Sambo': [2, 6],
    'Leandro Bacuna': [4, 0],
    'Juninho Bacuna': [4, 2],
    'Godfried Roemeratoe': [4, 4],
    'Tahith Chong': [4, 6],
    'Jürgen Locadia': [6, 2],
    'Kenji Gorré': [6, 4],
  };

  constructor() {
    super({
      name: 'Curaçao',
      level: 0,
  starPlayers: ['Leandro Bacuna', 'Tahith Chong'],
      startingDeck: "defensive",
      extraActions: { 'underdog-bite': 1 },
      coach: 'Dick Advocaat',
      artifacts: [ 'minnowWill'],
      primaryColor: '#002b7f',
      reserveColor: '#f9e300',
      shortsColor: '#002b7f',
      awayShortsColor: '#f9e300',
      startingXI: ['Eloy Room', 'Joshua Brenet', 'Armando Obispo', 'Juriën Gaari', 'Shurandy Sambo', 'Leandro Bacuna', 'Juninho Bacuna', 'Godfried Roemeratoe', 'Tahith Chong', 'Jürgen Locadia', 'Kenji Gorré'],
      squad: [
        ['Eloy Room', 37, 'GK', 'Curaçao', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Tyrick Bodak', 24, 'GK', 'Curaçao', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Joshua Brenet', 32, 'DF', 'Curaçao', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Armando Obispo', 27, 'DF', 'Curaçao', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Juriën Gaari', 33, 'DF', 'Curaçao', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Shurandy Sambo', 25, 'DF', 'Curaçao', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Roshon van Eijma', 28, 'DF', 'Curaçao', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Leandro Bacuna', 35, 'MF', 'Curaçao', 6, 6, 6, 6, 7, 7, 6, 5, 1],
        ['Juninho Bacuna', 29, 'MF', 'Curaçao', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Tahith Chong', 27, 'MF', 'Curaçao', 8, 4, 4, 6, 7, 8, 6, 4, 1],
        ['Kenji Gorré', 32, 'FW', 'Curaçao', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Livano Comenencia', 22, 'MF', 'Curaçao', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Godfried Roemeratoe', 29, 'MF', 'Curaçao', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Jürgen Locadia', 33, 'FW', 'Curaçao', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Rangelo Janga', 34, 'FW', 'Curaçao', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Anthony van den Hurk', 33, 'FW', 'Curaçao', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Deveron Fonville', 23, 'FW', 'Curaçao', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Jeremy Antonisse', 24, 'FW', 'Curaçao', 5, 2, 1, 6, 5, 5, 4, 4, 1],
      ],
    });
  }
}
