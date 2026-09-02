class Switzerland extends AbstractTeam {
  static formation = {
    'Yann Sommer': [0, 3],
    'Fabian Schär': [2, 1],
    'Manuel Akanji': [2, 3],
    'Ricardo Rodríguez': [2, 5],
    'Silvan Widmer': [3, 0],
    'Ruben Vargas': [3, 6],
    'Granit Xhaka': [4, 2],
    'Remo Freuler': [4, 4],
    'Xherdan Shaqiri': [5, 2],
    'Dan Ndoye': [5, 4],
    'Breel Embolo': [6, 3],
  };

  constructor() {
    super({
      name: 'Switzerland',
      level: 2,
  starPlayers: ['Granit Xhaka', 'Manuel Akanji', 'Xherdan Shaqiri', 'Yann Sommer'],
      startingDeck: "defensive",
      extraActions: { eureka: 1, 'switch-gears': 1 },
      coach: 'Murat Yakin',
      artifacts: [ 'graniteWall'],
      primaryColor: '#e30613',
      reserveColor: '#ffffff',
      shortsColor: '#e30613',
      awayShortsColor: '#ffffff',
      startingXI: ['Yann Sommer', 'Silvan Widmer', 'Fabian Schär', 'Manuel Akanji', 'Ricardo Rodríguez', 'Granit Xhaka', 'Remo Freuler', 'Xherdan Shaqiri', 'Ruben Vargas', 'Breel Embolo', 'Dan Ndoye'],
      squad: [
        ['Yann Sommer', 37, 'GK', 'Switzerland', 4, 7, 2, 1, 7, 3, 7, 3, 9],
        ['Silvan Widmer', 33, 'DF', 'Switzerland', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Fabian Schär', 35, 'DF', 'Switzerland', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Manuel Akanji', 31, 'DF', 'Switzerland', 8, 8, 8, 4, 8, 7, 8, 8, 1],
        ['Ricardo Rodríguez', 34, 'DF', 'Switzerland', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Granit Xhaka', 34, 'MF', 'Switzerland', 6, 6, 6, 8, 9, 7, 8, 5, 1],
        ['Remo Freuler', 34, 'MF', 'Switzerland', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Xherdan Shaqiri', 35, 'MF', 'Switzerland', 7, 4, 4, 8, 8, 8, 8, 4, 1],
        ['Ruben Vargas', 28, 'MF', 'Switzerland', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Breel Embolo', 29, 'FW', 'Switzerland', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Dan Ndoye', 26, 'FW', 'Switzerland', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Gregor Kobel', 29, 'GK', 'Switzerland', 3, 7, 2, 1, 7, 3, 6, 3, 8],
        ['Nico Elvedi', 30, 'DF', 'Switzerland', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Michel Aebischer', 29, 'MF', 'Switzerland', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Denis Zakaria', 30, 'MF', 'Switzerland', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Zeki Amdouni', 26, 'FW', 'Switzerland', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Noah Okafor', 26, 'FW', 'Switzerland', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Steven Zuber', 35, 'FW', 'Switzerland', 7, 4, 3, 8, 7, 7, 6, 6, 1],
      ],
    });
  }
}
