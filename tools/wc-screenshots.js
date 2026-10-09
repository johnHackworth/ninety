const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = '/Users/javi.alvarezlopez/non-work/ninety';
const SCREENSHOTS_DIR = path.join(ROOT, 'screenshots');
const PORT = 3000;
const CDP_PORT = 9222;
const BASE_URL = `http://localhost:${PORT}`;
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

let shotCounter = 0;
function nextShotName(label) {
  shotCounter++;
  return `${String(shotCounter).padStart(2, '0')}-${label.replace(/\s+/g, '-').toLowerCase()}.png`;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function waitForWS(url, maxRetries = 40) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const page = data.find((t) => t.type === 'page' && t.url.startsWith(BASE_URL));
      if (page && page.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(500);
  }
  throw new Error('CDP websocket not available (no page target found)');
}

class CDPClient {
  constructor(wsUrl) {
    this.ws = null;
    this.wsUrl = wsUrl;
    this.id = 0;
    this.pending = new Map();
  }
  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    return new Promise((resolve, reject) => {
      this.ws.onopen = () => resolve();
      this.ws.onerror = reject;
      this.ws.onmessage = (evt) => {
        try {
          const msg = JSON.parse(evt.data);
          if (msg.id && this.pending.has(msg.id)) {
            const { resolve, reject } = this.pending.get(msg.id);
            this.pending.delete(msg.id);
            if (msg.error) reject(new Error(JSON.stringify(msg.error)));
            else resolve(msg.result);
          }
        } catch (e) {}
      };
    });
  }
  async send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`CDP timeout: ${method}`));
        }
      }, 30000);
    });
  }
  async close() {
    if (this.ws) this.ws.close();
  }
}

