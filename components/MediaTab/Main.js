import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";

import AddMedia from './AddMedia'
import AddMediaInfo from './AddMediaInfo'

import { createAppContainer, createStackNavigator, create } from 'react-navigation';
import { Icon } from 'native-base'

const AppNavigator = createStackNavigator({
    AddMedia: {
        screen: AddMedia
    },
    AddMediaInfo: {
        screen: AddMediaInfo
    }
},
    {
        initialRouteName: "AddMedia"
    });

const AppTabContainer = createAppContainer(AppNavigator)

class MediaTab extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-add-circle" style={{ color: tintColor }} />
        )
    }

    render() {
        return (
            <AppTabContainer />
        );
    }
}
export default MediaTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});