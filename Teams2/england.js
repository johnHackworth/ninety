class England extends AbstractTeam {
  static formation = {
    'Jordan Pickford': [0, 3],
    'Ezri Konsa': [2, 0],
    'Nico O\'Reilly': [2, 2],
    'John Stones': [2, 4],
    'Marc Guéhi': [2, 6],
    'Declan Rice': [4, 0],
    'Elliot Anderson': [4, 2],
    'Jude Bellingham': [4, 4],
    'Jordan Henderson': [4, 6],
    'Bukayo Saka': [6, 2],
    'Harry Kane': [6, 4],
  };

  constructor() {
    super({
      name: 'England',
      level: 3,
      starPlayers: ['Harry Kane', 'Jude Bellingham', 'Marcus Rashford'],
      startingDeck: "aggressive",
      extraActions: {"gegenpressing":1},
      coach: 'Thomas Tuchel',
      artifacts: ["clinicalFinisher"],
      primaryColor: '#ffffff',
      reserveColor: '#c8102e',
      shortsColor: '#002654',
      awayShortsColor: '#c8102e',
      startingXI: ['Jordan Pickford', 'Ezri Konsa', 'Nico O\'Reilly', 'John Stones', 'Marc Guéhi', 'Declan Rice', 'Elliot Anderson', 'Jude Bellingham', 'Jordan Henderson', 'Bukayo Saka', 'Harry Kane'],
      squad: [
        ['Jordan Pickford', 32, 'GK', 'England', 6, 9, 3, 1, 6, 5, 10, 5, 10],
        ['Ezri Konsa', 28, 'DF', 'England', 10, 10, 10, 4, 6, 4, 5, 6, 1],
        ['Nico O\'Reilly', 21, 'DF', 'England', 5, 8, 10, 4, 8, 6, 6, 8, 1],
        ['Declan Rice', 27, 'MF', 'England', 10, 6, 7, 9, 10, 10, 10, 9, 1],
        ['John Stones', 32, 'DF', 'England', 10, 10, 10, 5, 10, 5, 6, 9, 2],
        ['Marc Guéhi', 25, 'DF', 'England', 9, 10, 9, 2, 10, 9, 7, 9, 1],
        ['Bukayo Saka', 24, 'FW', 'England', 10, 7, 4, 10, 10, 10, 8, 10, 1],
        ['Elliot Anderson', 23, 'MF', 'England', 7, 7, 5, 5, 7, 9, 8, 6, 1],
        ['Harry Kane', 32, 'FW', 'England', 10, 6, 8, 10, 10, 10, 10, 10, 1],
        ['Jude Bellingham', 22, 'MF', 'England', 9, 10, 10, 8, 10, 10, 9, 8, 2],
        ['Marcus Rashford', 28, 'FW', 'England', 10, 4, 7, 10, 10, 10, 7, 9, 2],
        ['Trevoh Chalobah', 26, 'DF', 'England', 5, 6, 8, 1, 6, 5, 7, 8, 2],
        ['Dean Henderson', 29, 'GK', 'England', 3, 8, 4, 1, 7, 3, 8, 6, 9],
        ['Jordan Henderson', 35, 'MF', 'England', 10, 8, 7, 6, 10, 10, 10, 6, 2],
        ['Dan Burn', 34, 'DF', 'England', 5, 7, 8, 3, 6, 7, 4, 7, 2],
        ['Kobbie Mainoo', 21, 'MF', 'England', 9, 5, 8, 9, 10, 8, 10, 8, 1],
        ['Morgan Rogers', 23, 'MF', 'England', 9, 6, 8, 7, 10, 8, 6, 8, 2],
        ['Anthony Gordon', 25, 'FW', 'England', 8, 3, 4, 9, 10, 10, 5, 7, 1],
        ['Ollie Watkins', 30, 'FW', 'England', 9, 2, 4, 9, 7, 10, 7, 9, 1],
        ['Noni Madueke', 24, 'FW', 'England', 9, 1, 3, 9, 6, 10, 7, 8, 1],
        ['Eberechi Eze', 27, 'MF', 'England', 8, 4, 9, 7, 8, 7, 9, 8, 2],
        ['Ivan Toney', 30, 'FW', 'England', 9, 2, 4, 10, 8, 9, 8, 7, 1],
        ['James Trafford', 23, 'GK', 'England', 5, 6, 2, 1, 7, 2, 6, 5, 10],
        ['Reece James', 26, 'DF', 'England', 10, 10, 9, 3, 7, 8, 6, 7, 1],
        ['Djed Spence', 25, 'DF', 'England', 5, 9, 6, 4, 7, 5, 5, 6, 2],
        ['Jarell Quansah', 23, 'DF', 'England', 7, 7, 9, 2, 7, 6, 6, 7, 2]
      ],
    });
  }
}

module.exports = England;