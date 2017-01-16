'use strict'

const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('./api/');
const db = require('./db/db');

const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};


const applyMiddleware = app => {
    app.use(allowCrossDomain)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended:true}))
    .use(morgan('dev'))
    .use('/api', apiRouter);
  require('./auth/')(app,db);
}

module.exports = {
  applyMiddleware
}
