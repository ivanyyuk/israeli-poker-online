'use strict'

const db = require('../db');
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
  }
}, {
  instanceMethods: {
    //p1Hands or p2Hands is a nested array so hand card is row column  basically
    //and value is the card number we actually passing
    //pIndex is 1 or 2 so we adjust right part of database
    placeCard: function(pIndex, hand, card, value){
      let playerHands = `p${pIndex}Hands`;
      this[playerHands][hand][card] = value;
      return this.save();
    },
    dealInitial() {
      let deckId = this.deckId;
     return  db.model('deck').findById(deckId)
        .then(deck => {
          for (let i = 0; i < 5; i++) {
            this.p1Hands[i][0] = deck.cards[deck.index];
            deck.index++;
            this.p2Hands[i][0] = deck.cards[deck.index];
            deck.index++;
          }
          return deck.save();
        })
        .then(() => this.update({
          currentRow: this.currentRow +1,
          p1Hands: this.p1Hands,
          p2Hands: this.p2Hands
        }))
        .catch(console.error)
    }
  }
});
