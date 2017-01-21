module.exports = function seed() {
  let game;
  const Game = require('../server/db/models/game');
  const User = require('../server/db/models/user');
  const Deck = require('../server/db/models/deck');

    return Game.createNewGame()
    .then((createdGame) => {
      let index1 = Math.floor(Math.random() * 2) +  1;
      let index2 = index1 === 1 ? 2 : 1;
      game = createdGame
      //console.log(index1)
      return Promise.all([createdGame.setPlayerOne(index1),createdGame.setPlayerTwo(index2)])
    })
    
      //game = createdGame
      //const seedUsers = function () {

      //const users = [
      //{
      //email: 'p1@gmail.com',
      //nickname: 'p1',
      //password: 'test'
      //},
      //{
      //email: 'p2@gmail.com',
      //nickname: 'p2',
      //password: 'test'
      //}
      //];

      //const creatingUsers = users.map(function (userObj) {
      //return User.create(userObj);
      //});

      //return Promise.all(creatingUsers);
      //}
      //return seedUsers();
      //})
      //.then(users => {
      //let index1 = Math.floor(Math.random() * 2);
      //let index2 = index1 === 0 ? 1 : 0;
      //return game.setPlayerOne(users[index1])
      //.then(() =>
      //game.setPlayerTwo(users[index2]))
      //})
        .then(() => game.dealInitial())
        .catch(console.error);
    }


