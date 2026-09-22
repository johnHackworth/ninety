class France extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 2], [4, 4], [5, 3]],
    FW: [[5, 0], [5, 6], [6, 3]],
  };

  constructor() {
    super({
      name: 'France',
      level: 3,
      starPlayers: ['Kylian Mbappé', 'William Saliba', 'Ousmane Dembélé', 'Aurélien Tchouaméni', 'Adrien Rabiot'],
      startingDeck: "attacking",
      extraActions: { eureka: 1, "touch-of-magic": 2, 'growing-menace': 1 },
      coach: 'Didier Deschamps',
      artifacts: ["turboLegs"],
      primaryColor: '#002654',
      reserveColor: '#ffffff',
      shortsColor: '#002654',
      awayShortsColor: '#ed2939',
      startingXI: ['Mike Maignan', 'Jules Koundé', 'William Saliba', 'Ibrahima Konaté', 'Théo Hernandez', 'Ousmane Dembélé', 'Aurélien Tchouaméni', 'Manu Koné', 'Adrien Rabiot', 'Kylian Mbappé', 'Marcus Thuram'],
      squad: [
        ['Brice Samba', 32, 'GK', 'France', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Malo Gusto', 23, 'DF', 'France', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Lucas Digne', 32, 'DF', 'France', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Dayot Upamecano', 27, 'DF', 'France', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Jules Koundé', 27, 'DF', 'France', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Manu Koné', 25, 'MF', 'France', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Ousmane Dembélé', 29, 'FW', 'France', 9, 5, 5, 8, 7, 10, 7, 4, 1],
        ['Aurélien Tchouaméni', 26, 'MF', 'France', 7, 9, 8, 6, 8, 7, 9, 8, 1],
        ['Marcus Thuram', 28, 'FW', 'France', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Kylian Mbappé', 27, 'FW', 'France', 10, 4, 4, 10, 8, 10, 8, 6, 1],
        ['Michael Olise', 24, 'FW', 'France', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Bradley Barcola', 23, 'FW', 'France', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['N\'Golo Kanté', 35, 'MF', 'France', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Adrien Rabiot', 31, 'MF', 'France', 8, 7, 7, 6, 8, 8, 8, 6, 1],
        ['Ibrahima Konaté', 27, 'DF', 'France', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Mike Maignan', 30, 'GK', 'France', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['William Saliba', 25, 'DF', 'France', 9, 9, 8, 4, 8, 6, 8, 8, 1],
        ['Warren Zaïre-Emery', 20, 'MF', 'France', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Théo Hernandez', 28, 'DF', 'France', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Désiré Doué', 21, 'FW', 'France', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Lucas Hernandez', 30, 'DF', 'France', 8, 8, 8, 2, 9, 10, 9, 8, 1],
        ['Jean-Philippe Mateta', 28, 'FW', 'France', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Robin Risser', 21, 'GK', 'France', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Rayan Cherki', 22, 'MF', 'France', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Maghnes Akliouche', 24, 'MF', 'France', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Maxence Lacroix', 26, 'DF', 'France', 7, 7, 7, 4, 5, 2, 6, 7, 1],
      ],
    });
  }
}
