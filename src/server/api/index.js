'use strict'

const express = require('express');
const router = express.Router();
const { Game, Deck } = require('../game');
const  db  = require('../db/db');
const User = require('../db//models/user');


router.get('/', function (req, res, next) {
  console.log('hit base api');
  res.sendStatus(200);
});

router.get('/newgame/:id', function (req, res, next) {
  console.log('asdasdasd',req.sessionID);
  db.model('game').findById(req.params.id, { include: { all: true } })
    .then(game => {
      console.log(game.toJSON());
      game.deck.cards = Deck.prototype.convertNumericalToObjects.call(game.deck)
      res.send(game)
    })
    //.then(game => res.send(game))
    .catch(console.error);

  //let game = new Game();
  //game.init();
  //db.model('deck').create({
    //cards:[0,1,2,3,4,5]
  //})
    //.then(deck => deck.deal())
    //.then(card => console.log(card))
    //.then(() =>
      //res.send(game)
    //)
  //.catch(console.error)
})

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
    }
  })
    .then(games => res.send(games))
    .catch(console.error);
});


  module.exports = router;
