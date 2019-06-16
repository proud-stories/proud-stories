import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image
} from "react-native";

import { Container, Header, Content, Textarea, Form, Text, Item, Button, Input, Toast, Body } from "native-base";
import RNFetchBlob from 'rn-fetch-blob'
import MultiSelect from 'react-native-multiple-select'

class MediaDescTab extends Component {

    componentWillMount() {
        this.loadCategories();
    }

    state = {
        selectedItems: [],
        categories: [],
        multiSelect: ""
    };

    onSelectedItemsChange = async selectedItems => {
        await this.setState({ selectedItems });
    };

    render() {
        const { selectedItems } = this.state;
        return (
            <Container>
                <Item regular>
                    <Input placeholder='Title' onChangeText={this.onTitleChange} />
                </Item>
                <Form>
                    <Textarea rowSpan={5} bordered placeholder="Description"
                        onChangeText={this.onDescriptionChange} />
                </Form>
                <MultiSelect
                    hideTags
                    items={this.state.categories}
                    uniqueKey="id"
                    displayKey="name"
                    ref={(component) => { this.state.multiSelect = component }}
                    hideSubmitButton={true}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText="Pick Tags"
                    searchInputPlaceholderText="Search Tags..."
                    altFontFamily="ProximaNova-Light"
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor="#CCC"
                    submitButtonText="Save"
                />
                <View>
                    {
                        this.state.multiSelect
                            ?
                            this.state.multiSelect.getSelectedItemsExt(selectedItems)
                            :
                            null
                    }
                </View>
                <Body style={{ flexDirection: 'row' }}>
                    <Button style={styles.buttons} onPress={() => this.uploadVideo()}>
                        <Text>Save</Text>
                    </Button>
                </Body>
            </Container >
        );
    }

    onTitleChange = (event) => {
        this.setState({ title: event });
    }

    onDescriptionChange = (event) => {
        this.setState({ description: event });
    }

    loadCategories() {
        fetch("http://10.0.2.2:3333/categories")
            .then(res => res.json())
            .then(res => {
                if (res.status === 200) {
                    this.setState({ categories: res.categories })
                }
                else {
                    Toast.show({ text: res.error, buttonText: "Okay", type: "danger", position: "top", duration: 5000 })
                }
            })
            .catch((err) => {
                Toast.show({ text: err, buttonText: "Okay", type: "danger", position: "top", duration: 5000 })
            });
    }

    uploadVideo = () => {
        const { navigation } = this.props;
        const file = navigation.getParam('file', null);
        RNFetchBlob.fetch('POST', 'http://10.0.2.2:3333/upload', {
            'Content-Type': 'multipart/form-data',
        }, [
                {
                    name: 'video', data: RNFetchBlob.wrap(file), filename: "vid.mp4"
                },
                {
                    name: 'user_id', data: "1"
                },
                {
                    name: 'title', data: this.state.title
                },
                {
                    name: 'description', data: this.state.description
                },
                {
                    name: 'categories', data: JSON.stringify(this.state.selectedItems)
                }
            ]).then((res) => {
                Toast.show({ text: "Video uploaded successfully", buttonText: "Okay", type: "success", position: "top", duration: 5000 })
                this.props.navigation.navigate('Home')

            })
            .catch((err) => {
                Toast.show({ text: "We couldn't reach our service. Please try again later.", buttonText: "Okay", type: "danger", position: "top", duration: 5000 })
            })
    }
}
export default MediaDescTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5
    }
});