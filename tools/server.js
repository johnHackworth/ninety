const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function createServer(root = path.join(__dirname, '..')) {
  const servingRoot = fs.realpathSync(root);
  function permitted(filePath) {
    const relative = path.relative(servingRoot, filePath);
    return relative && !path.isAbsolute(relative) &&
      !relative.split(path.sep).some((part) => part.startsWith('.'));
  }

  return http.createServer((req, res) => {
    let pathname;
    try {
      // Decode before resolving so encoded separators and dot segments are checked.
      pathname = decodeURIComponent(req.url.split('?')[0]);
    } catch (_) {
      res.writeHead(400);
      res.end('Bad request');
      return;
    }
    if (pathname.includes('\0') || pathname.includes('\\')) {
      res.writeHead(400);
      res.end('Bad request');
      return;
    }
    const filePath = path.resolve(servingRoot, pathname === '/' ? 'index.html' : `.${pathname}`);
    if (!permitted(filePath)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    fs.realpath(filePath, (err, realPath) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      // Symlinks must also resolve to a public file within the serving directory.
      if (!permitted(realPath)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      const contentType = MIME[path.extname(realPath)] || 'application/octet-stream';
      fs.readFile(realPath, (readError, data) => {
        if (readError) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      });
    });
  });
}

if (require.main === module) {
  createServer().listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = { createServer };
