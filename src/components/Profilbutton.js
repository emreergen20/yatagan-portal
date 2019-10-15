import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import NavigationService from '../NavigationService';


export default class Profilbutton extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress={() => NavigationService.navigate('Profil', )}
                style={styles.buttonContainer}>
                <Icon
                    name="user"
                    size={26}
                />
            </TouchableOpacity>
        )
    }
}

const  styles = StyleSheet.create({
    buttonContainer:{
        padding:10
    },
    text:{
        fontSize:14
    }
});
