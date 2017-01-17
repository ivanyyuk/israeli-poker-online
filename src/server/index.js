'use strict'

const PORT = 8000;
const db = require('./db/db')
const express = require('express');
const http = require('http');

const middleware = require('./middleware');
const routes = require('./routes');
const seed = require('./seed');

// set up server
const server = http.createServer();
const app = express();
const path = require('path');

server.on('request', app);

//add middleware
middleware.applyMiddleware(app);

app.use('/api', require('./api/'))
app.use('/auth', require('./auth/'))
app.get('*', function(req,res,next) {
  res.sendFile(path.join(__dirname,'..','..', 'public', 'index.html'))
});
//sockets
const io = require('./socket').listen(server);
//obviouslty need to find a better way later

//error catch
app.use(function (err, req, res, next) {
  console.error(err);
  res.sendStatus(500);
});

//databse and server
db.sync()
  //.then(seed)
  .then(() =>
    server.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    })
  ) 
  .catch(console.error);





module.exports = io; // export this to socket.js to epxort again

