import fetchApiFunction from '../../services/fetchApi';

export const ADD_PLAYER = 'ADD_PLAYER';
export const addPlayer = (playerInfo) => ({
  type: ADD_PLAYER,
  payload: playerInfo,
});

export const ADD_SCORE = 'ADD_SCORE';
export const addScore = (playerScore) => ({
  type: ADD_SCORE,
  payload: playerScore,
});

export const ADD_COUNTER = 'ADD_COUNTER';
export const addCounter = (counter) => ({
  type: ADD_COUNTER,
  payload: counter,
});

export const ADD_QUESTION = 'ADD_QUESTION';
export const addQuestion = (assertions) => ({
  type: ADD_QUESTION,
  payload: assertions,
});

export const FETCH_TOKEN_FAIL = 'FETCH_TOKEN_FAIL';
export const fetchTokenFail = (err) => ({
  type: FETCH_TOKEN_FAIL,
  error: err,
});

export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const fetchTokenSuccess = (token) => ({
  type: FETCH_TOKEN_SUCCESS,
  payload: token,
});

export const apiThunk = () => (dispatch) => {
  fetchApiFunction()
    .then((response) => dispatch(fetchTokenSuccess(response)))
    .catch((error) => dispatch(fetchTokenFail(error)));
};
