class Uruguay extends AbstractTeam {
  static formation = {
    'Rochet': [0, 3],
    'Nández': [2, 0],
    'Giménez': [2, 2],
    'Araújo': [2, 4],
    'Olivera': [2, 6],
    'Ugarte': [3, 3],
    'Valverde': [4, 1],
    'De la Cruz': [4, 5],
    'Bentancur': [6, 1],
    'Pellistri': [6, 5],
    'Darwin Núñez': [5, 3],
  };

  constructor() {
    super({
      name: 'Uruguay',
      level: 2,
  starPlayers: ['Valverde', 'Darwin Núñez', 'Ugarte', 'Araújo'],
      startingDeck: "defensive",
      extraActions: { "dirty-tricks": 2, eureka: 1, ouch: 1, 'garra-charrua': 1, 'no-pain-no-gain': 1 },
      coach: 'Marcelo Bielsa',
      artifacts: [ 'graniteWall', 'pressMachine'],
      primaryColor: '#7bafd4',
      reserveColor: '#000000',
      shortsColor: '#001f5b',
      awayShortsColor: '#000000',
      startingXI: ['Rochet', 'Nández', 'Giménez', 'Araújo', 'Olivera', 'Valverde', 'Ugarte', 'De la Cruz', 'Bentancur', 'Darwin Núñez', 'Pellistri'],
      squad: [
        ['Rochet', 33, 'GK', 'Uruguay', 3, 7, 2, 1, 7, 3, 6, 3, 8],
        ['Israel', 26, 'GK', 'Uruguay', 3, 7, 2, 1, 7, 3, 6, 3, 8],
        ['Nández', 30, 'DF', 'Uruguay', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Giménez', 31, 'DF', 'Uruguay', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Araújo', 27, 'DF', 'Uruguay', 9, 8, 8, 4, 7, 6, 8, 8, 1],
        ['Olivera', 28, 'DF', 'Uruguay', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Cáceres', 27, 'DF', 'Uruguay', 7, 8, 7, 3, 7, 5, 7, 7, 1],
        ['Valverde', 28, 'MF', 'Uruguay', 9, 8, 8, 9, 9, 9, 9, 7, 1],
        ['Ugarte', 25, 'MF', 'Uruguay', 7, 9, 9, 5, 7, 6, 8, 6, 1],
        ['De la Cruz', 29, 'MF', 'Uruguay', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Bentancur', 29, 'MF', 'Uruguay', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Arrascaeta', 32, 'MF', 'Uruguay', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Zalazar', 27, 'MF', 'Uruguay', 6, 6, 6, 6, 8, 7, 7, 5, 1],
        ['Darwin Núñez', 27, 'FW', 'Uruguay', 9, 4, 4, 9, 6, 8, 7, 8, 1],
        ['Pellistri', 24, 'FW', 'Uruguay', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Facundo Torres', 26, 'FW', 'Uruguay', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Luciano Rodríguez', 23, 'FW', 'Uruguay', 7, 4, 3, 8, 7, 7, 6, 6, 1],
        ['Cristian Olivera', 24, 'FW', 'Uruguay', 7, 4, 3, 8, 7, 7, 6, 6, 1],
      ],
    });
  }
}
