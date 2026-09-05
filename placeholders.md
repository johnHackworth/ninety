# Placeholders in the World Cup Overview / Event Phase screens

The 1280x800 mockups named players, coach events and deck cards that don't exist
in the game yet. All of the copy below is placeholder wording wired up in
`ui/world-cup-ui.js` and needs to be replaced/verified with real content.

## Unavailable players rail
- `Anchor → Stopgap Pivot · −1 power` — the deck consequence when a star player is
  out (injured/suspended). Intended to express that the star card is replaced by a
  weaker substitute card; names and the exact power penalty are placeholders.
- `Slot in from the bench.` — consequence line for non-star players.

## Opponent traits (match banner)
- `World beaters` — lvl 3 opponents
- `Tournament dark horse` — lvl 2 opponents
- `Underdogs` — lvl 1 opponents
  Wording is placeholder; reflects only `team.level`.

## Qualification consequences
Copy buckets in `wcQualificationProjection()` (e.g. "A win makes it certain. A loss
puts it on the last game."). These are mocked per pct band and should be tuned with
a designer once the real sim is calibrated (240-trial Monte Carlo incl. best-third
route, 8 of 12 thirds advance).

## Event phase screen
- `wcEventGainLose()` derives the "You gain / You lose" columns by classifying the
  option `label` text. Classification is heuristic; it should be replaced by explicit
  `gain`/`lose` fields on each event option once event content is authored.
- Footer chips: `N cards in deck`, `N coaches`, `N active temporary effect(s)`.

## Venues
`WC_VENUES` list in `ui/world-cup-ui.js` is decorative (assigned by string hash) and
doesn't reflect the real 2026 host cities schedule.

## Ticker / banner
- Ticker pills: `+N more →` shows totals; upset detection uses `wcTeamStrength`.
- Banner kicker "Matchday N of 3 · <venue>" is hardcoded to a 3-matchday group stage.