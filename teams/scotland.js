class Scotland extends AbstractTeam {
  static formation = {
    'Angus Gunn': [0, 3],
    'Aaron Hickey': [2, 0],
    'Andy Robertson': [2, 2],
    'Grant Hanley': [2, 4],
    'Kieran Tierney': [2, 6],
    'Scott McTominay': [4, 0],
    'John McGinn': [4, 2],
    'Tyler Fletcher': [4, 4],
    'Ryan Christie': [4, 6],
    'Lyndon Dykes': [6, 2],
    'Ché Adams': [6, 4],
  };

  constructor() {
    super({
      name: 'Scotland',
      level: 1,
      starPlayers: ['John McGinn', 'Scott McTominay', 'Ché Adams', 'Lyndon Dykes'],
      startingDeck: "defensive",
      coach: 'Steve Clarke',
      artifacts: ["graniteWall"],
      primaryColor: '#0065bd',
      reserveColor: '#ffffff',
      shortsColor: '#0065bd',
      awayShortsColor: '#ffffff',
      startingXI: ['Angus Gunn', 'Aaron Hickey', 'Andy Robertson', 'Grant Hanley', 'Kieran Tierney', 'Scott McTominay', 'John McGinn', 'Tyler Fletcher', 'Ryan Christie', 'Lyndon Dykes', 'Ché Adams'],
      squad: [
        ['Angus Gunn', 30, 'GK', 'Scotland', 5, 10, 4, 2, 10, 5, 7, 8, 10],
        ['Aaron Hickey', 24, 'DF', 'Scotland', 7, 8, 7, 4, 5, 5, 9, 10, 2],
        ['Andy Robertson', 32, 'DF', 'Scotland', 10, 10, 8, 2, 7, 6, 6, 10, 3],
        ['Scott McTominay', 29, 'MF', 'Scotland', 10, 10, 10, 8, 9, 10, 9, 5, 2],
        ['Grant Hanley', 34, 'DF', 'Scotland', 7, 8, 8, 2, 7, 8, 9, 9, 1],
        ['Kieran Tierney', 29, 'DF', 'Scotland', 7, 10, 10, 5, 8, 8, 10, 8, 2],
        ['John McGinn', 31, 'MF', 'Scotland', 10, 7, 9, 8, 10, 10, 8, 7, 1],
        ['Tyler Fletcher', 19, 'MF', 'Scotland', 7, 7, 5, 5, 8, 6, 8, 4, 2],
        ['Lyndon Dykes', 30, 'FW', 'Scotland', 10, 4, 8, 10, 10, 10, 8, 9, 1],
        ['Ché Adams', 29, 'FW', 'Scotland', 10, 4, 8, 10, 10, 10, 9, 8, 2],
        ['Ryan Christie', 31, 'MF', 'Scotland', 8, 6, 6, 6, 10, 10, 10, 8, 2],
        ['Liam Kelly', 30, 'GK', 'Scotland', 5, 5, 2, 2, 7, 3, 8, 3, 10],
        ['Jack Hendry', 31, 'DF', 'Scotland', 8, 10, 7, 4, 10, 7, 10, 10, 1],
        ['Ross Stewart', 29, 'FW', 'Scotland', 6, 1, 4, 7, 8, 7, 5, 5, 1],
        ['John Souttar', 29, 'DF', 'Scotland', 7, 9, 7, 4, 8, 7, 7, 8, 2],
        ['Dominic Hyam', 30, 'DF', 'Scotland', 6, 7, 8, 4, 7, 5, 7, 8, 2],
        ['Ben Gannon-Doak', 20, 'FW', 'Scotland', 10, 3, 6, 10, 10, 10, 7, 5, 1],
        ['George Hirst', 27, 'FW', 'Scotland', 8, 4, 3, 10, 7, 9, 7, 6, 1],
        ['Lewis Ferguson', 26, 'MF', 'Scotland', 9, 5, 8, 6, 10, 9, 8, 7, 1],
        ['Lawrence Shankland', 30, 'FW', 'Scotland', 10, 5, 6, 9, 8, 10, 6, 7, 1],
        ['Craig Gordon', 43, 'GK', 'Scotland', 7, 10, 3, 2, 8, 2, 10, 6, 10],
        ['Nathan Patterson', 24, 'DF', 'Scotland', 9, 10, 8, 3, 10, 7, 8, 9, 2],
        ['Kenny McLean', 34, 'MF', 'Scotland', 7, 8, 7, 8, 10, 10, 7, 6, 1],
        ['Anthony Ralston', 27, 'DF', 'Scotland', 10, 10, 9, 4, 10, 6, 10, 10, 1],
        ['Findlay Curtis', 20, 'FW', 'Scotland', 7, 3, 5, 7, 5, 10, 6, 7, 1],
        ['Scott McKenna', 29, 'DF', 'Scotland', 9, 10, 9, 6, 8, 6, 8, 9, 1]
      ],
    });
  }
}
