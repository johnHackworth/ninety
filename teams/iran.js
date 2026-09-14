class Iran extends AbstractTeam {
  static formation = {
    'Alireza Beiranvand': [0, 3],
    'Saleh Hardani': [2, 0],
    'Ehsan Hajsafi': [2, 2],
    'Shojae Khalilzadeh': [2, 4],
    'Milad Mohammadi': [2, 6],
    'Saeid Ezatolahi': [4, 0],
    'Alireza Jahanbakhsh': [4, 2],
    'Mohammad Mohebi': [4, 4],
    'Saman Ghoddos': [4, 6],
    'Mehdi Taremi': [6, 2],
    'Mehdi Ghayedi': [6, 4],
  };

  constructor() {
    super({
      name: 'Iran',
      level: 1,
      starPlayers: ['Mehdi Taremi', 'Alireza Jahanbakhsh', 'Saeid Ezatolahi', 'Mohammad Mohebi'],
      startingDeck: "defensive",
      extraActions: { eureka: 1, ouch: 1, 'fortress-mentality': 1 },
      coach: 'Amir Ghalenoei',
      artifacts: ["graniteWall"],
      primaryColor: '#da291c',
      reserveColor: '#ffffff',
      shortsColor: '#2354a2',
      awayShortsColor: '#ffffff',
      startingXI: ['Alireza Beiranvand', 'Saleh Hardani', 'Ehsan Hajsafi', 'Shojae Khalilzadeh', 'Milad Mohammadi', 'Saeid Ezatolahi', 'Alireza Jahanbakhsh', 'Mohammad Mohebi', 'Saman Ghoddos', 'Mehdi Taremi', 'Mehdi Ghayedi'],
      squad: [
        ['Alireza Beiranvand', 33, 'GK', 'Iran', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Saleh Hardani', 27, 'DF', 'Iran', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Ehsan Hajsafi', 36, 'DF', 'Iran', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Shojae Khalilzadeh', 37, 'DF', 'Iran', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Milad Mohammadi', 32, 'DF', 'Iran', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Saeid Ezatolahi', 29, 'MF', 'Iran', 8, 9, 10, 8, 8, 8, 8, 9, 3]
        ['Alireza Jahanbakhsh', 32, 'MF', 'Iran', 9, 6, 9, 6, 8, 8, 8, 10, 3]
        ['Mohammad Mohebi', 27, 'MF', 'Iran', 9, 10, 7, 8, 8, 8, 9, 6, 3]
        ['Mehdi Taremi', 33, 'FW', 'Iran', 8, 6, 4, 8, 8, 9, 10, 9, 1]
        ['Mehdi Ghayedi', 27, 'FW', 'Iran', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Ali Alipour', 30, 'FW', 'Iran', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Payam Niazmand', 31, 'GK', 'Iran', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Hossein Kanaanizadegan', 32, 'DF', 'Iran', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Saman Ghoddos', 32, 'MF', 'Iran', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Rouzbeh Cheshmi', 32, 'MF', 'Iran', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Mahdi Torabi', 31, 'MF', 'Iran', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Arya Yousefi', 24, 'DF', 'Iran', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Amirhossein Hosseinzadeh', 25, 'FW', 'Iran', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Ali Nemati', 30, 'DF', 'Iran', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Shahriyar Moghanlou', 31, 'FW', 'Iran', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Mohammad Ghorbani', 24, 'MF', 'Iran', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Hossein Hosseini', 33, 'GK', 'Iran', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Ramin Rezaeian', 36, 'DF', 'Iran', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Dennis Eckert', 29, 'FW', 'Iran', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Danial Eiri', 22, 'DF', 'Iran', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Amirmohammad Razzaghinia', 20, 'MF', 'Iran', 5, 4, 6, 5, 5, 4, 6, 4, 1]
      ],
    });
  }
}
