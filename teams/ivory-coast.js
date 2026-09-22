class IvoryCoast extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4]],
    FW: [[4, 6], [6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Ivory Coast',
      level: 1,
      starPlayers: ['Franck Kessié', 'Nicolas Pépé', 'Oumar Diakité'],
      startingDeck: "counter",
      extraActions: { ouch: 1 },
      coach: 'Emerse Faé',
      primaryColor: '#f77f00',
      reserveColor: '#ffffff',
      shortsColor: '#009e60',
      awayShortsColor: '#ffffff',
      startingXI: ['Yahia Fofana', 'Ghislain Konan', 'Odilon Kossounou', 'Evan Ndicka', 'Wilfried Singo', 'Franck Kessié', 'Ibrahim Sangaré', 'Seko Fofana', 'Simon Adingra', 'Nicolas Pépé', 'Oumar Diakité'],
      squad: [
        ['Yahia Fofana', 25, 'GK', 'Ivory Coast', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Ousmane Diomande', 22, 'DF', 'Ivory Coast', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Ghislain Konan', 30, 'DF', 'Ivory Coast', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Jean Michaël Seri', 34, 'MF', 'Ivory Coast', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Wilfried Singo', 25, 'DF', 'Ivory Coast', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Seko Fofana', 31, 'MF', 'Ivory Coast', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Odilon Kossounou', 25, 'DF', 'Ivory Coast', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Franck Kessié', 29, 'MF', 'Ivory Coast', 7, 7, 7, 7, 8, 7, 7, 6, 1],
        ['Ange-Yoan Bonny', 22, 'FW', 'Ivory Coast', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Simon Adingra', 24, 'FW', 'Ivory Coast', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Yan Diomande', 19, 'FW', 'Ivory Coast', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Elye Wahi', 23, 'FW', 'Ivory Coast', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Christopher Opéri', 29, 'DF', 'Ivory Coast', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Oumar Diakité', 22, 'FW', 'Ivory Coast', 7, 4, 4, 8, 6, 7, 7, 8, 1],
        ['Amad Diallo', 23, 'FW', 'Ivory Coast', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Mohamed Koné', 24, 'GK', 'Ivory Coast', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Guéla Doué', 23, 'DF', 'Ivory Coast', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Ibrahim Sangaré', 28, 'MF', 'Ivory Coast', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Nicolas Pépé', 31, 'FW', 'Ivory Coast', 8, 4, 4, 8, 7, 9, 7, 5, 1],
        ['Emmanuel Agbadou', 28, 'DF', 'Ivory Coast', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Evan Ndicka', 26, 'DF', 'Ivory Coast', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Evann Guessand', 24, 'FW', 'Ivory Coast', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Alban Lafont', 27, 'GK', 'Ivory Coast', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Bazoumana Touré', 20, 'FW', 'Ivory Coast', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Parfait Guiagon', 25, 'MF', 'Ivory Coast', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Christ Inao Oulaï', 20, 'MF', 'Ivory Coast', 5, 4, 6, 5, 5, 4, 6, 4, 1],
      ],
    });
  }
}
