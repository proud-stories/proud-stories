import React, { Component } from "react";
import {
    StyleSheet,
    Button
} from "react-native";

import CommentsComponent from '../CommentsComponent'
import { Toast, View, Container, Content, Item, Input } from 'native-base'
import Config from "react-native-config";
import AsyncStorage from '@react-native-community/async-storage';


class Comments extends Component {

    static navigationOptions = {
        title: "Comments"
    }

    state = {
        comments: [],
        newComment: "",
        auth_id: ""
    }

    async componentDidMount() {
        const auth_id = await AsyncStorage.getItem('@id');
        const name = await AsyncStorage.getItem('@name');
        this.setState({
            auth_id: auth_id,
            name: name
          })
        const id = this.props.navigation.getParam('id', 1);
        fetch(Config.APP_URL + `/videos/${id}/comments`)
            .then(data => data.json())
            .then(data => {
                this.setState({ comments: [...data] })
            })
            .catch(() => {
                Toast.show({ text: "We had trouble loading this video's comments.", buttonText: "Okay", type: "danger", position: "top", duration: 5000 })
            });
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content onScroll={this.handleScroll} scrollEventThrottle={16}>
                    <View  >
                        {this.state.comments.map((comment) => {
                            return (< CommentsComponent key={comment.id} {...comment} ></CommentsComponent >)
                        })
                        }
                    </View>
                </Content>
                <Item regular>
                    <Input placeholder='Post comment' value={this.state.newComment} onChangeText={this.onNewCommentChange} />
                    <Button title="Send" onPress={() => this.postComment()}></Button>
                </Item>
            </Container >)
    }

    onNewCommentChange = (event) => {
        this.setState({ newComment: event });
    }

    postComment() {
        const id = this.props.navigation.getParam('id', 1);
        fetch(Config.APP_URL + `/videos/${id}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                comment: this.state.newComment,
                auth_id: this.state.auth_id
            }),
        }).then((res) => res.json())
        .catch((err) => console.log(err))
        .then((res) => {
            Toast.show({ text: "Comment added successfully", buttonText: "Okay", type: "success", position: "top", duration: 5000 })
            this.setState({ comments: [res, ...this.state.comments] }, () => {
            })
        })
        .catch((err) => console.log(err))
    }

}
export default Comments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});