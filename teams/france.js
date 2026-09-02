class France extends AbstractTeam {
  static formation = {
    'Maignan': [0, 3],
    'Koundé': [2, 0],
    'Saliba': [2, 2],
    'Konaté': [2, 4],
    'Théo Hernández': [2, 6],
    'Tchouaméni': [4, 2],
    'Camavinga': [4, 4],
    'Dembélé': [5, 0],
    'Rabiot': [5, 3],
    'Mbappé': [5, 6],
    'Thuram': [6, 3],
  };

  constructor() {
    super({
      name: 'France',
      level: 3,
  starPlayers: ['Mbappé', 'Saliba', 'Dembélé', 'Tchouaméni', 'Camavinga'],
      startingDeck: "attacking",
      extraActions: { eureka: 1, "touch-of-magic": 2, 'growing-menace': 1 },
      coach: 'Didier Deschamps',
      artifacts: [ 'turboLegs'],
      primaryColor: '#21304e',
      reserveColor: '#ffffff',
      shortsColor: '#ffffff',
      awayShortsColor: '#21304e',
      startingXI: ['Maignan', 'Koundé', 'Saliba', 'Konaté', 'Théo Hernández', 'Dembélé', 'Tchouaméni', 'Camavinga', 'Rabiot', 'Mbappé', 'Thuram'],
      squad: [
        ['Maignan', 30, 'GK', 'France', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['Koundé', 27, 'DF', 'France', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Saliba', 25, 'DF', 'France', 9, 9, 8, 4, 8, 6, 8, 8, 1],
        ['Konaté', 27, 'DF', 'France', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Théo Hernández', 28, 'DF', 'France', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Dembélé', 29, 'MF', 'France', 9, 5, 5, 8, 7, 10, 7, 4, 1],
        ['Tchouaméni', 26, 'MF', 'France', 7, 9, 8, 6, 8, 7, 9, 8, 1],
        ['Camavinga', 23, 'MF', 'France', 8, 7, 7, 6, 8, 8, 8, 6, 1],
        ['Rabiot', 31, 'MF', 'France', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Mbappé', 27, 'FW', 'France', 10, 4, 4, 10, 8, 10, 8, 6, 1],
        ['Thuram', 28, 'FW', 'France', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Samba', 32, 'GK', 'France', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['Upamecano', 27, 'DF', 'France', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Fofana', 27, 'MF', 'France', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Guendouzi', 27, 'MF', 'France', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Barcola', 23, 'FW', 'France', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Kolo Muani', 27, 'FW', 'France', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Olise', 24, 'FW', 'France', 8, 5, 4, 9, 8, 8, 7, 7, 2],
      ],
    });
  }
}
