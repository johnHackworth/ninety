class Belgium extends AbstractTeam {
  static formation = {
    'Courtois': [0, 3],
    'Faes': [2, 1],
    'Debast': [2, 3],
    'Theate': [2, 5],
    'Castagne': [3, 0],
    'Doku': [3, 6],
    'Onana': [4, 2],
    'Tielemans': [4, 4],
    'De Bruyne': [5, 2],
    'Openda': [5, 4],
    'Lukaku': [6, 3],
  };

  constructor() {
    super({
      name: 'Belgium',
      level: 3,
  starPlayers: ['De Bruyne', 'Doku', 'Lukaku', 'Courtois', 'Tielemans'],
      startingDeck: "attacking",
      extraActions: { eureka: 1 },
      coach: 'Rudi Garcia',
      artifacts: [ 'midfieldControl'],
      primaryColor: '#e30613',
      reserveColor: '#ffcc00',
      shortsColor: '#000000',
      awayShortsColor: '#ffffff',
      startingXI: ['Courtois', 'Castagne', 'Faes', 'Debast', 'Theate', 'Doku', 'Onana', 'De Bruyne', 'Tielemans', 'Lukaku', 'Openda'],
      squad: [
        ['Courtois', 34, 'GK', 'Belgium', 3, 8, 2, 1, 8, 3, 8, 3, 10],
        ['Castagne', 30, 'DF', 'Belgium', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Faes', 28, 'DF', 'Belgium', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Debast', 22, 'DF', 'Belgium', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Theate', 26, 'DF', 'Belgium', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Doku', 24, 'MF', 'Belgium', 10, 4, 4, 7, 7, 9, 7, 3, 1],
        ['Onana', 24, 'MF', 'Belgium', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['De Bruyne', 35, 'MF', 'Belgium', 8, 5, 5, 9, 10, 9, 9, 5, 1],
        ['Tielemans', 29, 'MF', 'Belgium', 7, 6, 6, 8, 8, 8, 8, 5, 1],
        ['Lukaku', 33, 'FW', 'Belgium', 8, 4, 4, 9, 7, 7, 7, 9, 1],
        ['Openda', 26, 'FW', 'Belgium', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Casteels', 33, 'GK', 'Belgium', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['De Cuyper', 25, 'DF', 'Belgium', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Mangala', 28, 'MF', 'Belgium', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['De Ketelaere', 25, 'MF', 'Belgium', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Lukebakio', 28, 'FW', 'Belgium', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Bakayoko', 23, 'FW', 'Belgium', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Batshuayi', 32, 'FW', 'Belgium', 8, 5, 4, 9, 8, 8, 7, 7, 2],
      ],
    });
  }
}
