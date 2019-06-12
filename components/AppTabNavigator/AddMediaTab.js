import React, { Component } from 'react';
import { Icon, Container, Header, Content, List, ListItem, Button } from 'native-base'
import ImagePicker from 'react-native-image-crop-picker';
import {
    setJSExceptionHandler,
    setNativeExceptionHandler,
} from 'react-native-exception-handler';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Slider,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob'

const handleError = (error, isFatal) => {
    // fetch
    console.log(error, isFatal);
    alert(error.name);
};

setNativeExceptionHandler(errorString => {
    console.log('caught global error');
    handleError(error, isFatal);
});

const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
};

const wbOrder = {
    auto: 'sunny',
    sunny: 'cloudy',
    cloudy: 'shadow',
    shadow: 'fluorescent',
    fluorescent: 'incandescent',
    incandescent: 'auto',
};

const landmarkSize = 2;

class AddMediaTab extends React.Component {
    static navigationOptions = {

        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-add-circle" style={{ color: tintColor }} />
        )
    }
    state = {
        flash: 'off',
        zoom: 0,
        autoFocus: 'on',
        autoFocusPoint: {
            normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
            drawRectPosition: {
                x: Dimensions.get('window').width * 0.5 - 32,
                y: Dimensions.get('window').height * 0.5 - 32,
            },
        },
        depth: 0,
        type: 'back',
        whiteBalance: 'auto',
        ratio: '16:9',
        recordOptions: {
            mute: false,
            maxDuration: 60,
            quality: RNCamera.Constants.VideoQuality['288p'],
        },
        isRecording: false,
        canDetectFaces: false,
        canDetectText: false,
        canDetectBarcode: false,
        faces: [],
        textBlocks: [],
        barcodes: [],
    };

    toggleFacing() {
        this.setState({
            type: this.state.type === 'back' ? 'front' : 'back',
        });
    }

    toggleFlash() {
        this.setState({
            flash: flashModeOrder[this.state.flash],
        });
    }
    toggleFocus() {
        this.setState({
            autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
        });
    }

    touchToFocus(event) {
        const { pageX, pageY } = event.nativeEvent;
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;
        const isPortrait = screenHeight > screenWidth;

        let x = pageX / screenWidth;
        let y = pageY / screenHeight;
        // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
        if (isPortrait) {
            x = pageY / screenHeight;
            y = -(pageX / screenWidth) + 1;
        }

        this.setState({
            autoFocusPoint: {
                normalized: { x, y },
                drawRectPosition: { x: pageX, y: pageY },
            },
        });
    }

    zoomOut() {
        this.setState({
            zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
        });
    }

    zoomIn() {
        this.setState({
            zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
        });
    }

    setFocusDepth(depth) {
        this.setState({
            depth,
        });
    }

    takeVideo = async function () {
        if (this.camera) {
            try {
                const promise = this.camera.recordAsync(this.state.recordOptions);

                if (promise) {
                    this.setState({ isRecording: true });
                    const data = await promise;
                    this.setState({ isRecording: false });
                    this.uploadFile(data.uri)
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));

    renderCamera() {
        const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;

        const drawFocusRingPosition = {
            top: this.state.autoFocusPoint.drawRectPosition.y - 32,
            left: this.state.autoFocusPoint.drawRectPosition.x - 32,
        };
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
                type={this.state.type}
                flashMode={this.state.flash}
                autoFocus={true}
                zoom={this.state.zoom}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
            >
                <View
                    style={{
                        flex: 0.5,
                        height: 72,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >
                        {/* toggleFlash and toggleSide button <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
                            <Text style={styles.flipText}> FLIP </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
                            <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
                <View style={{ bottom: 0 }}>
                    <View
                        style={{
                            height: 56,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                        }}
                    >
                        <TouchableOpacity
                            style={[
                                styles.flipButton,
                                {
                                    bottom: 50,
                                    backgroundColor: this.state.isRecording ? 'white' : 'darkred',
                                },
                            ]}
                            onPress={this.state.isRecording ? () => { } : this.takeVideo.bind(this)}
                        >
                            {this.state.isRecording ? (
                                <Text style={styles.flipText}> ☕ </Text>
                            ) : (
                                    <Text style={styles.flipText}> REC </Text>
                                )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.flipButton,
                                {
                                    bottom: 50,
                                    backgroundColor: 'black',
                                },
                            ]}
                            onPress={() => this.openGallery()}
                        >
                            <Text style={styles.flipText}>Gallery</Text>

                        </TouchableOpacity>
                    </View>
                    {this.state.zoom !== 0 && (
                        <Text style={[styles.flipText, styles.zoomText]}>Zoom: {this.state.zoom}</Text>
                    )}
                    {/* <View
                        style={{
                            height: 56,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                            alignSelf: 'flex-end',
                        }}
                    >
                        <TouchableOpacity
                            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
                            onPress={this.zoomIn.bind(this)}
                        >
                            <Text style={styles.flipText}> + </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
                            onPress={this.zoomOut.bind(this)}
                        >
                            <Text style={styles.flipText}> - </Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
            </RNCamera>
        );
    }

    render() {
        return <View style={styles.container}>{this.renderCamera()}</View>;
    }

    uploadFile = (file) => {
        this.props.navigation.navigate('MediaDescTab', {
            file
        });
    }

    openGallery() {
        ImagePicker.openPicker({
            mediaType: "video",
        }).then((video) => {
            this.uploadFile(video.path);
        }).catch(err => {
            console.error(err)
        });
    }
}

export default AddMediaTab;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#000',
    },
    flipButton: {
        height: 80,
        width: 80,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
    zoomText: {
        position: 'absolute',
        bottom: 70,
        zIndex: 2,
        left: 2,
    },
    picButton: {
        backgroundColor: 'darkseagreen',
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    face: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    landmark: {
        width: landmarkSize,
        height: landmarkSize,
        position: 'absolute',
        backgroundColor: 'red',
    },
    faceText: {
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'transparent',
    },
    text: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#F00',
        justifyContent: 'center',
    },
    textBlock: {
        color: '#F00',
        position: 'absolute',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
});