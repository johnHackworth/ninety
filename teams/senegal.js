class Senegal extends AbstractTeam {
  static formation = {
    'Édouard Mendy': [0, 3],
    'Koulibaly': [2, 0],
    'Abdou Diallo': [2, 2],
    'Niakhaté': [2, 4],
    'Jakobs': [2, 6],
    'Idrissa Gueye': [4, 0],
    'Pape Matar Sarr': [4, 2],
    'Lamine Camara': [4, 4],
    'Ismaïla Sarr': [4, 6],
    'Mané': [6, 2],
    'Nicolas Jackson': [6, 4],
  };

  constructor() {
    super({
      name: 'Senegal',
      level: 2,
  starPlayers: ['Mané', 'Koulibaly', 'Nicolas Jackson', 'Édouard Mendy'],
      startingDeck: "counter",
      extraActions: { eureka: 1, ouch: 1, 'teranga-roar': 1 },
      coach: 'Pape Thiaw',
      artifacts: [ 'turboLegs'],
      primaryColor: '#ffffff',
      reserveColor: '#00853f',
      shortsColor: '#ffffff',
      awayShortsColor: '#ffffff',
      startingXI: ['Édouard Mendy', 'Koulibaly', 'Abdou Diallo', 'Niakhaté', 'Jakobs', 'Idrissa Gueye', 'Pape Matar Sarr', 'Lamine Camara', 'Ismaïla Sarr', 'Mané', 'Nicolas Jackson'],
      squad: [
        ['Édouard Mendy', 34, 'GK', 'Senegal', 4, 7, 2, 1, 7, 3, 7, 3, 9],
        ['Koulibaly', 35, 'DF', 'Senegal', 8, 9, 9, 4, 7, 5, 8, 9, 1],
        ['Abdou Diallo', 30, 'DF', 'Senegal', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Niakhaté', 30, 'DF', 'Senegal', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Jakobs', 26, 'DF', 'Senegal', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['El Hadji Malick Diouf', 21, 'DF', 'Senegal', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Idrissa Gueye', 36, 'MF', 'Senegal', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Pape Matar Sarr', 23, 'MF', 'Senegal', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Lamine Camara', 22, 'MF', 'Senegal', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Nampalys Mendy', 34, 'MF', 'Senegal', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Kouyaté', 36, 'MF', 'Senegal', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Pape Gueye', 27, 'MF', 'Senegal', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Mané', 34, 'FW', 'Senegal', 9, 4, 4, 8, 7, 9, 8, 5, 1],
        ['Nicolas Jackson', 25, 'FW', 'Senegal', 9, 5, 5, 8, 6, 8, 7, 6, 1],
        ['Ismaïla Sarr', 28, 'MF', 'Senegal', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Iliman Ndiaye', 26, 'FW', 'Senegal', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Boulaye Dia', 29, 'FW', 'Senegal', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Seny Dieng', 31, 'GK', 'Senegal', 3, 7, 2, 1, 7, 3, 6, 3, 8],
      ],
    });
  }
}
