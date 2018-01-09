import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import LoginContainer  from '../container/LoginContainer';
import EditContainer  from '../container/EditContainer';
import MainContainer  from '../container/MainContainer';
import transition from '../components/transitions';

const Navigator = StackNavigator({
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

export default Navigator;