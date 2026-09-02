class Iran extends AbstractTeam {
  static formation = {
    'Beiranvand': [0, 3],
    'Mohammadi': [2, 0],
    'Khalilzadeh': [2, 2],
    'Pouraliganji': [2, 4],
    'Rezaeian': [2, 6],
    'Ezatolahi': [4, 0],
    'Ghoddos': [4, 2],
    'Gholizadeh': [4, 4],
    'Jahanbakhsh': [4, 6],
    'Taremi': [6, 2],
    'Azmoun': [6, 4],
  };

  constructor() {
    super({
      name: 'Iran',
      level: 1,
  starPlayers: ['Taremi', 'Azmoun', 'Jahanbakhsh'],
      startingDeck: "defensive",
      extraActions: { eureka: 1, ouch: 1, 'fortress-mentality': 1 },
      coach: 'Amir Ghalenoei',
      artifacts: [ 'graniteWall'],
      primaryColor: '#ffffff',
      reserveColor: '#d00018',
      shortsColor: '#ffffff',
      awayShortsColor: '#d00018',
      startingXI: ['Beiranvand', 'Mohammadi', 'Khalilzadeh', 'Pouraliganji', 'Rezaeian', 'Ezatolahi', 'Ghoddos', 'Gholizadeh', 'Jahanbakhsh', 'Taremi', 'Azmoun'],
      squad: [
        ['Beiranvand', 34, 'GK', 'Iran', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Niazmand', 31, 'GK', 'Iran', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Mohammadi', 33, 'DF', 'Iran', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Khalilzadeh', 37, 'DF', 'Iran', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Pouraliganji', 34, 'DF', 'Iran', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Rezaeian', 36, 'DF', 'Iran', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Majid Hosseini', 30, 'DF', 'Iran', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Ezatolahi', 30, 'MF', 'Iran', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Ghoddos', 33, 'MF', 'Iran', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Gholizadeh', 30, 'MF', 'Iran', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Jahanbakhsh', 33, 'MF', 'Iran', 8, 5, 5, 7, 7, 8, 7, 5, 1],
        ['Noorollahi', 33, 'MF', 'Iran', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Mohebi', 28, 'MF', 'Iran', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Taremi', 34, 'FW', 'Iran', 8, 4, 4, 8, 7, 8, 7, 7, 1],
        ['Azmoun', 31, 'FW', 'Iran', 8, 4, 4, 8, 6, 7, 7, 8, 1],
        ['Ansarifard', 36, 'FW', 'Iran', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Ghayedi', 28, 'FW', 'Iran', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Zahedi', 31, 'FW', 'Iran', 6, 3, 2, 7, 6, 6, 5, 5, 1],
      ],
    });
  }
}
