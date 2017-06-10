exports.up = function(knex) {
  return knex.schema.createTable('envs', table =>{
    table.increments('id').primary()
    table.string('name')
    table.text('code')
    table.text('tests')
    table.string('users_email')
    table.foreign('users_email').references('users.email')
    table.bool('private')
    table.string('short_id')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('envs')
}
