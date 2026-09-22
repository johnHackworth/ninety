class Switzerland extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[3, 0], [2, 1], [2, 3], [2, 5]],
    MF: [[4, 2], [4, 4], [5, 2]],
    FW: [[3, 6], [6, 3], [5, 4]],
  };

  constructor() {
    super({
      name: 'Switzerland',
      level: 2,
      starPlayers: ['Granit Xhaka', 'Manuel Akanji', 'Denis Zakaria', 'Gregor Kobel'],
      startingDeck: "defensive",
      extraActions: { eureka: 1, 'switch-gears': 1 },
      coach: 'Murat Yakin',
      artifacts: ["graniteWall"],
      primaryColor: '#d52b1e',
      reserveColor: '#ffffff',
      shortsColor: '#000000',
      awayShortsColor: '#ffffff',
      startingXI: ['Gregor Kobel', 'Silvan Widmer', 'Miro Muheim', 'Manuel Akanji', 'Ricardo Rodriguez', 'Granit Xhaka', 'Remo Freuler', 'Denis Zakaria', 'Rubén Vargas', 'Breel Embolo', 'Dan Ndoye'],
      squad: [
        ['Gregor Kobel', 28, 'GK', 'Switzerland', 4, 7, 2, 1, 7, 3, 7, 3, 9],
        ['Miro Muheim', 28, 'DF', 'Switzerland', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Silvan Widmer', 33, 'DF', 'Switzerland', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Nico Elvedi', 29, 'DF', 'Switzerland', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Manuel Akanji', 30, 'DF', 'Switzerland', 8, 8, 8, 4, 8, 7, 8, 8, 1],
        ['Denis Zakaria', 29, 'MF', 'Switzerland', 7, 4, 4, 8, 8, 8, 8, 4, 1],
        ['Breel Embolo', 29, 'FW', 'Switzerland', 9, 7, 4, 8, 7, 9, 8, 10, 1],
        ['Remo Freuler', 34, 'MF', 'Switzerland', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Johan Manzambi', 20, 'MF', 'Switzerland', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Granit Xhaka', 33, 'MF', 'Switzerland', 6, 6, 6, 8, 9, 7, 8, 5, 1],
        ['Dan Ndoye', 25, 'FW', 'Switzerland', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Yvon Mvogo', 32, 'GK', 'Switzerland', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Ricardo Rodriguez', 33, 'DF', 'Switzerland', 10, 8, 8, 4, 9, 6, 9, 8, 1],
        ['Ardon Jashari', 23, 'MF', 'Switzerland', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Djibril Sow', 29, 'MF', 'Switzerland', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Christian Fassnacht', 32, 'FW', 'Switzerland', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Rubén Vargas', 27, 'FW', 'Switzerland', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Eray Cömert', 28, 'DF', 'Switzerland', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Noah Okafor', 26, 'FW', 'Switzerland', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Michel Aebischer', 29, 'MF', 'Switzerland', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Marvin Keller', 23, 'GK', 'Switzerland', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Fabian Rieder', 24, 'MF', 'Switzerland', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Zeki Amdouni', 25, 'FW', 'Switzerland', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Aurèle Amenda', 22, 'DF', 'Switzerland', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Luca Jaquez', 23, 'DF', 'Switzerland', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Cedric Itten', 29, 'FW', 'Switzerland', 6, 2, 2, 8, 4, 5, 4, 7, 1],
      ],
    });
  }
}
