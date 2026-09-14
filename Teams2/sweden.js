class Sweden extends AbstractTeam {
  static formation = {
    'Jacob Widell Zetterström': [0, 3],
    'Gustaf Lagerbielke': [2, 0],
    'Victor Lindelöf': [2, 2],
    'Isak Hien': [2, 4],
    'Gabriel Gudmundsson': [2, 6],
    'Lucas Bergvall': [4, 0],
    'Benjamin Nygren': [4, 2],
    'Ken Sema': [4, 4],
    'Jesper Karlström': [4, 6],
    'Alexander Isak': [6, 2],
    'Anthony Elanga': [6, 4],
  };

  constructor() {
    super({
      name: 'Sweden',
      level: 1,
      starPlayers: ['Alexander Isak', 'Viktor Gyökeres', 'Yasin Ayari', 'Ken Sema'],
      startingDeck: "direct",
      extraActions: {"total-football":1},
      coach: 'Graham Potter',
      artifacts: ["engine"],
      primaryColor: '#006aa7',
      reserveColor: '#febd17',
      shortsColor: '#006aa7',
      awayShortsColor: '#febd17',
      startingXI: ['Jacob Widell Zetterström', 'Gustaf Lagerbielke', 'Victor Lindelöf', 'Isak Hien', 'Gabriel Gudmundsson', 'Lucas Bergvall', 'Benjamin Nygren', 'Ken Sema', 'Jesper Karlström', 'Alexander Isak', 'Anthony Elanga'],
      squad: [
        ['Jacob Widell Zetterström', 27, 'GK', 'Sweden', 3, 5, 2, 2, 5, 2, 9, 3, 9],
        ['Gustaf Lagerbielke', 26, 'DF', 'Sweden', 5, 9, 6, 2, 7, 8, 7, 6, 1],
        ['Victor Lindelöf', 31, 'DF', 'Sweden', 8, 10, 9, 5, 7, 10, 6, 8, 3],
        ['Isak Hien', 27, 'DF', 'Sweden', 7, 10, 8, 5, 8, 5, 6, 8, 2],
        ['Gabriel Gudmundsson', 27, 'DF', 'Sweden', 10, 9, 9, 2, 8, 8, 8, 10, 1],
        ['Herman Johansson', 28, 'DF', 'Sweden', 7, 7, 5, 1, 4, 6, 8, 7, 1],
        ['Lucas Bergvall', 20, 'MF', 'Sweden', 10, 6, 8, 7, 9, 10, 8, 6, 1],
        ['Daniel Svensson', 24, 'DF', 'Sweden', 9, 8, 6, 5, 7, 6, 6, 10, 1],
        ['Alexander Isak', 26, 'FW', 'Sweden', 10, 5, 8, 10, 9, 10, 10, 10, 1],
        ['Benjamin Nygren', 24, 'MF', 'Sweden', 7, 4, 6, 5, 10, 9, 6, 8, 1],
        ['Anthony Elanga', 24, 'FW', 'Sweden', 10, 5, 4, 10, 10, 10, 10, 10, 1],
        ['Viktor Johansson', 27, 'GK', 'Sweden', 3, 8, 4, 1, 6, 3, 8, 7, 10],
        ['Ken Sema', 32, 'MF', 'Sweden', 10, 8, 9, 8, 10, 8, 10, 7, 2],
        ['Hjalmar Ekdal', 27, 'DF', 'Sweden', 8, 7, 10, 3, 6, 6, 8, 8, 1],
        ['Carl Starfelt', 31, 'DF', 'Sweden', 5, 10, 10, 4, 8, 4, 7, 9, 1],
        ['Jesper Karlström', 30, 'MF', 'Sweden', 7, 7, 5, 6, 9, 10, 10, 8, 2],
        ['Viktor Gyökeres', 28, 'FW', 'Sweden', 10, 4, 7, 10, 10, 10, 10, 10, 1],
        ['Yasin Ayari', 22, 'MF', 'Sweden', 8, 8, 10, 5, 10, 10, 10, 7, 1],
        ['Mattias Svanberg', 27, 'MF', 'Sweden', 10, 6, 8, 6, 10, 10, 8, 10, 2],
        ['Eric Smith', 29, 'DF', 'Sweden', 5, 9, 7, 1, 6, 7, 8, 7, 1],
        ['Alexander Bernhardsson', 27, 'DF', 'Sweden', 7, 10, 10, 4, 6, 7, 5, 8, 1],
        ['Besfort Zeneli', 23, 'MF', 'Sweden', 8, 7, 5, 8, 10, 8, 9, 5, 2],
        ['Kristoffer Nordfeldt', 36, 'GK', 'Sweden', 3, 7, 3, 1, 5, 4, 9, 7, 10],
        ['Elliot Stroud', 23, 'DF', 'Sweden', 7, 9, 8, 1, 8, 7, 7, 9, 1],
        ['Gustaf Nilsson', 29, 'FW', 'Sweden', 9, 4, 5, 7, 7, 8, 5, 6, 1],
        ['Taha Ali', 27, 'FW', 'Sweden', 7, 3, 4, 9, 7, 9, 4, 8, 1]
      ],
    });
  }
}

module.exports = Sweden;