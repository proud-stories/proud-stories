import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableWithoutFeedback
} from "react-native";
import Video from 'react-native-video';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon, Toast } from 'native-base'
import Moment from 'react-moment';
import { withNavigation } from 'react-navigation'
import Config from "react-native-config";


class CardComponent extends Component {

    state = {
        paused: true,
        didLike: this.props.liked,
        likes: Number(this.props.likes)
    }

    handleClick = () => {
        this.setState({ paused: !this.state.paused })
    }

    render() {
        console.log(this.props)
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
                <TouchableWithoutFeedback onPress={this.handleClick}>
                    <CardItem cardBody style={{ height: 220 }}>
                        <Video
                            source={{ uri: this.props.url }}   // Can be a URL or a local file.
                            style={{ width: Dimensions.get("window").width, margin: 0 }}
                            repeat
                            paused={this.state.paused}
                            style={styles.backgroundVideo} />
                    </CardItem>
                </TouchableWithoutFeedback>
                <CardItem>
                    <Left>
                        <Button transparent onPress={() => this.likeVideo()}>
                            <Icon name={this.state.didLike ? "heart" : "heart-o"} type="FontAwesome" style={{ color: this.state.didLike ? "red" : "black" }} />
                        </Button>
                        <Button transparent onPress={() => this.openComments()}>
                            <Icon name="bubbles" type="SimpleLineIcons" style={{ color: 'black' }} />
                        </Button>
                        <Button transparent onPress={() => this.editVideo()}>
                            <Icon name="edit" type="FontAwesome" style={{ color: 'black' }} />
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

    editVideo = () => {
        this.props.navigation.navigate('EditVideo', { ...this.props })
    }

    likeVideo() {
        let prevLiked = this.state.didLike;
        this.setState({ didLike: true, likes: this.state.likes + 1 });
        fetch(Config.APP_URL + `/videos/${this.props.id}/likes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                user_id: 1,
            }),
        }).then(res => res.json())
            .then(res => {
                if (res.status !== 200)
                    this.setState({ didLike: prevLiked, likes: this.state.likes - 1 });

                if (res.status === 500) {
                    Toast.show({ text: res.error, buttonText: "Okay", type: "danger", position: "top", duration: 5000 })
                }
            }).catch((err) => {
                console.error(err)
            })
    }

    openComments = () => {
        this.props.navigation.navigate('Comments', { id: this.props.video_id })
    }
}
export default withNavigation(CardComponent);

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