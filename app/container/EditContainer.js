'use strict';

import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Body, Header, Left, Right, Icon, Title, Button, StyleProvider } from "native-base";
import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";
import { updateFinanceData } from '../actions/finance'
import Edit from '../pages/edit';

class EditContainer extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: (
      <StyleProvider style={getTheme(commonColor)}>
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.navigate('Main')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>入出金</Title>
          </Body>
          <Right />
        </Header>
      </StyleProvider>
    )
  });

  render() {
    return (
      <Edit {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  const { login, financeList } = state;
  return {
    login,
    financeList: financeList.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateFinanceData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer);