import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from "react-native";

import { Container, Content, Icon } from 'native-base'
import CardComponent from '../CardComponent'
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
            ]
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
            key={Math.round(Math.random()*10000000)}
        />
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-home" style={{ color: tintColor }} />
        )
    }

    component() {
        fetch("/videofeed/1")
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
                        style={{ height: Dimensions.get('window').height*.8, width: Dimensions.get('window').width }}
                        rowRenderer={this._renderRow}
                        dataProvider={this.state.dataProvider}
                        layoutProvider={this._layoutProvider}
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
    }
});