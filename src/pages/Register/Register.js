import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Button} from 'react-native';
import RegisterForm from './RegisterForm';
import {inject, observer} from 'mobx-react';

class Register extends Component {
	static navigationOptions = {
		header:null
	};
	render() {
		const {navigate} = this.props.navigation;
		return (
			<View style={styles.container}>
				<View style={styles.headBackground} />

				<KeyboardAvoidingView behavior={"position"}>
					<View>
						<Text style={styles.logo}>Yatagan Portal</Text>
						<Text style={styles.logoDescription}>Haber Ve Bildirim</Text>
					</View>
					<ScrollView>
						<View style={styles.loginArea}>
							<RegisterForm navigation={this.props.navigation} />
						</View>
					</ScrollView>
					<View style={styles.signUpArea}>
						<Text style={styles.signUpDescription}>Hesabın Var mı?</Text>
						<TouchableOpacity>
							<Button
								style={styles.signUpText}
								title="Giriş Yap"
								onPress={() => navigate('Login')}
							/>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
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
export default inject('AuthStore')(observer(Register));
