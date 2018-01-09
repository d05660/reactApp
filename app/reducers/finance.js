import * as types from '../constants/actionTypes';
import { NavigationActions } from "react-navigation";
import Navigator from '../pages/navigator';

let initData = {
	data: [
    { id:0, date: "2017-12-01", money: 100000, image: require('../img/t0.png') },
    { id:1, date: "2017-12-04", money: 20000, image: require('../img/t1.png') },
    { id:2, date: "2017-12-05", money: 100000, image: require('../img/t2.png') },
    { id:3, date: "2017-12-06", money: 500000, image: require('../img/t3.png') },
    { id:4, date: "2017-12-07", money: 20000, image: require('../img/t4.png') },
    { id:5, date: "2017-12-08", money: 3000000, image: require('../img/t5.png') }
  ]
}

export const financeList = (state = {}, action) => {
  let newState = state;
	switch (action.type) {
		case types.FETCH_FINANCE_DATA:
      return { ...state, data: initData.data }
		default:
		  return state;
	}
}

export const nav = (state, action) => {
	switch (action.type) {
    case types.UPDATE_FINANCE_DATA:
			return Navigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Main' }),
				{ ...state, data: action.data }
			);
		default:
			return Navigator.router.getStateForAction(action, state) || state;
	}
};

// export const allMoneyData = (state = {}, action) => {
// 	switch (action.type) {
// 		case types.FETCH_ALL_DATA:
// 			return { ...state, data: action.data.data }
// 		default:
// 		  return state;
// 	}
// }