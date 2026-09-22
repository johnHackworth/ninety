class SouthKorea extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[5, 0], [4, 2], [4, 4], [5, 6], [6, 3]],
    FW: [[5, 3]],
  };

  constructor() {
    super({
      name: 'South Korea',
      level: 1,
      starPlayers: ['Son Heung-min', 'Kim Min-jae', 'Lee Kang-in'],
      startingDeck: "counter",
      extraActions: { eureka: 1 },
      coach: 'Hong Myung-bo',
      primaryColor: '#c60c30',
      reserveColor: '#003478',
      shortsColor: '#003478',
      awayShortsColor: '#ffffff',
      startingXI: ['Jo Hyeon-woo', 'Seol Young-woo', 'Kim Min-jae', 'Lee Han-beom', 'Kim Tae-hyeon', 'Lee Jae-sung', 'Hwang In-beom', 'Lee Gi-hyuk', 'Lee Kang-in', 'Son Heung-min', 'Hwang Hee-chan'],
      squad: [
        ['Kim Seung-gyu', 35, 'GK', 'South Korea', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Lee Han-beom', 23, 'DF', 'South Korea', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Lee Gi-hyuk', 25, 'MF', 'South Korea', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Kim Min-jae', 29, 'DF', 'South Korea', 8, 8, 8, 3, 7, 6, 8, 8, 1],
        ['Kim Tae-hyeon', 25, 'DF', 'South Korea', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Hwang In-beom', 29, 'MF', 'South Korea', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Son Heung-min', 33, 'FW', 'South Korea', 9, 4, 4, 9, 8, 9, 8, 5, 1],
        ['Paik Seung-ho', 29, 'MF', 'South Korea', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Cho Gue-sung', 28, 'FW', 'South Korea', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Lee Jae-sung', 33, 'MF', 'South Korea', 8, 8, 8, 7, 9, 10, 9, 5, 2],
        ['Hwang Hee-chan', 30, 'MF', 'South Korea', 9, 9, 10, 7, 8, 8, 8, 6, 2],
        ['Song Bum-keun', 28, 'GK', 'South Korea', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Lee Tae-seok', 23, 'DF', 'South Korea', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Cho Wi-je', 24, 'DF', 'South Korea', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Kim Moon-hwan', 30, 'DF', 'South Korea', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Park Jin-seob', 30, 'DF', 'South Korea', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Bae Jun-ho', 22, 'MF', 'South Korea', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Oh Hyeon-gyu', 25, 'FW', 'South Korea', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Lee Kang-in', 25, 'MF', 'South Korea', 8, 5, 5, 8, 9, 9, 8, 4, 1],
        ['Yang Hyun-jun', 24, 'MF', 'South Korea', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Jo Hyeon-woo', 34, 'GK', 'South Korea', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Seol Young-woo', 27, 'DF', 'South Korea', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Jens Castrop', 22, 'DF', 'South Korea', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Kim Jin-gyu', 29, 'MF', 'South Korea', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Eom Ji-sung', 24, 'MF', 'South Korea', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Lee Dong-gyeong', 28, 'MF', 'South Korea', 5, 4, 6, 5, 5, 4, 6, 4, 1],
      ],
    });
  }
}
