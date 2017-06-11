const router = require('express').Router()
const knex = require('../db/knex')
const path = require('path')
var shortid = require('shortid');
var jwt = require('express-jwt')
function fromHeaderOrQuerystring (req) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}
const init = {
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}
const init2 = {
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: false,
  getToken: fromHeaderOrQuerystring
}
router.put('/:id', jwt(init), (req, res)=>{
  var env = req.body
  var id = req.params.id
  env.users_email = req.user.email
  env.short_id = req.params.id
  return knex('envs').where({
    'short_id': id,
    'users_email': req.user.email
  }).update(req.body, '*').then((result)=> {
    res.json(result)
  })
})

router.get('/myenvs', jwt(init), (req, res) => {
  const id = req.params.id;
  knex.select('*').from('envs').where({
    'users_email': req.user.email
  }).then(function(result){
    if (result.length > 0){
      res.json(result);
    } else {
      res.sendStatus(200)
    }
  })
})
router.get('/:id', jwt(init2), (req, res) => {
  const id = req.params.id;
  if (!!req.user){
    knex.select('*').from('envs').where({
      'short_id': id,
      'private': false
    }).orWhere({
      'short_id': id,
      'users_email': req.user.email || 'foo'
    }).then(function(result){
      if (result.length > 0){
        res.json(result);
      } else {
        res.sendStatus(404)
      }
    })
  } else {
    knex.select('*').from('envs').where({
      'short_id': id,
      'private': false
    }).then(function(result){
      if (result.length > 0){
        res.json(result);
      } else {
        res.sendStatus(404)
      }
    })
  }
})

router.post('/', jwt(init), (req, res)=>{
  var env = req.body
  req.body.short_id = shortid.generate()
  req.body.users_email = req.user.email
  return knex('envs').insert(req.body).returning('short_id').then((result)=> {
    res.json(result)
  })
})

router.delete('/:id', jwt(init), (req, res)=>{
  var id = req.params.id
  return knex('envs').where({
    'short_id': id,
    'users_email': req.user.email
  }).del().returning('*').then((result)=> {
    if (result.length >0){
      res.json(result)
    } else {
      res.sendStatus(404)
    }
  })
})

module.exports = router
