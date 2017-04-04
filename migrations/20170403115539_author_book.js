exports.up = function(knex) {
  return knex.schema.createTable('author_book', table =>{
    table.increments('id').primary()
    table.integer('author_id')
    table.foreign('author_id').references('author.id').onDelete('CASCADE')
    table.integer('book_id')
    table.foreign('book_id').references('book.id').onDelete('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('author_book')
}
