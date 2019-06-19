import React, { Component } from "react";
import Login from "./Login";
import { createStackNavigator, createAppContainer } from "react-navigation";

const LoginNavigator = createStackNavigator(
  {
    Login: {
      screen: Login
    }
  },
  {
    initialRouteName: "Login",
    headerMode: "none" // show the login screen by default
  }
);

const LoginContainer = createAppContainer(LoginNavigator);

export default class App extends Component {
  render() {
    return <LoginContainer />;
  }
}
