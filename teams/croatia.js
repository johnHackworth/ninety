class Croatia extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 1], [4, 5], [3, 3], [6, 5]],
    FW: [[5, 3], [6, 1]],
  };

  constructor() {
    super({
      name: 'Croatia',
      level: 2,
      starPlayers: ['Luka Modrić', 'Joško Gvardiol', 'Mateo Kovačić', 'Nikola Moro'],
      startingDeck: "technical",
      extraActions: { eureka: 1, 'do-or-die': 1 },
      coach: 'Zlatko Dalić',
      artifacts: ["tacticalMindset"],
      primaryColor: '#ff0000',
      reserveColor: '#000000',
      shortsColor: '#ffffff',
      awayShortsColor: '#000000',
      startingXI: ['Dominik Livaković', 'Josip Stanišić', 'Josip Šutalo', 'Duje Ćaleta-Car', 'Joško Gvardiol', 'Luka Modrić', 'Mateo Kovačić', 'Nikola Moro', 'Mario Pašalić', 'Andrej Kramarić', 'Ivan Perišić'],
      squad: [
        ['Dominik Livaković', 31, 'GK', 'Croatia', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Josip Stanišić', 26, 'DF', 'Croatia', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Marin Pongračić', 28, 'DF', 'Croatia', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Joško Gvardiol', 24, 'DF', 'Croatia', 8, 8, 8, 6, 7, 8, 8, 7, 1],
        ['Duje Ćaleta-Car', 29, 'DF', 'Croatia', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Josip Šutalo', 26, 'DF', 'Croatia', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Nikola Moro', 28, 'MF', 'Croatia', 7, 8, 8, 7, 9, 8, 9, 6, 1],
        ['Mateo Kovačić', 32, 'MF', 'Croatia', 7, 7, 7, 7, 8, 9, 8, 5, 1],
        ['Andrej Kramarić', 34, 'FW', 'Croatia', 8, 4, 5, 8, 10, 8, 9, 9, 1],
        ['Luka Modrić', 40, 'MF', 'Croatia', 7, 5, 5, 8, 10, 9, 9, 5, 1],
        ['Ante Budimir', 34, 'FW', 'Croatia', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Ivor Pandur', 26, 'GK', 'Croatia', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Nikola Vlašić', 28, 'MF', 'Croatia', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Ivan Perišić', 37, 'FW', 'Croatia', 9, 5, 5, 8, 7, 9, 10, 7, 1],
        ['Mario Pašalić', 31, 'MF', 'Croatia', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Martin Baturina', 23, 'MF', 'Croatia', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Petar Sučić', 22, 'MF', 'Croatia', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Kristijan Jakić', 29, 'DF', 'Croatia', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Toni Fruk', 25, 'MF', 'Croatia', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Igor Matanović', 23, 'FW', 'Croatia', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Luka Sučić', 23, 'MF', 'Croatia', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Luka Vušković', 19, 'DF', 'Croatia', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Dominik Kotarski', 26, 'GK', 'Croatia', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Marco Pašalić', 25, 'FW', 'Croatia', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Martin Erlić', 28, 'DF', 'Croatia', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Petar Musa', 28, 'FW', 'Croatia', 6, 2, 2, 8, 4, 5, 4, 7, 1],
      ],
    });
  }
}
