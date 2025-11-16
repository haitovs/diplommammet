const http = require('http');
const fs = require('fs');
const path = require('path');
const { routes } = require('./routes/routes');

const PORT = process.env.PORT || 4000;
const ALLOWED_METHODS = ['GET', 'POST', 'OPTIONS', 'HEAD'];
const CLIENT_ROOT = path.resolve(__dirname, '..', '..', 'client');
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function matchRoute(method, pathname) {
  return routes.find((route) => route.method === method && route.path === pathname);
}

function sendJson(res, statusCode, payload = {}, extraHeaders = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    ...extraHeaders
  });
  res.end(body);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      if (!chunks.length) {
        resolve(null);
        return;
      }
      const raw = Buffer.concat(chunks).toString();
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        const parsingError = new Error('Invalid JSON payload.');
        parsingError.code = 'BAD_JSON';
        reject(parsingError);
      }
    });
    req.on('error', (err) => reject(err));
  });
}

function applyCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
}

function resolveStaticPath(urlPath) {
  const requestPath = decodeURIComponent(urlPath || '/');
  const filePath = requestPath === '/' ? '/index.html' : requestPath;
  const joined = path.normalize(path.join(CLIENT_ROOT, filePath));
  if (!joined.startsWith(CLIENT_ROOT)) {
    return null;
  }
  return joined;
}

function serveFile(res, filePath, statusCode = 200) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      sendJson(res, 500, { message: 'Failed to load asset.' });
      return;
    }
    res.writeHead(statusCode, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=600',
      'Content-Length': data.length
    });
    res.end(data);
  });
}

function tryServeStatic(req, res, url) {
  if (!['GET', 'HEAD'].includes(req.method)) {
    return false;
  }
  if (url.pathname.startsWith('/api')) {
    return false;
  }
  const staticPath = resolveStaticPath(url.pathname);
  if (!staticPath) {
    return false;
  }
  try {
    const stats = fs.statSync(staticPath);
    if (stats.isFile()) {
      serveFile(res, staticPath);
      return true;
    }
  } catch (error) {
    // Continue to fallback below.
  }

  const fallback = path.join(CLIENT_ROOT, 'index.html');
  if (fs.existsSync(fallback)) {
    serveFile(res, fallback);
    return true;
  }

  return false;
}

const server = http.createServer(async (req, res) => {
  applyCors(res);
  if (!ALLOWED_METHODS.includes(req.method)) {
    sendJson(res, 405, { message: 'Method not allowed.' });
    return;
  }
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  if (tryServeStatic(req, res, url)) {
    return;
  }

  const route = matchRoute(req.method, url.pathname);
  if (!route) {
    sendJson(res, 404, { message: 'Route not found.' });
    return;
  }

  try {
    const body = ['POST', 'PUT', 'PATCH'].includes(req.method) ? await parseBody(req) : null;
    const result = await route.handler({
      query: url.searchParams,
      headers: req.headers,
      body
    });
    sendJson(res, result.status || 200, result.body);
  } catch (error) {
    console.error('Request failed', error);
    if (error.code === 'BAD_JSON') {
      sendJson(res, 400, { message: error.message });
      return;
    }
    sendJson(res, 500, { message: 'Internal server error.' });
  }
});

server.listen(PORT, () => {
  console.log(`Geography API ready on http://localhost:${PORT}`);
});
