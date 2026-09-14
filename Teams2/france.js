class France extends AbstractTeam {
  static formation = {
    'Brice Samba': [0, 3],
    'Malo Gusto': [2, 0],
    'Lucas Digne': [2, 2],
    'Dayot Upamecano': [2, 4],
    'Jules Koundé': [2, 6],
    'Manu Koné': [4, 0],
    'Aurélien Tchouaméni': [4, 2],
    'N\'Golo Kanté': [4, 4],
    'Adrien Rabiot': [4, 6],
    'Ousmane Dembélé': [6, 2],
    'Marcus Thuram': [6, 4],
  };

  constructor() {
    super({
      name: 'France',
      level: 3,
      starPlayers: ['Kylian Mbappé', 'Adrien Rabiot', 'Ousmane Dembélé', 'Lucas Hernandez', 'Aurélien Tchouaméni'],
      startingDeck: "balanced",
      extraActions: {"wing-play":1},
      coach: 'Didier Deschamps',
      artifacts: ["clinicalFinisher"],
      primaryColor: '#002654',
      reserveColor: '#ffffff',
      shortsColor: '#002654',
      awayShortsColor: '#ed2939',
      startingXI: ['Brice Samba', 'Malo Gusto', 'Lucas Digne', 'Dayot Upamecano', 'Jules Koundé', 'Manu Koné', 'Aurélien Tchouaméni', 'N\'Golo Kanté', 'Adrien Rabiot', 'Ousmane Dembélé', 'Marcus Thuram'],
      squad: [
        ['Brice Samba', 32, 'GK', 'France', 5, 8, 2, 1, 5, 2, 8, 6, 9],
        ['Malo Gusto', 23, 'DF', 'France', 6, 9, 9, 3, 9, 5, 8, 10, 1],
        ['Lucas Digne', 32, 'DF', 'France', 6, 10, 10, 2, 7, 6, 9, 9, 2],
        ['Dayot Upamecano', 27, 'DF', 'France', 7, 10, 9, 5, 7, 5, 9, 9, 1],
        ['Jules Koundé', 27, 'DF', 'France', 10, 10, 10, 4, 8, 6, 6, 8, 1],
        ['Manu Koné', 25, 'MF', 'France', 9, 6, 7, 5, 10, 7, 9, 5, 2],
        ['Ousmane Dembélé', 29, 'FW', 'France', 10, 6, 4, 10, 10, 10, 8, 10, 1],
        ['Aurélien Tchouaméni', 26, 'MF', 'France', 8, 6, 10, 6, 10, 10, 10, 5, 1],
        ['Marcus Thuram', 28, 'FW', 'France', 10, 3, 4, 10, 8, 10, 8, 6, 1],
        ['Kylian Mbappé', 27, 'FW', 'France', 10, 2, 7, 10, 9, 10, 10, 10, 1],
        ['Michael Olise', 24, 'FW', 'France', 10, 3, 6, 10, 6, 10, 6, 10, 1],
        ['Bradley Barcola', 23, 'FW', 'France', 9, 4, 5, 10, 9, 10, 8, 10, 1],
        ['N\'Golo Kanté', 35, 'MF', 'France', 8, 5, 9, 8, 10, 7, 10, 5, 1],
        ['Adrien Rabiot', 31, 'MF', 'France', 10, 8, 8, 8, 10, 10, 10, 10, 2],
        ['Ibrahima Konaté', 27, 'DF', 'France', 6, 10, 10, 3, 6, 5, 10, 8, 1],
        ['Mike Maignan', 30, 'GK', 'France', 3, 9, 3, 2, 10, 3, 10, 9, 10],
        ['William Saliba', 25, 'DF', 'France', 6, 9, 10, 2, 10, 9, 10, 10, 2],
        ['Warren Zaïre-Emery', 20, 'MF', 'France', 7, 7, 6, 8, 10, 7, 9, 5, 2],
        ['Théo Hernandez', 28, 'DF', 'France', 8, 9, 8, 5, 6, 9, 10, 10, 1],
        ['Désiré Doué', 21, 'FW', 'France', 10, 4, 5, 9, 6, 10, 6, 6, 1],
        ['Lucas Hernandez', 30, 'DF', 'France', 10, 10, 10, 2, 10, 10, 10, 10, 1],
        ['Jean-Philippe Mateta', 28, 'FW', 'France', 10, 3, 3, 9, 6, 10, 5, 7, 1],
        ['Robin Risser', 21, 'GK', 'France', 4, 6, 4, 1, 7, 1, 8, 6, 8],
        ['Rayan Cherki', 22, 'MF', 'France', 7, 7, 7, 5, 10, 10, 9, 5, 1],
        ['Maghnes Akliouche', 24, 'MF', 'France', 8, 5, 5, 6, 9, 10, 7, 4, 2],
        ['Maxence Lacroix', 26, 'DF', 'France', 8, 9, 7, 2, 7, 4, 6, 9, 1]
      ],
    });
  }
}

module.exports = France;