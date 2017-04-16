
'use strict'

import * as controller from './controller'
import express from 'express'

const log = require('debug')('api/engine/routes')

const router = express.Router()

router.get('/', async (req, res) => {
  const searchString = req.query.searchString
  try {
    const result = await controller.search(searchString)

    log(result && result.length, `results for '${searchString}'`)

    res.json({ result })
  } catch (err) {
    log(`Error searching '${err}'`, err)

    res.json({ message: err.message })
  }
})

export default router
