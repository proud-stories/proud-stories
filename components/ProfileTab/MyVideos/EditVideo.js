import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image
} from "react-native";

import { Container, Header, Content, Textarea, Form, Text, Item, Button, Input, Toast } from "native-base";
import RNFetchBlob from 'rn-fetch-blob'

class MediaDescTab extends Component {

    state = {
        ...this.props.navigation.state.params
    }
    render() {
        return (
            <Container>
                <Content padder>
                    <Item regular>
                        <Input placeholder='Title' value={this.state.title} onChangeText={this.onTitleChange} />
                    </Item>
                    <Form>
                        <Textarea rowSpan={5} value={this.state.description} bordered placeholder="Description"
                            onChangeText={this.onDescriptionChange} />
                    </Form>
                    <Button onPress={() => this.saveVideo()}>
                        <Text>Save</Text>
                    </Button>
                    <Button danger>
                        <Text>Delete Video</Text>
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

    saveVideo() {
        fetch(`http://10.0.2.2:3333/videos/${this.state.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
            }),
        }).then(res => res.json())
            .then(res => {
                if (res.status === 500) {
                    Toast.show({ text: res.error, buttonText: "Okay", type: "danger", position: "top", duration: 5000 })
                }
                if (res.status === 200) {
                    Toast.show({ text: "Video has been successfully saved", buttonText: "Okay", type: "success", position: "top", duration: 5000 })
                }
            }).catch((err) => {
                Toast.show({ text: "We had trouble reaching the service. Please try again later.", buttonText: "Okay", type: "danger", position: "top", duration: 5000 })
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