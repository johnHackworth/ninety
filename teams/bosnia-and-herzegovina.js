class BosniaAndHerzegovina extends AbstractTeam {
  static formation = {
    'Nikola Vasilj': [0, 3],
    'Amar Dedić': [2, 0],
    'Nikola Katić': [2, 2],
    'Anel Ahmedhodžić': [2, 4],
    'Sead Kolašinac': [2, 6],
    'Miralem Pjanić': [4, 0],
    'Rade Krunić': [4, 2],
    'Amir Hadžiahmetović': [4, 4],
    'Ivan Bašić': [4, 6],
    'Edin Džeko': [6, 2],
    'Ermedin Demirović': [6, 4],
  };

  constructor() {
    super({
      name: 'Bosnia and Herzegovina',
      level: 0,
  starPlayers: ['Edin Džeko', 'Miralem Pjanić'],
      startingDeck: "counter",
      extraActions: { 'header-finish': 1, 'knockdown-finish': 1, 'no-pain-no-gain': 1 },
      coach: 'Sergej Barbarez',
      artifacts: [ 'aerialKings'],
      primaryColor: '#002e6d',
      reserveColor: '#ffffff',
      shortsColor: '#002e6d',
      awayShortsColor: '#ffffff',
      startingXI: ['Nikola Vasilj', 'Amar Dedić', 'Nikola Katić', 'Anel Ahmedhodžić', 'Sead Kolašinac', 'Miralem Pjanić', 'Rade Krunić', 'Amir Hadžiahmetović', 'Ivan Bašić', 'Edin Džeko', 'Ermedin Demirović'],
      squad: [
        ['Nikola Vasilj', 31, 'GK', 'Bosnia and Herzegovina', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Amar Dedić', 24, 'DF', 'Bosnia and Herzegovina', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Nikola Katić', 30, 'DF', 'Bosnia and Herzegovina', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Anel Ahmedhodžić', 27, 'DF', 'Bosnia and Herzegovina', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Sead Kolašinac', 33, 'DF', 'Bosnia and Herzegovina', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Miralem Pjanić', 36, 'MF', 'Bosnia and Herzegovina', 6, 5, 5, 8, 9, 8, 9, 4, 1],
        ['Rade Krunić', 33, 'MF', 'Bosnia and Herzegovina', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Amir Hadžiahmetović', 29, 'MF', 'Bosnia and Herzegovina', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Ivan Bašić', 24, 'MF', 'Bosnia and Herzegovina', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Edin Džeko', 39, 'FW', 'Bosnia and Herzegovina', 5, 3, 3, 8, 7, 6, 7, 9, 1],
        ['Ermedin Demirović', 28, 'FW', 'Bosnia and Herzegovina', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Ibrahim Šehić', 37, 'GK', 'Bosnia and Herzegovina', 1, 5, 1, 1, 5, 1, 4, 1, 6],
        ['Adrian Leon Barišić', 25, 'DF', 'Bosnia and Herzegovina', 5, 6, 5, 1, 5, 3, 5, 5, 1],
        ['Benjamin Tahirović', 23, 'MF', 'Bosnia and Herzegovina', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Ajdin Hrustić', 30, 'MF', 'Bosnia and Herzegovina', 4, 4, 4, 4, 6, 5, 5, 3, 1],
        ['Smail Prevljak', 31, 'FW', 'Bosnia and Herzegovina', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Haris Tabaković', 32, 'FW', 'Bosnia and Herzegovina', 5, 2, 1, 6, 5, 5, 4, 4, 1],
        ['Kenan Kodro', 33, 'FW', 'Bosnia and Herzegovina', 5, 2, 1, 6, 5, 5, 4, 4, 1],
      ],
    });
  }
}
