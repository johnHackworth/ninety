class Portugal extends AbstractTeam {
  static formation = {
    'Diogo Costa': [0, 3],
    'Diogo Dalot': [2, 0],
    'Rúben Dias': [2, 2],
    'Gonçalo Inácio': [2, 4],
    'Nuno Mendes': [2, 6],
    'Vitinha': [4, 1],
    'João Neves': [3, 3],
    'Bruno Fernandes': [4, 5],
    'Rafael Leão': [6, 1],
    'Gonçalo Ramos': [5, 3],
    'Bernardo Silva': [6, 5],
  };

  constructor() {
    super({
      name: 'Portugal',
      level: 3,
  starPlayers: ['Bruno Fernandes', 'Bernardo Silva', 'Cristiano Ronaldo', 'Rúben Dias', 'Rafael Leão'],
      startingDeck: "technical",
      extraActions: { "dirty-tricks": 1, eureka: 1, "touch-of-magic": 1, ouch: 1, siiiiu: 1 },
      coach: 'Roberto Martínez',
      artifacts: [ 'tacticalMindset'],
      primaryColor: '#c8102e',
      reserveColor: '#046a38',
      shortsColor: '#c8102e',
      awayShortsColor: '#ffffff',
      startingXI: ['Diogo Costa', 'Diogo Dalot', 'Rúben Dias', 'Gonçalo Inácio', 'Nuno Mendes', 'João Neves', 'Vitinha', 'Bruno Fernandes', 'Bernardo Silva', 'Rafael Leão', 'Gonçalo Ramos'],
      squad: [
        ['Diogo Costa', 26, 'GK', 'Portugal', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['Diogo Dalot', 27, 'DF', 'Portugal', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Rúben Dias', 29, 'DF', 'Portugal', 7, 9, 9, 4, 7, 5, 9, 8, 1],
        ['Gonçalo Inácio', 25, 'DF', 'Portugal', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Nuno Mendes', 24, 'DF', 'Portugal', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['João Neves', 22, 'MF', 'Portugal', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Vitinha', 26, 'MF', 'Portugal', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Bruno Fernandes', 32, 'MF', 'Portugal', 7, 5, 5, 9, 9, 8, 9, 6, 1],
        ['Bernardo Silva', 32, 'MF', 'Portugal', 8, 6, 6, 7, 9, 10, 9, 4, 1],
        ['Rafael Leão', 27, 'FW', 'Portugal', 9, 4, 4, 8, 7, 9, 7, 5, 1],
        ['Gonçalo Ramos', 25, 'FW', 'Portugal', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Rui Patrício', 37, 'GK', 'Portugal', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['António Silva', 23, 'DF', 'Portugal', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Rúben Neves', 29, 'MF', 'Portugal', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['João Palhinha', 31, 'MF', 'Portugal', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Pedro Neto', 26, 'FW', 'Portugal', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Diogo Jota', 30, 'FW', 'Portugal', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Cristiano Ronaldo', 41, 'FW', 'Portugal', 7, 4, 3, 10, 9, 8, 9, 10, 1],
      ],
    });
  }
}
