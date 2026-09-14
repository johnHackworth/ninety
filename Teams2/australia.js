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
      startingDeck: "balanced",
      extraActions: {"total-football":1},
      coach: 'Tony Popovic',
      artifacts: ["goldenGlove"],
      primaryColor: '#ffcd00',
      reserveColor: '#004b87',
      shortsColor: '#004b87',
      awayShortsColor: '#004b87',
      startingXI: ['Mathew Ryan', 'Miloš Degenek', 'Alessandro Circati', 'Jacob Italiano', 'Jordan Bos', 'Connor Metcalfe', 'Aiden O\'Neill', 'Cammy Devlin', 'Jackson Irvine', 'Mathew Leckie', 'Mohamed Touré'],
      squad: [
        ['Mathew Ryan', 34, 'GK', 'Australia', 4, 9, 5, 2, 10, 5, 10, 9, 10],
        ['Miloš Degenek', 32, 'DF', 'Australia', 8, 10, 10, 4, 7, 7, 10, 10, 2],
        ['Alessandro Circati', 22, 'DF', 'Australia', 6, 10, 9, 2, 7, 8, 5, 9, 2],
        ['Jacob Italiano', 24, 'DF', 'Australia', 7, 9, 9, 2, 5, 4, 5, 6, 1],
        ['Jordan Bos', 23, 'DF', 'Australia', 7, 10, 8, 5, 10, 7, 7, 10, 1],
        ['Jason Geria', 33, 'DF', 'Australia', 8, 8, 8, 4, 5, 4, 9, 9, 1],
        ['Mathew Leckie', 35, 'FW', 'Australia', 10, 2, 6, 10, 9, 10, 10, 10, 1],
        ['Connor Metcalfe', 26, 'MF', 'Australia', 10, 5, 10, 9, 10, 9, 10, 5, 2],
        ['Mohamed Touré', 22, 'FW', 'Australia', 8, 3, 4, 10, 5, 8, 9, 7, 1],
        ['Ajdin Hrustic', 29, 'FW', 'Australia', 10, 3, 4, 10, 9, 10, 6, 9, 1],
        ['Awer Mabil', 30, 'FW', 'Australia', 10, 2, 4, 10, 9, 10, 9, 8, 1],
        ['Paul Izzo', 31, 'GK', 'Australia', 4, 7, 4, 1, 5, 2, 8, 4, 8],
        ['Aiden O\'Neill', 27, 'MF', 'Australia', 9, 6, 10, 4, 9, 8, 8, 4, 2],
        ['Cammy Devlin', 28, 'MF', 'Australia', 6, 6, 5, 4, 8, 6, 6, 4, 1],
        ['Kai Trewin', 25, 'DF', 'Australia', 8, 8, 7, 4, 5, 6, 6, 8, 1],
        ['Aziz Behich', 35, 'DF', 'Australia', 10, 9, 8, 2, 9, 6, 10, 7, 1],
        ['Nestory Irankunda', 20, 'FW', 'Australia', 8, 2, 6, 9, 6, 10, 6, 9, 1],
        ['Patrick Beach', 22, 'GK', 'Australia', 3, 6, 2, 1, 5, 3, 6, 7, 10],
        ['Harry Souttar', 27, 'DF', 'Australia', 7, 10, 9, 4, 10, 6, 7, 7, 1],
        ['Cristian Volpato', 22, 'FW', 'Australia', 9, 3, 5, 9, 6, 8, 6, 9, 1],
        ['Cameron Burgess', 30, 'DF', 'Australia', 8, 10, 8, 2, 6, 5, 9, 7, 2],
        ['Jackson Irvine', 33, 'MF', 'Australia', 10, 5, 8, 6, 10, 10, 10, 7, 2],
        ['Nishan Velupillay', 25, 'FW', 'Australia', 7, 3, 3, 10, 6, 10, 7, 6, 1],
        ['Paul Okon-Engstler', 21, 'MF', 'Australia', 7, 8, 6, 7, 9, 8, 8, 4, 1],
        ['Lucas Herrington', 18, 'DF', 'Australia', 7, 7, 9, 4, 7, 7, 6, 9, 2],
        ['Tete Yengi', 25, 'FW', 'Australia', 10, 2, 2, 8, 7, 7, 8, 6, 1]
      ],
    });
  }
}

module.exports = Australia;