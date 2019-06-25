import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Container, Button, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Auth0 from "react-native-auth0";
import Config from "react-native-config";
import SInfo from "react-native-sensitive-info";

const auth0 = new Auth0({
  domain: Config.AUTH0_DOMAIN,
  clientId: Config.AUTH0_CLIENT_ID
});

export default class Account extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Account",
    };
  };

  componentDidMount = async () => {
    await this.getData();
    this.getBalaence();
  }

  componentWillReceiveProps() {
    const newAmount = this.props.navigation.getParam('amount', "error");
    console.log(this.props.navigation.getParam('amount', "error"))
    this.setState({
      amount: this.state.amount + newAmount
    })
    console.log(this.state.balance)
  }

  state = {
    name: "",
    picture: "",
    balance: "",
    id: ""
  }

  getData = async () => {
    try {
      const name = await AsyncStorage.getItem('@name');
      const picture = await AsyncStorage.getItem('@picture');
      const id = await AsyncStorage.getItem('@id');
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
      const balance = await axios.get(Config.APP_URL + `/users/${this.state.id}/balance`);
      this.setState({
        balance: balance.data.balance
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
          <Button style={{ marginBottom: 5, backgroundColor: '#930077' }} block onPress={() => this.props.navigation.navigate('MyVideos')}><Text>My Videos</Text></Button>
          <Button style={{ marginBottom: 5, backgroundColor: '#e4007c' }} block onPress={() => this.props.navigation.navigate('Payment')}><Text>Charge my credits</Text></Button>
          <Button style={{ marginBottom: 5, backgroundColor: '#ffbd39' }} block onPress={this.logout}><Text>Logout</Text></Button>
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
    this.props.navigation.navigate("Login");
  };

}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	usernameText: {
		fontSize: 17,
		fontWeight: "bold",
		marginTop: 10,
		marginBottom: 10
	},
	credit: {
		fontSize: 17,
		marginTop: 10,
		marginBottom: 30
	},
	picture: {
		width: 80,
		height: 80
	}
});