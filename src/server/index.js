'use strict'

const PORT = 8000;

const express = require('express');
const http = require('http');

const middleware = require('./middleware');

// set up server
const server = http.createServer();
const app = express();
server.on('request', app);

middleware.applyMiddleware(app);


server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
})






