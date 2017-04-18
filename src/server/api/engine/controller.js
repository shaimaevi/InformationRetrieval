
'use strict'

import connection from './connection'

export function search (searchString, options) {
  const MATCH_STRING = `MATCH(reviews.title, body) AGAINST('${searchString}')`
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
