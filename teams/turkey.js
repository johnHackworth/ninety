class Turkey extends AbstractTeam {
  static formation = {
    GK: [[0, 3]],
    DF: [[2, 0], [2, 2], [2, 4], [2, 6]],
    MF: [[4, 2], [4, 4]],
    FW: [[5, 3], [5, 0], [6, 3], [5, 6]],
  };

  constructor() {
    super({
      name: 'Turkey',
      level: 1,
      starPlayers: ['Hakan Çalhanoğlu', 'Arda Güler', 'Kenan Yıldız'],
      startingDeck: "attacking",
      extraActions: { 'do-or-die': 1 },
      coach: 'Vincenzo Montella',
      artifacts: ["tikiTakaBoots"],
      primaryColor: '#e30a17',
      reserveColor: '#ffffff',
      shortsColor: '#e30a17',
      awayShortsColor: '#ffffff',
      startingXI: ['Altay Bayındır', 'Zeki Çelik', 'Merih Demiral', 'Abdülkerim Bardakcı', 'Ferdi Kadıoğlu', 'Hakan Çalhanoğlu', 'Orkun Kökçü', 'Arda Güler', 'Kenan Yıldız', 'Barış Alper Yılmaz', 'Kerem Aktürkoğlu'],
      squad: [
        ['Mert Günok', 37, 'GK', 'Turkey', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Zeki Çelik', 29, 'DF', 'Turkey', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Merih Demiral', 28, 'DF', 'Turkey', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Çağlar Söyüncü', 30, 'DF', 'Turkey', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Salih Özcan', 28, 'MF', 'Turkey', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Orkun Kökçü', 25, 'MF', 'Turkey', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['Kerem Aktürkoğlu', 27, 'FW', 'Turkey', 8, 4, 8, 8, 10, 9, 9, 8, 1],
        ['Arda Güler', 21, 'FW', 'Turkey', 7, 5, 5, 8, 8, 9, 8, 4, 1],
        ['Deniz Gül', 21, 'FW', 'Turkey', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Hakan Çalhanoğlu', 32, 'MF', 'Turkey', 6, 6, 6, 8, 9, 7, 8, 5, 1],
        ['Kenan Yıldız', 21, 'FW', 'Turkey', 8, 5, 5, 8, 8, 9, 8, 5, 1],
        ['Altay Bayındır', 28, 'GK', 'Turkey', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Eren Elmalı', 25, 'DF', 'Turkey', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Abdülkerim Bardakcı', 31, 'DF', 'Turkey', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Ozan Kabak', 26, 'DF', 'Turkey', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['İsmail Yüksek', 27, 'MF', 'Turkey', 5, 4, 6, 5, 5, 4, 6, 4, 1],
        ['İrfan Can Kahveci', 30, 'FW', 'Turkey', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Mert Müldür', 27, 'DF', 'Turkey', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Yunus Akgün', 25, 'FW', 'Turkey', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Ferdi Kadıoğlu', 26, 'DF', 'Turkey', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Barış Alper Yılmaz', 26, 'FW', 'Turkey', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Kaan Ayhan', 31, 'MF', 'Turkey', 10, 8, 9, 8, 8, 9, 8, 5, 2],
        ['Uğurcan Çakır', 30, 'GK', 'Turkey', 2, 4, 4, 2, 4, 1, 4, 5, 6],
        ['Oğuz Aydın', 25, 'FW', 'Turkey', 5, 2, 2, 7, 4, 4, 4, 6, 1],
        ['Samet Akaydin', 32, 'DF', 'Turkey', 5, 6, 6, 3, 3, 2, 5, 6, 1],
        ['Can Uzun', 20, 'FW', 'Turkey', 5, 2, 2, 7, 4, 4, 4, 6, 1],
      ],
    });
  }
}
