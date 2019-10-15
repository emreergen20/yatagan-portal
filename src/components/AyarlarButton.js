import React, { Component } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import NavigationService from '../NavigationService';


export default class AyarlarButton extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress={() => NavigationService.navigate('AyarlarList' )}
                style={styles.usercontainer}>
                <Image
                    style={styles.useredit}
                    source={require('../assets/cog.png')}
                />
            </TouchableOpacity>
        )
    }
}

const  styles = StyleSheet.create({
    useredit:{
        resizeMode: 'stretch',
        height:25,
        width: 25,
    },
    usercontainer:{
        flex: 1,

        paddingVertical: -30,
        paddingHorizontal:10,

    },
});
