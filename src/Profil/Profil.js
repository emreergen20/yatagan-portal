import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import _ from 'lodash';
import { Root } from "native-base";

import moment from 'moment';
import "moment/locale/tr";
import LogoutButton from '../components/LogoutButton'
import AyarlarButton from '../components/AyarlarButton'
import { inject, observer } from 'mobx-react';
import AuthStore from '../store/AuthStore';
import {Card,Icon} from 'react-native-elements';
import Profilcard from '../components/Profilcard'
import {
    Image,
    ImageBackground,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Alert
} from 'react-native';
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import {Body, CardItem, Left, Right, Thumbnail, ActionSheet} from 'native-base';

import firebase from 'firebase';
import {action, observable, runInAction} from 'mobx';
import {Divider, ImagePreview, Screen, Spinner,Caption,ListView, Subtitle,Button, Tile, Title} from '@shoutem/ui';
import NavigationService from '../NavigationService';

console.disableYellowBox = true;
var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

class Profil extends Component {
    @observable post = [];
    @observable user = [];
    @observable useryetki = [];
    @observable loading = false;
    state={
        pagelimit:4,
        loading:false,
        active: false,
        yetki:'normal',
        userdata:[],
        clicked: null

    };

    static navigationOptions = {
        headerRight : <AyarlarButton />,
        headerStyle:{
            backgroundColor:'#1572de',
            textAlign: 'center',
        },

        title:`Profil`
    };
    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
    }
    @action async getPost(){
        this.setState({loading: true});
        try {
            const uid = AuthStore.userid;
            firebase.database().ref(`gonderiler/`).limitToLast(this.state.pagelimit).orderByChild('puid').equalTo(`${uid}`)

                .on('value', (snapshot) =>{
                    runInAction(()=> {
                        this.post = snapshot.val();
                        this.setState({loading: false});
                        // const ref = firebase.database().ref(`haberler/`);
                        // ref.orderByChild('puid').equalTo('90fkZ6V7L1O85NGFrxA8GlMX29h1').on('value', function(snapshot) {
                        //     console.log(snapshot.val());
                        // });
                    })
                });




        }catch (e) {
            this.setState({loading: false});
            console.log(e);
        }
    };
    @action async getuseryetki(){
        try {
            const uid = AuthStore.userid;
            firebase.database().ref(`kullanicilar/${uid}`)
                .on('value', (snapshot) =>{
                    runInAction(()=> {
                        this.useryetki = snapshot.val();
                        this.setState({ yetki:this.useryetki.yetki })

                    })
                });




        }catch (e) {
            this.loading = false;
            console.log(e);
        }
    }
    @action async userveri(){
        firebase.database().ref(`kullanicilar/${AuthStore.userid}`)
            .on('value', (snapshot) =>{
                runInAction(()=> {
                    this.state.userdata = snapshot.val();
                    console.log(this.state.userdata);
                    this.setState({loading: false});
                })
            });
    }

    componentDidMount() {
        this.getPost();
        this.userveri();
    }


    onPressPlace = () => {
        console.log('place')
    };
    renderHeader = () => {
        let image = '';
        if (!this.state.userdata.kapak) {
            image = '';
        }else {
            image = this.state.userdata.kapak;
        }


        return (
            <View style={styles.headerContainer}>
                 <ImageBackground
                    style={styles.headerBackgroundImage}
                    blurRadius={0.5}
                    source={{
                        uri:`${this.state.userdata.kapak}`,
                    }}
                >
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
                                    {this.state.userdata.adres}
                                </Text>
                            </View>
                        </View>
                    </View>

                </ImageBackground>
            </View>
        )
    };
    loadMore = () => {
        this.setState({loading: true});
        this.setState({
            pagelimit: this.state.pagelimit + 2,
        }, () => {
            try {
                const uid = AuthStore.userid;
                firebase.database().ref(`gonderiler/`).limitToLast(this.state.pagelimit).orderByChild('puid').equalTo(`${uid}`)
                    .on('value', (snapshot) =>{
                        runInAction(()=> {
                            this.post = snapshot.val();
                            this.setState({loading: false});

                        })
                    });




            }catch (e) {
                this.setState({loading: false});
                console.log(e);
            }

        })
    };
    refresh = () => {
        this.setState({loading: true});

        try {
            const uid = AuthStore.userid;
            firebase.database().ref(`gonderiler/`).limitToLast(3).orderByChild('puid').equalTo(`${uid}`)
                .on('value', (snapshot) =>{
                    runInAction(()=> {
                        this.post = snapshot.val();
                        this.setState({loading: false});

                    })
                });




        }catch (e) {
            this.setState({loading: false});
            console.log(e);
        }

    };


    renderRow(gonderi) {
        if (!gonderi) {
            return null;
        }
        let userdata = [];
        firebase.database().ref(`kullanicilar/${gonderi.puid}`)
            .on('value', (snapshot) =>{
                runInAction(()=> {
                    userdata = snapshot.val();

                })
            });
        // let newDate =  moment(haber.tarih).format("MM/DD/YYYY hh:MM");
        const uid = AuthStore.userid;
        let posteditbutton = false;
        if (gonderi.puid === uid){
            posteditbutton = true;
        } else {
            posteditbutton = false;
        }
        if (this.state.clicked ==='Option 1') {
            Alert.alert(
                'Alert Title',
                'My Alert Msg',
                [
                    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
            );
        }
        moment.locale('tr');
        const datetime = moment.tz(gonderi.tarih, "Europe/Istanbul").format('LLL');
        let image = '';
        if (!gonderi.image) {
            image = null;
        }else {
            image = gonderi.image[0];
        }
        console.log(image);

        //const time = moment(haber.tarih).toLocaleString();
        return (
            <Root>
                <TouchableOpacity  onPress={() => NavigationService.navigate('GonderiDetail', {gonderi, userdata, datetime})}>
                <Card  style={{flex: 1,  paddingBottom:10, }}>

                    {image && <ImagePreview source={{uri: image}}
                                            height={200}/>}
                    <View styleName="content">
                        <Subtitle numberOfLines={1}>{gonderi.aciklama}</Subtitle>

                        <Caption>{datetime}</Caption>

                    </View>
                </Card>
                </TouchableOpacity>
            </Root>

        );
    }
    render() {

        const postarray = _.map(this.post, (val, uid) => {
            return {...val,uid};
        });
        const sortpostarray =_.orderBy(postarray, ['tarih'], ['desc']);
        return (
            <Screen>
            <View>
                { this.loading && <Spinner size={"small"} color={"4365c1"}/>}
                <ScrollView>

                    <Card containerStyle={styles.cardContainer}>
                        {this.renderHeader()}

                    </Card>
                    <ListView
                        data={sortpostarray}
                        renderRow={this.renderRow}
                        loading={this.state.loading}
                        onLoadMore={this.loadMore}
                        onRefresh={this.refresh}
                    />
                </ScrollView>

            </View>
            </Screen>
        );
    }
}
export default inject('AuthStore')(observer(Profil));
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
        left:20
    },
    userCityRow: {
        backgroundColor: 'transparent',
    },
    userCityText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
    userImage: {
        textAlign: 'center',
        borderColor: '#FFF',
        borderRadius: 85,
        borderWidth: 3,
        height: 150,
        marginBottom: 15,
        width: 150,
        justifyContent: 'center',
        alignItems:'center',
        flex:1,


    },
    userNameText: {
        color: '#FFF',

        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 10,

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
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 90,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        right:20,
        bottom: 20,

    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 70,
        height: 70,
        //backgroundColor:'white',


    }
});
