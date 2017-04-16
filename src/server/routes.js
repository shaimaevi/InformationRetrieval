
'use strict'

export default function configure (app) {
  app.use('/api/engine', require('./api/engine/routes').default)
}
