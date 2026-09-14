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
        ['Utkir Yusupov', 35, 'GK', 'Uzbekistan', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Abdukodir Khusanov', 22, 'DF', 'Uzbekistan', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Khojiakbar Alijonov', 29, 'DF', 'Uzbekistan', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Farrukh Sayfiev', 35, 'DF', 'Uzbekistan', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Rustam Ashurmatov', 29, 'DF', 'Uzbekistan', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Akmal Mozgovoy', 27, 'MF', 'Uzbekistan', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Otabek Shukurov', 29, 'MF', 'Uzbekistan', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Jamshid Iskanderov', 32, 'MF', 'Uzbekistan', 8, 9, 10, 7, 8, 8, 8, 9, 2]
        ['Odiljon Hamrobekov', 30, 'MF', 'Uzbekistan', 9, 5, 9, 8, 8, 8, 8, 10, 3]
        ['Ruslanbek Jiyanov', 25, 'MF', 'Uzbekistan', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Oston Urunov', 25, 'MF', 'Uzbekistan', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Abduvohid Nematov', 25, 'GK', 'Uzbekistan', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Sherzod Nasrullaev', 27, 'DF', 'Uzbekistan', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Eldor Shomurodov', 30, 'FW', 'Uzbekistan', 8, 2, 7, 8, 10, 9, 9, 8, 1]
        ['Umar Eshmurodov', 33, 'DF', 'Uzbekistan', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Botirali Ergashev', 30, 'GK', 'Uzbekistan', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Dostonbek Khamdamov', 29, 'MF', 'Uzbekistan', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Abdulla Abdullaev', 28, 'DF', 'Uzbekistan', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Azizjon Ganiev', 28, 'MF', 'Uzbekistan', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Azizbek Amonov', 28, 'FW', 'Uzbekistan', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Igor Sergeev', 33, 'FW', 'Uzbekistan', 8, 4, 5, 8, 10, 8, 9, 9, 1]
        ['Abbosbek Fayzullaev', 22, 'MF', 'Uzbekistan', 9, 9, 10, 5, 8, 8, 8, 8, 1]
        ['Sherzod Esanov', 23, 'MF', 'Uzbekistan', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Bekhruz Karimov', 18, 'DF', 'Uzbekistan', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Avazbek Ulmasaliev', 26, 'DF', 'Uzbekistan', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Jakhongir Urozov', 22, 'DF', 'Uzbekistan', 5, 6, 6, 3, 3, 2, 5, 6, 1]
      ],
    });
  }
}
