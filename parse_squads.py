import json
import re
from bs4 import BeautifulSoup

# Read the HTML file
with open('/Users/javi.alvarezlopez/.local/share/opencode/tool-output/tool_09f4b97e9001gTrTOpMfli2udr', 'r') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

# Find all team sections - they have h3 headings with team names
team_headings = soup.find_all('h3')

teams_data = []

for h3 in team_headings:
    team_name = h3.get_text(strip=True)
    # Skip non-team headings
    if team_name in ['Statistics', 'Notes', 'References', 'External links', 'Age', 'Players', 'Outfield players', 'Goalkeepers', 'Captains', 'Coaches', 'Player representation by club', 'Player representation by league system', 'Player representation by club confederation', 'Average age of squads', 'Coach representation by country']:
        continue
    
    # Get the coach - the coach paragraph is a sibling of the h3's parent div
    coach = None
    parent_div = h3.find_parent('div', class_='mw-heading')
    if parent_div:
        next_elem = parent_div.find_next_sibling()
        while next_elem:
            if next_elem.name == 'p':
                text = next_elem.get_text(strip=True)
                if text.startswith('Coach:'):
                    # Find all links in the paragraph - the coach link is typically the last one
                    # (first one is often a flag icon link)
                    links = next_elem.find_all('a')
                    coach_link = None
                    for link in links:
                        # Skip flag icon links (they contain img)
                        if not link.find('img'):
                            coach_link = link
                            break
                    if not coach_link and links:
                        # Fallback: use the last link
                        coach_link = links[-1]
                    
                    if coach_link:
                        coach = coach_link.get_text(strip=True)
                    else:
                        coach = text.replace('Coach:', '').strip()
                    break
            next_elem = next_elem.find_next_sibling()
    
    # Find the squad table
    table = h3.find_next('table', class_='wikitable')
    if not table:
        table = h3.find_next('table')
    
    players = []
    if table:
        rows = table.find_all('tr', class_='nat-fs-player')
        for row in rows:
            cells = row.find_all(['td', 'th'])
            if len(cells) >= 7:
                number = cells[0].get_text(strip=True)
                # Position
                pos_cell = cells[1]
                pos_link = pos_cell.find('a')
                position = pos_link.get_text(strip=True) if pos_link else pos_cell.get_text(strip=True)
                
                # Player name
                name_cell = cells[2]
                name_link = name_cell.find('a')
                name = name_link.get_text(strip=True) if name_link else name_cell.get_text(strip=True)
                
                # Date of birth and age
                dob_cell = cells[3]
                dob_text = dob_cell.get_text(strip=True)
                
                # Caps
                caps = cells[4].get_text(strip=True)
                
                # Goals
                goals = cells[5].get_text(strip=True)
                
                # Club - the club cell has a flagicon span with a link, then the club link
                # We need the last link (the club link), not the first (flag icon)
                club_cell = cells[6]
                club_links = club_cell.find_all('a')
                club_link = None
                for link in club_links:
                    if not link.find('img'):
                        club_link = link
                        break
                if not club_link and club_links:
                    club_link = club_links[-1]
                club = club_link.get_text(strip=True) if club_link else club_cell.get_text(strip=True)
                
                players.append({
                    'number': number,
                    'position': position,
                    'name': name,
                    'date_of_birth_age': dob_text,
                    'caps': caps,
                    'goals': goals,
                    'club': club
                })
    
    teams_data.append({
        'team': team_name,
        'coach': coach,
        'players': players
    })

# Save to JSON
with open('/Users/javi.alvarezlopez/non-work/ninety/world_cup_2026_squads.json', 'w') as f:
    json.dump(teams_data, f, indent=2)

print(f"Extracted {len(teams_data)} teams")
for team in teams_data:
    print(f"  {team['team']}: {len(team['players'])} players, Coach: {team['coach']}")
    # Show first player's club to verify
    if team['players']:
        print(f"    First player club: {team['players'][0]['club']}")
