class England extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 2], [4, 4], [5, 3]],
    FW: [[5, 0], [6, 3], [5, 6]],
  };

  constructor() {
    super({
      name: 'England',
      level: 3,
      starPlayers: ['Harry Kane', 'Jude Bellingham', 'Bukayo Saka', 'Elliot Anderson', 'Declan Rice'],
      startingDeck: "attacking",
      extraActions: { eureka: 1, ouch: 1, 'coming-home': 1, 'header-finish': 1 },
      coach: 'Thomas Tuchel',
      primaryColor: '#ffffff',
      reserveColor: '#c8102e',
      shortsColor: '#002654',
      awayShortsColor: '#c8102e',
      startingXI: ['Jordan Pickford', 'Reece James', 'John Stones', 'Ezri Konsa', 'Nico O\'Reilly', 'Bukayo Saka', 'Declan Rice', 'Jude Bellingham', 'Elliot Anderson', 'Harry Kane', 'Ollie Watkins'],
      squad: [
        ['Jordan Pickford', 32, 'GK', 'England', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Ezri Konsa', 28, 'DF', 'England', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Nico O\'Reilly', 21, 'DF', 'England', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Declan Rice', 27, 'MF', 'England', 8, 9, 8, 7, 8, 7, 9, 8, 1],
        ['John Stones', 32, 'DF', 'England', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Marc Guéhi', 25, 'DF', 'England', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Bukayo Saka', 24, 'FW', 'England', 9, 6, 6, 8, 8, 9, 8, 5, 1],
        ['Elliot Anderson', 23, 'MF', 'England', 8, 5, 5, 9, 9, 9, 9, 4, 1],
        ['Harry Kane', 32, 'FW', 'England', 7, 4, 4, 10, 9, 7, 9, 9, 1],
        ['Jude Bellingham', 22, 'MF', 'England', 8, 7, 7, 9, 9, 9, 9, 7, 1],
        ['Marcus Rashford', 28, 'FW', 'England', 8, 4, 7, 8, 10, 9, 7, 9, 2],
        ['Trevoh Chalobah', 26, 'DF', 'England', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Dean Henderson', 29, 'GK', 'England', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Jordan Henderson', 35, 'MF', 'England', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Dan Burn', 34, 'DF', 'England', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Kobbie Mainoo', 21, 'MF', 'England', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Morgan Rogers', 23, 'MF', 'England', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Anthony Gordon', 25, 'FW', 'England', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Ollie Watkins', 30, 'FW', 'England', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Noni Madueke', 24, 'FW', 'England', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Eberechi Eze', 27, 'MF', 'England', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Ivan Toney', 30, 'FW', 'England', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['James Trafford', 23, 'GK', 'England', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Reece James', 26, 'DF', 'England', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Djed Spence', 25, 'DF', 'England', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Jarell Quansah', 23, 'DF', 'England', 7, 7, 7, 4, 5, 2, 6, 7, 1],
      ],
    });
  }
}
