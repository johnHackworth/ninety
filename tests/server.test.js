const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');
const { once } = require('node:events');
const { createServer } = require('../tools/server');

function request(server, pathname) {
  return new Promise((resolve, reject) => {
    http.get({hostname: '127.0.0.1', port: server.address().port, path: pathname}, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve({status: res.statusCode, type: res.headers['content-type'], body}));
    }).on('error', reject);
  });
}

test('static server serves public files and confines requests to its root', async (t) => {
  const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'ninety-server-'));
  const root = path.join(temporary, 'public');
  let server;
  t.after(async () => {
    if (server && server.listening) await new Promise((resolve) => server.close(resolve));
    await fs.rm(temporary, {recursive: true, force: true});
  });
  await fs.mkdir(path.join(root, '.git'), {recursive: true});
  await fs.writeFile(path.join(root, 'index.html'), '<html>game</html>');
  await fs.writeFile(path.join(root, 'app.js'), 'game();');
  await fs.writeFile(path.join(root, 'space name.css'), 'body {}');
  await fs.writeFile(path.join(root, '.git', 'config'), 'private');
  await fs.writeFile(path.join(temporary, 'outside.txt'), 'outside');
  await fs.symlink(path.join(temporary, 'outside.txt'), path.join(root, 'escape.txt'));
  await fs.symlink(path.join(root, '.git', 'config'), path.join(root, 'hidden.txt'));
  await fs.symlink(path.join(root, 'app.js'), path.join(root, 'alias.js'));
  server = createServer(root);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  for (const pathname of ['/', '/?version=1', '/app.js?version=1', '/space%20name.css', '/alias.js']) {
    await t.test(`serves ${pathname}`, async () => {
      const result = await request(server, pathname);
      assert.equal(result.status, 200);
      assert.match(result.type, /^(text\/html|application\/javascript|text\/css)$/);
      assert.ok(result.body.length > 0);
    });
  }
  for (const pathname of ['/../outside.txt', '/%2e%2e/outside.txt', '/..%2foutside.txt',
    '/%2e%2e%2foutside.txt', '/.git/config', '/%2egit/config', '/escape.txt', '/hidden.txt']) {
    await t.test(`blocks ${pathname}`, async () => {
      const result = await request(server, pathname);
      assert.equal(result.status, 403);
      assert.equal(result.body, 'Forbidden');
    });
  }
  for (const pathname of ['/%invalid', '/app.js%00', '/..%5coutside.txt']) {
    await t.test(`rejects malformed ${pathname}`, async () => {
      assert.equal((await request(server, pathname)).status, 400);
    });
  }
  await t.test('missing file returns 404', async () => {
    assert.equal((await request(server, '/missing.js')).status, 404);
  });
});
