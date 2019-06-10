import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";
import Video from 'react-native-video';

import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base'

type Props = {};
class CardComponent extends Component<Props> {

    render() {

        const images = {

            "1": require('../assets/feed_images/1.jpg'),
            "2": require('../assets/feed_images/2.jpg'),
            "3": require('../assets/feed_images/3.png')
        }

        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../assets/me.png')} style={{ height: 32, width: 32 }} />
                        <Body>
                            <Text>Varun </Text>
                            <Text style={{ fontSize: 12 }} >Jan 15, 2018</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody style={{ height: 200 }}>
                <Video source={{uri: "https://proud-videos.s3-ap-northeast-1.amazonaws.com/video.mp4"}}   // Can be a URL or a local file.
               ref={(ref) => {
                this.player = ref
              }}  
          onBuffer={this.onBuffer}                // Callback when remote video is buffering
          onError={this.videoError}               // Callback when video cannot be loaded
          style={styles.backgroundVideo} />
                    {/* <Image source={images[this.props.imageSource]} style={{ height: 200, width: null, flex: 1 }} /> */}
                </CardItem>
                <CardItem style={{ height: 45 }}>
                    <Left>
                        <Button transparent>
                            <Icon name="heart-o" type="FontAwesome" style={{ color: 'black' }} />
                        </Button>
                        <Button transparent>
                            <Icon name="bubbles" type="SimpleLineIcons" style={{ color: 'black' }} />
                        </Button>


                    </Left>
                </CardItem>

                <CardItem style={{ height: 10 }}>
                    <Text>{this.props.likes} likes </Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            <Text style={{ fontWeight: "900" }}>varun
                            </Text>
                            Ea do Lorem occaecat laborum do. Minim ullamco ipsum minim eiusmod dolore cupidatat magna exercitation amet proident qui. Est do irure magna dolor adipisicing do quis labore excepteur. Commodo veniam dolore cupidatat nulla consectetur do nostrud ea cupidatat ullamco labore. Consequat ullamco nulla ullamco minim.
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
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