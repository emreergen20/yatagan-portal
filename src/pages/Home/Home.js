import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Modal, Image, ScrollView, Alert} from 'react-native';
import {
    Container,
    Footer,
    FooterTab,
    Button,
    Text,
    Content,
    Card,
    CardItem,
    Left,
    Thumbnail,
    Right,
    Body,
    ActionSheet, Root,

} from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Divider, ImageBackground, ListView, Screen, Spinner, Subtitle, Tile, Title,Lightbox, View} from '@shoutem/ui';
import { runInAction, observable, action} from 'mobx';
import _ from 'lodash';
import firebase from 'firebase';
import {observer} from 'mobx-react';
import moment from 'moment';
import "moment/locale/tr";
import 'moment-timezone';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {inject} from 'mobx-react/custom';
import AuthStore from '../../store/AuthStore';
import Bildirimler from '../../components/Bildirimler';
import HeaderProfilAvatar from '../../components/HeaderProfilAvatar';
const firebaseConfig = {
    apiKey: 'AIzaSyAiwaSiqsLRw3cnAijhiJYLi2my5JWa-jc',
    authDomain: 'yatagan-portal.firebaseapp.com',
    databaseURL: 'https://yatagan-portal.firebaseio.com',
    projectId: 'yatagan-portal',
    storageBucket: 'yatagan-portal.appspot.com',
    messagingSenderId: '579742402310',
    appId: '1:579742402310:web:a4efb9b657f5ecf2'
};
firebase.initializeApp(firebaseConfig);
var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

class Home extends Component {
    @observable post = [];
    @observable user = [];
    @observable useryetki = [];
    @observable loading = false;
    state={
        pagelimit:4,
        loading:false,
        active: false,
        yetki:'normal',
        editbutton:false,
        index: 0,
        modalVisible: true

    };

    static navigationOptions = {
        headerRight:<Bildirimler/>,
        // headerLeft:<HeaderProfilAvatar/>,

        headerStyle:{
            borderBottomColor: 'black',
        },

    };



            constructor(props) {
                super(props);
                let  modalVisible= true;
                this.renderRow = this.renderRow.bind(this);
            }
        @action async getPost(){
                this.setState({loading: true});
                try {

                    firebase.database().ref(`gonderiler/`).limitToLast(this.state.pagelimit).orderByChild('durum').equalTo('aktif')
                        .on('value', (snapshot) =>{
                            runInAction(()=> {
                                this.post = snapshot.val();
                                this.setState({loading: false});
                                // const ref = firebase.database().ref(`haberler/`);
                                // ref.orderByChild('puid').equalTo('90fkZ6V7L1O85NGFrxA8GlMX29h1').on('value', function(snapshot) {
                                //     console.log(snapshot.val());
                                // });
                                console.log(this.post)
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

            console.log(e);
        }
    }

    componentWillMount(): void {


        this.getPost();
        this.getuseryetki();

    };

    loadMore = () => {
        this.setState({loading: true});
        this.setState({
            pagelimit: this.state.pagelimit + 2,
        }, () => {
            try {

                firebase.database().ref(`gonderiler/`).limitToLast(this.state.pagelimit).orderByChild('durum').equalTo('aktif')
                    .on('value', (snapshot) =>{
                        runInAction(()=> {
                            this.post = snapshot.val();
                            this.setState({loading: false});

                        })
                    });




            }catch (e) {
                this.loading = false;
                console.log(e);
            }

        })
    };
    refresh = () => {
        this.setState({loading: true});

        try {

            firebase.database().ref(`gonderiler/`).limitToLast(3).orderByChild('durum').equalTo('aktif')
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
        posteditbutton = gonderi.puid === uid;

        moment.locale('tr');
        moment.tz.setDefault('Europe/Istanbul');
        const datetime = moment.tz(gonderi.tarih, "Europe/Istanbul").format('LLL');
        let image = '';
        let imageif = false;
        if (!gonderi.image) {
            image = null;

        }else {
            image = gonderi.image[0];

        }
        const images = [{
            // Simplest usage.
            url: image
        }];

        //const time = moment(haber.tarih).toLocaleString();
        return (
            <Root>
            <Card style={{flex: 1,  paddingBottom:10, }}>
                <CardItem>

                    <Left>
                        <Thumbnail source={{uri: `${userdata.avatar}`}} />
                        <Body>
                            <Text>{userdata.ad} {userdata.soyad}</Text>
                            <Text note>{datetime}</Text>
                        </Body>
                    </Left>


                    <Divider styleName="line" />
                    <Right>
                        {posteditbutton &&   <TouchableOpacity
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: BUTTONS,
                                        cancelButtonIndex: CANCEL_INDEX,
                                        destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                        title: "Testing ActionSheet"
                                    },
                                    buttonIndex => {
                                        this.setState({ clicked: BUTTONS[buttonIndex] });
                                    }
                                )}
                        ><Icon
                            name="ellipsis-v"
                            size={20}

                        >

                        </Icon></TouchableOpacity> }
                        <Text>{this.state.clicked}</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body>
                        {image &&
                        <TouchableOpacity
                            onPress={ this.modalVisible = true } >
                            <Image
                                style={{height:200, width:300}}
                                source={{uri: image}}
                            />
                        </TouchableOpacity>
                        }

                        <Text>

                            {gonderi.aciklama}
                        </Text>
                    </Body>

                    <Divider styleName="line" />

                </CardItem>
            </Card>
            </Root>


        );
    }
    render() {

        const postarray = _.map(this.post, (val, uid) => {
            return {...val,uid};
        });

        const sortpostarray =_.orderBy(postarray, ['tarih'], ['desc']);
        return (

            <View style={{ flex: 1 }}>

                <Screen>

                    <ListView
                        data={sortpostarray}
                        renderRow={this.renderRow}
                        loading={this.state.loading}
                        onLoadMore={this.loadMore}
                        onRefresh={this.refresh}


                    />

                </Screen>
            </View>

        );
    }
}
export default inject('AuthStore')(observer(Home));

const styles = StyleSheet.create({
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

