
'use strict'

import _ from 'lodash'
import connection from './connection'

const log = require('debug')('api/engine/controller')

export async function search (searchString) {
  const result =
    // and'd search
    await executeSearch(searchString, { and: true }) ||
    // fallback to or'd search
    await executeSearch(searchString, { and: false })

  return result
}

function executeSearch (searchString, options) {
  const { and } = options || {}

  const keywords = _.words(searchString)
    .map(k => and
      ? `+${k}`   // and'd
      : k         // or'd
    )
    .join(' ')

  const MATCH_STRING = `MATCH(r.title, r.body) AGAINST('${keywords}')`

  log(`MatchString for searchString '${searchString}': '${keywords}'`)

  const sql = `SELECT r.id as id, r.title as title, r.body as body, r.author as author, b.title as bookTitle, b.author as bookAuthor, ${MATCH_STRING} as score ` +
              `FROM reviews as r JOIN books as b ON r.book_id=b.id WHERE ${MATCH_STRING} ORDER BY score DESC`

  return new Promise((resolve, reject) => connection.query({ sql }, (err, res) => err ? reject(err) : resolve(res)))
}
