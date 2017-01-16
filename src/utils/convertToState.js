import initialState from '../initialState.js';

export default (gameState) => {
  let pIndex = gameState.playerPosition === 1 ? 1 : 2;
  let oppIndex = gameState.playerPosition === 1 ? 2: 1;

  console.log(gameState)
  let x = Object.assign({}, initialState, {
    player: Object.assign({}, initialState.player, {
      hands: gameState[`p${pIndex}Hands`],
      nextCard: gameState[`p${pIndex}NextCard`]
    })
  ,
    opponent: Object.assign({}, initialState.opponent, {
      hands: gameState[`p${oppIndex}Hands`],
      nextCard: gameState[`p${oppIndex}NextCard`]
    }),
    currentRow: gameState.currentRow,
    playerPosition: gameState.playerPosition
  })
  console.log(x);
  return x;
}
