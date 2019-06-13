import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Icon } from 'native-base'
import Account from '../Account';

class ProfileTab extends Component {

    render() {
        return (
            <View style={styles.container}>
<<<<<<< HEAD:components/AppTabNavigator/ProfileTab.js
                <Account/>
=======
                <Text>ProfileHome</Text>
>>>>>>> d1606f93d64d8ad265b505e916548cda7e15e11f:components/ProfileTab/ProfileHome.js
            </View>
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