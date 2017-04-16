
'use strict'

import { green, magenta } from 'chalk'
import mysql from 'mysql'

const log = require('debug')('api/engine/connection')

const HOST = process.env.MYSQL_HOST || 'localhost'
const USER = process.env.MYSQL_USER || 'root'
const DATABASE = process.env.MYSQL_DATABASE

const connection = mysql.createConnection({
  host: HOST,
  user: USER,
  password: process.env.MYSQL_PASS,
  database: DATABASE
})

// test connection
connection.connect(err => {
  if (err) {
    log('Error in connection', err)
    process.exit(1)
  }

  log(`Connected to ${magenta(USER)}@${magenta(HOST)}`)
  log(`Using db ${green(DATABASE)}`)
})

export default connection
