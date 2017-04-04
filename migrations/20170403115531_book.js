exports.up = function(knex) {
  return knex.schema.createTable('book', table =>{
    table.increments('id').primary()
    table.string('name')
    table.string('genre')
    table.text('description')
    table.string('cover')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('book')
}
