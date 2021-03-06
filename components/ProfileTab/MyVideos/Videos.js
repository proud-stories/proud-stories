import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Button,
    Image
} from "react-native";

import CardComponent from '../../CardComponent'
import { Container, Content, Icon, Card, CardItem, Body, Header } from 'native-base'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import Modal from "react-native-modal";
import MultiSelect from 'react-native-multiple-select'
import Config from "react-native-config";


class Videos extends Component {

    static navigationOptions = {
        title: "My videos"
    }

    constructor(args) {
        super(args);
        this.state = {
            videos: [],
            visibleModal: "",
            selectedItems: [],
            categories: [],
            multiSelect: ""

        }
        this.state.dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(this.state.videos)

        this._layoutProvider = new LayoutProvider(_index => 'card', (_type, dim) => {
            dim.width = Dimensions.get('window').width;
            dim.height = 420;
        });
        this._renderRow = this._renderRow.bind(this)
    }


    _renderRow(_type, data, index) {
        return <CardComponent
            className={'card'}
            {...data}
            style={{ margin: 0 }}
            key={Math.round(Math.random() * 10000000)}
        />
    }

    componentDidMount() {
        fetch(Config.APP_URL + "/users/" + this.state.id + "/videos")
            .then(data => data.json())
            .then(data => {
                data.forEach(item => {
                    item.paused = false;
                    this.setState({ videos: [item, ...this.state.videos] })
                })
                this.setState({
                    dataProvider:
                        new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(this.state.videos)
                })
            })
            .catch((err) => { throw Error(err) });

        this.loadCategories();
    }

    render() {

        const { selectedItems } = this.state;
        return (
            <Container style={styles.container}>
                <Button onPress={() => this.setState({ visibleModal: "fancy" })} title="Filter" />
                <RecyclerListView
                    style={{ height: Dimensions.get('window').height * .8, width: Dimensions.get('window').width }}
                    rowRenderer={this._renderRow}
                    dataProvider={this.state.dataProvider}
                    layoutProvider={this._layoutProvider}
                />
                <Content>
                    <View>
                        {this.state.videos.map((video) => (
                            <View key={video.id}>
                                <CardComponent className={"post"} {...video} editVideo={() => this.editVideo(video)} />
                            </View>
                        ))}
                    </View>
                </Content>
                <Modal
                    isVisible={this.state.visibleModal === 'fancy'}
                    backdropColor="#dbdbdb"
                    backdropOpacity={0.8}
                    animationIn="zoomInDown"
                    animationOut="zoomOutUp"
                    animationInTiming={600}
                    animationOutTiming={600}
                    backdropTransitionInTiming={600}
                    backdropTransitionOutTiming={600}
                >
                    <View style={styles.content}>
                        <Card>
                            <MultiSelect
                                style={{ marginLeft: 5, marginRight: 5 }}
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
                        </Card>
                        <Button
                            onPress={() => this.applyCategories()}
                            title="Save"
                        />
                    </View>
                </Modal>
            </Container>
        );
    }

    onTitleChange = (event) => {
        this.setState({ title: event });
    }

    onDescriptionChange = (event) => {
        this.setState({ description: event });
    }

    editVideo = (video) => {
        this.props.navigation.navigate('EditVideo', { ...video })
    }

    onSelectedItemsChange = async selectedItems => {
        await this.setState({ selectedItems });
    };

    loadCategories() {
        fetch(Config.APP_URL + "/categories")
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
    applyCategories() {
        this.setState({ visibleModal: null })
        fetch(Config.APP_URL + "/video_filters/", {
            method: "post",
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                categories: this.state.selectedItems,
            }),
        })
            .then(data => data.json())
            .then(data => {
                this.setState({ videos: [] }, () => {
                    data.forEach(item => {
                        item.paused = true;
                        this.setState({ videos: [item, ...this.state.videos] })
                    })
                })
            })
            .catch((err) => { throw Error(err) });
    }
}
export default Videos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});