import React, { Component } from "react";

import { StyleSheet, Alert, TouchableHighlight } from "react-native";
import * as loginAction from "../actions/login"; // 导入action方法
import { StyleProvider, Container, Content, List, ListItem } from "native-base";
import { Icon, Text, Radio, Input, Separator, Button } from "native-base";
import { Header, Title, Left, Body, Right, Thumbnail  } from "native-base";

import { DatePickerDialog } from "react-native-datepicker-dialog";
import moment from "moment";

import getTheme from "../../native-base-theme/components";
import commonColor from "../../native-base-theme/variables/commonColor";

export default class Edit extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isSelect: false,
      moneyString: '',
      dateText: "日付",
      DateHolder: null,
      balance: '200'
    };
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({dateText: params.date, balance: params.balance});
  }

  render() {
    return (
      <StyleProvider style={getTheme(commonColor)}>
        <Container style={styles.container}>
        <Header style={{height: 150}}>
          <Body>
            <Thumbnail square size={30} source={require('../img/office_cost.png')} />
            <Title style={ styles.moneyTitle }>預り金: {this.state.balance} 円</Title>
          </Body>
        </Header>
          <Content>
            <List style={styles.list}>
              <ListItem itemDivider />
              <ListItem icon onPress={this._onDatePickerCall.bind(this, this.state.dateText)}>
                <Left style={{ paddingLeft: 10 }}>
                  <Icon name="school" style={styles.icon1} />
                </Left>
                <Body style={{ paddingLeft: 14 }}>
                  <Text>{this.state.dateText}</Text>
                </Body>
                <Right>
                  <Icon name="ios-arrow-forward" />
                </Right>
              </ListItem>
              <ListItem itemDivider />
              <ListItem icon>
                <Left style={{ paddingLeft: 14 }}>
                  <Icon name="logo-bitcoin" style={styles.icon2} />
                </Left>
                <Body style={{ paddingLeft: 5 }}>
                  <Input keyboardType = 'numeric' placeholder="金額"
                    value={this.state.moneyString}
                    onChangeText={money =>
                      this.setState({moneyString: money})
                    } />
                </Body>
                <Right>
                  <Text>円</Text>
                </Right>
              </ListItem>
              <ListItem itemDivider />
              <ListItem icon>
                <Left style={{ paddingLeft: 14 }}>
                  <Icon name="arrow-round-down" style={styles.icon3} />
                </Left>
                <Body style={{ paddingLeft: 10 }}>
                  <Text>入金</Text>
                </Body>
                <Right>
                  <Radio selected={!this.state.isSelect} onPress={this._onPressHandle} />
                </Right>
              </ListItem>
              <ListItem itemDivider />
              <ListItem icon last>
                <Left style={{ paddingLeft: 14 }}>
                  <Icon name="arrow-round-up" style={styles.icon4} />
                </Left>
                <Body style={{ paddingLeft: 10 }}>
                  <Text>出金</Text>
                </Body>
                <Right>
                  <Radio selected={this.state.isSelect} onPress={this._onPressHandle} />
                </Right>
              </ListItem>
              <ListItem itemDivider />
            </List>
            <Button block info style={styles.button}
              onPress={this.onPress.bind(this)} >
              <Text style={styles.buttonText}>送信</Text>
            </Button>
            <TouchableHighlight onPress={
                ()=> {
                    Alert.alert(
                        `你点击了按钮`,
                        'Hello World！',
                        [
                            {text: '以后再说', onPress: () => console.log('Ask me later pressed')},
                            {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: '确定', onPress: () => console.log('OK Pressed')},
                        ]
                    )
                }
            }>
                <Text>Button</Text>
            </TouchableHighlight>
          </Content>
          <DatePickerDialog ref="DatePickerDialog" onDatePicked={this._onDatePickedFunction.bind(this)} />
        </Container>
      </StyleProvider>
    );
  }

  onPress() {
    const { financeList, updateFinanceData } = this.props;
    let { isSelect, moneyString, dateText} = this.state;
    let operate = isSelect ? -1 : 1;
    let money = 0;
    if(moneyString != undefined && moneyString.length >= 0) {
      money = isNaN(parseFloat(moneyString)) ? 0 : parseFloat(moneyString);
    } else {
      Alert.alert("Error", 'money cannot be null', [{ text: "好" }]);
    }
    financeList.map((item,index,input) => {
      if(item.date == dateText) {
        input[index].money = parseFloat(input[index].money) + operate * money;
      }
    });
    this.props.navigation.dispatch({ 
      type: 'UPDATE_FINANCE_DATA', data: financeList, route: 'Main'
    });
  }

  //radio press
  _onPressHandle = () => {
    this.setState({ isSelect: !this.state.isSelect });
    let financeType = (this.state.isSelect) ? 1 : -1;
    this.setState({
      financeType: financeType
    });
  };

  //DatePickerDialog
  _onDatePickedFunction = date => {
    this.setState({
      DateHolder: date,
      dateText: moment(date).format('YYYY-MM-DD')
    });
  };

  _onDatePickerCall = (current) => {
    let DateHolder = this.state.DateHolder;
    if (!DateHolder || DateHolder == null) {
      DateHolder = current ? new Date(current) : new Date();
      this.setState({
        DateHolder: DateHolder
      });
    }
    //To open the dialog
    this.refs.DatePickerDialog.open({
      date: DateHolder
    });
  };
  
}

let styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    //backgroundColor: "#ffffff"
  },
  list: {
    backgroundColor: "#ffffff"
  }, 
  button: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30
  },
  buttonText: {
    fontSize: 16,
  },
  userTitle: {
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
  },
  moneyTitle: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
  },
  icon1: {
    fontSize: 25, 
    color: "#387ef5"
  },
  icon2: {
    fontSize: 25, 
    color: "#f9c126"
  },
  icon3: {
    fontSize: 25, 
    color: "#f40104"
  },
  icon4: {
    fontSize: 25, 
    color: "#46db64"
  },
});