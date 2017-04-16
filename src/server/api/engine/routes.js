
'use strict'

import * as controller from './controller'
import express from 'express'

const log = require('debug')('api/engine/routes')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const searchString = req.query.searchString

    log(`Searching '${searchString}'`)

    const result = await controller.search(searchString)

    log(`Result for '${searchString}'`, result)

    res.json({ result })

  } catch (err) {
    log(err)

    res.json({ message: err.message })
  }
})

export default router
