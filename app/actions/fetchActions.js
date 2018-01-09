import * as types from '../constants/actionTypes';

export const fetchLoading = (bool) => {
	return {
		type: types.FETCH_LOADING,
		bool
	}
}