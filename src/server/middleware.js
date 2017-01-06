'use strict'

const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('./api/');

const applyMiddleware = app => {
  app.use(bodyParser.json())
    .use(bodyParser.urlencoded({extended:true}))
    .get('/api', apiRouter);
}

module.exports = {
  applyMiddleware
}
