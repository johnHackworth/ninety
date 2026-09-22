class Tunisia extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4], [4, 6]],
    FW: [[6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Tunisia',
      level: 1,
      starPlayers: ['Elias Achouri', 'Ellyes Skhiri'],
      startingDeck: "defensive",
      extraActions: {"teranga-roar":1},
      coach: 'Sabri Lamouchi',
      primaryColor: '#e70013',
      reserveColor: '#ffffff',
      shortsColor: '#ffffff',
      awayShortsColor: '#e70013',
      startingXI: ['Aymen Dahmen', 'Montassar Talbi', 'Ali Abdi', 'Dylan Bronn', 'Omar Rekik', 'Ellyes Skhiri', 'Anis Ben Slimane', 'Hannibal Mejbri', 'Ismaël Gharbi', 'Elias Achouri', 'Elias Saad'],
      squad: [
        ['Mouhib Chamakh', 24, 'GK', 'Tunisia', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Ali Abdi', 32, 'DF', 'Tunisia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Montassar Talbi', 28, 'DF', 'Tunisia', 6, 8, 8, 5, 9, 10, 9, 8, 1],
        ['Omar Rekik', 24, 'DF', 'Tunisia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Adem Arous', 21, 'DF', 'Tunisia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Dylan Bronn', 30, 'DF', 'Tunisia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Elias Achouri', 27, 'FW', 'Tunisia', 8, 4, 4, 8, 7, 8, 7, 4, 1],
        ['Elias Saad', 26, 'FW', 'Tunisia', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Hazem Mastouri', 28, 'FW', 'Tunisia', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Hannibal Mejbri', 23, 'MF', 'Tunisia', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Ismaël Gharbi', 22, 'MF', 'Tunisia', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Mortadha Ben Ouanes', 31, 'DF', 'Tunisia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Rani Khedira', 32, 'MF', 'Tunisia', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Khalil Ayari', 21, 'MF', 'Tunisia', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Mohamed Belhadj Mahmoud', 26, 'MF', 'Tunisia', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Aymen Dahmen', 29, 'GK', 'Tunisia', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Ellyes Skhiri', 31, 'MF', 'Tunisia', 7, 7, 8, 5, 7, 6, 7, 6, 1],
        ['Rayan Elloumi', 18, 'FW', 'Tunisia', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Firas Chaouat', 30, 'FW', 'Tunisia', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Yan Valery', 27, 'DF', 'Tunisia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Mohamed Amine Ben Hamida', 30, 'DF', 'Tunisia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Sabri Ben Hessen', 29, 'GK', 'Tunisia', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Moutaz Neffati', 21, 'DF', 'Tunisia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Raed Chikhaoui', 22, 'DF', 'Tunisia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Anis Ben Slimane', 25, 'MF', 'Tunisia', 8, 10, 9, 9, 8, 8, 8, 8, 1],
        ['Sebastian Tounekti', 23, 'MF', 'Tunisia', 5, 4, 6, 5, 5, 4, 6, 4, 1],
      ],
    });
  }
}
