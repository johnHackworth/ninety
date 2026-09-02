class Austria extends AbstractTeam {
  static formation = {
    'Patrick Pentz': [0, 3],
    'Stefan Posch': [2, 0],
    'Kevin Danso': [2, 2],
    'David Alaba': [2, 4],
    'Maximilian Wöber': [2, 6],
    'Konrad Laimer': [4, 0],
    'Marcel Sabitzer': [4, 2],
    'Nicolas Seiwald': [4, 4],
    'Christoph Baumgartner': [4, 6],
    'Marko Arnautović': [6, 2],
    'Michael Gregoritsch': [6, 4],
  };

  constructor() {
    super({
      name: 'Austria',
      level: 1,
  starPlayers: ['David Alaba', 'Marcel Sabitzer', 'Konrad Laimer'],
      startingDeck: "attacking",
      extraActions: { eureka: 1, 'switch-gears': 1 },
      coach: 'Ralf Rangnick',
      artifacts: [ 'pressMachine'],
      primaryColor: '#ed2939',
      reserveColor: '#ffffff',
      shortsColor: '#000000',
      awayShortsColor: '#ffffff',
      startingXI: ['Patrick Pentz', 'Stefan Posch', 'Kevin Danso', 'David Alaba', 'Maximilian Wöber', 'Konrad Laimer', 'Marcel Sabitzer', 'Nicolas Seiwald', 'Christoph Baumgartner', 'Marko Arnautović', 'Michael Gregoritsch'],
      squad: [
        ['Patrick Pentz', 29, 'GK', 'Austria', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Stefan Posch', 29, 'DF', 'Austria', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Kevin Danso', 28, 'DF', 'Austria', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['David Alaba', 34, 'DF', 'Austria', 7, 8, 8, 6, 8, 7, 8, 7, 1],
        ['Maximilian Wöber', 28, 'DF', 'Austria', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Konrad Laimer', 29, 'MF', 'Austria', 8, 7, 7, 6, 7, 7, 7, 5, 1],
        ['Marcel Sabitzer', 32, 'MF', 'Austria', 7, 6, 6, 8, 8, 7, 7, 5, 1],
        ['Nicolas Seiwald', 25, 'MF', 'Austria', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Christoph Baumgartner', 27, 'MF', 'Austria', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Marko Arnautović', 37, 'FW', 'Austria', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Michael Gregoritsch', 32, 'FW', 'Austria', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Alexander Schlager', 30, 'GK', 'Austria', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Philipp Lienhart', 30, 'DF', 'Austria', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Xaver Schlager', 29, 'MF', 'Austria', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Florian Grillitsch', 31, 'MF', 'Austria', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Patrick Wimmer', 25, 'FW', 'Austria', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Saša Kalajdžić', 29, 'FW', 'Austria', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Junior Adamu', 25, 'FW', 'Austria', 6, 3, 2, 7, 6, 6, 5, 5, 1],
      ],
    });
  }
}
