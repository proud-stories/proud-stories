import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";

import Account from '../Account'

import { createAppContainer, createStackNavigator, create } from 'react-navigation';
import { Icon } from 'native-base'
import Login from "../Login"

const AppNavigator = createStackNavigator({
    ProfileHome: {
        screen: Account
    },
    Login: {
        screen: Login
    }
},
{
    initialRouteName: "ProfileHome",
    headerMode: "none"
    });

const AppTabContainer = createAppContainer(AppNavigator)

class ProfileTab extends Component {

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
export default ProfileTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});