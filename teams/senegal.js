class Senegal extends AbstractTeam {
  static formation = {
    'Yehvann Diouf': [0, 3],
    'Mamadou Sarr': [2, 0],
    'Kalidou Koulibaly': [2, 2],
    'Abdoulaye Seck': [2, 4],
    'Ismail Jakobs': [2, 6],
    'Idrissa Gueye': [4, 0],
    'Pathé Ciss': [4, 2],
    'Lamine Camara': [4, 4],
    'Pape Matar Sarr': [4, 6],
    'Assane Diao': [6, 2],
    'Bamba Dieng': [6, 4],
  };

  constructor() {
    super({
      name: 'Senegal',
      level: 2,
      starPlayers: ['Sadio Mané', 'Ismaïla Sarr', 'Lamine Camara'],
      startingDeck: "tactical",
      extraActions: {"long-ball":1},
      coach: 'Pape Thiaw',
      artifacts: ["aerialThreat"],
      primaryColor: '#00853f',
      reserveColor: '#fefefe',
      shortsColor: '#00853f',
      awayShortsColor: '#fefefe',
      startingXI: ['Yehvann Diouf', 'Mamadou Sarr', 'Kalidou Koulibaly', 'Abdoulaye Seck', 'Ismail Jakobs', 'Idrissa Gueye', 'Pathé Ciss', 'Lamine Camara', 'Pape Matar Sarr', 'Assane Diao', 'Bamba Dieng'],
      squad: [
        ['Yehvann Diouf', 26, 'GK', 'Senegal', 3, 5, 3, 1, 5, 3, 6, 4, 10],
        ['Mamadou Sarr', 20, 'DF', 'Senegal', 8, 10, 10, 5, 6, 8, 9, 8, 1],
        ['Kalidou Koulibaly', 34, 'DF', 'Senegal', 6, 10, 8, 2, 9, 8, 10, 10, 1],
        ['Abdoulaye Seck', 34, 'DF', 'Senegal', 6, 10, 9, 2, 8, 4, 9, 10, 1],
        ['Idrissa Gueye', 36, 'MF', 'Senegal', 7, 7, 8, 4, 8, 10, 10, 6, 1],
        ['Pathé Ciss', 32, 'MF', 'Senegal', 8, 9, 10, 9, 10, 8, 8, 6, 1],
        ['Assane Diao', 20, 'FW', 'Senegal', 8, 3, 4, 8, 6, 10, 5, 9, 1],
        ['Lamine Camara', 22, 'MF', 'Senegal', 10, 9, 7, 6, 10, 8, 8, 5, 2],
        ['Bamba Dieng', 26, 'FW', 'Senegal', 10, 3, 4, 8, 6, 10, 9, 8, 1],
        ['Sadio Mané', 34, 'FW', 'Senegal', 10, 5, 4, 10, 10, 10, 9, 8, 1],
        ['Nicolas Jackson', 24, 'FW', 'Senegal', 10, 2, 6, 10, 10, 10, 10, 10, 1],
        ['Cherif Ndiaye', 30, 'FW', 'Senegal', 10, 2, 5, 10, 9, 9, 10, 6, 1],
        ['Iliman Ndiaye', 26, 'FW', 'Senegal', 10, 3, 3, 10, 6, 9, 10, 6, 1],
        ['Ismail Jakobs', 26, 'DF', 'Senegal', 6, 10, 7, 3, 6, 10, 9, 10, 2],
        ['Krépin Diatta', 27, 'DF', 'Senegal', 10, 10, 8, 4, 8, 5, 10, 9, 2],
        ['Édouard Mendy', 34, 'GK', 'Senegal', 4, 10, 3, 1, 10, 5, 8, 5, 10],
        ['Pape Matar Sarr', 23, 'MF', 'Senegal', 10, 7, 9, 5, 10, 10, 8, 6, 1],
        ['Ismaïla Sarr', 28, 'FW', 'Senegal', 10, 5, 4, 10, 10, 10, 7, 10, 1],
        ['Moussa Niakhaté', 30, 'DF', 'Senegal', 8, 9, 10, 5, 10, 4, 10, 8, 1],
        ['Ibrahim Mbaye', 18, 'FW', 'Senegal', 8, 5, 5, 10, 9, 9, 7, 10, 1],
        ['Habib Diarra', 22, 'MF', 'Senegal', 9, 4, 9, 5, 9, 8, 8, 5, 1],
        ['Bara Sapoko Ndiaye', 18, 'MF', 'Senegal', 8, 6, 8, 6, 9, 9, 7, 7, 1],
        ['Mory Diaw', 32, 'GK', 'Senegal', 4, 6, 3, 1, 5, 4, 5, 5, 9],
        ['Antoine Mendy', 22, 'DF', 'Senegal', 6, 10, 6, 4, 7, 6, 8, 7, 2],
        ['El Hadji Malick Diouf', 21, 'DF', 'Senegal', 6, 10, 10, 2, 10, 8, 8, 7, 1],
        ['Pape Gueye', 27, 'MF', 'Senegal', 9, 6, 8, 6, 10, 10, 9, 7, 1]
      ],
    });
  }
}

module.exports = Senegal;