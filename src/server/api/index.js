'use strict'

const express = require('express');
const router = express.Router();
const { Game } = require('../game');
const  db  = require('../db/db');

router.get('/', function (req, res, next) {
  console.log('hit base api');
  res.sendStatus(200);
});

router.get('/newgame', function (req, res, next) {
  let game = new Game();
  game.init();
  db.model('deck').create({
    cards:[0,1,2,3,4,5]
  })
    .then(deck => deck.deal())
    .then(card => console.log(card))
    .then(() =>
      res.send(game)
    )
  .catch(console.error)
})

module.exports = router;
