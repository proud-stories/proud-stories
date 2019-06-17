import React, { Component } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Button
} from "react-native";

import { Container, Content, Icon, Card, CardItem, Body } from 'native-base'
import CardComponent from '../CardComponent'
import Modal from "react-native-modal";
import MultiSelect from 'react-native-multiple-select'

class HomeTab extends Component {

    state = {
        videos: [],
        visibleModal: "",
        selectedItems: [],
        categories: [],
        multiSelect: ""
    }

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{ color: tintColor }} />
        )
    }

    // handleVideoLayout = (e) => {
    //     const { height } = Dimensions.get("window");
    //     this.position.start = e.nativeEvent.layout.y - height + THRESHOLD;
    //     this.position.end = e.nativeEvent.layout.y + e.nativeEvent.layout.height - THRESHOLD;
    // }
    handleScroll = (e) => {
        console.log("hello world from handle scroll")
        // this.setState({ message: "Changed!" })
        // let posts = Array.from(ReactDOM.findDOMNode(this).children).filter(elt => elt.className === 'post');
        // posts.forEach(post => {
        //     post.paused = !post.paused
        // })
    }
    // const scrollPosition = e.nativeEvent.contentOffset.y;
    // const paused = this.state.paused;
    // const { start, end } = this.position;
    // if (true) {
    //     this.setState({ paused: false });
    // } else if ((scrollPosition > end || scrollPosition < start) && !paused) {
    //     this.setState({ paused: true });
    // }

    componentDidMount() {
        fetch("http://10.0.2.2:3333/videos")
            .then(data => data.json())
            .then(data => {
                data.forEach(item => {
                    item.paused = true;
                    this.setState({ videos: [item, ...this.state.videos] })
                })
            })
            .catch((err) => { throw Error(err) });
    }

    componentDidUpdate() {
        console.log("Updated")
        //check if the component 

    }

    componentWillMount() {
        this.loadCategories();
    }

    render() {
        const { selectedItems } = this.state;
        return (
            <Container  >
                <Button onPress={() => this.setState({ visibleModal: "fancy" })} title="Filter" />
                <Content onScroll={this.handleScroll} scrollEventThrottle={16}>
                    <View>
                        {this.state.videos.map((video) => (
                            <View key={video.id}>
                                <CardComponent className={"post"} {...video} />
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
                            <CardItem>
                                <Text>Uiii</Text>
                            </CardItem>
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

    onSelectedItemsChange = async selectedItems => {
        await this.setState({ selectedItems });
    };

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
    applyCategories() {
        this.setState({ visibleModal: null })

        fetch("http://10.0.2.2:3333/videos/filters/", {
            method: "post",
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                categories: this.state.categories,
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
export default HomeTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});