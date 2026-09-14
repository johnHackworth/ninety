class Tunisia extends AbstractTeam {
  static formation = {
    'Mouhib Chamakh': [0, 3],
    'Ali Abdi': [2, 0],
    'Montassar Talbi': [2, 2],
    'Omar Rekik': [2, 4],
    'Adem Arous': [2, 6],
    'Hannibal Mejbri': [4, 0],
    'Ismaël Gharbi': [4, 2],
    'Rani Khedira': [4, 4],
    'Khalil Ayari': [4, 6],
    'Elias Achouri': [6, 2],
    'Elias Saad': [6, 4],
  };

  constructor() {
    super({
      name: 'Tunisia',
      level: 1,
      starPlayers: ['Anis Ben Slimane', 'Ellyes Skhiri', 'Montassar Talbi'],
      startingDeck: "defensive",
      extraActions: {"teranga-roar":1},
      coach: 'Sabri Lamouchi',
      primaryColor: '#e70013',
      reserveColor: '#ffffff',
      shortsColor: '#ffffff',
      awayShortsColor: '#e70013',
      startingXI: ['Mouhib Chamakh', 'Ali Abdi', 'Montassar Talbi', 'Omar Rekik', 'Adem Arous', 'Hannibal Mejbri', 'Ismaël Gharbi', 'Rani Khedira', 'Khalil Ayari', 'Elias Achouri', 'Elias Saad'],
      squad: [
        ['Mouhib Chamakh', 24, 'GK', 'Tunisia', 4, 6, 1, 1, 5, 3, 5, 6, 8],
        ['Ali Abdi', 32, 'DF', 'Tunisia', 10, 10, 10, 3, 10, 7, 7, 10, 1],
        ['Montassar Talbi', 28, 'DF', 'Tunisia', 6, 10, 10, 5, 10, 10, 9, 10, 1],
        ['Omar Rekik', 24, 'DF', 'Tunisia', 5, 8, 8, 4, 5, 6, 5, 6, 1],
        ['Adem Arous', 21, 'DF', 'Tunisia', 8, 8, 8, 1, 9, 6, 6, 7, 1],
        ['Dylan Bronn', 30, 'DF', 'Tunisia', 9, 10, 10, 5, 10, 6, 7, 10, 1],
        ['Elias Achouri', 27, 'FW', 'Tunisia', 10, 5, 5, 9, 7, 8, 10, 6, 1],
        ['Elias Saad', 26, 'FW', 'Tunisia', 10, 3, 5, 9, 6, 10, 6, 6, 1],
        ['Hazem Mastouri', 28, 'FW', 'Tunisia', 7, 5, 4, 9, 9, 10, 8, 6, 1],
        ['Hannibal Mejbri', 23, 'MF', 'Tunisia', 10, 8, 7, 8, 10, 9, 10, 6, 1],
        ['Ismaël Gharbi', 22, 'MF', 'Tunisia', 8, 6, 6, 8, 10, 9, 10, 6, 1],
        ['Mortadha Ben Ouanes', 31, 'DF', 'Tunisia', 8, 10, 10, 4, 6, 7, 6, 8, 1],
        ['Rani Khedira', 32, 'MF', 'Tunisia', 7, 3, 5, 4, 10, 6, 6, 6, 2],
        ['Khalil Ayari', 21, 'MF', 'Tunisia', 8, 5, 5, 4, 7, 8, 7, 5, 2],
        ['Mohamed Belhadj Mahmoud', 26, 'MF', 'Tunisia', 9, 3, 9, 6, 8, 10, 7, 4, 1],
        ['Aymen Dahmen', 29, 'GK', 'Tunisia', 3, 10, 5, 1, 10, 3, 8, 10, 10],
        ['Ellyes Skhiri', 31, 'MF', 'Tunisia', 10, 10, 10, 7, 10, 8, 8, 7, 1],
        ['Rayan Elloumi', 18, 'FW', 'Tunisia', 10, 3, 5, 8, 6, 10, 7, 5, 1],
        ['Firas Chaouat', 30, 'FW', 'Tunisia', 10, 3, 4, 10, 10, 10, 10, 9, 1],
        ['Yan Valery', 27, 'DF', 'Tunisia', 8, 8, 9, 3, 10, 5, 6, 10, 1],
        ['Mohamed Amine Ben Hamida', 30, 'DF', 'Tunisia', 5, 10, 10, 2, 5, 6, 7, 7, 1],
        ['Sabri Ben Hessen', 29, 'GK', 'Tunisia', 5, 5, 4, 1, 8, 4, 8, 5, 8],
        ['Moutaz Neffati', 21, 'DF', 'Tunisia', 8, 8, 9, 4, 7, 7, 5, 7, 2],
        ['Raed Chikhaoui', 22, 'DF', 'Tunisia', 7, 9, 6, 3, 7, 7, 9, 8, 2],
        ['Anis Ben Slimane', 25, 'MF', 'Tunisia', 10, 10, 9, 10, 9, 10, 10, 8, 1],
        ['Sebastian Tounekti', 23, 'MF', 'Tunisia', 8, 4, 8, 5, 10, 8, 10, 7, 1]
      ],
    });
  }
}
