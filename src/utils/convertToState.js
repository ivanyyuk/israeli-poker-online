import initialState from '../initialState.js';

export default (gameState) => {
  let x = Object.assign({}, initialState, {
    playerOne: Object.assign({}, initialState.playerOne, {
      hands: gameState.p1Hands
    })
  ,
    playerTwo: Object.assign({}, initialState.playerTwo, {
      hands: gameState.p2Hands
    }),
    deck: gameState.deck,
    currentRow: gameState.currentRow
  })
  console.log(x);
  return x;
}
