class Ghana extends AbstractTeam {
  static formation = {
    'Ati-Zigi': [0, 3],
    'Lamptey': [2, 0],
    'Amartey': [2, 2],
    'Salisu': [2, 4],
    'Gideon Mensah': [2, 6],
    'Partey': [4, 0],
    'Baba': [4, 2],
    'Kudus': [4, 4],
    'Fatawu': [4, 6],
    'Inaki Williams': [6, 2],
    'Jordan Ayew': [6, 4],
  };

  constructor() {
    super({
      name: 'Ghana',
      level: 0,
  starPlayers: ['Kudus', 'Partey'],
      startingDeck: "counter",
      coach: 'Otto Addo',
      artifacts: [ 'turboLegs'],
      primaryColor: '#ffffff',
      reserveColor: '#ce1126',
      shortsColor: '#ffffff',
      awayShortsColor: '#fcd116',
      startingXI: ['Ati-Zigi', 'Lamptey', 'Amartey', 'Salisu', 'Gideon Mensah', 'Partey', 'Baba', 'Kudus', 'Fatawu', 'Inaki Williams', 'Jordan Ayew'],
      squad: [
        ['Ati-Zigi', 29, 'GK', 'Ghana', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Lamptey', 25, 'DF', 'Ghana', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Amartey', 31, 'DF', 'Ghana', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Salisu', 27, 'DF', 'Ghana', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Gideon Mensah', 28, 'DF', 'Ghana', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Djiku', 31, 'DF', 'Ghana', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Partey', 33, 'MF', 'Ghana', 7, 7, 8, 6, 8, 7, 8, 6, 1],
        ['Baba', 30, 'MF', 'Ghana', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Kudus', 25, 'MF', 'Ghana', 8, 5, 5, 8, 7, 9, 8, 4, 1],
        ['Fatawu', 22, 'MF', 'Ghana', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Owusu', 28, 'MF', 'Ghana', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Inaki Williams', 32, 'FW', 'Ghana', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Jordan Ayew', 34, 'FW', 'Ghana', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Semenyo', 26, 'FW', 'Ghana', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Nuamah', 22, 'FW', 'Ghana', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Sulemana', 24, 'FW', 'Ghana', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Wollacott', 29, 'GK', 'Ghana', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Abdul Samed', 26, 'MF', 'Ghana', 4, 4, 4, 4, 6, 5, 5, 3, 1],
      ],
    });
  }
}
