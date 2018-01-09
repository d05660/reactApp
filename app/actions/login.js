import * as types from '../constants/actionTypes';

import { LOGIN_URL } from '../constants/network';

let mockResponseData = {
  code: 'success',
  msg: 'ok'
};

export function fetchLogin(username, password) {
  return dispatch => {
    dispatch(fetchLoginResult());
    let body = JSON.stringify({
      userName: username,
      password: password,
    });
    return request(LOGIN_URL, 'post', body, { 'Accept': 'application/json', 'Content-Type': 'application/json', })
      .then((responseData) => {
        dispatch(receiveLoginResult(mockResponseData));
      })
      .catch((error) => {
        console.error('fetchLogin error: ' + error);
        dispatch(receiveLoginResult());
      })
  }
}

export function navigation(data) {
  return {
    type: types.NAVIGATION,
    data
  }
}

export function changeLoginAuth({ username, password, rawData }) {
  return {
    type: types.CHANGE_LOGIN_AUTH,
    username: username,
    password: password,
    rawData: rawData
  }
}

function request(url, method, body, headers) {
  var isOk;
  return new Promise((resolve, reject) => {
    resolve(url);
  });
}

function fetchLoginResult() {
  return {
    type: types.FETCH_LOGIN_RESULT,
  }
}

function receiveLoginResult(responseData) {
  return {
    type: types.RECEIVE_LOGIN_RESULT,
    rawData: responseData,
  }
}