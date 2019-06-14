import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image
} from "react-native";

import { Container, Content, Icon } from 'native-base'
import CardComponent from '../../CardComponent'
// import CardComponent2 from '../CardComponent2' //adding old image posts for scroll testing. Delete this later.
//import ReactDOM from "react-dom";

class Videos extends Component {

    state = {
        videos: []
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

        fetch("http://10.0.2.2:3333/users/1/videos")
            .then(data => data.json())
            .then(data => {
                data.forEach(item => {
                    item.paused = true;
                    this.setState({ videos: [item, ...this.state.videos] })
                })
                console.warn(this.state)
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
                        {this.state.videos.map((video) => (
                            <View key={video.id}>
                                <CardComponent className={"post"} {...video} />
                            </View>
                        ))}
                    </View>
                </Content>
            </Container>
        );
    }

    onTitleChange = (event) => {
        this.setState({ title: event });
    }

    onDescriptionChange = (event) => {
        this.setState({ description: event });
    }

    uploadVideo() {
        const { navigation } = this.props;
        const file = navigation.getParam('file', null);
        RNFetchBlob.fetch('POST', 'https://proud-stories-staging.herokuapp.com/upload', {
            'Content-Type': 'multipart/form-data',
        }, [
                {
                    name: 'video', data: RNFetchBlob.wrap(file), filename: "vid.mp4"
                },
                {
                    name: 'user_id', data: "1"
                },
                {
                    name: 'title', data: this.state.title
                },
                {
                    name: 'description', data: this.state.description
                }
            ]).then((res) => {
                console.log(res)
                this.props.navigation.navigate('Home')
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
export default Videos;

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