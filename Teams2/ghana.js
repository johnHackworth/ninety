class Ghana extends AbstractTeam {
  static formation = {
    'Lawrence Ati-Zigi': [0, 3],
    'Alidu Seidu': [2, 0],
    'Jonas Adjetey': [2, 2],
    'Abdul Mumin': [2, 4],
    'Gideon Mensah': [2, 6],
    'Caleb Yirenkyi': [4, 0],
    'Thomas Partey': [4, 2],
    'Kwasi Sibo': [4, 4],
    'Antoine Semenyo': [4, 6],
    'Abdul Fatawu': [6, 2],
    'Jordan Ayew': [6, 4],
  };

  constructor() {
    super({
      name: 'Ghana',
      level: 1,
      starPlayers: ['Jordan Ayew', 'Thomas Partey', 'Abdul Rahman Baba'],
      startingDeck: "balanced",
      extraActions: {"total-football":1},
      coach: 'Carlos Queiroz',
      artifacts: ["turboLegs"],
      primaryColor: '#ef3340',
      reserveColor: '#009e60',
      shortsColor: '#ffffff',
      awayShortsColor: '#ffcd00',
      startingXI: ['Lawrence Ati-Zigi', 'Alidu Seidu', 'Jonas Adjetey', 'Abdul Mumin', 'Gideon Mensah', 'Caleb Yirenkyi', 'Thomas Partey', 'Kwasi Sibo', 'Antoine Semenyo', 'Abdul Fatawu', 'Jordan Ayew'],
      squad: [
        ['Lawrence Ati-Zigi', 29, 'GK', 'Ghana', 3, 8, 2, 2, 7, 3, 8, 4, 10],
        ['Alidu Seidu', 26, 'DF', 'Ghana', 8, 10, 10, 5, 9, 4, 8, 7, 1],
        ['Caleb Yirenkyi', 20, 'MF', 'Ghana', 10, 4, 6, 8, 10, 9, 9, 7, 1],
        ['Jonas Adjetey', 22, 'DF', 'Ghana', 9, 10, 8, 4, 5, 6, 8, 10, 2],
        ['Thomas Partey', 32, 'MF', 'Ghana', 10, 10, 10, 8, 10, 10, 8, 6, 2],
        ['Abdul Mumin', 28, 'DF', 'Ghana', 5, 8, 6, 4, 6, 7, 8, 7, 1],
        ['Abdul Fatawu', 22, 'FW', 'Ghana', 10, 3, 4, 10, 6, 10, 7, 10, 1],
        ['Kwasi Sibo', 27, 'MF', 'Ghana', 9, 5, 7, 4, 10, 9, 9, 6, 2],
        ['Jordan Ayew', 34, 'FW', 'Ghana', 10, 5, 5, 10, 10, 10, 7, 10, 1],
        ['Brandon Thomas-Asante', 27, 'FW', 'Ghana', 9, 3, 4, 8, 7, 9, 6, 7, 1],
        ['Antoine Semenyo', 26, 'MF', 'Ghana', 8, 9, 9, 5, 10, 10, 9, 8, 1],
        ['Joseph Anang', 26, 'GK', 'Ghana', 5, 6, 4, 1, 6, 2, 8, 4, 9],
        ['Christopher Bonsu Baah', 21, 'FW', 'Ghana', 8, 2, 3, 10, 5, 10, 6, 8, 1],
        ['Gideon Mensah', 27, 'DF', 'Ghana', 9, 10, 10, 2, 10, 8, 9, 10, 2],
        ['Elisha Owusu', 28, 'MF', 'Ghana', 7, 7, 9, 4, 10, 7, 10, 4, 2],
        ['Benjamin Asare', 33, 'GK', 'Ghana', 3, 8, 3, 2, 8, 1, 8, 6, 10],
        ['Abdul Rahman Baba', 31, 'DF', 'Ghana', 10, 10, 10, 3, 10, 8, 10, 9, 1],
        ['Jerome Opoku', 27, 'DF', 'Ghana', 5, 9, 7, 4, 6, 6, 9, 8, 1],
        ['Iñaki Williams', 31, 'FW', 'Ghana', 10, 5, 6, 10, 6, 10, 9, 10, 1],
        ['Augustine Boakye', 25, 'MF', 'Ghana', 6, 5, 4, 4, 8, 9, 8, 3, 1],
        ['Kojo Peprah Oppong', 22, 'DF', 'Ghana', 8, 7, 9, 2, 5, 8, 8, 8, 1],
        ['Kamaldeen Sulemana', 24, 'FW', 'Ghana', 8, 4, 4, 9, 10, 10, 10, 8, 1],
        ['Derrick Luckassen', 30, 'DF', 'Ghana', 6, 6, 6, 1, 6, 6, 8, 7, 1],
        ['Ernest Nuamah', 22, 'FW', 'Ghana', 10, 2, 3, 10, 8, 10, 7, 10, 1],
        ['Prince Kwabena Adu', 22, 'FW', 'Ghana', 10, 2, 3, 7, 5, 9, 7, 9, 1],
        ['Marvin Senaya', 25, 'DF', 'Ghana', 8, 9, 8, 3, 5, 6, 7, 6, 1]
      ],
    });
  }
}

module.exports = Ghana;