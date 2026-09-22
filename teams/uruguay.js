class Uruguay extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 1], [3, 3], [4, 5], [6, 1]],
    FW: [[5, 3], [6, 5]],
  };

  constructor() {
    super({
      name: 'Uruguay',
      level: 2,
      starPlayers: ['Federico Valverde', 'Darwin Núñez', 'Manuel Ugarte', 'Ronald Araújo'],
      startingDeck: "defensive",
      extraActions: { "dirty-tricks": 2, eureka: 1, ouch: 1, 'garra-charrua': 1, 'no-pain-no-gain': 1 },
      coach: 'Marcelo Bielsa',
      artifacts: ["graniteWall", "pressMachine"],
      primaryColor: '#004b87',
      reserveColor: '#ffffff',
      shortsColor: '#000000',
      awayShortsColor: '#ffffff',
      startingXI: ['Sergio Rochet', 'Sebastián Cáceres', 'José María Giménez', 'Ronald Araújo', 'Mathías Olivera', 'Federico Valverde', 'Manuel Ugarte', 'Nicolás de la Cruz', 'Rodrigo Bentancur', 'Darwin Núñez', 'Facundo Pellistri'],
      squad: [
        ['Sergio Rochet', 33, 'GK', 'Uruguay', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['José María Giménez', 31, 'DF', 'Uruguay', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Sebastián Cáceres', 26, 'DF', 'Uruguay', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Ronald Araújo', 27, 'DF', 'Uruguay', 9, 8, 8, 4, 7, 6, 8, 8, 1],
        ['Manuel Ugarte', 25, 'MF', 'Uruguay', 7, 9, 9, 5, 7, 6, 8, 6, 1],
        ['Rodrigo Bentancur', 28, 'MF', 'Uruguay', 8, 9, 10, 7, 8, 8, 8, 9, 2],
        ['Nicolás de la Cruz', 29, 'MF', 'Uruguay', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Federico Valverde', 27, 'MF', 'Uruguay', 9, 8, 8, 9, 9, 9, 9, 7, 1],
        ['Darwin Núñez', 26, 'FW', 'Uruguay', 9, 4, 4, 9, 6, 8, 7, 8, 1],
        ['Giorgian de Arrascaeta', 32, 'MF', 'Uruguay', 10, 7, 9, 8, 8, 9, 8, 5, 3],
        ['Facundo Pellistri', 24, 'FW', 'Uruguay', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Santiago Mele', 28, 'GK', 'Uruguay', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Guillermo Varela', 33, 'DF', 'Uruguay', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Agustín Canobbio', 27, 'MF', 'Uruguay', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Emiliano Martínez', 26, 'MF', 'Uruguay', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Mathías Olivera', 28, 'DF', 'Uruguay', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Matías Viña', 28, 'DF', 'Uruguay', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Brian Rodríguez', 26, 'FW', 'Uruguay', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Rodrigo Aguirre', 31, 'FW', 'Uruguay', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Maximiliano Araújo', 26, 'MF', 'Uruguay', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Federico Viñas', 27, 'FW', 'Uruguay', 6, 2, 2, 8, 4, 5, 4, 7, 1],
        ['Joaquín Piquerez', 27, 'MF', 'Uruguay', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Fernando Muslera', 39, 'GK', 'Uruguay', 2, 4, 5, 2, 4, 1, 4, 6, 7],
        ['Santiago Bueno', 27, 'DF', 'Uruguay', 6, 7, 7, 3, 3, 2, 5, 7, 1],
        ['Juan Manuel Sanabria', 26, 'MF', 'Uruguay', 6, 5, 6, 6, 5, 5, 7, 5, 1],
        ['Rodrigo Zalazar', 26, 'MF', 'Uruguay', 6, 5, 6, 6, 5, 5, 7, 5, 1],
      ],
    });
  }
}
