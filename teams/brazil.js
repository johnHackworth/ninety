class Brazil extends AbstractTeam {
  static formation = {
    'Alisson': [0, 3],
    'Danilo': [2, 0],
    'Marquinhos': [2, 2],
    'Gabriel Magalhães': [2, 4],
    'Wendell': [2, 6],
    'André': [4, 2],
    'Bruno Guimarães': [4, 4],
    'Paquetá': [5, 0],
    'Rodrygo': [5, 3],
    'Raphinha': [5, 6],
    'Vinícius Júnior': [6, 3],
  };

  constructor() {
    super({
      name: 'Brazil',
      level: 3,
  starPlayers: ['Vinícius Júnior', 'Rodrygo', 'Raphinha', 'Marquinhos', 'Alisson'],
      startingDeck: "attacking",
      extraActions: { eureka: 1, 'joga-bonito': 2, ouch: 1, 'growing-menace': 1 },
      coach: 'Carlo Ancelotti',
      artifacts: [ 'tikiTakaBoots'],
      primaryColor: '#ffdd00',
      reserveColor: '#002776',
      shortsColor: '#002776',
      awayShortsColor: '#002776',
      startingXI: ['Alisson', 'Danilo', 'Marquinhos', 'Gabriel Magalhães', 'Wendell', 'Bruno Guimarães', 'André', 'Paquetá', 'Rodrygo', 'Vinícius Júnior', 'Raphinha'],
      squad: [
        ['Alisson', 33, 'GK', 'Brazil', 3, 8, 2, 1, 8, 3, 8, 3, 10],
        ['Ederson', 32, 'GK', 'Brazil', 4, 8, 3, 2, 8, 4, 7, 4, 9],
        ['Danilo', 35, 'DF', 'Brazil', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Marquinhos', 32, 'DF', 'Brazil', 7, 9, 9, 4, 8, 6, 9, 8, 1],
        ['Gabriel Magalhães', 28, 'DF', 'Brazil', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Wendell', 33, 'DF', 'Brazil', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Militão', 28, 'DF', 'Brazil', 8, 9, 8, 4, 8, 6, 8, 8, 2],
        ['Bruno Guimarães', 28, 'MF', 'Brazil', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['André', 25, 'MF', 'Brazil', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Paquetá', 28, 'MF', 'Brazil', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Rodrygo', 25, 'MF', 'Brazil', 9, 5, 5, 8, 8, 9, 8, 4, 1],
        ['João Gomes', 25, 'MF', 'Brazil', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Veiga', 31, 'MF', 'Brazil', 7, 7, 7, 7, 9, 8, 8, 6, 2],
        ['Vinícius Júnior', 26, 'FW', 'Brazil', 10, 5, 5, 9, 8, 10, 8, 4, 1],
        ['Raphinha', 29, 'FW', 'Brazil', 9, 5, 5, 8, 8, 9, 8, 4, 1],
        ['Endrick', 20, 'FW', 'Brazil', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Gabriel Jesus', 29, 'FW', 'Brazil', 8, 5, 4, 9, 8, 8, 7, 7, 2],
        ['Estêvão', 19, 'FW', 'Brazil', 8, 5, 4, 9, 8, 8, 7, 7, 2],
      ],
    });
  }
}
