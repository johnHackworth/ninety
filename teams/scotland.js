class Scotland extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4], [4, 6]],
    FW: [[6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Scotland',
      level: 1,
      starPlayers: ['Scott McTominay', 'Andy Robertson'],
      startingDeck: "defensive",
      coach: 'Steve Clarke',
      artifacts: ["graniteWall"],
      primaryColor: '#0065bd',
      reserveColor: '#ffffff',
      shortsColor: '#0065bd',
      awayShortsColor: '#ffffff',
      startingXI: ['Angus Gunn', 'Aaron Hickey', 'Grant Hanley', 'Scott McKenna', 'Andy Robertson', 'John McGinn', 'Scott McTominay', 'Tyler Fletcher', 'Ryan Christie', 'Ché Adams', 'Lawrence Shankland'],
      squad: [
        ['Angus Gunn', 30, 'GK', 'Scotland', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Aaron Hickey', 24, 'DF', 'Scotland', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Andy Robertson', 32, 'DF', 'Scotland', 8, 7, 7, 5, 8, 7, 8, 5, 1],
        ['Scott McTominay', 29, 'MF', 'Scotland', 7, 7, 7, 8, 7, 6, 7, 8, 1],
        ['Grant Hanley', 34, 'DF', 'Scotland', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Kieran Tierney', 29, 'DF', 'Scotland', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['John McGinn', 31, 'MF', 'Scotland', 10, 7, 9, 8, 8, 9, 8, 7, 1],
        ['Tyler Fletcher', 19, 'MF', 'Scotland', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Lyndon Dykes', 30, 'FW', 'Scotland', 8, 4, 8, 8, 10, 9, 8, 9, 1],
        ['Ché Adams', 29, 'FW', 'Scotland', 8, 4, 8, 8, 10, 9, 9, 8, 2],
        ['Ryan Christie', 31, 'MF', 'Scotland', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Liam Kelly', 30, 'GK', 'Scotland', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Jack Hendry', 31, 'DF', 'Scotland', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Ross Stewart', 29, 'FW', 'Scotland', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['John Souttar', 29, 'DF', 'Scotland', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Dominic Hyam', 30, 'DF', 'Scotland', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Ben Gannon-Doak', 20, 'FW', 'Scotland', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['George Hirst', 27, 'FW', 'Scotland', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Lewis Ferguson', 26, 'MF', 'Scotland', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Lawrence Shankland', 30, 'FW', 'Scotland', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Craig Gordon', 43, 'GK', 'Scotland', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Nathan Patterson', 24, 'DF', 'Scotland', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Kenny McLean', 34, 'MF', 'Scotland', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Anthony Ralston', 27, 'DF', 'Scotland', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Findlay Curtis', 20, 'FW', 'Scotland', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Scott McKenna', 29, 'DF', 'Scotland', 5, 6, 6, 3, 3, 2, 5, 6, 1],
      ],
    });
  }
}
