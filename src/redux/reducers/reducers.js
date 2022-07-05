import { combineReducers } from 'redux';
import {
  ADD_PLAYER, FETCH_TOKEN_FAIL,
  FETCH_TOKEN_SUCCESS,
  ADD_SCORE,
  ADD_COUNTER,
} from '../actions/action';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    counter: 1,
    gravatarEmail: '',
  },
  token: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER:
    return {
      ...state,
      player: action.payload,
    };
  case ADD_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: action.payload,
      },
    };
  case ADD_COUNTER:
    return {
      ...state,
      player: {
        ...state.player,
        counter: action.payload,
      },
    };
  case FETCH_TOKEN_FAIL:
    return {
      ...state,
      token: action.error,
    };
  case FETCH_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ playerReducer });

export default rootReducer;
