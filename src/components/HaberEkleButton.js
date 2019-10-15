import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import {inject} from 'mobx-react';
import NavigationService from '../NavigationService';


@inject('AuthStore')
export default class LogoutButton extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress={() => NavigationService.navigate('HaberEkle' )}
                >
               <Text style={styles.text}>Haber Ekle</Text>
            </TouchableOpacity>
        )
    }
}

const  styles = StyleSheet.create({

    text:{
        fontSize: 15,
        color:'#333',
        marginRight:10
    }
});
