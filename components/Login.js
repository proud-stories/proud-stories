import React, { Component } from "react";
import { View, Image, ActivityIndicator, StyleSheet } from "react-native";
import Auth0 from "react-native-auth0";
import Config from "react-native-config";
import DeviceInfo from "react-native-device-info";
import SInfo from "react-native-sensitive-info";
import RNRestart from "react-native-restart";
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Button, Text } from 'native-base';
import axios from "axios"

const auth0 = new Auth0({
  domain: Config.AUTH0_DOMAIN,
  clientId: Config.AUTH0_CLIENT_ID
});

export default class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Login",
      headerStyle: {
        backgroundColor: "#CF3EFE"
      },
      headerTitleStyle: {
        color: "#FFF"
      }
    };
  };

  state = {
    finishedLoading: false,
  };

  componentDidMount() {
    SInfo.getItem("accessToken", {}).then(accessToken => {
      if (accessToken) {
        auth0.auth
          .userInfo({ token: accessToken })
          .then(data => {
            this.gotoTopPage(data);
          })
          .catch(err => {
            SInfo.getItem("refreshToken", {}).then(refreshToken => {
              auth0.auth
                .refreshToken({ refreshToken: refreshToken })
                .then(newAccessToken => {
                  SInfo.setItem("accessToken", newAccessToken);
                  RNRestart.Restart();
                })
                .catch(err2 => {
                  console.log("err getting new access token");
                  console.log(err2);
                });
            });
          });
      } else {
        this.setState({
          finishedLoading: true
        });
        console.log("no access token");
      }
    });
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Image
            source={require('../img/download3.png')}
          />
          <ActivityIndicator
            size="large"
            color="#05a5d1"
            animating={!this.state.finishedLoading}
          />
          {this.state.finishedLoading && (
            <Button info block onPress={this.login} style={{backgroundColor:'#08c3fc'}}>
              <Text>Login/Register</Text>
            </Button>
          )}
        </View>
      </Container>
    );
  }

  login = () => {
    this.setState({
      finishedLoading: true
    });
    auth0.webAuth
      .authorize({
        scope: Config.AUTHO_SCOPE,
        audience: Config.AUTH0_AUDIENCE,
        device: DeviceInfo.getUniqueID(),
        prompt: "login"
      })
      .then(res => {
        this.setState({
              finishedLoading: false
            })
        auth0.auth
          .userInfo({ token: res.accessToken })
          .then(data => {
            console.log(data)
            return this.saveUser(data)
          })
          .then(data => {
            return this.gotoTopPage(data);
          })
          .catch(err => {
            console.log("err: ");
            console.log(err);
          });

        SInfo.setItem("accessToken", res.accessToken, {});
        SInfo.setItem("refreshToken", res.refreshToken, {});
        SInfo.setItem("idToken", res.idToken, {});
        console.log(res.idToken)
      })
      .catch(error => {
        console.log("error occurred");
        console.log(error);
      });
  };

  saveUser = async (data) => {
    const formattedData = await this.idFormatter(data.sub);
    await axios.post('https://proud-stories.herokuapp.com/users', {name: data.name, auth_id: formattedData, picture: data.picture});
    return data;
  }

  idFormatter = id => {
    const formattedId = id.replace("|", "_");
    return formattedId;
  }

  gotoTopPage = async data => {
    const formattedData = await this.idFormatter(data.sub);
    await Promise.all([
      AsyncStorage.setItem('@name', data.nickname),
      AsyncStorage.setItem('@picture', data.picture),
      AsyncStorage.setItem('@id', formattedData)
    ]);

    this.setState({
      finishedLoading: true
    });

    this.props.navigation.navigate('Home')

  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});