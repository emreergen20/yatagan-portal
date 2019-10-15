import React, { Component } from 'react';
import {  StyleSheet } from 'react-native';
import {Button, Icon, Fab, Text, Container} from 'native-base';

import { runInAction, observable, action} from 'mobx';
import _ from 'lodash';
import firebase from 'firebase';
import {observer} from 'mobx-react';
import { Screen, ListView, View, Image, Spinner,TouchableOpacity, ImageBackground, Tile, Title, Subtitle, Divider} from '@shoutem/ui';
import Moment from 'react-moment';
import moment from 'moment';
import tz from 'moment-timezone';
import "moment/locale/tr";
import NavigationService from '../NavigationService';
import {inject} from 'mobx-react/custom';
import AuthStore from '../store/AuthStore';
import HaberEkle from '../components/HaberEkleButton';
console.disableYellowBox = true;


class Haberler extends Component {
    @observable post = [];
    @observable user = [];
    @observable useryetki = [];
    @observable loading = false;
    state={
        pagelimit:3,
        loading:false,
        active: false,
        yetki:'normal',

    };
    static navigationOptions = {

        title:'Haberler',
        headerRight: <HaberEkle/>

    };
    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
    }
    @action async getPost(){
        this.loading = true;
        try {

            firebase.database().ref(`haberler/`).limitToLast(this.state.pagelimit)

                .on('value', (snapshot) =>{
                    runInAction(()=> {
                        this.post = snapshot.val();
                        this.loading = false;
                        // const ref = firebase.database().ref(`haberler/`);
                        // ref.orderByChild('puid').equalTo('90fkZ6V7L1O85NGFrxA8GlMX29h1').on('value', function(snapshot) {
                        //     console.log(snapshot.val());
                        // });
                    })
                });




        }catch (e) {
            this.loading = false;
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
    componentDidMount() {

        this.getPost();
        this.getuseryetki();


        // firebase.database().ref(`haberler/`).push({
        //
        //
        //
        //     title:'deneme 10',
        //     aciklama:'deneme10',
        //     kısaaciklama:'deneme10',
        //     tarih:  firebase.database.ServerValue.TIMESTAMP ,
        //     puid:'90fkZ6V7L1O85NGFrxA8GlMX29h1',
        //     image:{
        //         0: 'http://i2.hurimg.com/i/hurriyet/75/1110x740/5b0e5ddabf49c21958da2d8a.jpg'
        //         }
        //
        //
        // }).then(()=> {
        //     console.log('eklendi')
        // })
    };

    loadMore = () => {
        this.setState({loading: true});
        this.setState({
            pagelimit: this.state.pagelimit + 2,
        }, () => {
            try {

                firebase.database().ref(`haberler/`).limitToLast(this.state.pagelimit)
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

                firebase.database().ref(`haberler/`).limitToLast(3)
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

        };

    renderRow(haber) {
        if (!haber) {
            return null;
        }
        let userdata = [];
        firebase.database().ref(`kullanicilar/${haber.puid}`)
            .on('value', (snapshot) =>{
                runInAction(()=> {
                   userdata = snapshot.val();

                })
            });
       // let newDate =  moment(haber.tarih).format("MM/DD/YYYY hh:MM");

        moment.locale('tr');
        const datetime = moment.tz(haber.tarih, "Europe/Istanbul").format('LLL');

        //const time = moment(haber.tarih).toLocaleString();
        return (

            <TouchableOpacity
                onPress={() => NavigationService.navigate('HaberDetail', {haber, userdata, datetime})}
                style={styles.habercard}>
                <ImageBackground
                    styleName="large-banner"
                    source={{ uri: haber.image[0] }}
                >

                    <Tile>

                        <Title styleName="md-gutter-bottom">{haber.title}</Title>
                        <Divider styleName="line" />
                        <Subtitle styleName="sm-gutter-horizontal">{haber.kisaaciklama}</Subtitle>

                        <View style={styles.usercontainer}>
                        <Image
                            styleName="small-avatar"
                            source={{ uri: `${userdata.avatar}` }}
                        />
                        <Text style={styles.usertitle} styleName="sm-gutter-horizontal">  {userdata.ad} {userdata.soyad} </Text>

                        </View>

                    </Tile>
                    <View style={styles.datetimecontainer}>
                        <Text style={styles.datetimetitle} styleName="sm-gutter-horizontal">  {datetime} </Text>
                    </View>


                </ImageBackground>

            </TouchableOpacity>
        );
    }

    render() {

        //const { HaberStore } = this.props;

        // const datapost = toJS(HaberStore.post);
        const postarray = _.map(this.post, (val, uid) => {
            return {...val,uid};
        });

        const sortpostarray =_.orderBy(postarray, ['tarih'], ['desc']);
        return (
            <View style={{ flex: 1 }}>
            <Screen>

                { this.loading && <Spinner size={"small"} color={"4365c1"}/>}
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
export default inject('AuthStore')(observer(Haberler));
const styles = StyleSheet.create({
habercard:{
    paddingBottom:10,
},
    usertitle:{
        textAlign: 'center',
        color:'#fff',
        fontSize:14,
        paddingTop:2
    },
    usercontainer:{
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        left:0,
        bottom:0,
        width:'100%',
        paddingVertical: 10,
        paddingHorizontal: 10,

    },
    datetimecontainer:{
        flex: 1,

        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    datetimetitle:{

            textAlign: 'center',
            color:'#fff',
            fontSize:14,
            paddingTop:2
        },

});
