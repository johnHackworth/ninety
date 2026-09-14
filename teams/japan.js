class Japan extends AbstractTeam {
  static formation = {
    'Zion Suzuki': [0, 3],
    'Yukinari Sugawara': [2, 0],
    'Shōgo Taniguchi': [2, 2],
    'Kō Itakura': [2, 4],
    'Yūto Nagatomo': [2, 6],
    'Ao Tanaka': [4, 0],
    'Takefusa Kubo': [4, 2],
    'Ritsu Dōan': [4, 4],
    'Daizen Maeda': [4, 6],
    'Shūto Machino': [6, 2],
    'Keisuke Gotō': [6, 4],
  };

  constructor() {
    super({
      name: 'Japan',
      level: 2,
      starPlayers: ['Ao Tanaka', 'Ayase Ueda', 'Ritsu Dōan', 'Takefusa Kubo', 'Junya Itō'],
      startingDeck: "technical",
      extraActions: { eureka: 1, 'video-session': 1, 'the-script': 1 },
      coach: 'Hajime Moriyasu',
      artifacts: ["tacticalMindset"],
      primaryColor: '#bc002d',
      reserveColor: '#ffffff',
      shortsColor: '#bc002d',
      awayShortsColor: '#005ca9',
      startingXI: ['Zion Suzuki', 'Yukinari Sugawara', 'Shōgo Taniguchi', 'Kō Itakura', 'Yūto Nagatomo', 'Ao Tanaka', 'Takefusa Kubo', 'Ritsu Dōan', 'Daizen Maeda', 'Shūto Machino', 'Keisuke Gotō'],
      squad: [
        ['Zion Suzuki', 23, 'GK', 'Japan', 2, 4, 5, 2, 4, 1, 4, 6, 7]
        ['Yukinari Sugawara', 25, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Shōgo Taniguchi', 34, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Kō Itakura', 29, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Yūto Nagatomo', 39, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Shūto Machino', 26, 'FW', 'Japan', 6, 2, 2, 8, 4, 5, 4, 7, 1]
        ['Ao Tanaka', 27, 'MF', 'Japan', 8, 9, 9, 8, 8, 8, 8, 10, 2]
        ['Takefusa Kubo', 25, 'MF', 'Japan', 9, 7, 10, 5, 8, 8, 8, 9, 3]
        ['Keisuke Gotō', 21, 'FW', 'Japan', 6, 2, 2, 8, 4, 5, 4, 7, 1]
        ['Ritsu Dōan', 27, 'MF', 'Japan', 10, 8, 8, 7, 8, 9, 9, 5, 3]
        ['Daizen Maeda', 28, 'MF', 'Japan', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Keisuke Ōsako', 26, 'GK', 'Japan', 2, 4, 5, 2, 4, 1, 4, 6, 7]
        ['Keito Nakamura', 25, 'MF', 'Japan', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Junya Itō', 33, 'MF', 'Japan', 10, 6, 7, 5, 8, 9, 9, 5, 3]
        ['Daichi Kamada', 29, 'MF', 'Japan', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Tsuyoshi Watanabe', 29, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Yuito Suzuki', 24, 'MF', 'Japan', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Ayase Ueda', 27, 'FW', 'Japan', 8, 4, 9, 8, 10, 8, 9, 8, 1]
        ['Kōki Ogawa', 28, 'FW', 'Japan', 6, 2, 2, 8, 4, 5, 4, 7, 1]
        ['Ayumu Seko', 26, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Hiroki Itō', 27, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Takehiro Tomiyasu', 27, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Tomoki Hayakawa', 27, 'GK', 'Japan', 2, 4, 5, 2, 4, 1, 4, 6, 7]
        ['Kaishū Sano', 25, 'MF', 'Japan', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Junnosuke Suzuki', 22, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Kento Shiogai', 21, 'FW', 'Japan', 6, 2, 2, 8, 4, 5, 4, 7, 1]
      ],
    });
  }
}
