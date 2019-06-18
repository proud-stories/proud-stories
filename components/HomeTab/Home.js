import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Button
} from "react-native";

import { Container, Content, Icon, Card, CardItem, Body } from 'native-base'
import CardComponent from '../CardComponent'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import Modal from "react-native-modal";
import MultiSelect from 'react-native-multiple-select'

class HomeTab extends Component {
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
            id={data.id}
            title={data.title}
            description={data.description}
            url={data.url}
            likes={data.count}
            style={{ margin: 0 }}
            key={Math.round(Math.random() * 10000000)}
        />
    }

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
                //add the items from database into state
                data.forEach(item => {
                    item.paused = false;
                    this.setState({ videos: [item, ...this.state.videos] })
                })
                console.log(this.state.videos)
                //update the dataProvider
                this.setState({
                    dataProvider:
                        new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(this.state.videos)
                })
            })
            .catch((err) => { throw Error(err) });
    }

    componentWillMount() {
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