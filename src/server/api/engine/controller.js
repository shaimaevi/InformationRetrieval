
'use strict'

import _ from 'lodash'
import connection from './connection'

const log = require('debug')('api/engine/controller')

export function search (searchString, options) {
  const keywords = _.words(searchString).map(k => `${k}`).join(' ')

  const MATCH_STRING = `MATCH(r.title, r.body) AGAINST('${keywords}')`

  log(`MatchString for searchString '${searchString}': '${keywords}'`)

  const SQL_STRING = `SELECT r.id as id, r.title as title, r.body as body, r.author as author, b.title as bookTitle, b.author as bookAuthor, ${MATCH_STRING} as score ` +
                     `FROM reviews as r JOIN books as b ON r.book_id=b.id WHERE ${MATCH_STRING} ORDER BY score DESC`

  log(SQL_STRING)

  return new Promise((resolve, reject) => {
    // Fancy querying here
    connection.query({
      sql: SQL_STRING
    }, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}
