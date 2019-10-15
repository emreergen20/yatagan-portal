import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {Text, View, Button, Item, Content,Input,Spinner} from 'native-base';
import validations from './validations';
import firebase from 'firebase';
import {inject, observer} from 'mobx-react';

import { Formik } from 'formik';


		console.disableYellowBox = true;

		class LoginForm extends Component {
			componentDidMount() { console.disableYellowBox = true; }
	_handleSubmit = async (values, bag) => {
		bag.setSubmitting(false);

		try {

			firebase.auth().signInWithEmailAndPassword(values.email, values.password)
				.then((data) => {
					//this.props.AuthStore.saveUserId(data.user.uid);

					this.props.AuthStore.saveToken(data.user.refreshToken, data.user.uid);


				})
				.catch((e:Error) => {
					if (e.code === "auth/user-not-found"){
					alert('Hatalı Bilgiler');
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
				<Text style={styles.signInText}>Giriş Yap</Text>
			<Formik
			initialValues={{
				email: '',
				password: '',

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



						<Button style={[styles.button]}
							block
							disabled={!isValid || isSubmitting}
							onPress={handleSubmit}
							style={{marginTop: 10}}>


							<Text style={[styles.text]}>Giriş Yap</Text>
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
export default inject('AuthStore')(observer(LoginForm));
