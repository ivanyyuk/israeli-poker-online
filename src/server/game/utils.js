'use strict'

const _ = require('lodash');
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

const hideLastRow= (hands) => {
  //check the last row of each hand
  //if a card is placed we send an 'x' to the front end as a placeholder
  //to keep card hidden from opponent and not send the data over
  hands.forEach(hand => {
    if (hand[4] !== 0) {
      console.log(hand[4])
      hand[4] = new hiddenCard();
    }
  })
}

const mutateForFrontEnd = (game)  => {
  //game = game.toJSON(); 
  //console.log(game.playerPosition)
  game.p1Hands = convertNumbersToCardObjects(game.p1Hands);
  game.p2Hands = convertNumbersToCardObjects(game.p2Hands);
  game.p1NextCard = convertNumbersToCardObjects(game.p1NextCard);
  game.p2NextCard = convertNumbersToCardObjects(game.p2NextCard);
  //let obj = _.pickBy(game, (value, key) => {
    //return (key.includes('p1') || key.includes('p2'));
  //})
  //_.forIn(obj, (value, key) => {
    //obj[key] = convertNumbersToCardObjects(value)
  //hideLastRow(game.p2Hands);
  //});
  //let playerToHideIndex = game.playerPosition === 1 ? 2 : 1;
  //let playerToHide = `p${playerToHideIndex}Hands`;
  //hideLastRow(game[playerToHide]);
    hideCardsIfNecessary(game)
  return game;
}

const addPlayerPositionAndReturnNewCopy = (game, playerPosition) => {
  game=game.toJSON();
  game.playerPosition = playerPosition;
  return game;
}

const hideCardsIfNecessary = (game) => {
  console.log('hidef if necessary ',game.playerPosition)
  if (game.playerPosition === 1) {
    hideLastRow(game.p2Hands);
  } else if (game.playerPosition === 2) {
    hideLastRow(game.p1Hands);
  }
}

module.exports = {
  convertNumbersToCardObjects,
  mutateForFrontEnd,
  addPlayerPositionAndReturnNewCopy
}
