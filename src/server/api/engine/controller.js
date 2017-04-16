
'use strict'

import connection from './connection'

export function search (searchString, options) {
  return new Promise((resolve, reject) => {
    // Fancy querying here
    connection.query({
      sql: 'SELECT * FROM posts'
    }, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}
