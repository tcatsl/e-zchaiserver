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
const env = require('./routes/env');
const user = require('./routes/user');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/env', env)
app.use('/user', user)

// Listening port
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Listening on port: ${PORT}`);
});
