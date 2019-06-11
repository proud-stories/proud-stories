import React, { Component } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    FlatList,
    Dimensions
} from "react-native";

import { Container, Content, Icon } from 'native-base'
import CardComponent from '../CardComponent'
import CardComponent2 from '../CardComponent2' //adding old image posts for scroll testing. Delete this later.

type Props = {};
class HomeTab extends Component<Props> {

    state = {
        videos: [
            {
                title: "Uganda Pineapples",
                description: "Pineapples of Uganda are very special.",
                url: "https://proud-videos.s3-ap-northeast-1.amazonaws.com/video.mp4",
                paused: true
            },
            {
                title: "Uganda Pineapples 2",
                description: "Pineapples of Uganda are back in the exciting sequel.",
                url: "https://proud-videos.s3-ap-northeast-1.amazonaws.com/video.mp4",
                paused: true
            },
            {
                title: "Uganda Pineapples 3",
                description: "Pineapples of Uganda are back in the exciting sequel.",
                url: "https://proud-videos.s3-ap-northeast-1.amazonaws.com/video.mp4",
                paused: true
            }
        ],
        message: "Hello"
    }

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
        this.setState({ message: "Changed!" })
    }
        // const scrollPosition = e.nativeEvent.contentOffset.y;
        // const paused = this.state.paused;
        // const { start, end } = this.position;
        // if (true) {
        //     this.setState({ paused: false });
        // } else if ((scrollPosition > end || scrollPosition < start) && !paused) {
        //     this.setState({ paused: true });
        // }
    
    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    {/* <Text>{this.state.message}</Text> */}
                    <View  >
                    <FlatList style={styles.flatview} data={this.state.videos} showVerticalScrollIndicator={false} renderItem={({item}) => (
                        <View style={styles.flatview}>
                        <CardComponent paused={true} url={item.url} title={item.title} description={item.description}/>
                        {/* <CardComponent2 imageSource={String(1)} likes="404"/> */}
                        </View>
                    )} keyExtractor={item => item.title} />
{/* 
                    <ScrollView onScroll={this.handleScroll} scrollEventThrottle={16}>
                    {this.state.videos.map((video, index) => (
                        <View>
                        <Text>{this.state.message}</Text>
                        <CardComponent paused={video.paused} url={video.url} title={video.title} description={video.description} />
                        <CardComponent2 imageSource={String(index)} likes="404"/>
                        </View>
                    ))}
                    </ScrollView> */}

                    {/* <CardComponent imageSource="1" likes="101" paused={true}/>
                    <CardComponent2 imageSource="2" likes="8117" />
                    <CardComponent2 imageSource="1" likes="201" />
                    <CardComponent imageSource="1" likes="3" paused={true}/> */}
                    {/* <CardComponent2 imageSource="3" likes="8798435792" /> */}
                    </View>
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
    },
    flatview: {
        // justifyContent: 'center',
        paddingTop: 30,
        borderRadius: 2,
        borderColor: 'red',
        borderWidth: 1,
        height: 400
      }
});