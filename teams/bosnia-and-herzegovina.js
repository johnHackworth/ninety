class BosniaandHerzegovina extends AbstractTeam {
  static formation = {
    'Nikola Vasilj': [0, 3],
    'Nihad Mujakić': [2, 0],
    'Dennis Hadžikadunić': [2, 2],
    'Tarik Muharemović': [2, 4],
    'Sead Kolašinac': [2, 6],
    'Benjamin Tahirović': [4, 0],
    'Armin Gigović': [4, 2],
    'Ivan Bašić': [4, 4],
    'Ivan Šunjić': [4, 6],
    'Samed Baždar': [6, 2],
    'Ermedin Demirović': [6, 4],
  };

  constructor() {
    super({
      name: 'Bosnia and Herzegovina',
      level: 1,
      starPlayers: ['Edin Džeko', 'Esmir Bajraktarević', 'Ermedin Demirović'],
      startingDeck: "counter",
      extraActions: { 'header-finish': 1, 'knockdown-finish': 1, 'no-pain-no-gain': 1 },
      coach: 'Sergej Barbarez',
      artifacts: ["aerialKings"],
      primaryColor: '#002395',
      reserveColor: '#ffcc00',
      shortsColor: '#002395',
      awayShortsColor: '#ffffff',
      startingXI: ['Nikola Vasilj', 'Nihad Mujakić', 'Dennis Hadžikadunić', 'Tarik Muharemović', 'Sead Kolašinac', 'Benjamin Tahirović', 'Armin Gigović', 'Ivan Bašić', 'Ivan Šunjić', 'Samed Baždar', 'Ermedin Demirović'],
      squad: [
        ['Nikola Vasilj', 30, 'GK', 'Bosnia and Herzegovina', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Nihad Mujakić', 28, 'DF', 'Bosnia and Herzegovina', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Dennis Hadžikadunić', 27, 'DF', 'Bosnia and Herzegovina', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Tarik Muharemović', 23, 'DF', 'Bosnia and Herzegovina', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Sead Kolašinac', 32, 'DF', 'Bosnia and Herzegovina', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Benjamin Tahirović', 23, 'MF', 'Bosnia and Herzegovina', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Amar Dedić', 23, 'DF', 'Bosnia and Herzegovina', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Armin Gigović', 24, 'MF', 'Bosnia and Herzegovina', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Samed Baždar', 22, 'FW', 'Bosnia and Herzegovina', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Ermedin Demirović', 28, 'FW', 'Bosnia and Herzegovina', 8, 2, 7, 8, 9, 8, 10, 9, 1]
        ['Edin Džeko', 40, 'FW', 'Bosnia and Herzegovina', 8, 5, 6, 8, 10, 9, 7, 9, 1]
        ['Mladen Jurkas', 18, 'GK', 'Bosnia and Herzegovina', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Ivan Bašić', 24, 'MF', 'Bosnia and Herzegovina', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Ivan Šunjić', 29, 'MF', 'Bosnia and Herzegovina', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Amar Memić', 25, 'MF', 'Bosnia and Herzegovina', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Amir Hadžiahmetović', 29, 'MF', 'Bosnia and Herzegovina', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Dženis Burnić', 28, 'MF', 'Bosnia and Herzegovina', 5, 4, 6, 5, 5, 4, 6, 4, 1]
        ['Nikola Katić', 29, 'DF', 'Bosnia and Herzegovina', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Kerim Alajbegović', 18, 'FW', 'Bosnia and Herzegovina', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Esmir Bajraktarević', 21, 'FW', 'Bosnia and Herzegovina', 8, 2, 7, 8, 8, 9, 9, 10, 1]
        ['Stjepan Radeljić', 28, 'DF', 'Bosnia and Herzegovina', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Martin Zlomislić', 27, 'GK', 'Bosnia and Herzegovina', 2, 4, 4, 2, 4, 1, 4, 5, 6]
        ['Haris Tabaković', 31, 'FW', 'Bosnia and Herzegovina', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Arjan Malić', 20, 'DF', 'Bosnia and Herzegovina', 5, 6, 6, 3, 3, 2, 5, 6, 1]
        ['Jovo Lukić', 27, 'FW', 'Bosnia and Herzegovina', 5, 2, 2, 7, 4, 4, 4, 6, 1]
        ['Ermin Mahmić', 21, 'MF', 'Bosnia and Herzegovina', 5, 4, 6, 5, 5, 4, 6, 4, 1]
      ],
    });
  }
}
