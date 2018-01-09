'use strict';

import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Body, Header, Left, Right, Icon, Title, Button, StyleProvider, Spinner } from "native-base";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import { initMoneyData } from '../actions/finance'
import MainList from '../pages/mainList';

class MainContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.initMoneyData();
  }

  static navigationOptions = ({ navigation }) => ({
    header: (
      <StyleProvider style={getTheme(commonColor)}>
        <Header>
          <Left />
          <Body>
            <Title>残高表示</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => navigation.navigate('Login')}>
              <Icon name="ios-log-out" />
            </Button>
          </Right>
        </Header>
      </StyleProvider>
    )
  });

  render() {
    const { login, financeList } = this.props;
    return financeList.data ? (<MainList {...this.props} />) : (<Spinner />);
  }
}

function mapStateToProps(state) {
  const { login, financeList } = state;
  return {
    login,
    financeList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    initMoneyData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);