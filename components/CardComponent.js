import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions
} from "react-native";
import Video from 'react-native-video';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'
import Toast from 'react-native-root-toast';
import { whileStatement } from "@babel/types";
import Moment from 'react-moment';

const THRESHOLD = 10000;

class CardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            paused: true,
            didLike: props.didLike,
            likes: Number(props.count)
        }
        console.log(this.props)
    }

    render() {
        const dateToFormat = this.props.created_at;
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../assets/me.png')} style={{ height: 32, width: 32 }} />
                        <Body>
                            <Text>Username </Text>
                            <Text style={{ fontSize: 12 }} ><Moment element={Text} fromNow>{dateToFormat}</Moment></Text>
                        </Body>
                    </Left>
                </CardItem>
                {/* const { width } = Dimensions.get("window"); */}
                <CardItem cardBody style={{ height: 200 }}>
                    <Video source={{ uri: this.props.url }}   // Can be a URL or a local file.
                        style={{ width: Dimensions.get("window").width, margin: 0 }}
                        ref={(ref) => {
                            this.player = ref
                        }}
                        repeat
                        paused={this.props.paused}
                        //   onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        //   onError={this.videoError}               // Callback when video cannot be loaded
                        style={styles.backgroundVideo} />
                </CardItem>
                <CardItem style={{ height: 45 }}>
                    <Left>
                        <Button transparent onPress={() => this.likeVideo()}>
                            <Icon name={this.state.didLike ? "heart" : "heart-o"} type="FontAwesome" style={{ color: 'black' }} />
                        </Button>
                        <Button transparent>
                            <Icon name="bubbles" type="SimpleLineIcons" style={{ color: 'black' }} />
                        </Button>


                    </Left>
                </CardItem>

                <CardItem style={{ height: 10 }}>
                    <Text>{this.state.likes} likes </Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            <Text style={{ fontWeight: "900" }}>username   </Text>
                            {this.props.description}
                        </Text>
                    </Body>
                </CardItem>
            </Card >
        );
    }

    likeVideo() {
        this.setState({ didLike: true, likes: this.state.likes + 1 });
        fetch('http://10.0.2.2:3333/videos/likes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                videoId: this.props.id,
                userId: 1,
            }),
        }).then(res => res.json())
            .then(res => {
                console.log(res.status)
                if (res.status !== 200)
                    this.setState({ didLike: false, likes: this.state.likes - 1 });

                let isShowing = false;

                if (res.status === 500) {
                    if (!isShowing)
                        Toast.show(res.error, {
                            duration: Toast.durations.LONG,
                            position: Toast.positions.TOP,
                            shadow: true,
                            backgroundColor: "crimson",
                            textColor: "white",
                            opacity: 1,
                            animation: true,
                            hideOnPress: true,
                            onShow: () => {
                                isShowing = true;
                            },
                            onHide: () => {
                                isShowing = false;
                            }
                        }
                        )
                }
            }).catch((err) => {
                console.error(err)
            })
    }
}
export default CardComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});