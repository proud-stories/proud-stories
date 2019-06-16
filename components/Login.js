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
    auth0.webAuth
      .authorize({
        scope: Config.AUTHO_SCOPE,
        audience: Config.AUTH0_AUDIENCE,
        device: DeviceInfo.getUniqueID(),
        prompt: "login"
      })
      .then(res => {
        auth0.auth
          .userInfo({ token: res.accessToken })
          // .then(data => {
          //   return this.saveUser(data)
          // })
          .then(data => {
            this.hasInitialized = false;
            return this.gotoTopPage(data);
          })
          .catch(err => {
            console.log("err: ");
            console.log(JSON.stringify(err));
          });

        SInfo.setItem("accessToken", res.accessToken, {});
        SInfo.setItem("refreshToken", res.refreshToken, {});
      })
      .catch(error => {
        console.log("error occurred");
        console.log(error);
      });
  };

  // saveUser = async (data) => {

    // const response = await fetch('https://proud-stories-staging.herokuapp.com/users', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     name: data.name
    //   }),
    // })
    
    // const userId = response.json()
    // await AsyncStorage.setItem('@id', userId.id);
  //   return data;
  // }

  gotoTopPage = async data => {
    await AsyncStorage.setItem('@name', data.name);
    await AsyncStorage.setItem('@picture', data.picture);
    await AsyncStorage.setItem('@id', data.sub);

    this.setState({
      hasInitialized: true
    });

    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Home",
        })
      ]
    });

    this.props.navigation.dispatch(resetAction);
  };
}