class Haiti extends AbstractTeam {
  static formation = {
    'Johny Placide': [0, 3],
    'Jean-Kévin Duverne': [2, 0],
    'Ricardo Adé': [2, 2],
    'Garven Metusala': [2, 4],
    'Carlens Arcus': [2, 6],
    'Jean-Ricner Bellegarde': [4, 0],
    'Danley Jean Jacques': [4, 2],
    'Carl Sainté': [4, 4],
    'Dominique Simon': [4, 6],
    'Frantzdy Pierrot': [6, 2],
    'Wilson Isidor': [6, 4],
  };

  constructor() {
    super({
      name: 'Haiti',
      level: 0,
  starPlayers: ['Jean-Ricner Bellegarde', 'Danley Jean Jacques'],
      startingDeck: "defensive",
      extraActions: { 'underdog-bite': 1 },
      coach: 'Sébastien Migné',
      artifacts: [ 'minnowWill'],
      primaryColor: '#00209f',
      reserveColor: '#d21034',
      shortsColor: '#ffffff',
      awayShortsColor: '#00209f',
      startingXI: ['Johny Placide', 'Jean-Kévin Duverne', 'Ricardo Adé', 'Garven Metusala', 'Carlens Arcus', 'Jean-Ricner Bellegarde', 'Danley Jean Jacques', 'Carl Sainté', 'Dominique Simon', 'Frantzdy Pierrot', 'Wilson Isidor'],
      squad: [
        ['Johny Placide', 38, 'GK', 'Haiti', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Josué Duverger', 26, 'GK', 'Haiti', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Jean-Kévin Duverne', 29, 'DF', 'Haiti', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Ricardo Adé', 36, 'DF', 'Haiti', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Garven Metusala', 26, 'DF', 'Haiti', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Carlens Arcus', 30, 'DF', 'Haiti', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Wilguens Paugain', 24, 'DF', 'Haiti', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Jean-Ricner Bellegarde', 28, 'MF', 'Haiti', 6, 6, 6, 6, 7, 7, 6, 4, 1],
        ['Danley Jean Jacques', 26, 'MF', 'Haiti', 6, 6, 6, 6, 7, 6, 6, 5, 1],
        ['Carl Sainté', 23, 'MF', 'Haiti', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Dominique Simon', 26, 'MF', 'Haiti', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Woodensky Pierre', 21, 'MF', 'Haiti', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Leverton Pierre', 24, 'MF', 'Haiti', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Frantzdy Pierrot', 31, 'FW', 'Haiti', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Wilson Isidor', 25, 'FW', 'Haiti', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Duckens Nazon', 32, 'FW', 'Haiti', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Derrick Etienne', 30, 'FW', 'Haiti', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Josué Casimir', 24, 'FW', 'Haiti', 5, 2, 1, 6, 5, 5, 4, 4, 1],
      ],
    });
  }
}
