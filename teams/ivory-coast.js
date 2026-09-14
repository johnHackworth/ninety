class IvoryCoast extends AbstractTeam {
  static formation = {
    'Yahia Fofana': [0, 3],
    'Ousmane Diomande': [2, 0],
    'Ghislain Konan': [2, 2],
    'Wilfried Singo': [2, 4],
    'Odilon Kossounou': [2, 6],
    'Jean Michaël Seri': [4, 0],
    'Seko Fofana': [4, 2],
    'Franck Kessié': [4, 4],
    'Ibrahim Sangaré': [4, 6],
    'Ange-Yoan Bonny': [6, 2],
    'Simon Adingra': [6, 4],
  };

  constructor() {
    super({
      name: 'Ivory Coast',
      level: 1,
      starPlayers: ['Franck Kessié', 'Oumar Diakité', 'Nicolas Pépé'],
      startingDeck: "counter",
      extraActions: { ouch: 1 },
      coach: 'Emerse Faé',
      primaryColor: '#f77f00',
      reserveColor: '#ffffff',
      shortsColor: '#009e60',
      awayShortsColor: '#ffffff',
      startingXI: ['Yahia Fofana', 'Ousmane Diomande', 'Ghislain Konan', 'Wilfried Singo', 'Odilon Kossounou', 'Jean Michaël Seri', 'Seko Fofana', 'Franck Kessié', 'Ibrahim Sangaré', 'Ange-Yoan Bonny', 'Simon Adingra'],
      squad: [
        ['Yahia Fofana', 25, 'GK', 'Ivory Coast', 3, 7, 5, 2, 8, 3, 10, 6, 10],
        ['Ousmane Diomande', 22, 'DF', 'Ivory Coast', 10, 9, 8, 4, 6, 6, 6, 7, 2],
        ['Ghislain Konan', 30, 'DF', 'Ivory Coast', 6, 10, 8, 4, 10, 6, 9, 9, 2],
        ['Jean Michaël Seri', 34, 'MF', 'Ivory Coast', 10, 7, 6, 6, 10, 7, 9, 7, 1],
        ['Wilfried Singo', 25, 'DF', 'Ivory Coast', 7, 10, 10, 2, 9, 6, 9, 9, 1],
        ['Seko Fofana', 31, 'MF', 'Ivory Coast', 10, 8, 10, 9, 10, 9, 10, 7, 1],
        ['Odilon Kossounou', 25, 'DF', 'Ivory Coast', 7, 9, 9, 5, 6, 10, 8, 8, 1],
        ['Franck Kessié', 29, 'MF', 'Ivory Coast', 10, 5, 7, 9, 10, 10, 10, 9, 1],
        ['Ange-Yoan Bonny', 22, 'FW', 'Ivory Coast', 10, 4, 2, 8, 7, 10, 8, 7, 1],
        ['Simon Adingra', 24, 'FW', 'Ivory Coast', 10, 5, 3, 10, 10, 10, 9, 9, 1],
        ['Yan Diomande', 19, 'FW', 'Ivory Coast', 9, 4, 5, 10, 7, 10, 9, 6, 1],
        ['Elye Wahi', 23, 'FW', 'Ivory Coast', 8, 2, 4, 7, 5, 8, 5, 8, 1],
        ['Christopher Opéri', 29, 'DF', 'Ivory Coast', 5, 10, 7, 3, 8, 5, 7, 7, 1],
        ['Oumar Diakité', 22, 'FW', 'Ivory Coast', 10, 4, 8, 10, 10, 10, 8, 10, 1],
        ['Amad Diallo', 23, 'FW', 'Ivory Coast', 10, 2, 5, 10, 10, 10, 6, 7, 1],
        ['Mohamed Koné', 24, 'GK', 'Ivory Coast', 4, 6, 3, 1, 4, 2, 8, 7, 7],
        ['Guéla Doué', 23, 'DF', 'Ivory Coast', 6, 10, 10, 3, 9, 8, 10, 10, 2],
        ['Ibrahim Sangaré', 28, 'MF', 'Ivory Coast', 10, 6, 10, 5, 10, 9, 10, 10, 1],
        ['Nicolas Pépé', 31, 'FW', 'Ivory Coast', 10, 7, 4, 10, 10, 10, 9, 10, 2],
        ['Emmanuel Agbadou', 28, 'DF', 'Ivory Coast', 8, 8, 10, 3, 9, 5, 8, 9, 1],
        ['Evan Ndicka', 26, 'DF', 'Ivory Coast', 6, 9, 7, 3, 8, 8, 8, 10, 2],
        ['Evann Guessand', 24, 'FW', 'Ivory Coast', 10, 3, 6, 9, 8, 10, 9, 5, 1],
        ['Alban Lafont', 27, 'GK', 'Ivory Coast', 5, 6, 4, 1, 6, 1, 8, 3, 10],
        ['Bazoumana Touré', 20, 'FW', 'Ivory Coast', 8, 4, 5, 10, 7, 10, 9, 7, 1],
        ['Parfait Guiagon', 25, 'MF', 'Ivory Coast', 7, 7, 7, 5, 8, 6, 6, 5, 2],
        ['Christ Inao Oulaï', 20, 'MF', 'Ivory Coast', 8, 4, 8, 8, 9, 10, 6, 7, 2]
      ],
    });
  }
}
