class Senegal extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4]],
    FW: [[4, 6], [6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Senegal',
      level: 2,
      starPlayers: ['Sadio Mané', 'Kalidou Koulibaly', 'Nicolas Jackson', 'Édouard Mendy'],
      startingDeck: "counter",
      extraActions: { eureka: 1, ouch: 1, 'teranga-roar': 1 },
      coach: 'Pape Thiaw',
      artifacts: ["turboLegs"],
      primaryColor: '#00853f',
      reserveColor: '#fefefe',
      shortsColor: '#00853f',
      awayShortsColor: '#fefefe',
      startingXI: ['Édouard Mendy', 'Kalidou Koulibaly', 'Mamadou Sarr', 'Moussa Niakhaté', 'Ismail Jakobs', 'Idrissa Gueye', 'Pape Matar Sarr', 'Lamine Camara', 'Ismaïla Sarr', 'Sadio Mané', 'Nicolas Jackson'],
      squad: [
        ['Yehvann Diouf', 26, 'GK', 'Senegal', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Mamadou Sarr', 20, 'DF', 'Senegal', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Kalidou Koulibaly', 34, 'DF', 'Senegal', 8, 9, 9, 4, 7, 5, 8, 9, 1],
        ['Abdoulaye Seck', 34, 'DF', 'Senegal', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Idrissa Gueye', 36, 'MF', 'Senegal', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Pathé Ciss', 32, 'MF', 'Senegal', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Assane Diao', 20, 'FW', 'Senegal', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Lamine Camara', 22, 'MF', 'Senegal', 10, 9, 7, 6, 9, 8, 8, 5, 2],
        ['Bamba Dieng', 26, 'FW', 'Senegal', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Sadio Mané', 34, 'FW', 'Senegal', 9, 4, 4, 8, 7, 9, 8, 5, 1],
        ['Nicolas Jackson', 24, 'FW', 'Senegal', 9, 5, 5, 8, 6, 8, 7, 6, 1],
        ['Cherif Ndiaye', 30, 'FW', 'Senegal', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Iliman Ndiaye', 26, 'FW', 'Senegal', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Ismail Jakobs', 26, 'DF', 'Senegal', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Krépin Diatta', 27, 'DF', 'Senegal', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Édouard Mendy', 34, 'GK', 'Senegal', 4, 7, 2, 1, 7, 3, 7, 3, 9],
        ['Pape Matar Sarr', 23, 'MF', 'Senegal', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Ismaïla Sarr', 28, 'FW', 'Senegal', 8, 5, 4, 8, 10, 9, 7, 9, 1],
        ['Moussa Niakhaté', 30, 'DF', 'Senegal', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Ibrahim Mbaye', 18, 'FW', 'Senegal', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Habib Diarra', 22, 'MF', 'Senegal', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Bara Sapoko Ndiaye', 18, 'MF', 'Senegal', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Mory Diaw', 32, 'GK', 'Senegal', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Antoine Mendy', 22, 'DF', 'Senegal', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['El Hadji Malick Diouf', 21, 'DF', 'Senegal', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Pape Gueye', 27, 'MF', 'Senegal', 6, 5, 6, 6, 5, 5, 7, 5, 1],
      ],
    });
  }
}
