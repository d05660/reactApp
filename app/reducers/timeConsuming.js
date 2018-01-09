'use strict';

import * as types from '../constants/actionTypes';

const initialState = {
  canGoBack: true,
  canClick: true,
}

export default function timeConsuming(state = initialState, action) {
  switch (action.type) {
    case types.START_HANDLE_TIME_CONSUMING:
      return { ...state, canGoBack: false, canClick: false  }
    case types.STOP_HANDLE_TIME_CONSUMING:
      return { ...state, canGoBack: true, canClick: true  }
    default:
      return state;
  }
}