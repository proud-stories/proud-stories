import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";

import Home from './Home'

import { createAppContainer, createStackNavigator, create } from 'react-navigation';
import { Icon } from 'native-base'

const AppNavigator = createStackNavigator({
    Home: {
        screen: Home
    }
},
    {
        initialRouteName: "Home",
        headerMode: "none"
    });

const AppTabContainer = createAppContainer(AppNavigator)

class HomeTab extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="person" style={{ color: tintColor }} />
        )
    }

    render() {
        return (
            <AppTabContainer />
        );
    }
}
export default HomeTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});