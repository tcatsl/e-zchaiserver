const router = require('express').Router()
const knex = require('../db/knex')
const path = require('path')

const stormpath = require('express-stormpath')
router.get('/', (req, res)=>{
  return knex('book').then((result)=> {res.send(result)})
})
router.get('/genre', (req, res)=>{
  return knex('book').distinct('genre').select()
  .then((data)=>{res.send(data)})
})
router.get('/:id', (req, res)=>{
  var id = req.params.id
  return knex('book').where('id', id).then((result)=> {res.send(result)})
})
//get all authors for book
router.get('/authors/:id', (req, res)=>{
  var id = req.params.id
  return knex.select('firstname', 'author.id', 'lastname', 'author_book.id as join').from('author').join('author_book', 'author.id', 'author_book.author_id').join('book', 'author_book.book_id', 'book.id').where('book.id', id).then((result)=> {res.send(result)})
})
router.post('/', stormpath.groupsRequired(['teacher']), (req, res)=>{
  if (req.body.name.length > 0){
  var book = req.body
  return knex('book').insert(book).returning('id').then((result)=> {res.send(result)})
} else {res.sendStatus(400)}
})
router.put('/:id', stormpath.groupsRequired(['teacher']), (req, res)=>{
  var book = req.body
  if (req.body.name.length > 0){
  var id = req.params.id
  return knex('book').where('id', id).update(book).returning('id').then((result)=> {res.send(result)})
} else {res.sendStatus(400)}
})
router.delete('/:id', stormpath.groupsRequired(['teacher']), (req, res)=>{
  var id = req.params.id
  return knex('book').where('id', id).del().returning('*').then((result)=> {res.send(result)})
})

module.exports = router
