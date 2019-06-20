import React, {
  Component
} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import MainScreen from './components/MainScreen'
import Login from "./components/Login";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const AppNavigator = createSwitchNavigator({
  Home: {
    screen: MainScreen
  },
  Login: {
    screen: Login
  }
}, {
    initialRouteName: "Home", // show the login screen by default
    headerMode: "none"
  });

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});