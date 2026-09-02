class Sweden extends AbstractTeam {
  static formation = {
    'Olsen': [0, 3],
    'Krafth': [2, 0],
    'Lindelöf': [2, 2],
    'Hien': [2, 4],
    'Augustinsson': [2, 6],
    'Kulusevski': [4, 0],
    'Karlström': [4, 2],
    'Hugo Larsson': [4, 4],
    'Svanberg': [4, 6],
    'Isak': [6, 2],
    'Gyökeres': [6, 4],
  };

  constructor() {
    super({
      name: 'Sweden',
      level: 1,
  starPlayers: ['Isak', 'Gyökeres', 'Kulusevski'],
      startingDeck: "attacking",
      extraActions: { 'header-finish': 1 },
      coach: 'Jon Dahl Tomasson',
      primaryColor: '#ffcb03',
      reserveColor: '#1c3d8f',
      shortsColor: '#1c3d8f',
      awayShortsColor: '#1c3d8f',
      startingXI: ['Olsen', 'Krafth', 'Lindelöf', 'Hien', 'Augustinsson', 'Kulusevski', 'Karlström', 'Hugo Larsson', 'Svanberg', 'Isak', 'Gyökeres'],
      squad: [
        ['Olsen', 36, 'GK', 'Sweden', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Krafth', 31, 'DF', 'Sweden', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Lindelöf', 31, 'DF', 'Sweden', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Hien', 27, 'DF', 'Sweden', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Augustinsson', 32, 'DF', 'Sweden', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Kulusevski', 26, 'MF', 'Sweden', 8, 5, 5, 7, 8, 8, 7, 5, 1],
        ['Karlström', 31, 'MF', 'Sweden', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Hugo Larsson', 22, 'MF', 'Sweden', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Svanberg', 27, 'MF', 'Sweden', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Isak', 26, 'FW', 'Sweden', 9, 5, 5, 9, 7, 8, 7, 6, 1],
        ['Gyökeres', 28, 'FW', 'Sweden', 8, 4, 4, 9, 7, 8, 7, 8, 1],
        ['Johansson', 27, 'GK', 'Sweden', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Helander', 33, 'DF', 'Sweden', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Bergvall', 20, 'MF', 'Sweden', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Gustafson', 31, 'MF', 'Sweden', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Elanga', 24, 'FW', 'Sweden', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Jesper Karlsson', 28, 'FW', 'Sweden', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Quaison', 33, 'FW', 'Sweden', 6, 3, 2, 7, 6, 6, 5, 5, 1],
      ],
    });
  }
}
