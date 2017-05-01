
'use strict'

import _ from 'lodash'
import connection from './connection'

const log = require('debug')('api/engine/controller')

export function search (searchString, options) {
  const keywords = _.words(searchString).map(k => `+${k}`).join(' ')

  log(`keywords for searchString '${searchString}' '${keywords}'`)

  const MATCH_STRING = `MATCH(reviews.title, body) AGAINST('${keywords}')`
  return new Promise((resolve, reject) => {
    // Fancy querying here
    connection.query({
      sql: `SELECT reviews.id as id, reviews.title as title, body, reviews.author as author, books.title as bookTitle, books.author as bookAuthor, ${MATCH_STRING} as score FROM reviews JOIN books ON reviews.book_id=books.id WHERE ${MATCH_STRING} ORDER BY score DESC`
    }, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}
