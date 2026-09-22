class Curaao extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4], [4, 6]],
    FW: [[6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Curaçao',
      level: 1,
      starPlayers: ['Leandro Bacuna', 'Tahith Chong'],
      startingDeck: "defensive",
      extraActions: { 'underdog-bite': 1 },
      coach: 'Dick Advocaat',
      artifacts: ["minnowWill"],
      primaryColor: '#f8e624',
      reserveColor: '#0033a0',
      shortsColor: '#0033a0',
      awayShortsColor: '#ffffff',
      startingXI: ['Eloy Room', 'Joshua Brenet', 'Armando Obispo', 'Juriën Gaari', 'Shurandy Sambo', 'Leandro Bacuna', 'Juninho Bacuna', 'Godfried Roemeratoe', 'Tahith Chong', 'Jürgen Locadia', 'Kenji Gorré'],
      squad: [
        ['Eloy Room', 37, 'GK', 'Curaçao', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Shurandy Sambo', 24, 'DF', 'Curaçao', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Juriën Gaari', 32, 'DF', 'Curaçao', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Roshon van Eijma', 28, 'DF', 'Curaçao', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Sherel Floranus', 27, 'DF', 'Curaçao', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Godfried Roemeratoe', 26, 'MF', 'Curaçao', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Juninho Bacuna', 28, 'MF', 'Curaçao', 9, 5, 10, 5, 8, 8, 8, 9, 1],
        ['Livano Comenencia', 22, 'MF', 'Curaçao', 8, 7, 8, 5, 8, 10, 9, 9, 2],
        ['Jürgen Locadia', 32, 'FW', 'Curaçao', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Leandro Bacuna', 34, 'MF', 'Curaçao', 6, 6, 6, 6, 7, 7, 6, 5, 1],
        ['Jeremy Antonisse', 24, 'FW', 'Curaçao', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Sontje Hansen', 24, 'FW', 'Curaçao', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Tyrese Noslin', 23, 'FW', 'Curaçao', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Kenji Gorré', 31, 'FW', 'Curaçao', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Ar\'jany Martha', 22, 'MF', 'Curaçao', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Jearl Margaritha', 26, 'FW', 'Curaçao', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Brandley Kuwas', 33, 'FW', 'Curaçao', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Armando Obispo', 27, 'DF', 'Curaçao', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Gervane Kastaneer', 30, 'FW', 'Curaçao', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Joshua Brenet', 32, 'DF', 'Curaçao', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Tahith Chong', 26, 'MF', 'Curaçao', 8, 4, 4, 6, 7, 8, 6, 4, 1],
        ['Kevin Felida', 26, 'MF', 'Curaçao', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Riechedly Bazoer', 29, 'DF', 'Curaçao', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Deveron Fonville', 23, 'DF', 'Curaçao', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Tyrick Bodak', 24, 'GK', 'Curaçao', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Trevor Doornbusch', 26, 'GK', 'Curaçao', 2, 4, 4, 2, 4, 1, 4, 5, 6],
      ],
    });
  }
}
