class Australia extends AbstractTeam {
  static formation = {
    'Mat Ryan': [0, 3],
    'Atkinson': [2, 0],
    'Souttar': [2, 2],
    'Rowles': [2, 4],
    'Behich': [2, 6],
    'McGree': [4, 0],
    'Irvine': [4, 2],
    "O'Neill": [4, 4],
    'Goodwin': [4, 6],
    'Irankunda': [6, 2],
    'Taggart': [6, 4],
  };

  constructor() {
    super({
      name: 'Australia',
      level: 1,
  starPlayers: ['Irankunda', 'Irvine', 'McGree'],
      startingDeck: "defensive",
      extraActions: { eureka: 1 },
      coach: 'Tony Popovic',
      artifacts: [ 'pressMachine'],
      primaryColor: '#f6c64b',
      reserveColor: '#0b5e2f',
      shortsColor: '#0b5e2f',
      awayShortsColor: '#0b5e2f',
      startingXI: ['Mat Ryan', 'Atkinson', 'Souttar', 'Rowles', 'Behich', 'McGree', 'Irvine', "O'Neill", 'Goodwin', 'Irankunda', 'Taggart'],
      squad: [
        ['Mat Ryan', 34, 'GK', 'Australia', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Gauci', 26, 'GK', 'Australia', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Atkinson', 27, 'DF', 'Australia', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Souttar', 28, 'DF', 'Australia', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Rowles', 28, 'DF', 'Australia', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Behich', 36, 'DF', 'Australia', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Burgess', 31, 'DF', 'Australia', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['McGree', 28, 'MF', 'Australia', 7, 5, 5, 7, 7, 7, 6, 4, 1],
        ['Irvine', 33, 'MF', 'Australia', 6, 6, 6, 7, 7, 6, 7, 5, 1],
        ["O'Neill", 28, 'MF', 'Australia', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Goodwin', 35, 'MF', 'Australia', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Metcalfe', 27, 'MF', 'Australia', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Baccus', 28, 'MF', 'Australia', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Irankunda', 20, 'FW', 'Australia', 9, 4, 4, 8, 7, 8, 7, 5, 1],
        ['Taggart', 33, 'FW', 'Australia', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Duke', 35, 'FW', 'Australia', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Yengi', 27, 'FW', 'Australia', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Borrello', 31, 'FW', 'Australia', 6, 3, 2, 7, 6, 6, 5, 5, 1],
      ],
    });
  }
}
