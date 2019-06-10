import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";

import HomeTab from './AppTabNavigator/HomeTab'
import AddMediaTab from './AppTabNavigator/AddMediaTab'
import ProfileTab from './AppTabNavigator/ProfileTab'
import MediaDescTab from './AppTabNavigator/MediaDescTab'

import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Icon } from 'native-base'

const AppTabNavigator = createMaterialTopTabNavigator({
    HomeTab: HomeTab,
    AddMediaTab: AddMediaTab,
    ProfileTab: ProfileTab,
    MediaDescTab: MediaDescTab,
}, {
        animationEnabled: true,
        swipeEnabled: true,
        lazy: true,
        tabBarPosition: "bottom",
        tabBarOptions: {
            style: {
                ...Platform.select({
                    android: {
                        backgroundColor: 'white'
                    }
                })
            },
            activeTintColor: '#000',
            inactiveTintColor: '#d1cece',
            showLabel: false,
            showIcon: true
        }
    }
)

const AppTabContainer = createAppContainer(AppTabNavigator)

class MainScreen extends Component {

    static navigationOptions = {
        title: "ProudStories"
    }

    render() {
        return (
            <AppTabContainer />
        );
    }
}
export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});