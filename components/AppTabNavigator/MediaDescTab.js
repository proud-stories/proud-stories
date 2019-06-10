import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import { Container, Header, Content, Textarea, Form } from "native-base";

class MediaDescTab extends Component {

    render() {
        return (
            <Container>
                <Header />
                <Content padder>
                    <Form>
                        <Textarea rowSpan={5} bordered placeholder="Textarea" />
                    </Form>
                </Content>
            </Container>
        );
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