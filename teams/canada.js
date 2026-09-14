class Canada extends AbstractTeam {
  static formation = {
    'Dayne St. Clair': [0, 3],
    'Alistair Johnston': [2, 0],
    'Alfie Jones': [2, 2],
    'Luc de Fougerolles': [2, 4],
    'Joel Waterman': [2, 6],
    'Mathieu Choinière': [4, 0],
    'Stephen Eustáquio': [4, 2],
    'Ismaël Koné': [4, 4],
    'Liam Millar': [4, 6],
    'Cyle Larin': [6, 2],
    'Jonathan David': [6, 4],
  };

  constructor() {
    super({
      name: 'Canada',
      level: 1,
      starPlayers: ['Jonathan David', 'Cyle Larin', 'Tajon Buchanan', 'Jonathan Osorio'],
      startingDeck: "attacking",
      coach: 'Jesse Marsch',
      artifacts: ["turboLegs"],
      primaryColor: '#ff0000',
      reserveColor: '#ffffff',
      shortsColor: '#ff0000',
      awayShortsColor: '#000000',
      startingXI: ['Dayne St. Clair', 'Alistair Johnston', 'Alfie Jones', 'Luc de Fougerolles', 'Joel Waterman', 'Mathieu Choinière', 'Stephen Eustáquio', 'Ismaël Koné', 'Liam Millar', 'Cyle Larin', 'Jonathan David'],
      squad: [
        ['Dayne St. Clair', 29, 'GK', 'Canada', 4, 7, 5, 2, 10, 4, 8, 5, 10],
        ['Alistair Johnston', 27, 'DF', 'Canada', 10, 10, 10, 4, 10, 6, 10, 8, 2],
        ['Alfie Jones', 28, 'DF', 'Canada', 5, 7, 9, 2, 7, 6, 5, 6, 1],
        ['Luc de Fougerolles', 20, 'DF', 'Canada', 9, 10, 9, 2, 6, 4, 9, 9, 1],
        ['Joel Waterman', 30, 'DF', 'Canada', 9, 9, 8, 3, 8, 8, 7, 10, 1],
        ['Mathieu Choinière', 27, 'MF', 'Canada', 9, 5, 9, 4, 10, 8, 9, 5, 1],
        ['Stephen Eustáquio', 29, 'MF', 'Canada', 10, 10, 7, 8, 10, 10, 8, 8, 1],
        ['Ismaël Koné', 23, 'MF', 'Canada', 8, 8, 7, 8, 10, 9, 8, 5, 1],
        ['Cyle Larin', 31, 'FW', 'Canada', 10, 3, 5, 10, 10, 10, 10, 9, 1],
        ['Jonathan David', 26, 'FW', 'Canada', 10, 7, 5, 10, 10, 10, 9, 10, 1],
        ['Liam Millar', 26, 'MF', 'Canada', 9, 9, 9, 6, 10, 10, 10, 5, 1],
        ['Tani Oluwaseyi', 26, 'FW', 'Canada', 10, 2, 4, 10, 6, 8, 7, 9, 1],
        ['Derek Cornelius', 28, 'DF', 'Canada', 6, 10, 9, 4, 9, 5, 7, 10, 2],
        ['Jacob Shaffelburg', 26, 'MF', 'Canada', 7, 6, 7, 8, 10, 10, 10, 9, 1],
        ['Moïse Bombito', 26, 'DF', 'Canada', 8, 10, 7, 4, 9, 8, 9, 8, 1],
        ['Maxime Crépeau', 32, 'GK', 'Canada', 7, 10, 3, 1, 7, 2, 10, 5, 10],
        ['Tajon Buchanan', 27, 'FW', 'Canada', 10, 5, 8, 10, 10, 10, 10, 10, 1],
        ['Owen Goodman', 22, 'GK', 'Canada', 3, 6, 2, 1, 7, 2, 6, 6, 10],
        ['Alphonso Davies', 25, 'DF', 'Canada', 7, 10, 8, 4, 10, 10, 9, 9, 1],
        ['Ali Ahmed', 25, 'FW', 'Canada', 10, 3, 6, 10, 9, 9, 10, 8, 1],
        ['Jonathan Osorio', 33, 'MF', 'Canada', 9, 6, 10, 9, 10, 9, 10, 5, 2],
        ['Richie Laryea', 31, 'DF', 'Canada', 8, 10, 10, 5, 9, 9, 10, 8, 1],
        ['Niko Sigur', 22, 'DF', 'Canada', 9, 9, 9, 4, 6, 4, 6, 10, 1],
        ['Promise David', 24, 'FW', 'Canada', 9, 4, 4, 10, 8, 9, 8, 6, 1],
        ['Nathan Saliba', 22, 'MF', 'Canada', 10, 6, 6, 8, 10, 10, 10, 9, 1],
        ['Jayden Nelson', 23, 'FW', 'Canada', 10, 3, 6, 10, 8, 8, 7, 8, 1]
      ],
    });
  }
}
