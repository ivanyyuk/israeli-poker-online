'use strict'

const Card = require('./Card');

//this takes a numver, array or nested array of numbers and makes card objecs 
//can be used for p1Hand, p2Hand or deck
//returns new array to reassign
const convertNumbersToCardObjects = (cardNumbers) => {
  if (typeof cardNumbers === 'number') return new Card(cardNumbers);
  
  //we only get here if dealing with array
  let arr = [];
  arr =  cardNumbers.map(num => {
    if (typeof num !== 'number'){
      return convertNumbersToCardObjects(num)
    } else if (num !== 0){
      return new Card(num)
    }
    else return 0
  })
  return arr;
}

const mutateForFrontEnd = (game)  => {
  game.p1Hands = convertNumbersToCardObjects(game.p1Hands);
  game.p2Hands = convertNumbersToCardObjects(game.p2Hands);
  game.deck.cards = convertNumbersToCardObjects(game.deck.cards);
  game.p1NextCard = convertNumbersToCardObjects(game.p1NextCard);
  game.p2NextCard = convertNumbersToCardObjects(game.p2NextCard);
}

module.exports = {
  convertNumbersToCardObjects,
  mutateForFrontEnd
}
