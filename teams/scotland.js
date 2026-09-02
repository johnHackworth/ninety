class Scotland extends AbstractTeam {
  static formation = {
    'Gunn': [0, 3],
    'Hickey': [2, 0],
    'Hanley': [2, 2],
    'McKenna': [2, 4],
    'Robertson': [2, 6],
    'McGinn': [4, 0],
    'McTominay': [4, 2],
    'Gilmour': [4, 4],
    'McGregor': [4, 6],
    'Adams': [6, 2],
    'Shankland': [6, 4],
  };

  constructor() {
    super({
      name: 'Scotland',
      level: 0,
  starPlayers: ['McTominay', 'Robertson'],
      startingDeck: "defensive",
      coach: 'Steve Clarke',
      artifacts: [ 'graniteWall'],
      primaryColor: '#003887',
      reserveColor: '#ffffff',
      shortsColor: '#003887',
      awayShortsColor: '#d7141a',
      startingXI: ['Gunn', 'Hickey', 'Hanley', 'McKenna', 'Robertson', 'McGinn', 'McTominay', 'Gilmour', 'McGregor', 'Adams', 'Shankland'],
      squad: [
        ['Gunn', 30, 'GK', 'Scotland', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Hickey', 24, 'DF', 'Scotland', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Hanley', 34, 'DF', 'Scotland', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['McKenna', 29, 'DF', 'Scotland', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Robertson', 32, 'DF', 'Scotland', 8, 7, 7, 5, 8, 7, 8, 5, 1],
        ['McGinn', 31, 'MF', 'Scotland', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['McTominay', 29, 'MF', 'Scotland', 7, 7, 7, 8, 7, 6, 7, 8, 1],
        ['Gilmour', 25, 'MF', 'Scotland', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['McGregor', 33, 'MF', 'Scotland', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Adams', 29, 'FW', 'Scotland', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Shankland', 30, 'FW', 'Scotland', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Clark', 34, 'GK', 'Scotland', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Tierney', 29, 'DF', 'Scotland', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['McLean', 34, 'MF', 'Scotland', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Ferguson', 26, 'MF', 'Scotland', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Dykes', 31, 'FW', 'Scotland', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Forrest', 34, 'FW', 'Scotland', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Christie', 31, 'FW', 'Scotland', 5, 2, 1, 6, 5, 5, 4, 4, 1],
      ],
    });
  }
}
