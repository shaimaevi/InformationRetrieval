
'use strict'

import * as controller from './controller'
import express from 'express'

const log = require('debug')('api/engine/routes')

const router = express.Router()

/**
 * @api {get} /api/engine Search
 * @apName GetSearch
 * @apiGroup Engine
 *
 * @apiParam {string} searchString
 *
 * @apiSuccess {object[]} result
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "result": [
 *          { title: 'some-title', body: 'some-body', author: 'some-author' },
 *          { title: 'some-title_2', body: 'some-body_2', author: 'some-author_2' }
 *          { title: 'some-title_3', body: 'some-body_3', author: 'some-author_3' }
 *        ]
 *     }
 */
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
