import React, { Component } from "react";
import { View, Image } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import { Container, Content, Button, Text } from 'native-base';

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
      <Container>
        {name && (
          <View style={styles.container}>
            <Image style={styles.picture} source={{ uri: picture }} />

            <Text style={styles.usernameText}>{name}</Text>
            <Button info style={{marginBottom: 5, backgroundColor: '#930077'}} block><Text>My Videos</Text></Button>
            <Button success style={{marginBottom: 5, backgroundColor: '#e4007c'}} block><Text>Charge my credits</Text></Button>
            <Button danger style={{marginBottom: 5, backgroundColor: '#ffbd39'}} block onPress={this.logout} ><Text>Logout</Text></Button>
            <Button block info onPress={() => this.props.navigation.navigate('Home')}><Text>Top Page</Text></Button>
          </View>
        )}
      </Container>
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
