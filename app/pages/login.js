import React, { Component } from "react";
import { StyleSheet, Image, Dimensions, Alert } from "react-native";
import { Container, Content, Item, Input } from "native-base";
import { Button, Icon, Text } from "native-base";
import { scale, scaleModerate, scaleVertical } from "../utils/scale";

export default class Login extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const { login, stopHandleTimeConsuming } = nextProps;
    if (login.logined) {
      stopHandleTimeConsuming();
      if (!login.rawData) {
        Alert.alert("", "网络请求失败，请稍后再试！", [{ text: "好" }]);
      } else if (login.rawData.code == "success") {
        this.props.navigation.navigate("Main");
      } else if (login.rawData.code == "failure") {
        Alert.alert("", login.rawData.msg, [{ text: "好" }]);
      }
    }
  }

  _renderImage(image) {
    let contentHeight = scaleModerate(375, 1);
    let height = Dimensions.get("window").height - contentHeight + 40;
    let width = Dimensions.get("window").width - 40;

    image = (
      <Image
        style={[styles.image, { height, width }]}
        source={require("../img/logo.png")}
      />
    );
    return image;
  }

  render() {
    let image = this._renderImage();
    const { changeLoginAuth, login } = this.props;
    return (
      <Container>
        <Content style={styles.loginview}>
          {image}
          <Item rounded style={styles.textInput}>
            <Icon active name="person" />
            <Input
              placeholder="口座番号"
              value={login.username}
              onChangeText={username =>
                changeLoginAuth({ username: username })
              }
            />
          </Item>
          <Item rounded style={styles.textInput}>
            <Icon active name="lock" />
            <Input
              placeholder="パスワード"
              secureTextEntry={true}
              value={login.password}
              onChangeText={password =>
                changeLoginAuth({ password: password })
              }
            />
          </Item>
          <Button
            style={[styles.loginButton, { marginTop: 80 }]}
            block
            info
            rounded
            onPress={this.onLogin.bind(this)}
          >
            <Text style={styles.loginText}>ログオン</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  onLogin() {
    const { fetchLogin, login, startHandleTimeConsuming } = this.props;
    fetchLogin(login.username, login.password);
    startHandleTimeConsuming();
  }
}

let styles = StyleSheet.create({
  loginview: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff"
  },
  image: {
    resizeMode: "cover",
    marginBottom: scaleVertical(10)
  },
  textInput: {
    flex: 1,
    backgroundColor: "#ffffff",
    height: 45,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20
  },
  loginButton: {
    margin: 15
  },
  loginText: {
    color: "#ffffff",
    fontWeight: "bold",
    width: 100
  }
});