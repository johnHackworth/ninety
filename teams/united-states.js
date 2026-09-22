class UnitedStates extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 0], [4, 2], [4, 4]],
    FW: [[4, 6], [6, 2], [6, 4]],
  };

  constructor() {
    super({
      name: 'United States',
      level: 2,
      starPlayers: ['Christian Pulisic', 'Weston McKennie', 'Tyler Adams', 'Folarin Balogun'],
      startingDeck: "counter",
      extraActions: { eureka: 1, 'peak-fitness': 1 },
      coach: 'Mauricio Pochettino',
      artifacts: ["pressMachine"],
      primaryColor: '#002868',
      reserveColor: '#ffffff',
      shortsColor: '#bf0a30',
      awayShortsColor: '#002868',
      startingXI: ['Matt Turner', 'Sergiño Dest', 'Chris Richards', 'Auston Trusty', 'Antonee Robinson', 'Weston McKennie', 'Tyler Adams', 'Cristian Roldan', 'Christian Pulisic', 'Folarin Balogun', 'Timothy Weah'],
      squad: [
        ['Matt Turner', 31, 'GK', 'United States', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Sergiño Dest', 25, 'DF', 'United States', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Chris Richards', 26, 'DF', 'United States', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Tyler Adams', 27, 'MF', 'United States', 8, 8, 8, 5, 7, 7, 8, 5, 1],
        ['Antonee Robinson', 28, 'DF', 'United States', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Auston Trusty', 27, 'DF', 'United States', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Giovanni Reyna', 23, 'MF', 'United States', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Weston McKennie', 27, 'MF', 'United States', 8, 7, 7, 7, 7, 7, 7, 6, 1],
        ['Ricardo Pepi', 23, 'FW', 'United States', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Christian Pulisic', 27, 'FW', 'United States', 9, 5, 5, 8, 8, 9, 8, 4, 1],
        ['Brenden Aaronson', 25, 'FW', 'United States', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Miles Robinson', 29, 'DF', 'United States', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Tim Ream', 38, 'DF', 'United States', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Sebastian Berhalter', 25, 'MF', 'United States', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Cristian Roldan', 31, 'MF', 'United States', 9, 6, 7, 9, 8, 8, 8, 10, 3],
        ['Alex Freeman', 21, 'DF', 'United States', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Malik Tillman', 24, 'MF', 'United States', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Max Arfsten', 25, 'DF', 'United States', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Haji Wright', 28, 'FW', 'United States', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Folarin Balogun', 24, 'FW', 'United States', 8, 5, 5, 8, 6, 7, 7, 6, 1],
        ['Timothy Weah', 26, 'FW', 'United States', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Mark McKenzie', 27, 'DF', 'United States', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Joe Scally', 23, 'DF', 'United States', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Matt Freese', 27, 'GK', 'United States', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Chris Brady', 22, 'GK', 'United States', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Alejandro Zendejas', 28, 'FW', 'United States', 6, 2, 2, 8, 4, 5, 4, 7, 1],
      ],
    });
  }
}
