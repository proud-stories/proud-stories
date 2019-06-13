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

type Props = {};

class CardComponent extends Component<Props> {
    state = {
        paused: true,
    }

    componentDidUpdate(props, state) {
        if (this.props.playing === props.key && state.paused) {
            this.setState({ paused: false });
        }
        else if (props.playing !== props.key && !state.paused) {
            this.setState({ paused: true });
        }
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
                <CardItem cardBody style={{height:200}} >
                <Video source={{uri: this.props.url}}   // Can be a URL or a local file.
                style={{ width: Dimensions.get("window").width }}
                repeat
                paused={this.props.paused}  
                style={styles.backgroundVideo} />
                </CardItem>
                <CardItem>
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

                <CardItem>
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