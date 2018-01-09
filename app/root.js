import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { fetchLoading } from './actions/fetchActions';
import App from './container/App';
import Loading from './components/loading';

//const store = configureStore();
//初始化 进入等待 首屏数据 ajax请求
store.dispatch(fetchLoading(true));

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchLoading: true
    };
  }

  render() {
    return this.state.fetchLoading ? (
      <Loading />
    ) : (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }

  componentDidMount() {
    let time = setTimeout(() => {
      this.setState({
        fetchLoading: false
      });
      clearTimeout(time);
    }, 2000);
  }
}
