'use strict'

const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('./api/');

const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};


const applyMiddleware = app => {
  app.use(session({
    secret: 'whatevs',
    resave: false,
    saveUninitialized: false,
    genid: function(req) {
      return Math.floor(Math.random()*9999);
    }
  }))
    .use(passport.initialize())
    .use(passport.session())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended:true}))
    .use(morgan('dev'))
    .use(allowCrossDomain)
    .use('/api', apiRouter);
}

module.exports = {
  applyMiddleware
}
