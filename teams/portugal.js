class Portugal extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[3, 3], [4, 1], [4, 5], [6, 5]],
    FW: [[6, 1], [5, 3]],
  };

  constructor() {
    super({
      name: 'Portugal',
      level: 3,
      starPlayers: ['Bruno Fernandes', 'Bernardo Silva', 'Cristiano Ronaldo', 'Rúben Dias', 'Rafael Leão'],
      startingDeck: "technical",
      extraActions: { "dirty-tricks": 1, eureka: 1, "touch-of-magic": 1, ouch: 1, siiiiu: 1 },
      coach: 'Roberto Martínez',
      artifacts: ["tacticalMindset"],
      primaryColor: '#c8102e',
      reserveColor: '#006600',
      shortsColor: '#006600',
      awayShortsColor: '#ffffff',
      startingXI: ['Diogo Costa', 'Diogo Dalot', 'Rúben Dias', 'Gonçalo Inácio', 'Nuno Mendes', 'João Neves', 'Vitinha', 'Bruno Fernandes', 'Bernardo Silva', 'Rafael Leão', 'Gonçalo Ramos'],
      squad: [
        ['Diogo Costa', 26, 'GK', 'Portugal', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Nélson Semedo', 32, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Rúben Dias', 29, 'DF', 'Portugal', 7, 9, 9, 4, 7, 5, 9, 8, 1],
        ['Tomás Araújo', 24, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Diogo Dalot', 27, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Matheus Nunes', 27, 'MF', 'Portugal', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Cristiano Ronaldo', 41, 'FW', 'Portugal', 7, 4, 3, 10, 9, 8, 9, 10, 1],
        ['Bruno Fernandes', 31, 'MF', 'Portugal', 7, 5, 5, 9, 9, 8, 9, 6, 1],
        ['Gonçalo Ramos', 24, 'FW', 'Portugal', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Bernardo Silva', 31, 'MF', 'Portugal', 8, 6, 6, 7, 9, 10, 9, 4, 1],
        ['João Félix', 26, 'FW', 'Portugal', 8, 7, 7, 8, 10, 9, 8, 9, 1],
        ['José Sá', 33, 'GK', 'Portugal', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Renato Veiga', 22, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Gonçalo Inácio', 24, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['João Neves', 21, 'MF', 'Portugal', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Francisco Trincão', 26, 'FW', 'Portugal', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Rafael Leão', 27, 'FW', 'Portugal', 9, 4, 4, 8, 7, 9, 7, 5, 1],
        ['Pedro Neto', 26, 'FW', 'Portugal', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Gonçalo Guedes', 29, 'FW', 'Portugal', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['João Cancelo', 32, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Rúben Neves', 29, 'MF', 'Portugal', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Rui Silva', 32, 'GK', 'Portugal', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Vitinha', 26, 'MF', 'Portugal', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Samú Costa', 25, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Nuno Mendes', 23, 'DF', 'Portugal', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Francisco Conceição', 23, 'FW', 'Portugal', 7, 2, 2, 9, 4, 6, 4, 8, 1],
      ],
    });
  }
}
