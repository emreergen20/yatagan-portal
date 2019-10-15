import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Button, Item, Content,Input,Spinner} from 'native-base';
import validations from './validations';

import {Formik} from 'formik';
import firebase from 'firebase';
import {inject, observer} from 'mobx-react';

console.disableYellowBox = true;

 class RegisterForm extends Component {

	_handleSubmit = async (values, bag) => {
		try {
			bag.setSubmitting(false);
			firebase
				.auth()
				.createUserWithEmailAndPassword(values.email, values.password)
				.then((response) => {
					const uid = response.user.uid;
					this.props.navigation.navigate('RegisterMorePage' ,{uid});

				})
				.catch((e:Error) => {
					alert(e);
					console.log(e);
				if (e.code === "auth/email-already-in-use"){
				 	alert('Bu Mail Adresi Sistemimizde Kayıtlıdır. Lütfen Kontrol Ediniz.');
				}
			});
		}catch (e) {
			bag.setSubmitting(false);
			bag.setErrors(e)
		}
	};
	render() {
		return (
			<View>
				<Text style={styles.signInText}>Kayıt Ol</Text>
				<Formik
					initialValues={{
						email: '',
						password: '',
						passwordConfirm: ''

					}}
					onSubmit={this._handleSubmit}
					validationSchema={validations}
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
							<Item error={errors.email && touched.email}>
								<Input
									onChangeText={handleChange('email')}
									value={values.email}

									placeholderTextColor="#ddd"
									placeholder='E-mail'
									onBlur={() => setFieldTouched('email')}
									autoCapitalize={'none'}
									keyboardType={'email-address'}
								/>
								{ (errors.email && touched.email) && <Text style={{color: 'red'}}>{errors.email}</Text>}
							</Item>
							<Item error={errors.password && touched.password}>
								<Input
									placeholderTextColor="#ddd"
									onChangeText={handleChange('password')}
									value={values.password}
									placeholder='Şifre'
									onBlur={() => setFieldTouched('password')}
									autoCapitalize={'none'}
									secureTextEntry={true}
								/>

								{ (errors.password && touched.password) && <Text style={{color: 'red'}}>{errors.password}</Text>}
							</Item>

							<Item error={errors.passwordConfirm && touched.passwordConfirm}>
								<Input
									onChangeText={handleChange('passwordConfirm')}
									value={values.passwordConfirm}
									placeholderTextColor="#ddd"
									placeholder='Şifre Tekrar'
									onBlur={() => setFieldTouched('passwordConfirm')}
									autoCapitalize={'none'}
									secureTextEntry={true}
								/>

								{ (errors.passwordConfirm && touched.passwordConfirm) && <Text style={{color: 'red'}}>{errors.passwordConfirm}</Text>}
							</Item>


							<Button style={[styles.button]}
									block
									disabled={!isValid || isSubmitting}
									onPress={handleSubmit}
									style={{marginTop: 10}}>


								<Text style={[styles.text]}>Kayıt Ol</Text>
							</Button>
						</Content>
					)}

				</Formik>
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
	}
});
export default inject('AuthStore')(observer(RegisterForm));
