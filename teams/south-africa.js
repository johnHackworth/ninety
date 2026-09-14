class SouthAfrica extends AbstractTeam {
  static formation = {
    'Ronwen Williams': [0, 3],
    'Thabang Matuludi': [2, 0],
    'Khulumani Ndamane': [2, 2],
    'Aubrey Modiba': [2, 4],
    'Mbekezeli Mbokazi': [2, 6],
    'Teboho Mokoena': [4, 0],
    'Thalente Mbatha': [4, 2],
    'Themba Zwane': [4, 4],
    'Sphephelo Sithole': [4, 6],
    'Oswin Appollis': [6, 2],
    'Tshepang Moremi': [6, 4],
  };

  constructor() {
    super({
      name: 'South Africa',
      level: 1,
      starPlayers: ['Teboho Mokoena', 'Lyle Foster', 'Aubrey Modiba', 'Oswin Appollis', 'Themba Zwane'],
      startingDeck: "defensive",
      coach: 'Hugo Broos',
      primaryColor: '#007749',
      reserveColor: '#ffb612',
      shortsColor: '#000000',
      awayShortsColor: '#ffffff',
      startingXI: ['Ronwen Williams', 'Thabang Matuludi', 'Khulumani Ndamane', 'Aubrey Modiba', 'Mbekezeli Mbokazi', 'Teboho Mokoena', 'Thalente Mbatha', 'Themba Zwane', 'Sphephelo Sithole', 'Oswin Appollis', 'Tshepang Moremi'],
      squad: [
        ['Ronwen Williams', 34, 'GK', 'South Africa', 6, 8, 5, 3, 10, 3, 9, 6, 10],
        ['Thabang Matuludi', 27, 'DF', 'South Africa', 8, 7, 8, 4, 6, 4, 6, 7, 1],
        ['Khulumani Ndamane', 22, 'DF', 'South Africa', 5, 9, 7, 2, 8, 8, 6, 7, 1],
        ['Teboho Mokoena', 29, 'MF', 'South Africa', 8, 9, 10, 8, 10, 10, 10, 8, 2],
        ['Thalente Mbatha', 26, 'MF', 'South Africa', 9, 5, 5, 7, 8, 7, 9, 6, 1],
        ['Aubrey Modiba', 30, 'DF', 'South Africa', 10, 10, 10, 3, 9, 10, 6, 10, 1],
        ['Oswin Appollis', 24, 'FW', 'South Africa', 10, 4, 5, 10, 10, 10, 10, 7, 1],
        ['Tshepang Moremi', 25, 'FW', 'South Africa', 8, 4, 5, 10, 7, 8, 8, 8, 1],
        ['Lyle Foster', 25, 'FW', 'South Africa', 10, 4, 6, 10, 10, 10, 7, 10, 1],
        ['Relebohile Mofokeng', 21, 'FW', 'South Africa', 10, 5, 6, 9, 6, 10, 8, 5, 1],
        ['Themba Zwane', 36, 'MF', 'South Africa', 10, 8, 8, 7, 10, 10, 9, 5, 2],
        ['Thapelo Maseko', 22, 'FW', 'South Africa', 10, 3, 5, 9, 9, 10, 8, 6, 1],
        ['Sphephelo Sithole', 27, 'MF', 'South Africa', 7, 9, 10, 7, 10, 10, 7, 4, 1],
        ['Mbekezeli Mbokazi', 20, 'DF', 'South Africa', 5, 10, 9, 2, 8, 5, 9, 8, 1],
        ['Iqraam Rayners', 30, 'FW', 'South Africa', 9, 3, 4, 8, 6, 7, 7, 9, 1],
        ['Sipho Chaine', 29, 'GK', 'South Africa', 4, 5, 2, 1, 6, 1, 7, 6, 10],
        ['Evidence Makgopa', 26, 'FW', 'South Africa', 10, 4, 7, 10, 10, 10, 6, 7, 1],
        ['Samukele Kabini', 22, 'DF', 'South Africa', 9, 9, 6, 2, 6, 8, 9, 8, 2],
        ['Nkosinathi Sibisi', 30, 'DF', 'South Africa', 9, 8, 10, 3, 9, 6, 10, 10, 2],
        ['Khuliso Mudau', 31, 'DF', 'South Africa', 8, 10, 8, 2, 7, 6, 8, 8, 1],
        ['Ime Okon', 22, 'DF', 'South Africa', 7, 8, 7, 3, 7, 7, 10, 10, 1],
        ['Ricardo Goss', 32, 'GK', 'South Africa', 3, 7, 4, 1, 7, 4, 9, 5, 9],
        ['Jayden Adams', 25, 'MF', 'South Africa', 6, 7, 8, 7, 7, 7, 6, 5, 1],
        ['Olwethu Makhanya', 22, 'DF', 'South Africa', 7, 8, 6, 1, 8, 4, 8, 7, 2],
        ['Kamogelo Sebelebele', 23, 'FW', 'South Africa', 8, 2, 4, 9, 7, 6, 8, 7, 1],
        ['Bradley Cross', 25, 'DF', 'South Africa', 5, 7, 6, 3, 8, 5, 6, 6, 1]
      ],
    });
  }
}
