const router = require('express').Router()
const knex = require('../db/knex')
const path = require('path')

const stormpath = require('express-stormpath')
router.get('/', (req, res)=>{
  return knex('author').then((result)=> {res.send(result)})
})
router.get('/:id', (req, res)=>{
  var id = req.params.id
  return knex('author').where('id', id).then((result)=> {res.send(result)})
})
//get all books by author
router.get('/books/:id', (req, res)=>{
  var id = req.params.id
  return knex.select('description', 'cover', 'genre', 'name', 'book.id').from('author').join('author_book', 'author.id', 'author_book.author_id').join('book', 'author_book.book_id', 'book.id').where('author.id', id).then((result)=> {res.send(result)})
})
router.post('/', stormpath.groupsRequired(['teacher']), (req, res)=>{
  var author = req.body
  if (req.body.firstname.length > 0 || req.body.lastname.length > 0){
  return knex('author').insert(author).returning('id').then((result)=> {res.send(result)})
} else {res.sendStatus(400)}
})
router.put('/:id', stormpath.groupsRequired(['teacher']), (req, res)=>{
  var author = req.body
  var id = req.params.id
  if (req.body.firstname.length > 0 || req.body.lastname.length > 0){
  return knex('author').where('id', id).update(author).returning('id').then((result)=> {res.send(result)})
} else {res.sendStatus(400)}
})
router.delete('/:id', stormpath.groupsRequired(['teacher']), (req, res)=>{
  var id = req.params.id
  return knex('author').where('id', id).del().returning('*').then((result)=> {res.send(result)})
})

module.exports = router
