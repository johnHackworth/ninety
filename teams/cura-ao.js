class Curaao extends AbstractTeam {
  static formation = {
    'Eloy Room': [0, 3],
    'Shurandy Sambo': [2, 0],
    'Juriën Gaari': [2, 2],
    'Roshon van Eijma': [2, 4],
    'Sherel Floranus': [2, 6],
    'Godfried Roemeratoe': [4, 0],
    'Juninho Bacuna': [4, 2],
    'Livano Comenencia': [4, 4],
    'Leandro Bacuna': [4, 6],
    'Jürgen Locadia': [6, 2],
    'Jeremy Antonisse': [6, 4],
  };

  constructor() {
    super({
      name: 'Curaçao',
      level: 1,
      starPlayers: ['Juninho Bacuna', 'Livano Comenencia', 'Leandro Bacuna'],
      startingDeck: "pressing",
      extraActions: {"long-ball":1},
      coach: 'Dick Advocaat',
      artifacts: ["turboLegs"],
      primaryColor: '#f8e624',
      reserveColor: '#0033a0',
      shortsColor: '#0033a0',
      awayShortsColor: '#ffffff',
      startingXI: ['Eloy Room', 'Shurandy Sambo', 'Juriën Gaari', 'Roshon van Eijma', 'Sherel Floranus', 'Godfried Roemeratoe', 'Juninho Bacuna', 'Livano Comenencia', 'Leandro Bacuna', 'Jürgen Locadia', 'Jeremy Antonisse'],
      squad: [
        ['Eloy Room', 37, 'GK', 'Curaçao', 5, 9, 1, 1, 9, 5, 7, 6, 10],
        ['Shurandy Sambo', 24, 'DF', 'Curaçao', 7, 7, 8, 1, 7, 7, 5, 8, 1],
        ['Juriën Gaari', 32, 'DF', 'Curaçao', 9, 10, 9, 2, 8, 6, 10, 9, 2],
        ['Roshon van Eijma', 28, 'DF', 'Curaçao', 7, 10, 8, 4, 8, 7, 9, 10, 1],
        ['Sherel Floranus', 27, 'DF', 'Curaçao', 10, 9, 10, 2, 8, 9, 7, 9, 2],
        ['Godfried Roemeratoe', 26, 'MF', 'Curaçao', 10, 5, 7, 7, 10, 10, 7, 6, 2],
        ['Juninho Bacuna', 28, 'MF', 'Curaçao', 10, 5, 10, 5, 10, 10, 10, 9, 1],
        ['Livano Comenencia', 22, 'MF', 'Curaçao', 8, 7, 8, 5, 10, 10, 9, 9, 2],
        ['Jürgen Locadia', 32, 'FW', 'Curaçao', 10, 5, 4, 9, 8, 7, 7, 9, 1],
        ['Leandro Bacuna', 34, 'MF', 'Curaçao', 10, 8, 6, 6, 10, 10, 10, 9, 2],
        ['Jeremy Antonisse', 24, 'FW', 'Curaçao', 10, 4, 6, 10, 9, 9, 8, 6, 1],
        ['Sontje Hansen', 24, 'FW', 'Curaçao', 9, 4, 5, 8, 5, 8, 7, 7, 1],
        ['Tyrese Noslin', 23, 'FW', 'Curaçao', 7, 3, 4, 10, 6, 8, 8, 4, 1],
        ['Kenji Gorré', 31, 'FW', 'Curaçao', 10, 4, 7, 10, 7, 10, 10, 10, 1],
        ['Ar\'jany Martha', 22, 'MF', 'Curaçao', 10, 4, 8, 7, 10, 7, 9, 4, 1],
        ['Jearl Margaritha', 26, 'FW', 'Curaçao', 10, 3, 5, 10, 6, 10, 6, 9, 1],
        ['Brandley Kuwas', 33, 'FW', 'Curaçao', 10, 4, 6, 10, 7, 9, 9, 9, 1],
        ['Armando Obispo', 27, 'DF', 'Curaçao', 6, 7, 9, 2, 8, 7, 7, 6, 1],
        ['Gervane Kastaneer', 30, 'FW', 'Curaçao', 10, 5, 5, 10, 8, 10, 8, 6, 1],
        ['Joshua Brenet', 32, 'DF', 'Curaçao', 7, 9, 8, 2, 5, 7, 9, 9, 1],
        ['Tahith Chong', 26, 'MF', 'Curaçao', 9, 4, 7, 5, 7, 9, 6, 6, 1],
        ['Kevin Felida', 26, 'MF', 'Curaçao', 10, 7, 6, 5, 10, 8, 7, 6, 1],
        ['Riechedly Bazoer', 29, 'DF', 'Curaçao', 8, 8, 6, 2, 8, 7, 6, 9, 1],
        ['Deveron Fonville', 23, 'DF', 'Curaçao', 6, 6, 7, 3, 8, 4, 5, 6, 2],
        ['Tyrick Bodak', 24, 'GK', 'Curaçao', 2, 6, 2, 2, 7, 2, 9, 6, 10],
        ['Trevor Doornbusch', 26, 'GK', 'Curaçao', 4, 7, 2, 1, 6, 2, 7, 5, 9]
      ],
    });
  }
}

module.exports = Curaao;