import React, { Component } from "react";
import { View, Text, Image, Button } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";

import Auth0 from "react-native-auth0";
import Config from "react-native-config";
import SInfo from "react-native-sensitive-info";

const auth0 = new Auth0({
  domain: Config.AUTH0_DOMAIN,
  clientId: Config.AUTH0_CLIENT_ID
});

import {
  headerColorStyle,
  headerTextColorStyle,
  buttonStyle
} from "../styles/colors";

import styles from "../styles/Account";

export default class Account extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Account",
      headerStyle: {
        backgroundColor: headerColorStyle
      },
      headerTitleStyle: {
        color: headerTextColorStyle
      }
    };
  };

  render() {
    const { navigation } = this.props;
    const name = navigation.getParam("name");
    const picture = navigation.getParam("picture");

    return (
      <View style={styles.container}>
        {name && (
          <View style={styles.profileContainer}>
            <Image style={styles.picture} source={{ uri: picture }} />

            <Text style={styles.usernameText}>{name}</Text>
            <Button onPress={this.logout} title="Logout" color={buttonStyle} />
            <Button onPress={() => this.props.navigation.navigate('Home')} title="Top Page" color={buttonStyle} />
          </View>
        )}
      </View>
    );
  }

  logout = () => {
    SInfo.deleteItem("accessToken", {});
    SInfo.deleteItem("refreshToken", {});
  
    auth0.webAuth
      .clearSession()
      .then(res => {
        console.log("clear session ok");
      })
      .catch(err => {
        console.log("error clearing session: ", err);
      });
  
    this.gotoLogin(); // go to login screen
  };

  gotoLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Login"
        })
      ]
    });
  
    this.props.navigation.dispatch(resetAction);
  }; 
}
