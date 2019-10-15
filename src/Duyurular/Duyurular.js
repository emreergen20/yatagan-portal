import React, { Component } from 'react';
import {  StyleSheet } from 'react-native';
import { Container, Header, Content, Icon, Accordion, Text, View } from "native-base";


import { runInAction, observable, action} from 'mobx';
import _ from 'lodash';
import firebase from 'firebase';
import {observer} from 'mobx-react';
import Moment from 'react-moment';
import moment from 'moment';
import tz from 'moment-timezone';
import "moment/locale/tr";
import NavigationService from '../NavigationService';
import {Screen, Spinner} from '@shoutem/ui';


console.disableYellowBox = true;


class Duyurular extends Component {
    @observable post = [];
    @observable user = [];
    @observable loading = false;
    state={
        pagelimit:5,
        loading:false,
        active: false

    };
    static navigationOptions = {
        title:'Duyurular ve İlanlar',
    };
    constructor(props) {
        super(props);

    }
    @action async getPost(){
        this.loading = true;
        try {

            firebase.database().ref(`duyurularilanlar/`).limitToLast(this.state.pagelimit)
                .on('value', (snapshot) =>{
                    runInAction(()=> {
                        this.post = snapshot.val();
                        this.loading = false;

                    })
                });




        }catch (e) {
            this.loading = false;
            console.log(e);
        }
    };

    componentDidMount() {

       this.getPost();
       //  firebase.database().ref(`duyurularilanlar/`).push({
       //
       //
       //
       //      title:'deneme 5',
       //      aciklama:'deneme 5',
       //      tarih:  firebase.database.ServerValue.TIMESTAMP ,
       //      puid:'90fkZ6V7L1O85NGFrxA8GlMX29h1',
       //
       //
       //
       //  }).then(()=> {
       //      console.log('eklendi')
       //  })
    };


    renderHeader(item, expanded) {
        return (
            <View style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-between",
                alignItems: "center" ,
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: '#d6d7da',
                backgroundColor: "#2fc4da" }}>
                <Text style={{ fontWeight: "600" }}>
                    {" "}{item.title}
                </Text>
                {expanded
                    ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
                    : <Icon style={{ fontSize: 18 }} name="add-circle" />}
            </View>
        );
    }
    renderContent(item) {
        return (
            <Text
                style={{
                    backgroundColor: "#e3f1f1",
                    padding: 10,
                    fontStyle: "italic",
                }}
            >
                {item.aciklama}
            </Text>
        );
    }
    render() {


        const postarray = _.map(this.post, (val, uid) => {
            return {...val,uid};
        });

        const sortpostarray =_.orderBy(postarray, ['tarih'], ['desc']);
        console.log(sortpostarray);
        return (
            <View style={{ flex: 1 }}>
                <Container>
                    { this.loading && <Spinner size={"small"} color={"4365c1"}/>}
                    <Content padder style={{ backgroundColor: "white" }}>
                        <Accordion
                            style={styles.accordion}
                            dataArray={sortpostarray}
                            animation={true}
                            expanded={true}
                            renderHeader={this.renderHeader}
                            renderContent={this.renderContent}
                        />
                    </Content>
                </Container>
</View>

        );
    }
}
export default (observer(Duyurular));
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
    accordion:{
    paddingBottom: 10,
    }
});
