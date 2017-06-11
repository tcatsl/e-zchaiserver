# e-zchaiserver
> This is the back-end repository for e-zchai, a site for coding in a test-driven REPL environment that allows configuration of mocha chai tests via an easily accessible menu. Back-end built using Express, PostgreSQL, Knex.js, shortid, and express-jwt. For the front-end repository, click [here](https://github.com/tcatsl/e-zchai)

## Build Setup

``` bash
# install dependencies
npm install

# set up database
createdb ezchai
knex migrate:latest

# run locally on port 3000
npm start
