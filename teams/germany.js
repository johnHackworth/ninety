class Germany extends AbstractTeam {
  static formation = {
    'ter Stegen': [0, 3],
    'Kimmich': [2, 0],
    'Rüdiger': [2, 2],
    'Tah': [2, 4],
    'Raum': [2, 6],
    'Andrich': [4, 2],
    'Wirtz': [5, 0],
    'Musiala': [5, 3],
    'Groß': [5, 6],
    'Havertz': [4, 4],
    'Füllkrug': [6, 3],
  };

  constructor() {
    super({
      name: 'Germany',
      level: 2,
  starPlayers: ['Kimmich', 'Musiala', 'Wirtz', 'Havertz'],
      startingDeck: "attacking",
      extraActions: { eureka: 1, 'german-efficiency': 1, ouch: 1, 'peak-fitness': 1 },
      coach: 'Julian Nagelsmann',
      artifacts: [ 'midfieldControl'],
      primaryColor: '#ffffff',
      reserveColor: '#009b3a',
      shortsColor: '#000000',
      awayShortsColor: '#1fb6c8',
      startingXI: ['ter Stegen', 'Kimmich', 'Rüdiger', 'Tah', 'Raum', 'Wirtz', 'Andrich', 'Musiala', 'Groß', 'Havertz', 'Füllkrug'],
      squad: [
        ['ter Stegen', 34, 'GK', 'Germany', 3, 7, 2, 1, 7, 3, 6, 3, 8],
        ['Kimmich', 31, 'DF', 'Germany', 7, 8, 8, 7, 9, 8, 9, 7, 1],
        ['Rüdiger', 33, 'DF', 'Germany', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Tah', 30, 'DF', 'Germany', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Raum', 28, 'DF', 'Germany', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Wirtz', 23, 'MF', 'Germany', 8, 5, 5, 9, 9, 10, 9, 4, 1],
        ['Andrich', 31, 'MF', 'Germany', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Musiala', 23, 'MF', 'Germany', 8, 5, 5, 9, 8, 10, 9, 4, 1],
        ['Groß', 34, 'MF', 'Germany', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Havertz', 27, 'FW', 'Germany', 8, 5, 5, 8, 8, 8, 8, 7, 1],
        ['Füllkrug', 33, 'FW', 'Germany', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Baumann', 36, 'GK', 'Germany', 3, 7, 2, 1, 7, 3, 6, 3, 8],
        ['Schlotterbeck', 26, 'DF', 'Germany', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Goretzka', 31, 'MF', 'Germany', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Pavlović', 22, 'MF', 'Germany', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Sané', 30, 'FW', 'Germany', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Gnabry', 31, 'FW', 'Germany', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Undav', 30, 'FW', 'Germany', 7, 4, 3, 8, 7, 7, 6, 6, 1],
      ],
    });
  }
}
