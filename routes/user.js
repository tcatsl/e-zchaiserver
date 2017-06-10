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
router.get('/userdata', jwt(init), (req, res)=>{
  if (!!req.user.email){
    var user = {
      email:req.user.email,
      username: null
    }
    return knex('users').insert(user).returning('email').then((data)=>{
      if (data.length > 0){
        res.json(req.user.email)
      } else {
        res.json(req.user.email)
      }
    }).catch(res.send(200))
  } else {
    res.sendStatus(402)
  }
})

module.exports = router
