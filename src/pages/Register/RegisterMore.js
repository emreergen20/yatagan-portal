import React, { Component } from 'react';
import {KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View, Button, Item, Content,Input,Spinner} from 'native-base';
import {Formik} from 'formik';
import firebase from 'firebase';
import {inject, observer} from 'mobx-react';

console.disableYellowBox = true;

class RegisterMore extends Component {
    constructor(props){
        super(props);
        this.uid = props.navigation.getParam('uid');
    }
    static navigationOptions = {
        header:null
    };
    _handleSubmit = async (values, bag) => {
        try {
            bag.setSubmitting(false);

                    firebase.database().ref(`kullanicilar/${this.uid}/`).set({

                        ad: values.ad,
                        soyad:values.soyad,
                        tel:values.tel,
                        yetki:'normal',
                        avatar:{
                            0: 'https://firebasestorage.googleapis.com/v0/b/yatagan-portal.appspot.com/o/genel%2Fdefault-avatar.png?alt=media&token=55d1b2cc-cd6c-4f09-9d36-59ec4926a86e'
                        },
                        kapak:{
                            0: 'https://firebasestorage.googleapis.com/v0/b/yatagan-portal.appspot.com/o/genel%2Fdefault-kapak.jpg?alt=media&token=a3957fdf-bcc4-42e6-92b1-45e3928b1ed6'
                        }

                    }).then(()=> {
                        console.log('eklendi');
                        this.props.navigation.navigate('Login');
                    })

                .catch((e:Error) => {
                    alert(e);
                    console.log(e);
                    // if (e.code === "auth/email-already-in-use"){
                    //     alert('Bu Mail Adresi Sistemimizde Kayıtlıdır. Lütfen Kontrol Ediniz.');
                    // }
                });
        }catch (e) {
            bag.setSubmitting(false);
            bag.setErrors(e)
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headBackground} />

                <KeyboardAvoidingView behavior={"position"}>

                    <ScrollView>
                        <View style={styles.loginArea}>
                <Text style={styles.signInText}>Bilgileriniz</Text>
                <Formik
                    initialValues={{
                        ad: '',
                        soyad: '',
                        tel: ''

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
                            <Item error={errors.ad && touched.ad}>
                                <Input
                                    onChangeText={handleChange('ad')}
                                    value={values.ad}

                                    placeholderTextColor="#ddd"
                                    placeholder='Adınız'
                                    onBlur={() => setFieldTouched('ad')}
                                    autoCapitalize={'none'}
                                />
                                { (errors.ad && touched.ad) && <Text style={{color: 'red'}}>{errors.ad}</Text>}
                            </Item>
                            <Item error={errors.soyad && touched.soyad}>
                                <Input
                                    onChangeText={handleChange('soyad')}
                                    value={values.soyad}

                                    placeholderTextColor="#ddd"
                                    placeholder='Soyadınız'
                                    onBlur={() => setFieldTouched('soyad')}
                                    autoCapitalize={'none'}
                                />
                                { (errors.soyad && touched.soyad) && <Text style={{color: 'red'}}>{errors.soyad}</Text>}
                            </Item>
                            <Item error={errors.tel && touched.tel}>
                                <Input
                                    placeholderTextColor="#ddd"
                                    onChangeText={handleChange('tel')}
                                    value={values.tel}
                                    placeholder='Telefon Numaranız'
                                    onBlur={() => setFieldTouched('tel')}
                                    autoCapitalize={'none'}
                                />

                                { (errors.tel && touched.tel) && <Text style={{color: 'red'}}>{errors.tel}</Text>}
                            </Item>
                            <Button style={[styles.button]}
                                    block
                                    disabled={!isValid || isSubmitting}
                                    onPress={handleSubmit}
                                    style={{marginTop: 10}}>


                                <Text style={[styles.text]}>Devam Et</Text>
                            </Button>
                        </Content>
                    )}

                </Formik>
                        </View>
                    </ScrollView>

                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingVertical: 80
    },
    headBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 250,
        width: '100%',
        backgroundColor: '#1572de'
    },
    logo: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#f2f2f2'
    },
    logoDescription: {
        textAlign: 'center',
        color: '#f2f2f2'
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
    loginAreaTitle: {
        fontSize: 20,
        textAlign: 'center'
    },
    loginAreaDescription: {
        fontSize: 11,
        color: '#7e868f',
        marginVertical: 10,
        textAlign: 'center'
    },
    signUpArea: {
        alignItems: 'center'
    },
    signUpDescription: {
        color: '#999'
    },
    signUpText: {
        color: '#666'
    }
});
export default inject('AuthStore')(observer(RegisterMore));