async function run() {
  console.log('[1/7] Starting static server...');
  const server = spawn('node', ['tools/server.js'], { cwd: ROOT, stdio: 'ignore' });
  await sleep(1500);

  console.log('[2/7] Launching headless Chrome with CDP...');
  const userDataDir = `/tmp/ninety-chrome-${process.pid}`;
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${CDP_PORT}`,
    '--window-size=1440,900',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    `--user-data-dir=${userDataDir}`,
    '--disable-extensions',
    '--no-first-run',
    '--no-default-browser-check',
    BASE_URL
  ], { cwd: ROOT, stdio: 'ignore' });

  await sleep(3000);

  let cdp;
  try {
    console.log('[3/7] Connecting to CDP...');
    const wsUrl = await waitForWS(`http://localhost:${CDP_PORT}/json`);
    cdp = new CDPClient(wsUrl);
    await cdp.connect();
    console.log('    Connected');

    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Runtime.runIfWaitingForDebugger');
    await sleep(2000);

    async function evalInPage(expr, awaitPromise = true, returnByValue = false) {
      const res = await cdp.send('Runtime.evaluate', {
        expression: expr, awaitPromise, returnByValue, userGesture: true
      });
      if (res.exceptionDetails) {
        throw new Error(res.exceptionDetails.text || JSON.stringify(res.exceptionDetails));
      }
      return res.result;
    }

    async function evalJSON(expr) {
      const res = await cdp.send('Runtime.evaluate', {
        expression: expr, awaitPromise: true, returnByValue: true, userGesture: true
      });
      if (res.exceptionDetails) throw new Error(res.exceptionDetails.text);
      return res.result?.value;
    }

    async function shot(label) {
      const name = nextShotName(label);
      const filepath = path.join(SCREENSHOTS_DIR, name);
      const res = await cdp.send('Page.captureScreenshot', { format: 'png', fromSurface: true });
      fs.writeFileSync(filepath, Buffer.from(res.data, 'base64'));
      console.log(`    📸 ${name}`);
      return name;
    }

    async function waitFor(selector, timeout = 15000) {
      const start = Date.now();
      while (Date.now() - start < timeout) {
        const res = await evalInPage(`!!document.querySelector('${selector}')`, false);
        if (res.value) return;
        await sleep(100);
      }
      throw new Error(`Timeout waiting for ${selector}`);
    }

    async function click(selector) {
      await evalInPage(`(async () => {
        const el = document.querySelector('${selector}');
        if (!el) throw new Error('Not found: ${selector}');
        el.click();
      })()`, true);
      await sleep(300);
    }

    console.log('[4/7] Waiting for menu screen...');
    await waitFor('#menu-screen:not(.hidden)');
    await shot('main-menu');

    // Click World Cup 2026
    await click('#menu-world-cup');
    await sleep(800);

    // WC Setup
    await waitFor('#wc-setup-screen:not(.hidden)');
    await shot('wc-setup');

    // Claim Spain (ESP)
    await evalInPage(`
      (() => {
        const chips = document.querySelectorAll('.wc-setup-team-chip');
        for (const c of chips) if (c.dataset.code === 'ESP') { c.click(); return true; }
        return false;
      })()
    `, true);
    await sleep(400);

    await shot('wc-setup-claimed');

    // Start World Cup
    await click('#wc-setup-start');
    await sleep(1000);

    // WC Overview
    await waitFor('#world-cup-screen:not(.hidden)');
    await shot('wc-overview');

    // WC Tabs
    const tabs = ['overview', 'bracket', 'groups', 'schedule', 'top', 'myTeam', 'deck', 'stats'];
    for (const tab of tabs) {
      await evalInPage(`wcSetTab('${tab}')`, true);
      await sleep(700);
      await shot(`wc-tab-${tab}`);
    }

    // Drive pre-match phases
    console.log('[5/7] Driving pre-match phases...');
    let preMatchShots = {};
    for (let phase = 0; phase < 40; phase++) {
      const state = await evalJSON(`
        JSON.stringify((() => {
          const vis = (id) => {
            const el = document.getElementById(id);
            return el && !el.classList.contains('hidden');
          };
          if (vis('board')) return 'match';
          if (vis('team-sheet-screen')) return 'team-sheet';
          if (vis('staff-picks-screen')) return 'staff-picks';
          if (vis('training-phase-screen')) return 'training';
          if (vis('event-phase-screen')) return 'event';
          if (document.querySelector('.wc-ko-preview-modal')) return 'ko-preview';
          if (vis('world-cup-screen')) return 'overview';
          return 'unknown';
        })())
      `, false);

      const cur = JSON.parse(state);
      if (cur === 'team-sheet' || cur === 'match') break;

      if (cur === 'staff-picks') {
        if (!preMatchShots.staffPicks) { preMatchShots.staffPicks = true; await shot('staff-picks'); }
        await evalInPage(`
          (() => {
            const card = document.querySelector('#staff-picks-row .staff-picks-card[data-index="0"]') ||
                         document.querySelector('#staff-picks-row .staff-picks-card');
            if (card) { card.click(); return true; }
            return false;
          })()
        `, true);
        await sleep(300);
        await click('#staff-picks-hire-btn');
        await sleep(800);
        continue;
      }

      if (cur === 'training') {
        await shot('training-phase');
        await evalInPage(`
          (() => {
            const cards = document.querySelectorAll('.tr-card-col');
            if (cards.length > 0) { cards[0].click(); return true; }
            return false;
          })()
        `, true);
        await sleep(300);
        await evalInPage(`
          (() => {
            const btn = document.querySelector('#tr-confirm');
            if (btn && !btn.disabled) { btn.click(); return true; }
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            return false;
          })()
        `, true);
        await sleep(800);
        continue;
      }

      if (cur === 'event') {
        await shot('event-phase');
        await evalInPage(`
          (() => {
            const opts = document.querySelectorAll('.event-option');
            if (opts.length > 0) { opts[0].click(); return true; }
            return false;
          })()
        `, true);
        await sleep(800);
        continue;
      }

      if (cur === 'ko-preview') {
        await shot('ko-preview');
        await evalInPage(`document.querySelector('.wc-ko-preview-modal .shot-modal-close')?.click()`, true);
        await sleep(800);
        continue;
      }

      // overview or unknown — click #wc-continue if enabled
      const cont = await evalInPage(`
        (() => {
          const btn = document.getElementById('wc-continue');
          if (btn && !btn.disabled && btn.textContent.trim() !== '') { btn.click(); return true; }
          return false;
        })()
      `, true);
      if (!cont.value) {
        // Could be a result toast or transition; try wcContinue()
        await evalInPage(`(typeof wcContinue === 'function') ? wcContinue() : false`, true);
      }
      await sleep(800);
    }

    // Team sheet
    await waitFor('#team-sheet-screen:not(.hidden)');
    await shot('team-sheet');

    // Patch before kickoff: isHumanGame true + startMatch forces AI controllers
    console.log('    Patching for auto-play (before kickoff)...');
    await evalInPage(`
      (() => {
        isHumanGame = () => true;
        const origStartMatch = startMatch;
        startMatch = async function(homeName, awayName, homeController, awayController, presetTeams) {
          const aiCtrl = { type: 'ai', player: 'basic-coach' };
          return origStartMatch.call(this, homeName, awayName, aiCtrl, aiCtrl, presetTeams);
        };
        return 'patched';
      })()
    `, true);

    // Kick off
    await click('#ts-kickoff');
    await sleep(500);

    // Match board
    await waitFor('#board:not(.hidden)');
    await sleep(300);
    await shot('match-board');

    // KICK OFF notice (game-notice-overlay)
    await sleep(300);
    const kickoffVisible = await evalInPage(`
      document.querySelector('.game-notice-overlay')?.textContent?.includes('KICK OFF') ?? false
    `, false);
    if (kickoffVisible.value) {
      await shot('kickoff-notice');
    }

    // Suppress further humanNotice overlays
    await evalInPage(`
      (() => {
        humanNotice = (msg) => Promise.resolve();
        return true;
      })()
    `, true);

    // In-match loop
    console.log('[6/7] Running match turns...');
    let halftimeCaptured = false;
    let goalCaptured = false;
    let fulltimeCaptured = false;
    let shotsTaken = 0;
    let lastTurn = -1;
    let idleCount = 0;
    const msidleMax = 200; // ~2.5s of no progress at ~12ms/iter

    while (!fulltimeCaptured && shotsTaken < 6000) {
      shotsTaken++;

      // Check halftime modal
      const ht = await evalInPage(`!!document.querySelector('.halftime-modal')`, false);
      if (ht.value && !halftimeCaptured) {
        await sleep(500);
        await shot('halftime-modal');
        await evalInPage(`
          (() => {
            const btn = document.querySelector('.halftime-modal .shot-modal-close');
            if (btn) btn.click();
            else document.querySelector('.modal-overlay .shot-modal-close')?.click();
          })()
        `, true);
        await sleep(800);
        halftimeCaptured = true;
        continue;
      }

      // Check goal celebration overlay
      const goal = await evalInPage(`!!document.querySelector('.goal-celebration-overlay')`, false);
      if (goal.value && !goalCaptured) {
        await shot('goal-celebration');
        goalCaptured = true;
        continue;
      }

      // Check finished
      const fin = await evalJSON(`
        JSON.stringify((() => {
          if (typeof game === 'undefined' || !game) return null;
          return {
            turn: game.turn,
            finished: game.finished,
            halftimePending: game.halftimePending,
            currentTeam: game.currentTeam?.name,
          };
        })())
      `, false);

      if (fin && fin !== 'null') {
        const g = JSON.parse(fin);
        if (g.turn === lastTurn) {
          idleCount++;
          if (idleCount > msidleMax) {
            console.log(`    ⚠️ Stall detected at turn ${g.turn} — forcing continue`);
            await evalInPage(`
              (() => {
                noticeOverlayActive = false;
                if (typeof game !== 'undefined' && game.halftimePending) game.halftimePending = false;
                try { tickAi(); } catch(e) {}
              })()
            `, true);
            idleCount = 0;
          }
        } else {
          idleCount = 0;
          lastTurn = g.turn;
        }

        if (g.halftimePending) {
          // renderGame will build the halftime modal; give it a moment
          await sleep(300);
          continue;
        }

        if (g.finished) {
          await sleep(500);
          if (!fulltimeCaptured) {
            await shot('fulltime');
            fulltimeCaptured = true;
          }
          // Dismiss any modal to return to overview
          await evalInPage(`
            (() => {
              const overlay = document.querySelector('.modal-overlay');
              if (overlay) overlay.remove();
              document.querySelectorAll('.modal-overlay').forEach(m => m.remove());
            })()
          `, true);
          await sleep(1500);
          break;
        }
      }

      // Drive an AI turn (bare global from let binding)
      await evalInPage(`(typeof runAiTurn === 'function') ? runAiTurn() : true`, true);
      await sleep(12);
    }

    // Post-match WC overview
    await sleep(800);
    await shot('wc-overview-post-match');

    console.log('[7/7] Done. Screenshots captured:');
    const files = fs.readdirSync(SCREENSHOTS_DIR).filter(f => f.endsWith('.png')).sort();
    for (const f of files) {
      console.log(`    ${f}`);
    }
    console.log(`Total: ${files.length} screenshots in ${SCREENSHOTS_DIR}`);

  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err.stack);
    process.exitCode = 1;
  } finally {
    console.log('    Cleanup...');
    if (cdp) await cdp.close();
    chrome.kill();
    server.kill();
  }
}

run().catch(e => { console.error(e); process.exit(1); });