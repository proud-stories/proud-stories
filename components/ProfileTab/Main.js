import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";

import Account from './Account'
import Login from "../Login"
import MyVideos from "./MyVideos/Videos"
import EditVideo from "./MyVideos/EditVideo"
import Payment from "../Payment/Payment"
import CardFormScreen from '../Payment/CardFormScreen'

import { createAppContainer, createStackNavigator, create } from 'react-navigation';
import { Icon, Root } from 'native-base'

const AppNavigator = createStackNavigator({
    ProfileHome: {
        screen: Account
    },
    Login: {
        screen: Login
    },
    MyVideos: {
        screen: MyVideos
    },
    EditVideo: {
        screen: EditVideo
    },
    Payment: {
        screen: Payment
    },
    CardFormScreen: {
        screen: CardFormScreen
    }
},
    {
        initialRouteName: "ProfileHome"
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