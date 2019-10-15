import React, { Component } from 'react';
import {StyleSheet, Button, ScrollView} from 'react-native';
import { View, Image, Title, Text} from '@shoutem/ui';
import NavigationService from '../NavigationService';


export default class GonderiDetail extends Component {

constructor(props) {
    super(props);
    this.item = props.navigation.getParam('gonderi');
    this.user = props.navigation.getParam('userdata');
    this.datetime = props.navigation.getParam('datetime');

}

    render() {


        return (
            <ScrollView>
<View>
                <View style={styles.haberdetailinfo}>

                    <View>
                <Image
                    style={styles.image}
                    source={{ uri: `${this.item.image[0]}`}}
                />
                    </View>

                <Text>{this.item.aciklama}</Text>

                </View>
                <View style={styles.userdetailinfo}>
                <View style={styles.usercontainer}>
                    <Text>{this.datetime}</Text>
                </View>
                <View style={styles.usercontainer}>
                    <Image
                        styleName="small-avatar"
                        source={{ uri: `${this.user.avatar}` }}
                    />
                    <Text style={styles.usertitle} styleName="sm-gutter-horizontal">  {this.user.ad} {this.user.soyad} </Text>

                </View>
            </View>
            </View>
            </ScrollView>
        )
    }
}

const  styles = StyleSheet.create({
    buttonContainer:{
        paddingHorizontal:10
    },
    image:{
        height: 200,
        width:'100%'
    },
    titlecontainer:{

        //paddingBottom:10,
        paddingVertical:10,
        textAlign:'center',
        alignItems: 'center',
    },
    title:{
        fontSize:25,

    },
    usertitle:{
        textAlign: 'center',
        color:'#181818',
        fontSize:14,
        paddingTop:2
    },
    usercontainer:{
        flex: 1,
        flexDirection: 'row',


        width:'100%',
        paddingVertical: 10,
        paddingHorizontal: 10,


    },
    datecontainer:{
        flex: 2,
        flexDirection: 'column',
        position:'absolute',
        right:10,
        width:'100%',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    haberdetailinfo:{
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,

        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 3,
        shadowOffset: {
            width:0,
            height: 2
        },
        elevation: 4
    },
    userdetailinfo:{
        textAlign: 'center',

        justifyContent:'center',
        alignItems:'center',
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,

        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 3,
        shadowOffset: {
            width:0,
            height: 2
        },
        elevation: 4
    }
});
