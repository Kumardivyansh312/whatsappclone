const { Pool } = require('pg')

const pool = new Pool({
  user: 'anshulsharma',
  host: 'localhost',
  database: 'whatsapp',
  password: '',
  port: 5432,
})

module.exports = {pool}