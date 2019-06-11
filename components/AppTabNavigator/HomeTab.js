import React, { Component } from "react";
import {
    View,
    ScrollView,
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

    // handleVideoLayout = (e) => {
    //     const { height } = Dimensions.get("window");
    //     this.position.start = e.nativeEvent.layout.y - height + THRESHOLD;
    //     this.position.end = e.nativeEvent.layout.y + e.nativeEvent.layout.height - THRESHOLD;
    // }
    handleScroll = (e) => {
        return;
        // const scrollPosition = e.nativeEvent.contentOffset.y;
        // const paused = this.state.paused;
        // const { start, end } = this.position;
        // if (true) {
        //     this.setState({ paused: false });
        // } else if ((scrollPosition > end || scrollPosition < start) && !paused) {
        //     this.setState({ paused: true });
        // }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <ScrollView onScroll={this.handleScroll}>
                    <CardComponent imageSource="1" likes="101" paused={true}/>
                    <CardComponent2 imageSource="2" likes="8117" />
                    <CardComponent2 imageSource="1" likes="201" />
                    <CardComponent imageSource="1" likes="3" paused={true}/>
                    <CardComponent2 imageSource="3" likes="8798435792" />
                    </ScrollView>
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