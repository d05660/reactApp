import * as types from '../constants/actionTypes';
import { initFetch } from '../utils/http';

const URL = 'http://192.168.1.200:3000/v2/money';

// export const initMoney = (data) => {
// 	return {
// 		type: types.FETCH_ALL_DATA,
// 		data
// 	}
// }

// export const initMoneyData = () => {
// 	return initFetch(initMoney)(URL);
// }

export const initMoneyData = () => {
	return {
		type: types.FETCH_FINANCE_DATA,
	}
}

export const updateFinanceData = ({data, route}) => {
  return {
		type: types.UPDATE_FINANCE_DATA,
		data,
		route,
  }
}