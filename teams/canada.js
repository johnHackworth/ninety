class Canada extends AbstractTeam {
  static formation = {
    'Maxime Crépeau': [0, 3],
    'Alistair Johnston': [2, 0],
    'Moïse Bombito': [2, 2],
    'Derek Cornelius': [2, 4],
    'Alphonso Davies': [2, 6],
    'Stephen Eustáquio': [4, 0],
    'Ismaël Koné': [4, 2],
    'Jonathan Osorio': [4, 4],
    'Tajon Buchanan': [4, 6],
    'Jonathan David': [6, 2],
    'Cyle Larin': [6, 4],
  };

  constructor() {
    super({
      name: 'Canada',
      level: 1,
  starPlayers: ['Alphonso Davies', 'Jonathan David', 'Tajon Buchanan'],
      startingDeck: "attacking",
      coach: 'Jesse Marsch',
      artifacts: [ 'turboLegs'],
      primaryColor: '#d80621',
      reserveColor: '#ffffff',
      shortsColor: '#d80621',
      awayShortsColor: '#000000',
      startingXI: ['Maxime Crépeau', 'Alistair Johnston', 'Moïse Bombito', 'Derek Cornelius', 'Alphonso Davies', 'Stephen Eustáquio', 'Ismaël Koné', 'Jonathan Osorio', 'Tajon Buchanan', 'Jonathan David', 'Cyle Larin'],
      squad: [
        ['Maxime Crépeau', 32, 'GK', 'Canada', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Dayne St. Clair', 29, 'GK', 'Canada', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Alistair Johnston', 28, 'DF', 'Canada', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Alphonso Davies', 26, 'DF', 'Canada', 10, 6, 6, 5, 7, 8, 7, 5, 1],
        ['Moïse Bombito', 26, 'DF', 'Canada', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Derek Cornelius', 29, 'DF', 'Canada', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Kamal Miller', 29, 'DF', 'Canada', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Stephen Eustáquio', 30, 'MF', 'Canada', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Ismaël Koné', 24, 'MF', 'Canada', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Jonathan Osorio', 34, 'MF', 'Canada', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Tajon Buchanan', 27, 'MF', 'Canada', 9, 5, 5, 6, 7, 8, 6, 4, 1],
        ['Mathieu Choinière', 27, 'MF', 'Canada', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Ali Ahmed', 26, 'MF', 'Canada', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Jonathan David', 26, 'FW', 'Canada', 8, 5, 5, 8, 7, 8, 7, 6, 1],
        ['Cyle Larin', 31, 'FW', 'Canada', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Jacob Shaffelburg', 27, 'FW', 'Canada', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Liam Millar', 27, 'FW', 'Canada', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Iké Ugbo', 28, 'FW', 'Canada', 6, 3, 2, 7, 6, 6, 5, 5, 1],
      ],
    });
  }
}
