import React, { Component } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import Auth0 from "react-native-auth0";
import Config from "react-native-config";
import DeviceInfo from "react-native-device-info";
import SInfo from "react-native-sensitive-info";
import RNRestart from "react-native-restart";
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Button, Text } from 'native-base';
import axios from "axios"

import {
  headerColorStyle,
  headerTextColorStyle,
  buttonStyle
} from "../styles/colors";
import styles from "../styles/Login";

const auth0 = new Auth0({
  domain: Config.AUTH0_DOMAIN,
  clientId: Config.AUTH0_CLIENT_ID
});

export default class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Login",
      headerStyle: {
        backgroundColor: headerColorStyle
      },
      headerTitleStyle: {
        color: headerTextColorStyle
      }
    };
  };

  state = {
    hasInitialized: false,
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
          hasInitialized: true
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
            animating={!this.state.hasInitialized}
          />
          {this.state.hasInitialized && (
            <Button info block onPress={this.login} color={buttonStyle}>
              <Text>Login/Register</Text>
            </Button>
          )}
        </View>
      </Container>
    );
  }

  login = () => {
    this.setState({
      hasInitialized: true
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
          hasInitialized: false
        })
        auth0.auth
          .userInfo({ token: res.accessToken })
          .then(data => {
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
      })
      .catch(error => {
        console.log("error occurred");
        console.log(error);
      });
  };

  saveUser = async (data) => {
    await axios.post('https://proud-stories.herokuapp.com/users', {name: data.name, auth_id: data.sub});
    return data;
  }

  gotoTopPage = async data => {
    console.log('saving to data storeage', data)
    await Promise.all([
      AsyncStorage.setItem('@name', data.name),
      AsyncStorage.setItem('@picture', data.picture),
      AsyncStorage.setItem('@id', data.sub)
    ]);
    console.log('saved to data storeage', data)
    this.setState({
      hasInitialized: true
    });


    console.log(this.props)
    this.props.navigation.navigate('Home')

  };
}