class Brazil extends AbstractTeam {
  static formation = {
    'Alisson': [0, 3],
    'Gabriel Magalhães': [2, 0],
    'Marquinhos': [2, 2],
    'Alex Sandro': [2, 4],
    'Danilo Luiz': [2, 6],
    'Éderson Silva': [4, 0],
    'Casemiro': [4, 2],
    'Bruno Guimarães': [4, 4],
    'Fabinho': [4, 6],
    'Vinícius Júnior': [6, 2],
    'Matheus Cunha': [6, 4],
  };

  constructor() {
    super({
      name: 'Brazil',
      level: 3,
      starPlayers: ['Neymar', 'Lucas Paquetá', 'Marquinhos', 'Vinícius Júnior', 'Bruno Guimarães'],
      startingDeck: "balanced",
      extraActions: {"park-the-bus":1},
      coach: 'Carlo Ancelotti',
      artifacts: ["turboLegs"],
      primaryColor: '#009b3a',
      reserveColor: '#ffdf00',
      shortsColor: '#002776',
      awayShortsColor: '#ffffff',
      startingXI: ['Alisson', 'Gabriel Magalhães', 'Marquinhos', 'Alex Sandro', 'Danilo Luiz', 'Éderson Silva', 'Casemiro', 'Bruno Guimarães', 'Fabinho', 'Vinícius Júnior', 'Matheus Cunha'],
      squad: [
        ['Alisson', 33, 'GK', 'Brazil', 5, 8, 2, 3, 9, 5, 10, 9, 10],
        ['Éderson Silva', 26, 'MF', 'Brazil', 6, 5, 6, 4, 7, 8, 6, 5, 1],
        ['Gabriel Magalhães', 28, 'DF', 'Brazil', 8, 9, 9, 3, 9, 6, 8, 10, 1],
        ['Marquinhos', 32, 'DF', 'Brazil', 10, 10, 9, 2, 7, 6, 10, 10, 3],
        ['Casemiro', 34, 'MF', 'Brazil', 10, 6, 10, 7, 10, 7, 8, 5, 1],
        ['Alex Sandro', 35, 'DF', 'Brazil', 8, 8, 9, 2, 7, 5, 6, 10, 1],
        ['Vinícius Júnior', 25, 'FW', 'Brazil', 10, 4, 4, 10, 10, 10, 10, 10, 1],
        ['Bruno Guimarães', 28, 'MF', 'Brazil', 10, 8, 10, 5, 10, 10, 9, 8, 2],
        ['Matheus Cunha', 27, 'FW', 'Brazil', 10, 5, 5, 9, 8, 9, 5, 8, 1],
        ['Neymar', 34, 'FW', 'Brazil', 10, 3, 5, 10, 8, 10, 10, 8, 1],
        ['Raphinha', 29, 'FW', 'Brazil', 10, 2, 6, 10, 7, 10, 10, 10, 1],
        ['Weverton', 38, 'GK', 'Brazil', 3, 7, 3, 1, 7, 1, 5, 7, 8],
        ['Danilo Luiz', 34, 'DF', 'Brazil', 6, 10, 10, 3, 9, 6, 10, 9, 2],
        ['Bremer', 29, 'DF', 'Brazil', 6, 8, 7, 1, 5, 4, 6, 6, 1],
        ['Léo Pereira', 30, 'DF', 'Brazil', 8, 8, 9, 3, 5, 4, 6, 7, 1],
        ['Douglas Santos', 32, 'DF', 'Brazil', 5, 9, 9, 1, 5, 5, 7, 8, 1],
        ['Fabinho', 32, 'MF', 'Brazil', 8, 7, 8, 8, 10, 7, 8, 10, 1],
        ['Danilo Santos', 25, 'MF', 'Brazil', 8, 4, 7, 4, 7, 9, 6, 6, 1],
        ['Endrick', 19, 'FW', 'Brazil', 8, 4, 3, 10, 10, 10, 9, 9, 1],
        ['Lucas Paquetá', 28, 'MF', 'Brazil', 10, 9, 10, 6, 10, 10, 10, 7, 1],
        ['Luiz Henrique', 25, 'FW', 'Brazil', 7, 3, 4, 10, 8, 8, 9, 5, 1],
        ['Gabriel Martinelli', 24, 'FW', 'Brazil', 8, 2, 5, 8, 7, 10, 10, 10, 1],
        ['Ederson Moraes', 32, 'GK', 'Brazil', 5, 10, 2, 1, 6, 3, 10, 9, 10],
        ['Roger Ibañez', 27, 'DF', 'Brazil', 4, 8, 6, 4, 4, 7, 7, 6, 2],
        ['Igor Thiago', 24, 'FW', 'Brazil', 10, 2, 4, 9, 7, 9, 8, 8, 1],
        ['Rayan', 19, 'FW', 'Brazil', 10, 3, 3, 7, 6, 7, 9, 8, 1]
      ],
    });
  }
}

module.exports = Brazil;