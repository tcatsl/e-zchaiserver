require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/ezchai',
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },

};
