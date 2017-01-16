'use strict'

const db = require('../db');
const User = require('./user');
const Sequelize = require('Sequelize');
const gameLogicDeck = require('../.././game/Deck');

module.exports = db.define('game', {
  currentRow: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  p1Hands: {
    type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER))
  },
  p2Hands: {
    type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER))
  },
  p1NextCard: Sequelize.INTEGER,
  p2NextCard : Sequelize.INTEGER
}, {
  instanceMethods: {
    //p1Hands or p2Hands is a nested array so hand card is row column  basically
    //and value is the card number we actually passing
    //pIndex is 1 or 2 so we adjust right part of database
    placeCardAndClearNextCard(pIndex, hand, card){
      let playerHandsIndex = `p${pIndex}Hands`;
      let nextCardIndex = `p${pIndex}NextCard`;
      this[playerHandsIndex][hand][card] = this[nextCardIndex];
      let obj = {};
      obj[playerHandsIndex] = this[playerHandsIndex];
      obj[nextCardIndex] = 0;
      console.log(obj)
      return this.update(obj);
    },

    dealInitial() {
      return  db.model('deck').findById(this.deckId)
        .then(deck => {
          if (deck.index !== 0) throw new Error('deck error index: ',deck.index)

          for (let i = 0; i < 5; i++) {
            this.p1Hands[i][0] = deck.cards[deck.index];
            deck.index++;
            this.p2Hands[i][0] = deck.cards[deck.index];
            deck.index++;
          }
          this.p1NextCard = deck.cards[deck.index];
          deck.index++;
          this.p2NextCard = deck.cards[deck.index];
          deck.index++;

          return deck.save();
        })
        .then(() => this.update({
          currentRow: this.currentRow + 1,
          p1Hands: this.p1Hands,
          p2Hands: this.p2Hands,
          p1NextCard: this.p1NextCard,
          p2NextCard: this.p2NextCard
        }))
        .catch(console.error);
    },

    dealNextTwo() {
      return db.model('deck').findById(this.deckId)
        .then(deck => {
          this.p1NextCard = deck.cards[deck.index];
          deck.index++;
          this.p2NextCard = deck.cards[deck.index];
          deck.index++;
          return deck.save();
        })
        .then(() => this.update({
          p1NextCard: this.p1NextCard,
          p2NextCard: this.p2NextCard
        }))
        .catch(console.error);
    },

    incrementRow() {
      console.log('incrememnt')
      return this.update({
        currentRow: this.currentRow + 1
      })
        .catch(console.error)
    },

    checkAndIncrementRow() {
      console.log('checkand running')
      for (let i =0; i < this.p1Hands[this.currentRow].length; i++) {
        if (this.p1Hands[this.currentRow][i] === 0) return;
      }
      return this.incrementRow();
    }
  },
  classMethods: {
    //this was done often enough to warrant it's own method
    //this comes back with deck and all players so we can send it to front end
    findEntireGameById(id) {
      return this.findById(id)
    },

    createNewGame() {
      //created new game instance, new deck instance and then sets relation
      let game;
      return  db.model('game').create({
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
          let deck = new gameLogicDeck();
          deck.shuffle();
          return db.model('deck').create({
            cards: deck.cards,
            index: deck.index
          });
        })
        .then(deck => game.setDeck(deck))
        .catch(console.error);
    }
  },
  hooks: {
    beforeValidate: function(game) {
      if (game.changed('p1Hands')) {
        game.checkAndIncrementRow();;
      }
    }
  }
});
