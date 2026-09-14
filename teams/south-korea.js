class SouthKorea extends AbstractTeam {
  static formation = {
    'Kim Seung-gyu': [0, 3],
    'Lee Han-beom': [2, 0],
    'Kim Min-jae': [2, 2],
    'Kim Tae-hyeon': [2, 4],
    'Lee Tae-seok': [2, 6],
    'Lee Gi-hyuk': [4, 0],
    'Hwang In-beom': [4, 2],
    'Paik Seung-ho': [4, 4],
    'Lee Jae-sung': [4, 6],
    'Son Heung-min': [6, 2],
    'Cho Gue-sung': [6, 4],
  };

  constructor() {
    super({
      name: 'South Korea',
      level: 1,
      starPlayers: ['Son Heung-min', 'Hwang Hee-chan', 'Lee Jae-sung'],
      startingDeck: "counter",
      extraActions: { eureka: 1 },
      coach: 'Hong Myung-bo',
      primaryColor: '#c60c30',
      reserveColor: '#003478',
      shortsColor: '#003478',
      awayShortsColor: '#ffffff',
      startingXI: ['Kim Seung-gyu', 'Lee Han-beom', 'Kim Min-jae', 'Kim Tae-hyeon', 'Lee Tae-seok', 'Lee Gi-hyuk', 'Hwang In-beom', 'Paik Seung-ho', 'Lee Jae-sung', 'Son Heung-min', 'Cho Gue-sung'],
      squad: [
        ['Kim Seung-gyu', 35, 'GK', 'South Korea', 6, 9, 5, 2, 8, 5, 9, 4, 10],
        ['Lee Han-beom', 23, 'DF', 'South Korea', 6, 8, 9, 2, 5, 6, 6, 6, 1],
        ['Lee Gi-hyuk', 25, 'MF', 'South Korea', 9, 6, 8, 6, 10, 8, 6, 4, 1],
        ['Kim Min-jae', 29, 'DF', 'South Korea', 10, 10, 10, 3, 6, 9, 8, 10, 1],
        ['Kim Tae-hyeon', 25, 'DF', 'South Korea', 8, 8, 6, 4, 6, 5, 7, 6, 1],
        ['Hwang In-beom', 29, 'MF', 'South Korea', 10, 7, 8, 5, 10, 8, 9, 5, 1],
        ['Son Heung-min', 33, 'FW', 'South Korea', 10, 3, 7, 10, 8, 10, 10, 10, 1],
        ['Paik Seung-ho', 29, 'MF', 'South Korea', 10, 5, 10, 7, 10, 9, 10, 6, 1],
        ['Cho Gue-sung', 28, 'FW', 'South Korea', 10, 4, 9, 10, 10, 10, 10, 9, 2],
        ['Lee Jae-sung', 33, 'MF', 'South Korea', 8, 8, 8, 7, 10, 10, 10, 5, 2],
        ['Hwang Hee-chan', 30, 'MF', 'South Korea', 10, 10, 10, 7, 10, 10, 8, 6, 2],
        ['Song Bum-keun', 28, 'GK', 'South Korea', 4, 8, 2, 1, 4, 3, 5, 6, 8],
        ['Lee Tae-seok', 23, 'DF', 'South Korea', 5, 10, 8, 5, 5, 7, 5, 9, 1],
        ['Cho Wi-je', 24, 'DF', 'South Korea', 7, 9, 9, 4, 5, 4, 7, 5, 2],
        ['Kim Moon-hwan', 30, 'DF', 'South Korea', 10, 10, 9, 3, 6, 8, 9, 10, 1],
        ['Park Jin-seob', 30, 'DF', 'South Korea', 5, 9, 9, 4, 9, 8, 7, 9, 1],
        ['Bae Jun-ho', 22, 'MF', 'South Korea', 9, 8, 7, 8, 10, 7, 10, 8, 2],
        ['Oh Hyeon-gyu', 25, 'FW', 'South Korea', 10, 4, 4, 10, 9, 10, 8, 7, 1],
        ['Lee Kang-in', 25, 'MF', 'South Korea', 10, 5, 7, 6, 10, 9, 8, 5, 1],
        ['Yang Hyun-jun', 24, 'MF', 'South Korea', 7, 4, 9, 4, 10, 9, 8, 8, 1],
        ['Jo Hyeon-woo', 34, 'GK', 'South Korea', 4, 10, 3, 2, 10, 3, 7, 7, 10],
        ['Seol Young-woo', 27, 'DF', 'South Korea', 6, 10, 8, 3, 9, 7, 10, 9, 3],
        ['Jens Castrop', 22, 'DF', 'South Korea', 6, 8, 7, 4, 9, 4, 6, 8, 1],
        ['Kim Jin-gyu', 29, 'MF', 'South Korea', 10, 7, 10, 6, 10, 10, 8, 7, 1],
        ['Eom Ji-sung', 24, 'MF', 'South Korea', 10, 7, 5, 6, 9, 8, 7, 6, 1],
        ['Lee Dong-gyeong', 28, 'MF', 'South Korea', 10, 5, 8, 5, 10, 7, 7, 4, 2]
      ],
    });
  }
}
