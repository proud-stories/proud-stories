import React, { Component } from "react";
import { View, Image } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import { Container, Content, Button, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
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
} from "../../styles/colors";

import styles from "../../styles/Account";

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

  componentDidMount() {
    this.getData();
    this.getBalance();
  }

  state = {
    name: "",
    picture: "",
    balance: ""
  }


  getData = async () => {
    try {
      const name = await AsyncStorage.getItem('@name');
      const picture = await AsyncStorage.getItem('@picture');
      const id = await AsyncStorage.getItem('@id')
      this.setState({
        name: name,
        picture: picture,
        id: id
      })
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  getBalance = async () => {
    try {
      const balance = await fetch(`https://proud-stories.herokuapp.com/users/1/balance`)
      const json = await balance.json();
      this.setState({
        balance: json.balance
      })
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Image style={styles.picture} source={{ uri: this.state.picture }} />

          <Text style={styles.usernameText}>{this.state.name}</Text>

          <Text style={styles.credit}>Your current credit is: {this.state.balance}</Text>
          <Button info style={{ marginBottom: 5, backgroundColor: '#930077' }} block onPress={() => this.props.navigation.navigate('MyVideos')}><Text>My Videos</Text></Button>
          <Button success style={{ marginBottom: 5, backgroundColor: '#e4007c' }} block onPress={() => this.props.navigation.navigate('Payment')}><Text>Charge my credits</Text></Button>
          <Button danger style={{ marginBottom: 5, backgroundColor: '#ffbd39' }} block onPress={this.logout}><Text>Logout</Text></Button>
        </View>
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
    // const resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [
    //     NavigationActions.navigate({
    //       routeName: "Login"
    //     })
    //   ]
    // });

    this.props.navigation.navigate("Login");
  };

}