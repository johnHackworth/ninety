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
      startingDeck: "direct",
      extraActions: {"total-football":1},
      coach: 'Roberto Martínez',
      artifacts: ["turboLegs"],
      primaryColor: '#c8102e',
      reserveColor: '#006600',
      shortsColor: '#006600',
      awayShortsColor: '#ffffff',
      startingXI: ['Diogo Costa', 'Nélson Semedo', 'Rúben Dias', 'Tomás Araújo', 'Diogo Dalot', 'Matheus Nunes', 'Bruno Fernandes', 'Bernardo Silva', 'João Neves', 'Cristiano Ronaldo', 'Gonçalo Ramos'],
      squad: [
        ['Diogo Costa', 26, 'GK', 'Portugal', 6, 9, 5, 1, 6, 6, 10, 6, 10],
        ['Nélson Semedo', 32, 'DF', 'Portugal', 10, 10, 8, 5, 10, 10, 8, 8, 1],
        ['Rúben Dias', 29, 'DF', 'Portugal', 10, 10, 8, 3, 10, 5, 10, 10, 2],
        ['Tomás Araújo', 24, 'DF', 'Portugal', 6, 9, 7, 1, 7, 6, 5, 9, 1],
        ['Diogo Dalot', 27, 'DF', 'Portugal', 6, 9, 10, 2, 7, 9, 10, 10, 1],
        ['Matheus Nunes', 27, 'MF', 'Portugal', 6, 5, 8, 8, 9, 8, 10, 7, 2],
        ['Cristiano Ronaldo', 41, 'FW', 'Portugal', 10, 6, 7, 10, 9, 10, 10, 10, 1],
        ['Bruno Fernandes', 31, 'MF', 'Portugal', 10, 7, 10, 7, 10, 10, 9, 8, 1],
        ['Gonçalo Ramos', 24, 'FW', 'Portugal', 10, 2, 3, 10, 7, 10, 10, 9, 1],
        ['Bernardo Silva', 31, 'MF', 'Portugal', 8, 7, 7, 5, 10, 9, 10, 5, 1],
        ['João Félix', 26, 'FW', 'Portugal', 10, 7, 7, 10, 10, 10, 8, 10, 1],
        ['José Sá', 33, 'GK', 'Portugal', 4, 7, 3, 2, 6, 3, 9, 6, 9],
        ['Renato Veiga', 22, 'DF', 'Portugal', 7, 10, 9, 5, 9, 8, 9, 9, 2],
        ['Gonçalo Inácio', 24, 'DF', 'Portugal', 10, 9, 7, 2, 9, 8, 8, 10, 2],
        ['João Neves', 21, 'MF', 'Portugal', 10, 9, 10, 7, 9, 8, 10, 5, 2],
        ['Francisco Trincão', 26, 'FW', 'Portugal', 8, 5, 5, 10, 7, 10, 7, 6, 1],
        ['Rafael Leão', 27, 'FW', 'Portugal', 10, 2, 3, 10, 7, 10, 10, 7, 1],
        ['Pedro Neto', 26, 'FW', 'Portugal', 9, 4, 5, 10, 7, 10, 7, 7, 1],
        ['Gonçalo Guedes', 29, 'FW', 'Portugal', 10, 2, 3, 10, 7, 10, 8, 7, 1],
        ['João Cancelo', 32, 'DF', 'Portugal', 8, 10, 10, 4, 8, 5, 8, 9, 3],
        ['Rúben Neves', 29, 'MF', 'Portugal', 10, 10, 9, 5, 10, 10, 10, 7, 2],
        ['Rui Silva', 32, 'GK', 'Portugal', 3, 8, 4, 1, 5, 4, 6, 6, 8],
        ['Vitinha', 26, 'MF', 'Portugal', 10, 8, 8, 5, 10, 9, 10, 10, 2],
        ['Samú Costa', 25, 'DF', 'Portugal', 5, 7, 9, 3, 5, 6, 5, 7, 1],
        ['Nuno Mendes', 23, 'DF', 'Portugal', 10, 9, 8, 3, 10, 9, 7, 9, 1],
        ['Francisco Conceição', 23, 'FW', 'Portugal', 7, 4, 4, 9, 8, 10, 10, 8, 1]
      ],
    });
  }
}

module.exports = Portugal;