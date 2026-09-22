class Brazil extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 4], [4, 2], [5, 0], [5, 3]],
    FW: [[6, 3], [5, 6]],
  };

  constructor() {
    super({
      name: 'Brazil',
      level: 3,
      starPlayers: ['Vinícius Júnior', 'Bruno Guimarães', 'Raphinha', 'Marquinhos', 'Alisson'],
      startingDeck: "attacking",
      extraActions: { eureka: 1, 'joga-bonito': 2, ouch: 1, 'growing-menace': 1 },
      coach: 'Carlo Ancelotti',
      artifacts: ["tikiTakaBoots"],
      primaryColor: '#009b3a',
      reserveColor: '#ffdf00',
      shortsColor: '#002776',
      awayShortsColor: '#ffffff',
      startingXI: ['Alisson', 'Danilo Luiz', 'Marquinhos', 'Gabriel Magalhães', 'Alex Sandro', 'Bruno Guimarães', 'Éderson Silva', 'Lucas Paquetá', 'Casemiro', 'Vinícius Júnior', 'Raphinha'],
      squad: [
        ['Alisson', 33, 'GK', 'Brazil', 3, 8, 2, 1, 8, 3, 8, 3, 10],
        ['Éderson Silva', 26, 'MF', 'Brazil', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Gabriel Magalhães', 28, 'DF', 'Brazil', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Marquinhos', 32, 'DF', 'Brazil', 7, 9, 9, 4, 8, 6, 9, 8, 1],
        ['Casemiro', 34, 'MF', 'Brazil', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Alex Sandro', 35, 'DF', 'Brazil', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Vinícius Júnior', 25, 'FW', 'Brazil', 10, 5, 5, 9, 8, 10, 8, 4, 1],
        ['Bruno Guimarães', 28, 'MF', 'Brazil', 9, 5, 5, 8, 8, 9, 8, 4, 1],
        ['Matheus Cunha', 27, 'FW', 'Brazil', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Neymar', 34, 'FW', 'Brazil', 9, 3, 5, 8, 8, 9, 10, 8, 1],
        ['Raphinha', 29, 'FW', 'Brazil', 9, 5, 5, 8, 8, 9, 8, 4, 1],
        ['Weverton', 38, 'GK', 'Brazil', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Danilo Luiz', 34, 'DF', 'Brazil', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Bremer', 29, 'DF', 'Brazil', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Léo Pereira', 30, 'DF', 'Brazil', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Douglas Santos', 32, 'DF', 'Brazil', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Fabinho', 32, 'MF', 'Brazil', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Danilo Santos', 25, 'MF', 'Brazil', 7, 6, 6, 7, 5, 5, 8, 6, 1],
        ['Endrick', 19, 'FW', 'Brazil', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Lucas Paquetá', 28, 'MF', 'Brazil', 9, 9, 10, 6, 8, 8, 8, 7, 1],
        ['Luiz Henrique', 25, 'FW', 'Brazil', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Gabriel Martinelli', 24, 'FW', 'Brazil', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Ederson Moraes', 32, 'GK', 'Brazil', 2, 4, 6, 2, 4, 1, 4, 7, 8],
        ['Roger Ibañez', 27, 'DF', 'Brazil', 7, 7, 7, 4, 5, 2, 6, 7, 1],
        ['Igor Thiago', 24, 'FW', 'Brazil', 7, 2, 2, 9, 4, 6, 4, 8, 1],
        ['Rayan', 19, 'FW', 'Brazil', 7, 2, 2, 9, 4, 6, 4, 8, 1],
      ],
    });
  }
}
