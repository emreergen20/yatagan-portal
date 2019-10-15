import React, { Component } from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Row,Image,Caption, Subtitle,  View,Title} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/FontAwesome'

import {inject} from 'mobx-react';
import AuthStore from '../store/AuthStore';
import {Button} from "native-base";
@inject('AuthStore')
export default class HeaderProfilAvatar extends Component {
    state = {
        modalVisible: false,
    };

    _handleButtonPress = () => {
        this.setModalVisible(true);
    };

    setModalVisible = (visible) => {
        this.setState({modalVisible: visible});
    };

    render() {
        let modalBackgroundStyle = {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        };
        let innerContainerTransparentStyle = {backgroundColor: '#fff', padding: 20,margin: 0, // This is the important style you need to set
            alignItems: undefined,
            justifyContent: undefined,};
        return (
            <View style={{ flex: 1 }}>
                <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.modalVisible}

                onRequestClose={() => this.setModalVisible(false)}
            >
                <View style={[styles.container, modalBackgroundStyle]}>
                    <View style={innerContainerTransparentStyle}  >
                        <View style={{alignItems: 'flex-end',textAlign: 'right', marginTop: -5}}>
                            <TouchableOpacity
                                onPress={this.setModalVisible.bind(this, false)}
                                style={{height:50, width: 50, backgroundColor:'#919690', color:'#fff', borderRadius:30, }}>
                                <Text  style={{color:'#fff', textAlign: 'center',marginTop:8, fontSize: 25}}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <Row style={styles.rowModal}>
                            <Image
                                style={styles.modalAvatar}
                                styleName="medium-avatar"

                                source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-2.png' }}
                            />
                            <Title>Emre Ergen</Title>
                        </Row>
                        <View style={styles.modalBottom}>
                        <TouchableOpacity
                            onPress={this._handleButtonPress}
                            style={{height:50, width: 100, backgroundColor:'#1e90ff', color:'#fff', textAlign:'center'}}>
                            <Text  style={{color:'#fff', textAlign:'center'}}>deneme</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
                onPress={this._handleButtonPress}
            >
                <Row style={styles.row}>
                    <Image
                        styleName="small-avatar"
                        source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-2.png' }}
                    />
                        <Subtitle>Emre Ergen</Subtitle>
                    <Icon style={styles.icon} name="angle-down" size={20}  />
                </Row>
            </TouchableOpacity>
            </View>
        )
    }
}

const  styles = StyleSheet.create({

    text:{
        fontSize: 15,
        color:'#333',
        marginVertical:50,
        marginHorizontal:10
    },
    row:{
        marginLeft:10,
        height:40,
    },
    rowModal:{
        marginTop:5,
        marginLeft:10,
        height:40,
    },
    icon:{
        marginLeft:10,
    },
    container: {
        flex: 1,
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    closeModal: {
        width:50,
    },
    modalAvatar:{
        height:60,
        width: 60
    },
    modalBottom:{
        marginTop: 15
    }

});
