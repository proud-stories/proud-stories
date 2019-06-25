import React, { Component } from "react";
import {
    StyleSheet
} from "react-native";

import CommentsComponent from '../CommentsComponent'
import { Toast, View, Container, Content } from 'native-base'


class Comments extends Component {

    static navigationOptions = {
        title: "Replies"
    }

    state = {
        replies: []
    }

    componentWillMount() {
        fetch("https://proud-stories.herokuapp.com/comments/1/replies")
            .then(data => data.json())
            .then(data => {
                this.setState({ comments: [...data] })
            })
            .catch(() => {
                Toast.show({ text: "We had trouble loading this comments replies.", buttonText: "Okay", type: "danger", position: "top", duration: 5000 })
            });
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content onScroll={this.handleScroll} scrollEventThrottle={16}>
                    <View  >
                        < CommentsComponent {...this.props.comment}></CommentsComponent >
                    </View>
                    {this.state.replies.map((comment) => {
                        return (< CommentsComponent key={comment.id} {...comment}></CommentsComponent >)
                    })
                    }
                </Content>
            </Container>)
    }

}
export default Comments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});