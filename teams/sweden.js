class Sweden extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4], [4, 6]],
    FW: [[6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Sweden',
      level: 1,
      starPlayers: ['Alexander Isak', 'Viktor Gyökeres', 'Ken Sema'],
      startingDeck: "attacking",
      extraActions: { 'header-finish': 1 },
      coach: 'Graham Potter',
      primaryColor: '#006aa7',
      reserveColor: '#febd17',
      shortsColor: '#006aa7',
      awayShortsColor: '#febd17',
      startingXI: ['Jacob Widell Zetterström', 'Gustaf Lagerbielke', 'Victor Lindelöf', 'Isak Hien', 'Gabriel Gudmundsson', 'Ken Sema', 'Jesper Karlström', 'Yasin Ayari', 'Mattias Svanberg', 'Alexander Isak', 'Viktor Gyökeres'],
      squad: [
        ['Jacob Widell Zetterström', 27, 'GK', 'Sweden', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Gustaf Lagerbielke', 26, 'DF', 'Sweden', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Victor Lindelöf', 31, 'DF', 'Sweden', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Isak Hien', 27, 'DF', 'Sweden', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Gabriel Gudmundsson', 27, 'DF', 'Sweden', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Herman Johansson', 28, 'DF', 'Sweden', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Lucas Bergvall', 20, 'MF', 'Sweden', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Daniel Svensson', 24, 'DF', 'Sweden', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Alexander Isak', 26, 'FW', 'Sweden', 9, 5, 5, 9, 7, 8, 7, 6, 1],
        ['Benjamin Nygren', 24, 'MF', 'Sweden', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Anthony Elanga', 24, 'FW', 'Sweden', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Viktor Johansson', 27, 'GK', 'Sweden', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Ken Sema', 32, 'MF', 'Sweden', 8, 5, 5, 7, 8, 8, 7, 5, 1],
        ['Hjalmar Ekdal', 27, 'DF', 'Sweden', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Carl Starfelt', 31, 'DF', 'Sweden', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Jesper Karlström', 30, 'MF', 'Sweden', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Viktor Gyökeres', 28, 'FW', 'Sweden', 8, 4, 4, 9, 7, 8, 7, 8, 1],
        ['Yasin Ayari', 22, 'MF', 'Sweden', 8, 8, 10, 5, 8, 9, 9, 7, 1],
        ['Mattias Svanberg', 27, 'MF', 'Sweden', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Eric Smith', 29, 'DF', 'Sweden', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Alexander Bernhardsson', 27, 'DF', 'Sweden', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Besfort Zeneli', 23, 'MF', 'Sweden', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Kristoffer Nordfeldt', 36, 'GK', 'Sweden', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Elliot Stroud', 23, 'DF', 'Sweden', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Gustaf Nilsson', 29, 'FW', 'Sweden', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Taha Ali', 27, 'FW', 'Sweden', 5, 2, 2, 7, 4, 4, 4, 6, 1],
      ],
    });
  }
}
