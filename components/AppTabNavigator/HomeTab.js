import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import { Container, Content, Icon } from 'native-base'
import CardComponent from '../CardComponent'
import CardComponent2 from '../CardComponent2' //adding old image posts for scroll testing. Delete this later.

type Props = {};
class HomeTab extends Component<Props> {

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{ color: tintColor }} />
        )
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <CardComponent imageSource="1" likes="101" />
                    <CardComponent2 imageSource="2" likes="8117" />
                    <CardComponent2 imageSource="1" likes="201" />
                    <CardComponent imageSource="1" likes="3" />
                    <CardComponent2 imageSource="3" likes="8798435792" />
                </Content>
            </Container>
        );
    }
}
export default HomeTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});