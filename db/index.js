const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  password: 'password',
  host: '18.144.177.208',
  database: 'comments',
  port: 5432,
})

module.exports = pool