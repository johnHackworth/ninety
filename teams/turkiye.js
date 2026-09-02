class Turkiye extends AbstractTeam {
  static formation = {
    'Altay Bayındır': [0, 3],
    'Zeki Çelik': [2, 0],
    'Merih Demiral': [2, 2],
    'Abdülkerim Bardakcı': [2, 4],
    'Ferdi Kadıoğlu': [2, 6],
    'Hakan Çalhanoğlu': [4, 2],
    'Orkun Kökçü': [4, 4],
    'Kenan Yıldız': [5, 0],
    'Arda Güler': [5, 3],
    'Kerem Aktürkoğlu': [5, 6],
    'Barış Alper Yılmaz': [6, 3],
  };

  constructor() {
    super({
      name: 'Türkiye',
      level: 1,
  starPlayers: ['Hakan Çalhanoğlu', 'Arda Güler', 'Kenan Yıldız'],
      startingDeck: "attacking",
      extraActions: { 'do-or-die': 1 },
      coach: 'Vincenzo Montella',
      artifacts: [ 'tikiTakaBoots'],
      primaryColor: '#e30a17',
      reserveColor: '#ffffff',
      shortsColor: '#e30a17',
      awayShortsColor: '#ffffff',
      startingXI: ['Altay Bayındır', 'Zeki Çelik', 'Merih Demiral', 'Abdülkerim Bardakcı', 'Ferdi Kadıoğlu', 'Hakan Çalhanoğlu', 'Orkun Kökçü', 'Arda Güler', 'Kenan Yıldız', 'Barış Alper Yılmaz', 'Kerem Aktürkoğlu'],
      squad: [
        ['Altay Bayındır', 28, 'GK', 'Türkiye', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Zeki Çelik', 29, 'DF', 'Türkiye', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Merih Demiral', 28, 'DF', 'Türkiye', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Abdülkerim Bardakcı', 32, 'DF', 'Türkiye', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Ferdi Kadıoğlu', 27, 'DF', 'Türkiye', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['Hakan Çalhanoğlu', 32, 'MF', 'Türkiye', 6, 6, 6, 8, 9, 7, 8, 5, 1],
        ['Orkun Kökçü', 26, 'MF', 'Türkiye', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Arda Güler', 21, 'MF', 'Türkiye', 7, 5, 5, 8, 8, 9, 8, 4, 1],
        ['Kenan Yıldız', 21, 'MF', 'Türkiye', 8, 5, 5, 8, 8, 9, 8, 5, 1],
        ['Barış Alper Yılmaz', 26, 'FW', 'Türkiye', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Kerem Aktürkoğlu', 28, 'FW', 'Türkiye', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Uğurcan Çakır', 30, 'GK', 'Türkiye', 2, 6, 1, 1, 6, 2, 5, 2, 7],
        ['Kaan Ayhan', 32, 'DF', 'Türkiye', 6, 7, 6, 2, 6, 4, 6, 6, 1],
        ['İsmail Yüksek', 27, 'MF', 'Türkiye', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Salih Özcan', 28, 'MF', 'Türkiye', 5, 5, 5, 5, 7, 6, 6, 4, 1],
        ['Enes Ünal', 29, 'FW', 'Türkiye', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Yusuf Yazıcı', 29, 'FW', 'Türkiye', 6, 3, 2, 7, 6, 6, 5, 5, 1],
        ['Semih Kılıçsoy', 21, 'FW', 'Türkiye', 6, 3, 2, 7, 6, 6, 5, 5, 1],
      ],
    });
  }
}
