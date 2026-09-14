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
      extraActions: {"tiki-taka":1},
      coach: 'Murat Yakin',
      artifacts: ["setPieceSpecialist"],
      primaryColor: '#d52b1e',
      reserveColor: '#ffffff',
      shortsColor: '#000000',
      awayShortsColor: '#ffffff',
      startingXI: ['Gregor Kobel', 'Miro Muheim', 'Silvan Widmer', 'Nico Elvedi', 'Manuel Akanji', 'Denis Zakaria', 'Remo Freuler', 'Johan Manzambi', 'Granit Xhaka', 'Breel Embolo', 'Dan Ndoye'],
      squad: [
        ['Gregor Kobel', 28, 'GK', 'Switzerland', 4, 8, 1, 2, 6, 5, 10, 5, 9],
        ['Miro Muheim', 28, 'DF', 'Switzerland', 5, 7, 8, 3, 8, 5, 9, 8, 1],
        ['Silvan Widmer', 33, 'DF', 'Switzerland', 7, 10, 9, 5, 10, 10, 8, 10, 3],
        ['Nico Elvedi', 29, 'DF', 'Switzerland', 10, 10, 10, 5, 8, 7, 6, 9, 1],
        ['Manuel Akanji', 30, 'DF', 'Switzerland', 9, 10, 10, 2, 6, 10, 10, 8, 3],
        ['Denis Zakaria', 29, 'MF', 'Switzerland', 10, 7, 10, 8, 10, 10, 9, 7, 1],
        ['Breel Embolo', 29, 'FW', 'Switzerland', 10, 7, 4, 10, 7, 10, 8, 10, 1],
        ['Remo Freuler', 34, 'MF', 'Switzerland', 10, 7, 8, 4, 10, 10, 8, 7, 3],
        ['Johan Manzambi', 20, 'MF', 'Switzerland', 7, 5, 8, 4, 10, 9, 10, 9, 2],
        ['Granit Xhaka', 33, 'MF', 'Switzerland', 10, 10, 9, 8, 10, 10, 10, 10, 1],
        ['Dan Ndoye', 25, 'FW', 'Switzerland', 10, 4, 5, 10, 10, 10, 7, 7, 1],
        ['Yvon Mvogo', 32, 'GK', 'Switzerland', 5, 9, 3, 1, 5, 4, 9, 7, 10],
        ['Ricardo Rodriguez', 33, 'DF', 'Switzerland', 10, 10, 10, 4, 9, 6, 9, 8, 1],
        ['Ardon Jashari', 23, 'MF', 'Switzerland', 6, 3, 8, 6, 8, 7, 9, 6, 2],
        ['Djibril Sow', 29, 'MF', 'Switzerland', 10, 7, 7, 9, 10, 9, 8, 8, 1],
        ['Christian Fassnacht', 32, 'FW', 'Switzerland', 10, 2, 5, 9, 8, 9, 8, 6, 1],
        ['Rubén Vargas', 27, 'FW', 'Switzerland', 10, 7, 5, 10, 10, 10, 10, 10, 1],
        ['Eray Cömert', 28, 'DF', 'Switzerland', 8, 9, 9, 5, 7, 7, 7, 10, 1],
        ['Noah Okafor', 26, 'FW', 'Switzerland', 10, 3, 6, 10, 8, 10, 6, 6, 1],
        ['Michel Aebischer', 29, 'MF', 'Switzerland', 10, 5, 8, 9, 10, 10, 10, 10, 1],
        ['Marvin Keller', 23, 'GK', 'Switzerland', 3, 8, 3, 1, 7, 4, 8, 6, 8],
        ['Fabian Rieder', 24, 'MF', 'Switzerland', 10, 9, 6, 9, 9, 10, 10, 4, 3],
        ['Zeki Amdouni', 25, 'FW', 'Switzerland', 10, 4, 6, 10, 9, 10, 9, 10, 1],
        ['Aurèle Amenda', 22, 'DF', 'Switzerland', 7, 7, 8, 2, 8, 4, 9, 10, 2],
        ['Luca Jaquez', 23, 'DF', 'Switzerland', 8, 8, 7, 2, 7, 7, 5, 6, 1],
        ['Cedric Itten', 29, 'FW', 'Switzerland', 9, 3, 5, 10, 6, 10, 9, 5, 1]
      ],
    });
  }
}

module.exports = Switzerland;