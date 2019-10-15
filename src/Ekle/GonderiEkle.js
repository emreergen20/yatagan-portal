import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import { Button, Text, Content, Item, Input, View} from 'native-base';
import { Spinner} from '@shoutem/ui';
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
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
    allowsEditing: true,
};
class GonderiEkle extends Component {
    constructor(props){
        super(props);

    }
    state = {
        avatarSource:null,
        imageurl:null,
        imageloading:false,
        date:''
    };
    static navigationOptions = {
        headerStyle:{
            backgroundColor:'#1572de',
            textAlign: 'center',
        },
        title:'Gönderi Paylaş'
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
                this.setState({imageloading: true});
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
                            imageurl:url,
                            imageloading: false
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
            firebase.database().ref(`gonderiler/`).push({

                aciklama:values.gonderiaciklama,
                tarih:  firebase.database.ServerValue.TIMESTAMP ,
                puid: uid,
                durum: 'aktif',
                image:{
                    0: this.state.imageurl
                }


            }).then(()=> {
                this.props.navigation.navigate('Home');
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
                    { this.state.imageloading && <Spinner size={"small"} color={"4365c1"}/>}
                    <Image source={this.state.avatarSource} style={{height:200, width:200}} />

                    <TouchableOpacity
                    onPress={this.onSelectPicture}
                    >
                        <Text>Resim Ekle</Text>
                    </TouchableOpacity>


                <Text style={styles.signInText}>Gönderi Paylaş</Text>
                <Formik
                    initialValues={{
                        gonderiaciklama: '',
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
                            <Item error={errors.gonderiaciklama && touched.gonderiaciklama}>
                                <Input
                                    onChangeText={handleChange('gonderiaciklama')}
                                    value={values.gonderiaciklama}

                                    placeholderTextColor="#ddd"
                                    placeholder='Açıklama'
                                    onBlur={() => setFieldTouched('gonderiaciklama')}
                                    autoCapitalize={'none'}
                                    multiline = {true}
                                    numberOfLines = {4}
                                />
                                { (errors.haberbaslik && touched.haberbaslik) && <Text style={{color: 'red'}}>{errors.haberbaslik}</Text>}
                            </Item>


                            <Button style={[styles.button]}
                                    block
                                    disabled={!isValid || isSubmitting}
                                    onPress={handleSubmit}
                                    style={{marginTop: 10}}>


                                <Text style={[styles.text]}>Paylaş</Text>
                            </Button>
                        </Content>
                    )}

                </Formik>
                </View>
            </ScrollView>
        );
    }
}
export default inject('AuthStore')(observer(GonderiEkle));
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
