import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import {inject} from 'mobx-react';


@inject('AuthStore')
export default class LogoutButton extends Component {

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.AuthStore.Logout()}
                >
               <Text style={styles.text}>Çıkış Yap</Text>
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
