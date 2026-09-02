class IvoryCoast extends AbstractTeam {
  static formation = {
    'Yahia Fofana': [0, 3],
    'Konan': [2, 0],
    'Kossounou': [2, 2],
    'Ndicka': [2, 4],
    'Singo': [2, 6],
    'Kessié': [4, 0],
    'Ibrahim Sangaré': [4, 2],
    'Seko Fofana': [4, 4],
    'Adingra': [4, 6],
    'Pépé': [6, 2],
    'Haller': [6, 4],
  };

  constructor() {
    super({
      name: 'Ivory Coast',
      level: 1,
  starPlayers: ['Kessié', 'Pépé', 'Haller'],
      startingDeck: "counter",
      extraActions: { ouch: 1 },
      coach: 'Emerse Faé',
      primaryColor: '#ff8200',
      reserveColor: '#ffffff',
      shortsColor: '#ff8200',
      awayShortsColor: '#ffffff',
      startingXI: ['Yahia Fofana', 'Konan', 'Kossounou', 'Ndicka', 'Singo', 'Kessié', 'Ibrahim Sangaré', 'Seko Fofana', 'Adingra', 'Pépé', 'Haller'],
      squad: [
        ['Yahia Fofana', 25, 'GK', 'Ivory Coast', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Konan', 30, 'DF', 'Ivory Coast', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Kossounou', 25, 'DF', 'Ivory Coast', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Ndicka', 26, 'DF', 'Ivory Coast', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Singo', 25, 'DF', 'Ivory Coast', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Aurier', 33, 'DF', 'Ivory Coast', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Kessié', 29, 'MF', 'Ivory Coast', 7, 7, 7, 7, 8, 7, 7, 6, 1],
        ['Ibrahim Sangaré', 28, 'MF', 'Ivory Coast', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Seko Fofana', 31, 'MF', 'Ivory Coast', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Seri', 35, 'MF', 'Ivory Coast', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Traorè', 26, 'MF', 'Ivory Coast', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Aholou', 32, 'MF', 'Ivory Coast', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Pépé', 31, 'FW', 'Ivory Coast', 8, 4, 4, 8, 7, 9, 7, 5, 1],
        ['Adingra', 24, 'MF', 'Ivory Coast', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Haller', 32, 'FW', 'Ivory Coast', 7, 4, 4, 8, 6, 7, 7, 8, 1],
        ['Amad Diallo', 24, 'FW', 'Ivory Coast', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Kouamé', 28, 'FW', 'Ivory Coast', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Badra Sangaré', 39, 'GK', 'Ivory Coast', 2, 6, 1, 1, 6, 2, 5, 2, 7],
      ],
    });
  }
}
