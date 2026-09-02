class SaudiArabia extends AbstractTeam {
  static formation = {
    'Al-Owais': [0, 3],
    'Sultan Al-Ghannam': [2, 0],
    'Al-Bulaihi': [2, 2],
    'Al-Tambakti': [2, 4],
    'Al-Shahrani': [2, 6],
    'Kanno': [4, 0],
    'Al-Juwayr': [4, 2],
    'Nasser Al-Dawsari': [4, 4],
    'Salem Al-Dawsari': [4, 6],
    'Al-Buraikan': [6, 2],
    'Saleh Al-Shehri': [6, 4],
  };

  constructor() {
    super({
      name: 'Saudi Arabia',
      level: 0,
  starPlayers: ['Salem Al-Dawsari', 'Kanno'],
      startingDeck: "counter",
      coach: 'Hervé Renard',
      primaryColor: '#0b7a3f',
      reserveColor: '#ffffff',
      shortsColor: '#0b7a3f',
      awayShortsColor: '#ffffff',
      startingXI: ['Al-Owais', 'Sultan Al-Ghannam', 'Al-Bulaihi', 'Al-Tambakti', 'Al-Shahrani', 'Kanno', 'Al-Juwayr', 'Nasser Al-Dawsari', 'Salem Al-Dawsari', 'Al-Buraikan', 'Saleh Al-Shehri'],
      squad: [
        ['Al-Owais', 35, 'GK', 'Saudi Arabia', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Al-Kassar', 35, 'GK', 'Saudi Arabia', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Sultan Al-Ghannam', 32, 'DF', 'Saudi Arabia', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Al-Bulaihi', 37, 'DF', 'Saudi Arabia', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Al-Tambakti', 27, 'DF', 'Saudi Arabia', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Al-Shahrani', 34, 'DF', 'Saudi Arabia', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Abdulhamid', 27, 'DF', 'Saudi Arabia', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Kanno', 32, 'MF', 'Saudi Arabia', 6, 7, 7, 6, 7, 6, 7, 6, 1],
        ['Al-Juwayr', 23, 'MF', 'Saudi Arabia', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Nasser Al-Dawsari', 28, 'MF', 'Saudi Arabia', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Salem Al-Dawsari', 35, 'MF', 'Saudi Arabia', 8, 4, 4, 8, 7, 8, 7, 4, 1],
        ['Al-Najei', 29, 'MF', 'Saudi Arabia', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Al-Ghamdi', 25, 'MF', 'Saudi Arabia', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Al-Buraikan', 26, 'FW', 'Saudi Arabia', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Saleh Al-Shehri', 33, 'FW', 'Saudi Arabia', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Khalid Al-Ghannam', 26, 'FW', 'Saudi Arabia', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Mohammed Maran', 25, 'FW', 'Saudi Arabia', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Abdullah Radif', 23, 'FW', 'Saudi Arabia', 5, 2, 1, 6, 5, 5, 4, 4, 1],
      ],
    });
  }
}
