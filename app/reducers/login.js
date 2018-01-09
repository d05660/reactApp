import * as types from '../constants/actionTypes';

const initialState = {
  username: '',
  password: '',
  logining: false,
  logined: false,
  rawData: undefined,
}

export default function login(state = initialState, action) {
  state = {...state, logined: false };
  switch (action.type) {
    case types.FETCH_LOGIN_RESULT:
      return {
        ...state,
        logining: true,
      }
    case types.RECEIVE_LOGIN_RESULT:
      return {
        ...state,
        logining: false,
        logined: true,
        rawData: action.rawData,
      }
    case types.CHANGE_LOGIN_AUTH:
      let newState = state;
      if (action.username != undefined && action.username.length >= 0) {
        newState = {
          ...newState,
          username: action.username,
        }
      }
      if (action.password != undefined && action.password.length >= 0) {
        newState = {
          ...newState,
          password: action.password,
        }
      }
      if (action.rawData != undefined) {
        newState = {
          ...newState,
          rawData: action.rawData,
        }
      }
      return newState;
    default:
      return state;
  }
}