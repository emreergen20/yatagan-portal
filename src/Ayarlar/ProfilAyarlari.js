import React, { Component } from 'react';
import { Container} from 'native-base';
import LogoutButton from '../components/LogoutButton'
import NavigationService from '../NavigationService';
import {Spinner} from '@shoutem/ui';
import { Card, Icon,Tile} from 'react-native-elements';

import {
    Image,
    ImageBackground,
    Linking,
    ListView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import firebase from 'firebase';
import AuthStore from '../store/AuthStore';
import {runInAction} from 'mobx';
import {inject, observer} from 'mobx-react';
console.disableYellowBox = true;


class ProfilAyarlari extends Component {
    state={
        loading:true,
        userdata:[],

    };
    componentDidMount(): void {
        firebase.database().ref(`kullanicilar/${AuthStore.userid}`)
            .on('value', (snapshot) =>{
                runInAction(()=> {
                    this.state.userdata = snapshot.val();
                    console.log(this.state.userdata);
                    this.setState({loading: false});
                })
            });
    }

    onPressPlace = () => {
        console.log('place')
    };
    static navigationOptions = {

        title:'Profil Ayarları'
    };

    renderHeader = () => {


        return (
            <View style={styles.headerContainer}>


                    <View style={styles.headerColumn}>

                        <Image
                            style={styles.userImage}
                            source={{
                                uri: `${this.state.userdata.avatar}`,
                            }}
                        />

                        <Text style={styles.userNameText}>{this.state.userdata.ad} {this.state.userdata.soyad} </Text>





                        <View style={styles.userAddressRow}>
                            <View>
                                <Icon
                                    name="place"
                                    underlayColor="transparent"
                                    iconStyle={styles.placeIcon}
                                    onPress={this.onPressPlace}
                                />
                            </View>
                            <View style={styles.userCityRow}>
                                <Text style={styles.userCityText}>
                                    {this.state.userdata.ad}, {this.state.userdata.soyad}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.usercontainer}>

                    </View>

            </View>
        )
    };
    render() {


        return (
            <ScrollView style={styles.scroll}>
                { this.state.loading && <Spinner size={"small"} color={"4365c1"}/>}

                <View style={styles.container}>
                    <Card containerStyle={styles.cardContainer}>
                        {this.renderHeader()}

                    </Card>
                </View>
            </ScrollView>
        );
    }
}
export default inject('AuthStore')(observer(ProfilAyarlari));
const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
    },
    container: {
        flex: 1,
    },
    emailContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
    },
    headerBackgroundImage: {
        paddingBottom: 20,
        paddingTop: 35,
    },
    headerContainer: {},
    headerColumn: {
        backgroundColor: 'transparent',
        ...Platform.select({
            ios: {
                alignItems: 'center',
                elevation: 1,
                marginTop: -1,
            },
            android: {
                alignItems: 'center',
            },
        }),
    },
    placeIcon: {
        color: 'white',
        fontSize: 26,
    },
    scroll: {
        backgroundColor: '#FFF',
    },
    telContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
    },
    userAddressRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    userCityRow: {
        backgroundColor: 'transparent',
    },
    userCityText: {
        color: '#5aff4b',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
    userImage: {
        borderColor: '#FFF',
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        marginBottom: 15,
        width: 170,
    },
    userNameText: {
        color: '#000aff',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'center',
    },
    useredit:{
        resizeMode: 'stretch',
        height:30,
        width: 30,
    },
    usercontainer:{
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        top:5,
        right:0,
        paddingVertical: -30,
        paddingHorizontal:10,

    },
});
