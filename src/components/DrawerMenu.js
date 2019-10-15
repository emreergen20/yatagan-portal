import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {View, Text,ScrollView, Image} from '@shoutem/ui';

export default class DrawerMenu extends Component {
	navigateToScreen = (route) => () => {
		this.props.navigation.navigate(route)
	};
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.image}>
					<Image
						style={styles.image}
						source={require('../assets/drawerimages.png')}
					/>
				</View>
				<ScrollView>
					<TouchableOpacity
						onPress={this.navigateToScreen('Home')}
						style={styles.menuItem}>
						<Text style={styles.itemText}>Ana Sayfa</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={this.navigateToScreen('Haberler')}
						style={styles.menuItem}>
						<Text style={styles.itemText}>Haberler</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={this.navigateToScreen('Duyurular')}
						style={styles.menuItem}>
						<Text style={styles.itemText}>Duyurular</Text>
					</TouchableOpacity>
				</ScrollView>
				<View style={styles.footer}>
					<Text style={styles.footerText}>Yatagan Portal</Text>
				</View>
			</View>
		)
	}
}

const  styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#f1f1f1',
		paddingVertical:40
	},
	footer:{
		position: 'absolute',
		left:0,
		bottom:0,
		width:'100%',
		paddingVertical: 10
	},
	footerText:{
		textAlign: 'center',
		color:'#999',
		fontSize:18,
	},
	menuItem:{
		backgroundColor: '#e1e1e1',
		padding:10,
		height:40,

	},
	itemText:{
		fontSize: 15,
		color:'#333'
	},
	image:{
		position: 'relative',
		resizeMode: 'stretch',
		height:90,
		width: 150,
		paddingBottom:30,
		paddingLeft:20
	}
});
