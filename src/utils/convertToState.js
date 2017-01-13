import initialState from '../initialState.js';

export default (gameState) => {
  let x = Object.assign({}, initialState, {
    playerOne: Object.assign({}, initialState.playerOne, {
      hands: gameState.p1Hands,
      nextCard: gameState.p1NextCard
    })
  ,
    playerTwo: Object.assign({}, initialState.playerTwo, {
      hands: gameState.p2Hands,
      nextCard: gameState.p2NextCard
    }),
    deck: gameState.deck,
    currentRow: gameState.currentRow
  })
  console.log(x);
  return x;
}
