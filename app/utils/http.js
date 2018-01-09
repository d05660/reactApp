import { fetchLoading } from '../actions/fetchActions';

export function initFetch(action) {
	return (url) => {
		return (dispatch) => {fetch(url).then(res => res.json())
			.then(json => {
				dispatch(action(json));
				dispatch(fetchLoading(false));
			}).catch(msg => console.log('usshowList-err  '+ msg));
		}
	}
}