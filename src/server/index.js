'use strict'

const PORT = 8000;
const db = require('./db/db')
const express = require('express');
const http = require('http');

const middleware = require('./middleware');
const routes = require('./routes');

// set up server
const server = http.createServer();
const app = express();
const path = require('path');

server.on('request', app);

//add middleware
middleware.applyMiddleware(app);

app.use('/api', require('./api/'))
app.use('/', require('./auth/'))
app.get('/*', function(req,res,next) {
  res.sendFile(path.join(__dirname,'../','../', '/public', 'index.html'))
});
//sockets
const io = require('socket.io').listen(server);
module.exports = { io, app};
require('./socket');  // require this to start it at run time 

//error catch
app.use(function (err, req, res, next) {
  console.error(err);
  res.sendStatus(500);
});

function seed() {
  let game;
  const Game = require('../server/db/models/game');
  const User = require('../server/db/models/user');
  const Deck = require('../server/db/models/deck');

    return Game.createNewGame()
    .then((createdGame) => {
      game = createdGame
      const seedUsers = function () {

        const users = [
          {
            email: 'p1@gmail.com',
            nickname: 'p1',
            password: 'test'
          },
          {
            email: 'p2@gmail.com',
            nickname: 'p2',
            password: 'test'
          }
      ];

        const creatingUsers = users.map(function (userObj) {
          return User.create(userObj);
        });

        return Promise.all(creatingUsers);
      }
      return seedUsers();
    })
    .then(users => {
      let index1 = Math.floor(Math.random() * 2);
      let index2 = index1 === 0 ? 1 : 0;
      return game.setPlayerOne(users[index1])
        .then(() =>
        game.setPlayerTwo(users[index2]))
    })
    .then(() => game.dealInitial())
    .catch(console.error);
}

//databse and server
db.sync({force:true})
  .then(seed)
  .then(() =>
    server.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    })
  ) 
  .catch(console.error);






