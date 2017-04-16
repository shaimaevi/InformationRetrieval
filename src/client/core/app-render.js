
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./app-render-prod')
} else {
  module.exports = require('./app-render-dev')
}
