
'use strict'

import { blue, magenta } from 'chalk'
import figlet from 'figlet'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import gzip from 'express-static-gzip'

const log = require('debug')('server')

const SOURCE_ROOT = path.join(__dirname, '../')
const CLIENT_ROOT = path.join(SOURCE_ROOT, 'client')
const PROJECT_ROOT = path.join(SOURCE_ROOT, '../')
const DOCS_ROOT = path.join(PROJECT_ROOT, 'docs')

log('\n', '========'.repeat(8))
log('\n', figlet.textSync('  SEARCH', { font: 'Ghost' }))
log('\n', '========'.repeat(8))
log('\n', magenta('Logging modules: '), process.env.DEBUG)
log('\n', '========'.repeat(8), '\n')

// Create express server

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// Rest endpoints

require('./routes').default(app)

// Developer docs
if (process.env.SERVE_DOCS) {
  // ES7 app docs
  app.use('/docs/src', express.static(path.join(DOCS_ROOT, 'src')))
  // Rest api
  app.use('/docs/api', express.static(path.join(DOCS_ROOT, 'api')))
}

// Gzipped static files
app.use(gzip(CLIENT_ROOT))

// Alternate fallback
app.route('*').get((req, res) => res.sendFile(path.join(CLIENT_ROOT, 'index.html')))

// start server
app.listen(process.env.PORT, () => log(` Server listening on port ${blue(process.env.PORT)}`))
