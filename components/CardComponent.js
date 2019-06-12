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

const THRESHOLD = 10000;

type Props = {};

class CardComponent extends Component<Props> {
    state = {
        paused: true,
    }

    render() {

        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../assets/me.png')} style={{ height: 32, width: 32 }} />
                        <Body>
                            <Text>Username </Text>
                            <Text style={{ fontSize: 12 }} >Jan 15, 2018</Text>
                        </Body>
                    </Left>
                </CardItem>
                {/* const { width } = Dimensions.get("window"); */}
                <CardItem cardBody style={{ height: 200 }}>
                <Video source={{uri: "https://proud-videos.s3-ap-northeast-1.amazonaws.com/video.mp4"}}   // Can be a URL or a local file.
                style={{ width: Dimensions.get("window").width, margin:0 }}
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
                        <Text>{this.props.title}     </Text>
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
                            <Text style={{ fontWeight: "900" }}>username   </Text>
                            {this.props.description}
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