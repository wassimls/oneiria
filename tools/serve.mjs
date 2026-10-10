// Minimal static file server for local review/testing (no dependencies).
// Usage: node tools/serve.mjs [rootDir] [port]
import http from 'node:http'
import { createReadStream, statSync } from 'node:fs'
import { extname, join, normalize, sep } from 'node:path'

const root = normalize(process.argv[2] || process.cwd())
const port = Number(process.argv[3] || 8099)

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml; charset=utf-8',
}

http
  .createServer((req, res) => {
    let url
    try {
      url = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    } catch {
      res.writeHead(400).end('Bad request')
      return
    }
    if (url.endsWith('/')) url += 'index.html'
    const file = join(root, normalize(url).replace(/^([/\\])+/, ''))
    if (!file.startsWith(root + sep) && file !== root) {
      res.writeHead(403).end('Forbidden')
      return
    }
    try {
      const st = statSync(file)
      if (st.isDirectory()) {
        res.writeHead(302, { Location: url + '/' }).end()
        return
      }
      res.writeHead(200, {
        'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream',
        'Content-Length': st.size,
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      })
      createReadStream(file).pipe(res)
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found')
    }
  })
  .listen(port, () => console.log(`serving ${root} on http://localhost:${port}`))
