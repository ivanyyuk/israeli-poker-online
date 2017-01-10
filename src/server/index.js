'use strict'

const PORT = 8000;

const express = require('express');
const http = require('http');

const middleware = require('./middleware');
const routes = require('./routes');

// set up server
const server = http.createServer();
const app = express();
server.on('request', app);

//add middleware
middleware.applyMiddleware(app);

//add  routes
app.use(routes);

//databse and server
const db = require('./db/db');
db.sync({})
  .then(() =>
    server.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    })
  ) 
.catch(console.error);






