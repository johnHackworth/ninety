class Japan extends AbstractTeam {
  static formation = {
    'Zion Suzuki': [0, 3],
    'Sugawara': [2, 0],
    'Tomiyasu': [2, 2],
    'Itakura': [2, 4],
    'H. Ito': [2, 6],
    'Endo': [4, 2],
    'Kubo': [5, 0],
    'Mitoma': [5, 3],
    'Doan': [5, 6],
    'Ueda': [4, 4],
    'Kamada': [6, 3],
  };

  constructor() {
    super({
      name: 'Japan',
      level: 2,
  starPlayers: ['Mitoma', 'Kubo', 'Endo', 'Tomiyasu'],
      startingDeck: "technical",
      extraActions: { eureka: 1, 'video-session': 1, 'the-script': 1 },
      coach: 'Hajime Moriyasu',
      artifacts: [ 'tacticalMindset'],
      primaryColor: '#14285b',
      reserveColor: '#ffffff',
      shortsColor: '#ffffff',
      awayShortsColor: '#000000',
      startingXI: ['Zion Suzuki', 'Sugawara', 'Tomiyasu', 'Itakura', 'H. Ito', 'Endo', 'Kubo', 'Mitoma', 'Doan', 'Ueda', 'Kamada'],
      squad: [
        ['Zion Suzuki', 24, 'GK', 'Japan', 3, 7, 2, 1, 7, 3, 6, 3, 8],
        ['Nakamura', 31, 'GK', 'Japan', 3, 7, 2, 1, 7, 3, 6, 3, 8],
        ['Sugawara', 26, 'DF', 'Japan', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Tomiyasu', 28, 'DF', 'Japan', 7, 8, 8, 4, 7, 6, 8, 8, 1],
        ['Itakura', 29, 'DF', 'Japan', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['H. Ito', 27, 'DF', 'Japan', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Machida', 29, 'DF', 'Japan', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Endo', 33, 'MF', 'Japan', 6, 7, 8, 5, 8, 6, 8, 6, 1],
        ['Kubo', 25, 'MF', 'Japan', 9, 5, 5, 8, 8, 9, 8, 3, 1],
        ['Mitoma', 29, 'MF', 'Japan', 9, 5, 5, 7, 7, 9, 7, 4, 1],
        ['Doan', 28, 'MF', 'Japan', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Morita', 31, 'MF', 'Japan', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Ao Tanaka', 28, 'MF', 'Japan', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Ueda', 28, 'FW', 'Japan', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Kamada', 30, 'FW', 'Japan', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Furuhashi', 31, 'FW', 'Japan', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Minamino', 31, 'FW', 'Japan', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Keito Nakamura', 26, 'FW', 'Japan', 7, 4, 3, 8, 7, 7, 6, 6, 1],
      ],
    });
  }
}
