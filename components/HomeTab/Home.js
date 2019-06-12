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
// import CardComponent2 from '../CardComponent2' //adding old image posts for scroll testing. Delete this later.
import ReactDOM from "react-dom";

class HomeTab extends Component {

    state = {
        videos: [
            {
                title: "Uganda Pineapples",
                description: "Pineapples of Uganda are delicious.",
                url: "https://proud-videos.s3-ap-northeast-1.amazonaws.com/video.mp4",
                likes: 100,
                paused: true
            },
            {
                title: "Pineapple wine!",
                description: "Did you know you can make wine from pineapple? It's so delicious.",
                url: "https://proud-videos.s3-ap-northeast-1.amazonaws.com/heyaheya.mp4",
                likes: 251,
                paused: true
            },
            {
                title: "Uganda Pineapples Peeling",
                description: "This is how to peel a pineapple.",
                url: "https://proud-videos.s3-ap-northeast-1.amazonaws.com/video.mp4",
                likes: 298,
                paused: true
            }
        ]
        // message: "Hello"
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
        console.log("hello world from handle scroll")
        // this.setState({ message: "Changed!" })
        // let posts = Array.from(ReactDOM.findDOMNode(this).children).filter(elt => elt.className === 'post');
        // posts.forEach(post => {
        //     post.paused = !post.paused
        // })
    }
    // const scrollPosition = e.nativeEvent.contentOffset.y;
    // const paused = this.state.paused;
    // const { start, end } = this.position;
    // if (true) {
    //     this.setState({ paused: false });
    // } else if ((scrollPosition > end || scrollPosition < start) && !paused) {
    //     this.setState({ paused: true });
    // }

    componentDidMount() {

        fetch("https://proud-stories.herokuapp.com/videos")
            .then(data => data.json())
            .then(data => {
                data.forEach(item => {
                    item.paused = true;
                    this.setState({ videos: [item, ...this.state.videos] })
                })
            })
            .catch((err) => { throw Error(err) });
    }

    componentDidUpdate() {
        console.log("Updated")
        //check if the component 

    }
    render() {
        return (
            <Container style={styles.container}>
                <Content onScroll={this.handleScroll} scrollEventThrottle={16}>
                    <View  >
                        {this.state.videos.map((video, index) => (
                            <View key={index}>
                                {/* <Text>{this.state.message}</Text> */}
                                <CardComponent className={"post"} paused={video.paused} url={video.url} title={video.title} description={video.description} likes={video.likes} />
                                {/* <CardComponent2 imageSource={String(index)} likes="404"/> */}
                            </View>
                        ))}
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