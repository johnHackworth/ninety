class Switzerland extends AbstractTeam {
  static formation = {
    'Gregor Kobel': [0, 3],
    'Miro Muheim': [2, 0],
    'Silvan Widmer': [2, 2],
    'Nico Elvedi': [2, 4],
    'Manuel Akanji': [2, 6],
    'Denis Zakaria': [4, 0],
    'Remo Freuler': [4, 2],
    'Johan Manzambi': [4, 4],
    'Granit Xhaka': [4, 6],
    'Breel Embolo': [6, 2],
    'Dan Ndoye': [6, 4],
  };

  constructor() {
    super({
      name: 'Switzerland',
      level: 2,
      starPlayers: ['Granit Xhaka', 'Breel Embolo', 'Ricardo Rodriguez'],
      startingDeck: "defensive",
      extraActions: { eureka: 1, 'switch-gears': 1 },
      coach: 'Murat Yakin',
      artifacts: ["graniteWall"],
      primaryColor: '#d52b1e',
      reserveColor: '#ffffff',
      shortsColor: '#000000',
      awayShortsColor: '#ffffff',
      startingXI: ['Gregor Kobel', 'Miro Muheim', 'Silvan Widmer', 'Nico Elvedi', 'Manuel Akanji', 'Denis Zakaria', 'Remo Freuler', 'Johan Manzambi', 'Granit Xhaka', 'Breel Embolo', 'Dan Ndoye'],
      squad: [
        ['Gregor Kobel', 28, 'GK', 'Switzerland', 2, 4, 5, 2, 4, 1, 4, 6, 7]
        ['Miro Muheim', 28, 'DF', 'Switzerland', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Silvan Widmer', 33, 'DF', 'Switzerland', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Nico Elvedi', 29, 'DF', 'Switzerland', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Manuel Akanji', 30, 'DF', 'Switzerland', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Denis Zakaria', 29, 'MF', 'Switzerland', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Breel Embolo', 29, 'FW', 'Switzerland', 9, 7, 4, 8, 7, 9, 8, 10, 1]
        ['Remo Freuler', 34, 'MF', 'Switzerland', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Johan Manzambi', 20, 'MF', 'Switzerland', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Granit Xhaka', 33, 'MF', 'Switzerland', 8, 9, 9, 8, 8, 8, 8, 10, 1]
        ['Dan Ndoye', 25, 'FW', 'Switzerland', 6, 2, 2, 8, 4, 5, 4, 7, 1]
        ['Yvon Mvogo', 32, 'GK', 'Switzerland', 2, 4, 5, 2, 4, 1, 4, 6, 7]
        ['Ricardo Rodriguez', 33, 'DF', 'Switzerland', 10, 8, 8, 4, 9, 6, 9, 8, 1]
        ['Ardon Jashari', 23, 'MF', 'Switzerland', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Djibril Sow', 29, 'MF', 'Switzerland', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Christian Fassnacht', 32, 'FW', 'Switzerland', 6, 2, 2, 8, 4, 5, 4, 7, 1]
        ['Rubén Vargas', 27, 'FW', 'Switzerland', 6, 2, 2, 8, 4, 5, 4, 7, 1]
        ['Eray Cömert', 28, 'DF', 'Switzerland', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Noah Okafor', 26, 'FW', 'Switzerland', 6, 2, 2, 8, 4, 5, 4, 7, 1]
        ['Michel Aebischer', 29, 'MF', 'Switzerland', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Marvin Keller', 23, 'GK', 'Switzerland', 2, 4, 5, 2, 4, 1, 4, 6, 7]
        ['Fabian Rieder', 24, 'MF', 'Switzerland', 6, 5, 6, 6, 5, 5, 7, 5, 1]
        ['Zeki Amdouni', 25, 'FW', 'Switzerland', 6, 2, 2, 8, 4, 5, 4, 7, 1]
        ['Aurèle Amenda', 22, 'DF', 'Switzerland', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Luca Jaquez', 23, 'DF', 'Switzerland', 6, 7, 7, 3, 3, 2, 5, 7, 1]
        ['Cedric Itten', 29, 'FW', 'Switzerland', 6, 2, 2, 8, 4, 5, 4, 7, 1]
      ],
    });
  }
}
