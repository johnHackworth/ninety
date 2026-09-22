class Germany extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[5, 0], [4, 2], [5, 3], [5, 6]],
    FW: [[4, 4], [6, 3]],
  };

  constructor() {
    super({
      name: 'Germany',
      level: 3,
      starPlayers: ['Joshua Kimmich', 'Jamal Musiala', 'Florian Wirtz', 'Kai Havertz'],
      startingDeck: "attacking",
      extraActions: { eureka: 1, 'german-efficiency': 1, ouch: 1, 'peak-fitness': 1 },
      coach: 'Julian Nagelsmann',
      artifacts: ["midfieldControl"],
      primaryColor: '#000000',
      reserveColor: '#ffffff',
      shortsColor: '#000000',
      awayShortsColor: '#000000',
      startingXI: ['Manuel Neuer', 'Joshua Kimmich', 'Antonio Rüdiger', 'Jonathan Tah', 'David Raum', 'Florian Wirtz', 'Leroy Sané', 'Jamal Musiala', 'Pascal Groß', 'Kai Havertz', 'Nick Woltemade'],
      squad: [
        ['Manuel Neuer', 40, 'GK', 'Germany', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Antonio Rüdiger', 33, 'DF', 'Germany', 8, 8, 8, 5, 10, 6, 9, 9, 2],
        ['Waldemar Anton', 29, 'DF', 'Germany', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Jonathan Tah', 30, 'DF', 'Germany', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Aleksandar Pavlović', 22, 'MF', 'Germany', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Joshua Kimmich', 31, 'DF', 'Germany', 7, 8, 8, 7, 9, 8, 9, 7, 1],
        ['Kai Havertz', 27, 'FW', 'Germany', 8, 5, 5, 8, 8, 8, 8, 7, 1],
        ['Leon Goretzka', 31, 'MF', 'Germany', 9, 7, 10, 5, 8, 8, 8, 9, 2],
        ['Jamie Leweling', 25, 'MF', 'Germany', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Jamal Musiala', 23, 'MF', 'Germany', 8, 5, 5, 9, 8, 10, 9, 4, 1],
        ['Nick Woltemade', 24, 'FW', 'Germany', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Oliver Baumann', 36, 'GK', 'Germany', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Pascal Groß', 34, 'MF', 'Germany', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Maximilian Beier', 23, 'FW', 'Germany', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Nico Schlotterbeck', 26, 'DF', 'Germany', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Angelo Stiller', 25, 'MF', 'Germany', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Florian Wirtz', 23, 'MF', 'Germany', 8, 5, 5, 9, 9, 10, 9, 4, 1],
        ['Nathaniel Brown', 22, 'DF', 'Germany', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Leroy Sané', 30, 'MF', 'Germany', 9, 10, 8, 9, 8, 8, 8, 7, 1],
        ['Nadiem Amiri', 29, 'MF', 'Germany', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Alexander Nübel', 29, 'GK', 'Germany', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['David Raum', 28, 'DF', 'Germany', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Felix Nmecha', 25, 'MF', 'Germany', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Malick Thiaw', 24, 'DF', 'Germany', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Assan Ouédraogo', 20, 'MF', 'Germany', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Deniz Undav', 29, 'FW', 'Germany', 7, 2, 2, 9, 4, 6, 4, 8, 1],
      ],
    });
  }
}
