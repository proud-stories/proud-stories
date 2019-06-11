import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Icon } from 'native-base'
import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Select Avatar',
    mediaType: 'video',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class AddMediaTab extends Component {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-add-circle" style={{ color: tintColor }} />
        )
    }

    render() {
        const { isFocused } = this.props;
        return (
            <View style={styles.container}>
                <Text>AddMediaTab</Text>
            </View>
        );
    }

    componentWillMount() {
        const { goBack } = this.props.navigation;
        const didBlurSubscription = this.props.navigation.addListener(
            'willFocus',
            payload => {
                ImagePicker.launchImageLibrary(options, (response) => {
                    console.log('Response = ', response);

                    if (response.didCancel) {
                        goBack();
                    } else if (response.error) {
                        goBack();
                    } else {
                        const source = { uri: response.uri };
                    }
                });
            }
        );
    }
}
export default AddMediaTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}); 