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
  },
  p1NextCard: Sequelize.INTEGER,
  p2NextCard : Sequelize.INTEGER
}, {
  instanceMethods: {
    //p1Hands or p2Hands is a nested array so hand card is row column  basically
    //and value is the card number we actually passing
    //pIndex is 1 or 2 so we adjust right part of database
    placeCard(pIndex, hand, card){
      let playerHands = `p${pIndex}Hands`;
      console.log(playerHands)
      this[playerHands][hand][card] = this[`p${pIndex}NextCard`];
      let obj = {};
      obj[playerHands] = this[playerHands]
      return this.update(obj);
    },

    dealInitial() {
      return  db.model('deck').findById(this.deckId)
        .then(deck => {
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
      this.update({
        currentRow: this.currentRow + 1
      })
        .catch(console.error)
    }
  }
});