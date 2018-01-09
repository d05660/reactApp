import { combineReducers } from 'redux';
import login from './login';
import { financeList, nav } from './finance';

const rootReducer = combineReducers({
  login,
  financeList,
  nav,
});

export default rootReducer;