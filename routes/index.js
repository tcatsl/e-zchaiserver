const router = require('express').Router()
const knex = require('../db/knex')
const path = require('path')

const stormpath = require('express-stormpath')
router.get('/loggedin', (req, res)=>{
  if (!!req.user) {
    console.log(req.user)
    res.send(req.user)
  } else { res.send('false')}
})
router.get('/isteacher', stormpath.groupsRequired(['teacher']), function (req, res){
   res.send('true')
})
router.post('/searchauthorbook', function(req, res){
  var searchterm = req.body.searchterm

  var booksearch = knex.select('*').from('book').where('book.description', 'ilike', '%'+searchterm+'%').orWhere('book.name', 'ilike', '%'+searchterm+'%').orWhere('book.genre', 'ilike', '%'+searchterm+'%')
  var authsearch = knex.select().from('author').where('author.firstname', 'ilike', '%'+searchterm+'%').orWhere('author.lastname', 'ilike', '%'+searchterm+'%').orWhere('author.bio', 'ilike', '%'+searchterm+'%')

Promise.all([booksearch, authsearch])
  .then((data)=>{res.send(data)})
})
router.post('/searchbook', function(req, res){
  var searchterm = req.body.searchterm

return knex.select('*').from('book').where('book.description', 'ilike', '%'+searchterm+'%').orWhere('book.name', 'ilike', '%'+searchterm+'%').orWhere('book.genre', 'ilike', '%'+searchterm+'%')
  .then((data)=>{res.send([data, []])})
})
router.post('/searchauthor', function(req, res){
  var searchterm = req.body.searchterm

return knex.select().from('author').where('author.firstname', 'ilike', '%'+searchterm+'%').orWhere('author.lastname', 'ilike', '%'+searchterm+'%').orWhere('author.bio', 'ilike', '%'+searchterm+'%')

  .then((data)=>{res.send([[], data])})
})
router.post('/reqteacher', stormpath.loginRequired, function (req, res) {
  var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GACC, // Your email id
            pass: process.env.GPASS // Your password
        }
      })
        var mailOptions = {
    from: process.env.GACC, // sender address
    to: process.env.PERSONAL, // list of receivers
    subject: 'gBooks Teacher access', // Subject line
    text: req.user.email + ' has requested teacher access: '+ req.body.message

};
transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log('mail error')
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});
          })
// router.get('/', function(req, res){
//   res.sendFile(path.join(__dirname + '../public/index.html'))
// })

module.exports = router
