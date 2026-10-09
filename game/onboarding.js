/* game/onboarding.js — first-run tutorial coach.
 *
 * Fires the twelve lesson sheets from the tutorial spec as in-game overlays:
 *   steps 1-7   at the first human match kick-off — friendly or World Cup
 *               (pre-match briefing; fires once via the store)
 *   step  8     on the first World Cup setup screen
 *   step  9     on the first entry into the World Cup hub
 *   step 10     when matchday 1 of the group stage completes
 *   step 11     on the first Continue click (coach/training/event loop)
 *   step 12     once the knockout bracket has been announced
 *
 * Steps are persisted under their own localStorage key so they fire only once
 * ever. The overlay is a full-screen modal (Esc or the primary button closes),
 * so no game-internal input guards are required: match steps run before the
 * board renders, and WC steps sit over static hub/setup screens.
 */
(function () {
  'use strict';

  var STORE_KEY = 'slay-the-umpire-onboarding';

  var MATCH_STEP_IDS = [
    'match.pitch',
    'match.turns',
    'match.cards',
    'match.move',
    'match.mark',
    'match.effects',
    'match.shoot',
  ];

  var WC_STEP_IDS = ['wc.setup', 'wc.hub', 'wc.groups', 'wc.loop', 'wc.knockout'];

  var store = loadStore();
  var pendingBasics = null; // armed before a human kicks off (friendly via app.js, World Cup via wcContinueStep)
  var timers = {}; // scheduled step timers, to avoid double-firing on re-renders
  var openStep = null; // { id, resolve } for the currently open sheet

  // ---------------------------------------------------------------- store ---
  function loadStore() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : { steps: {} };
    } catch (e) {
      return { steps: {} };
    }
  }

  function persist() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch (e) {
      /* storage unavailable — tutorial simply replays */
    }
  }

  function done(id) {
    return !!store.steps[id];
  }

  function mark(id) {
    store.steps[id] = true;
    persist();
  }

  function markAll(ids) {
    for (var i = 0; i < ids.length; i++) store.steps[ids[i]] = true;
    persist();
  }

  // ------------------------------------------------------------- helpers ----
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function humanTeamName(teams) {
    var names = teams ? Object.keys(teams) : [];
    for (var i = 0; i < names.length; i++) {
      var ctrl = teams[names[i]] && teams[names[i]].controller;
      if (ctrl && ctrl.type === 'human') return names[i];
    }
    return null;
  }

  function cardInstance(name) {
    if (typeof resolveCard === 'function') {
      try {
        var inst = resolveCard(name);
        if (inst) return inst;
      } catch (e) {
        /* fall through to CARD_TYPES scan */
      }
    }
    if (typeof CARD_TYPES !== 'undefined') {
      for (var i = 0; i < CARD_TYPES.length; i++) {
        var C = CARD_TYPES[i];
        if (typeof C !== 'function') continue;
        try {
          var it = new C();
          if (it.name && it.name.toLowerCase() === name.toLowerCase()) return it;
        } catch (e) {
          /* skip ctors that throw standalone */
        }
      }
    }
    return null;
  }

  function cardEl(name) {
    var inst = cardInstance(name);
    if (!inst || typeof createActionCard !== 'function') return null;
    var wrap = el('div', 'ob-shrink');
    try {
      wrap.appendChild(createActionCard(inst));
    } catch (e) {
      return null;
    }
    return wrap;
  }

  var GK_CTORS = function () {
    var table = {};
    function tryAdd(name) {
      var v;
      try {
        v = eval(name); // eslint-disable-line no-eval
      } catch (e) {
        return;
      }
      if (typeof v === 'function') {
        table[name] = v;
      }
    }
    ['WellPositionedAction', 'AmazingReflexesAction', 'MispositionedAction', 'HowlerAction'].forEach(tryAdd);
    return table;
  }();

  function gkCardEl(ctorName) {
    var Ctor = GK_CTORS[ctorName];
    var inst = null;
    try {
      if (Ctor) inst = new Ctor();
    } catch (e) {
      /* ignore */
    }
    if (!inst || typeof createActionCard !== 'function') return null;
    var wrap = el('div', 'ob-shrink');
    try {
      wrap.appendChild(createActionCard(inst));
    } catch (e) {
      return null;
    }
    return wrap;
  }

  function cardsRow(items) {
    var row = el('div', 'ob-cards');
    for (var i = 0; i < items.length; i++) {
      var node = typeof items[i] === 'object' ? gkCardEl(items[i].ctor) : cardEl(items[i]);
      if (node) row.appendChild(node);
    }
    return row;
  }

  function chipsRow(chips) {
    var row = el('div', 'ob-chips');
    for (var i = 0; i < chips.length; i++) {
      var c = chips[i];
      var chip = el('div', 'ob-chip' + (c.tone ? ' ' + c.tone : ''));
      chip.appendChild(el('span', 'ob-cglyph', c.glyph));
      chip.appendChild(el('span', 'ob-cbody', '<b>' + c.label + '</b><small>' + c.detail + '</small>'));
      row.appendChild(chip);
    }
    return row;
  }

  function chainRow(steps, endTag) {
    var row = el('div', 'ob-chain');
    for (var i = 0; i < steps.length; i++) {
      var s = steps[i];
      var cell = el('div', 'ob-chainCell' + (s.gold ? ' gold' : ''));
      if (s.icon) cell.appendChild(el('span', 'ob-chainIcon', s.icon));
      cell.appendChild(el('span', 'ob-chainTag', s.label));
      if (s.sub) cell.appendChild(el('small', 'ob-chainSub', s.sub));
      row.appendChild(cell);
      if (i < steps.length - 1) row.appendChild(el('i', 'ob-chainArrow', '→'));
    }
    if (endTag) {
      row.appendChild(el('i', 'ob-chainArrow', '→'));
      row.appendChild(el('div', 'ob-chainCell end', endTag));
    }
    return row;
  }

  function progHtml(pipsTotal, onCount) {
    var p = '';
    for (var i = 0; i < pipsTotal; i++) p += '<span class="ob-pip' + (i < onCount ? ' on' : '') + '"></span>';
    return '<div class="ob-prog">' + p + '</div>';
  }

  // --------------------------------------------------------- pitch demo -----
  function pitchDemo(opts) {
    opts = opts || {};
    var p = el('div', 'ob-pitch');
    p.appendChild(el('i', 'ob-line ob-mid'));
    p.appendChild(el('i', 'ob-box ob-boxL'));
    p.appendChild(el('i', 'ob-box ob-boxR'));
    p.appendChild(el('i', 'ob-goal ob-goalL'));
    p.appendChild(el('i', 'ob-goal ob-goalR'));
    if (opts.zone) {
      p.appendChild(el('i', 'ob-zone'));
      p.appendChild(el('b', 'ob-zoneTag', 'Shoot zone'));
    }
    var dots = [
      ['ob-t h', '20%', '28%'],
      ['ob-t h', '20%', '72%'],
      ['ob-t h hl', '8%', '50%'],
      ['ob-t a', '76%', '28%'],
      ['ob-t a', '76%', '72%'],
      ['ob-t a', '58%', '50%'],
    ];
    for (var i = 0; i < dots.length; i++) {
      var d = el('s', dots[i][0]);
      d.style.left = dots[i][1];
      d.style.top = dots[i][2];
      p.appendChild(d);
    }
    var ball = el('s', 'ob-ball');
    ball.style.left = '8%';
    ball.style.top = '50%';
    p.appendChild(ball);
    return p;
  }

  function turnsPill() {
    var w = el('div', 'ob-pill');
    for (var i = 1; i <= 20; i++) {
      if (i === 11) w.appendChild(el('i', 'ob-ht', 'HALF TIME'));
      w.appendChild(el('s', 'ob-cell' + (i > 10 ? ' second' : ''), String(i)));
    }
    return w;
  }

  function setupDemo() {
    var w = el('div', 'ob-setup');
    var counter = el('div', 'ob-setupCounter');
    counter.appendChild(el('b', null, '02'));
    counter.appendChild(el('span', null, '/48'));
    counter.appendChild(el('em', null, 'claimed'));
    w.appendChild(counter);

    var rows = el('div', 'ob-setupRows');
    [['BR', 'Brazil', 'you', 'ob-gA'], ['FR', 'France', 'you', 'ob-gB'], ['AR', 'Argentina', 'AI', 'ob-gC']].forEach(
      function (r) {
        var row = el('div', 'ob-setupRow');
        row.appendChild(el('i', 'ob-gob ' + r[3], r[0]));
        row.appendChild(el('b', null, r[1]));
        row.appendChild(el('em', null, r[2]));
        rows.appendChild(row);
      }
    );
    w.appendChild(rows);

    var toggle = el('div', 'ob-setupToggle');
    toggle.appendChild(el('i', 'ob-knob'));
    toggle.appendChild(el('span', null, 'Randomize groups'));
    toggle.appendChild(el('small', null, 'the real 2026 draw is used'));
    w.appendChild(toggle);

    w.appendChild(el('div', 'ob-setupStart', 'Start World Cup'));
    return w;
  }

  function hubDemo() {
    var w = el('div', 'ob-hub');
    var tabs = el('div', 'ob-tabs');
    ['Overview', 'Bracket', 'All groups', 'Schedule', 'Top players', 'My squad', 'Deck', 'Team stats'].forEach(function (t) {
      var tab = el('span', 'ob-tab', t);
      if (t === 'Overview') tab.classList.add('on');
      tabs.appendChild(tab);
    });
    w.appendChild(tabs);
    var bar = el('div', 'ob-continue');
    bar.appendChild(el('b', null, 'Continue'));
    bar.appendChild(el('span', null, 'Staff Picks · Spain'));
    w.appendChild(bar);
    return w;
  }

  function groupsDemo() {
    var w = el('div', 'ob-standings');
    var rows = [
      ['Mexico', 6, 2, 0, 0, 7, 3, 4, 'top', '1st'],
      ['South Korea', 4, 1, 1, 0, 4, 2, 2, 'top', '2nd'],
      ['Ivory Coast', 3, 1, 0, 1, 5, 6, -1, 'third', '3rd'],
      ['Uzbekistan', 0, 0, 0, 2, 1, 6, -5, '', ''],
    ];
    w.appendChild(
      el(
        'div',
        'ob-sHead',
        '<span>Team</span><span>P</span><span>W</span><span>D</span><span>L</span><span>GF</span><span>GA</span><span>GD</span><span>Pts</span>'
      )
    );
    rows.forEach(function (r) {
      var row = el('div', 'ob-sRow' + (r[8] ? ' ' + r[8] : ''));
      for (var i = 0; i < 8; i++) row.appendChild(el('span', i === 0 ? 'ob-sTeam' : '', i === 0 ? r[0] : String(r[i + 1])));
      var pts = el('span', 'ob-sPts', String(r[7] + 1));
      row.appendChild(pts);
      if (r[8]) row.appendChild(el('i', 'ob-sBadge ' + r[8], r[9]));
      w.appendChild(row);
    });
    w.appendChild(el('div', 'ob-sNote', 'Top 2 join the knockout · the best 8 thirds come with them'));
    return w;
  }

  // ------------------------------------------------------------- demos -----
  function demoNodeFor(cfg) {
    switch (cfg.id) {
      case 'match.pitch':
        return pitchDemo({ zone: true });
      case 'match.turns':
        return turnsPill();
      case 'match.cards': {
        var names = [];
        var hand = null;
        if (typeof game !== 'undefined' && game && cfg.humanTeam) {
          hand = game.inPlay[cfg.humanTeam] || null;
        }
        if (hand && hand.length) {
          for (var i = 0; i < Math.min(5, hand.length); i++) {
            if (hand[i] && hand[i].name) names.push(hand[i].name);
          }
        }
        if (!names.length) names = ['Move', 'Sprint', 'Pass', 'Shoot', 'Tackle'];
        return cardsRow(names);
      }
      case 'match.move':
        return cardsRow(['Move', 'Sprint', 'Pass']);
      case 'match.mark':
        return cardsRow(['Marking', 'Press', 'Tackle']);
      case 'match.effects': {
        var fx = (typeof PLAYER_EFFECTS !== 'undefined' && PLAYER_EFFECTS) || {};
        return chipsRow([
          { glyph: fx.yellow ? fx.yellow.char : 'Y', label: 'Yellow card', detail: '−2 tackling &amp; marking · whole match', tone: 'amber' },
          { glyph: fx.cramped ? fx.cramped.char : 'C', label: 'Cramped', detail: 'cannot move or dribble · 1 turn', tone: 'amber' },
          { glyph: fx.inspired ? fx.inspired.char : 'I', label: 'Inspired', detail: '+2 all stats · 1 turn', tone: 'sage' },
          { glyph: fx.exhausted ? fx.exhausted.char : 'X', label: 'Exhausted', detail: '−2 all stats · 2 turns', tone: 'blue' },
        ]);
      }
      case 'match.shoot': {
        var w = el('div', 'ob-shoot');
        w.appendChild(pitchDemo({ zone: true }));
        w.appendChild(cardsRow(['Shoot', { ctor: 'WellPositionedAction' }]));
        return w;
      }
      case 'wc.setup':
        return setupDemo();
      case 'wc.hub':
        return hubDemo();
      case 'wc.groups':
        return groupsDemo();
      case 'wc.loop':
        return chainRow(
          [
            { label: 'Staff picks', sub: 'hire 1 of 5 coaches', icon: 'S' },
            { label: 'Training', sub: 'add 1 card', icon: 'T' },
            { label: 'Event', sub: 'weigh a trade-off', icon: 'E' },
            { label: 'Match', sub: 'into the hub', icon: 'M' },
          ],
          'Hub'
        );
      case 'wc.knockout':
        return chainRow(
          [
            { label: 'R32', sub: 'do-or-die' },
            { label: 'R16' },
            { label: 'QF' },
            { label: 'SF' },
            { label: 'Final', gold: true, icon: '🏆' },
          ],
          ''
        );
      default:
        return el('div');
    }
  }

  // ------------------------------------------------------------------ FTS ---
  function openSheet(opts) {
    return new Promise(function (resolve) {
      var pipsTotal = opts.phase === 'match' ? 7 : 5;

      var ov = el('div', 'ob-overlay');
      ov.setAttribute('role', 'dialog');
      ov.setAttribute('aria-modal', 'true');
      ov.setAttribute('aria-label', opts.title);

      var sheet = el('div', 'ob-sheet');
      var top = el('div', 'ob-top', progHtml(pipsTotal, opts.idx + 1));
      var topRight = el('div', 'ob-topRight');
      topRight.appendChild(el('span', 'ob-esc', 'Esc · next'));
      var skip = el('button', 'ob-skip', 'Skip tutorial');
      skip.type = 'button';
      skip.addEventListener('click', function () {
        finish('skip');
      });
      topRight.appendChild(skip);
      top.appendChild(topRight);
      sheet.appendChild(top);

      sheet.appendChild(el('span', 'ob-kicker', opts.kicker));
      sheet.appendChild(el('h1', 'ob-title', opts.title));
      sheet.appendChild(el('p', 'ob-sub', opts.sub));

      var demo = el('div', 'ob-demo dark');
      var node = opts.demo();
      if (node) demo.appendChild(node);
      sheet.appendChild(demo);

      var facts = el('div', 'ob-facts');
      opts.facts.forEach(function (f) {
        facts.appendChild(el('span', 'ob-fact', f));
      });
      sheet.appendChild(facts);

      var actions = el('div', 'ob-actions');
      if (opts.back) {
        var back = el('button', 'ob-back', 'Back');
        back.type = 'button';
        back.addEventListener('click', function () {
          finish('back');
        });
        actions.appendChild(back);
      }
      var next = el('button', 'ob-next ' + (opts.ctaMode || 'primary'), opts.cta);
      next.type = 'button';
      next.addEventListener('click', function () {
        finish('next');
      });
      actions.appendChild(next);
      sheet.appendChild(actions);

      ov.appendChild(sheet);
      document.body.appendChild(ov);

      var settled = false;
      function finish(act) {
        if (settled) return;
        settled = true;
        ov.remove();
        document.removeEventListener('keydown', keyHandler);
        if (openStep && openStep.id === opts.id) {
          openStep = null;
        }
        resolve(act);
      }
      function keyHandler(e) {
        if (e.key === 'Escape') {
          e.stopPropagation();
          e.preventDefault();
          finish('next');
        }
      }
      document.addEventListener('keydown', keyHandler);

      setTimeout(function () {
        next.focus({ preventScroll: true });
      }, 0);
    });
  }

  // ------------------------------------------------------------- match ------
  function matchSheets() {
    var human = humanTeamName(TEAMS);
    return [
      {
        id: 'match.pitch',
        phase: 'match',
        idx: 0,
        kicker: 'Before kick-off',
        title: 'The pitch is 63 squares.',
        sub: 'Each match plays out on a 9 × 7 grid of 63 cells. Your team attacks one goal and defends the other — keepers, defenders, midfielders and forwards, lined up like a real side.',
        facts: ['9 × 7 — 63 cells', '11 players a side', 'Shoot zone = the last 3 columns'],
        cta: 'Got it',
        demo: function () {
          return demoNodeFor({ id: 'match.pitch' });
        },
      },
      {
        id: 'match.turns',
        phase: 'match',
        idx: 1,
        kicker: 'Before kick-off',
        title: 'Every minute, both sides act.',
        sub: 'A match runs 20 turns — two halves of ten. In each turn you act first, then the opponent. You get 3 action points and a fresh hand of cards every turn; when they’re spent, end your turn.',
        facts: ['20 turns = 2 × 10', '3 action points per turn', 'Fresh 6-card hand per turn'],
        cta: 'Got it',
        back: true,
        demo: function () {
          return demoNodeFor({ id: 'match.turns' });
        },
      },
      {
        id: 'match.cards',
        phase: 'match',
        idx: 2,
        kicker: 'Before kick-off',
        title: 'The cards call the play.',
        sub: 'Every action is a card you play on a player — the number is the cost in action points, the colour is the category. Blue moves you, red attacks, green defends.',
        facts: ['Cost = action points', 'Colour = category', 'Hand redraws each turn'],
        cta: 'Got it',
        back: true,
        demo: function () {
          return demoNodeFor({ id: 'match.cards', humanTeam: human });
        },
      },
      {
        id: 'match.move',
        phase: 'match',
        idx: 3,
        kicker: 'Before kick-off',
        title: 'Click a card, then a cell.',
        sub: 'Pick a card from your hand, then click one of the highlighted cells to play it. The ball follows the player in possession — that’s the whole loop.',
        facts: ['Ball follows the holder', 'Marked = no forward runs', 'Pass does ±2 columns'],
        cta: 'Got it',
        back: true,
        demo: function () {
          return demoNodeFor({ id: 'match.move' });
        },
      },
      {
        id: 'match.mark',
        phase: 'match',
        idx: 4,
        kicker: 'Before kick-off',
        title: 'Defend by shadowing.',
        sub: 'Mark the carrier to shadow them and cut the pass lanes. Press closes anyone down, anywhere on the pitch. Tackle wins the ball back — and their attack dies with it.',
        facts: ['Marking = 0 AP · shadows', 'Press = 2 AP · anywhere', 'Tackle = 1 AP · win it back'],
        cta: 'Got it',
        back: true,
        demo: function () {
          return demoNodeFor({ id: 'match.mark' });
        },
      },
      {
        id: 'match.effects',
        phase: 'match',
        idx: 5,
        kicker: 'Before kick-off',
        title: 'Every action has effects.',
        sub: 'Reckless challenges draw fouls and yellows. Cramps, fatigue, weather and inspirations ride on your players as status chips — some last one turn, some the whole match. Good managers plan around them.',
        facts: ['Yellow = −2 tackling &amp; marking', 'Second yellow = red', 'Effects run turns or the whole match'],
        cta: 'Got it',
        back: true,
        demo: function () {
          return demoNodeFor({ id: 'match.effects' });
        },
      },
      {
        id: 'match.shoot',
        phase: 'match',
        idx: 6,
        kicker: 'Before kick-off',
        title: 'Shoot from the final third.',
        sub: 'From the last three columns you can fire at goal — and your keeper answers with a goalkeeping card of their own. A great card can beat a great shot; a howler rarely helps.',
        facts: ['Shoot = 0 AP', 'Zone = the last 3 columns', 'Play a GK card with your keeper', 'Off-line keeper = −5'],
        cta: 'Start the match',
        ctaMode: 'sage',
        back: true,
        demo: function () {
          return demoNodeFor({ id: 'match.shoot' });
        },
      },
    ];
  }

  async function matchBasics() {
    if (!pendingBasics || pendingBasics.human !== true) return;
    pendingBasics = null;
    if (done('match.shoot')) return;

    var sheets = matchSheets();
    var i = 0;
    while (i >= 0 && i < sheets.length) {
      var act = await openSheet(sheets[i]);
      if (act === 'next') {
        i++;
      } else if (act === 'back') {
        i = Math.max(0, i - 1);
      } else {
        break; // skip
      }
    }
    markAll(MATCH_STEP_IDS);
  }

  // ------------------------------------------------------- world cup --------
  function matchdayOneComplete(worldCup) {
    if (!worldCup || !worldCup.groups) return false;
    return worldCup.groups.every(function (g) {
      var m1 = (g.matches || []).filter(function (m) {
        return m.matchday === 1;
      });
      return m1.length > 0 && m1.every(function (m) {
        return m.played;
      });
    });
  }

  function wcSheet(id, idx) {
    switch (id) {
      case 'wc.setup':
        return {
          id: id,
          phase: 'wc',
          idx: idx,
          kicker: 'World Cup 2026 · setup',
          title: 'Claim a nation.',
          sub: 'Claim the teams you want to manage — everything unclaimed is run by the AI. Randomize groups only if you want a fresh draw; the real 2026 draw is used by default.',
          facts: ['48 teams · 12 groups', 'Claim 1+ teams', 'Unclaimed = run by AI'],
          cta: 'Continue',
          demo: function () {
            return demoNodeFor({ id: 'wc.setup' });
          },
        };
      case 'wc.hub':
        return {
          id: id,
          phase: 'wc',
          idx: idx,
          kicker: 'World Cup 2026 · the overview',
          title: 'The hub runs the campaign.',
          sub: 'Eight pages — overview, bracket, groups, schedule, top players, your squad, deck and stats. The Continue button drives everything forward.',
          facts: ['8 hub tabs', 'Traits: World beaters → underdogs', 'Continue = the loop forward'],
          cta: 'Continue',
          demo: function () {
            return demoNodeFor({ id: 'wc.hub' });
          },
        };
      case 'wc.groups':
        return {
          id: id,
          phase: 'wc',
          idx: idx,
          kicker: 'World Cup 2026 · group stage',
          title: 'Six matches. Two go through.',
          sub: 'Each group plays three matchdays of two matches. The top two qualify; the best eight third-placed teams join them.',
          facts: ['3 matchdays × 2 matches', 'Top 2 + best 8 thirds → 32', 'Standings: Pts → GD → GF'],
          cta: 'Continue',
          demo: function () {
            return demoNodeFor({ id: 'wc.groups' });
          },
        };
      case 'wc.loop':
        return {
          id: id,
          phase: 'wc',
          idx: idx,
          kicker: 'World Cup 2026 · the loop',
          title: 'Tune the squad between matches.',
          sub: 'Between matches the Continue button walks you through staff picks, training and events: hire one of five coaches, add a card to your deck, and weigh each event’s trade-off.',
          facts: ['Hire 1 of 5 coach candidates', 'Training adds 1 card', 'Events trade something for something'],
          cta: 'Continue',
          demo: function () {
            return demoNodeFor({ id: 'wc.loop' });
          },
        };
      case 'wc.knockout':
        return {
          id: id,
          phase: 'wc',
          idx: idx,
          kicker: 'World Cup 2026 · knockout preview',
          title: 'Win the knockout grind.',
          sub: 'From the Round of 32 it’s do-or-die. A draw goes to extra time — two halves of two turns — and then to penalties: five kicks, then sudden death.',
          facts: ['Extra time: 2 × 2 turns', 'Pens: 5, then sudden death', 'The trophy path: R32 → Final'],
          cta: 'Good luck',
          ctaMode: 'sage',
          demo: function () {
            return demoNodeFor({ id: 'wc.knockout' });
          },
        };
      default:
        return null;
    }
  }

  function schedulingSafe(id) {
    return !done(id) && !timers[id] && !openStep;
  }

  function scheduleStep(id, delay) {
    if (!schedulingSafe(id)) return;
    var recheck = function () {
      if (!schedulingSafe(id)) return;
      var cfg = wcSheet(id, WC_STEP_IDS.indexOf(id));
      if (!cfg) return;
      openStep = { id: id };
      openSheet(cfg).then(function (act) {
        openStep = null;
        mark(id);
      });
    };
    timers[id] = setTimeout(function () {
      timers[id] = null;
      recheck();
    }, delay || 350);
  }

  // ---------------------------------------------------------------- API ----
  window.Onboarding = {
    // join a match with a human controller; startMatch fires the batch.
    arm: function (homeCtrl, awayCtrl) {
      var anyHuman = (homeCtrl && homeCtrl.type === 'human') || (awayCtrl && awayCtrl.type === 'human');
      pendingBasics = { human: Boolean(anyHuman) };
    },
    armFriendly: function (homeCtrl, awayCtrl) {
      this.arm(homeCtrl, awayCtrl);
    },
    armWorldCup: function (homeCtrl, awayCtrl) {
      this.arm(homeCtrl, awayCtrl);
    },

    matchBasics: matchBasics,

    maybeWcSetup: function () {
      scheduleStep('wc.setup');
    },

    // called on every hub render; only fires when a step is actually due
    maybeWorldCup: function (worldCup) {
      if (typeof wcSimRunning === 'undefined' || typeof wcGroupToKnockoutPending === 'undefined') return;
      if (wcSimRunning) return;
      if (!done('wc.setup')) return;
      if (!done('wc.hub') && !timers['wc.hub']) {
        scheduleStep('wc.hub', 450);
        return;
      }
      if (!done('wc.groups') && matchdayOneComplete(worldCup) && !timers['wc.groups']) {
        scheduleStep('wc.groups', 450);
        return;
      }
      if (!done('wc.knockout') && wcGroupToKnockoutPending && !timers['wc.knockout']) {
        scheduleStep('wc.knockout', 500);
      }
    },

    // called from wcContinue before the next loop step; awaited so the sheet
    // appears over the hub before staff picks / training / event take over.
    maybeWcLoop: function () {
      if (!done('wc.loop') && done('wc.setup') && !openStep && !timers['wc.loop']) {
        var cfg = wcSheet('wc.loop', WC_STEP_IDS.indexOf('wc.loop'));
        openStep = { id: 'wc.loop' };
        return openSheet(cfg).then(function () {
          openStep = null;
          mark('wc.loop');
        });
      }
      return Promise.resolve();
    },

    isDone: function (id) {
      return done(id);
    },
  };
})();