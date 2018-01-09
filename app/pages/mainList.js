import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, ListView, Image } from "react-native";
import { Card, CardItem, Body, Right, Icon, Text, } from "native-base";;

export default class MainList extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let { financeList } = this.props;
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    let data = this.props.financeList.data;
    this.setState({
      dataSource: ds.cloneWithRows(data)
    });
  }

  goToNext(date, money) {
    this.props.navigation.navigate("Edit", { date: date, balance: money});
  }

  _renderRow(item) {
    return (
      <TouchableOpacity onPress={this.goToNext.bind(this, item.date, item.money)}>
        <Card>
          <CardItem >
            <Image style={{alignSelf:'center',width:50,height:50}} source={item.image ? item.image : noImage} />
            <Body style={{ marginLeft: 10 }}>
              <Text style={{ padding: 5, fontSize: 16 }}>預り金: {item.money}</Text>
              <Text style={{ padding: 5, fontSize: 12 }} note>
                日付: {item.date}
              </Text>
            </Body>
            <Right>
              <Icon name="ios-arrow-forward" style={{ color: '#519ff1' }} />
            </Right>
        </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData => this._renderRow(rowData)}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});