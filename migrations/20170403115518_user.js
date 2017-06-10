exports.up = function(knex) {
  return knex.schema.createTable('users', table =>{
    table.text('email').unique().primary()
    table.string('username')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
}
