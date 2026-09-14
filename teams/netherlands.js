class Netherlands extends AbstractTeam {
  static formation = {
    'Bart Verbruggen': [0, 3],
    'Lutsharel Geertruida': [2, 0],
    'Virgil van Dijk': [2, 2],
    'Nathan Aké': [2, 4],
    'Jan Paul van Hecke': [2, 6],
    'Marten de Roon': [4, 0],
    'Justin Kluivert': [4, 2],
    'Ryan Gravenberch': [4, 4],
    'Tijjani Reijnders': [4, 6],
    'Wout Weghorst': [6, 2],
    'Memphis Depay': [6, 4],
  };

  constructor() {
    super({
      name: 'Netherlands',
      level: 3,
      starPlayers: ['Memphis Depay', 'Wout Weghorst', 'Donyell Malen', 'Denzel Dumfries'],
      startingDeck: "attacking",
      extraActions: { eureka: 1, ouch: 1, 'total-football': 1, 'the-script': 1 },
      coach: 'Ronald Koeman',
      artifacts: ["midfieldControl"],
      primaryColor: '#f58021',
      reserveColor: '#ffffff',
      shortsColor: '#ffffff',
      awayShortsColor: '#00165b',
      startingXI: ['Bart Verbruggen', 'Lutsharel Geertruida', 'Virgil van Dijk', 'Nathan Aké', 'Jan Paul van Hecke', 'Marten de Roon', 'Justin Kluivert', 'Ryan Gravenberch', 'Tijjani Reijnders', 'Wout Weghorst', 'Memphis Depay'],
      squad: [
        ['Bart Verbruggen', 23, 'GK', 'Netherlands', 2, 4, 6, 2, 4, 1, 4, 7, 8]
        ['Lutsharel Geertruida', 25, 'DF', 'Netherlands', 7, 7, 7, 4, 5, 2, 6, 7, 1]
        ['Marten de Roon', 35, 'MF', 'Netherlands', 7, 6, 6, 7, 5, 5, 8, 6, 1]
        ['Virgil van Dijk', 34, 'DF', 'Netherlands', 7, 7, 7, 4, 5, 2, 6, 7, 1]
        ['Nathan Aké', 31, 'DF', 'Netherlands', 7, 7, 7, 4, 5, 2, 6, 7, 1]
        ['Jan Paul van Hecke', 26, 'DF', 'Netherlands', 7, 7, 7, 4, 5, 2, 6, 7, 1]
        ['Justin Kluivert', 27, 'MF', 'Netherlands', 7, 6, 6, 7, 5, 5, 8, 6, 1]
        ['Ryan Gravenberch', 24, 'MF', 'Netherlands', 7, 6, 6, 7, 5, 5, 8, 6, 1]
        ['Wout Weghorst', 33, 'FW', 'Netherlands', 8, 7, 4, 8, 10, 8, 9, 9, 1]
        ['Memphis Depay', 32, 'FW', 'Netherlands', 8, 3, 9, 8, 10, 8, 9, 8, 2]
        ['Cody Gakpo', 27, 'FW', 'Netherlands', 7, 2, 2, 9, 4, 6, 4, 8, 1]
        ['Mats Wieffer', 26, 'DF', 'Netherlands', 7, 7, 7, 4, 5, 2, 6, 7, 1]
        ['Robin Roefs', 23, 'GK', 'Netherlands', 2, 4, 6, 2, 4, 1, 4, 7, 8]
        ['Tijjani Reijnders', 27, 'MF', 'Netherlands', 7, 6, 6, 7, 5, 5, 8, 6, 1]
        ['Micky van de Ven', 25, 'DF', 'Netherlands', 7, 7, 7, 4, 5, 2, 6, 7, 1]
        ['Guus Til', 28, 'MF', 'Netherlands', 7, 6, 6, 7, 5, 5, 8, 6, 1]
        ['Noa Lang', 26, 'FW', 'Netherlands', 7, 2, 2, 9, 4, 6, 4, 8, 1]
        ['Donyell Malen', 27, 'FW', 'Netherlands', 8, 3, 9, 8, 10, 8, 9, 8, 1]
        ['Brian Brobbey', 24, 'FW', 'Netherlands', 7, 2, 2, 9, 4, 6, 4, 8, 1]
        ['Teun Koopmeiners', 28, 'MF', 'Netherlands', 7, 6, 6, 7, 5, 5, 8, 6, 1]
        ['Frenkie de Jong', 29, 'MF', 'Netherlands', 7, 6, 6, 7, 5, 5, 8, 6, 1]
        ['Denzel Dumfries', 30, 'DF', 'Netherlands', 7, 8, 8, 2, 9, 10, 9, 8, 1]
        ['Mark Flekken', 32, 'GK', 'Netherlands', 2, 4, 6, 2, 4, 1, 4, 7, 8]
        ['Crysencio Summerville', 24, 'FW', 'Netherlands', 7, 2, 2, 9, 4, 6, 4, 8, 1]
        ['Jorrel Hato', 20, 'DF', 'Netherlands', 7, 7, 7, 4, 5, 2, 6, 7, 1]
        ['Quinten Timber', 24, 'MF', 'Netherlands', 7, 6, 6, 7, 5, 5, 8, 6, 1]
      ],
    });
  }
}
