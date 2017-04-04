const router = require('express').Router()
const knex = require('../db/knex')
const path = require('path')

const stormpath = require('express-stormpath')
router.get('/', (req, res)=>{
  return knex('author_book').then((result)=> {res.send(result)})
})
router.get('/:id', (req, res)=>{
  var id = req.params.id
  return knex('author_book').where('id', id).then((result)=> {res.send(result)})
})
router.post('/', stormpath.groupsRequired(['teacher']), (req, res)=>{
  var author_book = req.body
  return knex('author_book').insert(author_book).returning('id').then((result)=> {res.send(result)})
})
router.put('/:id', stormpath.groupsRequired(['teacher']), (req, res)=>{
  var author_book = req.body
  var id = req.params.id
  return knex('author_book').where('id', id).update(author_book).returning('id').then((result)=> {res.send(result)})
})
router.delete('/:id', stormpath.groupsRequired(['teacher']), (req, res)=>{
  var id = req.params.id
  return knex('author_book').where('id', id).del().returning('*').then((result)=> {res.send(result)})
})
module.exports = router
