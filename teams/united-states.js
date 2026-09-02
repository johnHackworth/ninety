class UnitedStates extends AbstractTeam {
  static formation = {
    'Matt Turner': [0, 3],
    'Sergiño Dest': [2, 0],
    'Chris Richards': [2, 2],
    'Cameron Carter-Vickers': [2, 4],
    'Antonee Robinson': [2, 6],
    'Weston McKennie': [4, 0],
    'Tyler Adams': [4, 2],
    'Yunus Musah': [4, 4],
    'Christian Pulisic': [4, 6],
    'Folarin Balogun': [6, 2],
    'Tim Weah': [6, 4],
  };

  constructor() {
    super({
      name: 'United States',
      level: 2,
  starPlayers: ['Christian Pulisic', 'Weston McKennie', 'Tyler Adams', 'Folarin Balogun'],
      startingDeck: "counter",
      extraActions: { eureka: 1, 'peak-fitness': 1 },
      coach: 'Mauricio Pochettino',
      artifacts: [ 'pressMachine'],
      primaryColor: '#ffffff',
      reserveColor: '#002868',
      shortsColor: '#002868',
      awayShortsColor: '#101010',
      startingXI: ['Matt Turner', 'Sergiño Dest', 'Chris Richards', 'Cameron Carter-Vickers', 'Antonee Robinson', 'Weston McKennie', 'Tyler Adams', 'Yunus Musah', 'Christian Pulisic', 'Folarin Balogun', 'Tim Weah'],
      squad: [
        ['Matt Turner', 32, 'GK', 'United States', 3, 7, 2, 1, 7, 3, 6, 3, 8],
        ['Zack Steffen', 31, 'GK', 'United States', 3, 7, 2, 1, 7, 3, 6, 3, 8],
        ['Sergiño Dest', 26, 'DF', 'United States', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Chris Richards', 26, 'DF', 'United States', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Cameron Carter-Vickers', 29, 'DF', 'United States', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Antonee Robinson', 29, 'DF', 'United States', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Joe Scally', 24, 'DF', 'United States', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Weston McKennie', 28, 'MF', 'United States', 8, 7, 7, 7, 7, 7, 7, 6, 1],
        ['Tyler Adams', 27, 'MF', 'United States', 8, 8, 8, 5, 7, 7, 8, 5, 1],
        ['Yunus Musah', 24, 'MF', 'United States', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Christian Pulisic', 28, 'MF', 'United States', 9, 5, 5, 8, 8, 9, 8, 4, 1],
        ['Gio Reyna', 24, 'MF', 'United States', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Malik Tillman', 24, 'MF', 'United States', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Folarin Balogun', 25, 'FW', 'United States', 8, 5, 5, 8, 6, 7, 7, 6, 1],
        ['Tim Weah', 26, 'FW', 'United States', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Ricardo Pepi', 23, 'FW', 'United States', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Josh Sargent', 26, 'FW', 'United States', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Brenden Aaronson', 26, 'FW', 'United States', 7, 4, 3, 8, 7, 7, 6, 6, 1],
      ],
    });
  }
}
