class CapeVerde extends AbstractTeam {
  static formation = {
    'Vozinha': [0, 3],
    'Roberto Lopes': [2, 0],
    'Logan Costa': [2, 2],
    'Stopira': [2, 4],
    'Deroy Duarte': [2, 6],
    'Jamiro Monteiro': [4, 0],
    'Nuno Borges': [4, 2],
    'Kevin Pina': [4, 4],
    'Willy Semedo': [4, 6],
    'Bebé': [6, 2],
    'Ryan Mendes': [6, 4],
  };

  constructor() {
    super({
      name: 'Cape Verde',
      level: 0,
  starPlayers: ['Bebé', 'Ryan Mendes'],
      startingDeck: "defensive",
      extraActions: { 'underdog-bite': 1 },
      coach: 'Bubista',
      artifacts: [ 'minnowWill'],
      primaryColor: '#003893',
      reserveColor: '#ffffff',
      shortsColor: '#003893',
      awayShortsColor: '#ffffff',
      startingXI: ['Vozinha', 'Roberto Lopes', 'Logan Costa', 'Stopira', 'Deroy Duarte', 'Jamiro Monteiro', 'Nuno Borges', 'Kevin Pina', 'Willy Semedo', 'Bebé', 'Ryan Mendes'],
      squad: [
        ['Vozinha', 39, 'GK', 'Cape Verde', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Roberto Lopes', 34, 'DF', 'Cape Verde', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Logan Costa', 25, 'DF', 'Cape Verde', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Stopira', 38, 'DF', 'Cape Verde', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Diney', 31, 'DF', 'Cape Verde', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Jeffry Fortes', 37, 'DF', 'Cape Verde', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Jamiro Monteiro', 32, 'MF', 'Cape Verde', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Nuno Borges', 38, 'MF', 'Cape Verde', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Kevin Pina', 29, 'MF', 'Cape Verde', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Kenny Rocha Santos', 26, 'MF', 'Cape Verde', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Deroy Duarte', 27, 'DF', 'Cape Verde', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Jovane Cabral', 28, 'MF', 'Cape Verde', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Bebé', 36, 'FW', 'Cape Verde', 8, 4, 4, 7, 6, 7, 6, 6, 1],
        ['Ryan Mendes', 36, 'FW', 'Cape Verde', 7, 4, 4, 7, 6, 7, 6, 4, 1],
        ['Willy Semedo', 32, 'MF', 'Cape Verde', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Garry Rodrigues', 35, 'FW', 'Cape Verde', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Bryan Teixeira', 25, 'FW', 'Cape Verde', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Márcio Rosa', 28, 'GK', 'Cape Verde', 1, 5, 1, 1, 5, 1, 4, 1, 6],
      ],
    });
  }
}
