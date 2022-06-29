export const ADD_PLAYER = 'ADD_PLAYER';
export const addPlayer = (playerInfo) => ({
  type: ADD_PLAYER,
  payload: playerInfo,
});
