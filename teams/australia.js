class Australia extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4], [4, 6]],
    FW: [[6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Australia',
      level: 1,
      starPlayers: ['Nestory Irankunda', 'Jackson Irvine', 'Connor Metcalfe'],
      startingDeck: "defensive",
      extraActions: { eureka: 1 },
      coach: 'Tony Popovic',
      artifacts: ["pressMachine"],
      primaryColor: '#ffcd00',
      reserveColor: '#004b87',
      shortsColor: '#004b87',
      awayShortsColor: '#004b87',
      startingXI: ['Mathew Ryan', 'Miloš Degenek', 'Harry Souttar', 'Alessandro Circati', 'Aziz Behich', 'Connor Metcalfe', 'Jackson Irvine', 'Aiden O\'Neill', 'Cammy Devlin', 'Nestory Irankunda', 'Mathew Leckie'],
      squad: [
        ['Mathew Ryan', 34, 'GK', 'Australia', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Miloš Degenek', 32, 'DF', 'Australia', 8, 8, 9, 4, 7, 7, 10, 9, 2],
        ['Alessandro Circati', 22, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Jacob Italiano', 24, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Jordan Bos', 23, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Jason Geria', 33, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Mathew Leckie', 35, 'FW', 'Australia', 8, 2, 6, 8, 9, 8, 10, 9, 1],
        ['Connor Metcalfe', 26, 'MF', 'Australia', 7, 5, 5, 7, 7, 7, 6, 4, 1],
        ['Mohamed Touré', 22, 'FW', 'Australia', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Ajdin Hrustic', 29, 'FW', 'Australia', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Awer Mabil', 30, 'FW', 'Australia', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Paul Izzo', 31, 'GK', 'Australia', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Aiden O\'Neill', 27, 'MF', 'Australia', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Cammy Devlin', 28, 'MF', 'Australia', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Kai Trewin', 25, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Aziz Behich', 35, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Nestory Irankunda', 20, 'FW', 'Australia', 9, 4, 4, 8, 7, 8, 7, 5, 1],
        ['Patrick Beach', 22, 'GK', 'Australia', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Harry Souttar', 27, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Cristian Volpato', 22, 'FW', 'Australia', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Cameron Burgess', 30, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Jackson Irvine', 33, 'MF', 'Australia', 6, 6, 6, 7, 7, 6, 7, 5, 1],
        ['Nishan Velupillay', 25, 'FW', 'Australia', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Paul Okon-Engstler', 21, 'MF', 'Australia', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Lucas Herrington', 18, 'DF', 'Australia', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Tete Yengi', 25, 'FW', 'Australia', 5, 2, 2, 7, 4, 4, 4, 6, 1],
      ],
    });
  }
}
