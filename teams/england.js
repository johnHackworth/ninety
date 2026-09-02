class England extends AbstractTeam {
  static formation = {
    'Pickford': [0, 3],
    'James': [2, 0],
    'Stones': [2, 2],
    'Maguire': [2, 4],
    'Shaw': [2, 6],
    'Rice': [4, 2],
    'Bellingham': [4, 4],
    'Saka': [5, 0],
    'Foden': [5, 3],
    'Watkins': [5, 6],
    'Kane': [6, 3],
  };

  constructor() {
    super({
      name: 'England',
      level: 3,
  starPlayers: ['Kane', 'Bellingham', 'Saka', 'Foden', 'Rice'],
      startingDeck: "attacking",
      extraActions: { eureka: 1, ouch: 1, 'coming-home': 1, 'header-finish': 1 },
      coach: 'Thomas Tuchel',
      primaryColor: '#ffffff',
      reserveColor: '#012169',
      shortsColor: '#012169',
      awayShortsColor: '#ffffff',
      startingXI: ['Pickford', 'James', 'Stones', 'Maguire', 'Shaw', 'Saka', 'Rice', 'Bellingham', 'Foden', 'Kane', 'Watkins'],
      squad: [
        ['Pickford', 32, 'GK', 'England', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['James', 26, 'DF', 'England', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Stones', 31, 'DF', 'England', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Maguire', 33, 'DF', 'England', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Shaw', 30, 'DF', 'England', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Saka', 24, 'MF', 'England', 9, 6, 6, 8, 8, 9, 8, 5, 1],
        ['Rice', 27, 'MF', 'England', 8, 9, 8, 7, 8, 7, 9, 8, 1],
        ['Bellingham', 22, 'MF', 'England', 8, 7, 7, 9, 9, 9, 9, 7, 1],
        ['Foden', 25, 'MF', 'England', 8, 5, 5, 9, 9, 9, 9, 4, 1],
        ['Kane', 32, 'FW', 'England', 7, 4, 4, 10, 9, 7, 9, 9, 1],
        ['Watkins', 30, 'FW', 'England', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Henderson', 29, 'GK', 'England', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['Alexander-Arnold', 27, 'DF', 'England', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Palmer', 23, 'MF', 'England', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Gallagher', 26, 'MF', 'England', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Rashford', 28, 'FW', 'England', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Gordon', 25, 'FW', 'England', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Toney', 30, 'FW', 'England', 8, 5, 4, 9, 8, 8, 7, 7, 2],
      ],
    });
  }
}
