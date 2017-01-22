'use strict'

const Card = require('./Card');
const hiddenCard = require('./hiddenCard');

//this takes a numver, array or nested array of numbers
//and makes card objecs or zero for no card 
//can be used for p1Hand, p2Hand or deck or nextcard
//returns new array to reassign
const convertNumbersToCardObjects = (cardNumbers) => {
  if (typeof cardNumbers === 'number')
    return cardNumbers === 0 ? 0 : new Card(cardNumbers);

  //we only get here if dealing with array
  let arr = [];
  arr =  cardNumbers.map(num => {
    if (typeof num !== 'number'){
      return convertNumbersToCardObjects(num);
    } else if (num !== 0){
      return new Card(num)
    } else return 0;
  })
  return arr;
}

const hideLastRow = (hands) => {
  //check the last row of each hand
  //if a card is placed we send an 'x' to the front end as a placeholder
  //to keep card hidden from opponent and not send the data over
  hands.forEach(hand => {
    if (hand[4] !== 0) {
      //console.log(hand[4])
      hand[4] = new hiddenCard();
    }
  })
}

const mutateForFrontEnd = (game)  => {
  game.p1Hands = convertNumbersToCardObjects(game.p1Hands);
  game.p2Hands = convertNumbersToCardObjects(game.p2Hands);
  game.p1NextCard = convertNumbersToCardObjects(game.p1NextCard);
  game.p2NextCard = convertNumbersToCardObjects(game.p2NextCard);
  hideCardsIfNecessary(game)
  return game;
}

const addPlayerPositionAndReturnNewCopy = (game, playerPosition) => {
  game=game.toJSON();
  game.playerPosition = playerPosition;
  return game;
}

const hideCardsIfNecessary = (game) => {
  if (game.playerPosition === 1) {
    hideLastRow(game.p2Hands);
  } else if (game.playerPosition === 2) {
    hideLastRow(game.p1Hands);
  }
}

//takes one hand (array) and returns a numerical value based on poker ranking
// 0 is high card, 1 is par etc .... all the way up to straight flush 
const classifyOneHand = handsArray  => {
  return  3;
}

// takes an  entier p1Hand or p2Hand nested array and classifies 
// then returns an array of hand values ready to be placed in db
const assignHandValues = allHands => allHands.map(hand => classifyOneHand(hand));


module.exports = {
  convertNumbersToCardObjects,
  mutateForFrontEnd,
  addPlayerPositionAndReturnNewCopy,
  assignHandValues
}
