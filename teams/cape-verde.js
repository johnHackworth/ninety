class CapeVerde extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4]],
    MF: [[2, 6], [4, 0], [4, 2], [4, 4], [4, 6]],
    FW: [[6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Cape Verde',
      level: 1,
      starPlayers: ['Gilson Benchimol', 'Ryan Mendes'],
      startingDeck: "defensive",
      extraActions: { 'underdog-bite': 1 },
      coach: 'Bubista',
      artifacts: ["minnowWill"],
      primaryColor: '#003893',
      reserveColor: '#ffffff',
      shortsColor: '#003893',
      awayShortsColor: '#ffffff',
      startingXI: ['Vozinha', 'Pico', 'Logan Costa', 'Stopira', 'Deroy Duarte', 'Jamiro Monteiro', 'Jovane Cabral', 'Kevin Pina', 'Willy Semedo', 'Gilson Benchimol', 'Ryan Mendes'],
      squad: [
        ['Vozinha', 40, 'GK', 'Cape Verde', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Stopira', 38, 'DF', 'Cape Verde', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Diney', 31, 'DF', 'Cape Verde', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Pico', 33, 'DF', 'Cape Verde', 8, 8, 8, 3, 9, 10, 9, 8, 2],
        ['Logan Costa', 25, 'DF', 'Cape Verde', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Kevin Pina', 29, 'MF', 'Cape Verde', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Jovane Cabral', 27, 'MF', 'Cape Verde', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['João Paulo', 28, 'MF', 'Cape Verde', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Gilson Benchimol', 24, 'FW', 'Cape Verde', 8, 4, 4, 7, 6, 7, 6, 6, 1],
        ['Jamiro Monteiro', 32, 'MF', 'Cape Verde', 9, 8, 7, 5, 8, 9, 8, 10, 1],
        ['Garry Rodrigues', 35, 'MF', 'Cape Verde', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Márcio Rosa', 29, 'GK', 'Cape Verde', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Sidny Lopes Cabral', 23, 'DF', 'Cape Verde', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Deroy Duarte', 26, 'MF', 'Cape Verde', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Laros Duarte', 29, 'MF', 'Cape Verde', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Yannick Semedo', 30, 'MF', 'Cape Verde', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Willy Semedo', 32, 'MF', 'Cape Verde', 10, 9, 7, 8, 8, 9, 8, 8, 1],
        ['Telmo Arcanjo', 24, 'MF', 'Cape Verde', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Dailon Livramento', 25, 'FW', 'Cape Verde', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Ryan Mendes', 36, 'FW', 'Cape Verde', 7, 4, 4, 7, 6, 7, 6, 4, 1],
        ['Nuno da Costa', 35, 'MF', 'Cape Verde', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Steven Moreira', 31, 'DF', 'Cape Verde', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['CJ dos Santos', 25, 'GK', 'Cape Verde', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Wagner Pina', 23, 'DF', 'Cape Verde', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Kelvin Pires', 26, 'DF', 'Cape Verde', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Hélio Varela', 24, 'MF', 'Cape Verde', 5, 4, 6, 5, 5, 4, 6, 4, 1],
      ],
    });
  }
}
