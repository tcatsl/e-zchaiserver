exports.up = function(knex) {
  return knex.schema.createTable('author', table =>{
    table.increments('id').primary()
    table.string('firstname')
    table.string('lastname')
    table.text('bio')
    table.string('portrait')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('author')
}
