class Canada extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4]],
    FW: [[4, 6], [6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'Canada',
      level: 1,
      starPlayers: ['Alphonso Davies', 'Jonathan David', 'Tajon Buchanan'],
      startingDeck: "attacking",
      coach: 'Jesse Marsch',
      artifacts: ["turboLegs"],
      primaryColor: '#ff0000',
      reserveColor: '#ffffff',
      shortsColor: '#ff0000',
      awayShortsColor: '#000000',
      startingXI: ['Maxime Crépeau', 'Alistair Johnston', 'Moïse Bombito', 'Derek Cornelius', 'Alphonso Davies', 'Stephen Eustáquio', 'Ismaël Koné', 'Jonathan Osorio', 'Tajon Buchanan', 'Jonathan David', 'Cyle Larin'],
      squad: [
        ['Dayne St. Clair', 29, 'GK', 'Canada', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Alistair Johnston', 27, 'DF', 'Canada', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Alfie Jones', 28, 'DF', 'Canada', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Luc de Fougerolles', 20, 'DF', 'Canada', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Joel Waterman', 30, 'DF', 'Canada', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Mathieu Choinière', 27, 'MF', 'Canada', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Stephen Eustáquio', 29, 'MF', 'Canada', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Ismaël Koné', 23, 'MF', 'Canada', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Cyle Larin', 31, 'FW', 'Canada', 8, 3, 5, 8, 10, 8, 9, 9, 1],
        ['Jonathan David', 26, 'FW', 'Canada', 8, 5, 5, 8, 7, 8, 7, 6, 1],
        ['Liam Millar', 26, 'MF', 'Canada', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Tani Oluwaseyi', 26, 'FW', 'Canada', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Derek Cornelius', 28, 'DF', 'Canada', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Jacob Shaffelburg', 26, 'MF', 'Canada', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Moïse Bombito', 26, 'DF', 'Canada', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Maxime Crépeau', 32, 'GK', 'Canada', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Tajon Buchanan', 27, 'FW', 'Canada', 9, 5, 5, 6, 7, 8, 6, 4, 1],
        ['Owen Goodman', 22, 'GK', 'Canada', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Alphonso Davies', 25, 'DF', 'Canada', 10, 6, 6, 5, 7, 8, 7, 5, 1],
        ['Ali Ahmed', 25, 'FW', 'Canada', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Jonathan Osorio', 33, 'MF', 'Canada', 9, 6, 10, 9, 8, 8, 8, 5, 2],
        ['Richie Laryea', 31, 'DF', 'Canada', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Niko Sigur', 22, 'DF', 'Canada', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Promise David', 24, 'FW', 'Canada', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Nathan Saliba', 22, 'MF', 'Canada', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Jayden Nelson', 23, 'FW', 'Canada', 5, 2, 2, 7, 4, 4, 4, 6, 1],
      ],
    });
  }
}
