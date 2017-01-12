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


//sockets
const io = require('socket.io').listen(server);
io.on('connection', function(socket) {
  console.log('connected to soxxx')
  io.emit('babelfish');
})

function seed() {
  let game;
  const Game = require('../server/db/models/game');
  const User = require('../server/db/models/user');
  const Deck = require('../server/db/models/deck');

  const gameLogicDeck = require('./game/Deck');
 return  Game.create({
    p1Hands: [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ],
    p2Hands:  [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0]
    ]
  })
    .then(createdGame => game = createdGame)
    .then(() => {
      let deck = new gameLogicDeck()
      return Deck.create({
        cards: deck.cards,
        index: deck.index
      })
    })
    .then(deck => game.setDeck(deck))
    .then(() => {
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
      return game.setPlayerOne(users[0])
        .then(() =>
          game.setPlayerTwo(users[1])
        )
    })
    .catch(console.error);
}

//databse and server
const db = require('./db/db');
db.sync({force:true})
  .then(seed)
  .then(() =>
    server.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    })
  ) 
.catch(console.error);






