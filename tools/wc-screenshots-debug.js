#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = '/Users/javi.alvarezlopez/non-work/ninety';
const SCREENSHOTS_DIR = path.join(ROOT, 'screenshots');
const PORT = 3000;
const CDP_PORT = 9223;
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
  throw new Error('CDP websocket not available');
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
        const msg = JSON.parse(evt.data);
        if (msg.id && this.pending.has(msg.id)) {
          const { resolve, reject } = this.pending.get(msg.id);
          this.pending.delete(msg.id);
          if (msg.error) reject(new Error(JSON.stringify(msg.error)));
          else resolve(msg.result);
        }
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
  const server = spawn('node', ['tools/server.js'], { cwd: ROOT, stdio: 'ignore' });
  await sleep(1500);

  const userDataDir = `/tmp/ninety-chrome-debug-${process.pid}`;
  const chrome = spawn(CHROME_PATH, [
    '--headless=new', `--remote-debugging-port=${CDP_PORT}`,
    '--window-size=1440,900', '--disable-gpu', '--no-sandbox',
    '--disable-dev-shm-usage', `--user-data-dir=${userDataDir}`,
    '--disable-extensions', '--no-first-run', '--no-default-browser-check',
    BASE_URL
  ], { cwd: ROOT, stdio: 'ignore' });

  await sleep(3000);

  let cdp;
  try {
    const wsUrl = await waitForWS(`http://localhost:${CDP_PORT}/json`);
    cdp = new CDPClient(wsUrl);
    await cdp.connect();
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Runtime.runIfWaitingForDebugger');
    await sleep(2000);

    async function evalInPage(expr, awaitPromise = true, returnByValue = false) {
      const res = await cdp.send('Runtime.evaluate', {
        expression: expr, awaitPromise, returnByValue, userGesture: true
      });
      if (res.exceptionDetails) {
        console.error('  [eval error]', res.exceptionDetails.text || JSON.stringify(res.exceptionDetails));
        return { value: undefined };
      }
      return returnByValue ? res.result : res.result;
    }

    async function shot(label) {
      const name = nextShotName(label);
      const filepath = path.join(SCREENSHOTS_DIR, name);
      const res = await cdp.send('Page.captureScreenshot', { format: 'png', fromSurface: true });
      fs.writeFileSync(filepath, Buffer.from(res.data, 'base64'));
      console.log(`  📸 ${name}`);
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
      await evalInPage(`document.querySelector('${selector}')?.click(); true`, true);
      await sleep(300);
    }

    // 1. Menu
    await waitFor('#menu-screen:not(.hidden)');
    await shot('main-menu');

    // 2. WC Setup
    await click('#menu-world-cup');
    await sleep(800);
    await waitFor('#wc-setup-screen:not(.hidden)');
    await shot('wc-setup');

    // 3. Claim ESP
    await evalInPage(`(() => {
      const chips = document.querySelectorAll('.wc-setup-team-chip');
      for (const c of chips) if (c.dataset.code === 'ESP') { c.click(); return true; }
      return false;
    })()`, true);
    await sleep(400);
    await shot('wc-setup-claimed');

    // 4. Start WC
    await click('#wc-setup-start');
    await sleep(1000);
    await waitFor('#world-cup-screen:not(.hidden)');
    await shot('wc-overview');

    // 5. Tabs
    const tabs = ['overview', 'bracket', 'groups', 'schedule', 'top', 'myTeam', 'deck', 'stats'];
    for (const tab of tabs) {
      await evalInPage(`wcSetTab('${tab}')`, true);
      await sleep(700);
      await shot(`wc-tab-${tab}`);
    }

    // 6. Pre-match phases — click #wc-continue until team-sheet appears
    console.log('  Driving pre-match phases...');
    for (let i = 0; i < 30; i++) {
      const phase = await evalInPage(`(() => {
        const ts = document.getElementById('team-sheet-screen');
        if (ts && !ts.classList.contains('hidden')) return 'team-sheet';
        const sp = document.getElementById('staff-picks-screen');
        if (sp && !sp.classList.contains('hidden')) return 'staff-picks';
        const tr = document.getElementById('training-phase-screen');
        if (tr && !tr.classList.contains('hidden')) return 'training';
        const ev = document.getElementById('event-phase-screen');
        if (ev && !ev.classList.contains('hidden')) return 'event';
        const ko = document.querySelector('.wc-ko-preview-modal');
        if (ko) return 'ko-preview';
        return 'overview';
      })()`, false);

      console.log(`    phase: ${phase.value}`);

      if (phase.value === 'team-sheet') break;

      if (phase.value === 'staff-picks') {
        await shot('staff-picks');
        await evalInPage(`(() => {
          const card = document.querySelector('#staff-picks-row .staff-picks-card[data-index="0"]') ||
                       document.querySelector('#staff-picks-row .staff-picks-card');
          if (card) { card.click(); return true; }
          return false;
        })()`, true);
        await sleep(300);
        await click('#staff-picks-hire-btn');
        await sleep(500);
        continue;
      }

      if (phase.value === 'training') {
        await shot('training-phase');
        await evalInPage(`(() => {
          const cards = document.querySelectorAll('.tr-card-col');
          if (cards.length > 0) cards[0].click();
        })()`, true);
        await sleep(300);
        await evalInPage(`(() => {
          const btn = document.querySelector('#tr-confirm');
          if (btn && !btn.disabled) btn.click();
          else document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        })()`, true);
        await sleep(500);
        continue;
      }

      if (phase.value === 'event') {
        await shot('event-phase');
        await evalInPage(`(() => {
          const opts = document.querySelectorAll('.event-option');
          if (opts.length > 0) opts[0].click();
        })()`, true);
        await sleep(500);
        continue;
      }

      if (phase.value === 'ko-preview') {
        await shot('ko-preview');
        await evalInPage(`document.querySelector('.wc-ko-preview-modal .shot-modal-close')?.click()`, true);
        await sleep(500);
        continue;
      }

      // overview — click continue
      await evalInPage(`document.querySelector('#wc-continue')?.click()`, true);
      await sleep(500);
    }

    // 7. Team sheet
    await waitFor('#team-sheet-screen:not(.hidden)');
    await shot('team-sheet');

    // 8. Patch BEFORE kickoff — override startMatch + isHumanGame
    console.log('  Patching for auto-play...');
    const patchResult = await evalInPage(`(() => {
      window.isHumanGame = () => true;
      if (typeof window.startMatch === 'function') {
        const origStartMatch = window.startMatch;
        window.startMatch = async function(homeName, awayName, homeController, awayController, presetTeams) {
          const aiCtrl = { type: 'ai', player: 'basic-coach' };
          console.log('[patch] startMatch intercepted — forcing AI controllers for', homeName, awayName);
          return origStartMatch.call(this, homeName, awayName, aiCtrl, aiCtrl, presetTeams);
        };
        return 'patched';
      }
      return 'startMatch not found';
    })()`, true);
    console.log('  patch result:', patchResult.value);

    // 9. Kick off
    await click('#ts-kickoff');
    await sleep(1500);

    await waitFor('#board:not(.hidden)');
    await shot('match-board');

    // Dump post-kickoff state — use bare names (not window.) for let-scoped globals
    const state1 = await evalInPage(`JSON.stringify((() => {
      if (typeof game === 'undefined' || !game) return { error: 'no game object' };
      const team0 = game.currentTeam;
      const teams = (typeof TEAMS !== 'undefined') ? TEAMS : {};
      const teamNames = Object.keys(teams);
      const controllers = {};
      for (const n of teamNames) {
        controllers[n] = teams[n]?.controller ? { type: teams[n].controller.type, player: teams[n].controller.player } : null;
      }
      return {
        turn: game.turn,
        maxTurns: game.maxTurns,
        currentTeam: team0?.name,
        currentSide: team0?.side,
        finished: game.finished,
        halftimePending: game.halftimePending,
        noticeOverlayActive: typeof noticeOverlayActive !== 'undefined' ? noticeOverlayActive : 'undef',
        controllers,
      };
    })())`, false, true);
    console.log('  POST-KICKOFF STATE:', JSON.stringify(state1.value, null, 2));

    // 10. startMatch type check
    const fnCheck = await evalInPage(`typeof window.startMatch`, false, true);
    console.log('  startMatch type after patch:', fnCheck.value);

    // 11. Suppress humanNotice AFTER the kickoff notice
    await evalInPage(`(() => {
      window.humanNotice = (msg) => { console.log('[humanNotice suppressed]', msg); return Promise.resolve(); };
      console.log('[patch] humanNotice suppressed');
    })()`, true);

    // 12. Match loop — diagnostics every 10 iterations
    console.log('  Running match loop with diagnostics...');
    for (let i = 0; i < 100; i++) {
      const st = await evalInPage(`JSON.stringify((() => {
        if (typeof game === 'undefined' || !game) return { finished: true, reason: 'no game' };
        return {
          turn: game.turn,
          maxTurns: game.maxTurns,
          currentTeam: game.currentTeam?.name,
          finished: game.finished,
          halftimePending: game.halftimePending,
          noticeOverlayActive: typeof noticeOverlayActive !== 'undefined' ? noticeOverlayActive : 'undef',
        };
      })())`, false, true);

      if (i % 10 === 0 || st.value?.includes('"finished":true')) {
        console.log(`  [iter ${i}]`, st.value);
      }
      if (st.value?.includes('"finished":true')) break;

      await evalInPage(`(() => {
        if (typeof window.runAiTurn === 'function') {
          try { window.runAiTurn(); } catch(e) { console.log('[runAiTurn error]', e.message); }
        }
      })()`, true);
      await sleep(100);
    }

    await shot('match-final');

  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err.stack);
  } finally {
    if (cdp) await cdp.close();
    chrome.kill();
    server.kill();
  }
}

run().catch(e => { console.error(e); process.exit(1); });