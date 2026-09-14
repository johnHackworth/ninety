class Haiti extends AbstractTeam {
  static formation = {
    'Johny Placide': [0, 3],
    'Carlens Arcus': [2, 0],
    'Keeto Thermoncy': [2, 2],
    'Ricardo Adé': [2, 4],
    'Hannes Delcroix': [2, 6],
    'Carl Sainté': [4, 0],
    'Jean-Ricner Bellegarde': [4, 2],
    'Danley Jean Jacques': [4, 4],
    'Dominique Simon': [4, 6],
    'Derrick Etienne Jr.': [6, 2],
    'Duckens Nazon': [6, 4],
  };

  constructor() {
    super({
      name: 'Haiti',
      level: 1,
      starPlayers: ['Duckens Nazon', 'Frantzdy Pierrot', 'Derrick Etienne Jr.', 'Louicius Deedson'],
      startingDeck: "counter",
      extraActions: {"park-the-bus":1},
      coach: 'Sébastien Migné',
      artifacts: ["clinicalFinisher"],
      primaryColor: '#00209f',
      reserveColor: '#d21034',
      shortsColor: '#00209f',
      awayShortsColor: '#ffffff',
      startingXI: ['Johny Placide', 'Carlens Arcus', 'Keeto Thermoncy', 'Ricardo Adé', 'Hannes Delcroix', 'Carl Sainté', 'Jean-Ricner Bellegarde', 'Danley Jean Jacques', 'Dominique Simon', 'Derrick Etienne Jr.', 'Duckens Nazon'],
      squad: [
        ['Johny Placide', 38, 'GK', 'Haiti', 3, 8, 3, 1, 6, 4, 9, 6, 10],
        ['Carlens Arcus', 29, 'DF', 'Haiti', 8, 10, 8, 4, 8, 5, 10, 10, 1],
        ['Keeto Thermoncy', 20, 'DF', 'Haiti', 5, 9, 9, 2, 6, 7, 6, 9, 1],
        ['Ricardo Adé', 36, 'DF', 'Haiti', 8, 10, 7, 4, 7, 7, 6, 9, 1],
        ['Hannes Delcroix', 27, 'DF', 'Haiti', 8, 10, 9, 2, 7, 5, 7, 6, 1],
        ['Carl Sainté', 23, 'MF', 'Haiti', 9, 5, 10, 5, 9, 10, 10, 5, 1],
        ['Derrick Etienne Jr.', 29, 'FW', 'Haiti', 10, 4, 8, 10, 10, 10, 7, 10, 1],
        ['Martin Expérience', 27, 'DF', 'Haiti', 9, 10, 9, 2, 5, 6, 9, 8, 1],
        ['Duckens Nazon', 32, 'FW', 'Haiti', 10, 5, 7, 10, 10, 10, 10, 10, 1],
        ['Jean-Ricner Bellegarde', 27, 'MF', 'Haiti', 6, 4, 8, 5, 8, 6, 8, 8, 1],
        ['Louicius Deedson', 25, 'FW', 'Haiti', 10, 4, 7, 10, 8, 10, 10, 10, 1],
        ['Alexandre Pierre', 25, 'GK', 'Haiti', 5, 8, 2, 1, 9, 5, 6, 6, 10],
        ['Duke Lacroix', 32, 'DF', 'Haiti', 7, 8, 10, 2, 7, 6, 9, 10, 1],
        ['Garven Metusala', 26, 'DF', 'Haiti', 10, 9, 9, 1, 8, 4, 9, 9, 2],
        ['Ruben Providence', 24, 'FW', 'Haiti', 10, 3, 6, 9, 7, 9, 6, 9, 1],
        ['Lenny Joseph', 25, 'FW', 'Haiti', 9, 4, 3, 7, 4, 8, 5, 5, 1],
        ['Danley Jean Jacques', 26, 'MF', 'Haiti', 10, 9, 10, 8, 10, 7, 10, 5, 1],
        ['Wilson Isidor', 25, 'FW', 'Haiti', 8, 2, 3, 8, 5, 10, 4, 8, 1],
        ['Yassin Fortuné', 27, 'FW', 'Haiti', 8, 1, 2, 9, 4, 10, 6, 5, 1],
        ['Frantzdy Pierrot', 31, 'FW', 'Haiti', 10, 4, 8, 10, 9, 10, 10, 10, 2],
        ['Josué Casimir', 24, 'FW', 'Haiti', 7, 4, 5, 8, 5, 9, 8, 6, 1],
        ['Jean-Kévin Duverne', 28, 'DF', 'Haiti', 8, 8, 8, 5, 7, 7, 7, 8, 1],
        ['Josué Duverger', 26, 'GK', 'Haiti', 3, 7, 4, 1, 5, 4, 9, 7, 8],
        ['Wilguens Paugain', 24, 'DF', 'Haiti', 7, 8, 9, 3, 6, 6, 7, 9, 2],
        ['Dominique Simon', 25, 'MF', 'Haiti', 7, 5, 7, 6, 8, 7, 5, 6, 1],
        ['Woodensky Pierre', 21, 'MF', 'Haiti', 8, 6, 9, 4, 10, 9, 10, 8, 1]
      ],
    });
  }
}

module.exports = Haiti;