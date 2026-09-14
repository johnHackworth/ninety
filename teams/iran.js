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
      startingDeck: "balanced",
      extraActions: {"gegenpressing":1},
      coach: 'Amir Ghalenoei',
      artifacts: ["playmaker"],
      primaryColor: '#da291c',
      reserveColor: '#ffffff',
      shortsColor: '#2354a2',
      awayShortsColor: '#ffffff',
      startingXI: ['Alireza Beiranvand', 'Saleh Hardani', 'Ehsan Hajsafi', 'Shojae Khalilzadeh', 'Milad Mohammadi', 'Saeid Ezatolahi', 'Alireza Jahanbakhsh', 'Mohammad Mohebi', 'Saman Ghoddos', 'Mehdi Taremi', 'Mehdi Ghayedi'],
      squad: [
        ['Alireza Beiranvand', 33, 'GK', 'Iran', 5, 9, 5, 1, 9, 5, 10, 10, 10],
        ['Saleh Hardani', 27, 'DF', 'Iran', 9, 8, 9, 2, 5, 8, 8, 10, 1],
        ['Ehsan Hajsafi', 36, 'DF', 'Iran', 9, 10, 10, 1, 6, 7, 7, 9, 2],
        ['Shojae Khalilzadeh', 37, 'DF', 'Iran', 7, 10, 10, 2, 10, 8, 6, 10, 1],
        ['Milad Mohammadi', 32, 'DF', 'Iran', 9, 10, 10, 5, 10, 7, 8, 9, 2],
        ['Saeid Ezatolahi', 29, 'MF', 'Iran', 10, 9, 10, 10, 10, 8, 8, 9, 3],
        ['Alireza Jahanbakhsh', 32, 'MF', 'Iran', 10, 6, 10, 6, 10, 10, 10, 10, 3],
        ['Mohammad Mohebi', 27, 'MF', 'Iran', 10, 10, 7, 8, 9, 8, 10, 6, 3],
        ['Mehdi Taremi', 33, 'FW', 'Iran', 10, 6, 4, 10, 8, 10, 10, 9, 1],
        ['Mehdi Ghayedi', 27, 'FW', 'Iran', 10, 4, 6, 10, 9, 10, 10, 10, 1],
        ['Ali Alipour', 30, 'FW', 'Iran', 9, 3, 4, 7, 6, 10, 7, 6, 1],
        ['Payam Niazmand', 31, 'GK', 'Iran', 4, 7, 4, 1, 5, 2, 10, 6, 10],
        ['Hossein Kanaanizadegan', 32, 'DF', 'Iran', 8, 10, 10, 2, 9, 5, 8, 10, 1],
        ['Saman Ghoddos', 32, 'MF', 'Iran', 10, 5, 7, 9, 10, 10, 8, 7, 2],
        ['Rouzbeh Cheshmi', 32, 'MF', 'Iran', 9, 10, 10, 5, 10, 10, 10, 7, 2],
        ['Mahdi Torabi', 31, 'MF', 'Iran', 10, 7, 10, 8, 9, 10, 10, 5, 1],
        ['Arya Yousefi', 24, 'DF', 'Iran', 8, 7, 6, 3, 6, 7, 7, 9, 1],
        ['Amirhossein Hosseinzadeh', 25, 'FW', 'Iran', 10, 5, 5, 8, 9, 9, 5, 10, 1],
        ['Ali Nemati', 30, 'DF', 'Iran', 6, 9, 9, 5, 7, 5, 9, 10, 1],
        ['Shahriyar Moghanlou', 31, 'FW', 'Iran', 8, 1, 3, 10, 6, 10, 10, 6, 1],
        ['Mohammad Ghorbani', 24, 'MF', 'Iran', 9, 4, 6, 4, 10, 8, 6, 7, 1],
        ['Hossein Hosseini', 33, 'GK', 'Iran', 5, 6, 5, 1, 7, 3, 10, 7, 10],
        ['Ramin Rezaeian', 36, 'DF', 'Iran', 10, 10, 10, 4, 9, 5, 10, 7, 2],
        ['Dennis Eckert', 29, 'FW', 'Iran', 7, 2, 3, 7, 5, 6, 5, 4, 1],
        ['Danial Eiri', 22, 'DF', 'Iran', 6, 7, 9, 2, 8, 4, 5, 6, 1],
        ['Amirmohammad Razzaghinia', 20, 'MF', 'Iran', 8, 4, 6, 8, 8, 7, 9, 6, 1]
      ],
    });
  }
}

module.exports = Iran;