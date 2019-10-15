import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity,ScrollView } from 'react-native';

import { Container, Header, Content,List, Button, ListItem, Text,  Left, Body, Right, Switch } from 'native-base';
import LogoutButton from '../components/LogoutButton';
import NavigationService from '../NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class AyarlarList extends Component {


    static navigationOptions = {
        headerLeft: <TouchableOpacity
            style={{
                borderRadius: 100,
                justifyContent:'center',
                alignItems:'center',
                height: 28,
                width:28,
                marginLeft:20
            }}
            onPress={() => NavigationService.navigate('Profil' )}
        >
            <Icon
                style={{  }}
                name="angle-left"
                size={30}
            />
        </TouchableOpacity>,
        title:'Ayarlar'
    };
    render() {
        return (

                <Content>
                    <ScrollView>
                        <TouchableOpacity
                            onPress={() => NavigationService.navigate('ProfilAyarlari' )}
                            style={styles.menuItem}>
                            <Text style={styles.itemText}>Profil Düzenle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => NavigationService.navigate('AyarlarList' )}
                            style={styles.menuItem}>
                            <Text style={styles.itemText}>Şifre</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => NavigationService.navigate('AyarlarList' )}
                            style={styles.menuItem}>
                            <Text style={styles.itemText}>Bildirimler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => NavigationService.navigate('AyarlarList' )}
                            style={styles.menuItem}>
                           <LogoutButton/>
                        </TouchableOpacity>
                    </ScrollView>
                </Content>
        );
    }
}
const  styles = StyleSheet.create({
    menuItem:{
        paddingBottom:10,
        backgroundColor: '#e1e1e1',
        padding:10,
        height:50,
        borderWidth: 1,
        borderColor: '#b7bcb6',

    },
    itemText:{

        fontSize: 15,
        color:'#333'
    },

});
