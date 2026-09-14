const TEAM_CLASSES = {
  Spain,
  Argentina,
  Brazil,
  Ecuador,
  Uruguay,
  Colombia,
  Paraguay,
  Japan,
  Iran,
  Uzbekistan,
  'South Korea': SouthKorea,
  Jordan,
  Australia,
  Qatar,
  'Saudi Arabia': SaudiArabia,
  Iraq,
  Morocco,
  Tunisia,
  Egypt,
  Algeria,
  Ghana,
  'Cape Verde': CapeVerde,
  'South Africa': SouthAfrica,
  'Ivory Coast': IvoryCoast,
  Senegal,
  'DR Congo': DRCongo,
  Canada,
  Mexico,
  'United States': UnitedStates,
  Panama,
  'Curaçao': Curaao,
  Haiti,
  'New Zealand': NewZealand,
  England,
  France,
  Croatia,
  Portugal,
  Norway,
  Germany,
  Netherlands,
  Belgium,
  Austria,
  Switzerland,
  Scotland,
  Sweden,
  Turkey,
  CzechRepublic,
  'Bosnia and Herzegovina': BosniaandHerzegovina,
};

const TEAM_FLAGS = {
  Spain: '🇪🇸',
  Argentina: '🇦🇷',
  Brazil: '🇧🇷',
  Ecuador: '🇪🇨',
  Uruguay: '🇺🇾',
  Colombia: '🇨🇴',
  Paraguay: '🇵🇾',
  Japan: '🇯🇵',
  Iran: '🇮🇷',
  Uzbekistan: '🇺🇿',
  'South Korea': '🇰🇷',
  Jordan: '🇯🇴',
  Australia: '🇦🇺',
  Qatar: '🇶🇦',
  'Saudi Arabia': '🇸🇦',
  Iraq: '🇮🇶',
  Morocco: '🇲🇦',
  Tunisia: '🇹🇳',
  Egypt: '🇪🇬',
  Algeria: '🇩🇿',
  Ghana: '🇬🇭',
  'Cape Verde': '🇨🇻',
  'South Africa': '🇿🇦',
  'Ivory Coast': '🇨🇮',
  Senegal: '🇸🇳',
  'DR Congo': '🇨🇩',
  Canada: '🇨🇦',
  Mexico: '🇲🇽',
  'United States': '🇺🇸',
  Panama: '🇵🇦',
  'Curaçao': '🇨🇼',
  Haiti: '🇭🇹',
  'New Zealand': '🇳🇿',
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  France: '🇫🇷',
  Croatia: '🇭🇷',
  Portugal: '🇵🇹',
  Norway: '🇳🇴',
  Germany: '🇩🇪',
  Netherlands: '🇳🇱',
  Belgium: '🇧🇪',
  Austria: '🇦🇹',
  Switzerland: '🇨🇭',
  Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  Sweden: '🇸🇪',
  Turkey: '🇹🇷',
  CzechRepublic: '🇨🇿',
  'Bosnia and Herzegovina': '🇧🇦',
};

const DEFAULT_MATCH = ['Spain', 'Argentina'];

function mirrorFormation(formation) {
  const mirrored = {};
  for (const [name, [x, y]] of Object.entries(formation)) {
    mirrored[name] = [8 - x, y];
  }
  return mirrored;
}

function buildTeams(teamNames = DEFAULT_MATCH) {
  const teams = {};
  teamNames.forEach((name, index) => {
    const TeamClass = TEAM_CLASSES[name];
    if (!TeamClass) throw new Error(`No team registered for '${name}'`);
    const team = new TeamClass();
    team.side = index % 2 === 0 ? 'left' : 'right';
    team.formation =
      team.side === 'left'
        ? { ...TeamClass.formation }
        : mirrorFormation(TeamClass.formation);
    teams[name] = team;
  });
  return teams;
}

const FORMATIONS = Object.fromEntries(
  Object.entries(buildTeams()).map(([name, team]) => [name, team.formation])
);