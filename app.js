require('dotenv').config();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const router = require('express').Router()
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path')
const teacher = require('./routes/teacher')
const user = require('./routes/user');
const book = require('./routes/book');
const author = require('./routes/author');
const author_book = require('./routes/author_book');
const index = require('./routes/index');
const stormpath = require('express-stormpath')
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors(corsOptions));
app.use(stormpath.init(app, {
  client: {
    apiKey: {
      id: process.env.SPID,
      secret: process.env.SPSECRET,
    }
  },
  application: {
    href: process.env.APPURL
  }
}));

app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(stormpath.loginRequired, express.static(path.join(__dirname, 'public')));

app.use('/', stormpath.getUser, index)
app.use('/book', stormpath.getUser, book)
app.use('/author', stormpath.getUser, author)
// app.use('/user', stormpath.getUser, user)
app.use('/author_book', stormpath.getUser, author_book)
app.use( stormpath.groupsRequired(['teacher']), express.static(path.join(__dirname, 'nonpublic')))

// Listening port
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on port: ${PORT}`);
});
