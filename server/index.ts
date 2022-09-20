import http from 'http'
import path from 'path'
import fs from 'fs/promises'

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App'

const MIME_TYPES = {
  'default': 'application/octet-stream',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
};

const PORT = process.env.SERVER_PORT ?? 5000

const getRoute = url => {
  switch (path.dirname(url)) {
    case ('/'): return renderIndex
    default: return serveStatic
  }
}

http
  .createServer((req, res) => getRoute(req.url)(req, res))
  .listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`))

const renderBodyWithContent = (content: string): string => `<div id="root">${content}</div>`
const globalState = (state: any) => `<script id="window">${state}</script>`

async function renderIndex(req, res) {
  let initState
  if (req.url === '/') {
    initState = { m: '', n: '', x: '' }
  } else {
    const urlSearchParams = new URLSearchParams(req.url.substring(2));
    initState = Object.fromEntries(urlSearchParams.entries());
  }
  const app = ReactDOMServer.renderToString(React.createElement(App, {initState} ))
  const indexFile = path.resolve('./build/index.html')
  try {
    const fileContent = await fs.readFile(indexFile, 'utf8')
    const result = fileContent.replace(
      renderBodyWithContent(''),
      renderBodyWithContent(app)
    ).replace(
      globalState(''),
      globalState(`window.__INITIAL_STATE__ = ${JSON.stringify(initState)}`)
    )
    res.statusCode = 200
    res.end(result)
  } catch (err) {
    res.statusCode = 500
    res.end('Oops, better luck next time!')
  }
}

async function serveStatic(req, res) {
  const fileContent = await fs.readFile('build' + req.url, 'utf8')
  const ext = path.extname(req.url)
  const contentType = MIME_TYPES[ext] || MIME_TYPES['default']
  res.writeHead(200, { 'Content-Type': contentType })
  res.end(fileContent)
}
