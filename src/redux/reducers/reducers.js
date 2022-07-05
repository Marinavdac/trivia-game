import { combineReducers } from 'redux';
import {
  ADD_PLAYER, FETCH_TOKEN_FAIL,
  FETCH_TOKEN_SUCCESS,
  ADD_SCORE,
  ADD_QUESTION,
} from '../actions/action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER:
    return ({
      ...state,
      ...action.payload,
    });
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case ADD_QUESTION:
    return {
      ...state,
      assertions: state.assertions + action.payload,
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

const rootReducer = combineReducers({ player });

export default rootReducer;
