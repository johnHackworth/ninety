class Netherlands extends AbstractTeam {
  static formation = {
    'Verbruggen': [0, 3],
    'Dumfries': [2, 0],
    'van Dijk': [2, 2],
    'de Ligt': [2, 4],
    'Aké': [2, 6],
    'Reijnders': [4, 1],
    'Frenkie de Jong': [3, 3],
    'Simons': [4, 5],
    'Gakpo': [6, 1],
    'Depay': [5, 3],
    'Brobbey': [6, 5],
  };

  constructor() {
    super({
      name: 'Netherlands',
      level: 3,
  starPlayers: ['van Dijk', 'Frenkie de Jong', 'Depay', 'Gakpo', 'Simons'],
      startingDeck: "attacking",
      extraActions: { eureka: 1, ouch: 1, 'total-football': 1, 'the-script': 1 },
      coach: 'Ronald Koeman',
      artifacts: [ 'midfieldControl'],
      primaryColor: '#ff7f00',
      reserveColor: '#003580',
      shortsColor: '#000000',
      awayShortsColor: '#000000',
      startingXI: ['Verbruggen', 'Dumfries', 'van Dijk', 'de Ligt', 'Aké', 'Simons', 'Reijnders', 'Frenkie de Jong', 'Gakpo', 'Depay', 'Brobbey'],
      squad: [
        ['Verbruggen', 23, 'GK', 'Netherlands', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['Dumfries', 30, 'DF', 'Netherlands', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['van Dijk', 35, 'DF', 'Netherlands', 7, 10, 9, 4, 8, 7, 9, 10, 1],
        ['de Ligt', 26, 'DF', 'Netherlands', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Aké', 31, 'DF', 'Netherlands', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Simons', 23, 'MF', 'Netherlands', 8, 5, 5, 8, 9, 9, 8, 4, 1],
        ['Reijnders', 28, 'MF', 'Netherlands', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Frenkie de Jong', 29, 'MF', 'Netherlands', 7, 7, 7, 7, 9, 9, 9, 5, 1],
        ['Gakpo', 27, 'MF', 'Netherlands', 8, 5, 5, 8, 8, 8, 7, 6, 1],
        ['Depay', 32, 'FW', 'Netherlands', 8, 4, 4, 9, 8, 8, 8, 5, 1],
        ['Brobbey', 24, 'FW', 'Netherlands', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Flekken', 33, 'GK', 'Netherlands', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['de Vrij', 34, 'DF', 'Netherlands', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Gravenberch', 24, 'MF', 'Netherlands', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Schouten', 29, 'MF', 'Netherlands', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Malen', 27, 'FW', 'Netherlands', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Kluivert', 27, 'FW', 'Netherlands', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Wieffer', 26, 'MF', 'Netherlands', 7, 7, 7, 7, 9, 8, 8, 6, 2],
      ],
    });
  }
}
