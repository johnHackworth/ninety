class Austria extends AbstractTeam {
  static formation = {
    'Alexander Schlager': [0, 3],
    'David Affengruber': [2, 0],
    'Kevin Danso': [2, 2],
    'Stefan Posch': [2, 4],
    'David Alaba': [2, 6],
    'Xaver Schlager': [4, 0],
    'Nicolas Seiwald': [4, 2],
    'Marcel Sabitzer': [4, 4],
    'Florian Grillitsch': [4, 6],
    'Marko Arnautović': [6, 2],
    'Michael Gregoritsch': [6, 4],
  };

  constructor() {
    super({
      name: 'Austria',
      level: 1,
      starPlayers: ['Marcel Sabitzer', 'Marko Arnautović', 'David Alaba', 'Michael Gregoritsch', 'Xaver Schlager'],
      startingDeck: "tactical",
      extraActions: {"teranga-roar":1},
      coach: 'Ralf Rangnick',
      artifacts: ["midfieldMaestro"],
      primaryColor: '#ed1c24',
      reserveColor: '#ffffff',
      shortsColor: '#ed1c24',
      awayShortsColor: '#ffffff',
      startingXI: ['Alexander Schlager', 'David Affengruber', 'Kevin Danso', 'Stefan Posch', 'David Alaba', 'Xaver Schlager', 'Nicolas Seiwald', 'Marcel Sabitzer', 'Florian Grillitsch', 'Marko Arnautović', 'Michael Gregoritsch'],
      squad: [
        ['Alexander Schlager', 30, 'GK', 'Austria', 6, 10, 4, 2, 8, 4, 7, 7, 10],
        ['David Affengruber', 25, 'DF', 'Austria', 8, 7, 9, 3, 5, 4, 8, 7, 1],
        ['Kevin Danso', 27, 'DF', 'Austria', 8, 9, 10, 3, 10, 8, 9, 10, 3],
        ['Xaver Schlager', 28, 'MF', 'Austria', 10, 7, 10, 8, 10, 10, 10, 10, 1],
        ['Stefan Posch', 29, 'DF', 'Austria', 10, 10, 10, 6, 10, 8, 10, 10, 1],
        ['Nicolas Seiwald', 25, 'MF', 'Austria', 10, 8, 7, 5, 10, 10, 10, 10, 1],
        ['Marko Arnautović', 37, 'FW', 'Austria', 10, 3, 5, 10, 10, 10, 10, 8, 1],
        ['David Alaba', 33, 'DF', 'Austria', 8, 10, 10, 4, 10, 10, 8, 8, 1],
        ['Marcel Sabitzer', 32, 'MF', 'Austria', 8, 10, 7, 9, 10, 10, 10, 8, 2],
        ['Florian Grillitsch', 30, 'MF', 'Austria', 10, 6, 10, 7, 9, 8, 9, 9, 2],
        ['Michael Gregoritsch', 32, 'FW', 'Austria', 10, 2, 4, 10, 10, 10, 10, 10, 1],
        ['Florian Wiegele', 25, 'GK', 'Austria', 3, 8, 2, 1, 7, 3, 8, 4, 10],
        ['Patrick Pentz', 29, 'GK', 'Austria', 5, 8, 4, 2, 10, 2, 10, 5, 9],
        ['Saša Kalajdžić', 28, 'FW', 'Austria', 10, 2, 6, 9, 7, 10, 6, 7, 1],
        ['Philipp Lienhart', 29, 'DF', 'Austria', 10, 9, 10, 3, 10, 9, 8, 9, 1],
        ['Phillipp Mwene', 32, 'DF', 'Austria', 10, 10, 8, 2, 9, 4, 10, 9, 1],
        ['Carney Chukwuemeka', 22, 'MF', 'Austria', 9, 6, 7, 5, 10, 7, 7, 5, 2],
        ['Romano Schmid', 26, 'MF', 'Austria', 10, 8, 9, 7, 9, 9, 10, 6, 1],
        ['Dejan Ljubičić', 28, 'MF', 'Austria', 8, 7, 8, 3, 9, 9, 8, 7, 1],
        ['Konrad Laimer', 29, 'MF', 'Austria', 8, 7, 9, 10, 10, 10, 10, 7, 1],
        ['Patrick Wimmer', 25, 'FW', 'Austria', 10, 5, 3, 10, 6, 10, 10, 9, 1],
        ['Alexander Prass', 25, 'MF', 'Austria', 10, 8, 9, 4, 9, 10, 8, 8, 1],
        ['Marco Friedl', 28, 'DF', 'Austria', 7, 10, 7, 4, 6, 7, 8, 9, 2],
        ['Paul Wanner', 20, 'MF', 'Austria', 7, 7, 5, 5, 8, 7, 6, 4, 1],
        ['Michael Svoboda', 27, 'DF', 'Austria', 4, 9, 8, 3, 7, 5, 7, 7, 1],
        ['Alessandro Schöpf', 32, 'MF', 'Austria', 10, 7, 10, 9, 10, 10, 10, 9, 1]
      ],
    });
  }
}

module.exports = Austria;