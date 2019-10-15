import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Container, Footer, FooterTab, Button, Text, Content, Item, Input, View} from 'native-base';
import NavigationService from '../NavigationService';
import {Screen} from '@shoutem/ui';
import {Formik} from 'formik';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-picker';

import {inject} from 'mobx-react/custom';
import {observer} from 'mobx-react';
import AuthStore from '../store/AuthStore';
console.disableYellowBox = true;
const options = {
    title: 'Resim Seç',
    cancelButtonTitle: 'Geri',
    takePhotoButtonTitle: 'Resim Çek',
    chooseFromLibraryButtonTitle: 'Galeriden Seç',
    quality: 1.0,
    permissionDenied: {
        title: 'İzin Erişimi Yok',
        text:
            'Resim çekmek veya galeriden resim seçmek için izin vermeniz gerekmektedir.',
        reTryTitle: 'Tekrar Dene',
        okTitle: "Tamam",
    },
    tintColor: 'blue',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    allowsEditing: true,
};
class HaberEkle extends Component {
    constructor(props){
        super(props);

    }
    state = {
        avatarSource:null,
        imageurl:null,
        date:''
    };
    static navigationOptions = {
        headerStyle:{
            backgroundColor:'#1572de',
            textAlign: 'center',
        },
        title:'Haber Ekle'
    };

    componentWillMount() {

    };
    onSelectPicture=() =>{
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
                const image =  response.uri;
                const Blob = RNFetchBlob.polyfill.Blob;
                const fs = RNFetchBlob.fs;
                window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
                window.Blob = Blob;

                let date = new Date().getDate(); //Current Date
                let month = new Date().getMonth() + 1; //Current Month
                let year = new Date().getFullYear(); //Current Year
                let hours = new Date().getHours(); //Current Hours
                let min = new Date().getMinutes(); //Current Minutes
                let sec = new Date().getSeconds(); //Current Seconds
                this.setState({
                    //Setting the value of the date time
                    date:
                        date + '-' + month + '-' + year + '-' + hours + '-' + min + '-' + sec,
                });
                let tarihname = date+month+year+hours+min+sec;
                console.log(tarihname);
                let uploadBlob = null;
                const imageRef = firebase.storage().ref('haberler').child(`${this.state.date}`);
                let mime = 'image/jpg';
                fs.readFile(image, 'base64')
                    .then((data) => {
                        return Blob.build(data, { type: `${mime};BASE64` })
                    })
                    .then((blob) => {
                        uploadBlob = blob;
                        return imageRef.put(blob, { contentType: mime })
                    })
                    .then(() => {
                        uploadBlob.close();
                        return imageRef.getDownloadURL()
                    })
                    .then((url) => {

                        this.setState({
                            imageurl:url
                        });

                    })
                    .catch((error) => {
                        console.log(error);

                    });

            }
        });
};
    _handleSubmit = async (values, bag) => {
        try {
            const uid = AuthStore.userid;
            firebase.database().ref(`haberler/`).push({
                title:values.haberbaslik,
                aciklama:values.haberaciklama,
                kisaaciklama:values.haberkisaaciklama,
                tarih:  firebase.database.ServerValue.TIMESTAMP ,
                puid: uid,
                image:{
                    0: this.state.imageurl
                }


            }).then(()=> {
                this.props.navigation.navigate('Haberler');
                console.log('eklendi')
            })
        }catch (e) {
            bag.setSubmitting(false);
            bag.setErrors(e)
        }
    };

    render() {


        return (
            <ScrollView>
                <View style={styles.loginArea}>
                    <Image source={this.state.avatarSource} style={{height:200, width:200}} />
                    <TouchableOpacity
                    onPress={this.onSelectPicture}
                    >
                        <Text>Resim Ekle</Text>
                    </TouchableOpacity>

                <Text style={styles.signInText}>Haber Ekle</Text>
                <Formik
                    initialValues={{
                        haberbaslik: '',
                        haberkisaaciklama: '',
                        haberaciklama: '',



                    }}
                    onSubmit={this._handleSubmit}
                >
                    {({
                          values,
                          handleChange,
                          handleSubmit,
                          errors,
                          touched,
                          setFieldTouched,
                          isValid,
                          isSubmitting}) => (
                        <Content>
                            <Item error={errors.haberbaslik && touched.haberbaslik}>
                                <Input
                                    onChangeText={handleChange('haberbaslik')}
                                    value={values.haberbaslik}

                                    placeholderTextColor="#ddd"
                                    placeholder='Haber Başlık'
                                    onBlur={() => setFieldTouched('haberbaslik')}
                                    autoCapitalize={'none'}
                                />
                                { (errors.haberbaslik && touched.haberbaslik) && <Text style={{color: 'red'}}>{errors.haberbaslik}</Text>}
                            </Item>
                            <Item error={errors.haberkisaaciklama && touched.haberkisaaciklama}>
                                <Input
                                    placeholderTextColor="#ddd"
                                    onChangeText={handleChange('haberkisaaciklama')}
                                    value={values.haberkisaaciklama}
                                    placeholder='Haber Kısa Açıklama'
                                    onBlur={() => setFieldTouched('haberkisaaciklama')}
                                    autoCapitalize={'none'}
                                />

                                { (errors.haberkisaaciklama && touched.haberkisaaciklama) && <Text style={{color: 'red'}}>{errors.haberkisaaciklama}</Text>}
                            </Item>

                            <Item error={errors.haberaciklama && touched.haberaciklama}>
                                <Input
                                    onChangeText={handleChange('haberaciklama')}
                                    value={values.haberaciklama}
                                    placeholderTextColor="#ddd"
                                    placeholder='Haber Açıklama'
                                    onBlur={() => setFieldTouched('haberaciklama')}
                                    multiline = {true}
                                    numberOfLines = {4}
                                />

                                { (errors.haberaciklama && touched.haberaciklama) && <Text style={{color: 'red'}}>{errors.haberaciklama}</Text>}
                            </Item>


                            <Button style={[styles.button]}
                                    block
                                    disabled={!isValid || isSubmitting}
                                    onPress={handleSubmit}
                                    style={{marginTop: 10}}>


                                <Text style={[styles.text]}>Haberi Ekle</Text>
                            </Button>
                        </Content>
                    )}

                </Formik>
                </View>
            </ScrollView>
        );
    }
}
export default inject('AuthStore')(observer(HaberEkle));
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
    },
    signInText: {
        marginVertical: 10,
        fontSize: 30,
        color: '#333'
    },
    input: {
        height: 40,
        paddingHorizontal: 5,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#f1f1f1',
        color: '#999',
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '600',
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 3,
        alignItems:'center'
    },
    text: {
        fontSize: 14
    },
    loginArea: {
        marginHorizontal: 40,
        marginVertical: 40,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,

        shadowColor: 'black',
        shadowOpacity: .2,
        shadowRadius: 3,
        shadowOffset: {
            width:0,
            height: 2
        },
        elevation: 4
    },
});
