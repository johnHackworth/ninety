class Haiti extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4], [4, 6]],
    FW: [[6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Haiti',
      level: 1,
      starPlayers: ['Jean-Ricner Bellegarde', 'Danley Jean Jacques'],
      startingDeck: "defensive",
      extraActions: { 'underdog-bite': 1 },
      coach: 'Sébastien Migné',
      artifacts: ["minnowWill"],
      primaryColor: '#00209f',
      reserveColor: '#d21034',
      shortsColor: '#00209f',
      awayShortsColor: '#ffffff',
      startingXI: ['Johny Placide', 'Jean-Kévin Duverne', 'Ricardo Adé', 'Garven Metusala', 'Carlens Arcus', 'Jean-Ricner Bellegarde', 'Danley Jean Jacques', 'Carl Sainté', 'Dominique Simon', 'Frantzdy Pierrot', 'Wilson Isidor'],
      squad: [
        ['Johny Placide', 38, 'GK', 'Haiti', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Carlens Arcus', 29, 'DF', 'Haiti', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Keeto Thermoncy', 20, 'DF', 'Haiti', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Ricardo Adé', 36, 'DF', 'Haiti', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Hannes Delcroix', 27, 'DF', 'Haiti', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Carl Sainté', 23, 'MF', 'Haiti', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Derrick Etienne Jr.', 29, 'FW', 'Haiti', 8, 4, 8, 8, 10, 9, 7, 9, 1],
        ['Martin Expérience', 27, 'DF', 'Haiti', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Duckens Nazon', 32, 'FW', 'Haiti', 8, 5, 7, 8, 10, 8, 9, 9, 1],
        ['Jean-Ricner Bellegarde', 27, 'MF', 'Haiti', 6, 6, 6, 6, 7, 7, 6, 4, 1],
        ['Louicius Deedson', 25, 'FW', 'Haiti', 8, 4, 7, 8, 8, 9, 10, 9, 1],
        ['Alexandre Pierre', 25, 'GK', 'Haiti', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Duke Lacroix', 32, 'DF', 'Haiti', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Garven Metusala', 26, 'DF', 'Haiti', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Ruben Providence', 24, 'FW', 'Haiti', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Lenny Joseph', 25, 'FW', 'Haiti', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Danley Jean Jacques', 26, 'MF', 'Haiti', 6, 6, 6, 6, 7, 6, 6, 5, 1],
        ['Wilson Isidor', 25, 'FW', 'Haiti', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Yassin Fortuné', 27, 'FW', 'Haiti', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Frantzdy Pierrot', 31, 'FW', 'Haiti', 8, 4, 8, 8, 9, 8, 10, 9, 2],
        ['Josué Casimir', 24, 'FW', 'Haiti', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Jean-Kévin Duverne', 28, 'DF', 'Haiti', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Josué Duverger', 26, 'GK', 'Haiti', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Wilguens Paugain', 24, 'DF', 'Haiti', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Dominique Simon', 25, 'MF', 'Haiti', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Woodensky Pierre', 21, 'MF', 'Haiti', 5, 4, 6, 5, 5, 4, 6, 4, 1],
      ],
    });
  }
}
