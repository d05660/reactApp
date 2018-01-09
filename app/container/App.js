import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import LoginContainer  from './LoginContainer';
import EditContainer  from './EditContainer';
import MainContainer  from './MainContainer';
import transition from '../components/transitions';

const AppWithNavigationState = ({ dispatch, nav }) => {
	return <App navigation={addNavigationHelpers({ dispatch, state: nav })} />
}

const App = StackNavigator({
  Login: { 
    screen: LoginContainer,
    path: '/Login'
   },
  Main: { 
    screen: MainContainer,
    path: '/Main'
  },
  Edit: { 
    screen: EditContainer,
    path: '/Edit'
  },
},{
  initialRouteName: 'Login',
  headerMode: 'screen',
  cardStyle: {backgroundColor: 'transparent'},
  transitionConfig: transition,
});

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);  