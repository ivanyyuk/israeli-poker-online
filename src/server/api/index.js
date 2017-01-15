'use strict'

const express = require('express');
const router = express.Router();
const { Game, Deck } = require('../game');
const  db  = require('../db/db');
const User = require('../db//models/user');
const { convertNumbersToCardObjects, mutateForFrontEnd } = require('../game/utils');

router.use('/game', require('./game'));
router.get('/', function (req, res, next) {
  console.log('hit base api');
  res.sendStatus(200);
});

const dealInitial = function(game) {
  let deckId;
  return   db.model('game').findById(game.id, {include : { all :true}})
    .then(game => game.dealInitial())
    .catch(console.error);
}

router.get('/newgame/:id', function (req, res, next) {
  let currGame;
  console.log('asdasdasd',req.sessionID);
  db.model('game').findById(req.params.id, {include : { all:true } })
    .then(game =>  dealInitial(game))
    .then(gameState => {
      return db.model('game').findEntireGameById(gameState.id)
        .then(game => res.send(mutateForFrontEnd(game)))
        .catch(console.error)
    });
});

router.get('/getUser', function (req, res, next) {
  if (req.user) res.send(req.user);
  else res.send('no user');
});

router.get('/myGames/:id', function (req,res,next) {
  db.model('game').findAll({
    where: {
      $or: [
        {
          playerOneId: req.params.id
        },
        {
          playerTwoId: req.params.id
        }
      ],
    },
    include: { all: true }
  })
    .then(games => res.send(games))
    .catch(console.error);
});

router.post('/placeCard/:id', function(req,res,next) {
  return db.model('game').findById(req.params.id)
    .then(game => game.placeCardAndClearNextCard(1,req.body.x,req.body.y))
    .then(game => db.model('game').findEntireGameById(game.id))
    .then(game => res.send(mutateForFrontEnd(game)) )
    .catch(console.error)
});


module.exports = router;
