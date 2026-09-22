class SouthAfrica extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4], [4, 6]],
    FW: [[6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'South Africa',
      level: 1,
      starPlayers: ['Ronwen Williams', 'Lyle Foster'],
      startingDeck: "defensive",
      coach: 'Hugo Broos',
      primaryColor: '#007749',
      reserveColor: '#ffb612',
      shortsColor: '#000000',
      awayShortsColor: '#ffffff',
      startingXI: ['Ronwen Williams', 'Khuliso Mudau', 'Thabang Matuludi', 'Khulumani Ndamane', 'Aubrey Modiba', 'Teboho Mokoena', 'Sphephelo Sithole', 'Themba Zwane', 'Thalente Mbatha', 'Oswin Appollis', 'Lyle Foster'],
      squad: [
        ['Ronwen Williams', 34, 'GK', 'South Africa', 4, 7, 2, 1, 7, 3, 7, 3, 9],
        ['Thabang Matuludi', 27, 'DF', 'South Africa', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Khulumani Ndamane', 22, 'DF', 'South Africa', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Teboho Mokoena', 29, 'MF', 'South Africa', 8, 9, 10, 8, 8, 9, 8, 8, 2],
        ['Thalente Mbatha', 26, 'MF', 'South Africa', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Aubrey Modiba', 30, 'DF', 'South Africa', 8, 8, 8, 3, 9, 10, 6, 9, 1],
        ['Oswin Appollis', 24, 'FW', 'South Africa', 8, 4, 5, 8, 10, 9, 9, 7, 1],
        ['Tshepang Moremi', 25, 'FW', 'South Africa', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Lyle Foster', 25, 'FW', 'South Africa', 8, 4, 4, 7, 7, 8, 7, 4, 1],
        ['Relebohile Mofokeng', 21, 'FW', 'South Africa', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Themba Zwane', 36, 'MF', 'South Africa', 10, 8, 8, 7, 8, 9, 9, 5, 2],
        ['Thapelo Maseko', 22, 'FW', 'South Africa', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Sphephelo Sithole', 27, 'MF', 'South Africa', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Mbekezeli Mbokazi', 20, 'DF', 'South Africa', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Iqraam Rayners', 30, 'FW', 'South Africa', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Sipho Chaine', 29, 'GK', 'South Africa', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Evidence Makgopa', 26, 'FW', 'South Africa', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Samukele Kabini', 22, 'DF', 'South Africa', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Nkosinathi Sibisi', 30, 'DF', 'South Africa', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Khuliso Mudau', 31, 'DF', 'South Africa', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Ime Okon', 22, 'DF', 'South Africa', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Ricardo Goss', 32, 'GK', 'South Africa', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Jayden Adams', 25, 'MF', 'South Africa', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Olwethu Makhanya', 22, 'DF', 'South Africa', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Kamogelo Sebelebele', 23, 'FW', 'South Africa', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Bradley Cross', 25, 'DF', 'South Africa', 5, 6, 6, 3, 3, 2, 5, 6, 1],
      ],
    });
  }
}
