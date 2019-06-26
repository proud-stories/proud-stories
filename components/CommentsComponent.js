import React, { Component } from "react";
import {
    StyleSheet,
} from "react-native";
import Moment from 'react-moment';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { withNavigation } from 'react-navigation'


class Comments extends Component {
    
    componentDidMount() {
        console.log(this.props)
    }
    render() {
        const dateToFormat = this.props.created_at;
        return (
            <Card style={{ flex: 0 }}>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../assets/me.png')} style={{ height: 30, width: 30 }} />
                        <Body>
                            <Text style={{ fontSize: 12 }}>{this.props.name || "anonymous"}</Text>
                            <Text style={{ fontSize: 12 }} note><Moment element={Text} fromNow>{dateToFormat}</Moment></Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            {this.props.comment}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent >
                            <Icon name={"heart"} type="FontAwesome" style={{ color: "black" }} />
                        </Button>
                        <Button transparent>
                            <Icon name="bubbles" type="SimpleLineIcons" style={{ color: 'black' }} />
                        </Button>
                    </Left>
                </CardItem>
            </Card>
        )
    }

    viewReplies() {
        this.props.navigation.navigate('Replies')
    }

}
export default withNavigation(Comments);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});