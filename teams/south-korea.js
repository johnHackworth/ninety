class SouthKorea extends AbstractTeam {
  static formation = {
    'Jo Hyeon-woo': [0, 3],
    'Seol Young-woo': [2, 0],
    'Kim Min-jae': [2, 2],
    'Kim Young-gwon': [2, 4],
    'Kim Jin-su': [2, 6],
    'Hwang In-beom': [4, 2],
    'Park Yong-woo': [4, 4],
    'Lee Jae-sung': [5, 0],
    'Son Heung-min': [5, 3],
    'Lee Kang-in': [5, 6],
    'Hwang Hee-chan': [6, 3],
  };

  constructor() {
    super({
      name: 'South Korea',
      level: 1,
  starPlayers: ['Son Heung-min', 'Kim Min-jae', 'Lee Kang-in'],
      startingDeck: "counter",
      extraActions: { eureka: 1 },
      coach: 'Hong Myung-bo',
      primaryColor: '#cd2e3a',
      reserveColor: '#111111',
      shortsColor: '#111111',
      awayShortsColor: '#5a2c82',
      startingXI: ['Jo Hyeon-woo', 'Seol Young-woo', 'Kim Min-jae', 'Kim Young-gwon', 'Kim Jin-su', 'Lee Jae-sung', 'Hwang In-beom', 'Park Yong-woo', 'Lee Kang-in', 'Son Heung-min', 'Hwang Hee-chan'],
      squad: [
        ['Jo Hyeon-woo', 35, 'GK', 'South Korea', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Kim Seung-gyu', 36, 'GK', 'South Korea', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Seol Young-woo', 28, 'DF', 'South Korea', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Kim Min-jae', 30, 'DF', 'South Korea', 8, 8, 8, 3, 7, 6, 8, 8, 1],
        ['Kim Young-gwon', 36, 'DF', 'South Korea', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Kim Jin-su', 34, 'DF', 'South Korea', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Lee Han-beom', 24, 'DF', 'South Korea', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Lee Jae-sung', 34, 'MF', 'South Korea', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Hwang In-beom', 30, 'MF', 'South Korea', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Park Yong-woo', 33, 'MF', 'South Korea', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Lee Kang-in', 25, 'MF', 'South Korea', 8, 5, 5, 8, 9, 9, 8, 4, 1],
        ['Paik Seung-ho', 29, 'MF', 'South Korea', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Song Min-kyu', 27, 'MF', 'South Korea', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Son Heung-min', 34, 'FW', 'South Korea', 9, 4, 4, 9, 8, 9, 8, 5, 1],
        ['Hwang Hee-chan', 30, 'FW', 'South Korea', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Oh Hyeon-gyu', 25, 'FW', 'South Korea', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Jung Woo-yeong', 27, 'FW', 'South Korea', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Yang Hyun-jun', 24, 'FW', 'South Korea', 6, 3, 2, 7, 6, 6, 5, 5, 1],
      ],
    });
  }
}
