class Japan extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 2], [5, 0], [5, 3], [5, 6], [6, 3]],
    FW: [[4, 4]],
  };

  constructor() {
    super({
      name: 'Japan',
      level: 2,
      starPlayers: ['Ao Tanaka', 'Takefusa Kubo', 'Ritsu Dōan', 'Takehiro Tomiyasu'],
      startingDeck: "technical",
      extraActions: { eureka: 1, 'video-session': 1, 'the-script': 1 },
      coach: 'Hajime Moriyasu',
      artifacts: ["tacticalMindset"],
      primaryColor: '#bc002d',
      reserveColor: '#ffffff',
      shortsColor: '#bc002d',
      awayShortsColor: '#005ca9',
      startingXI: ['Zion Suzuki', 'Yukinari Sugawara', 'Takehiro Tomiyasu', 'Kō Itakura', 'Hiroki Itō', 'Ao Tanaka', 'Takefusa Kubo', 'Junya Itō', 'Ritsu Dōan', 'Ayase Ueda', 'Daichi Kamada'],
      squad: [
        ['Zion Suzuki', 23, 'GK', 'Japan', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Yukinari Sugawara', 25, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Shōgo Taniguchi', 34, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Kō Itakura', 29, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Yūto Nagatomo', 39, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Shūto Machino', 26, 'FW', 'Japan', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Ao Tanaka', 27, 'MF', 'Japan', 9, 5, 5, 7, 7, 9, 7, 4, 1],
        ['Takefusa Kubo', 25, 'MF', 'Japan', 9, 5, 5, 8, 8, 9, 8, 3, 1],
        ['Keisuke Gotō', 21, 'FW', 'Japan', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Ritsu Dōan', 27, 'MF', 'Japan', 6, 7, 8, 5, 8, 6, 8, 6, 1],
        ['Daizen Maeda', 28, 'MF', 'Japan', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Keisuke Ōsako', 26, 'GK', 'Japan', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Keito Nakamura', 25, 'MF', 'Japan', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Junya Itō', 33, 'MF', 'Japan', 10, 6, 7, 5, 8, 9, 9, 5, 3],
        ['Daichi Kamada', 29, 'MF', 'Japan', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Tsuyoshi Watanabe', 29, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Yuito Suzuki', 24, 'MF', 'Japan', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Ayase Ueda', 27, 'FW', 'Japan', 8, 4, 9, 8, 10, 8, 9, 8, 1],
        ['Kōki Ogawa', 28, 'FW', 'Japan', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Ayumu Seko', 26, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Hiroki Itō', 27, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Takehiro Tomiyasu', 27, 'DF', 'Japan', 7, 8, 8, 4, 7, 6, 8, 8, 1],
        ['Tomoki Hayakawa', 27, 'GK', 'Japan', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Kaishū Sano', 25, 'MF', 'Japan', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Junnosuke Suzuki', 22, 'DF', 'Japan', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Kento Shiogai', 21, 'FW', 'Japan', 6, 2, 2, 8, 4, 5, 4, 7, 1],
      ],
    });
  }
}
