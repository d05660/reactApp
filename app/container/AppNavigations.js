import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addNavigationHelpers } from 'react-navigation';
import Navigator from '../pages/navigator';

const AppWithNavigationState = ({ dispatch, nav }) => {
	return <Navigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};
  
const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState); 