class Croatia extends AbstractTeam {
  static formation = {
    'Dominik Livaković': [0, 3],
    'Josip Stanišić': [2, 0],
    'Josip Šutalo': [2, 2],
    'Duje Ćaleta-Car': [2, 4],
    'Joško Gvardiol': [2, 6],
    'Marcelo Brozović': [3, 3],
    'Luka Modrić': [4, 1],
    'Mateo Kovačić': [4, 5],
    'Ivan Perišić': [6, 1],
    'Andrej Kramarić': [5, 3],
    'Mario Pašalić': [6, 5],
  };

  constructor() {
    super({
      name: 'Croatia',
      level: 2,
  starPlayers: ['Luka Modrić', 'Joško Gvardiol', 'Mateo Kovačić', 'Marcelo Brozović'],
      startingDeck: "technical",
      extraActions: { eureka: 1, 'do-or-die': 1 },
      coach: 'Zlatko Dalić',
      artifacts: [ 'tacticalMindset'],
      primaryColor: '#e40521',
      reserveColor: '#1a2e5f',
      shortsColor: '#ffffff',
      awayShortsColor: '#1a2e5f',
      startingXI: ['Dominik Livaković', 'Josip Stanišić', 'Josip Šutalo', 'Duje Ćaleta-Car', 'Joško Gvardiol', 'Luka Modrić', 'Mateo Kovačić', 'Marcelo Brozović', 'Mario Pašalić', 'Andrej Kramarić', 'Ivan Perišić'],
      squad: [
        ['Dominik Livaković', 31, 'GK', 'Croatia', 3, 7, 2, 1, 7, 3, 6, 3, 8],
        ['Josip Stanišić', 26, 'DF', 'Croatia', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Josip Šutalo', 26, 'DF', 'Croatia', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Duje Ćaleta-Car', 30, 'DF', 'Croatia', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Joško Gvardiol', 24, 'DF', 'Croatia', 8, 8, 8, 6, 7, 8, 8, 7, 1],
        ['Luka Modrić', 39, 'MF', 'Croatia', 7, 5, 5, 8, 10, 9, 9, 5, 1],
        ['Mateo Kovačić', 32, 'MF', 'Croatia', 7, 7, 7, 7, 8, 9, 8, 5, 1],
        ['Marcelo Brozović', 33, 'MF', 'Croatia', 7, 8, 8, 7, 9, 8, 9, 6, 1],
        ['Mario Pašalić', 31, 'MF', 'Croatia', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Andrej Kramarić', 35, 'FW', 'Croatia', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Ivan Perišić', 37, 'FW', 'Croatia', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Ivica Ivušić', 31, 'GK', 'Croatia', 3, 7, 2, 1, 7, 3, 6, 3, 8],
        ['Borna Sosa', 28, 'DF', 'Croatia', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Luka Sučić', 23, 'MF', 'Croatia', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Nikola Vlašić', 28, 'MF', 'Croatia', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Ante Budimir', 35, 'FW', 'Croatia', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Marco Pašalić', 26, 'FW', 'Croatia', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Igor Matanović', 23, 'FW', 'Croatia', 7, 4, 3, 8, 7, 7, 6, 6, 1],
      ],
    });
  }
}
