'use strict'

const Sequelize = require('sequelize');

const name = 'israeli-poker';

const url = `postgres://localhost:5432/${name}`;

const db = new Sequelize(url, {
  logging: console.log,
  native: true //use pg-native for speed
});

module.exports = db;

const { Game, Deck, User } = require('./index');

Game.hasOne(Deck);
Game.belongsTo(User, {as: 'playerOne'});
Game.belongsTo(User, {as: 'playerTwo'});
Game.belongsTo(User, {as: 'winner' })

//Game.sync()
  //.then(() => User.sync())
  //.then(() => Deck.sync())
  //.catch(console.error);

let game;

Game.create({})
  .then(createdGame => game = createdGame)
  .then(() =>
    User.create({
      name:'anderson'
    })
  )
  .then(user => game.setPlayerOne(user))
  .catch(console.error);

