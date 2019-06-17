import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";

import HomeTab from './HomeTab/Main'
import ProfileTab from './ProfileTab/Main'
import MediaTab from './MediaTab/Main'

import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Root } from 'native-base'

const AppTabNavigator = createMaterialTopTabNavigator({
    HomeTab: HomeTab,
    AddMediaTab: MediaTab,
    ProfileTab: ProfileTab,
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
        },
        headerMode: "none"
    }
)

const AppTabContainer = createAppContainer(AppTabNavigator)

class MainScreen extends Component {

    static navigationOptions = {
        title: "ProudStories"
    }

    render() {
        return (
            <Root>
                <AppTabContainer />
            </Root>
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