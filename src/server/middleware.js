'use strict'
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('./api/');
const db = require('./db/db');
const path = require('path');

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }};


const applyMiddleware = app => {
  app.use(express.static('public'))
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended:true}))
    .use(session({
      secret: 'agent man',
      resave: false,
      saveUninitialized: false,
    }))
    .use(passport.initialize())
    .use(passport.session())

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id)
      .then(function (user) {
        done(null, user);
      })
      .catch(done);
  });

}

module.exports = {
  applyMiddleware
}
