import React, { Component } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    FlatList,
    Dimensions
} from "react-native";

import { Container, Content, Icon } from 'native-base'
import CardComponent from '../CardComponent'
// import CardComponent2 from '../CardComponent2' //adding old image posts for scroll testing. Delete this later.
//import ReactDOM from "react-dom";
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

class HomeTab extends Component {
    constructor(args) {
        super(args);
        this.state = {
            videos: [
                {
                    title: "Uganda Pineapples",
                    description: "Pineapples of Uganda are delicious.",
                    url: "https://proud-videos.s3-ap-northeast-1.amazonaws.com/waits.mp4",
                    likes: 100,
                    paused: true,
                    id: 1
                },
                {
                    title: "Pineapple wine!",
                    description: "Did you know you can make wine from pineapple? It's so delicious.",
                    url: "https://proud-videos.s3-ap-northeast-1.amazonaws.com/waits.mp4",
                    likes: 251,
                    paused: true,
                    id:2
                },
                {
                    title: "Uganda Pineapples Peeling",
                    description: "This is how to peel a pineapple.",
                    url: "https://proud-videos.s3-ap-northeast-1.amazonaws.com/video.mp4",
                    likes: 298,
                    paused: true,
                    id:3
                },
                {
                    title: "Uganda Pineapples Peeling",
                    description: "This is how to peel a pineapple.",
                    url: "https://proud-videos.s3-ap-northeast-1.amazonaws.com/waits.mp4",
                    likes: 298,
                    paused: true,
                    id: 4
                }
            ],
            playing: 0
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
            title={data.title}
            description={data.description}
            url={data.url}
            likes={data.likes}
            style={{margin:0}}
            key={data.id}
            paused={data.id === this.state.playing}
            playing={this.state.playing}
        />
    }

    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{ color: tintColor }} />
        )
    }


    onScroll = (e) => {
        let playing = Math.round( (e.nativeEvent.contentOffset.y)/420 );
        if (this.state.playing !== playing) {
            this.setState({ playing })
        }
        console.log("playing is", this.state.playing)
        console.log("offset is ", e.nativeEvent.contentOffset.y, e.nativeEvent.contentOffset.y/420)
    }

    componentDidMount() {
        console.log("Mounted!")
        fetch("https://proud-stories.herokuapp.com/videos")
            .then(data => data.json())
            .then(data => {
                //add the items from database into state
                data.forEach(item => {
                    item.paused = false;
                    this.setState({ videos: [item, ...this.state.videos] })
                })
                //update the dataProvider
                this.setState({ dataProvider:
                    new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(this.state.videos)
                })
            })
            .catch((err) => { throw Error(err) });
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <RecyclerListView
                        onScroll={this.onScroll}
                        renderAheadOffset={0}
                        style={{ height: Dimensions.get('window').height*.8, width: Dimensions.get('window').width }}
                        rowRenderer={this._renderRow}
                        dataProvider={this.state.dataProvider}
                        layoutProvider={this._layoutProvider}
                        // renderAheadOffset={1000}
                    />
                </Content>
            </Container>
        );
    }
}
export default HomeTab;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    flatview: {
        // justifyContent: 'center',
        paddingTop: 30,
        borderRadius: 2,
        borderColor: 'red',
        borderWidth: 1,
        height: 400
    }
});