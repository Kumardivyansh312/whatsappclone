
const createTableIfNotExist = "CREATE TABLE IF NOT EXISTS users ( id serial PRIMARY KEY, username VARCHAR(45) NOT NULL, password VARCHAR(450) NOT NULL, name VARCHAR(255) NOT NULL)"

  module.exports = {
    createTableIfNotExist
  }