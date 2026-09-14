class Uzbekistan extends AbstractTeam {
  static formation = {
    'Utkir Yusupov': [0, 3],
    'Abdukodir Khusanov': [2, 0],
    'Khojiakbar Alijonov': [2, 2],
    'Farrukh Sayfiev': [2, 4],
    'Rustam Ashurmatov': [2, 6],
    'Akmal Mozgovoy': [4, 0],
    'Otabek Shukurov': [4, 2],
    'Jamshid Iskanderov': [4, 4],
    'Odiljon Hamrobekov': [4, 6],
    'Eldor Shomurodov': [6, 2],
    'Azizbek Amonov': [6, 4],
  };

  constructor() {
    super({
      name: 'Uzbekistan',
      level: 1,
      starPlayers: ['Eldor Shomurodov', 'Igor Sergeev', 'Abbosbek Fayzullaev', 'Odiljon Hamrobekov', 'Jamshid Iskanderov'],
      startingDeck: "counter",
      extraActions: {"tiki-taka":1},
      coach: 'Fabio Cannavaro',
      primaryColor: '#0066b2',
      reserveColor: '#ffffff',
      shortsColor: '#ffffff',
      awayShortsColor: '#0066b2',
      startingXI: ['Utkir Yusupov', 'Abdukodir Khusanov', 'Khojiakbar Alijonov', 'Farrukh Sayfiev', 'Rustam Ashurmatov', 'Akmal Mozgovoy', 'Otabek Shukurov', 'Jamshid Iskanderov', 'Odiljon Hamrobekov', 'Eldor Shomurodov', 'Azizbek Amonov'],
      squad: [
        ['Utkir Yusupov', 35, 'GK', 'Uzbekistan', 6, 9, 5, 2, 8, 2, 9, 6, 10],
        ['Abdukodir Khusanov', 22, 'DF', 'Uzbekistan', 9, 10, 10, 2, 6, 7, 10, 10, 2],
        ['Khojiakbar Alijonov', 29, 'DF', 'Uzbekistan', 10, 10, 10, 4, 10, 7, 10, 8, 3],
        ['Farrukh Sayfiev', 35, 'DF', 'Uzbekistan', 9, 10, 10, 4, 9, 5, 9, 7, 2],
        ['Rustam Ashurmatov', 29, 'DF', 'Uzbekistan', 7, 10, 10, 5, 10, 9, 9, 10, 2],
        ['Akmal Mozgovoy', 27, 'MF', 'Uzbekistan', 7, 8, 6, 6, 10, 8, 9, 5, 1],
        ['Otabek Shukurov', 29, 'MF', 'Uzbekistan', 8, 10, 10, 6, 10, 8, 10, 5, 1],
        ['Jamshid Iskanderov', 32, 'MF', 'Uzbekistan', 10, 9, 10, 7, 9, 10, 10, 9, 2],
        ['Odiljon Hamrobekov', 30, 'MF', 'Uzbekistan', 10, 5, 9, 8, 10, 10, 10, 10, 3],
        ['Ruslanbek Jiyanov', 25, 'MF', 'Uzbekistan', 6, 3, 8, 3, 6, 9, 6, 7, 1],
        ['Oston Urunov', 25, 'MF', 'Uzbekistan', 10, 7, 6, 7, 10, 10, 8, 8, 2],
        ['Abduvohid Nematov', 25, 'GK', 'Uzbekistan', 4, 9, 3, 1, 6, 3, 9, 7, 10],
        ['Sherzod Nasrullaev', 27, 'DF', 'Uzbekistan', 10, 10, 10, 5, 10, 5, 10, 10, 1],
        ['Eldor Shomurodov', 30, 'FW', 'Uzbekistan', 10, 2, 7, 10, 10, 10, 10, 8, 1],
        ['Umar Eshmurodov', 33, 'DF', 'Uzbekistan', 6, 10, 10, 2, 8, 6, 6, 7, 2],
        ['Botirali Ergashev', 30, 'GK', 'Uzbekistan', 2, 7, 1, 1, 7, 2, 7, 6, 8],
        ['Dostonbek Khamdamov', 29, 'MF', 'Uzbekistan', 10, 8, 10, 9, 10, 7, 8, 5, 1],
        ['Abdulla Abdullaev', 28, 'DF', 'Uzbekistan', 8, 10, 8, 1, 5, 5, 7, 9, 1],
        ['Azizjon Ganiev', 28, 'MF', 'Uzbekistan', 6, 9, 6, 4, 10, 10, 8, 6, 1],
        ['Azizbek Amonov', 28, 'FW', 'Uzbekistan', 10, 3, 3, 10, 7, 10, 8, 8, 1],
        ['Igor Sergeev', 33, 'FW', 'Uzbekistan', 10, 4, 5, 10, 10, 10, 10, 10, 1],
        ['Abbosbek Fayzullaev', 22, 'MF', 'Uzbekistan', 10, 10, 10, 5, 10, 9, 8, 8, 1],
        ['Sherzod Esanov', 23, 'MF', 'Uzbekistan', 8, 5, 5, 7, 6, 6, 6, 5, 2],
        ['Bekhruz Karimov', 18, 'DF', 'Uzbekistan', 7, 10, 7, 3, 6, 6, 8, 6, 1],
        ['Avazbek Ulmasaliev', 26, 'DF', 'Uzbekistan', 6, 8, 7, 1, 6, 6, 5, 6, 1],
        ['Jakhongir Urozov', 22, 'DF', 'Uzbekistan', 8, 9, 10, 1, 5, 4, 6, 7, 2]
      ],
    });
  }
}
