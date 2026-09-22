class Ghana extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6], [4, 2]],
    MF: [[4, 0], [4, 4]],
    FW: [[4, 6], [6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Ghana',
      level: 1,
      starPlayers: ['Caleb Yirenkyi', 'Thomas Partey'],
      startingDeck: "counter",
      extraActions: {"total-football":1},
      coach: 'Carlos Queiroz',
      artifacts: ["turboLegs"],
      primaryColor: '#ef3340',
      reserveColor: '#009e60',
      shortsColor: '#ffffff',
      awayShortsColor: '#ffcd00',
      startingXI: ['Lawrence Ati-Zigi', 'Alidu Seidu', 'Jonas Adjetey', 'Abdul Mumin', 'Gideon Mensah', 'Thomas Partey', 'Abdul Rahman Baba', 'Caleb Yirenkyi', 'Abdul Fatawu', 'Iñaki Williams', 'Jordan Ayew'],
      squad: [
        ['Lawrence Ati-Zigi', 29, 'GK', 'Ghana', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Alidu Seidu', 26, 'DF', 'Ghana', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Caleb Yirenkyi', 20, 'MF', 'Ghana', 8, 5, 5, 8, 7, 9, 8, 4, 1],
        ['Jonas Adjetey', 22, 'DF', 'Ghana', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Thomas Partey', 32, 'MF', 'Ghana', 7, 7, 8, 6, 8, 7, 8, 6, 1],
        ['Abdul Mumin', 28, 'DF', 'Ghana', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Abdul Fatawu', 22, 'FW', 'Ghana', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Kwasi Sibo', 27, 'MF', 'Ghana', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Jordan Ayew', 34, 'FW', 'Ghana', 8, 5, 5, 8, 10, 9, 7, 9, 1],
        ['Brandon Thomas-Asante', 27, 'FW', 'Ghana', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Antoine Semenyo', 26, 'MF', 'Ghana', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Joseph Anang', 26, 'GK', 'Ghana', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Christopher Bonsu Baah', 21, 'FW', 'Ghana', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Gideon Mensah', 27, 'DF', 'Ghana', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Elisha Owusu', 28, 'MF', 'Ghana', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Benjamin Asare', 33, 'GK', 'Ghana', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Abdul Rahman Baba', 31, 'DF', 'Ghana', 8, 8, 8, 3, 10, 8, 9, 9, 1],
        ['Jerome Opoku', 27, 'DF', 'Ghana', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Iñaki Williams', 31, 'FW', 'Ghana', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Augustine Boakye', 25, 'MF', 'Ghana', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Kojo Peprah Oppong', 22, 'DF', 'Ghana', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Kamaldeen Sulemana', 24, 'FW', 'Ghana', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Derrick Luckassen', 30, 'DF', 'Ghana', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Ernest Nuamah', 22, 'FW', 'Ghana', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Prince Kwabena Adu', 22, 'FW', 'Ghana', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Marvin Senaya', 25, 'DF', 'Ghana', 5, 6, 6, 3, 3, 2, 5, 6, 1],
      ],
    });
  }
}
