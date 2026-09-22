class Netherlands extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 5], [4, 1], [3, 3]],
    FW: [[6, 1], [5, 3], [6, 5]],
  };

  constructor() {
    super({
      name: 'Netherlands',
      level: 3,
      starPlayers: ['Virgil van Dijk', 'Frenkie de Jong', 'Memphis Depay', 'Cody Gakpo', 'Marten de Roon'],
      startingDeck: "attacking",
      extraActions: { eureka: 1, ouch: 1, 'total-football': 1, 'the-script': 1 },
      coach: 'Ronald Koeman',
      artifacts: ["midfieldControl"],
      primaryColor: '#f58021',
      reserveColor: '#ffffff',
      shortsColor: '#ffffff',
      awayShortsColor: '#00165b',
      startingXI: ['Bart Verbruggen', 'Denzel Dumfries', 'Virgil van Dijk', 'Lutsharel Geertruida', 'Nathan Aké', 'Marten de Roon', 'Tijjani Reijnders', 'Frenkie de Jong', 'Cody Gakpo', 'Memphis Depay', 'Brian Brobbey'],
      squad: [
        ['Bart Verbruggen', 23, 'GK', 'Netherlands', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Lutsharel Geertruida', 25, 'DF', 'Netherlands', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Marten de Roon', 35, 'MF', 'Netherlands', 8, 5, 5, 8, 9, 9, 8, 4, 1],
        ['Virgil van Dijk', 34, 'DF', 'Netherlands', 7, 10, 9, 4, 8, 7, 9, 10, 1],
        ['Nathan Aké', 31, 'DF', 'Netherlands', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Jan Paul van Hecke', 26, 'DF', 'Netherlands', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Justin Kluivert', 27, 'MF', 'Netherlands', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Ryan Gravenberch', 24, 'MF', 'Netherlands', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Wout Weghorst', 33, 'FW', 'Netherlands', 8, 7, 4, 8, 10, 8, 9, 9, 1],
        ['Memphis Depay', 32, 'FW', 'Netherlands', 8, 4, 4, 9, 8, 8, 8, 5, 1],
        ['Cody Gakpo', 27, 'FW', 'Netherlands', 8, 5, 5, 8, 8, 8, 7, 6, 1],
        ['Mats Wieffer', 26, 'DF', 'Netherlands', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Robin Roefs', 23, 'GK', 'Netherlands', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Tijjani Reijnders', 27, 'MF', 'Netherlands', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Micky van de Ven', 25, 'DF', 'Netherlands', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Guus Til', 28, 'MF', 'Netherlands', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Noa Lang', 26, 'FW', 'Netherlands', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Donyell Malen', 27, 'FW', 'Netherlands', 8, 3, 9, 8, 10, 8, 9, 8, 1],
        ['Brian Brobbey', 24, 'FW', 'Netherlands', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Teun Koopmeiners', 28, 'MF', 'Netherlands', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Frenkie de Jong', 29, 'MF', 'Netherlands', 7, 7, 7, 7, 9, 9, 9, 5, 1],
        ['Denzel Dumfries', 30, 'DF', 'Netherlands', 7, 8, 8, 2, 9, 10, 9, 8, 1],
        ['Mark Flekken', 32, 'GK', 'Netherlands', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Crysencio Summerville', 24, 'FW', 'Netherlands', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Jorrel Hato', 20, 'DF', 'Netherlands', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Quinten Timber', 24, 'MF', 'Netherlands', 7, 6, 6, 7, 5, 5, 8, 6, 1],
      ],
    });
  }
}
