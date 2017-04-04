require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/books_db',
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },

};
