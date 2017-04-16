
'use strict'

import runtime from 'offline-plugin/runtime'

const log = require('debug')('core/service-worker')

log('Registering Service worker...')

// Register SW for offline use
runtime.install({
  onUpdateReady () {
    log('onUpdateReady')
    // Tells to new SW to take control immediately
    runtime.applyUpdate()
  },
  onUpdated () {
    log('onUpdated')
    // Reload the webpage to load into the new version
    window.location.reload()
  }
})
