class Austria extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4], [4, 6]],
    FW: [[6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Austria',
      level: 1,
      starPlayers: ['David Alaba', 'Marcel Sabitzer', 'Konrad Laimer'],
      startingDeck: "attacking",
      extraActions: { eureka: 1, 'switch-gears': 1 },
      coach: 'Ralf Rangnick',
      artifacts: ["pressMachine"],
      primaryColor: '#ed1c24',
      reserveColor: '#ffffff',
      shortsColor: '#ed1c24',
      awayShortsColor: '#ffffff',
      startingXI: ['Patrick Pentz', 'Stefan Posch', 'Kevin Danso', 'David Alaba', 'David Affengruber', 'Konrad Laimer', 'Marcel Sabitzer', 'Nicolas Seiwald', 'Xaver Schlager', 'Marko Arnautović', 'Michael Gregoritsch'],
      squad: [
        ['Alexander Schlager', 30, 'GK', 'Austria', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['David Affengruber', 25, 'DF', 'Austria', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Kevin Danso', 27, 'DF', 'Austria', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Xaver Schlager', 28, 'MF', 'Austria', 9, 7, 9, 8, 8, 8, 8, 10, 1],
        ['Stefan Posch', 29, 'DF', 'Austria', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Nicolas Seiwald', 25, 'MF', 'Austria', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Marko Arnautović', 37, 'FW', 'Austria', 8, 3, 5, 8, 10, 9, 9, 8, 1],
        ['David Alaba', 33, 'DF', 'Austria', 7, 8, 8, 6, 8, 7, 8, 7, 1],
        ['Marcel Sabitzer', 32, 'MF', 'Austria', 7, 6, 6, 8, 8, 7, 7, 5, 1],
        ['Florian Grillitsch', 30, 'MF', 'Austria', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Michael Gregoritsch', 32, 'FW', 'Austria', 8, 2, 4, 8, 10, 8, 9, 9, 1],
        ['Florian Wiegele', 25, 'GK', 'Austria', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Patrick Pentz', 29, 'GK', 'Austria', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Saša Kalajdžić', 28, 'FW', 'Austria', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Philipp Lienhart', 29, 'DF', 'Austria', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Phillipp Mwene', 32, 'DF', 'Austria', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Carney Chukwuemeka', 22, 'MF', 'Austria', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Romano Schmid', 26, 'MF', 'Austria', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Dejan Ljubičić', 28, 'MF', 'Austria', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Konrad Laimer', 29, 'MF', 'Austria', 8, 7, 7, 6, 7, 7, 7, 5, 1],
        ['Patrick Wimmer', 25, 'FW', 'Austria', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Alexander Prass', 25, 'MF', 'Austria', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Marco Friedl', 28, 'DF', 'Austria', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Paul Wanner', 20, 'MF', 'Austria', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Michael Svoboda', 27, 'DF', 'Austria', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Alessandro Schöpf', 32, 'MF', 'Austria', 5, 4, 6, 5, 5, 4, 6, 4, 1],
      ],
    });
  }
}
