class Portugal extends AbstractTeam {
  static formation = {
    'Diogo Costa': [0, 3],
    'Nélson Semedo': [2, 0],
    'Rúben Dias': [2, 2],
    'Tomás Araújo': [2, 4],
    'Diogo Dalot': [2, 6],
    'Matheus Nunes': [4, 0],
    'Bruno Fernandes': [4, 2],
    'Bernardo Silva': [4, 4],
    'João Neves': [4, 6],
    'Cristiano Ronaldo': [6, 2],
    'Gonçalo Ramos': [6, 4],
  };

  constructor() {
    super({
      name: 'Portugal',
      level: 3,
      starPlayers: ['Cristiano Ronaldo', 'Bruno Fernandes', 'João Félix'],
      startingDeck: "technical",
      extraActions: { "dirty-tricks": 1, eureka: 1, "touch-of-magic": 1, ouch: 1, siiiiu: 1 },
      coach: 'Roberto Martínez',
      artifacts: ["tacticalMindset"],
      primaryColor: '#c8102e',
      reserveColor: '#006600',
      shortsColor: '#006600',
      awayShortsColor: '#ffffff',
      startingXI: ['Diogo Costa', 'Nélson Semedo', 'Rúben Dias', 'Tomás Araújo', 'Diogo Dalot', 'Matheus Nunes', 'Bruno Fernandes', 'Bernardo Silva', 'João Neves', 'Cristiano Ronaldo', 'Gonçalo Ramos'],
      squad: [
        ['Diogo Costa', 26, 'GK', 'Portugal', 2, 4, 6, 2, 4, 1, 4, 7, 8]
        ['Nélson Semedo', 32, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1]
        ['Rúben Dias', 29, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1]
        ['Tomás Araújo', 24, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1]
        ['Diogo Dalot', 27, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1]
        ['Matheus Nunes', 27, 'MF', 'Portugal', 7, 6, 6, 7, 5, 5, 8, 6, 1]
        ['Cristiano Ronaldo', 41, 'FW', 'Portugal', 8, 6, 7, 8, 9, 8, 10, 9, 1]
        ['Bruno Fernandes', 31, 'MF', 'Portugal', 9, 7, 10, 7, 8, 9, 8, 8, 1]
        ['Gonçalo Ramos', 24, 'FW', 'Portugal', 7, 2, 2, 9, 4, 6, 4, 8, 1]
        ['Bernardo Silva', 31, 'MF', 'Portugal', 7, 6, 6, 7, 5, 5, 8, 6, 1]
        ['João Félix', 26, 'FW', 'Portugal', 8, 7, 7, 8, 10, 9, 8, 9, 1]
        ['José Sá', 33, 'GK', 'Portugal', 2, 4, 6, 2, 4, 1, 4, 7, 8]
        ['Renato Veiga', 22, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1]
        ['Gonçalo Inácio', 24, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1]
        ['João Neves', 21, 'MF', 'Portugal', 7, 6, 6, 7, 5, 5, 8, 6, 1]
        ['Francisco Trincão', 26, 'FW', 'Portugal', 7, 2, 2, 9, 4, 6, 4, 8, 1]
        ['Rafael Leão', 27, 'FW', 'Portugal', 7, 2, 2, 9, 4, 6, 4, 8, 1]
        ['Pedro Neto', 26, 'FW', 'Portugal', 7, 2, 2, 9, 4, 6, 4, 8, 1]
        ['Gonçalo Guedes', 29, 'FW', 'Portugal', 7, 2, 2, 9, 4, 6, 4, 8, 1]
        ['João Cancelo', 32, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1]
        ['Rúben Neves', 29, 'MF', 'Portugal', 7, 6, 6, 7, 5, 5, 8, 6, 1]
        ['Rui Silva', 32, 'GK', 'Portugal', 2, 4, 6, 2, 4, 1, 4, 7, 8]
        ['Vitinha', 26, 'MF', 'Portugal', 7, 6, 6, 7, 5, 5, 8, 6, 1]
        ['Samú Costa', 25, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1]
        ['Nuno Mendes', 23, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1]
        ['Francisco Conceição', 23, 'FW', 'Portugal', 7, 2, 2, 9, 4, 6, 4, 8, 1]
      ],
    });
  }
}
