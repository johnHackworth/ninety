class Germany extends AbstractTeam {
  static formation = {
    'Manuel Neuer': [0, 3],
    'Antonio Rüdiger': [2, 0],
    'Waldemar Anton': [2, 2],
    'Jonathan Tah': [2, 4],
    'Joshua Kimmich': [2, 6],
    'Aleksandar Pavlović': [4, 0],
    'Leon Goretzka': [4, 2],
    'Jamie Leweling': [4, 4],
    'Jamal Musiala': [4, 6],
    'Kai Havertz': [6, 2],
    'Nick Woltemade': [6, 4],
  };

  constructor() {
    super({
      name: 'Germany',
      level: 3,
      starPlayers: ['Leroy Sané', 'Joshua Kimmich', 'Kai Havertz', 'Leon Goretzka', 'Antonio Rüdiger'],
      startingDeck: "possession",
      extraActions: {"total-football":1},
      coach: 'Julian Nagelsmann',
      artifacts: ["turboLegs"],
      primaryColor: '#000000',
      reserveColor: '#ffffff',
      shortsColor: '#000000',
      awayShortsColor: '#000000',
      startingXI: ['Manuel Neuer', 'Antonio Rüdiger', 'Waldemar Anton', 'Jonathan Tah', 'Joshua Kimmich', 'Aleksandar Pavlović', 'Leon Goretzka', 'Jamie Leweling', 'Jamal Musiala', 'Kai Havertz', 'Nick Woltemade'],
      squad: [
        ['Manuel Neuer', 40, 'GK', 'Germany', 3, 9, 5, 1, 8, 3, 10, 9, 10],
        ['Antonio Rüdiger', 33, 'DF', 'Germany', 10, 9, 10, 5, 10, 6, 10, 10, 2],
        ['Waldemar Anton', 29, 'DF', 'Germany', 6, 7, 10, 2, 6, 5, 8, 6, 1],
        ['Jonathan Tah', 30, 'DF', 'Germany', 10, 10, 10, 3, 7, 8, 7, 10, 2],
        ['Aleksandar Pavlović', 22, 'MF', 'Germany', 6, 6, 6, 8, 10, 7, 9, 7, 1],
        ['Joshua Kimmich', 31, 'DF', 'Germany', 10, 10, 10, 3, 10, 8, 9, 10, 3],
        ['Kai Havertz', 27, 'FW', 'Germany', 10, 5, 6, 10, 10, 10, 10, 10, 1],
        ['Leon Goretzka', 31, 'MF', 'Germany', 10, 7, 10, 5, 10, 8, 10, 9, 2],
        ['Jamie Leweling', 25, 'MF', 'Germany', 8, 6, 6, 4, 10, 6, 8, 5, 1],
        ['Jamal Musiala', 23, 'MF', 'Germany', 9, 8, 6, 9, 10, 10, 10, 9, 2],
        ['Nick Woltemade', 24, 'FW', 'Germany', 10, 2, 3, 8, 8, 8, 8, 5, 1],
        ['Oliver Baumann', 36, 'GK', 'Germany', 3, 7, 2, 1, 5, 3, 5, 5, 9],
        ['Pascal Groß', 34, 'MF', 'Germany', 7, 6, 5, 6, 10, 8, 9, 7, 1],
        ['Maximilian Beier', 23, 'FW', 'Germany', 9, 2, 3, 9, 8, 7, 5, 6, 1],
        ['Nico Schlotterbeck', 26, 'DF', 'Germany', 9, 10, 10, 4, 6, 9, 6, 10, 1],
        ['Angelo Stiller', 25, 'MF', 'Germany', 6, 8, 7, 6, 7, 8, 6, 7, 1],
        ['Florian Wirtz', 23, 'MF', 'Germany', 10, 9, 8, 9, 10, 8, 10, 6, 1],
        ['Nathaniel Brown', 22, 'DF', 'Germany', 9, 9, 7, 4, 7, 6, 5, 7, 2],
        ['Leroy Sané', 30, 'MF', 'Germany', 10, 10, 8, 10, 10, 9, 10, 7, 1],
        ['Nadiem Amiri', 29, 'MF', 'Germany', 9, 6, 6, 8, 8, 9, 8, 5, 1],
        ['Alexander Nübel', 29, 'GK', 'Germany', 3, 6, 2, 1, 6, 2, 7, 5, 8],
        ['David Raum', 28, 'DF', 'Germany', 7, 10, 10, 4, 8, 6, 7, 8, 1],
        ['Felix Nmecha', 25, 'MF', 'Germany', 7, 6, 7, 6, 10, 8, 9, 6, 1],
        ['Malick Thiaw', 24, 'DF', 'Germany', 5, 9, 6, 1, 8, 6, 8, 9, 1],
        ['Assan Ouédraogo', 20, 'MF', 'Germany', 7, 6, 9, 5, 9, 9, 9, 7, 1],
        ['Deniz Undav', 29, 'FW', 'Germany', 8, 4, 6, 10, 8, 10, 7, 8, 1]
      ],
    });
  }
}

module.exports = Germany;