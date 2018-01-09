'use strict';

import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { fetchLogin, changeLoginAuth } from '../actions/login';
import { startHandleTimeConsuming, stopHandleTimeConsuming } from '../actions/timeConsuming';
import Login from '../pages/login';

class LoginContainer extends Component {

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <Login {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { login } = state;
  return {
    login
  };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchLogin,
    changeLoginAuth,
    startHandleTimeConsuming, 
    stopHandleTimeConsuming
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);