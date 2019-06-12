import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image
} from "react-native";

import { Container, Header, Content, Textarea, Form, Text, Item, Button, Input } from "native-base";
import RNFetchBlob from 'rn-fetch-blob'

class MediaDescTab extends Component {

    state = {
        description: "",
        title: ""
    }
    render() {
        return (
            <Container>
                <Content padder>
                    <Item regular>
                        <Input placeholder='Title' onChangeText={this.onTitleChange} />
                    </Item>
                    <Form>
                        <Textarea rowSpan={5} bordered placeholder="Description"
                            onChangeText={this.onDescriptionChange} />
                    </Form>
                    <Button onPress={() => this.uploadVideo()}>
                        <Text>Upload</Text>
                    </Button>
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
                    name: 'user_id', data: "6"
                },
                {
                    name: 'title', data: this.state.title
                },
                {
                    name: 'description', data: this.state.description
                }
            ]).then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
export default MediaDescTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});