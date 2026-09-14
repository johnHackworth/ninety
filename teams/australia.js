class Australia extends AbstractTeam {
  static formation = {
    'Mathew Ryan': [0, 3],
    'Miloš Degenek': [2, 0],
    'Alessandro Circati': [2, 2],
    'Jacob Italiano': [2, 4],
    'Jordan Bos': [2, 6],
    'Connor Metcalfe': [4, 0],
    'Aiden O\'Neill': [4, 2],
    'Cammy Devlin': [4, 4],
    'Jackson Irvine': [4, 6],
    'Mathew Leckie': [6, 2],
    'Mohamed Touré': [6, 4],
  };

  constructor() {
    super({
      name: 'Australia',
      level: 1,
      starPlayers: ['Jackson Irvine', 'Mathew Leckie', 'Miloš Degenek'],
      startingDeck: "defensive",
      extraActions: { eureka: 1 },
      coach: 'Tony Popovic',
      artifacts: ["pressMachine"],
      primaryColor: '#ffcd00',
      reserveColor: '#004b87',
      shortsColor: '#004b87',
      awayShortsColor: '#004b87',
      startingXI: ['Mathew Ryan', 'Miloš Degenek', 'Alessandro Circati', 'Jacob Italiano', 'Jordan Bos', 'Connor Metcalfe', 'Aiden O\'Neill', 'Cammy Devlin', 'Jackson Irvine', 'Mathew Leckie', 'Mohamed Touré'],
      squad: [
        ['Mathew Ryan', 34, 'GK', 'Australia', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Miloš Degenek', 32, 'DF', 'Australia', 8, 8, 9, 4, 7, 7, 10, 9, 2]
        ['Alessandro Circati', 22, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Jacob Italiano', 24, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Jordan Bos', 23, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Jason Geria', 33, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Mathew Leckie', 35, 'FW', 'Australia', 8, 2, 6, 8, 9, 8, 10, 9, 1]
        ['Connor Metcalfe', 26, 'MF', 'Australia', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Mohamed Touré', 22, 'FW', 'Australia', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Ajdin Hrustic', 29, 'FW', 'Australia', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Awer Mabil', 30, 'FW', 'Australia', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Paul Izzo', 31, 'GK', 'Australia', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Aiden O\\\'Neill', 27, 'MF', 'Australia', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Cammy Devlin', 28, 'MF', 'Australia', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Kai Trewin', 25, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Aziz Behich', 35, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Nestory Irankunda', 20, 'FW', 'Australia', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Patrick Beach', 22, 'GK', 'Australia', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Harry Souttar', 27, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Cristian Volpato', 22, 'FW', 'Australia', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Cameron Burgess', 30, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Jackson Irvine', 33, 'MF', 'Australia', 10, 5, 8, 6, 8, 9, 9, 7, 2]
        ['Nishan Velupillay', 25, 'FW', 'Australia', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Paul Okon-Engstler', 21, 'MF', 'Australia', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Lucas Herrington', 18, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Tete Yengi', 25, 'FW', 'Australia', 5, 2, 2, 7, 4, 4, 4, 6, 1]
      ],
    });
  }
}
